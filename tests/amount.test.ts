import { describe, it, expect } from "vitest";
import { parseAmount, sumAmounts } from "../src/lib/amount";

describe("amount helpers", () => {
  it("parses valid amounts", () => {
    expect(parseAmount("10.5")).toBe(10.5);
  });

  it("rejects invalid amounts", () => {
    expect(() => parseAmount("-1")).toThrow();
    expect(() => parseAmount("abc")).toThrow();
  });

  it("sums amounts", () => {
    expect(sumAmounts(["1", "2.5", "0.5"])).toBe("4");
  });

  it("includes Invalid amount in error message", () => {
    expect(() => parseAmount("abc")).toThrow(/Invalid amount/);
  });
});
