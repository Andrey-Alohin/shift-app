"use client";

import { usePathname, useRouter } from "next/navigation";
import { WeekView } from "@/features/Week/types";
import { cn } from "@/shared/utils";

interface ViewModeSwitcherProps {
  value: WeekView;
  defaultView?: WeekView;
  className?: string;
}

export function ViewModeSwitcher({
  value,
  defaultView = WeekView.Week,
  className,
}: ViewModeSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectView = (nextView: WeekView) => {
    if (nextView === value) return;

    // Створюємо чистий набір параметрів — жодних зайвих query-ключів
    const params = new URLSearchParams();
    if (nextView !== defaultView) {
      params.set("view", nextView);
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(nextUrl, { scroll: false });
  };

  return (
    <div
      role="group"
      aria-label="Режим відображення розкладу"
      className={cn(
        "inline-flex items-center rounded-xl border border-border bg-secondary/60 p-1 gap-1",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => handleSelectView(WeekView.Week)}
        aria-pressed={value === WeekView.Week}
        className={cn(
          "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
          value === WeekView.Week
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Тиждень
      </button>

      <button
        type="button"
        onClick={() => handleSelectView(WeekView.Day)}
        aria-pressed={value === WeekView.Day}
        className={cn(
          "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
          value === WeekView.Day
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        День
      </button>
    </div>
  );
}
