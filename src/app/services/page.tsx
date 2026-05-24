import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Clock, DollarSign, ChevronRight, MessageSquare } from "lucide-react";
import { serviceItems, jobListings } from "@/lib/site-data";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部条 */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-[min(1500px,calc(100vw-28px))] items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors shrink-0">
            <ArrowLeft className="h-4 w-4" />首页
          </Link>
          <span className="text-slate-300 shrink-0">/</span>
          <h1 className="text-base font-black text-slate-900">设计服务</h1>
        </div>
      </header>

      <div className="mx-auto w-[min(1500px,calc(100vw-28px))] py-10 space-y-16">
        {/* ── Hero 区域 ── */}
        <section className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5 text-xs font-bold text-violet-700 ring-1 ring-violet-200/50">
            <MessageSquare className="h-3.5 w-3.5" />
            薛大大设计服务
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            专业设计服务<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">一站式解决</span>
          </h2>
          <p className="mt-4 text-base font-medium text-slate-500 leading-relaxed max-w-2xl mx-auto">
            从设计咨询、项目合作到效果图渲染和企业培训，薛大大设计网为您提供全方位设计服务支持。
          </p>
        </section>

        {/* ── 服务卡片 ── */}
        <section>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-100/50 hover:border-violet-200"
              >
                <span className="text-3xl mb-4">{service.icon}</span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-violet-700 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-500 leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* 特性列表 */}
                <ul className="mt-4 space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 group-hover:gap-2 transition-all">
                    {service.cta}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 招聘信息 ── */}
        <section>
          <div className="mb-8 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-100 to-white text-violet-600 ring-1 ring-violet-200/50">
              <Briefcase className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-black text-slate-900">招聘信息</h2>
              <p className="text-sm font-medium text-slate-500">加入薛大大团队，一起做更好的设计</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobListings.map((job) => (
              <article
                key={job.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-violet-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-black text-slate-900">{job.title}</h3>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-black ${job.type.includes("全职") ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />{job.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />{job.department}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />{job.salary}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />{job.date}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-500 leading-relaxed">{job.description}</p>

                <Link
                  href={`/services/jobs`}
                  className="mt-4 inline-flex h-8 items-center rounded-full bg-slate-900 px-4 text-xs font-bold text-white transition-all hover:bg-violet-600 hover:shadow-md hover:shadow-violet-600/20 active:scale-95"
                >
                  查看详情
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA 区域 ── */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 p-10 sm:p-14 text-center text-white">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-black">有项目需求？找薛大大</h2>
            <p className="mt-4 max-w-xl mx-auto text-base font-medium text-slate-300 leading-relaxed">
              无论您是个人业主、设计公司还是开发企业，我们都能提供专业的设计解决方案。
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/services/consulting" className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-bold text-slate-900 shadow-lg transition-all hover:bg-violet-50 hover:shadow-xl active:scale-95">
                免费咨询
              </Link>
              <Link href="/contact" className="inline-flex h-11 items-center rounded-full bg-white/10 backdrop-blur-md px-6 text-sm font-bold text-white ring-1 ring-inset ring-white/20 transition-all hover:bg-white/20">
                联系我们
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
