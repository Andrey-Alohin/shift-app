"use client";
import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { useEffect, useRef, useState } from "react";
import DayCard from "../DayCard/DayCard";
import { formatToKiyvDateShort } from "@/shared/lib/date";
import { cn } from "@/shared/utils";

interface DayTabs {
  schedule: NormalizedWeekSchedule;
  activeDay: string;
}

export default function DayTabs({ schedule, activeDay }: DayTabs) {
  const [day, setDay] = useState(activeDay);

  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [day]);

  return (
    <div className="container mx-auto">
      <ul className="flex flex-row border-b-2 py-2 overflow-x-auto justify-center gap-3 md:overflow-visible md:justify-between">
        {Object.keys(schedule).map((dayKey) => {
          const isActive = day === dayKey;
          return (
            <li
              ref={isActive ? activeItemRef : null}
              key={dayKey}
              className={cn(
                "border rounded-xl",
                isActive && "text-accent border-accent",
              )}
            >
              <button
                className={cn("text-secondary p-2", isActive && "text-accent")}
                onClick={() => setDay(dayKey)}
              >
                {formatToKiyvDateShort(dayKey)}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <h2 className="text-center">{day}</h2>
        <DayCard day={schedule[day]} />
      </div>
    </div>
  );
}
