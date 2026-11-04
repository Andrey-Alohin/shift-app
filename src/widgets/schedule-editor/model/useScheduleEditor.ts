import { useMemo, useState } from "react";
import { Operation, OperationShift, scheduleMerge } from "./schedule-merge";
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

  const [clipShift, setClipShift] = useState<OperationShift>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const mergedShifts = useMemo(() => {
    return scheduleMerge({ rawShifts: oldShifts, operationShifts });
  }, [oldShifts, operationShifts]);

  const handleSetCreateOperation = () => {
    setClipShift({
      operation: Operation.Create,
      shift: {
        _id: Date.now(),
      },
    });
  };

  const handleSetOperationShifts = (operation: OperationShift) => {};

  const normalizedShifts = normalizeAndGroupWeekSchedule({
    schedule: mergedShifts,
    weekBounds,
    currentUser,
  });

  return;
}
