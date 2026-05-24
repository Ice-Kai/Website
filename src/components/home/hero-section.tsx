import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Play, Flame, Zap } from "lucide-react";
import { heroSlides, heroFeatures, hotRecommendations } from "@/lib/site-data";

export function HeroSection() {
  const main = heroSlides[0];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white pt-4 pb-6">
      <div className="mx-auto grid w-[min(1500px,calc(100vw-28px))] gap-4 xl:grid-cols-[1fr_320px]">
        {/* ── 左侧主横幅 ── */}
        <Link
          href={main.href}
          className="group relative min-h-[420px] sm:min-h-[480px] overflow-hidden rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-900/5"
        >
          <Image
            src={main.image}
            alt={main.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 70vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* 暗色渐变蒙层 */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          {/* 内容 */}
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 lg:p-14">
            <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
              {/* 顶部徽标 */}
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/90 backdrop-blur-sm px-4 py-1.5 text-xs font-black text-slate-950 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                薛大大推荐
              </span>

              {/* 标题 */}
              <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl text-white">
                {main.title}
              </h1>
              <p className="mt-3 text-xl sm:text-2xl font-black text-cyan-300 tracking-wide">
                {main.subtitle}
              </p>

              {/* 按钮组 */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 pl-6 pr-5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105">
                  <Play className="h-4 w-4" fill="currentColor" />
                  立即学习
                </span>
                <span className="inline-flex h-11 items-center gap-2 rounded-full bg-white/15 backdrop-blur-md pl-5 pr-4 text-sm font-bold text-white ring-1 ring-inset ring-white/25 transition-all duration-300 hover:bg-white/25 group-hover:pr-6">
                  查看教程
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>

              {/* 特性标签 */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {heroFeatures.map((f) => (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold text-white/90 ring-1 ring-inset ring-white/15"
                  >
                    <span>{f.icon}</span>
                    {f.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 内边框 */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </Link>

        {/* ── 右侧热门推荐侧边栏 ── */}
        <aside className="hidden xl:flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <Flame className="h-4 w-4 text-orange-500" fill="currentColor" />
            <span className="text-sm font-black text-slate-800">热门推荐</span>
          </div>

          {hotRecommendations.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                index === 0
                  ? "border-cyan-200 bg-gradient-to-r from-cyan-50 to-white"
                  : index === 1
                    ? "border-amber-200 bg-gradient-to-r from-amber-50 to-white"
                    : "border-slate-200 bg-white hover:border-cyan-200"
              }`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg text-sm font-black ${
                  index === 0
                    ? "bg-cyan-500 text-white"
                    : index === 1
                      ? "bg-amber-500 text-white"
                      : index === 2
                        ? "bg-blue-100 text-blue-700"
                        : index === 3
                          ? "bg-violet-100 text-violet-700"
                          : "bg-rose-100 text-rose-700"
                }`}
              >
                {index === 0 ? <Zap className="h-5 w-5" /> : index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">
                  {item.label}
                </p>
              </div>
              {item.badge && (
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${
                    item.badge === "HOT"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-all group-hover:text-cyan-500 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </aside>
      </div>
    </section>
  );
}
