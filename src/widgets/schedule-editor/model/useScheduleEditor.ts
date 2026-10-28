import { useState } from "react";
import { OperationShift, scheduleMerge } from "./schedule-merge";
import normalizeAndGroupWeekSchedule from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { Shift, User } from "@/shared/api";

interface UseScheduleEditor {
  rawShifts: Shift[];
  weekBounds: {
    start: string;
    end: string;
  };
  currentUser: User;
}

export function useScheduleEditor({
  rawShifts,
  weekBounds,
  currentUser,
}: UseScheduleEditor) {
  const oldShifts = rawShifts;
  const [operationShifts, setOperationShifts] = useState<OperationShift[]>([]);
  const mergedShifts = scheduleMerge({ rawShifts: oldShifts, operationShifts });

  const handleSetOperationShifts = (operation: OperationShift) => {};

  const normalizedShifts = normalizeAndGroupWeekSchedule({
    schedule: mergedShifts,
    weekBounds,
    currentUser,
  });

  return;
}
