# Docker setup

```bash
docker compose up -d
docker compose ps
```

Services:

| Service | Port | Credentials |
|---------|------|-------------|
| Postgres 16 | 5432 | postgres / password / db sorobill |
| Redis 7 | 6379 | — |

Then:

```bash
cp .env.example .env
npm install
npx prisma db push
npm run dev
```

API listens on port **3001** by default.

## Health checks

```bash
docker compose exec postgres pg_isready -U postgres
docker compose exec redis redis-cli ping
```

Expect `accepting connections` and `PONG`.

## Resetting local data

```bash
docker compose down -v
docker compose up -d
npx prisma db push
```

`-v` removes named volumes (Postgres data). Use only on disposable local DBs.

## Image build

```bash
docker build -t sorobill-backend .
```

The Dockerfile runs `prisma generate` and compiles TypeScript to `dist/`.
