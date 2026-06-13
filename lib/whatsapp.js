const DEFAULT_WHATSAPP = "https://wa.me/998990621736";

export function createWhatsAppUrl(baseUrl = DEFAULT_WHATSAPP, message = "") {
  if (!message) return baseUrl || DEFAULT_WHATSAPP;

  const url = baseUrl || DEFAULT_WHATSAPP;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}text=${encodeURIComponent(message)}`;
}

export function createPageInquiryMessage({
  locale = "en",
  title = "Travel Easy Uzbekistan",
  selection = "",
  url = "",
}) {
  const copy = {
    en: `Hello! I am interested in ${title}.`,
    uz: `Assalomu alaykum! Menga ${title} bo'yicha ma'lumot kerak.`,
    ru: `Здравствуйте! Меня интересует: ${title}.`,
  };
  const details = [selection, url].filter(Boolean).join("\n");
  return [copy[locale] || copy.en, details].filter(Boolean).join("\n");
}
