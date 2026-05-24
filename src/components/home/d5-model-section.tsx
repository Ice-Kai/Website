import Link from "next/link";
import { ChevronRight, Box } from "lucide-react";
import { ResourceCard } from "@/components/shared/resource-card";
import type { ResourceItem } from "@/lib/site-data";

const d5ModelItems: ResourceItem[] = [
  {
    title: "D5素材-中式桌椅组合",
    summary: "中式风格桌椅家具模型，含材质贴图，适配室内中式场景。",
    category: "D5模型 / D5家具", action: "下载", date: "2023-07-23", views: "1.3K",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=82",
    href: "/models?category=d5-model", meta: "D5A / 家具",
  },
  {
    title: "D5含SU模型-汉代乐器摆件",
    summary: "汉代风格乐器摆件模型，含SU源文件和D5材质。",
    category: "D5模型 / D5家具", action: "下载", date: "2023-07-23", views: "1.2K",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=82",
    href: "/models?category=d5-model", meta: "SU+D5A",
  },
  {
    title: "D5模型-中式宋代家具",
    summary: "宋代风格家具模型，含桌椅案几等多件套组合。",
    category: "D5模型 / D5家具", action: "下载", date: "2023-07-21", views: "1.2K",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=82",
    href: "/models?category=d5-model", meta: "D5A / 多件套",
  },
  {
    title: "D5素材-中式装饰摆件",
    summary: "中式装饰摆件合集，含瓷器、屏风、挂画等元素。",
    category: "D5模型 / D5摆件", action: "下载", date: "2023-07-19", views: "1.2K",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=82",
    href: "/models?category=d5-model", meta: "D5A / 摆件合集",
  },
];

export function D5ModelSection() {
  return (
    <section id="d5-models" className="scroll-mt-28 bg-slate-50/50 py-16">
      <div className="mx-auto w-[min(1500px,calc(100vw-28px))]">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-100 to-white text-teal-700 shadow-sm ring-1 ring-teal-200/50">
              <Box className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-teal-600 tracking-wide mb-1">D5 MODEL</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">D5模型</h2>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
                D5原生格式模型，含材质和灯光，下载即用，高效出图。
              </p>
            </div>
          </div>
          <Link
            href="/models?category=d5-model"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-white pl-4 pr-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/60 transition-all hover:bg-teal-50 hover:text-teal-700 hover:shadow"
          >
            更多D5模型
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {d5ModelItems.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
