"use client";

import { WeekView } from "@/features/Week/types";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback } from "react";

interface ScheduleToolBarProps {
  currentMonday: string;
  weekBounds: {
    start: string;
    end: string;
  };
  view: WeekView;
  mode: "view" | "edit";
  activeDay: string;
}

export default function ScheduleToolBar({
  currentMonday,
  weekBounds,
  view,
  mode = "view",
  activeDay,
}: ScheduleToolBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const today = new Date();

  const updateURLParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const handleCurrentWeek = () => {
    redirect(`/schedule/${today.toISOString().split("T")[0]}`);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentMonday.setDate(today.getDate() + 7));
    console.log(nextWeek);
    redirect(`/schedule/${nextWeek.toISOString().split("T")[0]}`);
  };

  const handlePrevWeek = () => {
    const prevWeek = currentMonday.setDate(today.getDate() - 7);
    redirect(`/schedule/${prevWeek}`);
  };

  return (
    <div>
      <button onClick={() => handlePrevWeek()}>Попередній тиждень</button>
      <button onClick={() => handleCurrentWeek()}>Поточний тиждень</button>
      <button onClick={() => handleNextWeek()}>Наступний тиждень</button>
    </div>
  );
}
