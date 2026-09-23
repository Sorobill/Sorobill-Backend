import { describe, it, expect } from "vitest";
import { billingIdempotencyKey } from "../src/lib/idempotency";

describe("billingIdempotencyKey", () => {
  it("includes subscription id and period end", () => {
    const key = billingIdempotencyKey("sub_1", new Date("2026-01-01T00:00:00.000Z"));
    expect(key).toBe("sub_1:2026-01-01T00:00:00.000Z");
  });

  it("changes when period end changes", () => {
    const a = billingIdempotencyKey("sub_1", new Date("2026-01-01T00:00:00.000Z"));
    const b = billingIdempotencyKey("sub_1", new Date("2026-02-01T00:00:00.000Z"));
    expect(a).not.toBe(b);
  });

  it("isolates different subscriptions in the same period", () => {
    const end = new Date("2026-01-01T00:00:00.000Z");
    expect(billingIdempotencyKey("sub_a", end)).not.toBe(billingIdempotencyKey("sub_b", end));
  });
});
