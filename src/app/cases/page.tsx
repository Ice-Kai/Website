import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Eye, Calendar, ChevronRight, Award, Building2, Palmtree, Home } from "lucide-react";

const cases = [
  {
    title: "深圳湾超级总部基地",
    category: "建筑设计",
    type: "公共建筑",
    date: "2026-04",
    views: "3.2K",
    summary: "超高层总部办公综合体方案设计，包含塔楼、商业裙房和地下空间整体规划。",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=82",
    tags: ["超高层", "参数化", "BIM全流程"],
  },
  {
    title: "成都麓湖生态城别墅",
    category: "室内设计",
    type: "住宅",
    date: "2026-03",
    views: "2.8K",
    summary: "湖畔别墅室内全案设计，现代简约风格融合东方美学元素。",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=82",
    tags: ["别墅", "现代简约", "东方美学"],
  },
  {
    title: "杭州西溪湿地文化中心",
    category: "景观设计",
    type: "文旅",
    date: "2026-03",
    views: "2.1K",
    summary: "湿地生态文化中心景观规划，融合自然水系与人文体验空间。",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=82",
    tags: ["湿地景观", "文旅", "生态建筑"],
  },
  {
    title: "上海前滩企业天地",
    category: "建筑设计",
    type: "办公",
    date: "2026-02",
    views: "1.9K",
    summary: "滨江企业总部园区规划，5栋独立办公楼+共享配套设施。",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=82",
    tags: ["办公园区", "滨江", "绿色建筑"],
  },
  {
    title: "北京胡同四合院改造",
    category: "室内设计",
    type: "改造",
    date: "2026-02",
    views: "3.5K",
    summary: "老胡同四合院现代改造，保留原有结构融入当代生活方式。",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=82",
    tags: ["四合院", "改造", "新中式"],
  },
  {
    title: "广州珠江新城商业广场",
    category: "景观设计",
    type: "商业",
    date: "2026-01",
    views: "2.4K",
    summary: "CBD核心区商业广场景观设计，含下沉广场和水景互动装置。",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=82",
    tags: ["商业景观", "CBD", "水景"],
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  "公共建筑": <Building2 className="h-4 w-4" />,
  "住宅": <Home className="h-4 w-4" />,
  "文旅": <Palmtree className="h-4 w-4" />,
  "办公": <Building2 className="h-4 w-4" />,
  "改造": <Award className="h-4 w-4" />,
  "商业": <Building2 className="h-4 w-4" />,
};

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-[min(1760px,calc(100vw-32px))] items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors shrink-0">
            <ArrowLeft className="h-4 w-4" />首页
          </Link>
          <span className="text-slate-300 shrink-0">/</span>
          <h1 className="text-base font-black text-slate-900">精品案例</h1>
        </div>
      </header>

      <div className="mx-auto w-[min(1760px,calc(100vw-32px))] py-10">
        <section className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200/50">
            <Award className="h-3.5 w-3.5" />
            精选作品
          </span>
          <h2 className="mt-5 text-3xl font-black text-slate-900">精品案例展示</h2>
          <p className="mt-4 text-base font-medium text-slate-500">建筑·室内·景观全领域设计作品集</p>
        </section>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <div className="relative aspect-[1.5/1] bg-slate-100 overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw,33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-xs font-black text-slate-900 shadow-sm">{item.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">{typeIcons[item.type]}{item.type}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Calendar className="h-3 w-3" />{item.date}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 line-clamp-1 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500 leading-relaxed line-clamp-2">{item.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Eye className="h-3.5 w-3.5" />{item.views}</span>
                  <Link href="#" className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 hover:gap-2 transition-all">查看详情<ChevronRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
