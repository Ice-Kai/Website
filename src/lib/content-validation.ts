import sanitizeHtml from "sanitize-html";
import { z } from "zod";

export const contentTypes = [
  "NEWS",
  "MODEL",
  "COURSE",
  "MATERIAL",
  "SOFTWARE",
  "CASE_STUDY",
  "PAGE",
] as const;

export const contentStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export const visibilityLevels = ["PUBLIC", "MEMBER", "VIP"] as const;

const safeUrlSchema = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    if (value.startsWith("/uploads/")) return true;

    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }, "URL 必须是 http(s) 或 /uploads/ 路径");

const resourceFileSchema = z.object({
  label: z.string().trim().min(1).max(100),
  fileUrl: safeUrlSchema.refine((value) => value.length > 0, "文件链接不能为空"),
  password: z.string().trim().max(32).optional().default(""),
  fileSize: z.string().trim().max(40).optional().default(""),
  provider: z.string().trim().max(40).optional().default("百度网盘"),
});

export const contentPayloadSchema = z.object({
  title: z.string().trim().min(1, "标题不能为空").max(160),
  slug: z.string().trim().max(180).optional().default(""),
  summary: z.string().trim().max(500).optional().default(""),
  content: z.string().max(500_000).optional().default(""),
  coverImage: safeUrlSchema.optional().default(""),
  contentType: z.enum(contentTypes),
  status: z.enum(contentStatuses).optional().default("PUBLISHED"),
  visibility: z.enum(visibilityLevels).optional().default("PUBLIC"),
  isFeatured: z.boolean().optional().default(false),
  featuredOrder: z.coerce.number().int().min(0).max(9999).optional().default(0),
  seoTitle: z.string().trim().max(160).optional().default(""),
  seoDescription: z.string().trim().max(300).optional().default(""),
  publishedAt: z.string().trim().max(40).optional().default(""),
  categoryIds: z.array(z.string().trim().min(1)).max(20).optional().default([]),
  files: z.array(resourceFileSchema).max(20).optional().default([]),
});

export const categoryPayloadSchema = z.object({
  name: z.string().trim().min(1, "分类名称不能为空").max(80),
  slug: z.string().trim().max(120).optional().default(""),
  type: z.enum(contentTypes).optional().default("MODEL"),
  parentId: z.string().trim().min(1).nullable().optional().default(null),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional().default(0),
  description: z.string().trim().max(300).optional().default(""),
});

export type ContentPayload = z.infer<typeof contentPayloadSchema>;
export type CategoryPayload = z.infer<typeof categoryPayloadSchema>;

export function slugify(input: string) {
  return input
    .trim()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function parsePublishedAt(value: string) {
  if (!value) return new Date();

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export function sanitizeContentHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "figure",
      "figcaption",
    ]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
      img: sanitizeHtml.simpleTransform("img", {
        loading: "lazy",
      }),
    },
  });
}

export function validationError(error: z.ZodError) {
  return {
    error: "请求参数无效",
    issues: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
}
