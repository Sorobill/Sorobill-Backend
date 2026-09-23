import { createHmac, timingSafeEqual } from "crypto";

export function signWebhookPayload(secret: string, body: string): string {
  return createHmac("sha256", secret).update(body).digest("hex");
}

export function verifyWebhookSignature(
  secret: string,
  body: string,
  signature: string
): boolean {
  const expected = signWebhookPayload(secret, body);
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  // Length check avoids timingSafeEqual throw; still constant-time on equal lengths.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
