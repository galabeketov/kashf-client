"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import TravelHeader from "@/components/header/travel-header";
import TravelFooter from "@/components/footer/travel-footer";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { getPostById } from "@/lib/posts";

const getLocalized = (value, locale) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value?.[locale] || value?.en || "";
};

const formatDate = (createdAt, locale) => {
  const sec = createdAt?.seconds || 0;
  if (!sec) return "-";
  return new Date(sec * 1000).toLocaleDateString(locale);
};

export default function BlogDetailPage() {
  const locale = useLocale();
  const navT = useTranslations("nav");
  const t = useTranslations("blog");
  const params = useParams();
  const slug = params?.slug;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    const loadPost = async () => {
      try {
        const data = await getPostById(slug);
        if (!isMounted) return;
        setPost(data);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const title = getLocalized(post?.title, locale);
  const content = getLocalized(post?.content, locale);
  const contentParagraphs = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <>
      <TravelHeader />

      <section className="py-10 bg-light-2" style={{ marginTop: "145px" }}>
        <div className="container">
          <div className="row x-gap-10 y-gap-10 items-center text-14 text-light-1">
            <div className="col-auto">
              <Link href={`/${locale}`} className="text-dark-1">
                {navT("home")}
              </Link>
            </div>
            <div className="col-auto">&gt;</div>
            <div className="col-auto">
              <Link href={`/${locale}/blog`} className="text-dark-1">
                {navT("blog")}
              </Link>
            </div>
            <div className="col-auto">&gt;</div>
            <div className="col-auto">
              <span className="text-dark-1">{title || "..."}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          {loading ? (
            <div className="row">
              <div className="col-lg-8">
                <div
                  style={{
                    height: "36px",
                    width: "60%",
                    borderRadius: "8px",
                    background: "#eef2f7",
                    marginBottom: "14px",
                  }}
                />
                <div
                  style={{
                    height: "400px",
                    borderRadius: "12px",
                    background: "#eef2f7",
                  }}
                />
              </div>
            </div>
          ) : !post ? (
            <div className="text-center">
              <h2 className="text-24">{t("noPosts")}</h2>
              <Link
                href={`/${locale}/blog`}
                className="button -md -blue-1 bg-blue-1 text-white mt-20"
              >
                {t("backToBlog")}
              </Link>
            </div>
          ) : (
            <div className="row y-gap-30">
              <div className="col-lg-8">
                <div
                  className="mb-12"
                  style={{
                    display: "inline-block",
                    background: "rgba(53,84,209,0.1)",
                    color: "#3554d1",
                    borderRadius: "999px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  {t(
                    {
                      "travel-tips": "travelTips",
                      "city-guides": "cityGuides",
                      food: "food",
                      culture: "culture",
                      practical: "practical",
                    }[post.category] || "allPosts",
                  )}
                </div>

                <h1 className="text-40 md:text-30 fw-700 text-dark-1 lh-13">
                  {title}
                </h1>

                <div className="d-flex items-center x-gap-15 text-14 text-light-1 mt-12">
                  <span>{formatDate(post.createdAt, locale)}</span>
                  <span>{t("by")} Samandar Ikromov</span>
                </div>

                <OptimizedImage
                  src={post.coverImage || "/img/blog/1.png"}
                  alt={title}
                  priority
                  sizes="(max-width: 992px) 100vw, 860px"
                  wrapperStyle={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "12px",
                    marginTop: "20px",
                    marginBottom: "24px",
                  }}
                />

                <div className="text-16 lh-17 text-dark-1">
                  {contentParagraphs.map((paragraph, idx) => (
                    <p key={idx} className="mb-16">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="col-lg-4">
                <div
                  className="lg:d-none"
                  style={{ position: "sticky", top: "100px" }}
                >
                  <div
                    className="rounded-8 border-light"
                    style={{ padding: "20px", marginBottom: "18px" }}
                  >
                    <h3 className="text-18 fw-600 text-dark-1 mb-15">
                      About Guide
                    </h3>
                    <div className="d-flex items-center x-gap-12">
                      <img
                        src="/img/team/1.png"
                        alt="Samandar Ikromov"
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "999px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <div className="fw-600 text-dark-1">
                          Samandar Ikromov
                        </div>
                        <div className="text-14 text-light-1">
                          Local guide and travel expert
                        </div>
                      </div>
                    </div>
                    <Link
                      href="https://wa.me/998990621736"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button -sm -blue-1 bg-blue-1 text-white mt-15"
                    >
                      WhatsApp
                    </Link>
                  </div>

                  <div
                    className="rounded-8 border-light"
                    style={{ padding: "20px" }}
                  >
                    <h3 className="text-18 fw-600 text-dark-1 mb-8">
                      {t("planningTrip")}
                    </h3>
                    <p className="text-14 text-light-1">{t("planningDesc")}</p>
                    <div className="d-flex flex-column y-gap-10 mt-15">
                      <Link
                        href="https://wa.me/998990621736"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button -sm -blue-1 bg-blue-1 text-white"
                      >
                        WhatsApp
                      </Link>
                      <Link
                        href={`/${locale}/contact`}
                        className="button -sm -outline-blue-1 text-blue-1"
                      >
                        {navT("contact")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <TravelFooter />
    </>
  );
}
