import { env as cloudflareEnv } from 'cloudflare:workers';

function getAddonBucket() {
  const bucket = cloudflareEnv.ADDON_BUCKET;

  if (!bucket || typeof bucket === 'string') {
    throw new Error('ADDON_BUCKET R2 binding is not configured.');
  }

  return bucket;
}

export async function putR2Object(input: {
  objectKey: string;
  body: ArrayBuffer | ReadableStream;
  contentType?: string;
  metadata?: Record<string, string>;
}) {
  const bucket = getAddonBucket();

  await bucket.put(input.objectKey, input.body, {
    httpMetadata: {
      contentType: input.contentType ?? 'application/octet-stream'
    },
    customMetadata: input.metadata
  });
}

export async function getR2Object(objectKey: string) {
  const bucket = getAddonBucket();
  return bucket.get(objectKey);
}

export async function deleteR2Object(objectKey: string) {
  const bucket = getAddonBucket();
  await bucket.delete(objectKey);
}
