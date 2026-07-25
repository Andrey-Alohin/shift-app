import { ShiftType } from "@/shared/api";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";

export const splitShiftByList = (
  shifts: NormalizedShift[],
): { topList: NormalizedShift[]; bottomList: NormalizedShift[] } => {
  const topList: NormalizedShift[] = [];
  const bottomList: NormalizedShift[] = [];

  shifts.forEach((shift) => {
    if (shift.type === ShiftType.Work && !shift.isOutstaffOut) {
      topList.push(shift);
    } else {
      bottomList.push(shift);
    }
  });

  return { topList, bottomList };
};
