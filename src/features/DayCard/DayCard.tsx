import ShiftCard from "@/entities/shift/ui/ShifCard";
import { splitShiftByList } from "@/entities/weekScheudle/lib/splitShiftsByList";
import { normalizedDay } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import clsx from "clsx";

interface DayCardProps {
  day: normalizedDay;
}

export default function DayCard({ day }: DayCardProps) {
  const { isToday, uiDate, shifts } = day;
  const { topList, bottomList } = splitShiftByList(shifts);
  return (
    <div
      className={clsx(
        "flex flex-col rounded-xl border-accent",
        isToday && "border-primary/40",
      )}
    >
      <div className="bg-primary/10">
        <h2>{uiDate}</h2>
      </div>
      {topList.length > 0 && (
        <div className="bg-amber-400 p-1.5 rounded-md flex gap-2 relative justify-stretch">
          <div className="h-44 w-[100%] border-2 p-2 top-0 right-0 rounded-md border-amber-950 absolute"></div>
          {topList.map((shift) => (
            <ShiftCard key={shift._id} shift={shift} />
          ))}
        </div>
      )}
      {bottomList.length > 0 && (
        <div className="bg-green-400 p-1.5 rounded-md">
          {bottomList.map((shift) => (
            <ShiftCard key={shift._id} shift={shift} />
          ))}
        </div>
      )}
    </div>
  );
}
