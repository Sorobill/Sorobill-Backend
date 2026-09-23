# Soroban billing

Set in `.env`:

```
SUBSCRIPTION_CONTRACT_ID=C...
STELLAR_TREASURY_SECRET_KEY=S...
USE_SOROBAN_BILLING=true
TEST_MODE=false
```

The treasury keypair **must** be the contract admin (same identity used in `initialize`).

Billing path:
1. Scheduler finds due subscriptions
2. Worker calls `processBillingCycle`
3. If `contractPlanId` is set → `executeSorobanBilling` → `execute_billing`
4. Webhook `PAYMENT_SUCCESS` / failure handling follows

## TEST_MODE

When `TEST_MODE=true`, billing skips submitting real Soroban transactions.
Use this for local demos and CI smoke paths without needing funded keys.

## Contract plan link

Subscriptions must have `contractPlanId` set to use `execute_billing`.
Plans created via the API can store the on-chain plan id returned from
`create_plan` / merchant onboarding flows.

## Failure handling

Failed `execute_billing` outcomes map to `PAYMENT_FAILED` webhooks and enter
the grace / retry loop controlled by `GRACE_PERIOD_HOURS` and
`MAX_PAYMENT_RETRIES`.
