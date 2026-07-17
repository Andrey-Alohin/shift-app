import { WeeklySchedule } from "@/shared/api";

interface WeekProps {
  schedule: WeeklySchedule;
  weekBounds: {
    start: string;
    end: string;
  };
}

export default function Week({ schedule, weekBounds }: WeekProps) {
  const today = new Date().getDate();
  const weekStart = new Date(weekBounds.start);
  const weekEnd = new Date(weekBounds.end);

  return <div className="flex md:flex-row sm:overflow-hidden"></div>;
}
