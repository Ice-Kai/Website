import Image from "next/image";
import Link from "next/link";
import { Eye, Download, PlayCircle } from "lucide-react";
import type { ResourceItem } from "@/lib/site-data";

export function ResourceCard({ item, large = false }: { item: ResourceItem; large?: boolean }) {
  const isExternal = item.href.startsWith("http");

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300">
      <Link href={item.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="block">
        <div className={`relative bg-slate-100 ${large ? "aspect-[1.45/1]" : "aspect-[1.25/1]"} overflow-hidden`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes={large ? "(max-width: 1024px) 100vw, 48vw" : "(max-width: 768px) 100vw, 25vw"}
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-black text-slate-900 shadow-sm ring-1 ring-black/5">
            {item.category}
          </span>
        </div>
      </Link>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-400 mb-3">
          <span>{item.date}</span>
          <span className="inline-flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
            <Eye className="h-3.5 w-3.5" />
            {item.views}
          </span>
        </div>
        <h3 className="mt-1 min-h-[3.5rem] text-lg font-black leading-tight text-slate-900 line-clamp-2 transition-colors group-hover:text-cyan-700">{item.title}</h3>
        <p className="mt-2 min-h-[3.5rem] text-sm font-medium leading-relaxed text-slate-500 line-clamp-2">{item.summary}</p>
        
        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-100/80">
          <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-inset ring-slate-200/50">{item.meta}</span>
          <Link
            href={item.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-bold text-white transition-all duration-200 hover:bg-cyan-600 hover:shadow-md hover:shadow-cyan-600/20 active:scale-95"
          >
            {item.action === "观看" ? <PlayCircle className="h-4 w-4" /> : <Download className="h-4 w-4" />}
            {item.action}
          </Link>
        </div>
      </div>
    </article>
  );
}
