import { WeekView } from "@/features/Week/types";
import { redirect } from "next/navigation";
import {
  formatToKiyvDate,
  getMondayFromDay,
  isDayInWeek,
} from "@/shared/lib/date";
import { ScheduleViewer } from "@/widgets/schedule-viewer/ui/ScheduleViewer";
import { parseISO } from "date-fns";
import { getServerUser } from "@/entities/user/api/getServerUser";
import { getServerSchedule } from "@/entities/shift/api/getServerSchedule";
import { ScheduleEditor } from "@/widgets/schedule-editor/ui/ScheduleEditor";
import { Role } from "@/shared/api";

interface PageProps {
  params: Promise<{ currentMonday: string }>;
  searchParams: Promise<{ view?: WeekView }>;
}

export default async function Schedule({ params, searchParams }: PageProps) {
  const { currentMonday: mondayStr } = await params;
  const day = parseISO(mondayStr);

  if (day.getDay() !== 1) {
    const monday = formatToKiyvDate(getMondayFromDay(day));

    return redirect(`/schedule/${monday}`);
  }
  const { view = WeekView.Week } = await searchParams;
  const todayStr = formatToKiyvDate(new Date());
  let activeDay;
  if (isDayInWeek(todayStr, mondayStr)) {
    activeDay = todayStr;
  } else {
    activeDay = formatToKiyvDate(mondayStr);
  }
  const [currentUser, backendData] = await Promise.all([
    getServerUser(),
    getServerSchedule(mondayStr),
  ]);
  const isManager = currentUser.role === Role.Manager;
  return (
    <main>
      {!isManager && (
        <ScheduleViewer
          mondayStr={mondayStr}
          view={view}
          activeDay={activeDay}
        />
      )}
      {isManager && (
        <ScheduleEditor
          mondayStr={mondayStr}
          view={view}
          activeDay={activeDay}
          currentUser={currentUser}
          backendData={backendData}
        />
      )}
    </main>
  );
}
