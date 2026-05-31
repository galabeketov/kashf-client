"use client";

import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";
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

      <section
        style={{
          background: "linear-gradient(135deg, #051036 0%, #0d2268 100%)",
          paddingTop: "130px",
          paddingBottom: "60px",
        }}
      >
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-lg-8">
              <h1
                className="text-50 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
              >
                {heroTitle}
              </h1>
              <p
                className="text-white mt-15"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

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