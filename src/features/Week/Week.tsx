import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import DayCard from "../DayCard/DayCard";

interface WeekProps {
  weekSchedule: NormalizedWeekSchedule;
}

export default function Week({ weekSchedule }: WeekProps) {
  return (
    <ul className="w-full overflow-x-hidden lg:overflow-x-auto lg:grid lg:grid-cols-7 gap-2 pb-4">
      {Object.values(weekSchedule).map((day) => (
        <DayCard key={day.uiDate} day={day} />
      ))}
    </ul>
  );
}
