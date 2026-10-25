import { WeekView } from "@/features/Week/types";
import { redirect } from "next/navigation";
import {
  formatToKiyvDate,
  getMondayFromDay,
  isDayInWeek,
} from "@/shared/lib/date";
import { ScheduleViewer } from "@/widgets/schedule-viewer/ui/ScheduleViewer";
import { parseISO } from "date-fns";

interface PageProps {
  params: Promise<{ currentMonday: string }>;
  searchParams: Promise<{ view?: WeekView; mode?: string }>;
}

export default async function Schedule({ params, searchParams }: PageProps) {
  const { currentMonday: mondayStr } = await params;
  const day = parseISO(mondayStr);

  if (day.getDay() !== 1) {
    const monday = formatToKiyvDate(getMondayFromDay(day));

    return redirect(`/schedule/${monday}`);
  }
  const { view = WeekView.Week, mode = "view" } = await searchParams;
  const todayStr = formatToKiyvDate(new Date());
  let activeDay;
  if (isDayInWeek(todayStr, mondayStr)) {
    activeDay = todayStr;
  } else {
    activeDay = formatToKiyvDate(mondayStr);
  }
  return (
    <main>
      <ScheduleViewer mondayStr={mondayStr} view={view} activeDay={activeDay} />
    </main>
  );
}
