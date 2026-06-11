"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Boxes,
  Brush,
  Clock3,
  Download,
  Home,
  ImageIcon,
  Layers3,
  Loader2,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";

const sideItems = [
  { icon: Home, label: "返回网站", href: "/", active: false },
  { icon: Sparkles, label: "灵感生图", href: "#prompt", active: true },
  { icon: Boxes, label: "效果图氛围", href: "#scene" },
  { icon: Brush, label: "风格改稿", href: "#scene" },
  { icon: Layers3, label: "平面转空间", href: "#scene" },
  { icon: ImageIcon, label: "鸟瞰草案", href: "#scene" },
  { icon: Clock3, label: "生成记录", href: "/downloads" },
  { icon: Download, label: "下载记录", href: "/downloads" },
];

const sceneCards = [
  {
    title: "效果图氛围",
    text: "室内、建筑外观、景观节点，一句话生成参考氛围。",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=82",
    wide: true,
  },
  {
    title: "平面转空间",
    text: "把户型、草图、平面关系转成空间参考。",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=82",
  },
  {
    title: "鸟瞰草案",
    text: "园区、校园、商业街区快速出鸟瞰构图。",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=82",
  },
  {
    title: "材料风格",
    text: "木、石、微水泥、金属等材质组合灵感。",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=82",
  },
];

const promptChips = ["现代民宿", "售楼处", "庭院景观", "办公室", "展厅", "奶油风室内"];
const sizeOptions = [
  { label: "1:1", value: "1024x1024" },
  { label: "16:9", value: "1792x1024" },
  { label: "9:16", value: "1024x1792" },
];

export function AiImageWorkbench() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState(sizeOptions[1].value);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const activeSizeLabel = useMemo(
    () => sizeOptions.find((option) => option.value === size)?.label ?? "16:9",
    [size],
  );

  async function handleGenerate(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError("");

    if (!prompt.trim()) {
      setError("先输入一段设计提示词。");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, size }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "生成失败，请稍后重试。");
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试。");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleDownloadImage() {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `belongstoai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0d1117] text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[176px] border-r border-white/8 bg-[#080b10] xl:block">
        <div className="flex h-full flex-col px-3 py-4">
          <Link href="/" className="mb-6 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400 text-base font-black text-slate-950">
              吾
            </span>
            <span>
              <span className="block text-sm font-black">吾大大 AI 工坊</span>
              <span className="mt-0.5 block text-[11px] font-bold text-white/38">Design Image Lab</span>
            </span>
          </Link>

          <nav className="space-y-1">
            {sideItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold transition ${
                    item.active
                      ? "bg-cyan-400 text-slate-950"
                      : "text-white/66 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-xs font-black text-white">单次生图 0.15 元</p>
            <p className="mt-1 text-[11px] font-semibold leading-5 text-white/42">
              当前已接入服务端转发，后续可继续接支付、队列和生成记录。
            </p>
          </div>
        </div>
      </aside>

      <section className="relative min-h-screen xl:pl-[176px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_82%_4%,rgba(245,158,11,0.10),transparent_28%),linear-gradient(180deg,#101820_0%,#0d1117_48%,#090d12_100%)]" />

        <header className="relative z-20 flex h-16 items-center justify-between border-b border-white/8 px-5 xl:px-8">
          <Link href="/" className="text-sm font-black text-white/78 transition hover:text-cyan-200 xl:hidden">
            吾大大 AI 工坊
          </Link>
          <div className="hidden text-xs font-black uppercase tracking-[0.22em] text-white/32 xl:block">
            XUEDDA DESIGN IMAGE LAB
          </div>
          <div className="flex items-center gap-2 text-xs font-black">
            <button className="rounded-full bg-white/8 px-3 py-1.5 text-white/70 transition hover:bg-white/12 hover:text-white">案例参考</button>
            <button className="rounded-full bg-white/8 px-3 py-1.5 text-white/70 transition hover:bg-white/12 hover:text-white">提示词库</button>
            <button className="rounded-full bg-cyan-400 px-3 py-1.5 text-slate-950 transition hover:bg-cyan-300">充值次数</button>
          </div>
        </header>

        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-[1320px] flex-col px-5 pb-44 pt-12 xl:px-8">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs font-black text-cyan-200">
                <Wand2 className="h-3.5 w-3.5" />
                建筑设计专用生图入口
              </div>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-6xl">
                从一句设计想法，
                <span className="block text-cyan-200">生成可讨论的视觉草案。</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/52 sm:text-base">
                面向建筑、室内、景观和课程封面，快速出方向、看氛围、改风格，再回到模型和教程里继续深化。
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {promptChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setPrompt((current) => (current ? `${current}，${chip}` : chip))}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/62 transition hover:border-cyan-300/40 hover:text-cyan-100"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div id="scene" className="grid gap-3 sm:grid-cols-2">
              {sceneCards.map((card) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setPrompt(`${card.title}，${card.text}`)}
                  className={`group overflow-hidden rounded-3xl border border-white/8 bg-white/[0.045] p-4 text-left shadow-[0_18px_70px_-48px_rgba(0,0,0,0.9)] transition hover:-translate-y-1 hover:border-cyan-300/24 hover:bg-white/[0.065] ${
                    card.wide ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-black text-white">{card.title}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-white/42">{card.text}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/42 transition group-hover:translate-x-1 group-hover:text-cyan-200" />
                  </div>
                  <div className={`relative overflow-hidden rounded-2xl bg-black ${card.wide ? "h-40" : "h-32"}`}>
                    <Image src={card.image} alt={card.title} fill sizes={card.wide ? "640px" : "320px"} className="object-cover opacity-88 transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {imageUrl && (
            <section className="mt-10 max-w-4xl rounded-3xl border border-white/8 bg-white/[0.045] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-sm font-black text-white">生成结果</h2>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-cyan-100"
                  >
                    <Download className="h-3.5 w-3.5" />
                    下载图片
                  </button>
                  <a href={imageUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-cyan-200 hover:text-cyan-100">
                    打开原图
                  </a>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="AI 生成结果" className="max-h-[620px] w-full object-contain" />
              </div>
            </section>
          )}
        </div>

        <form id="prompt" onSubmit={handleGenerate} className="fixed bottom-5 left-4 right-4 z-30 xl:left-[calc(176px+50%)] xl:right-auto xl:w-[720px] xl:-translate-x-1/2">
          <div className="rounded-3xl border border-white/10 bg-[#171d24]/94 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <button type="button" className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-dashed border-white/18 bg-white/[0.04] text-white/58 transition hover:bg-white/8 hover:text-white">
                <Plus className="h-5 w-5" />
              </button>
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="描述你的设计需求，例如：现代山地民宿，木质立面，清晨薄雾，D5 写实效果..."
                className="min-h-16 flex-1 resize-none bg-transparent pt-2 text-sm font-semibold leading-6 text-white outline-none placeholder:text-white/30"
              />
            </div>
            {error && <p className="mt-2 px-1 text-xs font-bold text-red-300">{error}</p>}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 items-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-400/8 px-3 text-xs font-black text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  设计生图
                </span>
                <div className="flex rounded-xl border border-white/10 p-0.5">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSize(option.value)}
                      className={`h-7 rounded-lg px-2.5 text-xs font-black transition ${
                        size === option.value ? "bg-white text-slate-950" : "text-white/58 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <span className="hidden h-8 items-center gap-2 rounded-xl border border-white/10 px-3 text-xs font-black text-white/62 sm:inline-flex">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {activeSizeLabel} 效果图
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-white/48">
                <span>0.15 元/次</span>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300 text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="生成图片"
                >
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
