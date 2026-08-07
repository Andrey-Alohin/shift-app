import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import DayCard from "../DayCard/DayCard";

interface WeekProps {
  weekSchedule: NormalizedWeekSchedule;
}

export default function Week({ weekSchedule }: WeekProps) {
  return (
    <ul className="w-full overflow-x-hidden xl:overflow-x-auto xl:grid xl:grid-cols-7 gap-2 pb-4">
      {Object.values(weekSchedule).map((day) => (
        <DayCard key={day.uiDate} day={day} />
      ))}
    </ul>
  );
}
