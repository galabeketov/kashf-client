import { SITE_CONFIG, localizedUrl } from "@/lib/site-config";

const PAGE_COPY = {
  tours: {
    en: ["Private Tours in Uzbekistan with a Local Guide", "Book private guided tours to Tashkent, Samarkand, Bukhara, Khiva and other destinations across Uzbekistan."],
    uz: ["Mahalliy gid bilan O'zbekiston bo'ylab xususiy turlar", "Toshkent, Samarqand, Buxoro, Xiva va boshqa manzillarga mahalliy gid bilan xususiy turlarni bron qiling."],
    ru: ["Частные туры по Узбекистану с местным гидом", "Закажите частные экскурсии с гидом в Ташкент, Самарканд, Бухару, Хиву и другие города Узбекистана."],
  },
  about: {
    en: ["Private Tour Guide in Uzbekistan — Samandar Ikromov", "Meet Samandar Ikromov, a professional local guide for private tours in Tashkent, Samarkand, Bukhara, Khiva and across Uzbekistan."],
    uz: ["O'zbekistondagi professional gid — Samandar Ikromov", "Toshkent, Samarqand, Buxoro, Xiva va O'zbekiston bo'ylab xususiy turlar tashkil qiluvchi mahalliy gid Samandar Ikromov bilan tanishing."],
    ru: ["Частный гид по Узбекистану — Самандар Икромов", "Профессиональный местный гид для частных экскурсий по Ташкенту, Самарканду, Бухаре, Хиве и всему Узбекистану."],
  },
  contact: {
    en: ["Travel Easy Uzbekistan Contacts, Instagram and Email", "Contact Travel Easy Uzbekistan by WhatsApp, Telegram, Instagram @traveleasyuz, phone or email info@travel-easy.uz."],
    uz: ["Travel Easy Uzbekistan aloqa, Instagram va email", "WhatsApp, Telegram, Instagram @traveleasyuz, telefon yoki info@travel-easy.uz email orqali bog'laning."],
    ru: ["Контакты, Instagram и email Travel Easy Uzbekistan", "Свяжитесь через WhatsApp, Telegram, Instagram @traveleasyuz, телефон или email info@travel-easy.uz."],
  },
  blog: {
    en: ["Uzbekistan Travel Blog", "Practical Uzbekistan travel guides, destination ideas and local advice from Travel Easy Uzbekistan."],
    uz: ["O'zbekiston sayohat blogi", "Travel Easy Uzbekistan'dan amaliy qo'llanmalar, manzil g'oyalari va mahalliy maslahatlar."],
    ru: ["Блог о путешествиях по Узбекистану", "Практические гиды, идеи маршрутов и местные советы от Travel Easy Uzbekistan."],
  },
  services: {
    en: ["Travel Services in Uzbekistan", "Private tours, car rental, airport transfers, personal drivers, business support and currency exchange requests in Uzbekistan."],
    uz: ["O'zbekistondagi sayohat xizmatlari", "O'zbekistonda xususiy turlar, avtomobil ijarasi, aeroport transferi, shaxsiy haydovchi, biznes yordami va valuta ayirboshlash so'rovlari."],
    ru: ["Туристические услуги в Узбекистане", "Частные туры, аренда авто, трансферы, личный водитель, бизнес-поддержка и запросы на обмен валют в Узбекистане."],
  },
  "rent-car": {
    en: ["Car Rental in Uzbekistan", "Choose a car available in Uzbekistan and request rental with or without a driver. Availability and details are agreed directly."],
    uz: ["O'zbekistonda avtomobil ijarasi", "O'zbekistonda mavjud avtomobilni tanlang va haydovchili yoki haydovchisiz ijara uchun so'rov yuboring."],
    ru: ["Аренда авто в Узбекистане", "Выберите доступный в Узбекистане автомобиль и оставьте заявку на аренду с водителем или без."],
  },
  transfer: {
    en: ["Airport Transfer in Uzbekistan", "Request airport pickup, hotel transfer or intercity transport anywhere in Uzbekistan."],
    uz: ["O'zbekistonda aeroport transferi", "Aeroportdan kutib olish, mehmonxonaga yoki O'zbekistonning istalgan shahriga transfer buyurtma qiling."],
    ru: ["Трансфер из аэропорта в Узбекистане", "Закажите встречу в аэропорту, трансфер в отель или между городами Узбекистана."],
  },
  driver: {
    en: ["Personal Driver in Uzbekistan", "Request a professional driver for city travel, business meetings, day trips or multi-day journeys."],
    uz: ["O'zbekistonda shaxsiy haydovchi", "Shahar, biznes uchrashuv, kunlik yoki ko'p kunlik safar uchun professional haydovchi so'rang."],
    ru: ["Личный водитель в Узбекистане", "Закажите профессионального водителя для города, деловых встреч и поездок по Узбекистану."],
  },
  business: {
    en: ["Business Travel Support in Uzbekistan", "Interpretation, transport, venues, logistics and personal assistance for companies and delegations."],
    uz: ["O'zbekistonda biznes safar yordami", "Kompaniya va delegatsiyalar uchun tarjima, transport, joy, logistika va shaxsiy yordamchi."],
    ru: ["Поддержка деловых поездок в Узбекистане", "Перевод, транспорт, площадки, логистика и личный ассистент для компаний и делегаций."],
  },
  currency: {
    en: ["Currency Exchange Assistance in Uzbekistan", "Get help finding an authorized bank or exchange office for the currencies and amount you need."],
    uz: ["O'zbekistonda valuta ayirboshlash yordami", "Kerakli valuta va summa uchun vakolatli bank yoki ayirboshlash shoxobchasini topishda yordam oling."],
    ru: ["Помощь с обменом валюты в Узбекистане", "Получите помощь в поиске уполномоченного банка или обменного пункта для нужной валюты и суммы."],
  },
};

