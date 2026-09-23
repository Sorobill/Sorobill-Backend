# Soroban event mirroring

Map contract topics from Sorobill-Contract `docs/EVENTS.md` into `ChainEvent.type`.
Prefer exact topic strings (`payment_executed`, `sub_cancelled`, …).

## Polling

Use `POST /api/v1/indexer/poll` (wallet auth) to pull recent contract events into `ChainEvent`.

## Known topics

See `CHAIN_EVENT_TYPES` in `src/lib/chain-event-types.ts` for the allow-list:
`plan_*`, `subscribed`, `sub_*`, `payment_executed`, `payment_failed`.

## Topic normalization

RPC may return symbols as strings or SDK objects (`_value` / `value` / `sym`).
`topicSymbol()` in `src/lib/event-topic.ts` normalizes these before upsert.
