"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Clock3,
  Download,
  ImageIcon,
  Loader2,
  Maximize2,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { ImageEditor } from "./image-editor";

type GeneratedImage = {
  id: string;
  prompt: string;
  size: string;
  imageUrl: string;
  previewUrl: string;
  proxyPreviewUrl?: string;
  downloadUrl: string;
  createdAt: string;
};

const historyKey = "belongstoai.generatedImages";

const promptChips = ["现代建筑", "冷淡风室内", "售楼处", "展厅", "庭院景观", "城市文化馆"];
const sizeOptions = [
  { label: "1:1", value: "1024x1024" },
  { label: "16:9", value: "1792x1024" },
  { label: "9:16", value: "1024x1792" },
];

const progressSteps = [
  "连接图像模型",
  "解析空间关系",
  "生成构图草案",
  "补充材质与光影",
  "整理高清预览",
];

const examplePrompts = [
  "生成一张现代建筑效果图，玻璃幕墙，黄昏灯光，雨后街道，写实摄影质感",
  "生成一张冷淡风室内图，微水泥墙面，柔和自然光，极简家具，高级灰色调",
  "生成一张庭院景观效果图，现代民宿入口，石材铺装，植物层次丰富，清晨薄雾",
];

function loadHistory() {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(historyKey) || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 12) as GeneratedImage[] : [];
  } catch {
    return [];
  }
}

function saveHistory(items: GeneratedImage[]) {
  window.localStorage.setItem(historyKey, JSON.stringify(items.slice(0, 12)));
}

