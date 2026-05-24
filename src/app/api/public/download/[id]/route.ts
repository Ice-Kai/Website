import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/public/download/[id] - 返回公开资源链接并记录下载
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const file = await prisma.resourceFile.findUnique({
    where: { id },
    include: { contentItem: true },
  });

  if (!file || file.contentItem.status !== "PUBLISHED" || file.contentItem.visibility !== "PUBLIC") {
    return NextResponse.json({ error: "资源不存在" }, { status: 404 });
  }

  await prisma.contentItem.update({
    where: { id: file.contentItemId },
    data: { downloadCount: { increment: 1 } },
  });

  return NextResponse.json({
    success: true,
    fileUrl: file.fileUrl,
    password: file.password,
    provider: file.provider,
    label: file.label,
  });
}
