"use client";

import { useLocale } from "next-intl";
import { LuCheck, LuMessageCircle, LuShield } from "@/components/shared/Icons";

const COPY = {
  en: {
    eyebrow: "Simple planning, local support",
    title: "Your Uzbekistan trip in three clear steps",
    subtitle:
      "Tell us what you need, receive a personal plan, and travel with a local team available throughout your journey.",
    steps: [
      ["Send your request", "Share dates, group size and the places you want to visit."],
      ["Receive a personal plan", "We confirm availability, route, transport and the final offer."],
      ["Travel with confidence", "Your guide and support contact remain available during the trip."],
    ],
    trust: ["Private itineraries", "English, Russian and Uzbek", "Direct local support"],
  },
  uz: {
    eyebrow: "Oson reja, mahalliy yordam",
    title: "O'zbekiston safaringiz uchta aniq bosqichda",
    subtitle:
      "Kerakli xizmatni ayting, shaxsiy reja oling va safar davomida mahalliy jamoa yordami bilan sayohat qiling.",
    steps: [
      ["So'rov yuboring", "Sana, guruh hajmi va ko'rmoqchi bo'lgan joylaringizni yozing."],
      ["Shaxsiy reja oling", "Mavjudlik, marshrut, transport va yakuniy taklifni tasdiqlaymiz."],
      ["Ishonch bilan sayohat qiling", "Gid va yordamchi aloqa safar davomida siz bilan bo'ladi."],
    ],
    trust: ["Xususiy marshrutlar", "O'zbek, rus va ingliz tillari", "Bevosita mahalliy yordam"],
  },
  ru: {
    eyebrow: "Простое планирование, местная поддержка",
    title: "Путешествие по Узбекистану в три понятных шага",
    subtitle:
      "Расскажите, что вам нужно, получите персональный план и путешествуйте с поддержкой местной команды.",
    steps: [
      ["Отправьте запрос", "Укажите даты, размер группы и места, которые хотите посетить."],
      ["Получите личный план", "Мы подтвердим маршрут, транспорт, наличие и итоговое предложение."],
      ["Путешествуйте уверенно", "Гид и контакт поддержки остаются на связи во время поездки."],
    ],
    trust: ["Индивидуальные маршруты", "Русский, английский и узбекский", "Прямая местная поддержка"],
  },
};

export default function TrustProcessSection() {
  const locale = useLocale();
  const copy = COPY[locale] || COPY.en;

  return (
    <section className="travel-process layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row y-gap-30 items-end justify-between">
          <div className="col-lg-7">
            <div className="travel-section-eyebrow">{copy.eyebrow}</div>
            <h2 className="text-40 lg:text-30 mt-10">{copy.title}</h2>
            <p className="text-16 text-light-1 mt-15">{copy.subtitle}</p>
          </div>
          <div className="col-lg-4">
            <div className="travel-trust-list">
              {copy.trust.map((item) => (
                <div key={item}>
                  <LuCheck size={17} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row y-gap-20 pt-40">
          {copy.steps.map(([title, text], index) => (
            <div className="col-lg-4" key={title}>
              <article className="travel-process-card">
                <div className="travel-process-card__icon">
                  {index === 0 ? (
                    <LuMessageCircle size={22} />
                  ) : index === 1 ? (
                    <span>{index + 1}</span>
                  ) : (
                    <LuShield size={22} />
                  )}
                </div>
                <span className="travel-process-card__step">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
