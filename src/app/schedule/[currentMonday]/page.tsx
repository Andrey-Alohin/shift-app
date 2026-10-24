import { WeekView } from "@/features/Week/types";
import { redirect } from "next/navigation";
import {
  formatToKiyvDate,
  getMondayFromDay,
  isDayInWeeK,
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
  const activeDay =
    view === WeekView.Day
      ? date && isDayInWeeK(date, mondayStr)
        ? formatToKiyvDate(date)
        : isDayInWeeK(new Date().toISOString(), mondayStr) &&
          formatToKiyvDate(new Date()) : redirect(`/schedule/${date}?day=${date}`)
      : formatToKiyvDate(new Date()) || mondayStr;
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
