import Link from "next/link";
import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";

export default function NotFound() {
  return (
    <>
      <KashfHeader />
      <section
        className="d-flex flex-column items-center justify-center text-center"
        style={{ minHeight: "70vh", paddingTop: 120 }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            background: "linear-gradient(135deg, #1B6CA8, #C9A84C)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}
        >
          404
        </div>
        <h1 className="text-30 fw-700 text-dark-1 mt-20">Page Not Found</h1>
        <p className="text-16 text-light-1 mt-10" style={{ maxWidth: 400 }}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="d-flex x-gap-15 mt-30">
          <Link href="/en" className="btn-uzbek-primary button -md">
            Go Home
          </Link>
          <Link href="/en/tours" className="btn-uzbek-outline button -md">
            View Tours
          </Link>
        </div>
      </section>
      <KashfFooter />
    </>
  );
}
