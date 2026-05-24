import Link from "next/link";
import { Users } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/shared/back-to-top";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1000px,calc(100vw-28px))] py-16 text-center">
        <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-slate-900 mb-2">官方社群</h1>
        <p className="text-slate-500 font-medium mb-2">学与成设计网 / 薛大大生态设计 官方交流群</p>
        <p className="text-slate-400 text-sm font-medium mb-6">QQ群、微信群等社群入口即将上线</p>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-600 transition-all hover:border-cyan-300 hover:text-cyan-700"
        >
          返回首页
        </Link>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
