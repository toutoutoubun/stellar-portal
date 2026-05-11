import type { APIRoute } from 'astro';
import { createSupabaseAdmin, createSupabaseServer } from '@/lib/supabaseServer';

export const prerender = false;

const allowedPermissions = [
  'local_file_read',
  'local_file_write',
  'network_access',
  'clipboard_access',
  'external_command',
  'database_access',
  'ai_api_access'
];

type Manifest = {
  id?: unknown;
  name?: unknown;
  version?: unknown;
  description?: unknown;
  author?: unknown;
  compatibleStellarVersion?: unknown;
  permissions?: unknown;
  entry?: unknown;
  license?: unknown;
  category?: unknown;
};

function normalizeManifest(input: unknown) {
  if (!input || typeof input !== 'object') {
    throw new Error('manifest.json must be an object.');
  }

  const manifest = input as Manifest;

  const id = typeof manifest.id === 'string' ? manifest.id.trim() : '';
  const name = typeof manifest.name === 'string' ? manifest.name.trim() : '';
  const version = typeof manifest.version === 'string' ? manifest.version.trim() : '';
  const description = typeof manifest.description === 'string' ? manifest.description.trim() : '';
  const compatibleStellarVersion =
    typeof manifest.compatibleStellarVersion === 'string'
      ? manifest.compatibleStellarVersion.trim()
      : '';
  const entry = typeof manifest.entry === 'string' ? manifest.entry.trim() : '';
  const license = typeof manifest.license === 'string' ? manifest.license.trim() : '';
  const category = typeof manifest.category === 'string' ? manifest.category.trim() : null;

  if (!id) throw new Error('manifest.id is required.');
  if (!name) throw new Error('manifest.name is required.');
  if (!version) throw new Error('manifest.version is required.');
  if (!description) throw new Error('manifest.description is required.');
  if (!compatibleStellarVersion) throw new Error('manifest.compatibleStellarVersion is required.');
  if (!entry) throw new Error('manifest.entry is required.');
  if (!license) throw new Error('manifest.license is required.');

  const permissions = Array.isArray(manifest.permissions)
    ? manifest.permissions
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const unknownPermissions = permissions.filter(
    (permission) => !allowedPermissions.includes(permission)
  );

  if (unknownPermissions.length > 0) {
    throw new Error(`Unknown permissions: ${unknownPermissions.join(', ')}`);
  }

  return {
    id,
    name,
    version,
    description,
    compatibleStellarVersion,
    permissions,
    entry,
    license,
    category
  };
}

function riskFromPermissions(permissions: string[]) {
  if (permissions.includes('external_command')) return 'high';
  if (permissions.includes('network_access')) return 'medium';
  if (permissions.includes('database_access')) return 'medium';
  if (permissions.includes('ai_api_access')) return 'medium';
  return 'low';
}

export const PATCH: APIRoute = async (context) => {
  const supabase = createSupabaseServer(context);
  const admin = createSupabaseAdmin();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const addonId = context.params.id;

  if (!addonId) {
    return Response.json({ error: 'Missing addon id.' }, { status: 400 });
  }

  const body = await context.request.json().catch(() => ({}));

  let manifestInput: unknown = body.manifest;

  if (typeof manifestInput === 'string') {
    try {
      manifestInput = JSON.parse(manifestInput);
    } catch {
      return Response.json({ error: 'Invalid JSON.' }, { status: 400 });
    }
  }

  const { data: addon, error: addonError } = await admin
    .from('addons')
    .select('id, author_id, review_status')
    .eq('id', addonId)
    .single();

  if (addonError || !addon) {
    return Response.json({ error: 'Addon not found.' }, { status: 404 });
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  const role = profile?.role ?? 'free_user';
  const canEdit = addon.author_id === user.id || role === 'admin' || role === 'reviewer';

  if (!canEdit) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  let normalized;

  try {
    normalized = normalizeManifest(manifestInput);
  } catch (error) {
    await admin
      .from('addons')
      .update({
        manifest_json: manifestInput ?? null,
        manifest_error: error instanceof Error ? error.message : 'Manifest validation failed.',
        updated_at: new Date().toISOString()
      })
      .eq('id', addonId);

    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Manifest validation failed.'
      },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();

  const { error } = await admin
    .from('addons')
    .update({
      name: normalized.name,
      description: normalized.description,
      short_description: normalized.description.slice(0, 180),
      current_version: normalized.version,
      compatible_stellar_version: normalized.compatibleStellarVersion,
      permissions: normalized.permissions,
      risk_level: riskFromPermissions(normalized.permissions),
      license: normalized.license,
      entrypoint: normalized.entry,
      category: normalized.category,
      manifest_json: manifestInput,
      manifest_validated_at: now,
      manifest_error: null,
      review_status: addon.review_status === 'approved' ? 'pending' : addon.review_status,
      updated_at: now
    })
    .eq('id', addonId);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  await admin.from('audit_logs').insert({
    actor_id: user.id,
    action: 'addon.manifest.import',
    target_type: 'addon',
    target_id: addonId,
    metadata: {
      manifest_id: normalized.id,
      version: normalized.version,
      permissions: normalized.permissions
    }
  });

  return Response.json({
    ok: true,
    manifest: normalized
  });
};
