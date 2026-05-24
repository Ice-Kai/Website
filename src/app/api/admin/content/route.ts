import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import {
  contentPayloadSchema,
  contentTypes,
  parsePublishedAt,
  sanitizeContentHtml,
  slugify,
  validationError,
} from "@/lib/content-validation";
import { NextRequest, NextResponse } from "next/server";
import type { ContentType } from "@prisma/client";

function isContentType(value: string | null): value is ContentType {
  return contentTypes.includes(value as (typeof contentTypes)[number]);
}

// GET /api/admin/content
export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  const { searchParams } = new URL(req.url);
  const rawType = searchParams.get("type");
  const type = isContentType(rawType) ? rawType : null;
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = 20;

  const where = type ? { contentType: type } : {};
  const [items, total] = await Promise.all([
    prisma.contentItem.findMany({
      where,
      include: { categories: true, files: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.contentItem.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, totalPages: Math.ceil(total / limit) });
}

// POST /api/admin/content
export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体不是合法 JSON" }, { status: 400 });
  }

  const parsed = contentPayloadSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(validationError(parsed.error), { status: 400 });
  }

  const body = parsed.data;
  const baseSlug = slugify(body.slug || body.title) || "content";
  const slug = body.slug ? baseSlug : `${baseSlug}-${Date.now()}`;

  const item = await prisma.contentItem.create({
    data: {
      title: body.title,
      slug,
      summary: body.summary,
      content: sanitizeContentHtml(body.content),
      coverImage: body.coverImage,
      contentType: body.contentType,
      status: body.status,
      visibility: body.visibility,
      isFeatured: body.isFeatured,
      featuredOrder: body.featuredOrder,
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      publishedAt: parsePublishedAt(body.publishedAt),
      categories: body.categoryIds.length
        ? { connect: body.categoryIds.map((id: string) => ({ id })) }
        : undefined,
      files: body.files.length
        ? {
            create: body.files.map((f) => ({
              label: f.label,
              fileUrl: f.fileUrl,
              password: f.password,
              fileSize: f.fileSize,
              provider: f.provider,
            })),
          }
        : undefined,
    },
    include: { categories: true, files: true },
  });

  return NextResponse.json(item);
}
