# Pagination

`clampLimit(limit, fallback=50, max=100)` parses query limits safely.
Indexer list uses max 200.

## Behavior

| Input | Result |
|---|---|
| missing / NaN / ≤0 | `fallback` (default 50) |
| `75` | `75` (floored) |
| `500` with max 100 | `100` |
| `"12.9"` | `12` |
