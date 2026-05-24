/**
 * OAuth 配置
 *
 * 使用前需申请：
 * QQ互联:   https://connect.qq.com/       → 获取 APP_ID + APP_KEY
 * 微信开放平台: https://open.weixin.qq.com/  → 获取 APP_ID + APP_SECRET
 *
 * 回调地址格式: https://你的域名/api/auth/qq/callback
 */

export const oauthConfig = {
  qq: {
    appId: process.env.QQ_APP_ID || "",
    appKey: process.env.QQ_APP_KEY || "",
    redirectUri:
      process.env.QQ_REDIRECT_URI ||
      "http://localhost:3000/api/auth/qq/callback",
    authorizeUrl: "https://graph.qq.com/oauth2.0/authorize",
    tokenUrl: "https://graph.qq.com/oauth2.0/token",
    openidUrl: "https://graph.qq.com/oauth2.0/me",
    userInfoUrl: "https://graph.qq.com/user/get_user_info",
    scope: "get_user_info",
  },
  wechat: {
    appId: process.env.WECHAT_APP_ID || "",
    appSecret: process.env.WECHAT_APP_SECRET || "",
    redirectUri:
      process.env.WECHAT_REDIRECT_URI ||
      "http://localhost:3000/api/auth/wechat/callback",
    authorizeUrl: "https://open.weixin.qq.com/connect/qrconnect",
    tokenUrl: "https://api.weixin.qq.com/sns/oauth2/access_token",
    userInfoUrl: "https://api.weixin.qq.com/sns/userinfo",
    scope: "snsapi_login",
  },
};

export function buildQQAuthUrl(): string {
  const { appId, redirectUri, authorizeUrl, scope } = oauthConfig.qq;
  const state = Math.random().toString(36).slice(2);
  const params = new URLSearchParams({
    response_type: "code",
    client_id: appId,
    redirect_uri: redirectUri,
    state,
    scope,
    display: "pc",
  });
  return `${authorizeUrl}?${params}`;
}

export function buildWechatAuthUrl(): string {
  const { appId, redirectUri, authorizeUrl, scope } = oauthConfig.wechat;
  const state = Math.random().toString(36).slice(2);
  const params = new URLSearchParams({
    appid: appId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
    state,
  });
  return `${authorizeUrl}?${params}#wechat_redirect`;
}
