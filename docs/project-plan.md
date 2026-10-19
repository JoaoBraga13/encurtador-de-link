# Plano do projeto — Encurtador de links

> Documento inicial para orientar o desenvolvimento incremental. O projeto é pequeno de propósito: cada etapa deve servir para praticar desenvolvimento, entrega e operação, com decisões revisadas conforme o aprendizado.

## 1. Visão e objetivos

Construir uma aplicação web simples que transforme URLs longas em links curtos e contabilize o total de acessos a cada link. O projeto será desenvolvido com apoio do Codex em ritmo guiado, com explicações, pesquisa quando necessária e revisão das decisões antes de avançar.

Além de entregar uma aplicação funcional, o projeto é um exercício prático para aprender e aplicar boas práticas de desenvolvimento de software e SRE: frontend, backend, banco de dados, testes, Docker, Git e branches, automação de CI/CD e deploy.

## 2. Escopo inicial

### Incluído

- Criar e armazenar links curtos.
- Permitir a criação de **dois links curtos distintos** como necessidade inicial.
- Redirecionar o visitante do link curto para a URL original.
- Contabilizar e exibir somente o total de cliques de cada link.
- Interface web com React e TypeScript.
- API/backend e persistência em PostgreSQL.
- Testes nas partes relevantes da aplicação.
- Conteinerização com Docker.
- Repositório GitHub com README claro e documentação essencial.
- Esteira de CI/CD, priorizando GitHub Actions; Jenkins pode ser explorado se fizer sentido como aprendizado adicional.
- Deploy priorizando serviços gratuitos ou com camada gratuita, a validar quando essa etapa chegar.

### Fora do escopo inicial

- Autenticação e gerenciamento de usuários: o uso previsto é pessoal e, neste momento, não justifica essa complexidade.
- Métricas detalhadas de acesso (por exemplo, origem, localização ou dispositivo): será mantido apenas o total de cliques.
- Datadog.
- Funcionalidades avançadas como domínios personalizados, expiração de links, edição, remoção, analytics ou múltiplos papéis de usuário.

## 3. Requisitos e critérios de aceite

1. [x] Uma pessoa consegue cadastrar uma URL válida e receber um link curto.
2. [x] É possível manter pelo menos dois links curtos diferentes, cada um associado à sua própria URL original.
3. [x] Acessar um link curto válido redireciona para a URL original correspondente.
4. [x] Cada redirecionamento válido incrementa o contador total do link correto.
5. [x] A interface permite consultar os links cadastrados e o total de cliques de cada um.
6. URLs inválidas e códigos curtos inexistentes recebem tratamento claro e apropriado.
7. Os dados persistem no PostgreSQL entre reinicializações da aplicação.
8. As partes principais têm testes automatizados adequados ao desenho escolhido.
9. A aplicação pode ser executada localmente por meio de Docker, com instruções documentadas.
10. O README explica o propósito, os requisitos, como executar, como testar e como funciona o fluxo de contribuição e deploy.
11. A esteira automatizada executa verificações relevantes antes de permitir a publicação/deploy.
12. A aplicação é publicada em um serviço escolhido considerando a camada gratuita disponível no momento da implementação.

## 4. Decisões arquiteturais iniciais

| Tema | Decisão inicial | Observações |
|---|---|---|
| Frontend | React + TypeScript | Escolha definida pelo usuário. |
| Backend | API separada do frontend | Node.js + TypeScript + Express, decisão definida pelo usuário. |
| Banco de dados | PostgreSQL | Escolha definida pelo usuário. |
| Identificador curto | Código único associado a cada URL | Gerar 7 caracteres aleatórios com gerador seguro, impor unicidade no banco e tentar novamente em caso de colisão. |
| Contagem | Total de cliques por link | Sem coleta de atributos adicionais de acesso. |
| Autenticação | Não implementar inicialmente | Reavaliar se o uso ou a exposição mudarem. |
| Containers | Docker | Definir composição local e configuração por ambiente durante o desenho técnico. |
| CI/CD | Priorizar GitHub Actions | Jenkins permanece como opção de aprendizado, não como requisito. |
| Observabilidade | Manter simples e sem Datadog | Investigar uma alternativa simples, como OpenTelemetry, somente se agregar valor sem aumentar demais o escopo. |
| Hospedagem | Preferir opção gratuita ou camada gratuita | Seleção pendente de validação perto da etapa de deploy. |
| Documentação | README + este plano | Documentação adicional apenas quando ajudar a entender ou operar o projeto. |

## 5. Plano de execução

### Fase 0 — Planejamento e preparação

- [x] Consolidar objetivo, escopo inicial e preferências.
- [x] Definir critérios de aceite e decisões arquiteturais iniciais.
- [x] Definir tecnologia do backend: Node.js + TypeScript + Express.
- [x] Definir estratégia de geração do código curto.
- [x] Definir estrutura mínima do repositório.
- [x] Definir main como branch principal e usar branches temporárias feature/<nome> e fix/<nome>, integradas por pull request.
- [x] Escolher a estratégia inicial de testes e os limites da primeira entrega.

**Saída:** decisões suficientes para iniciar a implementação sem antecipar complexidade desnecessária.

### Fase 1 — Esqueleto executável

- Criar a estrutura do frontend, backend e configuração local.
- Subir a aplicação e o PostgreSQL localmente com Docker.
- Registrar instruções iniciais no README.

**Aceite:** ambiente local reproduzível e componentes básicos conversando entre si.

### Fase 2 — Funcionalidade principal

- Implementar criação e persistência de links curtos.
- Implementar redirecionamento e contagem total de cliques.
- Criar interface para cadastrar e consultar links e contagens.
- Cobrir regras principais com testes.

