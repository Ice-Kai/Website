"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    const saved = window.localStorage.getItem("xuedda-theme") as ThemeMode | null;
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const updateTheme = (next: ThemeMode) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("xuedda-theme", next);
  };

  return (
    <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 sm:flex" title="配色模式">
      <button
        type="button"
        onClick={() => updateTheme("light")}
        className={`grid h-8 w-8 place-items-center rounded-full transition ${
          theme === "light" ? "bg-white text-amber-500 shadow-sm" : "text-slate-400 hover:text-slate-600"
        }`}
        aria-label="浅色模式"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => updateTheme("dark")}
        className={`grid h-8 w-8 place-items-center rounded-full transition ${
          theme === "dark" ? "bg-slate-900 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-slate-600"
        }`}
        aria-label="深色模式"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
