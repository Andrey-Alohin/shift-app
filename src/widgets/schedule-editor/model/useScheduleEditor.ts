import { useMemo, useState } from "react";
import { Operation, OperationShift, scheduleMerge } from "./schedule-merge";
import normalizeAndGroupWeekSchedule from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { Group, Shift, ShiftType, User } from "@/shared/api";
import { set } from "date-fns";

interface UseScheduleEditor {
  rawShifts: Shift[];
  weekBounds: {
    start: string;
    end: string;
  };
  currentUser: User;
}

interface CreateClipShift {
  _id: string;
  user: User;
  actualGroupId: null;
  originGroupId: Group;
  type: ShiftType | null;
  startAt: string | null;
  endAt: string | null;
}

type ClipShift = {
  operation: Operation.Create;
  shift: CreateClipShift;
};
export function useScheduleEditor({
  rawShifts,
  weekBounds,
  currentUser,
}: UseScheduleEditor) {
  const oldShifts = rawShifts;
  const [operationShifts, setOperationShifts] = useState<OperationShift[]>([]);

  const [clipShift, setClipShift] = useState<ClipShift>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const mergedShifts = useMemo(() => {
    return scheduleMerge({ rawShifts: oldShifts, operationShifts });
  }, [oldShifts, operationShifts]);

  const handleSetCreateOperation = (user: User) => {
    setClipShift({
      operation: Operation.Create,
      shift: {
        _id: Date.now().toString(),
        user: user,
        actualGroupId: null,
        originGroupId: user?.groupId as Group,
        type: null,
        startAt: null,
        endAt: null,
      },
    });
    setIsFormOpen(true);
  };

  const handleSetOperationShifts = (operation: OperationShift) => {};

  const normalizedShifts = normalizeAndGroupWeekSchedule({
    schedule: mergedShifts,
    weekBounds,
    currentUser,
  });

  return;
}
