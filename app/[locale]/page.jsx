import TravelHeader from "@/components/header/travel-header";
import TravelHero from "@/components/hero/travel-hero";
import ServicesSection from "@/components/home/travel-easy/ServicesSection";
import ToursSection from "@/components/home/travel-easy/ToursSection";
import AboutSection from "@/components/home/travel-easy/AboutSection";
import SiteReviews from "@/components/home/travel-easy/SiteReviews";
import BlogSection from "@/components/home/travel-easy/BlogSection";
import CTA from "@/components/home/travel-easy/CTA";
import TravelFooter from "@/components/footer/travel-footer";
import { SITE_CONFIG } from "@/lib/site-config";
import { tours as staticTours } from "@/data/travelEasy";
import { getFeaturedTours } from "@/lib/tours";
import { getFeaturedPosts } from "@/lib/posts";
import { getApprovedReviews } from "@/lib/reviews";
import TrustProcessSection from "@/components/home/travel-easy/TrustProcessSection";

const serialize = (value) => JSON.parse(JSON.stringify(value));

export default async function HomePage() {
  const [remoteTours, posts, reviews] = await Promise.all([
    getFeaturedTours().catch(() => []),
    getFeaturedPosts().catch(() => []),
    getApprovedReviews("site").catch(() => []),
  ]);
  const tours = remoteTours.length ? remoteTours : staticTours.slice(0, 8);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_CONFIG.clientUrl}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.clientUrl,
    description: "Private tours and travel services in Uzbekistan",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
    },
    telephone: "+998990621736",
    email: SITE_CONFIG.email,
    logo: `${SITE_CONFIG.clientUrl}${SITE_CONFIG.logo}`,
    image: `${SITE_CONFIG.clientUrl}${SITE_CONFIG.ogImage}`,
    founder: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.clientUrl}/#guide`,
      name: "Samandar Ikromov",
      jobTitle: "Private Uzbekistan Tour Guide",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+998990621736",
      email: SITE_CONFIG.email,
      contactType: "customer service",
      availableLanguage: ["English", "Russian", "Uzbek"],
    },
    sameAs: [
      "https://instagram.com/traveleasyuz",
      "https://facebook.com/traveleasyuz",
      "https://t.me/traveleasyuz",
    ],
  };

  return (
    <>
      <TravelHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TravelHero />
      <ToursSection initialTours={serialize(tours)} />
      <ServicesSection />
      <TrustProcessSection />
      <AboutSection />
      <SiteReviews initialReviews={serialize(reviews)} />
      <CTA />
      <BlogSection initialPosts={serialize(posts.slice(0, 3))} />
      <TravelFooter />
    </>
  );
}
