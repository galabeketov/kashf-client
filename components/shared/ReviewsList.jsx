"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { FaStar } from "react-icons/fa";
import { getApprovedReviews } from "@/lib/reviews";

const formatDate = (createdAt) => {
  const seconds = createdAt?.seconds;
  if (!seconds) return "";
  return new Date(seconds * 1000).toLocaleDateString();
};

const ReviewsList = ({ type, tourId, refreshKey = 0 }) => {
  const t = useTranslations("reviews");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const items = await getApprovedReviews(type, tourId || null);
        if (!mounted) return;
        setReviews(items);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    setLoading(true);
    load();

    return () => {
      mounted = false;
    };
  }, [type, tourId, refreshKey]);

  const average = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce(
      (sum, item) => sum + (Number(item.rating) || 0),
      0,
    );
    return total / reviews.length;
  }, [reviews]);

  if (loading) {
    return <div className="text-14 text-light-1">Loading reviews...</div>;
  }

  if (!reviews.length) {
    return <div className="text-15 text-light-1">{t("noReviews")}</div>;
  }

  return (
    <div>
      <div className="d-flex items-center x-gap-10 mb-20">
        <div className="text-22 fw-600">{average.toFixed(1)}</div>
        <div className="text-18" style={{ color: "#C9A84C" }}>
          ★
        </div>
        <div className="text-15 text-light-1">
          {reviews.length} {t("totalReviews")}
        </div>
      </div>

      <div className="row y-gap-20">
        {reviews.map((review) => (
          <div className="col-12" key={review.id}>
            <div className="border-light rounded-8 px-20 py-20">
              <div className="d-flex items-center justify-between flex-wrap y-gap-10">
                <div>
                  <div className="text-16 fw-500">
                    {review.name} {review.country ? `· ${review.country}` : ""}
                  </div>
                  <div
                    className="d-flex x-gap-5 pt-8"
                    style={{ color: "#C9A84C" }}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={`${review.id}-${index}`}
                        size={14}
                        style={{
                          opacity: index < Number(review.rating) ? 1 : 0.25,
                        }}
                      />
                    ))}
                    <span className="text-14 text-dark-1 ml-5">
                      {Number(review.rating).toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="text-13 text-light-1">
                  {formatDate(review.createdAt)}
                </div>
              </div>

              <p className="text-15 text-dark-1 mt-15">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
