import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import DayCard from "../DayCard/DayCard";

interface WeekProps {
  weekSchedule: NormalizedWeekSchedule;
}

export default function Week({ weekSchedule }: WeekProps) {
  return (
    <div className="flex md:flex-row sm:overflow-hidden">
      {Object.values(weekSchedule).map((day) => (
        <DayCard key={day.uiDate} day={day} />
      ))}
    </div>
  );
}
