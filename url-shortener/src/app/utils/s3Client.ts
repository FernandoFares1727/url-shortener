import { S3Client } from '@aws-sdk/client-s3';
import { AppError } from '../errors/appError';
import { env } from '../config/envSchema';

if (!env.R2_ACCOUNT_ID || !env.R2_ACCESS_KEY || !env.R2_SECRET_KEY) {
  throw new AppError('R2 credentials not found in environment variables');
}

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY,
    secretAccessKey: env.R2_SECRET_KEY,
  },
});

export default s3Client;