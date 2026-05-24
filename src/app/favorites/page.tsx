import Link from "next/link";
import { Bookmark } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/shared/back-to-top";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1000px,calc(100vw-28px))] py-16 text-center">
        <Bookmark className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-slate-900 mb-2">我的收藏</h1>
        <p className="text-slate-500 font-medium mb-6">登录后即可查看和管理您的收藏内容</p>
        <Link
          href="/login"
          className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95"
        >
          立即登录
        </Link>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