**Aceite:** os critérios funcionais 1–7 são atendidos localmente.

### Fase 3 — Qualidade e automação

- Completar testes relevantes e verificações de qualidade.
- Criar workflow de CI no GitHub Actions.
- Praticar branches separadas, push e pull request.

**Aceite:** mudanças passam por verificações automatizadas documentadas.

### Fase 4 — Publicação e operação básica

- Escolher hospedagem compatível com o orçamento e os requisitos atuais.
- Configurar variáveis e serviços necessários sem incluir segredos no repositório.
- Automatizar o deploy se a plataforma permitir de forma simples.
- Documentar implantação, limitações e operação básica.
- Avaliar se uma instrumentação simples com OpenTelemetry vale o custo de aprendizado.

**Aceite:** aplicação publicada, fluxo de deploy compreendido e instruções atualizadas.

## 6. Backlog imediato da Fase 0

1. [x] Definir geração do identificador curto, unicidade e comportamento em colisões.
2. [x] Esboçar entidades e endpoints mínimos para criação, listagem, redirecionamento e consulta de contagem.
3. [x] Definir convenção de branches e fluxo de pull request para praticar Git com segurança.
4. [x] Decidir estratégia mínima de validação de URL, erros e testes.
5. [x] Definir estrutura documental enxuta: README e este plano como documentos centrais; adicionar outros apenas se forem realmente úteis.

## 7. Organização documental proposta

- `README.md`: visão geral, pré-requisitos, execução, testes, contribuição e deploy.
- `docs/project-plan.md`: escopo, decisões, fases, backlog e registro conciso de mudanças importantes.

Manter a documentação pequena e atualizada. Se surgir conteúdo que não justifique um arquivo próprio, adicioná-lo em uma seção do README ou deste plano.

## 8. Riscos e pontos a revisar

- **Abuso de redirecionamento:** mesmo para uso pessoal, links curtos podem ser compartilhados. Reavaliar validação e limites antes de expor a aplicação publicamente.
- **Colisão de códigos:** a geração precisa garantir unicidade no banco e tratar tentativas repetidas.
- **Contagem concorrente:** atualizações simultâneas não devem perder cliques; definir uma operação atômica no banco/API.
- **Serviços gratuitos:** limites e disponibilidade mudam. Confirmar condições no momento da escolha do deploy.
- **Escopo de observabilidade:** manter fora do caminho crítico até que haja uma opção simples e um objetivo concreto.

## 9. Forma de trabalho

- Avançar em etapas pequenas, explicando as decisões e seus motivos.
- Pesquisar documentação oficial quando uma escolha depender de comportamento ou oferta atual.
- Revisar o plano ao fim de cada fase, refletindo decisões tomadas e itens concluídos.
- Não implementar uma tecnologia ou prática só para adicioná-la ao currículo: ela deve contribuir para o objetivo de aprendizado do projeto.

## 10. Registro de decisões

| Data | Decisão | Motivo/impacto |
|---|---|---|
| 2026-10-17 | React + TypeScript no frontend, Node.js + TypeScript + Express no backend e PostgreSQL como banco | Preferências e decisão definidas para a Fase 0. |
| 2026-10-17 | Gerar códigos curtos aleatórios de 7 caracteres com gerador seguro; impor unicidade no banco e tentar novamente em caso de colisão | Evitar códigos previsíveis e garantir unicidade sem complicar a implementação inicial. |
| 2026-10-17 | Modelar ShortLink com id, code, original_url, click_count e created_at (preenchido automaticamente pelo PostgreSQL); oferecer POST /api/links, GET /api/links e GET /:code | Definir o contrato mínimo da API; o redirecionamento incrementará o contador atomicamente no banco para não perder cliques concorrentes. |
| 2026-10-17 | Testar a API por integração para cadastro, listagem, redirecionamento, incremento de cliques e tratamento de URL inválida ou código inexistente; cobrir a interface quando for implementada | Validar primeiro os fluxos completos do backend, mantendo a primeira entrega focada. |
| 2026-10-17 | Aceitar somente URLs absolutas com protocolo `http` ou `https`, validadas pelo parser de URL do Node.js; responder `400` para URL inválida ou protocolo não permitido | Validar sintaxe e protocolo sem fazer requisições de rede ao endereço de destino. |
| 2026-10-17 | Responder `404 Not Found` sem redirecionar quando `GET /:code` receber um código curto inexistente | Dar um resultado HTTP claro para links que não estão cadastrados. |
| 2026-10-17 | Retornar erros da API em JSON com status HTTP apropriado e mensagem legível, incluindo `400` para URL inválida e `404` para código inexistente | Manter respostas de erro previsíveis e fáceis de validar por clientes e testes. |
| 2026-10-17 | Usar `main` como branch principal e branches temporárias `feature/<nome>` e `fix/<nome>` por tarefa, integradas por pull request | Manter `main` como referência estável e evitar branches permanentes que exijam sincronização contínua. |
| 2026-10-17 | Manter um único repositório com `frontend/`, `backend/`, `docker-compose.yml`, `.env.example`, `README.md` e `docs/project-plan.md`; cada aplicação terá seu próprio `package.json` | Separar os componentes sem acrescentar configuração de monorepo, facilitando a execução local e a futura CI. |
| 2026-10-17 | Dois links curtos distintos como necessidade inicial; contar somente cliques totais | Escopo funcional informado pelo usuário. |
| 2026-10-17 | Não priorizar autenticação; excluir Datadog; documentação enxuta | Manter o projeto simples e adequado ao uso pessoal e ao aprendizado. |
| 2026-10-17 | Priorizar serviços gratuitos e considerar OpenTelemetry apenas se simples | Reduzir custo e complexidade operacional. |


