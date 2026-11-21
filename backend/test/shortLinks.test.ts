import assert from "node:assert/strict";
import {after, before, test} from "node:test";
import type {Server} from "node:http";
import app from "../src/app.js";
import { pool} from '../src/database.js';

//Formato dos links retornados pela API
type ShortLinkResponse = {
  id: string;
  code: string;
  originalUrl: string;
  clickCount: string;
  createdAt: string;
};

//Servidor temporário e endereço usado pelos testes
let server: Server | undefined;
let baseUrl = "";

//Inicia o Express em uma porta livre antes dos testes
before(async ()  => {
  const testServer = app.listen(0,"127.0.0.1");
  server = testServer;

  await new Promise<void>((resolve, reject) => {
    testServer.once("listening", resolve);
    testServer.once("error", reject);
  });

  const address = testServer.address();

  if(!address || typeof address === "string") {
    throw new Error("Não foi possível iniciar o servidor de teste");
  }

  baseUrl = `http://127.0.0.1:${address.port}`;
});

//Fecha o servidor e o pool do PostgreSQL após os testes
after(async() => {
  const activeServer = server;

  if(activeServer) {
    await new Promise<void>((resolve, reject) => {
      activeServer.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  await pool.end();
});

//verifica criação, listagem, redirecionamento e incremento dos cliques
test("cria e lista um link, redireciona e incrementa os cliques", async() => {
  let createdCode: string | undefined;
  const originalUrl = "https://example.com/integration-test";

  try {
    const createResponse = await fetch(`${baseUrl}/api/links`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ originalUrl }),
    });

    assert.equal(createResponse.status, 201);

    const createdLink = await createResponse.json() as ShortLinkResponse;

    createdCode = createdLink.code;

    assert.match(createdLink.code, /^[A-Za-z0-9]{7}$/);
    assert.equal(createdLink.originalUrl, originalUrl);
    assert.equal(createdLink.clickCount, "0");

    const listResponse = await fetch(`${baseUrl}/api/links`);
    assert.equal(listResponse.status, 200);

    const links = (await listResponse.json()) as ShortLinkResponse[];
    assert.ok(links.some((link) => link.code === createdCode));

    const redirectResponse = await fetch(`${baseUrl}/${createdCode}`, {
      redirect: 'manual',
    });

    assert.equal(redirectResponse.status, 302);
    assert.equal(redirectResponse.headers.get("location"), originalUrl);

    const updatedListResponse = await fetch(`${baseUrl}/api/links`);
    const updatedLinks = 
    (await updatedListResponse.json()) as ShortLinkResponse[];
    const updatedLink = updatedLinks.find(
      (link) => link.code === createdCode,
    );

    assert.equal(updatedLink?.clickCount, "1");
  } finally {
    if (createdCode) {
      await pool.query("DELETE FROM short_links WHERE code = $1", [
        createdCode,
      ]);
    }
  }
});

//confirma que URLs com protocolo não permitido recebem 400
test("rejeita URL com protocolo não permitido", async()  => {
  const response = await fetch(`${baseUrl}/api/links`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ originalUrl: "ftp://example.com/file" }),
  });

  assert.equal(response.status, 400);
});

//confirma que códigos não cadastrados recebem 404
test("retorna 404 para código curto inexistente", async() => {
  const response = await fetch(`${baseUrl}/missing-code-for-test`);

  assert.equal(response.status, 404);
});
