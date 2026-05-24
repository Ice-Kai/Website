import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { categoryPayloadSchema, slugify, validationError } from "@/lib/content-validation";
import { NextRequest, NextResponse } from "next/server";

// PUT /api/admin/categories/[id]
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

  const parsed = categoryPayloadSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(validationError(parsed.error), { status: 400 });
  }

  const body = parsed.data;
  const category = await prisma.category.update({
    where: { id },
    data: {
      name: body.name,
      slug: slugify(body.slug || body.name),
      type: body.type,
      parentId: body.parentId,
      sortOrder: body.sortOrder,
      description: body.description,
    },
  });
  return NextResponse.json(category);
}

// DELETE /api/admin/categories/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAdmin(_req);
  if (auth) return auth;

  const { id } = await params;
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
