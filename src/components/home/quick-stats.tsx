import { quickEntries } from "@/lib/site-data";

export function QuickStats() {
  return (
    <section className="bg-slate-50/50 pb-12 pt-6">
      <div className="mx-auto grid w-[min(1500px,calc(100vw-28px))] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickEntries.map((entry) => (
          <div 
            key={entry.label} 
            className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-cyan-200/60"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-50 to-transparent opacity-50 transition-transform duration-500 group-hover:scale-150" />
            <div className="relative">
              <p className="text-sm font-bold text-cyan-600 tracking-wide">{entry.label}</p>
              <p className="mt-2 text-4xl font-black text-slate-900 tracking-tight">{entry.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{entry.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
