import { quickEntries } from "@/lib/site-data";

export function QuickStats() {
  return (
    <section className="bg-slate-950 py-8 text-white">
      <div className="mx-auto grid w-[min(1760px,calc(100vw-32px))] gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {quickEntries.map((entry) => (
          <div 
            key={entry.label} 
            className="group relative overflow-hidden bg-slate-950 p-6 transition-all duration-300 hover:bg-slate-900"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">{entry.label}</p>
              <p className="mt-2 text-4xl font-black tracking-tight text-white">{entry.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-400">{entry.hint}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
