import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResourceCard } from "@/components/shared/resource-card";
import { BackToTop } from "@/components/shared/back-to-top";
import type { ResourceItem } from "@/lib/site-data";

const lightingItems: ResourceItem[] = [
  {
    title: "10组墙面PBR贴图素材",
    summary: "4K高清墙面贴图，适合室内与建筑表现快速调用。",
    category: "灯光和贴图 / PBR贴图", action: "下载", date: "2023-09-26", views: "1.2K",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=82",
    href: "/materials", meta: "360 MB",
  },
  {
    title: "D5素材-环绕背景",
    summary: "用于 D5 场景氛围表现的环境背景素材。",
    category: "灯光和贴图 / D5材质库", action: "下载", date: "2023-09-24", views: "129",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=82",
    href: "/materials", meta: "环境背景",
  },
  {
    title: "HDR贴图素材-室外环境",
    summary: "适配建筑、景观与室外渲染的 HDR 环境贴图。",
    category: "灯光和贴图 / HDR贴图", action: "下载", date: "2023-09-21", views: "1.3K",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=82",
    href: "/materials", meta: "HDR",
  },
  {
    title: "HDR贴图素材-夜晚星空6",
    summary: "高质量星空HDR环境贴图，适合夜景渲染场景。",
    category: "灯光和贴图 / HDR贴图", action: "下载", date: "2023-09-20", views: "1.3K",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=82",
    href: "/materials", meta: "HDR / 夜景",
  },
  {
    title: "HDR贴图素材-室外环境",
    summary: "室外建筑表现专用HDR环境贴图，多场景适配。",
    category: "灯光和贴图 / HDR贴图", action: "下载", date: "2023-09-20", views: "1.1K",
    image: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?auto=format&fit=crop&w=800&q=82",
    href: "/materials", meta: "HDR",
  },
  {
    title: "HDR贴图素材-夜晚星空5",
    summary: "星空夜景HDR贴图，适配室外建筑夜景表现。",
    category: "灯光和贴图 / HDR贴图", action: "下载", date: "2023-09-19", views: "1.3K",
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=800&q=82",
    href: "/materials", meta: "HDR / 夜景",
  },
];

const subCategories = [
  { name: "全部", slug: "all" },
  { name: "PBR贴图", slug: "pbr" },
  { name: "D5材质库", slug: "d5-material" },
  { name: "HDR贴图", slug: "hdr" },
];

export default function LightingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1500px,calc(100vw-28px))] py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />首页
          </Link>
          <span className="text-slate-300">/</span>
          <h1 className="text-xl font-black text-slate-900">灯光和贴图</h1>
        </div>

        {/* 子分类筛选 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {subCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "all" ? "/lighting" : `/lighting?category=${cat.slug}`}
              className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-bold transition-all ${
                cat.slug === "all"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-700"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lightingItems.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
