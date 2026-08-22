import { timeToMinutes } from "@/shared/lib/date";

interface TimeLineBounds {
  startHour: string;
  endHour: string;
}

interface ShiftPosition {
  start: number;
  width: number;
}

export function calculateRange(
  startAt: string,
  endAt: string,
  bounds: TimeLineBounds,
): ShiftPosition {
  const timelineStartNumber = timeToMinutes(bounds.startHour) ?? 0;
  const timelineEndNumber = timeToMinutes(bounds.endHour) ?? 0;

  const totalTimeLineMinutes =
    timelineEndNumber > timelineStartNumber
      ? timelineEndNumber - timelineStartNumber
      : 24 * 60;

  const timeStart = timeToMinutes(startAt);

  const rawTimeEnd = timeToMinutes(endAt);

  const timeEnd = rawTimeEnd <= timeStart ? rawTimeEnd + 24 * 60 : rawTimeEnd;

  const start =
    timeStart > timelineStartNumber
      ? ((timeStart - timelineStartNumber) * 100) / totalTimeLineMinutes
      : 0;
  const width = ((timeEnd - timeStart) * 100) / totalTimeLineMinutes;

  return { start, width };
}
