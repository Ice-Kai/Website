import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Eye, Download, Calendar, Tag, Lock } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { BackToTop } from "@/components/shared/back-to-top";
import { DownloadButton } from "@/components/shared/download-button";

async function getContent(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/public/content/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

const typeLabels: Record<string, string> = {
  NEWS: "新闻",
  MODEL: "模型",
  COURSE: "教程",
  MATERIAL: "素材",
  SOFTWARE: "软件",
  CASE_STUDY: "案例",
  PAGE: "页面",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent(slug);
  if (!content) return { title: "内容不存在" };
  return {
    title: `${content.title} - 薛大大设计网`,
    description: content.summary || content.seoDescription || "",
  };
}

export default async function ContentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getContent(slug);

  // 如果没有数据库数据，显示简洁占位页
  if (!content) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <SiteHeader />
        <main className="mx-auto w-[min(1000px,calc(100vw-28px))] py-16 text-center">
          <h1 className="text-2xl font-black text-slate-900 mb-3">内容加载中...</h1>
          <p className="text-slate-500 font-medium mb-2">当前内容尚未录入数据库，请先通过后台添加内容。</p>
          <p className="text-sm text-slate-400 mb-6">Slug: {slug}</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/admin/content/new" className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 text-sm font-bold text-white shadow-sm hover:shadow-md active:scale-95">
              前往后台添加
            </Link>
            <Link href="/" className="inline-flex h-10 items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 hover:border-cyan-300 hover:text-cyan-700">
              返回首页
            </Link>
          </div>
        </main>
        <SiteFooter />
        <BackToTop />
      </div>
    );
  }

  const typeHref = (() => {
    switch (content.contentType) {
      case "MODEL": return "/models";
      case "COURSE": return "/courses";
      case "MATERIAL": return "/materials";
      case "SOFTWARE": return "/software";
      case "NEWS": return "/news";
      case "CASE_STUDY": return "/cases";
      default: return "/";
    }
  })();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1000px,calc(100vw-28px))] py-8">
        {/* 面包屑 */}
        <Breadcrumb
          items={[
            { label: "首页", href: "/" },
            { label: typeLabels[content.contentType] || "内容", href: typeHref },
            { label: content.title },
          ]}
        />

        <article className="mt-6">
          {/* 标题区 */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {content.title}
          </h1>

          {/* 元信息 */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {content.publishedAt?.slice(0, 10)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {content.viewCount} ℃
            </span>
            {content.downloadCount > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Download className="h-4 w-4" />
                {content.downloadCount} 次下载
              </span>
            )}
            {content.categories?.map((c: { name: string; slug: string }) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
              >
                <Tag className="h-3 w-3" />
                {c.name}
              </Link>
            ))}
          </div>

          {/* 封面 */}
          {content.coverImage && (
            <div className="mt-6 overflow-hidden rounded-2xl bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.coverImage}
                alt={content.title}
                className="w-full max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* 正文 */}
          {content.content && (
            <div
              className="mt-8 prose prose-slate max-w-none prose-headings:font-black prose-a:text-cyan-600 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          )}

          {/* 摘要 */}
          {content.summary && !content.content && (
            <p className="mt-8 text-lg leading-relaxed text-slate-600 font-medium">
              {content.summary}
            </p>
          )}

          {/* 下载区 */}
          {content.files?.length > 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-cyan-600" />
                下载资源
              </h3>
              <div className="space-y-3">
                {content.files.map((f: { id: string; label: string; hasPassword?: boolean; fileSize?: string; provider?: string }, i: number) => (
                  <div
                    key={f.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900">{f.label || `文件 ${i + 1}`}</p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {f.provider || "百度网盘"}
                        {f.fileSize ? ` · ${f.fileSize}` : ""}
                      </p>
                      {f.hasPassword && (
                        <p className="text-sm text-amber-600 font-semibold mt-1 flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          提取码将在打开下载时显示
                        </p>
                      )}
                    </div>
                    <DownloadButton fileId={f.id} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 返回 */}
          <div className="mt-10 pt-6 border-t border-slate-100">
            <Link
              href={typeHref}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回{typeLabels[content.contentType] || "列表"}
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
