import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { categoryPayloadSchema, slugify, validationError } from "@/lib/content-validation";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/categories
export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  const categories = await prisma.category.findMany({
    include: { _count: { select: { items: true } }, parent: true, children: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

// POST /api/admin/categories
export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth) return auth;

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
  const category = await prisma.category.create({
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
