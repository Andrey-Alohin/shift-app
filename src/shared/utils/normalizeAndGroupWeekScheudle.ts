import { Group, ShiftType, User, WeeklySchedule } from "../api";
import { canManageShift } from "../lib/range/persmissions";

interface NormalizeArguments {
  schedule: WeeklySchedule;
  weekBounds: {
    startAt: string;
    endAt: string;
  };
  currentUser: User;
}

export interface NormalizedShift {
  _id: string;
  user: User;
  type: ShiftType;
  isOutstaffIn: boolean;
  isOutstaffOut: boolean;
  isMe: boolean;
  timelineBounds: {
    startHour: string;
    endHour: string;
  };
  originGroup: Group;
  canEdit: boolean;
  startAt: string;
  endAt: string;
  relatedGroup?: Group;
}

export interface NormalizedDay {
  uiDate: string;
  isToday: boolean;
  shifts: NormalizedShift[];
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
): Record<string, NormalizedDay> => {
  const skeletonWeek: Record<string, NormalizedDay> = {};
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
}: NormalizeArguments) {
  const currentGroup = currentUser.groupId as Group;
  const normalizedWeekScheudle: Record<string, NormalizedDay> =
    generateSkeletonWeekScheudle(weekBounds.startAt, weekBounds.endAt);

  schedule.forEach((rawShift) => {
    const userObj = rawShift.user as User;
    const originGroup = rawShift.originGroupId as Group;
    const actualGroup = rawShift.actualGroupId as Group;

    const isOutstaffIn =
      currentGroup._id === actualGroup._id &&
      currentGroup._id !== originGroup._id;

    const isOutstaffOut =
      currentGroup._id === originGroup._id &&
      currentGroup._id !== actualGroup._id;

    const dayIndex = new Date(rawShift.startAt).getDay();

    const { openTime: startHour, closeTime: endHour } =
      actualGroup.schedule[dayIndex === 0 ? 6 : dayIndex - 1];

    const normalizedShift: NormalizedShift = {
      _id: rawShift._id,
      user: userObj,
      type: rawShift.type,
      isOutstaffIn,
      isOutstaffOut,
      originGroup,
      timelineBounds: {
        startHour,
        endHour,
      },
      canEdit: false,
      isMe: userObj._id === currentUser._id,
      startAt: formatToKyivTime(rawShift.startAt),
      endAt: formatToKyivTime(rawShift.endAt),

      ...((isOutstaffIn || isOutstaffOut) && {
        relatedGroup: isOutstaffIn ? originGroup : actualGroup,
      }),
    };

    normalizedShift.canEdit = canManageShift(currentUser, normalizedShift);

    const dateKey = formatToKyivDate(rawShift.startAt);

    if (normalizedWeekScheudle[dateKey]) {
      normalizedWeekScheudle[dateKey].shifts.push(normalizedShift);
    }
  });

  Object.values(normalizedWeekScheudle).forEach((day) => {
    day.shifts.sort((a, b) => {
      if (a.isMe !== b.isMe) {
        return Number(b.isMe) - Number(a.isMe);
      }
      return a.startAt.localeCompare(b.startAt);
    });
  });

  return normalizedWeekScheudle;
}

export type NormalizedWeekSchedule = Record<string, NormalizedDay>;
