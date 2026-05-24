import { prisma } from "@/lib/prisma";
import { contentTypes } from "@/lib/content-validation";
import { NextRequest, NextResponse } from "next/server";
import type { ContentType, Prisma } from "@prisma/client";

function isContentType(value: string | null): value is ContentType {
  return contentTypes.includes(value as (typeof contentTypes)[number]);
}

// GET /api/public/content - 公开内容列表
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawType = searchParams.get("type");
  const type = isContentType(rawType) ? rawType : null;
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "newest";
  const q = searchParams.get("q")?.trim();
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(Math.max(1, Number.parseInt(searchParams.get("limit") || "24", 10) || 24), 50);

  const types = type ? [type] : undefined;

  const where: Prisma.ContentItemWhereInput = {
    status: "PUBLISHED",
    visibility: "PUBLIC",
  };
  if (types) where.contentType = { in: types };
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { summary: { contains: q } },
    ];
  }
  if (category) {
    where.categories = {
      some: {
        OR: [{ slug: category }, { parent: { slug: category } }],
      },
    };
  }

  const orderBy: Prisma.ContentItemOrderByWithRelationInput =
    sort === "popular" ? { viewCount: "desc" }
    : sort === "downloads" ? { downloadCount: "desc" }
    : { publishedAt: "desc" };

  const [items, total] = await Promise.all([
    prisma.contentItem.findMany({
      where,
      include: { categories: true, tags: true, _count: { select: { files: true } } },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.contentItem.count({ where }),
  ]);

  return NextResponse.json({
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      coverImage: item.coverImage,
      contentType: item.contentType,
      categories: item.categories.map((c) => ({ name: c.name, slug: c.slug })),
      tags: item.tags.map((t) => ({ name: t.name, slug: t.slug })),
      viewCount: item.viewCount,
      downloadCount: item.downloadCount,
      publishedAt: item.publishedAt,
      fileCount: item._count.files,
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
