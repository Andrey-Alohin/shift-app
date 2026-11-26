import { formatToKiyvDate, getMondayFromDay } from "@/shared/lib/date";
import { cn } from "@/shared/utils";
import { addDays } from "date-fns";
import Link from "next/link";

interface ScheduleToolBarProps {
  activeMonday: string;
}

export default function ScheduleToolBar({
  activeMonday,
}: ScheduleToolBarProps) {
  const currentMondayDate = getMondayFromDay(new Date());

  const items = [
    {
      label: "Попередній тиждень",
      monday: formatToKiyvDate(addDays(currentMondayDate, -7)),
    },
    {
      label: "Поточний тиждень",
      monday: formatToKiyvDate(currentMondayDate),
    },
    {
      label: "Наступний тиждень",
      monday: formatToKiyvDate(addDays(currentMondayDate, +7)),
    },
  ];

  return (
    <nav
      aria-label="Навігація по тижнях"
      className="flex items-center gap-2 p-1 overflow-scroll justify-center"
    >
      {items.map(({ label, monday }) => {
        const isCurrent = activeMonday === monday;
        return (
          <Link
            key={monday}
            href={`/schedule/${monday}`}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "px-3 py-1.5 rounded-xl border text-sm text-center font-medium transition-all",
              isCurrent
                ? "text-primary border-primary hover:translate-y-0.5"
                : "bg-card text-foreground border-border hover:bg-secondary hover:translate-y-1",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
