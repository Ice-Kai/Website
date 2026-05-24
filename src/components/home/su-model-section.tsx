import Link from "next/link";
import { ChevronRight, Box } from "lucide-react";
import { suModelItems } from "@/lib/site-data";
import { ResourceCard } from "@/components/shared/resource-card";

export function SuModelSection() {
  return (
    <section id="su-models" className="scroll-mt-28 bg-slate-50/50 py-16">
      <div className="mx-auto w-[min(1500px,calc(100vw-28px))]">
        {/* 标题栏 */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-100 to-white text-amber-700 shadow-sm ring-1 ring-amber-200/50">
              <Box className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-amber-600 tracking-wide mb-1">SU MODEL</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">SU模型精选</h2>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
                建筑、工装、家装、园林模型持续更新，支持下载和在线详图。
              </p>
            </div>
          </div>
          <Link
            href="/models"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-white pl-4 pr-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/60 transition-all hover:bg-slate-50 hover:text-cyan-700 hover:shadow"
          >
            查看全部SU模型
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 卡片网格 */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {suModelItems.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
