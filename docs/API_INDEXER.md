# Indexer API quick reference

```http
POST /api/v1/indexer/ingest
Content-Type: application/json

{"type":"payment_executed","contractId":"C...","txHash":"…","ledger":123,"payload":{}}
```

```http
GET /api/v1/indexer/events?limit=50
```

## Poll

```http
POST /api/v1/indexer/poll
Content-Type: application/json

{"startLedger": 123456}
```

Omitting `startLedger` polls roughly the last 50 ledgers for the configured
subscription contract.

## Filter by type

```http
GET /api/v1/indexer/events?limit=20&type=payment_executed
```

`type` matches stored topic strings from the contract event catalog.
