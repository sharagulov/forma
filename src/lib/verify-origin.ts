/**
 * SEC-003: reject cross-site POSTs when a canonical site URL is configured.
 * Browsers send Origin on fetch from pages; same-origin navigation may omit it.
 */

function parseOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

function getRequestOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const referer = request.headers.get("referer");
  if (referer) return parseOrigin(referer);
  return null;
}

export function verifyContactRequestOrigin(request: Request): boolean {
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isDev = process.env.NODE_ENV !== "production";

  if (!publicUrl) {
    if (isDev) return true;
    return false;
  }

  const allowed = parseOrigin(publicUrl);
  if (!allowed) return false;

  const reqOrigin = getRequestOrigin(request);
  if (!reqOrigin) {
    return isDev;
  }

  return reqOrigin === allowed;
}
