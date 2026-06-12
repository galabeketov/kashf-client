import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://travel-easy.uz"
).replace(/\/$/, "");
const WHATSAPP_URL = "https://wa.me/998990621736";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendMessage(chatId, text, options = {}) {
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        ...options,
      }),
    },
  );
  return res.json();
}

export async function POST(request) {
  try {
    if (
      WEBHOOK_SECRET &&
      request.headers.get("x-telegram-bot-api-secret-token") !== WEBHOOK_SECRET
    ) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const body = await request.json();
    const message = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const text = message.text || "";
    const firstName = escapeHtml(message.from?.first_name || "Traveler");

    if (text === "/start") {
      await sendMessage(
        chatId,
        `🇺🇿 <b>Assalomu alaykum, ${firstName}!</b>\n\nWelcome to <b>Travel Easy Uzbekistan</b> — your personal travel partner on the Silk Road.\n\n👤 <b>Guide:</b> Samandar Ikromov\n📍 <b>Destination:</b> Uzbekistan\n🗺 <b>Tours:</b> Samarkand, Bukhara, Khiva, Tashkent & beyond\n\n<i>Choose an option below 👇</i>`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "🌍 Open Website", web_app: { url: SITE_URL } }],
              [
                {
                  text: "🗺 View All Tours",
                  web_app: { url: `${SITE_URL}/tours` },
                },
              ],
              [{ text: "📞 WhatsApp", url: WHATSAPP_URL }],
              [
                {
                  text: "👤 About the Guide",
                  web_app: { url: `${SITE_URL}/about` },
                },
              ],
            ],
          },
        },
      );
    } else if (text === "/tours") {
      await sendMessage(
        chatId,
        `🗺 <b>Our Tours</b>\n\nDiscover Uzbekistan's Silk Road with private guided tours:\n\n• Tashkent City Tour\n• Day Tour to Samarkand\n• Day Tour to Bukhara\n• Khiva &amp; Urgench\n• Chimgan Mountains &amp; Charvak Lake\n• 8 Days Complete Silk Road\n• And more...\n\nTap below to see all tours:`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🗺 View All Tours",
                  web_app: { url: `${SITE_URL}/tours` },
                },
              ],
              [{ text: "📞 Book via WhatsApp", url: WHATSAPP_URL }],
            ],
          },
        },
      );
    } else if (text === "/contact") {
      await sendMessage(
        chatId,
        `📞 <b>Contact Samandar Ikromov</b>\n\n📱 <b>Phone/WhatsApp:</b> +998 99 062 17 36\n📧 <b>Email:</b> info@travel-easy.uz\n📍 <b>Location:</b> Tashkent, Uzbekistan\n\n<i>We reply within 24 hours</i>`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "💬 WhatsApp", url: WHATSAPP_URL }],
              [{ text: "🌍 Visit Website", web_app: { url: SITE_URL } }],
            ],
          },
        },
      );
    } else if (text === "/about") {
      await sendMessage(
        chatId,
        `👤 <b>About Samandar Ikromov</b>\n\nProfessional Tour Guide &amp; Travel Consultant in Uzbekistan.\n\n✅ 614+ happy clients\n✅ 18+ countries served\n✅ 11+ tour packages\n✅ Languages: English, Russian, Uzbek\n✅ Private tours only — no strangers\n✅ Business trip logistics expert\n\n<i>"Let's create memories that last a lifetime!"</i>`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "🌍 Open Website", web_app: { url: SITE_URL } }],
              [{ text: "📞 Contact", url: WHATSAPP_URL }],
            ],
          },
        },
      );
    } else {
      await sendMessage(
        chatId,
        `🇺🇿 <b>Travel Easy Uzbekistan</b>\n\nUse the commands:\n/start — Welcome\n/tours — View tours\n/contact — Contact us\n/about — About the guide`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "🌍 Open Website", web_app: { url: SITE_URL } }],
              [{ text: "📞 WhatsApp", url: WHATSAPP_URL }],
            ],
          },
        },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: "Telegram webhook is active" });
}
