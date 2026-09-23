import { describe, expect, it } from "vitest";
import { isValidLedger } from "../src/lib/ledger";

describe("isValidLedger", () => {
  it("accepts non-negative integers", () => {
    expect(isValidLedger(0)).toBe(true);
    expect(isValidLedger(12)).toBe(true);
  });
  it("rejects invalid values", () => {
    expect(isValidLedger(-1)).toBe(false);
    expect(isValidLedger(1.5)).toBe(false);
    expect(isValidLedger("1")).toBe(false);
  });
}
  it("rejects NaN and Infinity", () => {
    expect(isValidLedger(Number.NaN)).toBe(false);
    expect(isValidLedger(Number.POSITIVE_INFINITY)).toBe(false);
  });

});
