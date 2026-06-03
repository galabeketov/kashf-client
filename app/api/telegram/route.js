import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SITE_URL = "https://kashf-client.vercel.app/en";
const WHATSAPP_URL = "https://wa.me/998990621736";

async function sendMessage(chatId, text, options = {}) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      ...options,
    }),
  });
}

async function sendPhoto(chatId, photo, caption, options = {}) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      photo,
      caption,
      parse_mode: "HTML",
      ...options,
    }),
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const message = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const text = message.text || "";
    const firstName = message.from?.first_name || "Traveler";

    // /start command
    if (text === "/start") {
      await sendPhoto(
        chatId,
        "https://travel-easy.uz/img/og-image.jpg",
        `🇺🇿 <b>Assalomu alaykum, ${firstName}!</b>\n\nWelcome to <b>Travel Easy Uzbekistan</b> — your personal travel partner on the Silk Road.\n\n👤 <b>Guide:</b> Samandar Ikromov\n📍 <b>Destination:</b> Uzbekistan\n🗺 <b>Tours:</b> Samarkand, Bukhara, Khiva, Tashkent & beyond\n\nChoose an option below:`,
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
    }

    // /tours command
    else if (text === "/tours") {
      await sendMessage(
        chatId,
        `🗺 <b>Our Tours</b>\n\nDiscover Uzbekistan's Silk Road with private guided tours:\n\n• Tashkent City Tour — from $50\n• Day Tour to Samarkand — from $80\n• Day Tour to Bukhara — from $90\n• Khiva & Urgench — from $180\n• 8 Days Complete Silk Road — from $950\n• And more...\n\nTap below to see all tours:`,
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
    }

    // /contact command
    else if (text === "/contact") {
      await sendMessage(
        chatId,
        `📞 <b>Contact Samandar Ikromov</b>\n\n📱 <b>Phone/WhatsApp:</b> +998 99 062 17 36\n📧 <b>Email:</b> samandarwtf13@gmail.com\n📍 <b>Location:</b> Tashkent, Uzbekistan\n\n<i>We reply within 24 hours</i>`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "💬 WhatsApp", url: WHATSAPP_URL }],
              [{ text: "🌍 Visit Website", web_app: { url: SITE_URL } }],
            ],
          },
        },
      );
    }

    // /about command
    else if (text === "/about") {
      await sendMessage(
        chatId,
        `👤 <b>About Samandar Ikromov</b>\n\nProfessional Tour Guide & Travel Consultant in Uzbekistan.\n\n✅ 614+ happy clients\n✅ 18+ countries served\n✅ 11+ tour packages\n✅ Languages: English, Russian, Uzbek\n✅ Private tours only — no strangers\n✅ Business trip logistics expert\n\n<i>"Let's create memories that last a lifetime!"</i>`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "🌍 Open Website", web_app: { url: SITE_URL } }],
              [{ text: "📞 Contact", url: WHATSAPP_URL }],
            ],
          },
        },
      );
    }

    // Any other message
    else {
      await sendMessage(
        chatId,
        `🇺🇿 <b>Travel Easy Uzbekistan</b>\n\nUse the menu button or commands:\n/start — Welcome\n/tours — View tours\n/contact — Contact us\n/about — About the guide`,
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
