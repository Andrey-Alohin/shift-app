import { useCallback, useMemo, useState } from "react";
import { Operation, OperationShift, scheduleMerge } from "./schedule-merge";
import normalizeAndGroupWeekSchedule, {
  NormalizedShift,
} from "@/shared/utils/normalizeAndGroupWeekSchedule";
import { Shift, ShiftType, User } from "@/shared/api";

interface UseScheduleEditor {
  rawShifts: Shift[];
  weekBounds: {
    start: string;
    end: string;
  };
  currentUser: User;
  groupUsers: User[];
}

interface CreateClipShift {
  _id: string;
  user: string;
  actualGroupId: string;
  type: ShiftType;
  startAt: string;
  endAt: string;
}

export type ClipShift =
  | {
      operation: Operation.Create;
      shift: CreateClipShift;
    }
  | {
      operation: Operation.Update;
      shift: NormalizedShift;
    }
  | {
      operation: Operation.Delete;
      shift: { id: string; version?: number };
    };
export function useScheduleEditor({
  rawShifts,
  weekBounds,
  currentUser,
  groupUsers,
}: UseScheduleEditor) {
  const [operationShifts, setOperationShifts] = useState<OperationShift[]>([]);

  const [clipShift, setClipShift] = useState<ClipShift>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const mergedShifts = useMemo(() => {
    return scheduleMerge({ rawShifts, operationShifts });
  }, [rawShifts, operationShifts]);

  const handleSetCreateOperation = useCallback((user: User, date: string) => {
    setClipShift({
      operation: Operation.Create,
      shift: {
        _id: Date.now().toString(),
        user: user._id,
        actualGroupId: "",
        type: ShiftType.Work,
        startAt: date,
        endAt: date,
      },
    });
    setIsModalOpen(true);
  }, []);

  const handleSetOperationsShifts = useCallback((operation: OperationShift) => {
    setOperationShifts((operations) => [...operations, operation]);
  }, []);

  const handleSetUpdateOperation = useCallback((shift: NormalizedShift) => {
    setClipShift({ operation: Operation.Update, shift });
    setIsModalOpen(true);
  }, []);

  const handleSetDeleteOperation = useCallback(
    ({ _id, version }: { _id: string; version?: number }) => {
      setClipShift({
        operation: Operation.Delete,
        shift: { id: _id, version },
      });
      setIsModalOpen(true);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setClipShift(undefined);
    setIsModalOpen(false);
  }, []);

  const normalizedShifts = normalizeAndGroupWeekSchedule({
    schedule: mergedShifts,
    weekBounds,
    currentUser,
  });

  const unassignedUsersByDate = useMemo(() => {
    const res: Record<string, User[]> = {};
    Object.entries(normalizedShifts).forEach(([key, data]) => {
      const busyUsers = new Set(data.shifts.map((shift) => shift.user._id));
      res[key] = groupUsers.filter((user) => !busyUsers.has(user._id));
    });
    return res;
  }, [groupUsers, normalizedShifts]);
  return {
    uiShifts: normalizedShifts,
    unassignedUsersByDate,
    clipShift,
    isModalOpen,
    closeModal,
    handleSetOperationsShifts,
    handleSetCreateOperation,
    handleSetUpdateOperation,
    handleSetDeleteOperation,
    operationShifts,
  };
}
