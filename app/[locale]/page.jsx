import KashfHeader from "@/components/header/header-kashf";
import KashfHero from "@/components/hero/kashf-hero";
import ToursSection from "@/components/home/kashf/ToursSection";
import FeaturesSection from "@/components/home/kashf/FeaturesSection";
import AboutSection from "@/components/home/kashf/AboutSection";
import Testimonials from "@/components/home/kashf/Testimonials";
import CTA from "@/components/home/kashf/CTA";
import KashfFooter from "@/components/footer/kashf";

export default function HomePage() {
  return (
    <>
      <KashfHeader />
      <KashfHero />
      <ToursSection />
      <FeaturesSection />
      <AboutSection />
      <Testimonials />
      <CTA />
      <KashfFooter />
    </>
  );
}
