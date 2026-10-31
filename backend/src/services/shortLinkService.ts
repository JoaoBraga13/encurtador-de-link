import { randomInt } from 'node:crypto';
import { pool } from '../database.js';

// Formato das colunas retornadas pelo PostgreSQL.
type ShortLinkRow = {
  id: string;
  code: string;
  original_url: string;
  click_count: string;
  created_at: Date
}

// Formato do link usado pelas camadas da aplicação.
export type ShortLink = {
  id: string;
  code: string;
  originalUrl: string;
  clickCount: string;
  createdAt: Date
}

// Erro usado quando a URL não é absoluta ou não usa HTTP/HTTPS
export class InvalidOriginalUrlError extends Error {
  // Define a mensagem e o nome específico do erro.
  constructor() {
    super("informe uma url absoluta com protocolo HTTP ou HTTPS");
    this.name = "InvalidOriginalUrlError";
  }
}

//Caracteres permitidos nos códigos curtos
const codeCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Gera um código de sete caracteres usando aleatoriedade segura.
function generateCode(): string {
  return Array.from(
    {length: 7},
    () => codeCharacters[randomInt(codeCharacters.length)],
  ).join("");
}

// Reconhece colisões na restrição única da coluna code.
function isCodeCollision(error: unknown): boolean {
  return (
    typeof error === "object" && error !== null && "code" in error && error.code === "23505"
    && "constraint" in error && error.constraint === "short_links_code_key"
  );
}

// Converte os nomes de coluna do banco para camelCase.
function mapRow(row: ShortLinkRow): ShortLink {
  return {
    id: row.id,
    code: row.code.trim(),
    originalUrl: row.original_url,
    clickCount: row.click_count,
    createdAt: row.created_at,
  };
}

// Valida a URL, gera um código e persiste o novo link.
export async function createShortLink(originalUrl: unknown,): Promise<ShortLink> {
    if(typeof originalUrl !== "string") {
      throw new InvalidOriginalUrlError();
    }

    let parsedUrl: URL;

    try {
      parsedUrl = new URL(originalUrl);
    } catch {
      throw new InvalidOriginalUrlError();
    }

    if(parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new InvalidOriginalUrlError();
    }


  for(let attempt = 0; attempt < 5; attempt ++) {
    const code = generateCode();

    try {
      const result = await pool.query<ShortLinkRow>(
        `INSERT INTO short_links (code, original_url)
        VALUES ($1, $2)
        RETURNING id, code, original_url, click_count, created_at`,
        [code, originalUrl],
      );

      return mapRow(result.rows[0]);
    } catch (error) {
      if(isCodeCollision(error)) {
        continue;
      }

      throw error;
    }
  }

    throw new Error("Não foi possível gerar um código curto");
}
