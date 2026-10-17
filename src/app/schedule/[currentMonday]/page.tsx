import Week from "@/features/Week/Week";
import normalizeAndGroupWeekScheudle from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { mockNormalizeArguments } from "../mockData";
import { WeekView } from "@/features/Week/types";
import { setDate } from "date-fns";
import { redirect } from "next/navigation";
import { formatToKiyvDate } from "@/shared/lib/date";
import { getWeeklySchedule } from "@/shared/api/schedule";
import { cookies } from "next/headers";
import { ScheduleViewer } from "@/widgets/schedule-viewer/ui/ScheduleViewer";

interface PageProps {
  params: Promise<{ currentMonday: string }>;
  searchParams: Promise<{ view?: WeekView; date?: string; mode?: string }>;
}

export default async function Schedule({ params, searchParams }: PageProps) {
  const { currentMonday: mondayStr } = await params;
  const day = new Date(mondayStr);

  if (day.getDay() !== 1) {
    const days = day.getDay() === 0 ? 6 : day.getDay() - 1;
    console.log(day, days);
    const trueDay = setDate(day, day.getDate() - days);
    const monday = formatToKiyvDate(trueDay.toISOString());

    return redirect(`/schedule/${monday}`);
  }
  const { view = WeekView.Week, date, mode } = await searchParams;
  const activeDay = date || mondayStr;
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
