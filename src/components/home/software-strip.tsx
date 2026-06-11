import Image from "next/image";
import Link from "next/link";

const softwareItems = [
  {
    label: "SU模型",
    href: "/models",
    iconUrl: "https://cdn.simpleicons.org/sketchup/2563EB",
    fallback: "SU",
    tone: "from-blue-50 to-white",
  },
  {
    label: "D5教程",
    href: "/courses",
    fallback: "D5",
    tone: "from-violet-50 to-white",
  },
  {
    label: "Enscape",
    href: "/software?category=enscape",
    fallback: "E",
    tone: "from-orange-50 to-white",
  },
  {
    label: "Lumion",
    href: "/software?category=lumion",
    fallback: "L",
    tone: "from-cyan-50 to-white",
  },
  {
    label: "Photoshop",
    href: "/software?category=photoshop",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    fallback: "Ps",
    tone: "from-sky-50 to-white",
  },
  {
    label: "V-Ray",
    href: "/software?category=vray",
    fallback: "V",
    tone: "from-slate-100 to-white",
  },
  {
    label: "Rhino",
    href: "/software?category=rhino-sw",
    iconUrl: "https://cdn.simpleicons.org/rhinoceros/111827",
    fallback: "R",
    tone: "from-zinc-100 to-white",
  },
  {
    label: "C4D",
    href: "/software?category=c4d-sw",
    iconUrl: "https://cdn.simpleicons.org/cinema4d/1F4ACF",
    fallback: "4D",
    tone: "from-indigo-50 to-white",
  },
  {
    label: "Navisworks",
    href: "/software?category=utility",
    iconUrl: "https://cdn.simpleicons.org/autodesk/00A6A6",
    fallback: "N",
    tone: "from-teal-50 to-white",
  },
  {
    label: "CAD",
    href: "/software?category=cad",
    iconUrl: "https://cdn.simpleicons.org/autocad/D93434",
    fallback: "A",
    tone: "from-red-50 to-white",
  },
];

function BrandMark({ item }: { item: (typeof softwareItems)[number] }) {
  return (
    <span
      className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${item.tone} shadow-[0_8px_20px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.05] transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_28px_rgba(15,23,42,0.13)]`}
    >
      {item.iconUrl ? (
        <Image
          src={item.iconUrl}
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
          unoptimized
        />
      ) : (
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-[12px] font-black text-white">
          {item.fallback}
        </span>
      )}
    </span>
  );
}

export function SoftwareStrip() {
  return (
    <>
      <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <div className="rounded-[24px] border border-slate-200/80 bg-white/88 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.13)] backdrop-blur-xl">
          <p className="mb-2 px-1 text-center text-[11px] font-black tracking-wide text-slate-400">快捷</p>
          {softwareItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className="group relative flex h-[58px] w-[58px] items-center justify-center rounded-2xl transition hover:bg-slate-50"
            >
              <BrandMark item={item} />
              <span className="pointer-events-none absolute right-[68px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-slate-950 px-3 py-1.5 text-xs font-black text-white opacity-0 shadow-lg transition group-hover:block group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </aside>

      <section className="bg-white py-2 xl:hidden">
        <div className="mx-auto w-[min(1680px,calc(100vw-20px))]">
          <div className="flex snap-x items-center gap-4 overflow-x-auto px-1 py-1 scrollbar-hide">
            {softwareItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex min-w-[82px] snap-start flex-col items-center gap-1.5 text-center"
              >
                <BrandMark item={item} />
                <span className="text-[12px] font-bold leading-tight text-slate-700 transition-colors group-hover:text-slate-950">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
