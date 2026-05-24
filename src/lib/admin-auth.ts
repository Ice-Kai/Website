import { NextResponse } from "next/server";

const ADMIN_REALM = "xuedda-admin";

type AdminAuthResult = "ok" | "missing" | "invalid";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function getAdminUsername() {
  return process.env.ADMIN_USERNAME?.trim() || "admin";
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function decodeBasicCredentials(authHeader: string | null) {
  if (!authHeader?.startsWith("Basic ")) return null;

  try {
    const decoded = atob(authHeader.slice("Basic ".length));
    const separator = decoded.indexOf(":");
    if (separator === -1) return null;

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export function verifyAdminRequest(req: Request): AdminAuthResult {
  const expectedPassword = getAdminPassword();
  if (!expectedPassword) return "missing";

  const credentials = decodeBasicCredentials(req.headers.get("authorization"));
  if (!credentials) return "invalid";

  const usernameOk = safeEqual(credentials.username, getAdminUsername());
  const passwordOk = safeEqual(credentials.password, expectedPassword);
  return usernameOk && passwordOk ? "ok" : "invalid";
}

export function adminAuthResponse() {
  return new NextResponse("Admin authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
    },
  });
}

export function adminAuthMissingResponse() {
  return NextResponse.json(
    { error: "后台认证未配置，请设置 ADMIN_PASSWORD" },
    { status: 503 }
  );
}

export function requireAdmin(req: Request) {
  const result = verifyAdminRequest(req);
  if (result === "ok") return null;
  if (result === "missing") return adminAuthMissingResponse();
  return adminAuthResponse();
}
