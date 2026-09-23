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

## Redis

`REDIS_URL` backs BullMQ billing and webhook workers. Default
`redis://localhost:6379` matches `docker compose`. Enable AUTH in production.

## Frontend URL

`APP_FRONTEND_URL` is the merchant UI origin used in CORS notes and demos.

| Environment | Value |
|---|---|
| Local | `http://localhost:3000` |
| Production | `https://sorobill-app.vercel.app` |

Keep this aligned with the deployed Sorobill-App so browser clients are not blocked.

## Stellar / Soroban

| Variable | Role |
|---|---|
| `SUBSCRIPTION_CONTRACT_ID` | Deployed subscription contract |
| `STELLAR_TREASURY_SECRET_KEY` | Signs `execute_billing` (must be contract admin) |
| `SOROBAN_RPC_URL` | Event polling + tx submit |
| `STELLAR_NETWORK` | `testnet` or `mainnet` |
