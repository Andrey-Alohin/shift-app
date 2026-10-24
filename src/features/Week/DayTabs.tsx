"use client";
import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { useRouter, useSearchParams } from "next/navigation";
import { WeekView } from "./types";

interface DayTabs {
  schedule: NormalizedWeekSchedule;
  activeDay: string;
}

export default function DayTabs({ schedule, activeDay }: DayTabs) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDayClick = (dayDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", dayDate);
    params.set("view", WeekView.Day);

    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex flex-row justify-between">
      <ul className="">
        {Object.keys(schedule).map((day) => (
          <li
            key={day}
            className={`${activeDay === day ? "border-accent" : "border-accent-foreground"} text-accent`}
          >
            <button onClick={() => handleDayClick(day)}>{day}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
