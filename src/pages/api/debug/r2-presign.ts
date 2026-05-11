import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const mod = await import('@/lib/r2');

    const objectKey = `debug/${crypto.randomUUID()}.txt`;

    const uploadUrl = await mod.createPresignedUploadUrl({
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
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack?.slice(0, 1200) : null
      },
      {
        status: 500
      }
    );
  }
};
