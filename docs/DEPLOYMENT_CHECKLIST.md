# Deployment checklist

1. Postgres + Redis provisioned
2. `prisma db push` / migrate
3. `SUBSCRIPTION_CONTRACT_ID` matches contract DEPLOYMENTS.md
4. Treasury key = contract admin
5. Health `GET /health` green
6. Indexer ingest smoke (optional)

7. Set `APP_FRONTEND_URL=https://sorobill-app.vercel.app` (or your UI origin)
8. Confirm `WEBHOOK_SIGNING_SECRET` is rotated from the example value
9. Run `npm run verify` before promoting a build
