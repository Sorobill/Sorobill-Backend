import { describe, expect, it } from "vitest";
import { clamp } from "../src/lib/clamp";

describe("clamp", () => {
  it("bounds values", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });

  it("returns min when equal to min", () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it("returns max when equal to max", () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
