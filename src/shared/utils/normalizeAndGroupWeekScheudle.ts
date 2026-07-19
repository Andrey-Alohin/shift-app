import { Group, ShiftType, User, WeeklySchedule } from "../api";

interface normalizeArguments {
  schedule: WeeklySchedule;
  weekBounds: {
    startAt: string;
    endAt: string;
  };
  currentUser: User;
}

interface normalizedShift {
  _id: string;
  user: User;
  type: ShiftType;
  isOutstaffIn: boolean;
  isOutstaffOut: boolean;
  isMe: boolean;
  startAt: string;
  endAt: string;
}

interface normalizedDay {
  uiDate: string;
  isToday: boolean;
  shifts: normalizedShift[];
}

const formatterToKiyvDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Kyiv",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formatterToKiyvTime = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Kyiv",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const formatToKyivDate = (isoString: string | Date): string =>
  formatterToKiyvDate.format(new Date(isoString));

const formatToKyivTime = (isoString: string | Date): string =>
  formatterToKiyvTime.format(new Date(isoString));

const isToday = (dateIso: string | Date): boolean => {
  const today = new Date();
  const dateIn = new Date(dateIso);

  return (
    formatterToKiyvDate.format(today) === formatterToKiyvDate.format(dateIn)
  );
};

const generateSkeletonWeekScheudle = (
  startISO: string,
  endISO: string,
): Record<string, normalizedDay> => {
  const skeletonWeek: Record<string, normalizedDay> = {};
  const current = new Date(startISO);
  const end = new Date(endISO);
  while (current <= end) {
    const formatedDate = formatToKyivDate(current.toISOString());
    skeletonWeek[formatedDate] = {
      uiDate: formatedDate,
      isToday: isToday(current),
      shifts: [],
    };
    current.setDate(current.getDate() + 1);
  }
  return skeletonWeek;
};

export default function normalizeAndGroupWeekScheudle({
  schedule,
  weekBounds,
  currentUser,
}: normalizeArguments) {
  const currentGroup = currentUser.groupId as Group;
  const normalizedWeekScheudle: Record<string, normalizedDay> =
    generateSkeletonWeekScheudle(weekBounds.startAt, weekBounds.endAt);

  schedule.forEach((rawShift) => {
    const userObj = rawShift.user as User;
    const originGroup = rawShift.originGroupId as Group;
    const actualGroup = rawShift.actualGroupId as Group;

    const normalizedShift: normalizedShift = {
      _id: rawShift._id,
      user: userObj,
      type: rawShift.type,
      isOutstaffIn:
        currentGroup._id === actualGroup._id &&
        currentGroup._id !== originGroup._id,
      isOutstaffOut:
        currentGroup._id === originGroup._id &&
        currentGroup._id !== actualGroup._id,
      isMe: userObj._id === currentUser._id,
      startAt: formatToKyivTime(rawShift.startAt),
      endAt: formatToKyivTime(rawShift.endAt),
    };

    const dateKey = formatToKyivDate(rawShift.startAt);

    if (normalizedWeekScheudle[dateKey]) {
      normalizedWeekScheudle[dateKey].shifts.push(normalizedShift);
    }
  });
  return normalizedWeekScheudle;
}
