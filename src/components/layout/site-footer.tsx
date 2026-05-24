import Link from "next/link";
import { ShieldCheck, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/60 bg-slate-50 py-12">
      <div className="mx-auto flex w-[min(1500px,calc(100vw-28px))] flex-col gap-6 text-sm font-medium text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-slate-900 font-bold text-base mb-1">薛大大设计网 / 学与成设计网</p>
          <p>专注于建筑、景观、室内设计的资源与学习平台。</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/news" className="text-slate-500 transition-colors hover:text-cyan-600 font-semibold">薛大大新闻</Link>
          <Link href="/sitemap.xml" className="text-slate-500 transition-colors hover:text-cyan-600 font-semibold flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />网站地图
          </Link>
          <Link href="http://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-cyan-600 text-xs">
            苏ICP备17050823号
          </Link>
          <Link href="/admin" className="inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-cyan-600 font-semibold">
            后台管理
            <ShieldCheck className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-6 w-[min(1500px,calc(100vw-28px))] border-t border-slate-100 pt-4 text-center text-xs text-slate-400">
        <p>学与成设计网 © xuedda.com &nbsp;|&nbsp; Powered by Next.js</p>
      </div>
    </footer>
  );
}
