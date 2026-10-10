# Sorobill Backend cURL Recipes

Copy-paste recipes for testing endpoints locally with `npm run dev` (with `TEST_MODE=true` in `.env`).

---

## 1. Health Endpoints

### Full Health Check
Inspect API status, PostgreSQL connection, Redis connection, and Soroban RPC status:
```bash
curl -s http://localhost:3000/health | jq .
```

Expected response (healthy):
```json
{
  "status": "ok",
  "ts": "2026-10-10T23:00:00.000Z",
  "checks": {
    "api": "ok",
    "database": "ok",
    "redis": "ok",
    "soroban": "skipped",
    "contract": "unconfigured"
  }
}
```

### Liveness Probe
Lightweight probe for container orchestrators:
```bash
curl -s http://localhost:3000/health/live | jq .
```

---

## 2. Indexer Endpoints

### List Chain Events (Public)
Retrieve recorded Soroban events with optional `type` filter and `limit` query parameters:
```bash
# List all events (default limit: 50)
curl -s http://localhost:3000/api/v1/indexer/events | jq .

# Filter by event type (e.g. payment, subscribe, cancel)
curl -s "http://localhost:3000/api/v1/indexer/events?type=payment&limit=10" | jq .
```

### Ingest Chain Event (Requires Wallet Auth in Production)
Ingest a validated Soroban smart contract event:
```bash
curl -s -X POST http://localhost:3000/api/v1/indexer/ingest \
  -H "Content-Type: application/json" \
  -H "x-wallet-address: GABCD1234EXAMPLEACCOUNTKEYFORTESTING0000000000000000000000000" \
  -d '{
    "type": "payment",
    "contractId": "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    "txHash": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    "ledger": 123456,
    "payload": {
      "subscriptionId": "sub_test_01",
      "amount": "10000000"
    }
  }' | jq .
```

---

## 3. Production Authentication Requirements

| Endpoint | Method | Auth Requirement | Header |
|---|---|---|---|
| `/health` | `GET` | Public | None |
| `/health/live` | `GET` | Public | None |
| `/api/v1/indexer/events` | `GET` | Public | None |
| `/api/v1/indexer/ingest` | `POST` | Protected (`requireWalletAuth`) | `x-wallet-address` / signed challenge |
| `/api/v1/indexer/poll` | `POST` | Protected (`requireWalletAuth`) | `x-wallet-address` / signed challenge |
| `/api/v1/wallets/verify` | `POST` | Protected (SEP-10 challenge verification) | Stellar signed transaction payload |

> **Note**: During local development with `TEST_MODE=true`, mock wallet keys or testnet Freighter accounts can be used to authenticate requests.