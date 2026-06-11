import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResourceCard } from "@/components/shared/resource-card";
import { BackToTop } from "@/components/shared/back-to-top";
import type { ResourceItem } from "@/lib/site-data";

const otherItems: ResourceItem[] = [
  {
    title: "薛大大的智达云分享码",
    summary: "智达云插件分享码合集，一键导入常用插件配置。",
    category: "其他相关 / 智达云", action: "下载", date: "2021-06-10", views: "12K",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=82",
    href: "/detail/zhidayun-share-code", meta: "分享码",
  },
  {
    title: "SU选择贴图补丁 23/24版",
    summary: "解决SU2023/2024版本选择贴图问题的小工具。",
    category: "其他相关 / 插件补丁", action: "下载", date: "2024-05-09", views: "752",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=82",
    href: "/software", meta: "补丁",
  },
];

export default function OthersPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1760px,calc(100vw-32px))] py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />首页
          </Link>
          <span className="text-slate-300">/</span>
          <h1 className="text-xl font-black text-slate-900">其他相关</h1>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {otherItems.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
