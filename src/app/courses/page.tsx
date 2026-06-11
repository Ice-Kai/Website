import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Play, Clock, ChevronRight, Users, Star } from "lucide-react";

const courseTabs = [
  { id: "d5", label: "D5 渲染教程", count: 12 },
  { id: "layout", label: "Layout 施工图", count: 8 },
  { id: "sketchup", label: "SketchUp 进阶", count: 10 },
];

const allCourses = [
  // D5
  { tab: "d5", title: "D5 Render 界面与基础设置", category: "D5教程 / 入门", lessons: "8课时", students: "5.2K", rating: "4.9", date: "2026-04", image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=82", summary: "从安装配置到界面布局，系统掌握D5基本操作。" },
  { tab: "d5", title: "D5室内渲染全流程实战", category: "D5教程 / 室内", lessons: "12课时", students: "4.8K", rating: "4.8", date: "2026-04", image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=800&q=82", summary: "从模型导入到最终出图，完整室内场景渲染流程。" },
  { tab: "d5", title: "D5建筑外观表现技法", category: "D5教程 / 建筑", lessons: "10课时", students: "4.1K", rating: "4.9", date: "2026-03", image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=800&q=82", summary: "建筑日景/夜景/阴天多场景渲染全流程教学。" },
  { tab: "d5", title: "D5景观与园林渲染", category: "D5教程 / 景观", lessons: "8课时", students: "3.5K", rating: "4.7", date: "2026-03", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=82", summary: "植物配置、水景、地形全流程景观渲染。" },
  { tab: "d5", title: "D5动画与漫游制作", category: "D5教程 / 动画", lessons: "6课时", students: "2.8K", rating: "4.8", date: "2026-02", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=82", summary: "镜头动画、路径漫游和剪辑输出全流程。" },
  // Layout
  { tab: "layout", title: "Layout 基础入门", category: "Layout教程", lessons: "6课时", students: "3.2K", rating: "4.7", date: "2026-03", image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=82", summary: "从SU模型到施工图纸的Layout全流程入门。" },
  { tab: "layout", title: "Layout 施工图深化", category: "Layout教程", lessons: "10课时", students: "2.6K", rating: "4.8", date: "2026-02", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=82", summary: "平面/立面/剖面/大样图全套施工图绘制。" },
  { tab: "layout", title: "Layout 图纸排版输出", category: "Layout教程", lessons: "5课时", students: "1.9K", rating: "4.6", date: "2026-01", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=82", summary: "图纸排版、批量和PDF输出技巧。" },
  // SketchUp
  { tab: "sketchup", title: "SU 高级建模技巧", category: "SketchUp进阶", lessons: "10课时", students: "4.5K", rating: "4.9", date: "2026-04", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=82", summary: "组件/群组/剖面/沙盒等高级建模技法。" },
  { tab: "sketchup", title: "SU 插件高效工作流", category: "SketchUp进阶", lessons: "8课时", students: "3.8K", rating: "4.8", date: "2026-03", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=82", summary: "常用插件组合使用，提升建模效率5倍。" },
];

export default async function CoursesPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const params = await searchParams;
  const activeTab = params.tab || "d5";
  const filtered = allCourses.filter((c) => c.tab === activeTab);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-[min(1760px,calc(100vw-32px))] items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors shrink-0">
            <ArrowLeft className="h-4 w-4" />首页
          </Link>
          <span className="text-slate-300 shrink-0">/</span>
          <h1 className="text-base font-black text-slate-900">教程中心</h1>
        </div>
      </header>

      <div className="mx-auto w-[min(1760px,calc(100vw-32px))] py-10">
        <section className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1.5 text-xs font-bold text-cyan-700 ring-1 ring-cyan-200/50">
            <Play className="h-3.5 w-3.5" fill="currentColor" />
            系统学习
          </span>
          <h2 className="mt-5 text-3xl font-black text-slate-900">薛大大教程中心</h2>
          <p className="mt-4 text-base font-medium text-slate-500">从入门到精通，系统化掌握设计软件全技能</p>
        </section>

        {/* Tab 切换 */}
        <div className="flex items-center gap-1.5 mb-8 overflow-x-auto scrollbar-hide">
          {courseTabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/courses?tab=${tab.id}`}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-70">({tab.count})</span>
            </Link>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((course) => (
            <article key={course.title} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <div className="relative aspect-[1.4/1] bg-slate-100 overflow-hidden">
                <Image src={course.image} alt={course.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw,25vw" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-slate-900 shadow-xl"><Play className="h-6 w-6" fill="currentColor" /></span>
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-black text-slate-800">{course.category}</span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-black text-slate-900 line-clamp-2 group-hover:text-cyan-700 transition-colors">{course.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500 line-clamp-2">{course.summary}</p>
                <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-slate-400">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{course.lessons}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{course.students}</span>
                  <span className="inline-flex items-center gap-1 ml-auto text-amber-500"><Star className="h-3 w-3" fill="currentColor" />{course.rating}</span>
                </div>
                <Link href="#" className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-full bg-slate-900 text-xs font-bold text-white transition-all hover:bg-cyan-600 hover:shadow-md active:scale-95">
                  开始学习<ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
