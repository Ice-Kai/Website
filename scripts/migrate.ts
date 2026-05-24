/**
 * 从旧站 LzCMS 导出的 JSON 数据迁移到新站 Prisma 数据库
 *
 * 用法: npx tsx scripts/migrate.ts
 *
 * 旧站数据来源:
 *   1. 在旧站 MySQL 中执行 SELECT 导出 JSON
 *   2. 将文件放到 scripts/sample-data.json
 *
 * 百度网盘链接直接迁移，无需搬文件！
 */

import { PrismaClient, ContentType } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

// ── 旧站数据类型 ──

type OldItem = {
  id: number;
  title: string;
  summary: string;
  cover_image: string;
  category_name: string;
  parent_category: string | null;
  content_type: string;
  view_count: number;
  download_count: number;
  publish_time: string;
  files: {
    url: string;
    password: string;
    file_size: string;
    file_type: string;
  }[];
};

// ── 类型映射 ──

const typeMap: Record<string, ContentType> = {
  MODEL: "MODEL",
  COURSE: "COURSE",
  MATERIAL: "MATERIAL",
  SOFTWARE: "SOFTWARE",
  CASE_STUDY: "CASE_STUDY",
  NEWS: "NEWS",
  PAGE: "PAGE",
};

function slugify(text: string): string {
  return text
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

// ── 主迁移函数 ──

async function migrate() {
  console.log("🚀 开始数据迁移...\n");

  // 读取旧站数据
  const dataPath = process.argv[2] || "scripts/sample-data.json";
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ 文件不存在: ${dataPath}`);
    process.exit(1);
  }
  const oldItems: OldItem[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  console.log(`📦 读取到 ${oldItems.length} 条旧站数据\n`);

  // 统计
  let categoriesCreated = 0;
  let itemsCreated = 0;
  let filesCreated = 0;
  let errors = 0;

  for (const old of oldItems) {
    try {
      // ── 1. 创建或查找父分类 ──
      let parentCategoryId: string | null = null;
      if (old.parent_category) {
        const parentSlug = slugify(old.parent_category);
        let parent = await prisma.category.findUnique({ where: { slug: parentSlug } });
        if (!parent) {
          parent = await prisma.category.create({
            data: {
              name: old.parent_category,
              slug: parentSlug,
              type: typeMap[old.content_type] || "MODEL",
            },
          });
          categoriesCreated++;
          console.log(`  📁 新建分类: ${parent.name}`);
        }
        parentCategoryId = parent.id;
      }

      // ── 2. 创建或查找子分类 ──
      const catSlug = slugify(old.category_name);
      let category = await prisma.category.findUnique({ where: { slug: catSlug } });
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: old.category_name,
            slug: catSlug,
            type: typeMap[old.content_type] || "MODEL",
            parentId: parentCategoryId,
          },
        });
        categoriesCreated++;
        console.log(`  📁 新建分类: ${old.category_name}`);
      }

      // ── 3. 创建内容条目 ──
      const itemSlug = `old-${old.id}-${slugify(old.title)}`;
      const existing = await prisma.contentItem.findUnique({ where: { slug: itemSlug } });
      if (existing) {
        console.log(`  ⏭️  已存在: ${old.title}`);
        continue;
      }

      const contentItem = await prisma.contentItem.create({
        data: {
          title: old.title,
          slug: itemSlug,
          summary: old.summary,
          coverImage: old.cover_image,
          contentType: typeMap[old.content_type] || "MODEL",
          status: "PUBLISHED",
          visibility: "PUBLIC",
          viewCount: old.view_count,
          downloadCount: old.download_count,
          publishedAt: new Date(old.publish_time),
          categories: { connect: { id: category.id } },
        },
      });
      itemsCreated++;

      // ── 4. 创建资源文件（百度网盘链接）──
      for (const file of old.files) {
        await prisma.resourceFile.create({
          data: {
            label: `${old.title} - 下载文件`,
            fileUrl: file.url,
            password: file.password,
            fileSize: file.file_size,
            provider: "百度网盘",
            contentItemId: contentItem.id,
          },
        });
        filesCreated++;
      }

      const fileInfo = old.files.length > 0
        ? ` | 🔗 ${old.files.length} 个百度网盘链接`
        : "";
      console.log(`  ✅ ${old.title}${fileInfo}`);
    } catch (err) {
      errors++;
      console.error(`  ❌ 失败: ${old.title}`, err instanceof Error ? err.message : err);
    }
  }

  // ── 汇总 ──
  console.log(`\n${"─".repeat(50)}`);
  console.log(`📊 迁移汇总`);
  console.log(`${"─".repeat(50)}`);
  console.log(`  📁 新建分类:  ${categoriesCreated}`);
  console.log(`  📄 新建内容:  ${itemsCreated}`);
  console.log(`  🔗 百度网盘:  ${filesCreated} 个链接`);
  console.log(`  ⚠️  失败:     ${errors}`);
  console.log(`${"─".repeat(50)}`);
  console.log(`✅ 迁移完成！`);
}

migrate()
  .catch((e) => {
    console.error("❌ 迁移失败:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
