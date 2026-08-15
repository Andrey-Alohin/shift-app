const timeToHours = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours + minutes / 60;
};

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
  const timelineStartNumber = bound;
}
