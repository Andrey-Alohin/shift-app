import { ShiftType } from "@/shared/api";
import { cn } from "@/shared/utils";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";

interface ShiftPillProps {
  shift: NormalizedShift;
}

const getPillAppearance = (shift: NormalizedShift): string => {
  const { type, isOutstaffOut } = shift;

  if (isOutstaffOut) {
    return "bg-amber-500/20 border-amber-500/30 text-amber-700 dark:text-amber-400";
  }

  const styles: Partial<Record<ShiftType, string>> = {
    [ShiftType.DayOff]: "bg-muted border-border text-muted-foreground",
    [ShiftType.Vacation]:
      "bg-green-500/20 border-green-500/30 text-green-700 dark:text-green-400",
    [ShiftType.SickLeave]:
      "bg-yellow-500/20 border-yellow-500/30 text-yellow-700 dark:text-yellow-400",
  };
  return styles[type] || styles[ShiftType.DayOff]!;
};

const getPillLabel = (shift: NormalizedShift): string => {
  if (shift.isOutstaffOut) {
    return `Аутстаф: ${shift.relatedGroup?.name}`;
  }
  switch (shift.type) {
    case ShiftType.DayOff:
      return "Вихідний";
    case ShiftType.Vacation:
      return "Відпустка";
    case ShiftType.SickLeave:
      return "Лікарняний";
    default:
      return shift.type;
  }
};

export default function ShiftPill({ shift }: ShiftPillProps) {
  const appearance = getPillAppearance(shift);
  const label = getPillLabel(shift);

  return (
    <div
      className={cn(
        "px-1.5 py-0.5 rounded-md text-[11px] font-medium border whitespace-nowrap",
        appearance,
      )}
      title={`${shift.user.name}: ${label}`}
    >
      {label}
    </div>
  );
}
