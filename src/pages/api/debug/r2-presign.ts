import type { APIRoute } from 'astro';
import { createPresignedUploadUrl } from '@/lib/r2';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const objectKey = `debug/${crypto.randomUUID()}.txt`;

    const uploadUrl = await createPresignedUploadUrl({
      objectKey,
      contentType: 'text/plain'
    });

    return Response.json({
      ok: true,
      objectKey,
      hasUploadUrl: Boolean(uploadUrl),
      uploadUrlStartsWith: uploadUrl.slice(0, 80)
    });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unknown R2 presign error'
      },
      { status: 500 }
    );
  }
};
