# Encurtador de links

Aplicação web para criar links curtos, redirecionar visitantes para as URLs originais e contar os acessos.

## Tecnologias

- Frontend: React, TypeScript e Vite
- Backend: Node.js, TypeScript e Express
- Banco de dados: PostgreSQL
- Ambiente local: Docker Compose
- Observabilidade: Grafana (integração planejada para a Fase 4)

## Estado atual

A aplicação permite cadastrar URLs HTTP/HTTPS, listar links curtos, redirecionar para os destinos e contar cliques. A API oferece `POST /api/links`, `GET /api/links` e `GET /:code`, além das rotas de saúde `/health` e `/health/db`.

Os testes do backend cobrem os fluxos da API com PostgreSQL; os testes do frontend verificam a tela com respostas simuladas da API. O Grafana foi escolhido para observabilidade, mas ainda não está configurado; a integração está planejada para a Fase 4.

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

## Testes e builds

Os testes de integração do backend usam PostgreSQL. Em um banco local novo, aplique a migração uma vez antes dos testes. Se a tabela `short_links` já existir no volume local, pule os dois primeiros comandos:

    docker compose up -d db
    Get-Content .\backend\migrations\001_create_short_links.sql | docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"'

Execute os testes e builds a partir da raiz do repositório:

    docker compose run --build --rm backend npm test
    npm --prefix frontend test
    npm --prefix backend run build
    npm --prefix frontend run build

Os testes do frontend simulam as respostas da API e não precisam do backend em execução.

## Encerrar os serviços

Pressione `Ctrl+C` no terminal em que `docker compose up` está rodando. Para remover os containers e a rede do Compose, execute:

    docker compose down

Esse comando preserva os dados no volume `postgres_data`.