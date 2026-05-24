import Link from "next/link";
import { ChevronRight, FolderOpen, LayoutGrid, BookOpen, FileArchive, Wrench } from "lucide-react";
import { sections } from "@/lib/site-data";
import { ResourceCard } from "@/components/shared/resource-card";

const sectionIcons = {
  models: LayoutGrid,
  courses: BookOpen,
  materials: FileArchive,
  software: Wrench,
};

export function ResourceSection({ sectionIndex }: { sectionIndex: number }) {
  const section = sections[sectionIndex];
  const Icon = sectionIcons[section.id as keyof typeof sectionIcons] ?? FolderOpen;
  const [lead, ...rest] = section.items;

  return (
    <section id={section.id} className="scroll-mt-24 py-16">
      <div className="mx-auto w-[min(1500px,calc(100vw-28px))]">
        <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex items-start gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-100 to-white text-cyan-700 shadow-sm ring-1 ring-cyan-200/50">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-cyan-600 tracking-wide mb-1">{section.eyebrow}</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{section.title}</h2>
              <p className="mt-2.5 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">{section.description}</p>
            </div>
          </div>
          <Link
            href={section.href}
            target="_blank"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-white pl-4 pr-3 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200/60 transition-all hover:bg-slate-50 hover:text-cyan-700 hover:shadow"
          >
            查看更多
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)]">
          <div className="xl:h-full">
            <ResourceCard item={lead} large />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((item) => (
              <ResourceCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
