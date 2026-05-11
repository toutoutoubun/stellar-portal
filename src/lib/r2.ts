import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getEnv } from '@/lib/env';

function assertConfigured(value: string, name: string) {
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export function createR2Client() {
  const env = getEnv();

  const accountId = assertConfigured(env.R2_ACCOUNT_ID, 'R2_ACCOUNT_ID');
  const accessKeyId = assertConfigured(env.R2_ACCESS_KEY_ID, 'R2_ACCESS_KEY_ID');
  const secretAccessKey = assertConfigured(env.R2_SECRET_ACCESS_KEY, 'R2_SECRET_ACCESS_KEY');

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}

export function getR2BucketName() {
  const env = getEnv();
  return assertConfigured(env.R2_BUCKET_NAME, 'R2_BUCKET_NAME');
}

export async function createPresignedUploadUrl(input: {
  objectKey: string;
  contentType: string;
}) {
  const client = createR2Client();

  const command = new PutObjectCommand({
    Bucket: getR2BucketName(),
    Key: input.objectKey,
    ContentType: input.contentType
  });

  return getSignedUrl(client, command, {
    expiresIn: 60 * 10
  });
}

export async function createPresignedDownloadUrl(input: {
  objectKey: string;
  fileName?: string;
}) {
  const client = createR2Client();

  const command = new GetObjectCommand({
    Bucket: getR2BucketName(),
    Key: input.objectKey,
    ResponseContentDisposition: input.fileName
      ? `attachment; filename="${encodeURIComponent(input.fileName)}"`
      : undefined
  });

  return getSignedUrl(client, command, {
    expiresIn: 60 * 5
  });
}

export async function deleteR2Object(objectKey: string) {
  const client = createR2Client();

  const command = new DeleteObjectCommand({
    Bucket: getR2BucketName(),
    Key: objectKey
  });

  await client.send(command);
}
