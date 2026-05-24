import { Heart, Star } from "lucide-react";

export function MemberSection() {
  return (
    <section id="member" className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#0f242e] to-[#061014] py-20 text-white">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="relative mx-auto grid w-[min(1500px,calc(100vw-28px))] gap-12 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-1 mb-6 ring-1 ring-cyan-400/30">
            <Heart className="h-3.5 w-3.5 text-cyan-300" fill="currentColor" />
            <span className="text-xs font-bold text-cyan-200 tracking-wide">赞助支持</span>
          </div>
          <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl text-white">
            网站<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">永久免费</span>，赞助让资源更丰富。
          </h2>
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-300">
            本站所有模型、教程、素材和软件永久免费下载。如果你愿意支持我们持续更新，可以成为赞助者。
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["永久免费", "全站资源无需付费即可下载"],
            ["我的收藏", "把常用模型和教程沉淀下来"],
            ["浏览记录", "继续上次学习和下载路径"],
            ["客服社群", "对接在线客服、QQ群和公众号"],
          ].map(([title, description]) => (
            <div 
              key={title} 
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/30"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent ring-1 ring-cyan-500/30">
                <Star className="h-5 w-5 text-cyan-300 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <p className="text-lg font-bold text-white">{title}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
