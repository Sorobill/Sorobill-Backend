/** True when value is nullish or only whitespace. */
export function isBlank(value: unknown): boolean {
  return value == null || (typeof value === "string" && value.trim() === "");
}
