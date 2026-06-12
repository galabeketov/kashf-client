import {
  LuBriefcase,
  LuCar,
  LuDollarSign,
  LuGrid2X2,
  LuMapPin,
  LuPlane,
  LuUser,
} from "@/components/shared/Icons";

const ICONS = {
  grid: LuGrid2X2,
  map: LuMapPin,
  car: LuCar,
  plane: LuPlane,
  user: LuUser,
  briefcase: LuBriefcase,
  currency: LuDollarSign,
};

export default function ServiceIcon({ name, size = 18, ...props }) {
  const Icon = ICONS[name] || LuGrid2X2;
  return <Icon size={size} {...props} />;
}
