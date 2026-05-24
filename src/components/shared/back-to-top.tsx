"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all hover:bg-cyan-600 hover:shadow-xl hover:scale-110 active:scale-95"
      aria-label="返回顶部"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
