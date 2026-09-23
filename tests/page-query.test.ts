import { describe, expect, it } from "vitest";
import { parsePageLimit } from "../src/lib/page-query";

describe("parsePageLimit", () => {
  it("defaults like clampLimit", () => {
    expect(parsePageLimit(undefined)).toBe(50);
  });

  it("allows indexer-sized max via options", () => {
    expect(parsePageLimit(500, { max: 200 })).toBe(200);
  });
});
