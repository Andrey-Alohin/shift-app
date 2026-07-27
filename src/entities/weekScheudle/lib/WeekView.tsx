import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import DayCard from "./DayCard";

interface WeekViewProps {
  weekSchedule: NormalizedWeekSchedule;
}

export default function WeekView({ weekSchedule }: WeekViewProps) {
  const days = Object.values(weekSchedule);

  if (days.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Немає даних для відображення.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex space-x-4">
        {days.map((day) => (
          <DayCard key={day.uiDate} day={day} />
        ))}
      </div>
    </div>
  );
}
