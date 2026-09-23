# Wallet auth on indexer ingest

`POST /indexer/ingest` uses `requireWalletAuth` so untrusted clients cannot
flood mirrored events in production.

## Recommended practice

Sign a short-lived message that includes the intent (e.g. `indexer:ingest`) and
a timestamp. Reject clock-skewed messages at the gateway if you front the API.
