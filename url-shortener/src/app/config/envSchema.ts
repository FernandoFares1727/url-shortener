import { config } from 'dotenv';
import { z } from 'zod';
import { AppError } from '../errors/appError';

// Carrega as variáveis do arquivo .env
config();

// Schema de validação para as variáveis de ambiente
const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  R2_ACCOUNT_ID: z.string(),
  R2_ACCESS_KEY: z.string(),
  R2_SECRET_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),
  R2_PUBLIC_URL: z.string()
});

// Valida as variáveis de ambiente
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Variáveis de ambiente inválidas:', _env.error.format());
  throw new AppError('Variáveis de ambiente inválidas', 409);
}

// Exporta as variáveis validadas
export const env = _env.data;