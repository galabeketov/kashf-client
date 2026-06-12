"use client";

import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";
import PageHero from "@/components/ui/PageHero";
import ServicesSubnav from "@/components/home/kashf/ServicesSubnav";
import ServiceInquirySidebar from "@/components/home/kashf/ServiceInquirySidebar";

const ServicePageShell = ({
  serviceSlug,
  serviceTitle,
  heroTitle,
  heroSubtitle,
  breadcrumb,
  children,
}) => {
  return (
    <>
      <KashfHeader />

      <PageHero title={heroTitle} subtitle={heroSubtitle} />

      <ServicesSubnav active={serviceSlug} />

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
              />
            </div>
          </div>
        </div>
      </section>

      <KashfFooter />
    </>
  );
};

export default ServicePageShell;