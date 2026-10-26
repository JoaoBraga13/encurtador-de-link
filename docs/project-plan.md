# Plano do projeto — Encurtador de links

> Este documento reúne o escopo inicial, as decisões técnicas e as etapas do projeto. Atualize-o quando uma decisão ou o andamento mudar.

## 1. Visão e objetivos

Construir uma aplicação web para criar links curtos, redirecionar visitantes para as URLs originais e contabilizar os acessos.

O projeto também serve para praticar o desenvolvimento e a operação de uma aplicação: frontend, backend, PostgreSQL, testes, Docker, Git, CI/CD e deploy.

## 2. Escopo inicial

### Incluído

- Criar e armazenar links curtos.
- Manter pelo menos dois links curtos distintos.
- Redirecionar cada link curto para sua URL original.
- Contabilizar e exibir o total de cliques de cada link.
- Interface web com React e TypeScript.
- API em Node.js, TypeScript e Express.
- Persistência em PostgreSQL.
- Testes automatizados nas partes relevantes.
- Execução local com Docker.
- Repositório no GitHub com README e documentação essencial.
- CI/CD, priorizando GitHub Actions. Jenkins pode ser explorado como aprendizado adicional.
- Deploy em um serviço gratuito ou com camada gratuita, a validar quando essa etapa chegar.

### Fora do escopo inicial

- Autenticação e gerenciamento de usuários; o uso previsto é pessoal.
- Métricas detalhadas de acesso, como origem, localização ou dispositivo.
- Datadog.
- Domínios personalizados, expiração, edição ou remoção de links, analytics detalhado e múltiplos papéis de usuário.

## 3. Requisitos e critérios de aceite

1. Uma pessoa consegue cadastrar uma URL válida e receber um link curto.
2. É possível manter pelo menos dois links curtos distintos, cada um associado à sua URL original.
3. Acessar um link curto válido redireciona para a URL original correspondente.
4. Cada redirecionamento válido incrementa o contador do link correto.
5. A interface permite consultar os links cadastrados e o total de cliques de cada um.
6. URLs inválidas e códigos curtos inexistentes recebem tratamento apropriado.
7. Os dados persistem no PostgreSQL entre reinicializações da aplicação.
8. As partes principais têm testes automatizados adequados ao desenho escolhido.
9. A aplicação pode ser executada localmente com Docker, seguindo as instruções documentadas.
10. O README explica o propósito do projeto, os requisitos e como executar, testar e contribuir.
11. A esteira automatizada executa verificações relevantes antes da publicação.
12. A aplicação é publicada em um serviço escolhido considerando a camada gratuita disponível no momento do deploy.

## 4. Decisões arquiteturais iniciais

| Tema | Decisão inicial | Observações |
|---|---|---|
| Frontend | React + TypeScript | Interface para cadastrar e consultar links. |
| Backend | API separada do frontend | Node.js + TypeScript + Express. |
| Banco de dados | PostgreSQL | Armazenar URLs, códigos curtos e contagem de cliques. |
| Identificador curto | Código único associado a cada URL | Gerar 7 caracteres aleatórios com gerador seguro, impor unicidade no banco e tentar novamente em caso de colisão. |
| Contagem | Total de cliques por link | Não coletar outros dados de acesso. |
| Autenticação | Fora da primeira versão | Reavaliar se o uso ou a exposição mudarem. |
| Containers | Docker | Usar Docker Compose no ambiente local. |
| CI/CD | Priorizar GitHub Actions | Jenkins pode ser explorado, mas não é requisito. |
| Observabilidade | Manter simples, sem Datadog | Avaliar OpenTelemetry se houver um objetivo concreto e a configuração for simples. |
| Hospedagem | Preferir opção gratuita ou com camada gratuita | Validar as condições quando a etapa de deploy chegar. |
| Documentação | README e este plano | Criar outros documentos apenas quando forem úteis. |

## 5. Plano de execução

### Fase 0 — Planejamento e preparação

- [x] Definir o objetivo e o escopo inicial.
- [x] Definir os critérios de aceite e as decisões arquiteturais.
- [x] Definir o backend com Node.js, TypeScript e Express.
- [x] Definir a estratégia de geração do código curto.
- [x] Definir a estrutura inicial do repositório.
- [x] Definir main como branch principal e usar branches temporárias feature/nome e fix/nome, integradas por pull request.
- [x] Definir a estratégia inicial de testes e os limites da primeira entrega.

**Resultado:** o projeto tem escopo e decisões suficientes para iniciar a implementação.

### Fase 1 — Ambiente local

- [x] Criar o esqueleto do backend e a rota GET /health.
- [x] Criar o esqueleto do frontend com React, TypeScript e Vite.
- [x] Configurar o PostgreSQL local com Docker Compose e variáveis em .env.example.
- [x] Confirmar a execução local do frontend, da rota de saúde e do PostgreSQL.
- [x] Registrar as instruções atuais de execução no README.
- [x] Integrar frontend, backend e PostgreSQL no fluxo local com Docker Compose.

**Aceite:** o ambiente local pode ser reproduzido e os componentes básicos se comunicam.

### Fase 2 — Funcionalidade principal

