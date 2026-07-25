import { normalizedDay } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import clsx from "clsx";
import ShiftsGroup from "../ShiftsGroup/ShiftsGroup";

interface DayCardProps {
  day: normalizedDay;
}

export default function DayCard({ day }: DayCardProps) {
  const { isToday, uiDate, shifts } = day;
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
      <ShiftsGroup shifts={shifts} />
    </div>
  );
}
