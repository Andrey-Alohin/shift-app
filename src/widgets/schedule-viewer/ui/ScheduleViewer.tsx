import { WeekView } from "@/features/Week/types";
import Week from "@/features/Week/Week";
import { PopulatedUser, Shift } from "@/shared/api";
import normalizeAndGroupWeekSchedule from "@/shared/utils/normalizeAndGroupWeekSchedule";

interface ScheduleViewerProps {
  currentUser: PopulatedUser;
  shifts: Shift[];
  weekBounds: {
    start: string;
    end: string;
  };
  view: WeekView;
  activeDay: string;
}

export function ScheduleViewer({
  shifts,
  weekBounds,
  currentUser,
  view,
  activeDay,
}: ScheduleViewerProps) {
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
