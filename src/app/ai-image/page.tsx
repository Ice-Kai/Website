import Link from "next/link";
import { ArrowLeft, Coins, ImagePlus, Wand2 } from "lucide-react";

const styles = ["建筑外观", "室内空间", "景观园林", "课程封面"];
const ratios = ["16:9", "4:3", "1:1", "3:4"];

export default function AiImagePage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_15%_12%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.18),transparent_28%),linear-gradient(180deg,#07111f_0%,#0f172a_100%)]" />
      <div className="relative mx-auto w-[min(1180px,calc(100vw-28px))] py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </Link>

        <section className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black text-cyan-100 ring-1 ring-white/15">
              <Coins className="h-3.5 w-3.5 text-amber-200" />
              单次生成 0.15 元
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              AI 生图
              <span className="block bg-gradient-to-r from-cyan-300 via-white to-amber-200 bg-clip-text text-transparent">
                为设计效果图找灵感
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-300">
              这里先搭好前台入口和计费表达，后续可以接入支付、任务队列和图片生成服务。
              除 AI 生图外，网站资源栏目不做付费提示。
            </p>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-white/10 p-5 shadow-2xl shadow-cyan-950/50 backdrop-blur">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400 text-slate-950">
                <Wand2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-base font-black">创建生图任务</p>
                <p className="text-xs font-semibold text-slate-400">当前为前台样式占位</p>
              </div>
            </div>

            <label className="text-xs font-black tracking-wide text-slate-300">提示词</label>
            <textarea
              className="mt-2 min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-semibold leading-6 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="例如：现代山地民宿，清晨薄雾，木质立面，大面积落地窗，写实建筑效果图..."
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-black tracking-wide text-slate-300">图片类型</p>
                <div className="grid grid-cols-2 gap-2">
                  {styles.map((style) => (
                    <button key={style} className="rounded-xl bg-white/8 px-3 py-2 text-xs font-bold text-slate-200 ring-1 ring-white/10 transition hover:bg-white/14">
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-black tracking-wide text-slate-300">画面比例</p>
                <div className="grid grid-cols-2 gap-2">
                  {ratios.map((ratio) => (
                    <button key={ratio} className="rounded-xl bg-white/8 px-3 py-2 text-xs font-bold text-slate-200 ring-1 ring-white/10 transition hover:bg-white/14">
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan-400 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300">
              <ImagePlus className="h-4 w-4" />
              支付 0.15 元并生成
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
