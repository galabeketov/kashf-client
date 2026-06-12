import ToursClient from "./ToursClient";
import { tours as staticTours } from "@/data/travelEasy";
import { getPublishedTours } from "@/lib/tours";

const serialize = (value) => JSON.parse(JSON.stringify(value));

export default async function ToursPage() {
  const remoteTours = await getPublishedTours().catch(() => []);
  const tours = remoteTours.length ? remoteTours : staticTours;

  return <ToursClient initialTours={serialize(tours)} />;
}
