import { describe, expect, it } from "vitest";
import { normalizeTxHash } from "../src/lib/tx-hash";

describe("normalizeTxHash", () => {
  it("trims and lowercases", () => {
    expect(normalizeTxHash("  AbC  ")).toBe("abc");
  });

  it("is stable for already-normalized hashes", () => {
    expect(normalizeTxHash("deadbeef")).toBe("deadbeef");
  });

  it("collapses mixed-case duplicates to one key", () => {
    expect(normalizeTxHash("AaBb")).toBe(normalizeTxHash("aabb"));
  });
});
