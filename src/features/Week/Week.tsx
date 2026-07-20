import { NormalizedWeekSchedule } from "@/shared/utils/normalizeAndGroupWeekScheudle";

interface WeekProps {
  weekSchedule: NormalizedWeekSchedule;
}

export default function Week({ weekSchedule }: WeekProps) {
  return <div className="flex md:flex-row sm:overflow-hidden"></div>;
}
