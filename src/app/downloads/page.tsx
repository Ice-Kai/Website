import Link from "next/link";
import { Download, History, Bookmark } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/shared/back-to-top";

const userLinks = [
  { icon: Bookmark, title: "收藏模型", text: "查看已收藏的模型、教程和素材", href: "/favorites" },
  { icon: History, title: "浏览记录", text: "继续上次浏览和学习进度", href: "/history" },
];

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1100px,calc(100vw-28px))] py-12">
        <section className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Download className="mx-auto mb-4 h-16 w-16 text-cyan-500" />
          <h1 className="text-3xl font-black tracking-tight text-slate-950">下载记录</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
            这里先作为用户下载记录入口。登录后可按模型、软件、素材、教程查看历史下载，
            后续接入账号系统后自动同步真实下载记录。
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-6 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            登录查看记录
          </Link>
        </section>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {userLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Icon className="mb-4 h-5 w-5 text-slate-400 transition group-hover:text-cyan-600" />
                <p className="text-base font-black text-slate-950">{item.title}</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{item.text}</p>
              </Link>
            );
          })}
        </div>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
