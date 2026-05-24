import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/shared/back-to-top";

const activities = [
  { title: "新增SU模型：中式园林亭廊系列", date: "2026-05-20", type: "模型" },
  { title: "D5教程第8期更新：动画与漫游制作", date: "2026-05-18", type: "教程" },
  { title: "HDR贴图素材包新增15组室外场景", date: "2026-05-15", type: "素材" },
  { title: "SU2026版本安装包已上传", date: "2026-05-10", type: "软件" },
];

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1000px,calc(100vw-28px))] py-8">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-cyan-600" />
          <h1 className="text-xl font-black text-slate-900">动态消息</h1>
        </div>
        <div className="space-y-3">
          {activities.map((item, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <span className="shrink-0 rounded-lg bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">{item.type}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-400 mt-0.5">{item.date}</p>
              </div>
              <Link href="/" className="shrink-0 text-slate-300 hover:text-cyan-600 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
