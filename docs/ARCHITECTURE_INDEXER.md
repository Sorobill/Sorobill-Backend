# Indexer architecture

Workers or RPC watchers call `POST /indexer/ingest`. Events are upserted by
`txHash` so retries are idempotent. The API list endpoint is read-only for
dashboards and demos.

## Components

1. **Poller** (`indexer.poller.ts`) — RPC `getEvents` → topic normalize → upsert
2. **Ingest API** — external watchers push events
3. **List API** — read model for dashboards
4. **Validators** — known types / strict mode
