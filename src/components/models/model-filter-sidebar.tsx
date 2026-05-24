"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Box, FolderTree } from "lucide-react";
import { type ModelCategory } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function ModelFilterSidebar({
  activeSlug,
  categories,
  basePath = "/models",
}: {
  activeSlug?: string;
  categories: ModelCategory[];
  basePath?: string;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(categories.filter((c) => c.children).map((c) => c.slug))
  );

  const toggle = (slug: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const isActive = (slug: string) => activeSlug === slug || (!activeSlug && slug === "all");

  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* 标题 */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-100 to-white text-amber-600 ring-1 ring-amber-200/50">
            <FolderTree className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-black text-slate-900">模型分类</p>
            <p className="text-xs font-medium text-slate-400">按类别筛选</p>
          </div>
        </div>

        {/* 分类列表 */}
        <nav className="py-2">
          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              category={cat}
              expanded={expanded.has(cat.slug)}
              activeSlug={activeSlug}
              isActive={isActive(cat.slug)}
              onToggle={() => toggle(cat.slug)}
              depth={0}
              basePath={basePath}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

function CategoryItem({
  category,
  expanded,
  activeSlug,
  isActive,
  onToggle,
  depth,
  basePath,
}: {
  category: ModelCategory;
  expanded: boolean;
  activeSlug?: string;
  isActive: boolean;
  onToggle: () => void;
  depth: number;
  basePath: string;
}) {
  const hasChildren = category.children && category.children.length > 0;
  const childActive = hasChildren && category.children!.some(
    (c) => activeSlug === c.slug
  );

  return (
    <div>
      <div
        className={cn(
          "group flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-all duration-200",
          depth === 0 ? "pr-5" : `pl-${4 + depth * 4}`,
          isActive || childActive
            ? "bg-amber-50 text-amber-700 border-r-[3px] border-amber-500 font-bold"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold"
        )}
        style={{ paddingLeft: `${16 + depth * 16}px` }}
      >
        <Link
          href={`${basePath}${category.slug === "all" ? "" : `?category=${category.slug}`}`}
          className="flex flex-1 items-center gap-2 min-w-0"
        >
          {depth === 0 ? (
            <Box className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0 opacity-60" />
          )}
          <span className="text-sm truncate">{category.name}</span>
        </Link>
        <span className="text-xs text-slate-400 shrink-0">{category.count}</span>
        {hasChildren && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle();
            }}
            className="ml-1 grid h-5 w-5 place-items-center rounded hover:bg-slate-200/60 transition-colors shrink-0"
          >
            {expanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </button>
        )}
      </div>

      {/* 子分类 */}
      {hasChildren && expanded && (
        <div className="overflow-hidden">
          {category.children!.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              expanded={false}
              activeSlug={activeSlug}
              isActive={activeSlug === child.slug}
              onToggle={() => {}}
              depth={depth + 1}
              basePath={basePath}
            />
          ))}
        </div>
      )}
    </div>
  );
}
