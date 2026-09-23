import { describe, it, expect } from "vitest";
import { clampLimit } from "../src/lib/pagination";

describe("clampLimit", () => {
  it("uses fallback for invalid values", () => {
    expect(clampLimit(undefined)).toBe(50);
    expect(clampLimit("nope")).toBe(50);
  });

  it("caps at max", () => {
    expect(clampLimit(500)).toBe(100);
  });
});

  it("floors fractional values", () => {
    expect(clampLimit("12.9")).toBe(12);
  });

  it("respects custom fallback and max", () => {
    expect(clampLimit(undefined, 10, 25)).toBe(10);
    expect(clampLimit(100, 10, 25)).toBe(25);
  });

  it("rejects zero and negatives", () => {
    expect(clampLimit(0)).toBe(50);
    expect(clampLimit(-5)).toBe(50);
  });
