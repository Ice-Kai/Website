import Link from "next/link";
import { ArrowRight, BookOpenText, Copy } from "lucide-react";

const textCases = [
  {
    title: "室内渲染文案参考",
    text: "现代侘寂风客餐厅，微水泥墙面，低饱和暖灰色，隐藏灯带，清晨自然光，D5 Render 写实效果。",
  },
  {
    title: "建筑外观文案参考",
    text: "山地度假民宿，木格栅立面，大面积落地窗，雨后湿润石材地面，黄昏灯光，电影感建筑表现。",
  },
  {
    title: "景观方案文案参考",
    text: "社区口袋公园，曲线步道，耐候钢花池，低维护植物群落，儿童活动节点，鸟瞰与人视结合表达。",
  },
];

export function TextCaseSection() {
  return (
    <section id="text-cases" className="py-12">
      <div className="mx-auto w-[min(1760px,calc(100vw-32px))]">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 bg-amber-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-amber-700 ring-1 ring-amber-100">
              <BookOpenText className="h-3.5 w-3.5" />
              文本案例参考区
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">提示词、项目介绍、案例文案都能参考</h2>
          </div>
          <Link href="/ai-image" className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:text-cyan-700">
            用于 AI 生图
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {textCases.map((item) => (
            <article key={item.title} className="group rounded-md border border-white/70 bg-white/85 p-6 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_22px_44px_-18px_rgba(217,119,6,0.28)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                <span className="grid h-9 w-9 place-items-center rounded-md bg-amber-50 text-amber-500 ring-1 ring-amber-100 transition group-hover:bg-amber-100">
                  <Copy className="h-4 w-4" />
                </span>
              </div>
              <p className="text-sm font-semibold leading-7 text-slate-500">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
