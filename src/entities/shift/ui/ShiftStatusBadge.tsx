import { ShiftType } from "@/shared/api";
import { Badge, BadgeVariant } from "@/shared/ui/Badge";

interface ShiftStatusBadgeProps {
  type: ShiftType;
  groupName?: string;
  isOutIn: boolean;
  isOutOut: boolean;
  className?: string;
}

const STATIC_STATUSES: Partial<
  Record<ShiftType, { label: string; variant: BadgeVariant }>
> = {
  [ShiftType.SickLeave]: { label: "Лікарняний", variant: "rose" },
  [ShiftType.Vacation]: { label: "Відпустка", variant: "purple" },
  [ShiftType.DayOff]: { label: "Вихідний", variant: "slate" },
};

export function ShiftStatusBadge({
  type,
  groupName,
  isOutIn,
  isOutOut,
  className,
}: ShiftStatusBadgeProps) {
  const statusConfig = STATIC_STATUSES[type];

  if (statusConfig) {
    return (
      <Badge variant={statusConfig.variant} className={className}>
        {statusConfig.label}
      </Badge>
    );
  }

  if (isOutIn) {
    const txt = groupName || "З іншого відділення";
    return (
      <Badge
        variant="amber"
        className={className}
        title={`Працівник з: ${txt}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        {txt}
      </Badge>
    );
  }
  if (isOutOut) {
    const txt = groupName || "На іншому відділенні";
    return (
      <Badge variant="amber" className={className} title={txt}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        {txt}
      </Badge>
    );
  }

  return null;
}
