import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import { requireAdmin } from "@/lib/admin-auth";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const allowedImageTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth) return auth;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "没有文件" }, { status: 400 });
    if (!allowedImageTypes[file.type]) {
      return NextResponse.json({ error: "只允许上传 jpg、png、webp、gif 图片" }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json({ error: "图片不能超过 5MB" }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${randomUUID()}${allowedImageTypes[file.type]}`;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;
    return NextResponse.json({ url, filename });
  } catch {
    return NextResponse.json({ error: "上传失败" }, { status: 500 });
  }
}
