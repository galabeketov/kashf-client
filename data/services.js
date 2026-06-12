export const SERVICE_CATALOG = [
  { slug: "services", href: "/services", key: "allServices", icon: "grid" },
  { slug: "tours", href: "/tours", key: "tours", icon: "map" },
  { slug: "rent-car", href: "/rent-car", key: "rentCar", icon: "car" },
  { slug: "transfer", href: "/transfer", key: "transfer", icon: "plane" },
  { slug: "driver", href: "/driver", key: "driver", icon: "user" },
  { slug: "business", href: "/business", key: "business", icon: "briefcase" },
  { slug: "currency", href: "/currency", key: "currency", icon: "currency" },
];

export const PRIMARY_SERVICES = SERVICE_CATALOG.filter(
  ({ slug }) => slug !== "services",
);

export const RENTAL_CARS = [
  {
    id: "chevrolet-cobalt",
    name: "Chevrolet Cobalt",
    image: "/img/services/cars/chevrolet-cobalt.webp",
    passengers: "1-4",
    translationIndex: 0,
  },
  {
    id: "chevrolet-malibu",
    name: "Chevrolet Malibu",
    image: "/img/services/cars/chevrolet-malibu.webp",
    passengers: "1-4",
    translationIndex: 1,
  },
  {
    id: "chevrolet-tracker",
    name: "Chevrolet Tracker",
    image: "/img/services/cars/chevrolet-tracker.webp",
    passengers: "1-4",
    translationIndex: 2,
  },
  {
    id: "toyota-prado",
    name: "Toyota Land Cruiser Prado",
    image: "/img/services/cars/toyota-prado.webp",
    passengers: "1-5",
    translationIndex: 3,
  },
  {
    id: "kia-carnival",
    name: "Kia Carnival",
    image: "/img/services/cars/kia-carnival.webp",
    passengers: "1-7",
    translationIndex: 4,
  },
  {
    id: "mercedes-sprinter",
    name: "Mercedes-Benz Sprinter",
    image: "/img/services/cars/mercedes-sprinter.webp",
    passengers: "1-16",
    translationIndex: 5,
  },
];

export const CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "RUB",
  "KZT",
  "CNY",
  "JPY",
  "KRW",
  "TRY",
  "AED",
  "SAR",
  "CHF",
  "CAD",
  "AUD",
  "UZS",
  "OTHER",
];
