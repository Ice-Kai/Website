import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();

async function show() {
  const items = await p.contentItem.findMany({
    include: { categories: true, files: true },
  });
  const result = items.map((i) => ({
    标题: i.title,
    类型: i.contentType,
    浏览: i.viewCount,
    分类: i.categories[0]?.name ?? "-",
    文件数: i.files.length,
    网盘链接: i.files.map((f) => `${f.fileUrl} (提取码:${f.password || "无"})`),
  }));
  console.log(JSON.stringify(result, null, 2));
  console.log(`\n总计: ${items.length} 条内容`);
  await p.$disconnect();
}
show();
