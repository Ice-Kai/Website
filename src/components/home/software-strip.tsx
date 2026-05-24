import Link from "next/link";

const softwareItems = [
  { label: "SU模型", href: "/models" },
  { label: "D5教程", href: "/courses" },
  { label: "Enscape", href: "/software?category=enscape" },
  { label: "Lumion", href: "/software?category=lumion" },
  { label: "Photoshop", href: "/software?category=photoshop" },
  { label: "V-Ray", href: "/software?category=vray" },
  { label: "Rhino", href: "/software?category=rhino-sw" },
  { label: "C4D", href: "/software?category=c4d-sw" },
  { label: "Navisworks", href: "/software?category=utility" },
  { label: "CAD", href: "/software?category=cad" },
];

function BrandIcon({ name }: { name: string }) {
  switch (name) {
    case "SU模型":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <path d="M24 5 38 13.1v17.8L24 39 10 30.9V13.1L24 5Z" fill="#2563EB" />
          <path d="M24 11.5 32.4 16.4v9.7L24 31l-8.4-4.9v-9.7L24 11.5Z" stroke="white" strokeWidth="3" strokeLinejoin="round" />
          <path d="M24 11.5v9.7l8.4 4.9M15.6 16.4l8.4 4.8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "D5教程":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <defs>
            <linearGradient id="d5Icon" x1="8" y1="40" x2="40" y2="8">
              <stop stopColor="#7C3AED" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="18" fill="url(#d5Icon)" />
          <path d="M19 14h6.2c5.2 0 8.8 3.8 8.8 9.8S30.4 34 25.2 34H19V14Z" fill="white" opacity=".92" />
          <path d="M24 20h1.1c2.2 0 3.8 1.5 3.8 3.9 0 2.5-1.6 4.1-3.8 4.1H24v-8Z" fill="#7C3AED" />
        </svg>
      );
    case "Enscape":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <path d="M24 6 39 15v18L24 42 9 33V15L24 6Z" fill="#F28C18" />
          <path d="M16 17.5 24 13l8 4.5-8 4.5-8-4.5ZM16 23.8l8 4.5 8-4.5v6.8L24 35l-8-4.4v-6.8Z" fill="white" opacity=".92" />
        </svg>
      );
    case "Lumion":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <defs>
            <radialGradient id="lumionIcon" cx="34%" cy="30%" r="70%">
              <stop stopColor="#D7EEF2" />
              <stop offset=".45" stopColor="#6FA5B1" />
              <stop offset="1" stopColor="#2F6470" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="18" fill="url(#lumionIcon)" />
          <path d="M12 24h24M24 6c-5 5-7.5 11-7.5 18S19 37 24 42M24 6c5 5 7.5 11 7.5 18S29 37 24 42" stroke="#EAF8FA" strokeWidth="1.4" opacity=".55" />
          <path d="M14 16c5.5 3 14.5 3 20 0M14 32c5.5-3 14.5-3 20 0" stroke="#EAF8FA" strokeWidth="1.4" opacity=".5" />
        </svg>
      );
    case "Photoshop":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <rect x="7" y="7" width="34" height="34" rx="8" fill="#001E26" />
          <text x="24" y="30" textAnchor="middle" fill="#30D5F3" fontSize="16" fontWeight="800" fontFamily="Arial, sans-serif">Ps</text>
        </svg>
      );
    case "V-Ray":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <circle cx="24" cy="24" r="18" fill="white" stroke="#111827" strokeWidth="3" />
          <path d="M16 16c4.8 1.8 8.6 5 10.8 9.4L33 14" stroke="#111827" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 31c3.8 3 9.5 2.6 13-.8" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "Rhino":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <path d="M11 30c3.2-8.4 9.2-12.2 18-11.4l4.3-5.2 2.6 8.1c3 1.5 4.8 3.5 5.4 6l-6.4.7c-1.5 4.7-5.1 7.2-10.6 7.4-4.5.1-8.9-1.8-13.3-5.6Z" fill="#111827" />
          <path d="M14 25.8c2.8-1.4 6-1.5 9.8-.3" stroke="white" strokeWidth="1.7" strokeLinecap="round" opacity=".75" />
          <circle cx="32.5" cy="25" r="1.5" fill="white" />
        </svg>
      );
    case "C4D":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <defs>
            <radialGradient id="c4dIcon" cx="35%" cy="33%" r="70%">
              <stop stopColor="#FBFBFF" />
              <stop offset=".35" stopColor="#8C8BFF" />
              <stop offset=".7" stopColor="#17257F" />
              <stop offset="1" stopColor="#090C2E" />
            </radialGradient>
          </defs>
          <circle cx="24" cy="24" r="18" fill="url(#c4dIcon)" />
          <ellipse cx="19" cy="17" rx="8" ry="5" fill="white" opacity=".58" transform="rotate(-28 19 17)" />
        </svg>
      );
    case "Navisworks":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <defs>
            <linearGradient id="navisIcon" x1="9" y1="39" x2="39" y2="9">
              <stop stopColor="#0EA5A4" />
              <stop offset="1" stopColor="#8EF0E3" />
            </linearGradient>
          </defs>
          <rect x="10" y="7" width="28" height="34" rx="7" fill="url(#navisIcon)" />
          <path d="M17 34V14h5.4l8.6 13.3V14h4v20h-5.2L21 20.5V34h-4Z" fill="white" opacity=".86" />
        </svg>
      );
    case "CAD":
      return (
        <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none">
          <path d="M24 7 39 40h-8l-2.8-7.2h-8.5L17 40H9L24 7Z" fill="#D93434" />
          <path d="M21.6 26.5h4.9L24 19.9l-2.4 6.6Z" fill="white" opacity=".9" />
        </svg>
      );
    default:
      return null;
  }
}

export function SoftwareStrip() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto w-[min(1500px,calc(100vw-28px))]">
        <div className="flex snap-x items-start justify-between gap-8 overflow-x-auto px-1 pb-3 pt-1 scrollbar-hide">
          {softwareItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex min-w-[82px] snap-start flex-col items-center gap-2.5 text-center"
            >
              <span className="grid h-[58px] w-[58px] place-items-center rounded-[14px] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.09)] ring-1 ring-slate-900/[0.04] transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(15,23,42,0.14)]">
                <BrandIcon name={item.label} />
              </span>
              <span className="text-[13px] font-bold leading-none text-slate-700 transition-colors group-hover:text-slate-950">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
