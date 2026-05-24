import Link from "next/link";
import { ArrowLeft, Eye, Calendar, Tag } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/shared/back-to-top";

async function getNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/public/content?type=NEWS&limit=50`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

const fallbackNews = [
  {
    id: "n1", title: "D5 Render 2.0 正式发布，AI 辅助渲染时代来临",
    summary: "D5 Render 发布 2.0 版本，集成 AI 辅助渲染功能，大幅提升出图效率。",
    coverImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=82",
    viewCount: 1520, publishedAt: "2026-05-20",
    slug: "d5-render-2-0",
    categories: [{ name: "薛大大新闻", slug: "news" }],
  },
  {
    id: "n2", title: "SU 2026 版本更新详解：这些新功能你必须知道",
    summary: "SketchUp 2026 带来多项重大更新，包括原生 AI 建模辅助和材质库重构。",
    coverImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=82",
    viewCount: 2340, publishedAt: "2026-05-18",
    slug: "su-2026-update",
    categories: [{ name: "薛大大新闻", slug: "news" }],
  },
  {
    id: "n3", title: "学与成新版网站上线公告",
    summary: "学与成设计网全面升级，采用全新架构，更快更稳定，欢迎体验。",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=82",
    viewCount: 890, publishedAt: "2026-05-15",
    slug: "new-site-launch",
    categories: [{ name: "薛大大新闻", slug: "news" }],
  },
];

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  coverImage?: string | null;
  viewCount: number;
  publishedAt?: string | null;
  slug: string;
  categories?: { name: string; slug: string }[];
};

export default async function NewsPage() {
  const newsItems = await getNews();
  const items = newsItems.length > 0 ? newsItems : fallbackNews;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1000px,calc(100vw-28px))] py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />首页
          </Link>
          <span className="text-slate-300">/</span>
          <h1 className="text-xl font-black text-slate-900">薛大大新闻</h1>
        </div>

        <div className="space-y-4">
          {(items as NewsItem[]).map((item) => (
            <Link
              key={item.id}
              href={`/detail/${item.slug}`}
              className="group flex flex-col sm:flex-row gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-cyan-200"
              >
                {item.coverImage && (
                  <div className="shrink-0 w-full sm:w-48 h-32 rounded-xl bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                )}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-black text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-2">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm font-medium text-slate-500 line-clamp-2">{item.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.publishedAt?.slice(0, 10)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {item.viewCount} ℃
                  </span>
                  {item.categories?.map((c) => (
                    <span key={c.slug} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600">
                      <Tag className="h-3 w-3" />
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
