//formato de link retornado pela API
export type ShortLink = {
  id: string;
  code: string;
  originalUrl: string;
  clickCount: string;
  createdAt: string;
};

//caminho da API de links no backend
const linksEndpoint = "/api/links";

//Converte uma resposta HTTP de erro em uma resposta legível
async function ensureResponseIsOk(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  const body = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;

  throw new Error(body?.error ?? "Não foi possível comunicar com a API"); 
}

//GET
//busca links cadastrados
export async function listShortLinks(): Promise<ShortLink[]> {
  const response = await fetch(linksEndpoint);
  await ensureResponseIsOk(response);
  return (await response.json()) as ShortLink[];
}

//POST
//Envia uma URL para criar um link curto
export async function createShortLink(originalUrl: string): Promise<ShortLink> {
  const response = await fetch(linksEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({originalUrl}),
  });

  await ensureResponseIsOk(response);
  return (await response.json()) as ShortLink;
}
