import Link from "next/link";
import { ArrowRight, ImagePlus, Sparkles, Wand2 } from "lucide-react";

const features = [
  ["0.15 元/次", "只对 AI 生图单次计费，其他资源入口保持免费浏览"],
  ["设计向提示词", "围绕建筑、室内、景观效果图优化出图描述"],
  ["灵感草图", "用于方案推敲、公众号配图和课程封面参考"],
  ["生成记录", "后续可接入会员中心，保存历史提示词与图片"],
];

export function AiImageSection() {
  return (
    <section id="ai-image" className="relative overflow-hidden bg-[#07111f] py-14 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.20),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.18),transparent_30%)]" />
      <div className="absolute left-1/2 top-8 h-64 w-[720px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto grid w-[min(1760px,calc(100vw-32px))] gap-8 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-100 ring-1 ring-white/15">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            新增栏目
          </div>
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            AI 生图入口上线，效果图灵感
            <span className="bg-gradient-to-r from-cyan-300 to-amber-200 bg-clip-text text-transparent"> 单次 0.15 元</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-300 sm:text-base">
            首页现在改为明确的 AI 生图付费入口，适合快速生成建筑氛围图、室内风格参考、
            课程封面和公众号配图。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/ai-image"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-cyan-400 px-6 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              开始生图
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/models?category=max-model"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-white/10 px-5 text-sm font-bold text-white ring-1 ring-white/15 transition hover:bg-white/15"
            >
              查看 MAX 模型
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-white/12 bg-white/10 p-4 shadow-2xl shadow-cyan-950/50 backdrop-blur">
          <div className="rounded-md bg-slate-950/80 p-5 ring-1 ring-white/10">
            <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-cyan-400 text-slate-950">
                <Wand2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black text-white">AI 生图任务</p>
                <p className="text-xs font-semibold text-slate-400">建筑 / 室内 / 景观效果图灵感</p>
              </div>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-400">
                <span>示例提示词</span>
                <span>0.15 元/次</span>
              </div>
              <p className="text-sm font-semibold leading-6 text-slate-200">
                现代山地民宿，清晨薄雾，木质立面，大面积落地窗，D5 Render 写实效果，电影感光影。
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {features.map(([title, description]) => (
                <div key={title} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                  <ImagePlus className="mb-3 h-4 w-4 text-cyan-300" />
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
