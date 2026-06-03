"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowRight } from "@/components/shared/Icons";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { getFeaturedPosts } from "@/lib/posts";

const getLocalized = (value, locale) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value?.[locale] || value?.en || "";
};

export default function BlogSection() {
  const locale = useLocale();
  const t = useTranslations("blog");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const all = await getFeaturedPosts();
        if (!isMounted) return;
        setPosts(all.slice(0, 3));
      } catch {
        if (!isMounted) return;
        setPosts([]);
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!posts.length) return null;

  return (
    <section className="layout-pt-md layout-pb-lg" data-aos="fade-up">
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">{t("latestPosts")}</h2>
            </div>
          </div>
          <div className="col-auto md:d-none">
            <Link
              href={`/${locale}/blog`}
              className="button -md -blue-1 bg-blue-1-05 text-blue-1"
            >
              {t("viewAll")}
              <span className="ml-10 d-inline-flex">
                <LuArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        <div className="row y-gap-30 pt-30">
          {posts.map((post, idx) => {
            const title = getLocalized(post.title, locale);
            const excerpt = getLocalized(post.excerpt, locale);

            return (
              <div
                className="col-lg-4 col-sm-6 col-12"
                key={post.id}
                data-aos="fade-up"
                data-aos-delay={idx * 70}
              >
                <article className="uzbek-blog-card h-100 position-relative">
                  <span className="uzbek-dome-ornament" aria-hidden="true" />
                  <OptimizedImage
                    src={post.coverImage || "/img/blog/1.png"}
                    alt={title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    wrapperStyle={{
                      width: "100%",
                      height: "220px",
                      borderRadius: "8px",
                    }}
                  />

                  <div className="tourCard__content mt-16">
                    <div className="text-12 text-blue-1 fw-600 uppercase mb-10">
                      Travel Journal
                    </div>

                    <h3 className="text-18 fw-600 text-dark-1 lh-16 mb-10">
                      {title}
                    </h3>

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

                    <Link
                      href={`/${locale}/blog/${post.id}`}
                      className="button -sm btn-uzbek-outline-dark mt-16"
                    >
                      {t("readMore")}
                    </Link>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <div className="md:d-flex d-none pt-20 justify-center">
          <Link
            href={`/${locale}/blog`}
            className="button -md -blue-1 bg-blue-1-05 text-blue-1"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
