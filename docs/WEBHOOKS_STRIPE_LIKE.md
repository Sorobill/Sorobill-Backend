# Stripe-like webhook mapping

Internal enum → Stripe-shaped `type`:

| Internal | Stripe-like |
|---|---|
| PAYMENT_SUCCESS | invoice.paid |
| PAYMENT_FAILED | invoice.payment_failed |
| SUBSCRIPTION_CREATED | customer.subscription.created |
| SUBSCRIPTION_UPDATED | customer.subscription.updated |
| SUBSCRIPTION_CANCELLED | customer.subscription.deleted |

Use `buildStripeLikePayload` in `src/lib/webhook-payload.ts`.

## Verification

Deliveries include `X-Sorobill-Signature` (HMAC-SHA256 hex of the raw body).
Verify with `verifyWebhookSignature(secret, body, signature)` using the
endpoint secret registered at create time.

## Payload shape

`buildStripeLikePayload` wraps data as:

```json
{
  "id": "evt_<id>",
  "object": "event",
  "type": "invoice.paid",
  "created": 1710000000,
  "data": { "object": { } },
  "livemode": false
}
```
