import { WeekView } from "@/features/Week/types";
import { redirect } from "next/navigation";
import {
  formatToKiyvDate,
  getMondayFromDay,
  isDayInWeek,
} from "@/shared/lib/date";
import { ScheduleViewer } from "@/widgets/schedule-viewer/ui/ScheduleViewer";
import { isValid } from "date-fns";

interface PageProps {
  params: Promise<{ currentMonday: string }>;
  searchParams: Promise<{ view?: WeekView; date?: string; mode?: string }>;
}

export default async function Schedule({ params, searchParams }: PageProps) {
  const { currentMonday: mondayStr } = await params;
  const day = new Date(mondayStr);
  console.log(day);

  if (day.getDay() !== 1) {
    const monday = formatToKiyvDate(getMondayFromDay(day));

    return redirect(`/schedule/${monday}`);
  }
  const { view = WeekView.Week, date, mode } = await searchParams;
  const rawDay =
    date && isValid(new Date(date)) ? new Date(date).toISOString() : mondayStr;
  const today = new Date();
  let activeDay;
  if (isDayInWeek(rawDay, mondayStr)) {
    activeDay = formatToKiyvDate(rawDay);
  } else if (isDayInWeek(today.toISOString(), mondayStr)) {
    activeDay = formatToKiyvDate(today.toISOString());
  } else {
    activeDay = rawDay;
  }
  return (
    <main>
      <div className=" container m-auto">
        <ScheduleViewer
          mondayStr={mondayStr}
          view={view}
          activeDay={activeDay}
        />
      </div>
    </main>
  );
}
