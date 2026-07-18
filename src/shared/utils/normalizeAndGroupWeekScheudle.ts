import { ShiftType, User, WeeklySchedule } from "../api";

interface normalizeArguments {
  schedule: WeeklySchedule;
  weekBounds: {
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
  uiDate: string;
  isToday: boolean;
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

const isToday = (dateIso: string): boolean => {
  const today = new Date();
  const dateIn = new Date(dateIso);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return formatter.format(today) === formatter.format(dateIn);
};

const generateWeekDays = (startISO: string, endISO: string): string[] => {
  const days: string[] = [];
  const current = new Date(startISO);
  const end = new Date(endISO);
  while (current <= end) {
    days.push(current.toISOString());
    current.setDate(current.getDate() + 1);
  }
  return days;
};

export default function normalizeAndGroupWeekScheudle({
  schedule,
  weekBounds,
}: normalizeArguments) {
  const normalizedWeekScheudle: Record<string, normalizedDay> = {};
  const weekDays = generateWeekDays(weekBounds.startAt, weekBounds.endAt);

  weekDays.forEach((dataKey) => {
    normalizedWeekScheudle[dataKey] = {
      uiDate: formatToKyivDate(dataKey),
      isToday: isToday(new Date(dataKey).toISOString()),
      shifts: [],
    };
  });

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

    normalizedWeekScheudle[dateKey].shifts.push(normalizedShift);
  });
  return normalizedWeekScheudle;
}
