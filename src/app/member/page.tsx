import Link from "next/link";
import { ArrowLeft, Heart, Star, Download, BookmarkCheck, History, MessageCircle, Users, Gift, Coffee, ChevronRight } from "lucide-react";

const sponsorTiers = [
  {
    name: "精神支持",
    price: "0",
    period: "",
    color: "from-slate-500 to-slate-700",
    features: ["全站资源免费下载", "加入设计交流社群", "参与社区讨论", "获取更新通知"],
    cta: "开始使用",
    href: "/",
  },
  {
    name: "请杯咖啡",
    price: "19",
    period: "一次性",
    color: "from-cyan-500 to-blue-600",
    popular: true,
    features: ["精神支持全部权益", "赞助者专属徽章", "优先获取新资源通知", "列入赞助名单致谢", "参与资源需求投票", "加入核心内测群"],
    cta: "请杯咖啡",
    href: "/member/join",
  },
  {
    name: "大力支持",
    price: "99",
    period: "一次性",
    color: "from-amber-500 to-orange-600",
    features: ["请杯咖啡全部权益", "网站永久赞助者称号", "一对一资源协助", "定制模型优先排期", "企业/团队致谢展示", "所有新资源提前预览"],
    cta: "大力支持",
    href: "/member/vip",
  },
];

const perks = [
  { icon: Download, title: "永久免费", description: "全站 3,200+ 模型、180+ 教程全部免费下载" },
  { icon: BookmarkCheck, title: "我的收藏", description: "收藏常用模型和教程，打造个人资源库" },
  { icon: History, title: "浏览记录", description: "自动记录浏览历史，随时回溯学习路径" },
  { icon: MessageCircle, title: "在线客服", description: "工作日 9:00-18:00 在线客服支持" },
  { icon: Users, title: "设计社群", description: "加入设计交流 QQ 群和微信群" },
  { icon: Gift, title: "每日签到", description: "每日签到获取积分，兑换专属资源" },
];

export default function MemberPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-[min(1500px,calc(100vw-28px))] items-center gap-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors shrink-0">
            <ArrowLeft className="h-4 w-4" />首页
          </Link>
          <span className="text-slate-300 shrink-0">/</span>
          <h1 className="text-base font-black text-slate-900">赞助支持</h1>
        </div>
      </header>

      <div className="mx-auto w-[min(1500px,calc(100vw-28px))] py-10 space-y-16">
        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-bold text-rose-700 ring-1 ring-rose-200/50">
            <Heart className="h-3.5 w-3.5" fill="currentColor" />
            赞助支持
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-black text-slate-900">
            网站<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">永久免费</span>
          </h2>
          <p className="mt-4 text-base font-medium text-slate-500 max-w-2xl mx-auto">
            薛大大设计网是一个免费的设计资源平台。如果你觉得有用，可以赞助支持我们持续运营和内容更新。
          </p>
        </section>

        {/* 赞助档位 */}
        <section className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                tier.popular ? "border-cyan-300 ring-2 ring-cyan-200 scale-[1.02]" : "border-slate-200"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 text-[11px] font-black text-white shadow-lg">
                  推荐支持
                </span>
              )}
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                {tier.name === "精神支持" ? <Coffee className="h-5 w-5" /> : tier.name === "请杯咖啡" ? <Heart className="h-5 w-5 text-rose-500" fill="currentColor" /> : <Star className="h-5 w-5 text-amber-500" fill="currentColor" />}
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                {tier.price === "0" ? (
                  <span className="text-4xl font-black text-slate-900">免费</span>
                ) : (
                  <>
                    <span className="text-4xl font-black text-slate-900">¥{tier.price}</span>
                    <span className="text-sm font-semibold text-slate-400">/{tier.period}</span>
                  </>
                )}
              </div>
              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-slate-600">
                    <span className="text-emerald-500 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`mt-6 flex h-11 items-center justify-center gap-2 rounded-full text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-95 bg-gradient-to-r ${tier.color}`}
              >
                {tier.cta}
                {tier.price !== "0" && <ChevronRight className="h-4 w-4" />}
              </Link>
            </div>
          ))}
        </section>

        {/* 平台特色 */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">平台特色</h2>
            <p className="mt-2 text-sm font-medium text-slate-500">免费、开放、持续更新的设计资源平台</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-100 to-white text-cyan-600 ring-1 ring-cyan-200/50">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{perk.title}</h3>
                    <p className="mt-1 text-sm font-medium text-slate-500">{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 p-10 sm:p-14 text-center text-white">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="relative">
            <Heart className="h-10 w-10 mx-auto text-rose-400" fill="currentColor" />
            <h2 className="mt-4 text-2xl sm:text-3xl font-black">你的支持是我们持续更新的动力</h2>
            <p className="mt-4 max-w-xl mx-auto text-base font-medium text-slate-300">
              每一份赞助都将用于服务器维护、内容采购和平台开发。感谢你的支持！
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/member/join" className="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-6 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95">
                <Coffee className="h-4 w-4 mr-1.5" />
                请杯咖啡支持
              </Link>
              <Link href="/" className="inline-flex h-11 items-center rounded-full bg-white/10 backdrop-blur-md px-6 text-sm font-bold text-white ring-1 ring-inset ring-white/20 transition-all hover:bg-white/20">
                先看看资源
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
