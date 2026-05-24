import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* 返回首页 */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> 返回首页
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 text-2xl font-black text-white shadow-lg mb-4">
              薛
            </span>
            <h1 className="text-2xl font-black text-slate-900">欢迎回来</h1>
            <p className="text-sm font-medium text-slate-500 mt-2">选择以下方式登录薛大大设计网</p>
          </div>

          {/* QQ 登录 */}
          <a
            href="/api/auth/qq"
            className="flex items-center justify-center gap-3 w-full h-12 rounded-xl bg-[#12B7F5] text-white font-bold text-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 mb-3"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
              <path d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .662.395 1.203.985 1.463 1.132.5 3.572 1.45 5.943 1.793.312.05.468.306.468.59 0 .367-.304.622-.668.622-.086 0-.17-.015-.26-.04-1.502-.345-3.632-1.15-4.922-1.716-.305-.134-.617.015-.697.33-.08.314.07.66.333.794.88.508 3.395 1.604 5.32 2.025.296.065.543-.12.543-.413 0-.102-.017-.2-.046-.296-.346-1.282-1.038-3.69-1.124-3.994-.064-.228.045-.472.265-.575.195-.09.42-.08.597.027.733.424 2.185 1.275 4.213 1.275 2.028 0 3.48-.85 4.213-1.275.178-.108.402-.118.597-.027.22.103.33.347.265.575-.086.304-.778 2.712-1.124 3.994-.03.096-.046.194-.046.296 0 .293.247.478.543.413 1.925-.42 4.44-1.517 5.32-2.025.263-.134.413-.48.333-.794-.08-.315-.392-.464-.697-.33-1.29.566-3.42 1.37-4.922 1.716-.09.025-.174.04-.26.04-.364 0-.668-.255-.668-.622 0-.284.156-.54.468-.59 2.37-.342 4.81-1.293 5.943-1.793.59-.26.985-.8.985-1.463 0-2.514-2.163-6.954-2.163-6.954V9.325C18.293 3.364 14.268 2 12.003 2z"/>
            </svg>
            QQ 登录
          </a>

          {/* 微信登录 */}
          <a
            href="/api/auth/wechat"
            className="flex items-center justify-center gap-3 w-full h-12 rounded-xl bg-[#07C160] text-white font-bold text-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 mb-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22a4.705 4.705 0 002.758 2.682c.689.285 1.426.427 2.162.427.825 0 1.65-.164 2.403-.489a.806.806 0 01.657.09l1.744 1.021a.308.308 0 00.153.05.27.27 0 00.266-.27c0-.078-.026-.15-.044-.227l-.357-1.357a.54.54 0 01.195-.609c1.68-1.235 2.75-2.952 2.75-4.704 0-2.972-2.25-5.5-5.627-5.62zm-2.436 2.654c.588 0 1.065.485 1.065 1.082a1.073 1.073 0 01-1.065 1.081 1.073 1.073 0 01-1.065-1.081c0-.597.477-1.082 1.065-1.082zm4.874 0c.588 0 1.065.485 1.065 1.082a1.073 1.073 0 01-1.065 1.081 1.073 1.073 0 01-1.065-1.081c0-.597.477-1.082 1.065-1.082z"/>
            </svg>
            微信登录
          </a>

          {/* 分割线 */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-400">或</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* 账号登录 */}
          <form className="space-y-3">
            <input
              type="text"
              placeholder="用户名 / 邮箱"
              className="input w-full"
            />
            <input
              type="password"
              placeholder="密码"
              className="input w-full"
            />
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-sm transition-all hover:bg-slate-800 hover:shadow-md active:scale-95"
            >
              登录
            </button>
          </form>

          <p className="text-center text-xs font-semibold text-slate-400 mt-6">
            还没有账号？
            <Link href="/register" className="text-cyan-600 hover:underline ml-1">立即注册</Link>
          </p>

          {/* 配置提示 */}
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 font-semibold leading-relaxed">
            ⚠️ QQ/微信登录需要配置 AppID 后才能使用。
            请前往
            <a href="https://connect.qq.com/" target="_blank" className="text-cyan-600 underline mx-0.5">QQ互联</a>
            和
            <a href="https://open.weixin.qq.com/" target="_blank" className="text-cyan-600 underline mx-0.5">微信开放平台</a>
            申请接入，然后在 <code className="bg-amber-100 px-1 rounded">.env</code> 中填写 QQ_APP_ID 等配置。
          </div>
        </div>
      </div>
    </div>
  );
}
