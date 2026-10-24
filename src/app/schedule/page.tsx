import { formatToKiyvDate, getMondayFromDay } from "@/shared/lib/date";
import { redirect } from "next/navigation";

export default function ScheduleRootPage() {
  const currentMonday = formatToKiyvDate(getMondayFromDay(new Date()));

  redirect(`/schedule/${currentMonday}`);
}
