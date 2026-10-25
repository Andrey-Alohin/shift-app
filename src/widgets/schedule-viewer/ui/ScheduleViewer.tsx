import { getServerSchedule } from "@/entities/shift/api/getServerSchedule";
import { getServerUser } from "@/entities/user/api/getServerUser";
import { WeekView } from "@/features/Week/types";
import Week from "@/features/Week/Week";
import normalizeAndGroupWeekSchedule from "@/shared/utils/normalizeAndGroupWeekScheudle";

interface ScheduleViewerProps {
  mondayStr: string;
  view: WeekView;
  activeDay: string;
}

export async function ScheduleViewer({
  mondayStr,
  view,
  activeDay,
}: ScheduleViewerProps) {
  const currentUser = await getServerUser();
  const { shifts, weekBounds } = await getServerSchedule(mondayStr);
  const schedule = normalizeAndGroupWeekSchedule({
    schedule: shifts,
    weekBounds,
    currentUser,
  });
  return (
    <section>
      <Week weekSchedule={schedule} view={view} day={activeDay} />
    </section>
  );
}
