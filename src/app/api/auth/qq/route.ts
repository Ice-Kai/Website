import { NextResponse } from "next/server";
import { buildQQAuthUrl } from "@/lib/oauth";

export function GET() {
  return NextResponse.redirect(buildQQAuthUrl());
}
