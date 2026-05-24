import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm" aria-label="面包屑导航">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-300 shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="font-semibold text-slate-500 transition-colors hover:text-cyan-600"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-bold text-slate-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
