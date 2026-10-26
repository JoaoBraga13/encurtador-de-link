# Encurtador de links

Aplicação web para criar links curtos, redirecionar visitantes para as URLs originais e contar os acessos.

## Tecnologias

- Frontend: React, TypeScript e Vite
- Backend: Node.js, TypeScript e Express
- Banco de dados: PostgreSQL
- Ambiente local: Docker Compose

## Estado atual

O ambiente local roda com Docker Compose, que inicia o PostgreSQL, o backend e o frontend. A API oferece as rotas `/health` e `/health/db`; a segunda verifica a conexão com o banco.

A criação e o redirecionamento de links ainda serão implementados.

## Pré-requisitos

- Docker Desktop com Docker Compose
- Node.js 24 LTS e npm para executar comandos do projeto diretamente no computador

## Preparar o ambiente

Execute os comandos a partir da raiz do repositório.

Na primeira configuração, crie o arquivo `.env` a partir do exemplo. O comando abaixo preserva um `.env` que já exista:

    if (-not (Test-Path .env)) {
        Copy-Item .env.example .env
    }

O arquivo `.env` contém as configurações locais do PostgreSQL e é ignorado pelo Git. Não o adicione ao repositório.

## Iniciar os serviços

Na raiz do repositório, execute:

    docker compose up --build

O comando constrói as imagens e inicia o banco, o backend e o frontend. Abra `http://localhost:5173/` no navegador.

Para verificar a API e a conexão com o banco, use outro terminal:

    Invoke-RestMethod http://localhost:3000/health
    Invoke-RestMethod http://localhost:3000/health/db

A rota do banco também pode ser acessada pelo proxy do frontend:

    Invoke-RestMethod http://localhost:5173/health/db

## Encerrar os serviços

Pressione `Ctrl+C` no terminal em que `docker compose up` está rodando. Para remover os containers e a rede do Compose, execute:

    docker compose down

Esse comando preserva os dados no volume `postgres_data`.