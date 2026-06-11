import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuthMissingResponse, adminAuthResponse, verifyAdminRequest } from "@/lib/admin-auth";

const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRate(ip: string, limit: number, windowSec: number) {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowSec * 1000 });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

const botUA = /scrapy|httpclient|python-requests|curl|wget|java\/|php|perl|go-http/i;

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  const ua = req.headers.get("user-agent") || "";

  if (botUA.test(ua) && pathname !== "/api/image-proxy") {
    return new NextResponse("Access Denied", { status: 403 });
  }

  if (pathname.startsWith("/api/") && !checkRate(`api:${ip}`, 60, 60)) {
    return NextResponse.json({ error: "请求频繁" }, { status: 429 });
  }

  if (!pathname.startsWith("/_next/") && !pathname.startsWith("/api/") && !checkRate(`page:${ip}`, 200, 60)) {
    return new NextResponse("访问频繁", { status: 429 });
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin/") || pathname === "/api/upload") {
    const adminAuth = verifyAdminRequest(req);
    if (adminAuth === "missing") return adminAuthMissingResponse();
    if (adminAuth === "invalid") return adminAuthResponse();
  }

  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "SAMEORIGIN");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|uploads).*)"],
};
