import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { d5CourseItems } from "@/lib/site-data";
import { ResourceCard } from "@/components/shared/resource-card";

export function D5CourseSection() {
  return (
    <section id="d5-courses" className="scroll-mt-28 bg-white py-16">
      <div className="mx-auto w-[min(1500px,calc(100vw-28px))]">
        {/* 标题栏 */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-100 to-white text-cyan-700 shadow-sm ring-1 ring-cyan-200/50">
              <Play className="h-5 w-5" fill="currentColor" />
            </span>
            <div>
              <p className="text-sm font-bold text-cyan-600 tracking-wide mb-1">D5 COURSE</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">D5渲染教程</h2>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">
                从入门到拟真，系统化掌握 D5 Render 全套渲染技能。
              </p>
            </div>
          </div>
          <Link
            href="https://www.xuedda.com/index/download/index/category_id/336.html"
            target="_blank"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-slate-50 pl-4 pr-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/60 transition-all hover:bg-cyan-50 hover:text-cyan-700 hover:shadow"
          >
            查看全部教程
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 卡片网格 - 4列 */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {d5CourseItems.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
