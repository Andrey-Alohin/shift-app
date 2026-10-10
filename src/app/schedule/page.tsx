import { formatToKiyvDate } from "@/shared/lib/date";
import { setDate } from "date-fns";
import { redirect } from "next/navigation";

const getCurrentMonday = () => {
  const today = new Date();
  const day = today.getDay();
  const monday = setDate(today, today.getDate() - day === 0 ? 6 : day - 1);
  return formatToKiyvDate(monday);
};

export default function ScheduleRootPage() {
  const currentMonday = getCurrentMonday();

  redirect(`/schedule/${currentMonday}`);
}
