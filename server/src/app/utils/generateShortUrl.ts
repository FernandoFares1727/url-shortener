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

export function validateOriginalUrl(originalUrl: string): boolean {
  const schema = z.string().url({
    message: "URL original inválida. Deve ser uma URL completa com protocolo (http:// ou https://)"
  }).refine(
    url => {
      try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
      } catch {
        return false;
      }
    },
    {
      message: "A URL deve usar http:// ou https://"
    }
  );

  return schema.safeParse(originalUrl).success;
}