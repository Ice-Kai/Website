import Link from "next/link";
import { ChevronRight, Monitor } from "lucide-react";
import { ResourceCard } from "@/components/shared/resource-card";
import type { ResourceItem } from "@/lib/site-data";

const softwareItems: ResourceItem[] = [
  {
    title: "SU2026版本",
    summary: "SketchUp 2026 最新版本安装包，支持 Windows 系统。",
    category: "软件 / SketchUp", action: "下载", date: "2025-10-17", views: "569",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=82",
    href: "/software", meta: "Windows",
  },
  {
    title: "SU2025 V25.0.571 学习版",
    summary: "SketchUp 2025 免费学习版，适合个人学习和练习。",
    category: "软件 / SketchUp", action: "下载", date: "2025-03-02", views: "1.0K",
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&q=82",
    href: "/software", meta: "Windows",
  },
  {
    title: "SU插件合集（薛大大版）",
    summary: "常用 SketchUp 插件合集，适合新装环境一次性配置。",
    category: "软件 / 插件", action: "下载", date: "2025-03-02", views: "2.1K",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=82",
    href: "/software", meta: "插件合集",
  },
  {
    title: "ENS4.0 版本",
    summary: "Enscape 4.0 渲染器安装包，实时渲染利器。",
    category: "软件 / Enscape", action: "下载", date: "2024-05-21", views: "2.1K",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=82",
    href: "/software", meta: "渲染器",
  },
];

export function SoftwareSection() {
  return (
    <section id="software-sect" className="scroll-mt-28 bg-white py-10">
      <div className="mx-auto w-[min(1500px,calc(100vw-28px))]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-white text-violet-700 shadow-sm ring-1 ring-violet-200/50">
              <Monitor className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-violet-600 tracking-wide mb-1">SOFTWARE</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">软件</h2>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
                SketchUp、Enscape、插件等设计软件安装包及参数资源。
              </p>
            </div>
          </div>
          <Link
            href="/software"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-slate-50 pl-4 pr-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/60 transition-all hover:bg-violet-50 hover:text-violet-700 hover:shadow"
          >
            更多软件资源
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {softwareItems.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