- Implementar a criação e a persistência de links curtos.
- Implementar o redirecionamento e a contagem total de cliques.
- Criar a interface para cadastrar e consultar links e contagens.
- Cobrir as regras principais com testes.

**Aceite:** os requisitos funcionais 1 a 7 são atendidos localmente.

### Fase 3 — Qualidade e automação

- Completar os testes relevantes e as verificações de qualidade.
- Criar o workflow de CI no GitHub Actions.
- Usar branches separadas, push e pull request.

**Aceite:** as mudanças passam por verificações automatizadas documentadas.

### Fase 4 — Publicação e operação

- Escolher uma hospedagem compatível com o orçamento e os requisitos atuais.
- Configurar as variáveis e os serviços sem incluir segredos no repositório.
- Automatizar o deploy se a plataforma permitir uma configuração simples.
- Documentar a implantação, as limitações e a operação básica.
- Avaliar se OpenTelemetry agrega valor ao projeto.

**Aceite:** a aplicação está publicada, o fluxo de deploy é conhecido e as instruções estão atualizadas.

## 6. Backlog da Fase 0

1. [x] Definir a geração do código curto, a unicidade e o tratamento de colisões.
2. [x] Esboçar a entidade ShortLink e os endpoints de criação, listagem, redirecionamento e contagem.
3. [x] Definir a convenção de branches e o fluxo de pull request.
4. [x] Definir a validação de URL, os erros e a estratégia de testes.
5. [x] Definir o README e este plano como documentos centrais.

## 7. Documentação

- README.md: propósito, pré-requisitos e instruções para executar e testar o projeto.
- docs/project-plan.md: escopo, decisões, etapas, riscos e registro das decisões relevantes.

Mantenha os documentos atualizados e curtos. Acrescente outro documento apenas quando ele facilitar o desenvolvimento ou a operação.

## 8. Riscos e pontos a revisar

- **Uso indevido de redirecionamentos:** links curtos podem ser compartilhados. Reavaliar validação e limites antes de publicar a aplicação.
- **Colisão de códigos:** garantir unicidade no banco e tratar tentativas repetidas.
- **Cliques simultâneos:** atualizar o contador atomicamente para não perder acessos.
- **Serviços gratuitos:** confirmar limites e disponibilidade na etapa de deploy.
- **Observabilidade:** só adicionar ferramentas quando houver uma necessidade concreta.

## 9. Forma de trabalho

- Avançar em etapas pequenas e registrar as decisões que afetarem o escopo ou a implementação.
- Consultar a documentação oficial quando uma escolha depender do comportamento atual de uma ferramenta ou serviço.
- Revisar o plano ao fim de cada fase.
- Adotar ferramentas e práticas quando contribuírem para o projeto e para o aprendizado.

## 10. Registro de decisões

| Data | Decisão | Motivo e impacto |
|---|---|---|
| 2026-10-17 | Usar React + TypeScript no frontend, Node.js + TypeScript + Express no backend e PostgreSQL | Definir a base técnica da aplicação. |
| 2026-10-17 | Gerar códigos de 7 caracteres aleatórios com gerador seguro, impor unicidade no banco e tentar novamente em caso de colisão | Evitar códigos previsíveis e tratar colisões sem complicar a primeira versão. |
| 2026-10-17 | Modelar ShortLink com id, code, original_url, click_count e created_at, preenchido pelo PostgreSQL; oferecer POST /api/links, GET /api/links e GET /:code | Definir o contrato inicial da API e incrementar o contador atomicamente para preservar cliques simultâneos. |
| 2026-10-17 | Testar por integração cadastro, listagem, redirecionamento, incremento de cliques e tratamento de URL inválida ou código inexistente; cobrir a interface quando ela for implementada | Validar primeiro os fluxos completos do backend. |
| 2026-10-17 | Aceitar apenas URLs absolutas com protocolo http ou https, validadas pelo parser de URL do Node.js; responder 400 para URL inválida ou protocolo não permitido | Validar formato e protocolo sem fazer requisições ao endereço de destino. |
| 2026-10-17 | Responder 404 Not Found, sem redirecionar, para códigos curtos inexistentes | Dar uma resposta HTTP clara para links não cadastrados. |
| 2026-10-17 | Retornar erros em JSON, com status HTTP apropriado e mensagem legível | Manter respostas previsíveis para clientes e testes. |
| 2026-10-17 | Usar main como branch principal e branches temporárias feature/nome e fix/nome, integradas por pull request | Manter uma branch principal estável e organizar mudanças por tarefa. |
| 2026-10-17 | Manter frontend, backend, Docker Compose, .env.example, README e plano em um único repositório; cada aplicação terá seu próprio package.json | Separar os componentes sem exigir configuração de monorepo. |
| 2026-10-17 | Começar com dois links curtos distintos e contabilizar apenas o total de cliques | Manter a primeira entrega pequena e atender ao uso previsto. |
| 2026-10-17 | Deixar autenticação e Datadog fora da primeira versão e manter a documentação enxuta | Reduzir o escopo e a complexidade operacional. |
| 2026-10-17 | Priorizar serviços gratuitos e avaliar OpenTelemetry apenas se a configuração for simples e útil | Controlar custo e complexidade. |
