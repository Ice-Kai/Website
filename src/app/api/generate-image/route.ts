import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const maxDuration = 240;

const requestSchema = z.object({
  prompt: z.string().trim().min(2, "请输入更完整的提示词").max(2000, "提示词过长"),
  size: z.string().trim().max(32).optional(),
  model: z.string().trim().max(100).optional(),
  quality: z.string().trim().max(32).optional(),
  style: z.string().trim().max(64).optional(),
  sourceImage: z.string().startsWith("data:image/").max(6_000_000).nullish(),
});

function getImageUrls(data: unknown): { imageUrl: string | null; downloadUrl: string | null } {
  return {
    imageUrl: getImageUrl(data),
    downloadUrl: getDownloadUrl(data),
  };
}

function getImageUrl(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;

  const value = data as Record<string, unknown>;
  const candidates = [
    value.url,
    value.image,
    value.image_url,
    value.output_url,
    value.result,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate) return candidate;
  }

  const dataArray = value.data;
  if (Array.isArray(dataArray)) {
    for (const item of dataArray) {
      if (!item || typeof item !== "object") continue;
      const image = item as Record<string, unknown>;
      if (typeof image.url === "string" && image.url) return image.url;
      if (typeof image.b64_json === "string" && image.b64_json) {
        return `data:image/png;base64,${image.b64_json}`;
      }
    }
  }

  if (typeof value.b64_json === "string" && value.b64_json) {
    return `data:image/png;base64,${value.b64_json}`;
  }

  const choices = value.choices;
  if (Array.isArray(choices)) {
    for (const choice of choices) {
      if (!choice || typeof choice !== "object") continue;
      const message = (choice as Record<string, unknown>).message;
      if (!message || typeof message !== "object") continue;

      const content = (message as Record<string, unknown>).content;
      const parsed = getImageUrlFromMessageContent(content);
      if (parsed) return parsed;
    }
  }

  return findImageInUnknown(data);
}

