import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { topics } from "@/lib/site-data";

export function TopicStrip() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto w-[min(1500px,calc(100vw-28px))]">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <p className="text-xs font-bold text-cyan-700 tracking-wide">学习专题</p>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">按软件和工作流快速进入</h2>
          </div>
          <Link href="#models" className="group inline-flex h-10 items-center gap-2 rounded-full bg-slate-50 pl-4 pr-3 text-sm font-bold text-slate-600 transition-all hover:bg-cyan-50 hover:text-cyan-700">
            查看更多专题
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="mt-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {topics.map((topic) => (
            <Link
              key={topic.label}
              href={topic.href}
              className={`snap-start shrink-0 rounded-2xl px-6 py-4 text-sm font-bold shadow-sm ring-1 ring-inset transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${topic.tone} ring-black/5`}
            >
              {topic.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
