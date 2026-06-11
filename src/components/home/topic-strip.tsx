import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { topics } from "@/lib/site-data";

export function TopicStrip() {
  return (
    <section className="border-y border-slate-200/70 bg-white/70 py-12 backdrop-blur-sm">
      <div className="mx-auto w-[min(1760px,calc(100vw-32px))]">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 border border-cyan-100 bg-cyan-50 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Asset Navigation</p>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">按资源类型快速进入</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
              参考专业素材站的信息架构，把常用模型、教程、贴图、软件入口前置，减少查找成本。
            </p>
          </div>
          <Link href="/models" className="group inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white pl-4 pr-3 text-sm font-bold text-slate-600 shadow-sm transition-all hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700">
            浏览全部资源
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {topics.map((topic) => (
            <Link
              key={topic.label}
              href={topic.href}
              className={`group relative min-h-[104px] overflow-hidden rounded-md px-5 py-4 text-sm font-bold shadow-sm ring-1 ring-inset transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${topic.tone} ring-black/5`}
            >
              <span className="block text-base font-black text-slate-950">{topic.label}</span>
              <span className="mt-3 inline-flex items-center text-xs font-black opacity-70 transition group-hover:translate-x-1">
                进入分类
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </span>
              <span className="absolute bottom-0 left-0 h-1 w-full bg-current opacity-20" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
