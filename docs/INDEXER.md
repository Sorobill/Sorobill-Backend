# Chain event indexer

## Endpoints
- `POST /api/v1/indexer/ingest` — upsert by `txHash` (wallet auth; unknown types rejected unless `strict: false`)
- `POST /api/v1/indexer/poll` — pull recent Soroban contract events from RPC and upsert (`startLedger?`)
- `GET /api/v1/indexer/events?limit=&type=` — newest first (`clampLimit`, max 200)

## Model
`ChainEvent`: type, contractId, txHash (unique), ledger?, payload Json, createdAt

## Poller
`pollSorobanEvents` reads the last ~50 ledgers (or an explicit `startLedger`), filters the configured subscription contract, and upserts known topics into Postgres. Safe to run from cron or the authenticated `/poll` route.

## Purpose

The indexer mirrors Soroban contract events into Postgres so dashboards and
webhooks can query billing activity without calling RPC on every page load.

## Auth

`POST /ingest` and `POST /poll` use `requireWalletAuth`. In production, missing
`x-stellar-*` headers return `401`. In development, absent headers are allowed
so local demos stay frictionless.

## Errors

Unknown event types are rejected when `strict` is true (default). Pass
`strict: false` only for exploratory mirroring of experimental topics.
