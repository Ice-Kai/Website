import "server-only";
import { prisma } from "./prisma";
import type { ContentType } from "@prisma/client";

// ── 获取某类型内容列表 ──

export async function getContentItems(params: {
  type: ContentType | ContentType[];
  category?: string;
  sort?: "newest" | "popular" | "downloads";
  query?: string;
}) {
  const types = Array.isArray(params.type) ? params.type : [params.type];

  const items = await prisma.contentItem.findMany({
    where: {
      contentType: { in: types },
      status: "PUBLISHED",
      ...(params.query
        ? {
            OR: [
              { title: { contains: params.query } },
              { summary: { contains: params.query } },
            ],
          }
        : {}),
      ...(params.category
        ? {
            categories: {
              some: {
                OR: [{ slug: params.category }, { parent: { slug: params.category } }],
              },
            },
          }
        : {}),
    },
    include: {
      categories: true,
      files: true,
    },
    orderBy:
      params.sort === "popular"
        ? { viewCount: "desc" }
        : params.sort === "downloads"
          ? { downloadCount: "desc" }
          : { publishedAt: "desc" },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary ?? "",
    category: item.categories.map((c) => c.name).join(" / "),
    action: item.contentType === "COURSE" ? ("观看" as const) : ("下载" as const),
    date: item.publishedAt?.toISOString().slice(0, 10) ?? "",
    views: formatViews(item.viewCount),
    image: item.coverImage ?? "/placeholder.jpg",
    href: `/detail/${item.slug}`,
    meta: item.files[0]
      ? `${item.files[0].fileSize ?? ""} / ${item.files[0].provider ?? ""}`
      : item.contentType === "COURSE"
        ? "在线观看"
        : "",
    // 保留原始数据
    _raw: {
      slug: item.slug,
      contentType: item.contentType,
      downloadCount: item.downloadCount,
      files: item.files.map((f) => ({
        url: f.fileUrl,
        password: f.password ?? "",
        label: f.label,
        size: f.fileSize ?? "",
      })),
    },
  }));
}

// ── 获取分类树（从真实数据中聚合）──

export async function getCategoryTree(type: ContentType) {
  const categories = await prisma.category.findMany({
    where: { type },
    include: {
      _count: { select: { items: true } },
      children: {
        include: { _count: { select: { items: true } } },
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  const topLevel = categories.filter((c) => !c.parentId);

  return [
    { id: "all", name: "全部", slug: "all", count: categories.reduce((s, c) => s + c._count.items, 0) },
    ...topLevel.map((c) => ({
      id: c.slug,
      name: c.name,
      slug: c.slug,
      count: c._count.items,
      children: c.children.map((ch) => ({
        id: ch.slug,
        name: ch.name,
        slug: ch.slug,
        count: ch._count.items,
      })),
    })),
  ];
}

// ── 工具函数 ──

function formatViews(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}
