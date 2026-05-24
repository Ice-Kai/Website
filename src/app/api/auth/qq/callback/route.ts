/**
 * QQ OAuth 回调
 * GET /api/auth/qq/callback?code=xxx&state=xxx
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
    const { appId, appKey, redirectUri, tokenUrl } = oauthConfig.qq;

    // 1. 用 code 换 access_token
    const tokenParams = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: appId,
      client_secret: appKey,
      code,
      redirect_uri: redirectUri,
    });

    const tokenRes = await fetch(`${tokenUrl}?${tokenParams}`);
    const tokenText = await tokenRes.text();
    const tokenData = Object.fromEntries(new URLSearchParams(tokenText));

    if (!tokenData.access_token) {
      return NextResponse.json({ error: "获取token失败", detail: tokenText }, { status: 400 });
    }

    // 2. 用 access_token 换 openid
    const openidRes = await fetch(
      `${oauthConfig.qq.openidUrl}?access_token=${tokenData.access_token}`
    );
    const openidText = await openidRes.text();
    const openidMatch = openidText.match(/"openid":"(\w+)"/);
    if (!openidMatch) {
      return NextResponse.json({ error: "获取openid失败" }, { status: 400 });
    }
    const openid = openidMatch[1];

    // 3. 获取用户信息
    const userInfoRes = await fetch(
      `${oauthConfig.qq.userInfoUrl}?access_token=${tokenData.access_token}&oauth_consumer_key=${appId}&openid=${openid}`
    );
    const userInfo = await userInfoRes.json();

    // 4. 查找或创建用户 → 设置 Session/Cookie → 重定向
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.set("auth_user", JSON.stringify({
      provider: "qq",
      openid,
      nickname: userInfo.nickname || "",
      avatar: userInfo.figureurl_qq_2 || userInfo.figureurl_2 || "",
    }), {
      httpOnly: false, // 前端可读
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7天
    });

    return response;
  } catch (err) {
    console.error("QQ OAuth error:", err);
    return NextResponse.json({ error: "登录失败" }, { status: 500 });
  }
}