export function AiImageWorkbench() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState(sizeOptions[1].value);
  const [result, setResult] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>(() => loadHistory());
  const [previewSrc, setPreviewSrc] = useState("");
  const [previewFallbackIndex, setPreviewFallbackIndex] = useState(0);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [sourceImage, setSourceImage] = useState<string | null>(null);

  const activeSizeLabel = useMemo(
    () => sizeOptions.find((option) => option.value === size)?.label ?? "16:9",
    [size],
  );

  const progressIndex = Math.min(
    progressSteps.length - 1,
    Math.floor(elapsed / 24),
  );

  useEffect(() => {
    if (!isGenerating) return;

    const timer = window.setInterval(() => {
      setElapsed((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isGenerating]);

  async function handleGenerate(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError("");

    if (!prompt.trim()) {
      setError("先输入一段设计提示词。");
      return;
    }

    setIsGenerating(true);
    setElapsed(0);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, size, sourceImage }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "生成失败，请稍后重试。");
      }

      const item: GeneratedImage = {
        id: `${Date.now()}`,
        prompt,
        size,
        imageUrl: data.imageUrl,
        previewUrl: data.previewUrl || data.imageUrl,
        proxyPreviewUrl: data.proxyPreviewUrl,
        downloadUrl: data.downloadUrl || data.imageUrl,
        createdAt: new Date().toISOString(),
      };

      setResult(item);
      setPreviewFallbackIndex(0);
      setPreviewSrc(item.previewUrl || item.imageUrl || item.downloadUrl);
      setHistory((current) => {
        const next = [item, ...current].slice(0, 12);
        saveHistory(next);
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败，请稍后重试。");
    } finally {
      setIsGenerating(false);
    }
  }

  function handlePreviewError() {
    if (!result) return;

    const fallbacks = [result.proxyPreviewUrl, result.imageUrl, result.downloadUrl].filter(Boolean) as string[];
    const next = fallbacks[previewFallbackIndex];

    if (next && next !== previewSrc) {
      setPreviewSrc(next);
      setPreviewFallbackIndex((current) => current + 1);
      return;
    }

    setError("图片已经生成，但预览地址加载失败。可以先点“打开原图”或“下载图片”。");
  }

  function selectHistoryItem(item: GeneratedImage) {
    setResult(item);
    setPreviewFallbackIndex(0);
    setPreviewSrc(item.previewUrl || item.imageUrl || item.downloadUrl);
    setError("");
  }

  async function handleDownloadImage(target = result?.downloadUrl || result?.imageUrl) {
    if (!target) return;

    try {
      const response = await fetch(target);
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
      window.open(target, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <main className="min-h-screen bg-[#070b10] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_78%_2%,rgba(20,184,166,0.12),transparent_26%),linear-gradient(180deg,#0b1118_0%,#070b10_56%,#05070a_100%)]" />

      <section className="relative mx-auto grid min-h-screen max-w-[1480px] grid-rows-[auto_1fr] px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex h-14 items-center justify-between border-b border-white/8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-white/70 transition hover:text-cyan-200">
            <ArrowLeft className="h-4 w-4" />
            返回网站
          </Link>
          <div className="hidden text-xs font-black uppercase tracking-[0.22em] text-white/35 sm:block">
            BelongsToAI Image Lab
          </div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-xs font-black text-cyan-200">
            0.15 元/次
          </div>
        </header>

        <div className="grid gap-5 py-5 lg:grid-cols-[360px_minmax(0,1fr)_320px]">
          <aside className="flex flex-col gap-4">
            <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs font-black text-cyan-200">
                <Wand2 className="h-3.5 w-3.5" />
                建筑设计生图
              </div>
              <h1 className="text-3xl font-black leading-tight text-white">
                输入想法，
                <span className="block text-cyan-200">生成视觉草案。</span>
              </h1>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/52">
                生图通常需要 1-3 分钟。生成过程中不要关闭页面，完成后会自动保存到本机历史图像。
              </p>
            </section>

            <form onSubmit={handleGenerate} className="rounded-2xl border border-white/10 bg-[#151b23]/95 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="例如：现代建筑效果图，玻璃幕墙，黄昏灯光，雨后街道，写实摄影质感..."
                className="min-h-36 w-full resize-none rounded-xl border border-white/10 bg-black/20 p-3 text-sm font-semibold leading-6 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/40"
              />
              <ImageEditor onChange={setSourceImage} />

              <div className="mt-3 flex flex-wrap gap-2">
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

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex rounded-xl border border-white/10 p-0.5">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSize(option.value)}
                      className={`h-8 rounded-lg px-3 text-xs font-black transition ${
                        size === option.value ? "bg-white text-slate-950" : "text-white/58 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-cyan-300 px-4 text-sm font-black text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {isGenerating ? "生成中" : "开始生成"}
                </button>
              </div>

              {error && <p className="mt-3 text-xs font-bold leading-5 text-red-300">{error}</p>}
            </form>

            <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">Prompt Examples</p>
              <div className="mt-3 space-y-2">
                {examplePrompts.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPrompt(item)}
                    className="block w-full rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2 text-left text-xs font-semibold leading-5 text-white/58 transition hover:border-cyan-300/25 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <section className="min-h-[560px] rounded-2xl border border-white/10 bg-[#0d131a]/80 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-white">生成预览</p>
                <p className="mt-1 text-xs font-semibold text-white/38">{activeSizeLabel} 效果图</p>
              </div>
              {result && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleDownloadImage()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-cyan-100"
                  >
                    <Download className="h-3.5 w-3.5" />
                    下载图片
                  </button>
                  <a href={result.imageUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-cyan-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                    打开原图
                  </a>
                </div>
              )}
            </div>

            <div className="relative grid min-h-[500px] place-items-center overflow-hidden rounded-2xl border border-white/8 bg-black/35">
              {isGenerating && (
                <div className="absolute inset-0 z-10 grid place-items-center bg-[#081018]/92 px-6">
                  <div className="w-full max-w-lg text-center">
                    <div className="relative mx-auto h-32 w-32">
                      <div className="absolute inset-0 rounded-full border border-cyan-200/20" />
                      <div className="absolute inset-3 animate-spin rounded-full border border-transparent border-t-cyan-200 border-r-cyan-200/70" />
                      <div className="absolute inset-7 rounded-full bg-cyan-300/10 blur-xl" />
                      <Sparkles className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-cyan-200" />
                    </div>
                    <p className="mt-5 text-lg font-black text-white">{progressSteps[progressIndex]}</p>
                    <p className="mt-2 text-sm font-semibold text-white/48">
                      已等待 {elapsed} 秒，复杂图像可能需要 2-3 分钟。
                    </p>
                    <div className="mt-5 grid grid-cols-5 gap-2">
                      {progressSteps.map((step, index) => (
                        <div
                          key={step}
                          className={`h-1.5 rounded-full ${
                            index <= progressIndex ? "bg-cyan-300" : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {result && previewSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewSrc}
                  alt={result.prompt}
                  onError={handlePreviewError}
                  className="max-h-[68vh] w-full object-contain"
                />
              ) : (
                <div className="px-8 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-dashed border-white/16 text-white/35">
                    <ImageIcon className="h-7 w-7" />
                  </div>
                  <p className="mt-4 text-sm font-black text-white/70">生成后的图片会显示在这里</p>
                  <p className="mt-2 text-xs font-semibold text-white/38">历史图像会保存在当前浏览器本地。</p>
                </div>
              )}
            </div>
          </section>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-white">历史图像</p>
                <p className="mt-1 text-xs font-semibold text-white/38">保存在当前浏览器</p>
              </div>
              <Clock3 className="h-4 w-4 text-white/35" />
            </div>

            <div className="space-y-3">
              {history.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/12 p-4 text-xs font-semibold leading-5 text-white/42">
                  暂无历史。生成完成后会自动出现在这里。
                </div>
              )}

              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectHistoryItem(item)}
                  className="group block w-full overflow-hidden rounded-xl border border-white/8 bg-white/[0.04] text-left transition hover:border-cyan-300/25"
                >
                  <div className="aspect-video bg-black/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.previewUrl || item.imageUrl} alt={item.prompt} className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-2 text-xs font-bold leading-5 text-white/72">{item.prompt}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-white/35">
                      <span>{sizeOptions.find((option) => option.value === item.size)?.label ?? item.size}</span>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDownloadImage(item.downloadUrl || item.imageUrl);
                        }}
                        className="text-cyan-200 hover:text-cyan-100"
                      >
                        下载
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
