import Link from "next/link";
import { ArrowRight, ImagePlus, Sparkles } from "lucide-react";

export function AiImageSection() {
  return (
    <section id="ai-image" className="relative overflow-hidden bg-[#111110] py-14 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(245,158,11,0.12),transparent_28%)]" />
      <div className="relative mx-auto flex w-[min(1760px,calc(100vw-32px))] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-100 ring-1 ring-white/10">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            AI 生图工具
          </div>
          <h2 className="max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            跳转到独立 AI 生图工作台
            <span className="block bg-gradient-to-r from-cyan-300 to-amber-200 bg-clip-text text-transparent">
              Nano Banana 全场景全智能
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/58 sm:text-base">
            建筑、室内、景观、户型图、鸟瞰图统一进入独立工具页操作。网站资源继续免费浏览，
            AI 生图按单次任务计费。
          </p>
        </div>

        <Link
          href="/ai-image"
          className="group inline-flex w-fit items-center gap-4 rounded-2xl bg-white px-6 py-5 text-slate-950 shadow-[0_18px_50px_-30px_rgba(255,255,255,0.8)] transition hover:-translate-y-1 hover:bg-cyan-100"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-cyan-300">
            <ImagePlus className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-base font-black">打开 AI 生图</span>
            <span className="mt-1 block text-xs font-bold text-slate-500">进入全屏工作台</span>
          </span>
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
