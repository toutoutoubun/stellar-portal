import { strFromU8, unzipSync } from 'fflate';

export type SafetyFinding = {
  severity: 'info' | 'warning' | 'error';
  code: string;
  message: string;
  file?: string;
};

export type SafetyScanResult = {
  status: 'pass' | 'warning' | 'fail' | 'error';
  risk_level: 'low' | 'medium' | 'high' | 'unknown';
  summary: string;
  findings: SafetyFinding[];
};

const scannerVersion = 'static-v1';

export function getScannerVersion() {
  return scannerVersion;
}

const dangerousExtensions = [
  '.exe',
  '.dll',
  '.dylib',
  '.so',
  '.dmg',
  '.pkg',
  '.app',
  '.command',
  '.bat',
  '.cmd',
  '.ps1',
  '.scr'
];

const secretFilePatterns = [
  '.env',
  'id_rsa',
  'id_dsa',
  'id_ed25519',
  '.pem',
  '.p12',
  '.pfx',
  'private-key',
  'secret'
];

const jsDangerPatterns: Array<{
  code: string;
  pattern: RegExp;
  message: string;
  severity: 'warning' | 'error';
}> = [
  {
    code: 'js.eval',
    pattern: /\beval\s*\(/,
    message: 'eval() が使われています。',
    severity: 'warning'
  },
  {
    code: 'js.new_function',
    pattern: /\bnew\s+Function\s*\(/,
    message: 'new Function() が使われています。',
    severity: 'warning'
  },
  {
    code: 'js.child_process',
    pattern: /child_process|execSync|spawn\s*\(|execFile\s*\(/,
    message: '外部コマンド実行に関係する可能性があります。',
    severity: 'error'
  },
  {
    code: 'js.process_env',
    pattern: /process\.env/,
    message: '環境変数へアクセスしている可能性があります。',
    severity: 'warning'
  },
  {
    code: 'js.fs_write',
    pattern: /fs\.writeFile|fs\.appendFile|writeFileSync|appendFileSync/,
    message: 'ローカルファイルへの書き込みに関係する可能性があります。',
    severity: 'warning'
  },
  {
    code: 'js.network',
    pattern: /\bfetch\s*\(|XMLHttpRequest|WebSocket/,
    message: 'ネットワークアクセスに関係する可能性があります。',
    severity: 'warning'
  }
];

function addFinding(
  findings: SafetyFinding[],
  finding: SafetyFinding
) {
  findings.push(finding);
}

function isTextLike(fileName: string) {
  return [
    '.js',
    '.mjs',
    '.cjs',
    '.ts',
    '.tsx',
    '.json',
    '.md',
    '.txt',
    '.yml',
    '.yaml'
  ].some((suffix) => fileName.toLowerCase().endsWith(suffix));
}

function getRiskFromFindings(findings: SafetyFinding[]) {
  if (findings.some((finding) => finding.severity === 'error')) {
    return 'high' as const;
  }

  if (findings.some((finding) => finding.severity === 'warning')) {
    return 'medium' as const;
  }

  return 'low' as const;
}

function getStatusFromFindings(findings: SafetyFinding[]) {
  if (findings.some((finding) => finding.severity === 'error')) {
    return 'fail' as const;
  }

  if (findings.some((finding) => finding.severity === 'warning')) {
    return 'warning' as const;
  }

  return 'pass' as const;
}

function validateManifest(
  manifestText: string,
  findings: SafetyFinding[]
) {
  let manifest: any;

  try {
    manifest = JSON.parse(manifestText);
  } catch {
    addFinding(findings, {
      severity: 'error',
      code: 'manifest.invalid_json',
      message: 'manifest.json がJSONとして読めません。',
      file: 'manifest.json'
    });
    return;
  }

  const required = [
    'id',
    'name',
    'version',
    'description',
    'compatibleStellarVersion',
    'permissions',
    'entry',
    'license'
  ];

  for (const key of required) {
    if (manifest[key] === undefined || manifest[key] === null || manifest[key] === '') {
      addFinding(findings, {
        severity: 'error',
        code: `manifest.missing_${key}`,
        message: `manifest.json に ${key} がありません。`,
        file: 'manifest.json'
      });
    }
  }

  if (!Array.isArray(manifest.permissions)) {
    addFinding(findings, {
      severity: 'error',
      code: 'manifest.permissions_not_array',
      message: 'manifest.permissions は配列である必要があります。',
      file: 'manifest.json'
    });
    return;
  }

  const permissions = manifest.permissions.filter((item: unknown) => typeof item === 'string');

  const highRiskPermissions = [
    'external_command',
    'database_access'
  ];

  const mediumRiskPermissions = [
    'network_access',
    'local_file_write',
    'ai_api_access'
  ];

  for (const permission of permissions) {
    if (highRiskPermissions.includes(permission)) {
      addFinding(findings, {
        severity: 'error',
        code: `permission.${permission}`,
        message: `高リスク権限 ${permission} が要求されています。`,
        file: 'manifest.json'
      });
    } else if (mediumRiskPermissions.includes(permission)) {
      addFinding(findings, {
        severity: 'warning',
        code: `permission.${permission}`,
        message: `注意が必要な権限 ${permission} が要求されています。`,
        file: 'manifest.json'
      });
    }
  }
}

export function scanAddonZip(input: {
  bytes: ArrayBuffer;
  maxFileCount?: number;
  maxTextFileBytes?: number;
}): SafetyScanResult {
  const findings: SafetyFinding[] = [];
  const maxFileCount = input.maxFileCount ?? 500;
  const maxTextFileBytes = input.maxTextFileBytes ?? 1024 * 1024;

  let files: Record<string, Uint8Array>;

  try {
    files = unzipSync(new Uint8Array(input.bytes));
  } catch {
    return {
      status: 'error',
      risk_level: 'unknown',
      summary: 'ZIPを展開できませんでした。',
      findings: [
        {
          severity: 'error',
          code: 'zip.unreadable',
          message: 'ZIPファイルを展開できませんでした。'
        }
      ]
    };
  }

  const fileNames = Object.keys(files);

  if (fileNames.length === 0) {
    addFinding(findings, {
      severity: 'error',
      code: 'zip.empty',
      message: 'ZIP内にファイルがありません。'
    });
  }

  if (fileNames.length > maxFileCount) {
    addFinding(findings, {
      severity: 'error',
      code: 'zip.too_many_files',
      message: `ZIP内のファイル数が多すぎます。現在: ${fileNames.length}`
    });
  }

  const manifestName = fileNames.find((name) => name === 'manifest.json' || name.endsWith('/manifest.json'));

  if (!manifestName) {
    addFinding(findings, {
      severity: 'error',
      code: 'manifest.missing',
      message: 'manifest.json が見つかりません。'
    });
  }

  for (const fileName of fileNames) {
    const lower = fileName.toLowerCase();

    if (fileName.includes('..') || fileName.startsWith('/') || /^[a-zA-Z]:/.test(fileName)) {
      addFinding(findings, {
        severity: 'error',
        code: 'path.traversal',
        message: '危険なファイルパスが含まれています。',
        file: fileName
      });
    }

    if (dangerousExtensions.some((ext) => lower.endsWith(ext) || lower.includes(`${ext}/`))) {
      addFinding(findings, {
        severity: 'error',
        code: 'file.dangerous_extension',
        message: '実行ファイルまたはネイティブバイナリの可能性があります。',
        file: fileName
      });
    }

    if (secretFilePatterns.some((pattern) => lower.includes(pattern))) {
      addFinding(findings, {
        severity: 'error',
        code: 'file.secret_like',
        message: '秘密情報らしきファイル名が含まれています。',
        file: fileName
      });
    }

    if (lower.includes('node_modules/')) {
      addFinding(findings, {
        severity: 'warning',
        code: 'deps.node_modules',
        message: 'node_modules が同梱されています。依存関係の確認が必要です。',
        file: fileName
      });
    }

    const fileBytes = files[fileName];

    if (isTextLike(fileName) && fileBytes.byteLength <= maxTextFileBytes) {
      let text = '';

      try {
        text = strFromU8(fileBytes);
      } catch {
        continue;
      }

      if (fileName === manifestName) {
        validateManifest(text, findings);
      }

      if (lower.endsWith('.js') || lower.endsWith('.mjs') || lower.endsWith('.cjs') || lower.endsWith('.ts')) {
        for (const item of jsDangerPatterns) {
          if (item.pattern.test(text)) {
            addFinding(findings, {
              severity: item.severity,
              code: item.code,
              message: item.message,
              file: fileName
            });
          }
        }
      }
    }
  }

  const status = getStatusFromFindings(findings);
  const risk_level = getRiskFromFindings(findings);

  const summary =
    status === 'pass'
      ? '静的安全性チェックを通過しました。'
      : status === 'warning'
        ? '注意が必要な項目があります。管理者確認が必要です。'
        : '危険または不完全な項目があります。承認しないでください。';

  return {
    status,
    risk_level,
    summary,
    findings
  };
}
