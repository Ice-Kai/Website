import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import {
  contentPayloadSchema,
  parsePublishedAt,
  sanitizeContentHtml,
  validationError,
} from "@/lib/content-validation";
import { NextRequest, NextResponse } from "next/server";

// PUT /api/admin/content/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  const { id } = await params;
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

  const item = await prisma.$transaction(async (tx) => {
    await tx.resourceFile.deleteMany({ where: { contentItemId: id } });

    return tx.contentItem.update({
      where: { id },
      data: {
        title: body.title,
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
        categories: { set: [], connect: body.categoryIds.map((cid) => ({ id: cid })) },
        files: {
          create: body.files.map((f) => ({
            label: f.label,
            fileUrl: f.fileUrl,
            password: f.password,
            fileSize: f.fileSize,
            provider: f.provider,
          })),
        },
      },
      include: { categories: true, files: true },
    });
  });

  return NextResponse.json(item);
}

// DELETE /api/admin/content/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAdmin(_req);
  if (auth) return auth;

  const { id } = await params;
  await prisma.contentItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
