import Link from "next/link";
import { Tag } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/shared/back-to-top";
import { Breadcrumb } from "@/components/shared/breadcrumb";

async function getCategoryItems(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/public/content?category=${slug}&limit=50`, { cache: "no-store" });
    if (!res.ok) return { items: [], total: 0 };
    return res.json();
  } catch {
    return { items: [], total: 0 };
  }
}

type PublicContentItem = {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  coverImage?: string | null;
  contentType: string;
  viewCount: number;
  publishedAt?: string | null;
  categories?: { name: string; slug: string }[];
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getCategoryItems(slug);
  const items = data.items || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1760px,calc(100vw-32px))] py-8">
        <Breadcrumb items={[{ label: "首页", href: "/" }, { label: `分类: ${slug}` }]} />

        <h1 className="mt-4 text-xl font-black text-slate-900">分类：{slug}</h1>
        <p className="text-sm text-slate-500 mt-1">共 {data.total || items.length} 条内容</p>

        {items.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(items as PublicContentItem[]).map((item) => (
              <Link
                key={item.id}
                href={`/detail/${item.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-cyan-200"
              >
                {item.coverImage && (
                  <div className="aspect-[1.25/1] bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                )}
                <div className="p-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">
                    <Tag className="h-3 w-3" />
                    {item.categories?.[0]?.name || item.contentType}
                  </span>
                  <h3 className="mt-2 font-black text-slate-900 line-clamp-2 group-hover:text-cyan-700 transition-colors">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="mt-1.5 text-sm text-slate-500 line-clamp-2">{item.summary}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>{item.publishedAt?.slice(0, 10)}</span>
                    <span>{item.viewCount} ℃</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center py-16">
            <p className="text-slate-400 font-medium">该分类下暂无内容</p>
            <Link href="/" className="mt-4 inline-flex h-9 items-center rounded-full bg-cyan-600 px-4 text-sm font-bold text-white">
              返回首页
            </Link>
          </div>
        )}
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
