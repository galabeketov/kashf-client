import { defaultSettings as baseDefaultSettings } from "./defaultSettings";

export const tours = [
  {
    id: "4-days-uzbekistan-highlights",
    title: "4 Days Uzbekistan Highlights",
    description:
      "A compact private journey through Tashkent, Samarkand, and Amirsoy with cultural landmarks, mountain views, and seamless transfers.",
    duration: 4,
    price: 299,
    images: ["/img/tours/1.png", "/img/tours/2.png", "/img/tours/3.png"],
    includes: [
      "Private transportation",
      "4-star hotel accommodation",
      "Daily breakfast",
      "English-speaking local guide",
      "Entrance tickets",
    ],
    itinerary: [
      {
        title: "Day 1 - Arrival in Tashkent",
        description:
          "Airport pickup, city introduction tour, and evening walk around Amir Temur Square.",
      },
      {
        title: "Day 2 - Samarkand Highlights",
        description:
          "Explore Registan Square, Gur-e-Amir Mausoleum, and Shah-i-Zinda complex.",
      },
      {
        title: "Day 3 - Amirsoy Mountain Escape",
        description:
          "Scenic drive to Amirsoy for cable car views and fresh mountain air before returning to Tashkent.",
      },
      {
        title: "Day 4 - Departure",
        description:
          "Free time for local shopping, then private transfer to the airport.",
      },
    ],
    featured: true,
  },
  {
    id: "7-days-grand-uzbekistan-escape",
    title: "7 Days Grand Uzbekistan Escape",
    description:
      "A richer private route across Tashkent, Samarkand, Shakhrisabz, and Bukhara for travelers who want both history and depth.",
    duration: 7,
    price: 599,
    images: ["/img/tours/4.png", "/img/tours/5.png", "/img/tours/6.png"],
    includes: [
      "Private intercity transfers",
      "Boutique hotel stays",
      "Breakfast and selected dinners",
      "Professional licensed guide",
      "Train tickets between major cities",
    ],
    itinerary: [
      {
        title: "Day 1 - Welcome to Tashkent",
        description:
          "Arrival support, old town exploration, and local cuisine tasting.",
      },
      {
        title: "Day 2 - Journey to Samarkand",
        description:
          "High-speed train to Samarkand and guided walk through iconic monuments.",
      },
      {
        title: "Day 3 - Samarkand Cultural Day",
        description:
          "Visit ancient madrasahs, observatory remains, and artisan workshops.",
      },
      {
        title: "Day 4 - Shakhrisabz Excursion",
        description: "Day trip to Shakhrisabz to discover Timur legacy sites.",
      },
      {
        title: "Day 5 - Transfer to Bukhara",
        description:
          "Comfortable transfer and sunset walking tour in old Bukhara.",
      },
      {
        title: "Day 6 - Bukhara Discovery",
        description:
          "Explore Ark Fortress, Po-i-Kalyan complex, and traditional domed bazaars.",
      },
      {
        title: "Day 7 - Departure",
        description: "Leisure morning and private departure transfer.",
      },
    ],
    featured: true,
  },
  {
    id: "10-days-legendary-adventure",
    title: "10 Days Legendary Adventure",
    description:
      "An immersive private adventure through Uzbekistan's legendary Silk Road cities: Tashkent, Samarkand, Bukhara, Khiva, and Urganch.",
    duration: 10,
    price: 899,
    images: ["/img/tours/7.png", "/img/tours/8.png", "/img/tours/9.png"],
    includes: [
      "All private transfers",
      "Domestic flight support",
      "Handpicked hotels",
      "Daily breakfast and 3 local dinners",
      "Entrance fees and guided excursions",
    ],
    itinerary: [
      {
        title: "Day 1 - Tashkent Arrival",
        description:
          "Meet and greet service, hotel check-in, and introductory city tour.",
      },
      {
        title: "Day 2 - Tashkent to Samarkand",
        description:
          "Fast train transfer and evening visit to Registan Square.",
      },
      {
        title: "Day 3 - Samarkand In Depth",
        description:
          "Full-day exploration of mausoleums, markets, and craft studios.",
      },
      {
        title: "Day 4 - Road to Bukhara",
        description:
          "Transfer to Bukhara with scenic stops and evening free time.",
      },
      {
        title: "Day 5 - Bukhara Heritage",
        description:
          "Guided route through the old city, fortress, and madrasa courtyards.",
      },
      {
        title: "Day 6 - Bukhara Local Life",
        description:
          "Traditional hammam option, market walk, and folk performance.",
      },
      {
        title: "Day 7 - Transfer to Khiva",
        description:
          "Long-distance transfer with rest stops and arrival in Khiva.",
      },
      {
        title: "Day 8 - Khiva Walled City",
        description:
          "Explore Itchan Kala, minarets, and museums with your private guide.",
      },
      {
        title: "Day 9 - Urganch and Return Planning",
        description:
          "Short visit to Urganch and preparation for onward journey.",
      },
      {
        title: "Day 10 - Departure",
        description: "Airport transfer and farewell.",
      },
    ],
    featured: false,
  },
  {
    id: "custom-private-tour",
    title: "Custom Private Tour",
    description:
      "Design your own Uzbekistan journey with a flexible itinerary, private guide, and tailored pace based on your interests.",
    duration: 0,
    price: 0,
    images: ["/img/tours/2.png", "/img/tours/5.png", "/img/tours/8.png"],
    includes: [
      "Personalized itinerary planning",
      "Private guide and transport",
      "Flexible hotel category options",
      "Custom activities on request",
      "24/7 trip assistance",
    ],
    itinerary: [
      {
        title: "Step 1 - Consultation",
        description: "Share your dates, interests, and preferred travel style.",
      },
      {
        title: "Step 2 - Tailored Proposal",
        description:
          "Receive a custom route, hotel options, and activity plan.",
      },
      {
        title: "Step 3 - Confirmation",
        description: "Finalize inclusions and secure your private trip.",
      },
      {
        title: "Step 4 - Travel",
        description: "Enjoy your personalized Uzbekistan experience.",
      },
    ],
    featured: true,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    country: "France",
    flag: "fr",
    avatar: "/img/avatars/testimonials/1.png",
    text: "Everything was arranged perfectly. Our private guide made Samarkand and Bukhara feel alive with stories.",
    tour: "7 Days Grand Uzbekistan Escape",
    rating: 5,
  },
  {
    id: 2,
    name: "Daniel Cooper",
    country: "United Kingdom",
    flag: "gb",
    avatar: "/img/avatars/testimonials/2.png",
    text: "Great communication, smooth transfers, and excellent local food recommendations. Highly recommended.",
    tour: "4 Days Uzbekistan Highlights",
    rating: 5,
  },
  {
    id: 3,
    name: "Aisha Al Mansoori",
    country: "United Arab Emirates",
    flag: "ae",
    avatar: "/img/avatars/testimonials/3.png",
    text: "Our custom itinerary was exactly what we wanted. Professional service from arrival to departure.",
    tour: "Custom Private Tour",
    rating: 5,
  },
];

