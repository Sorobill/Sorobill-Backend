# Environment

Required for billing + indexer:
- `DATABASE_URL`
- `REDIS_URL`
- `SUBSCRIPTION_CONTRACT_ID`
- `STELLAR_TREASURY_SECRET_KEY`
- `NODE_ENV` (`production` enforces wallet auth on writes)

Optional:
- `APP_FRONTEND_URL` — merchant UI origin (`https://sorobill-app.vercel.app` in production)

## Database

`DATABASE_URL` must point at Postgres 14+. Local docker-compose uses
`postgresql://postgres:password@localhost:5432/sorobill`. Run
`npx prisma db push` (or migrate) after changing the schema.
