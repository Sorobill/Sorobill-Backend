import { describe, expect, it } from "vitest";
import { isBlank } from "../src/lib/strings";

describe("isBlank", () => {
  it("treats nullish and whitespace as blank", () => {
    expect(isBlank(null)).toBe(true);
    expect(isBlank(undefined)).toBe(true);
    expect(isBlank("  ")).toBe(true);
  });

  it("rejects non-empty strings", () => {
    expect(isBlank("x")).toBe(false);
  });
});
