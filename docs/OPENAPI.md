# OpenAPI

Canonical spec: [`openapi.yaml`](./openapi.yaml) (API version 0.3.0).

Serve via Swagger UI in future; for now treat the YAML as source of truth.

## Keeping the spec in sync

When you add or change a route under `src/routes/`:

1. Update `docs/openapi.yaml` in the same PR
2. Bump `info.version` only for breaking or notable releases
3. Prefer concrete `schema` objects over free-form descriptions
