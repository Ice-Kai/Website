"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { heroFeatures, heroSlides } from "@/lib/site-data";

const intervalMs = 5200;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white px-0 pt-3 pb-3">
      <div className="mx-auto w-[min(1500px,calc(100vw-28px))]">
        <div className="group relative min-h-[420px] overflow-hidden rounded-[24px] bg-slate-950 text-white shadow-[0_18px_55px_rgba(15,23,42,0.16)] ring-1 ring-slate-900/5 sm:min-h-[500px]">
          {heroSlides.map((slide, index) => (
            <Image
              key={slide.title}
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="(max-width: 1600px) 100vw, 1500px"
              className={`object-cover transition duration-1000 ease-out ${
                activeIndex === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.86)_0%,rgba(2,6,23,0.62)_38%,rgba(2,6,23,0.08)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.22),transparent_32%)]" />

          <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-7 sm:min-h-[500px] sm:p-12 lg:p-14">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-1.5 text-xs font-black text-slate-950 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                薛大大推荐
              </span>

              <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {activeSlide.title}
              </h1>
              <p className="mt-4 text-lg font-black tracking-wide text-cyan-200 sm:text-2xl">
                {activeSlide.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={activeSlide.href}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-cyan-400 pl-6 pr-5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                >
                  <Play className="h-4 w-4" fill="currentColor" />
                  立即查看
                </Link>
                <Link
                  href={activeSlide.href}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-white/12 pl-5 pr-4 text-sm font-bold text-white ring-1 ring-inset ring-white/25 backdrop-blur-md transition hover:bg-white/20"
                >
                  进入栏目
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                {heroFeatures.map((feature) => (
                  <span
                    key={feature.label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white/90 ring-1 ring-inset ring-white/15 backdrop-blur-sm"
                  >
                    <span>{feature.icon}</span>
                    {feature.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-slate-950/28 px-3 py-2 ring-1 ring-white/15 backdrop-blur-md">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index ? "w-8 bg-cyan-300" : "w-2.5 bg-white/55 hover:bg-white"
                }`}
                aria-label={`切换到${slide.title}`}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10" />
        </div>
      </div>
    </section>
  );
}
