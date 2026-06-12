export const SITE_CONFIG = {
  name: "Travel Easy Uzbekistan",
  shortName: "Travel Easy",
  clientUrl: "https://travel-easy.uz",
  adminUrl: "https://admin.travel-easy.uz",
  email: "info@travel-easy.uz",
  phone: "+998 99 062 17 36",
  logo: "/img/brand/travel-easy-emblem.svg",
  ogImage: "/img/og-image.jpg",
};

export const localizedUrl = (locale = "en", path = "") =>
  `${SITE_CONFIG.clientUrl}/${locale}${path}`;
