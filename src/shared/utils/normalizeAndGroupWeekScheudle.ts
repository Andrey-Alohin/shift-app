import { ShiftType, User, WeeklySchedule } from "../api";

interface normalizeArguments {
  schedule: WeeklySchedule;
  weekBounds?: {
    startAt: string;
    endAt: string;
  };
}

interface normalizedShift {
  _id: string;
  user: User;
  type: ShiftType;
  startAt: string;
  endAt: string;
}

interface normalizedDay {
  localDate: string;
  shifts: normalizedShift[];
}

const formatToKyivDate = (isoString: string): string => {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date);
};

const formatToKyivTime = (isoString: string): string => {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Kyiv",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formatter.format(date);
};

export default function normalizeAndGroupWeekScheudle({
  schedule,
  weekBounds,
}: normalizeArguments) {
  const normalizedWeekScheudle: Record<string, normalizedDay> = {};
  schedule.forEach((rawShift) => {
    const userObj = rawShift.user as User;

    const normalizedShift: normalizedShift = {
      _id: rawShift._id,
      user: userObj,
      type: rawShift.type,
      startAt: formatToKyivTime(rawShift.startAt),
      endAt: formatToKyivTime(rawShift.endAt),
    };

    const dateKey = formatToKyivDate(rawShift.startAt);

    if (!normalizedWeekScheudle[dateKey]) {
      normalizedWeekScheudle[dateKey] = {
        localDate: dateKey,
        shifts: [],
      };
    }
    normalizedWeekScheudle[dateKey].shifts.push(normalizedShift);
  });
  return normalizedWeekScheudle;
}
