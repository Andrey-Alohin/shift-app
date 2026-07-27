import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import DayCard from "../DayCard/DayCard";

interface WeekProps {
  weekSchedule: NormalizedWeekSchedule;
}

export default function Week({ weekSchedule }: WeekProps) {
  return (
    <div className="w-full overflow-x-auto grid grid-cols-7 min-w-[1100px] gap-2 p-4">
      {Object.values(weekSchedule).map((day) => (
        <DayCard key={day.uiDate} day={day} />
      ))}
    </div>
  );
}
