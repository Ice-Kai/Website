import Link from "next/link";
import { ChevronRight, Image as ImageIcon } from "lucide-react";
import { ResourceCard } from "@/components/shared/resource-card";
import type { ResourceItem } from "@/lib/site-data";

const materialItems: ResourceItem[] = [
  {
    title: "10组墙面PBR贴图素材",
    summary: "4K高清墙面贴图，适合室内与建筑表现快速调用。",
    category: "PBR贴图", action: "下载", date: "2023-09-26", views: "1.2K",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=82",
    href: "/materials", meta: "360 MB",
  },
  {
    title: "D5素材 - 环绕背景",
    summary: "用于 D5 场景氛围表现的环境背景素材。",
    category: "D5材质库", action: "下载", date: "2023-09-24", views: "129",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
    href: "/materials", meta: "环境背景",
  },
  {
    title: "HDR贴图素材 - 室外环境",
    summary: "适配建筑、景观与室外渲染的 HDR 环境贴图。",
    category: "HDR贴图", action: "下载", date: "2023-09-21", views: "1.3K",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=82",
    href: "/materials", meta: "HDR",
  },
  {
    title: "HDR贴图素材 - 夜晚星空6",
    summary: "高质量星空HDR环境贴图，适合夜景渲染场景。",
    category: "HDR贴图", action: "下载", date: "2023-09-20", views: "1.3K",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=82",
    href: "/materials", meta: "HDR / 夜景",
  },
  {
    title: "HDR贴图素材 - 夜晚星空5",
    summary: "星空夜景HDR贴图，适配室外建筑夜景表现。",
    category: "HDR贴图", action: "下载", date: "2023-09-19", views: "1.3K",
    image: "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?auto=format&fit=crop&w=1200&q=82",
    href: "/materials", meta: "HDR / 夜景",
  },
];

export function MaterialSection() {
  return (
    <section id="materials" className="scroll-mt-28 bg-white/45 py-12 backdrop-blur-sm">
      <div className="mx-auto w-[min(1760px,calc(100vw-32px))]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-gradient-to-br from-emerald-100 to-white text-emerald-700 shadow-sm ring-1 ring-emerald-200/50">
              <ImageIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-emerald-600 tracking-wide mb-1">MATERIAL</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">材质贴图</h2>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
                PBR贴图、HDR环境贴图、D5材质库持续更新，一键下载即用。
              </p>
            </div>
          </div>
          <Link
            href="/materials"
            className="group inline-flex h-10 items-center gap-2 rounded-md bg-slate-50 pl-4 pr-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/60 transition-all hover:bg-emerald-50 hover:text-emerald-700 hover:shadow"
          >
            更多贴图素材
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
          {materialItems.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
