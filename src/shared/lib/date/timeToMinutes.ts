export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;

  const [hours = 0, minutes = 0] = timeStr.split(":").map(Number);

  return hours * 60 + minutes;
}

export function getDurationInHours(startAt: string, endAt: string): number {
  const durationMins = timeToMinutes(endAt) - timeToMinutes(startAt);

  return Number((durationMins / 60).toFixed(2));
}
