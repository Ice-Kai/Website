import Link from "next/link";
import { Search, User, Menu, Bookmark, History, MessageCircle, Users, Bell, Download } from "lucide-react";
import { navItems } from "@/lib/site-data";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const userActions = [
  { icon: Bookmark, label: "收藏", href: "/favorites" },
  { icon: Download, label: "下载记录", href: "/downloads" },
  { icon: History, label: "记录", href: "/history" },
  { icon: MessageCircle, label: "客服", href: "#chat" },
  { icon: Users, label: "社群", href: "/community" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/95 backdrop-blur-2xl transition-all duration-300">
      {/* Top bar: logo + search + login */}
      <div className="mx-auto flex min-h-[52px] w-[min(1680px,calc(100vw-20px))] items-center gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 text-base font-black text-white shadow-sm transition-transform group-hover:scale-105">
            薛
          </span>
          <span className="hidden sm:block">
            <span className="text-lg font-black leading-none text-slate-900 tracking-tight">薛大大设计网</span>
          </span>
        </Link>

        {/* Search */}
        <form className="hidden h-9 flex-1 max-w-[420px] items-center gap-2 rounded-full border border-slate-200 bg-slate-50/60 px-4 transition-all duration-300 focus-within:border-cyan-400 focus-within:bg-white focus-within:ring-3 focus-within:ring-cyan-400/10 md:flex">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            aria-label="搜索资源"
            placeholder="搜索模型、教程、软件、素材…"
            className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
          />
        </form>

        {/* User actions + Login */}
        <div className="ml-auto flex items-center gap-0.5">
          <ThemeToggle />
          {/* 动态 */}
          <Link
            href="/activity"
            title="动态"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
          >
            <Bell className="h-4 w-4" />
          </Link>
          {/* 用户快捷图标 */}
          {userActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                title={action.label}
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700"
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
          <span className="mx-1 h-5 w-px bg-slate-200 hidden sm:block" />
          <Link
            href="/login"
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition-all hover:border-cyan-300 hover:text-cyan-700 hover:bg-cyan-50"
          >
            <User className="h-3.5 w-3.5" />
            登录
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-bold text-white shadow-sm transition-all hover:from-cyan-500 hover:to-blue-500 hover:shadow-md active:scale-95"
          >
            注册
          </Link>
          <button className="inline-flex xl:hidden h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100">
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Bottom nav bar - matches xuedda.com */}
      <nav className="border-t border-slate-100 bg-white/80">
        <div className="mx-auto flex w-[min(1680px,calc(100vw-20px))] items-center justify-start gap-1 overflow-x-auto scrollbar-hide md:justify-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`shrink-0 px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:text-cyan-600 ${
                item.href === "/" ? "text-cyan-600" : "text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
