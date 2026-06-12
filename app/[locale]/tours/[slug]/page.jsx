import TourDetailsClient from "./TourDetailsClient";
import { tours as staticTours } from "@/data/travelEasy";
import { getTourById } from "@/lib/tours";

const serialize = (value) => JSON.parse(JSON.stringify(value));

export default async function TourDetailsPage({ params }) {
  const { slug } = await params;
  const remoteTour = await getTourById(slug).catch(() => null);
  const tour = remoteTour || staticTours.find((item) => item.id === slug) || null;

  return <TourDetailsClient initialTour={tour ? serialize(tour) : null} />;
}
