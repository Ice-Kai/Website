import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ResourceCard } from "@/components/shared/resource-card";
import { BackToTop } from "@/components/shared/back-to-top";
import type { ResourceItem } from "@/lib/site-data";

const videoItems: ResourceItem[] = [
  {
    title: "D5教程——2、工作流",
    summary: "D5 Render 完整工作流程教学，从模型导入到最终输出。",
    category: "视频教程 / D5教程", action: "观看", date: "2023-06-29", views: "533",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=82",
    href: "https://www.bilibili.com/video/BV1yh4y187RB/", meta: "D5",
  },
  {
    title: "教学素材——2、工作流",
    summary: "D5教学配套素材，跟随教程同步练习。",
    category: "视频教程 / 教程素材", action: "下载", date: "2023-06-29", views: "87",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=82",
    href: "/materials", meta: "D5素材",
  },
  {
    title: "D5教程——1、界面与设置",
    summary: "D5界面介绍与基础设置，新手入门必看。",
    category: "视频教程 / D5教程", action: "观看", date: "2023-06-24", views: "340",
    image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=800&q=82",
    href: "https://www.bilibili.com/video/BV1Sm4y1N79R/", meta: "D5",
  },
  {
    title: "教学素材——1、界面与设置",
    summary: "D5教程第一课配套练习素材。",
    category: "视频教程 / 教程素材", action: "下载", date: "2023-06-24", views: "90",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=82",
    href: "/materials", meta: "D5素材",
  },
  {
    title: "5、绘图命令2",
    summary: "Layout 施工图绘制命令详解第二部分。",
    category: "视频教程 / Layout教程", action: "观看", date: "2023-06-20", views: "114",
    image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=800&q=82",
    href: "https://www.bilibili.com/video/BV1ah4y157b9/", meta: "Layout",
  },
  {
    title: "4、绘图命令1",
    summary: "Layout 施工图绘制命令详解第一部分。",
    category: "视频教程 / Layout教程", action: "观看", date: "2023-06-20", views: "78",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=82",
    href: "https://www.bilibili.com/video/BV1rM4y1x7TS/", meta: "Layout",
  },
];

const subCategories = [
  { name: "全部", slug: "all" },
  { name: "D5教程", slug: "d5" },
  { name: "Layout教程", slug: "layout" },
  { name: "教程素材", slug: "material" },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-[min(1500px,calc(100vw-28px))] py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />首页
          </Link>
          <span className="text-slate-300">/</span>
          <h1 className="text-xl font-black text-slate-900">视频教程</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {subCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "all" ? "/videos" : `/videos?category=${cat.slug}`}
              className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-bold transition-all ${
                cat.slug === "all"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-cyan-300 hover:text-cyan-700"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videoItems.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
