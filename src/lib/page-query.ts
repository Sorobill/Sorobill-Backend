import { clampLimit } from "./pagination";

/** Parse common list query params into a safe take count. */
export function parsePageLimit(
  limit: unknown,
  options?: { fallback?: number; max?: number }
): number {
  return clampLimit(limit, options?.fallback ?? 50, options?.max ?? 100);
}
