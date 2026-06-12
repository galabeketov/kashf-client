"use client";

import TravelHeader from "@/components/header/travel-header";
import TravelFooter from "@/components/footer/travel-footer";
import PageHero from "@/components/ui/PageHero";
import ServiceInquirySidebar from "@/components/home/travel-easy/ServiceInquirySidebar";
import { SITE_CONFIG } from "@/lib/site-config";

const ServicePageShell = ({
  serviceSlug,
  serviceTitle,
  heroTitle,
  heroSubtitle,
  breadcrumb,
  inquiryContext,
  children,
}) => {
  return (
    <>
      <TravelHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: serviceTitle,
            provider: {
              "@type": "TravelAgency",
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.clientUrl,
            },
            areaServed: {
              "@type": "Country",
              name: "Uzbekistan",
            },
          }),
        }}
      />

      <PageHero title={heroTitle} subtitle={heroSubtitle} />

      <section className="py-10 bg-light-2">
        <div className="container">{breadcrumb}</div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-40">
            <div className="col-lg-8" data-aos="fade-up">
              {children}
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <ServiceInquirySidebar
                serviceSlug={serviceSlug}
                serviceTitle={serviceTitle}
                inquiryContext={inquiryContext}
              />
            </div>
          </div>
        </div>
      </section>

      <TravelFooter />
    </>
  );
};

export default ServicePageShell;
