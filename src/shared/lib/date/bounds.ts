import {
  endOfWeek,
  isValid,
  isWithinInterval,
  parseISO,
  startOfWeek,
} from "date-fns";
import { is } from "date-fns/locale";

export const getMondayFromDay = (day: string | Date): Date => {
  const date = typeof day === "string" ? parseISO(day) : day;

  const targetDate = isValid(date) ? date : new Date();

  return startOfWeek(targetDate, { weekStartsOn: 1 });
};

export const isDayInWeek = (dayStr: string, mondayStr: string): boolean => {
  try {
    const monday = parseISO(mondayStr);
    const targetDate = parseISO(dayStr);
    if (isNaN(monday.getTime()) || isNaN(targetDate.getTime())) {
      return false;
    }

    const start = startOfWeek(monday, { weekStartsOn: 1 });
    const end = endOfWeek(monday, { weekStartsOn: 1 });

    return isWithinInterval(targetDate, { start, end });
  } catch {
    return false;
  }
};
