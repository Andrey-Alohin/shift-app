import clsx from "clsx";
import React from "react";

interface DayCardProps {
  day: string;
  isToday: boolean;
  children: React.ReactNode;
}

export default function DayCard({ day, isToday, children }: DayCardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col rounded-xl border-accent",
        isToday && "border-primary/40",
      )}
    >
      <div className="bg-primary/10">
        <h2>{day}</h2>
      </div>
      {children}
    </div>
  );
}
