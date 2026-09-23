# Testing

```bash
npm test
```

Indexer-related: `webhook-payload`, `chain-event-types`, `tx-hash`, `pagination`.

## Commands

```bash
npm test                 # vitest run (CI)
npm run test:watch       # watch mode
npm run verify           # prisma generate + vitest + tsc --noEmit
```

## Focused runs

```bash
npx vitest run tests/webhook-crypto.test.ts
npx vitest run tests/pagination.test.ts
npx vitest run tests/billing-outcome.test.ts
```