export const features = [
  {
    id: 1,
    icon: "/img/featureIcons/1/1.svg",
    title: "Private Tours Only",
    text: "No mixed groups. Every tour is designed and delivered privately for you.",
    delayAnim: "100",
  },
  {
    id: 2,
    icon: "/img/featureIcons/1/2.svg",
    title: "Expert Local Guide",
    text: "Licensed local guidance with deep cultural and historical knowledge.",
    delayAnim: "200",
  },
  {
    id: 3,
    icon: "/img/featureIcons/1/3.svg",
    title: "All-Inclusive Service",
    text: "Transport, accommodation, planning, and support managed in one place.",
    delayAnim: "300",
  },
];

export const guide = {
  name: "Samandar Ikromov",
  title: "Private Uzbekistan Tour Guide",
  bio: "Samandar helps travelers experience Uzbekistan through authentic local stories, smooth logistics, and carefully curated private routes.",
  photo: "/img/team/1.png",
  stats: [
    { num: "8+", label: "Years Experience" },
    { num: "500+", label: "Private Guests" },
    { num: "4.9/5", label: "Average Rating" },
  ],
};

export const contact = {
  phone: "+998 99 062 17 36",
  whatsapp: "https://wa.me/998990621736",
  telegram: "https://t.me/traveleasyuz",
  facebook: "https://facebook.com/traveleasyuz",
  instagram: "https://instagram.com/traveleasyuz",
  email: "info@travel-easy.uz",
  location: "Tashkent, Uzbekistan",
};

export const defaultSettings = baseDefaultSettings;

const kashfData = {
  tours,
  testimonials,
  features,
  guide,
  contact,
};

export default kashfData;
