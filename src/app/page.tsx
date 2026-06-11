import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HeroSection } from "@/components/home/hero-section";
import { SoftwareStrip } from "@/components/home/software-strip";
import { SuModelSection } from "@/components/home/su-model-section";
import { D5CourseSection } from "@/components/home/d5-course-section";
import { MaterialSection } from "@/components/home/material-section";
import { D5ModelSection } from "@/components/home/d5-model-section";
import { SoftwareSection } from "@/components/home/software-section";
import { AiImageSection } from "@/components/home/ai-image-section";
import { TextCaseSection } from "@/components/home/text-case-section";
import { FriendLinks } from "@/components/home/friend-links";
import { BackToTop } from "@/components/shared/back-to-top";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-cyan-200 selection:text-cyan-900 font-sans">
      <SiteHeader />
      <main>
        <HeroSection />
        <SoftwareStrip />
        <SuModelSection />
        <D5CourseSection />
        <MaterialSection />
        <D5ModelSection />
        <SoftwareSection />
        <TextCaseSection />
        <AiImageSection />
        <FriendLinks />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
