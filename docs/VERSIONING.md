# API versioning

Current: **0.3.0**. Breaking route changes bump minor until 1.0.
OpenAPI `info.version` should match `API_VERSION` / package.json.

## Compatibility promise

Until 1.0, additive fields and new routes are non-breaking. Renaming or
removing response fields bumps the 0.x minor and is called out in CHANGELOG.
