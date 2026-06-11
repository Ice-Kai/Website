import Link from "next/link";
import { Suspense } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, Search, SlidersHorizontal, Grid3X3, Box, Cuboid } from "lucide-react";
import { ModelFilterSidebar } from "@/components/models/model-filter-sidebar";
import { ResourceCard } from "@/components/shared/resource-card";
import { getContentItems } from "@/lib/db";
import { modelCategories } from "@/lib/site-data";

export default async function ModelsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; q?: string; type?: string }>;
}) {
  const params = await searchParams;
  const activeType = params.type === "max" ? "max" : "su";
  const activeCategory = params.category || "all";
  const sortBy = params.sort || "newest";
  const query = params.q || "";
  const visibleCategories =
    activeType === "max"
      ? modelCategories.filter((category) => category.slug === "all" || category.slug.startsWith("max-"))
      : modelCategories.filter((category) => category.slug === "all" || !category.slug.startsWith("max-"));
  const queryCategory = activeType === "max" && activeCategory === "all" ? "max-model" : activeCategory;

  // 🔌 从数据库读取真实数据
  const items = await getContentItems({
    type: ["MODEL"],
    category: queryCategory !== "all" ? queryCategory : undefined,
    sort: sortBy as "newest" | "popular",
    query: query || undefined,
  });

  // 分类面包屑名称
  const activeCategoryName =
    activeCategory === "all"
      ? "全部模型"
      : modelCategories
          .flatMap((c) => [c, ...(c.children || [])])
          .find((c) => c.slug === activeCategory)?.name || activeCategory;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部条 */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-[min(1760px,calc(100vw-32px))] items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            首页
          </Link>
          <span className="text-slate-300 shrink-0">/</span>
          <h1 className="text-base font-black text-slate-900 truncate">
            {activeType === "max" ? "MAX模型" : "SU模型"}{activeCategory !== "all" ? ` · ${activeCategoryName}` : ""}
          </h1>
        </div>
      </header>

      <div className="mx-auto flex w-[min(1760px,calc(100vw-32px))] gap-6 py-6">
        {/* 左侧筛选侧边栏 */}
        <Suspense fallback={null}>
          <ModelFilterSidebar activeSlug={activeCategory} categories={visibleCategories} basePath="/models" modelType={activeType} />
        </Suspense>

        {/* 右侧主内容 */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <ModelTypeTab
              href="/models?type=su"
              active={activeType === "su"}
              icon={<Box className="h-5 w-5" />}
              title="SU模型"
              description="建筑、工装、家装、园林和 D5 模型"
            />
            <ModelTypeTab
              href="/models?type=max&category=max-model"
              active={activeType === "max"}
              icon={<Cuboid className="h-5 w-5" />}
              title="MAX模型"
              description="室内、建筑、景观 3ds Max 模型"
            />
          </div>

          {/* 工具栏 */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* 搜索 */}
            <form className="flex h-10 flex-1 min-w-[200px] items-center gap-2 rounded-full border border-slate-200 bg-white px-4 transition-all focus-within:border-cyan-400 focus-within:ring-3 focus-within:ring-cyan-400/10">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                name="q"
                defaultValue={query}
                placeholder="搜索模型名称、描述…"
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
              />
              <input type="hidden" name="type" value={activeType} />
              <input type="hidden" name="category" value={activeCategory} />
            </form>

            {/* 排序 */}
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
              <SortButton href={`/models?type=${activeType}&category=${activeCategory}&sort=newest`} active={sortBy === "newest"}>
                最新
              </SortButton>
              <SortButton href={`/models?type=${activeType}&category=${activeCategory}&sort=popular`} active={sortBy === "popular"}>
                最热
              </SortButton>
              <SortButton href={`/models?type=${activeType}&category=${activeCategory}&sort=downloads`} active={sortBy === "downloads"}>
                下载
              </SortButton>
            </div>

            {/* 布局切换（预留） */}
            <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-cyan-600 transition-colors">
              <Grid3X3 className="h-4 w-4" />
            </button>
          </div>

          {/* 模型网格 */}
          {items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <ResourceCard key={item.title} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <SlidersHorizontal className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-lg font-bold text-slate-600">没有找到匹配的模型</p>
              <p className="mt-2 text-sm text-slate-400">试试调整筛选条件或搜索关键词</p>
              <Link
                href="/models"
                className="mt-4 inline-flex h-9 items-center rounded-full bg-cyan-500 px-5 text-sm font-bold text-white hover:bg-cyan-600 transition-colors"
              >
                清除筛选
              </Link>
            </div>
          )}

          <div className="mt-8 h-px bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function SortButton({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-8 items-center rounded-full px-3.5 text-xs font-bold transition-all ${
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </Link>
  );
}

function ModelTypeTab({
  href,
  active,
  icon,
  title,
  description,
}: {
  href: string;
  active: boolean;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
        active
          ? "border-cyan-300 bg-cyan-50 text-cyan-800 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:bg-slate-50"
      }`}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
          active ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-cyan-100 group-hover:text-cyan-700"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-base font-black">{title}</span>
        <span className="mt-0.5 block truncate text-xs font-semibold opacity-75">{description}</span>
      </span>
    </Link>
  );
}
