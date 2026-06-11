const LOCALES = ["en", "uz", "ru"];

export function localizedText(value, locale = "en") {
  if (typeof value === "string") return value.trim();
  if (!value || typeof value !== "object") return "";

  const preferred = LOCALES.includes(locale) ? locale : "en";
  return (
    value[preferred] ||
    value.en ||
    value.uz ||
    value.ru ||
    Object.values(value).find((item) => typeof item === "string") ||
    ""
  ).trim();
}

export function localizedList(value, locale = "en") {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value || typeof value !== "object") return [];

  const list = value[locale] || value.en || value.uz || value.ru;
  return Array.isArray(list) ? list.filter(Boolean) : [];
}

export function formatDuration(duration, locale = "en") {
  const count = Number(duration);
  if (!Number.isFinite(count) || count <= 0) {
    return locale === "uz"
      ? "Moslashuvchan"
      : locale === "ru"
        ? "По запросу"
        : "Flexible";
  }

  if (locale === "uz") return `${count} kun`;
  if (locale === "ru") {
    const suffix = count === 1 ? "день" : count < 5 ? "дня" : "дней";
    return `${count} ${suffix}`;
  }
  return `${count} ${count === 1 ? "day" : "days"}`;
}

export function normalizeTour(tour, locale = "en") {
  const price = Number(tour?.price);
  const rating = Number(tour?.rating);
  const reviewCount = Number(tour?.reviewCount);
  const images = Array.isArray(tour?.images) ? tour.images.filter(Boolean) : [];

  return {
    ...tour,
    id: String(tour?.id || ""),
    title: localizedText(tour?.title, locale),
    description: localizedText(tour?.description, locale),
    includes: localizedList(tour?.includes, locale),
    images: images.length ? images : ["/img/tours/1.png"],
    duration: Number(tour?.duration) || 0,
    durationLabel: formatDuration(tour?.duration, locale),
    price: Number.isFinite(price) && price > 0 ? price : null,
    rating: Number.isFinite(rating) && rating > 0 ? Math.min(rating, 5) : null,
    reviewCount:
      Number.isFinite(reviewCount) && reviewCount > 0 ? reviewCount : null,
  };
}

export function normalizeContact(contact = {}, fallback = {}) {
  return {
    phone: contact.phone || fallback.phone || "",
    email: contact.email || fallback.email || "",
    whatsapp: contact.whatsapp || fallback.whatsapp || "",
    telegram: contact.telegram || fallback.telegram || "",
    facebook: contact.facebook || fallback.facebook || "",
    instagram: contact.instagram || fallback.instagram || "",
    location: contact.location || fallback.location || "",
  };
}
