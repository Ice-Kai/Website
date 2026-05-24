import { NextResponse } from "next/server";
import { buildWechatAuthUrl } from "@/lib/oauth";

export function GET() {
  return NextResponse.redirect(buildWechatAuthUrl());
}
