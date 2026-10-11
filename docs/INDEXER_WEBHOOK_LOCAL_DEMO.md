# Local Indexer & Webhook Verification Runbook

Step-by-step developer guide for running and testing the Soroban contract event indexer and webhook pipeline locally.

## 1. Local Environment Prerequisites
`ash
# Start local PostgreSQL and Soroban RPC standalone container
docker-compose up -d postgres soroban-rpc
npm run prisma:migrate
npm run dev
`

## 2. Triggering Local Indexer Poll
`ash
curl -X POST http://localhost:4000/api/v1/indexer/poll \
  -H "Content-Type: application/json" \
  -d '{"network": "testnet", "fromLedger": 1000}'
`

## 3. Webhook Delivery Verification
- Inspect simulated receiver logs on port 4001.
- Verify x-sorobill-signature matches HMAC-SHA256 of payload with WEBHOOK_SECRET.