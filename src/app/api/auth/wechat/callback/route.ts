/**
 * 微信 OAuth 回调
 * GET /api/auth/wechat/callback?code=xxx&state=xxx
 */
import { NextRequest, NextResponse } from "next/server";
import { oauthConfig } from "@/lib/oauth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "缺少授权码" }, { status: 400 });
  }

  try {
    const { appId, appSecret, tokenUrl, userInfoUrl } = oauthConfig.wechat;

    // 1. 用 code 换 access_token
    const tokenParams = new URLSearchParams({
      appid: appId,
      secret: appSecret,
      code,
      grant_type: "authorization_code",
    });

    const tokenRes = await fetch(`${tokenUrl}?${tokenParams}`);
    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: "获取token失败", detail: tokenData }, { status: 400 });
    }

    // 2. 获取用户信息
    const userInfoRes = await fetch(
      `${userInfoUrl}?access_token=${tokenData.access_token}&openid=${tokenData.openid}`
    );
    const userInfo = await userInfoRes.json();

    // 3. 设置 Cookie 并重定向
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("auth_user", JSON.stringify({
      provider: "wechat",
      openid: tokenData.openid,
      unionid: tokenData.unionid || "",
      nickname: userInfo.nickname || "",
      avatar: userInfo.headimgurl || "",
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error("WeChat OAuth error:", err);
    return NextResponse.json({ error: "登录失败" }, { status: 500 });
  }
}