export function createPageMetadata(page, locale = "en") {
  const copy = PAGE_COPY[page]?.[locale] || PAGE_COPY[page]?.en;
  const [title, description] = copy;
  const path = `/${page}`;
  const canonical = localizedUrl(locale, path);

  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    keywords: KEYWORDS[page]?.[locale] || KEYWORDS[page]?.en,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
      languages: {
        en: localizedUrl("en", path),
        uz: localizedUrl("uz", path),
        ru: localizedUrl("ru", path),
        "x-default": localizedUrl("en", path),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [{ url: SITE_CONFIG.ogImage, alt: SITE_CONFIG.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_CONFIG.ogImage],
    },
  };
}

const KEYWORDS = {
  tours: {
    en: ["Uzbekistan tours", "private tours Uzbekistan", "Uzbekistan local guide", "Samarkand tour", "Bukhara tour", "Tashkent tour"],
    uz: ["O'zbekiston turlari", "xususiy turlar", "O'zbekiston gidi", "Samarqand turi", "Buxoro turi", "Toshkent turi"],
    ru: ["туры по Узбекистану", "частные туры Узбекистан", "гид по Узбекистану", "тур Самарканд", "тур Бухара", "экскурсии Ташкент"],
  },
  about: {
    en: ["Uzbekistan tour guide", "private guide Uzbekistan", "local guide Tashkent", "Samarkand guide", "Samandar Ikromov"],
    uz: ["O'zbekiston gidi", "xususiy gid", "Toshkent gidi", "Samarqand gidi", "Samandar Ikromov"],
    ru: ["гид по Узбекистану", "частный гид Узбекистан", "гид Ташкент", "гид Самарканд", "Самандар Икромов"],
  },
  contact: {
    en: ["Travel Easy Uzbekistan Instagram", "Travel Easy email", "Travel Easy contacts", "@traveleasyuz"],
    uz: ["Travel Easy Instagram", "Travel Easy email", "Travel Easy aloqa", "@traveleasyuz"],
    ru: ["Travel Easy Instagram", "Travel Easy email", "контакты Travel Easy", "@traveleasyuz"],
  },
  services: {
    en: ["travel services Uzbekistan", "car rental Uzbekistan", "airport transfer Tashkent", "personal driver Uzbekistan"],
    uz: ["O'zbekistonda sayohat xizmatlari", "avtomobil ijarasi", "aeroport transferi", "shaxsiy haydovchi"],
    ru: ["туристические услуги Узбекистан", "аренда авто Узбекистан", "трансфер аэропорт Ташкент", "личный водитель"],
  },
  "rent-car": {
    en: ["car rental Uzbekistan", "rent a car Tashkent", "car with driver Uzbekistan"],
    uz: ["O'zbekistonda avtomobil ijarasi", "Toshkentda mashina ijarasi", "haydovchili avtomobil"],
    ru: ["аренда авто Узбекистан", "прокат авто Ташкент", "машина с водителем"],
  },
  transfer: {
    en: ["Tashkent airport transfer", "airport pickup Uzbekistan", "Samarkand transfer"],
    uz: ["Toshkent aeroport transferi", "aeroportdan kutib olish", "Samarqand transfer"],
    ru: ["трансфер аэропорт Ташкент", "встреча в аэропорту Узбекистан", "трансфер Самарканд"],
  },
  driver: {
    en: ["personal driver Uzbekistan", "driver in Tashkent", "car with driver Uzbekistan"],
    uz: ["O'zbekistonda shaxsiy haydovchi", "Toshkent haydovchi", "haydovchili mashina"],
    ru: ["личный водитель Узбекистан", "водитель Ташкент", "машина с водителем"],
  },
  business: {
    en: ["business travel Uzbekistan", "business assistant Tashkent", "delegation support Uzbekistan"],
    uz: ["O'zbekistonda biznes safar", "Toshkent biznes yordamchi", "delegatsiya yordami"],
    ru: ["деловая поездка Узбекистан", "бизнес ассистент Ташкент", "поддержка делегаций"],
  },
  currency: {
    en: ["currency exchange Uzbekistan", "exchange office Tashkent", "USD UZS exchange"],
    uz: ["O'zbekistonda valuta ayirboshlash", "Toshkent ayirboshlash shoxobchasi", "dollar so'm kursi"],
    ru: ["обмен валюты Узбекистан", "обменник Ташкент", "курс доллар сум"],
  },
};
