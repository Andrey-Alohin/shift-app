import { ShiftType } from "../api";

export const SHIFT_TYPE_LABELS: Record<ShiftType, string> = {
  [ShiftType.Work]: "Робоча зміна",
  [ShiftType.DayOff]: "Вихідний",
  [ShiftType.SickLeave]: "Лікарняний",
  [ShiftType.Vacation]: "Відпустка",
};

export const SHIFT_TYPE_OPTIONS = (
  Object.entries(SHIFT_TYPE_LABELS) as [ShiftType, string][]
).map(([value, label]) => ({
  value,
  label,
}));
