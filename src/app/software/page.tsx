import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { ModelFilterSidebar } from "@/components/models/model-filter-sidebar";
import { ResourceCard } from "@/components/shared/resource-card";
import { allSoftwareItems, softwareCategories } from "@/lib/site-data";

export default async function SoftwarePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category || "all";
  const sortBy = params.sort || "newest";
  const query = params.q || "";

  let items = [...allSoftwareItems];

  if (activeCategory !== "all") {
    const findCategory = (
      cats: typeof softwareCategories,
      slug: string
    ): (typeof softwareCategories)[number] | undefined => {
      for (const cat of cats) {
        if (cat.slug === slug) return cat;
        if (cat.children) {
          const found = findCategory(cat.children as typeof softwareCategories, slug);
          if (found) return found;
        }
      }
      return undefined;
    };

    const cat = findCategory(softwareCategories, activeCategory);
    if (cat) {
      const keywords = cat.name;
      items = items.filter((item) => item.category.includes(keywords));
    }
  }

  if (query) {
    const q = query.toLowerCase();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }

  if (sortBy === "popular") {
    items.sort((a, b) => parseInt(b.views.replace(/[^0-9]/g, "")) - parseInt(a.views.replace(/[^0-9]/g, "")));
  }

  const activeName =
    activeCategory === "all"
      ? "全部软件"
      : softwareCategories
          .flatMap((c) => [c, ...(c.children || [])])
          .find((c) => c.slug === activeCategory)?.name || activeCategory;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-[min(1500px,calc(100vw-28px))] items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            首页
          </Link>
          <span className="text-slate-300 shrink-0">/</span>
          <h1 className="text-base font-black text-slate-900 truncate">
            软件插件{activeCategory !== "all" ? ` · ${activeName}` : ""}
          </h1>
          <span className="ml-auto text-sm font-semibold text-slate-400 shrink-0">
            共 {items.length} 个资源
          </span>
        </div>
      </header>

      <div className="mx-auto flex w-[min(1500px,calc(100vw-28px))] gap-6 py-6">
        <Suspense fallback={null}>
          <ModelFilterSidebar activeSlug={activeCategory} categories={softwareCategories} basePath="/software" />
        </Suspense>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <form className="flex h-10 flex-1 min-w-[200px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 transition-all focus-within:border-cyan-400 focus-within:ring-3 focus-within:ring-cyan-400/10">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                name="q"
                defaultValue={query}
                placeholder="搜索软件名称…"
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
              />
              <input type="hidden" name="category" value={activeCategory} />
            </form>
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
              <SortButton href={`/software?category=${activeCategory}&sort=newest`} active={sortBy === "newest"}>最新</SortButton>
              <SortButton href={`/software?category=${activeCategory}&sort=popular`} active={sortBy === "popular"}>最热</SortButton>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <ResourceCard key={item.title} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <SlidersHorizontal className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-lg font-bold text-slate-600">没有找到匹配的软件</p>
              <p className="mt-2 text-sm text-slate-400">试试调整筛选条件或搜索关键词</p>
              <Link href="/software" className="mt-4 inline-flex h-9 items-center rounded-full bg-cyan-500 px-5 text-sm font-bold text-white hover:bg-cyan-600 transition-colors">清除筛选</Link>
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              <span>显示 {items.length} 个结果</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SortButton({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`inline-flex h-8 items-center rounded-full px-3.5 text-xs font-bold transition-all ${active ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>
      {children}
    </Link>
  );
}
