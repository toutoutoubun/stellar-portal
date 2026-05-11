declare module 'cloudflare:workers' {
  export const env: {
    ADDON_BUCKET?: R2Bucket;
    [key: string]: string | R2Bucket | undefined;
  };
}
