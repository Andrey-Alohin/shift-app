import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import DayCard from "../DayCard/DayCard";
import { WeekView } from "./types";

interface WeekProps {
  weekSchedule: NormalizedWeekSchedule;
  view: WeekView;
  day: string;
}

export default function Week({ weekSchedule, view, day }: WeekProps) {
  console.log(weekSchedule[day], day);
  return (
    <>
      {(view === WeekView.Week && (
        <ul className="w-full overflow-x-hidden xl:overflow-x-auto xl:grid xl:grid-cols-7 gap-2 pb-4">
          {Object.values(weekSchedule).map((day) => (
            <DayCard key={day.uiDate} day={day} />
          ))}
        </ul>
      )) || (
        <>
          <DayCard day={weekSchedule[day]} />
        </>
      )}
    </>
  );
}
