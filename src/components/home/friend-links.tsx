import Link from "next/link";

const friendLinks = [
  { name: "韩世麟的建筑图像日志", href: "http://hanshilin.com/" },
  { name: "主题屋丨themes", href: "http://www.ztw8.cn" },
  { name: "智达云", href: "https://zhidayun.net/" },
];

export function FriendLinks() {
  return (
    <section className="border-t border-slate-200/60 bg-slate-50/80 py-10">
      <div className="mx-auto w-[min(1760px,calc(100vw-32px))]">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <span className="text-sm font-bold text-slate-400">友情链接</span>
          {friendLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-500 transition-colors hover:text-cyan-600"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
