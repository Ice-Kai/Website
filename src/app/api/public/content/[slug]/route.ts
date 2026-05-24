import { prisma } from "@/lib/prisma";
import { sanitizeContentHtml } from "@/lib/content-validation";
import { NextRequest, NextResponse } from "next/server";

// GET /api/public/content/[slug] - 公开内容详情
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const item = await prisma.contentItem.findUnique({
    where: { slug },
    include: {
      categories: true,
      tags: true,
      files: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!item || item.status !== "PUBLISHED" || item.visibility !== "PUBLIC") {
    return NextResponse.json({ error: "内容不存在" }, { status: 404 });
  }

  // 增加浏览量
  await prisma.contentItem.update({
    where: { id: item.id },
    data: { viewCount: { increment: 1 } },
  });

  return NextResponse.json({
    id: item.id,
    title: item.title,
    slug: item.slug,
    summary: item.summary,
    content: item.content ? sanitizeContentHtml(item.content) : item.content,
    coverImage: item.coverImage,
    contentType: item.contentType,
    viewCount: item.viewCount + 1,
    downloadCount: item.downloadCount,
    publishedAt: item.publishedAt,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    categories: item.categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
    tags: item.tags.map((t) => ({ name: t.name, slug: t.slug })),
    files: item.files.map((f) => ({
      id: f.id,
      label: f.label,
      fileSize: f.fileSize,
      provider: f.provider,
      hasPassword: Boolean(f.password),
    })),
  });
}
