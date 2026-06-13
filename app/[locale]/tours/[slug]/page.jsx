import TourDetailsClient from "./TourDetailsClient";
import { tours as staticTours } from "@/data/travelEasy";
import { getPublishedTours, getTourById } from "@/lib/tours";

const serialize = (value) => JSON.parse(JSON.stringify(value));

export default async function TourDetailsPage({ params }) {
  const { slug } = await params;
  const [remoteTour, remoteTours] = await Promise.all([
    getTourById(slug).catch(() => null),
    getPublishedTours(8).catch(() => []),
  ]);
  const tour = remoteTour || staticTours.find((item) => item.id === slug) || null;
  const relatedTours = (remoteTours.length ? remoteTours : staticTours)
    .filter((item) => item.id !== slug)
    .slice(0, 3);

  return (
    <TourDetailsClient
      initialTour={tour ? serialize(tour) : null}
      relatedTours={serialize(relatedTours)}
    />
  );
}
