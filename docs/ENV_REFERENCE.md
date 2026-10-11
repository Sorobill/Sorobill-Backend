# Environment Variables Reference Matrix

| Variable | Required | Default | Description |
|:---|:---:|:---|:---|
| DATABASE_URL | Yes | postgresql://postgres:postgres@localhost:5432/sorobill | PostgreSQL connection string |
| PORT | No | 4000 | HTTP service listening port |
| NODE_ENV | No | development | Runtime environment (development, 	est, production) |
| STELLAR_NETWORK | Yes | TESTNET | Target Stellar network (TESTNET, PUBLIC) |
| SOROBAN_RPC_URL | Yes | https://soroban-testnet.stellar.org | Soroban RPC node endpoint |
| WEBHOOK_SECRET | Yes | - | Secret key for webhook HMAC-SHA256 signature verification |