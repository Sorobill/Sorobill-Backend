# Wallet auth

Write routes may use `requireWalletAuth`:

Headers:
- `x-stellar-address`
- `x-stellar-message`
- `x-stellar-signature` (base64)

Skipped in non-production when headers are absent. Required in production.

## Header details

| Header | Format |
|---|---|
| `x-stellar-address` | G… public key |
| `x-stellar-message` | UTF-8 message that was signed |
| `x-stellar-signature` | Base64-encoded ed25519 signature |
