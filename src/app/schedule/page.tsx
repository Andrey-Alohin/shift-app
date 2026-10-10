import { formatToKiyvDate } from "@/shared/lib/date";
import { setDate } from "date-fns";
import { redirect } from "next/navigation";

const getCurrentMonday = () => {
  const today = new Date();
  console.log(today);
  const day = today.getDay() === 0 ? 6 : today.getDay();
  const monday = setDate(today, today.getDate() - day);
  return formatToKiyvDate(monday);
};

export default function ScheduleRootPage() {
  const currentMonday = getCurrentMonday();

  redirect(`/schedule/${currentMonday}`);
}
