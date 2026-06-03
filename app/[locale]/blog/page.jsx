"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { getPublishedPosts } from "@/lib/posts";

const CATEGORY_KEYS = [
  "all",
  "travel-tips",
  "city-guides",
  "food",
  "culture",
  "practical",
];

const categoryToI18n = {
  all: "allPosts",
  "travel-tips": "travelTips",
  "city-guides": "cityGuides",
  food: "food",
  culture: "culture",
  practical: "practical",
};

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

export default function BlogPage() {
  const locale = useLocale();
  const navT = useTranslations("nav");
  const t = useTranslations("blog");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const items = await getPublishedPosts();
        if (!isMounted) return;
        setPosts(items);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

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
                {t("pageTitle")}
              </h1>
              <p
                className="text-white mt-15"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("pageSubtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-light-2">
        <div className="container">
          <div className="row x-gap-10 y-gap-10 items-center text-14 text-light-1">
            <div className="col-auto">
              <Link href={`/${locale}`} className="text-dark-1">
                {navT("home")}
              </Link>
            </div>
            <div className="col-auto">&gt;</div>
            <div className="col-auto">
              <span className="text-dark-1">{navT("blog")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-10 x-gap-10 mb-30">
            {CATEGORY_KEYS.map((category) => {
              const active = activeCategory === category;
              return (
                <div className="col-auto" key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className="button -sm"
                    style={{
                      borderRadius: "999px",
                      border: active ? "none" : "1px solid #d9e1ec",
                      background: active ? "#3554d1" : "#fff",
                      color: active ? "#fff" : "#051036",
                      padding: "8px 16px",
                    }}
                  >
                    {t(categoryToI18n[category])}
                  </button>
                </div>
              );
            })}
          </div>

          {loading ? (
            <div className="row y-gap-30">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-lg-4 col-sm-6 col-12">
                  <div className="tourCard -type-1 rounded-4">
                    <div
                      style={{
                        height: "220px",
                        borderRadius: "12px",
                        background: "#eef2f7",
                        animation: "kashfBlogPulse 1.4s ease-in-out infinite",
                      }}
                    />
                    <div className="mt-12">
                      <div
                        style={{
                          height: "16px",
                          width: "55%",
                          background: "#eef2f7",
                          borderRadius: "6px",
                          marginBottom: "8px",
                        }}
                      />
                      <div
                        style={{
                          height: "14px",
                          width: "80%",
                          background: "#eef2f7",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center" style={{ color: "#697488" }}>
              {t("noPosts")}
            </div>
          ) : (
            <div className="row y-gap-30">
              {filteredPosts.map((post, idx) => {
                const title = getLocalized(post.title, locale);
                const excerpt = getLocalized(post.excerpt, locale);

                return (
                  <div
                    className="col-lg-4 col-sm-6 col-12"
                    key={post.id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 60}
                  >
                    <div className="tourCard -type-1 rounded-4 h-100">
                      <div className="tourCard__image position-relative">
                        <OptimizedImage
                          src={post.coverImage || "/img/blog/1.png"}
                          alt={title}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          wrapperStyle={{
                            width: "100%",
                            height: "220px",
                            borderRadius: "12px",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            background: "rgba(5,16,54,0.9)",
                            color: "#fff",
                            fontSize: "11px",
                            borderRadius: "999px",
                            padding: "4px 10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                          }}
                        >
                          {t(categoryToI18n[post.category] || "allPosts")}
                        </div>
                      </div>

                      <div className="tourCard__content mt-14">
                        <h4 className="text-18 fw-500 text-dark-1 lh-16 mb-8">
                          {title}
                        </h4>
                        <p
                          className="text-14 text-light-1"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            minHeight: "44px",
                          }}
                        >
                          {excerpt}
                        </p>

                        <div className="d-flex items-center justify-between mt-15">
                          <div className="text-13 text-light-1">
                            {formatDate(post.createdAt, locale)}
                          </div>
                          <Link
                            href={`/${locale}/blog/${post.id}`}
                            className="text-14 fw-500 text-blue-1"
                          >
                            {t("readMore")} -&gt;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <KashfFooter />

      <style jsx global>{`
        @keyframes kashfBlogPulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
