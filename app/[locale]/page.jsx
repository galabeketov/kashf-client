import KashfHeader from "@/components/header/header-kashf";
import KashfHero from "@/components/hero/kashf-hero";
import ServicesSection from "@/components/home/kashf/ServicesSection";
import ToursSection from "@/components/home/kashf/ToursSection";
import AboutSection from "@/components/home/kashf/AboutSection";
import Testimonials from "@/components/home/kashf/Testimonials";
import SiteReviews from "@/components/home/kashf/SiteReviews";
import BlogSection from "@/components/home/kashf/BlogSection";
import CTA from "@/components/home/kashf/CTA";
import KashfFooter from "@/components/footer/kashf";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Travel Easy Uzbekistan",
    url: "https://travel-easy.uz",
    description: "Private tours and travel services in Uzbekistan",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
    },
    telephone: "+998990621736",
    sameAs: [
      "https://instagram.com/traveleasyuz",
      "https://facebook.com/traveleasyuz",
      "https://t.me/traveleasyuz",
    ],
  };

  return (
    <>
      <KashfHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KashfHero />
      <ServicesSection />
      <ToursSection />
      <AboutSection />
      <Testimonials />
      <SiteReviews />
      <BlogSection />
      <CTA />
      <KashfFooter />
    </>
  );
}
