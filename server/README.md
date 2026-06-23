# brev.ly — Server

API do encurtador de links brev.ly, construída com Fastify, Drizzle ORM e PostgreSQL.

## Requisitos

- [Node.js 24+](https://nodejs.org/)
- [Docker](https://www.docker.com/) e Docker Compose (para o banco de dados e/ou para rodar a aplicação containerizada)

## Variáveis de ambiente

Copie o `.env.example` para `.env` e preencha os valores:

```
cp .env.example .env
```

| Variável | Descrição |
| --- | --- |
| `PORT` | Porta em que o servidor HTTP sobe (padrão `3333`) |
| `NODE_ENV` | `development`, `test` ou `production` |
| `DATABASE_URL` | String de conexão do PostgreSQL |
| `CLOUDFLARE_ACCOUNT_ID` | ID da conta Cloudflare (upload de arquivos via R2) |
| `CLOUDFLARE_ACCESS_KEY_ID` | Access key do R2 |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | Secret key do R2 |
| `CLOUDFLARE_BUCKET` | Nome do bucket R2 |
| `CLOUDFLARE_PUBLIC_URL` | URL pública usada para servir os arquivos do bucket |

## Modo desenvolvimento

1. Suba apenas o banco de dados:

   ```
   docker compose up -d pg
   ```

2. Instale as dependências:

   ```
   npm install
   ```

3. Rode as migrations:

   ```
   npm run db:migrate
   ```

4. Inicie o servidor com hot-reload:

   ```
   npm run dev
   ```

A API sobe em `http://localhost:3333`, com a documentação Swagger em `http://localhost:3333/docs`.

### Outros comandos úteis

| Comando | Descrição |
| --- | --- |
| `npm run db:studio` | Abre o Drizzle Studio para inspecionar o banco |
| `npm run db:generate` | Gera uma nova migration a partir do schema |
| `npm test` | Roda a suíte de testes (usa `.env.test`) |
| `npm run db:migrate:test` | Roda as migrations no banco de testes |

## Modo produção

A aplicação é distribuída como uma imagem Docker (`Dockerfile` multi-stage, com build em TypeScript e execução em um usuário não-root).

### Subindo com Docker Compose (app + banco)

```
docker compose up -d --build
```

Isso constrói a imagem da API, sobe o PostgreSQL com healthcheck e inicia o container `app` apontando para o banco do próprio compose. A API fica disponível em `http://localhost:3333`.

Para acompanhar os logs:

```
docker compose logs -f app
```

Para parar:

```
docker compose down
```

### Gerando e rodando a imagem manualmente

```
docker build -t app-brevly .
docker run -d \
  --name app-brevly \
  -p 3333:3333 \
  -e DATABASE_URL="postgresql://docker:docker@<host-do-banco>:5432/db-brevly" \
  -e PORT=3333 \
  app-brevly
```

> Ajuste `DATABASE_URL` para apontar para o banco de produção. As migrations precisam ser aplicadas antes (ou no startup, conforme a configuração do projeto) — veja `npm run db:migrate`.

## Build local (sem Docker)

```
npm install
npm run build
npm start
```

O build gera os arquivos em `dist/`, e `npm start` executa `dist/server.js` diretamente.
