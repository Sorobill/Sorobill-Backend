# Environment & Configuration

## Contributor ENV Cheat Sheet

A compact reference for all environment variables used by the Sorobill Backend.

| Variable | Required for `npm run verify`? | Required for Local Dev? | Default / Example Value | Description & Guidance |
|---|:---:|:---:|---|---|
| `DATABASE_URL` | **No** | **Yes** | `postgresql://postgres:password@localhost:5432/sorobill` | PostgreSQL connection string for Prisma ORM |
| `REDIS_URL` | **No** | **Yes** (workers) | `redis://localhost:6379` | Redis broker instance for BullMQ billing & webhook queues |
| `TEST_MODE` | **No** | **Optional** | `true` | When `true`, executes dry-run billing without sending chain transactions |
| `STELLAR_NETWORK` | **No** | **Optional** | `testnet` | Target Stellar network (`testnet` or `mainnet`) |
| `STELLAR_HORIZON_URL` | **No** | **Optional** | `https://horizon-testnet.stellar.org` | Horizon HTTP REST endpoint for account balances & trustlines |
| `STELLAR_NETWORK_PASSPHRASE` | **No** | **Optional** | `Test SDF Network ; September 2015` | Stellar network passphrase for transaction envelope signing |
| `STELLAR_TREASURY_SECRET_KEY` | **No** | **Yes** (chain ops) | `S...` | Admin secret key authorizing `execute_billing` invocations |
| `SOROBAN_RPC_URL` | **No** | **Optional** | `https://soroban-testnet.stellar.org` | Soroban JSON-RPC endpoint for ledger events and contract state |
| `SUBSCRIPTION_CONTRACT_ID` | **No** | **Yes** (chain ops) | `CDENNEELMOUKIJGCSQUQ535FP53KRKNYA2PO7TOCI6O6IZVWZBYFML4W` | Address of deployed Sorobill contract (from `DEPLOYMENTS.md`) |
| `WEBHOOK_SIGNING_SECRET` | **No** | **Optional** | `your-webhook-signing-secret-min-32-chars` | HMAC secret for signing outgoing webhook events to merchants |
| `APP_FRONTEND_URL` | **No** | **Optional** | `http://localhost:3000` | Merchant UI origin for CORS headers (`https://sorobill-app.vercel.app` in prod) |

> 💡 **Pre-PR / CI Gate**: `npm run verify` runs static analysis, TypeScript type checking, and unit tests with mocked interfaces. None of the live service credentials are required to run `npm run verify`.

---

## Detailed Variable Sections

Required for full billing + indexer run:
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

## Billing flags

- `TEST_MODE=true` — skip real chain submits (dry-run billing)
- `USE_SOROBAN_BILLING=false` — fall back to Horizon payment path
- `GRACE_PERIOD_HOURS` — hours before cancel after failed payment (default 48)
- `MAX_PAYMENT_RETRIES` — retry budget (default 3)

## Webhooks

`WEBHOOK_SIGNING_SECRET` defaults to `dev-secret` in code when unset — always
override in any shared or production environment.
