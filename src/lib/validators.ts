export const allowedPermissions = [
  'local_file_read',
  'local_file_write',
  'network_access',
  'clipboard_access',
  'external_command',
  'database_access',
  'ai_api_access'
] as const;

export type AddonPermission = (typeof allowedPermissions)[number];

const dangerousPermissions = new Set<AddonPermission>(['network_access', 'external_command', 'database_access', 'ai_api_access']);

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64) || `addon-${Date.now()}`;
}

export function validateUrl(value: string | undefined | null, required = false) {
  if (!value) return !required;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol);
  } catch {
    return false;
  }
}

export function isGitHubUrl(value: string | undefined | null) {
  if (!value) return false;
  try {
    return new URL(value).hostname === 'github.com';
  } catch {
    return false;
  }
}

export function normalizePermissions(value: unknown): AddonPermission[] {
  if (!Array.isArray(value)) return [];
  return value.filter((permission): permission is AddonPermission => allowedPermissions.includes(permission as AddonPermission));
}

export function inferRisk(permissions: AddonPermission[]) {
  if (permissions.some((p) => p === 'external_command' || p === 'database_access')) return 'unknown';
  if (permissions.some((p) => dangerousPermissions.has(p))) return 'medium';
  return 'low';
}

export function validateAddonPayload(payload: any) {
  const errors: string[] = [];
  const required = ['name', 'short_description', 'description', 'release_url', 'license', 'compatible_stellar_version', 'current_version', 'checksum'];
  for (const key of required) {
    if (!payload[key] || String(payload[key]).trim().length < 1) errors.push(`${key} is required.`);
  }
  if (!validateUrl(payload.release_url, true)) errors.push('release_url must be a valid URL.');
  if (payload.repo_url && !validateUrl(payload.repo_url)) errors.push('repo_url must be a valid URL.');
  if (payload.documentation_url && !validateUrl(payload.documentation_url)) errors.push('documentation_url must be a valid URL.');
  if (payload.repo_url && !isGitHubUrl(payload.repo_url)) errors.push('repo_url should be a GitHub URL in the MVP.');
  if (payload.release_url && !isGitHubUrl(payload.release_url)) errors.push('release_url should point to GitHub Releases in the MVP.');
  const permissions = normalizePermissions(payload.permissions);
  return { ok: errors.length === 0, errors, permissions, inferredRisk: inferRisk(permissions) };
}