function findImageInUnknown(input: unknown, seen = new Set<unknown>()): string | null {
  if (!input) return null;

  if (typeof input === "string") {
    const markdownImage = input.match(/!\[[^\]]*]\((https?:\/\/[^)\s"'<>]+)\)/i)?.[1];
    if (markdownImage) return markdownImage;

    const dataUri = input.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/)?.[0];
    if (dataUri) return dataUri;

    const imageUrl = input.match(/https?:\/\/[^\s"'<>)\]]+\.(?:png|jpe?g|webp|gif)(?:\?[^\s"'<>)\]]*)?/i)?.[0];
    if (imageUrl) return imageUrl;

    const anyUrl = input.match(/https?:\/\/[^\s"'<>)\]]+/i)?.[0];
    if (anyUrl) return anyUrl;

    if (/^[A-Za-z0-9+/=\s]{1000,}$/.test(input)) {
      return `data:image/png;base64,${input.replace(/\s/g, "")}`;
    }

    try {
      return findImageInUnknown(JSON.parse(input), seen);
    } catch {
      return null;
    }
  }

  if (typeof input !== "object") return null;
  if (seen.has(input)) return null;
  seen.add(input);

  if (Array.isArray(input)) {
    for (const item of input) {
      const found = findImageInUnknown(item, seen);
      if (found) return found;
    }
    return null;
  }

  const object = input as Record<string, unknown>;
  const preferredKeys = [
    "url",
    "image_url",
    "imageUrl",
    "image",
    "images",
    "b64_json",
    "base64",
    "data",
    "content",
    "attachments",
    "files",
    "output",
    "result",
  ];

  for (const key of preferredKeys) {
    const found = findImageInUnknown(object[key], seen);
    if (found) return found;
  }

  for (const value of Object.values(object)) {
    const found = findImageInUnknown(value, seen);
    if (found) return found;
  }

  return null;
}

function getDownloadUrl(data: unknown): string | null {
  if (!data) return null;

  const text = typeof data === "string" ? data : JSON.stringify(data);
  const markdownDownload = text.match(/\[[^\]]*(?:下载|download)[^\]]*]\((https?:\/\/[^)\s"'<>]+)\)/i)?.[1];
  if (markdownDownload) return markdownDownload;

  const downloadUrl = text.match(/https?:\/\/[^\s"'<>)\]]*(?:download|dloss|\/dl\/)[^\s"'<>)\]]*/i)?.[0];
  return downloadUrl ?? null;
}

function getImageUrlFromMessageContent(content: unknown): string | null {
  if (typeof content === "string") {
    const directUrl = content.match(/https?:\/\/[^\s"'<>]+/i)?.[0];
    if (directUrl) return directUrl;

    const base64 = content.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/)?.[0];
    if (base64) return base64;

    try {
      return getImageUrl(JSON.parse(content));
    } catch {
      return null;
    }
  }

  if (Array.isArray(content)) {
    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const value = part as Record<string, unknown>;
      if (typeof value.image_url === "string" && value.image_url) return value.image_url;
      if (value.image_url && typeof value.image_url === "object") {
        const url = (value.image_url as Record<string, unknown>).url;
        if (typeof url === "string" && url) return url;
      }
      if (typeof value.url === "string" && value.url) return value.url;
      if (typeof value.b64_json === "string" && value.b64_json) {
        return `data:image/png;base64,${value.b64_json}`;
      }
    }
  }

  return null;
}

function buildUpstreamBody(input: z.infer<typeof requestSchema>, endpoint: string) {
  const model = input.model || process.env.IMAGE_PROXY_MODEL || "gpt-image-2";
  const size = input.size ?? "1024x1024";

  if (endpoint.includes("/chat/completions")) {
    const content = input.sourceImage
      ? [
          { type: "text", text: `${input.prompt}\n请根据上传图片进行修改，重点参考图片中的涂抹、画圈和文字标注。` },
          { type: "image_url", image_url: { url: input.sourceImage } },
        ]
      : input.prompt;

    return {
      model,
      messages: [
        {
          role: "user",
          content,
        },
      ],
      size,
      quality: input.quality || undefined,
      style: input.style || undefined,
    };
  }

  return {
    prompt: input.prompt,
    image: input.sourceImage || undefined,
    size,
    model,
    quality: input.quality || undefined,
    style: input.style || undefined,
  };
}

function getErrorMessage(data: unknown) {
  if (!data || typeof data !== "object") return "生图服务请求失败";
  const value = data as Record<string, unknown>;
  const error = value.error;
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const message = (error as Record<string, unknown>).message;
    if (typeof message === "string") return message;
  }
  if (typeof value.message === "string") return value.message;
  return "生图服务请求失败";
}

export async function POST(req: NextRequest) {
  const parsed = requestSchema.safeParse(await req.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "请求参数不正确" },
      { status: 400 },
    );
  }

  const baseUrl = process.env.IMAGE_PROXY_BASE_URL;
  const apiKey = process.env.IMAGE_PROXY_API_KEY;
  const endpoint = process.env.IMAGE_PROXY_IMAGE_ENDPOINT ?? "/v1/chat/completions";

  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      { error: "服务端还没有配置生图密钥" },
      { status: 500 },
    );
  }

  const upstreamUrl = new URL(endpoint, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 220_000);

  let upstream: Response;
  try {
    console.info("generate-image upstream request", {
      endpoint,
      model: parsed.data.model || process.env.IMAGE_PROXY_MODEL || "gpt-image-2",
      size: parsed.data.size ?? "1024x1024",
    });

    upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify(buildUpstreamBody(parsed.data, endpoint)),
    });
  } catch (error) {
    console.error("generate-image upstream connection failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { error: error instanceof DOMException && error.name === "AbortError" ? "生图服务响应超时" : "无法连接生图服务" },
      { status: 504 },
    );
  } finally {
    clearTimeout(timeout);
  }

  const responseText = await upstream.text().catch(() => "");
  const data = responseText
    ? (() => {
        try {
          return JSON.parse(responseText);
        } catch {
          return { message: responseText };
        }
      })()
    : null;

  console.info("generate-image upstream response", {
    status: upstream.status,
    ok: upstream.ok,
    contentType: upstream.headers.get("content-type"),
    responseLength: responseText.length,
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: getErrorMessage(data), upstream: data },
      { status: upstream.status },
    );
  }

  const { imageUrl, downloadUrl } = getImageUrls(data);

  if (!imageUrl) {
    return NextResponse.json(
      { error: "生图成功，但没有在响应里找到图片地址", upstream: data },
      { status: 502 },
    );
  }

  return NextResponse.json({
    imageUrl,
    previewUrl: imageUrl,
    proxyPreviewUrl: `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`,
    downloadUrl: downloadUrl ?? imageUrl,
    upstream: data,
  });
}
