import { customAlphabet } from 'nanoid';
import { z } from 'zod';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 6);

export function generateShortUrl(): string {
  return nanoid();
}

export function validateShortUrl(shortUrl: string): boolean {
  const schema = z.string().regex(
    /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+[a-zA-Z0-9]$/,
    {
      message: "URL curta inválida. Exemplos válidos: meudominio.com ou sub.dominio.com.br"
    }
  );
  return schema.safeParse(shortUrl).success;
}