import { ShiftType } from "@/shared/api";
import { createRangeCalculator } from "@/shared/lib/range";
import { cn } from "@/shared/utils";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";

interface ShiftBlockProps {
  shift: NormalizedShift;
  isSmall?: boolean;
}

/**
 * Converts time "HH:MM" to a percentage of the day.
 */
const timeToPercentage = (time: string): number => {
  if (!time || !time.includes(":")) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  // Total minutes in a day is 24 * 60 = 1440
  return (totalMinutes / 780) * 100;
};

const getShiftStyles = (shift: NormalizedShift) => {
  const { startAt, endAt, type } = shift;

  // For full-day shifts, just take up the whole space
  if (
    type === ShiftType.DayOff ||
    type === ShiftType.Vacation ||
    type === ShiftType.SickLeave
  ) {
    return { left: "0%", width: "100%" };
  }

  const startPercent = timeToPercentage(startAt);
  let endPercent = timeToPercentage(endAt);

  // Handle overnight shifts where end time is "00:00" or smaller than start time
  if (endAt === "00:00" || (endPercent <= startPercent && endAt !== "00:00")) {
    endPercent = 100;
  }

  // A special case from mock data: 23:59 should be treated as end of day
  if (endAt === "23:59") {
    endPercent = 100;
  }

  const width = Math.max(0, endPercent - startPercent);

  return {
    left: `${startPercent}%`,
    width: `${width}%`,
  };
};

const getShiftAppearance = (type: ShiftType): string => {
  const styles: Record<ShiftType, string> = {
    [ShiftType.Work]: "bg-primary/80 border-primary text-primary-foreground",
    [ShiftType.DayOff]: "bg-muted border-border text-muted-foreground",
    [ShiftType.Vacation]:
      "bg-green-500/20 border-green-500/30 text-green-700 dark:text-green-400",
    [ShiftType.SickLeave]:
      "bg-yellow-500/20 border-yellow-500/30 text-yellow-700 dark:text-yellow-400",
  };
  return styles[type] || styles[ShiftType.DayOff];
};

const getShiftLabel = (shift: NormalizedShift): string => {
  if (shift.type === ShiftType.Work) {
    return `${shift.startAt} - ${shift.endAt}`;
  }
  return ""; // Other types are handled by ShiftPill
};

export default function ShiftBlock({
  shift,
  isSmall = false,
}: ShiftBlockProps) {
  const getRenge = createRangeCalculator(8, 21);
  const timeStart = Number(
    shift.startAt.split(":")[0] + "." + Number(shift.startAt.split(":")[1]),
  );
  const timeEnd = Number(
    shift.endAt.split(":")[0] + "." + Number(shift.endAt.split(":")[1]),
  );
  const style = getRenge(timeStart, timeEnd);
  const appearance = getShiftAppearance(shift.type);
  const label = getShiftLabel(shift);

  console.log(shift._id, shift.startAt, timeStart, timeEnd, style);

  return (
    <div
      className={cn(
        "absolute rounded-lg px-2 flex items-center justify-center overflow-hidden group border",
        isSmall ? "h-8" : "h-10",
        appearance,
      )}
      style={{
        width: `${style.width}%`,
        left: `${style.left}%`,
        borderLeft: `1px #333fff solid`,
      }}
      title={`${shift.user.name}: ${label}`}
    >
      <div
        className={cn("text-xs font-medium text-center whitespace-nowrap px-1")}
      >
        {label}
      </div>
    </div>
  );
}
