# Indexer idempotency

Ingest upserts on `txHash`. Retries with the same hash update `type`, `payload`,
and `ledger` without creating duplicates.

## Why txHash?

Stellar transaction hashes uniquely identify a successful submit. Replaying the
same ingest payload (network retry, dual poller) must not create duplicate
`ChainEvent` rows.

## Update semantics

On conflict, ingest updates `type`, `payload`, and `ledger`. Prefer sending the
canonical payload on retries so stale exploratory data is overwritten.
