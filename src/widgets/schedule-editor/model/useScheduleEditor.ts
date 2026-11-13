import { useMemo, useState } from "react";
import { Operation, OperationShift, scheduleMerge } from "./schedule-merge";
import normalizeAndGroupWeekSchedule, {
  NormalizedShift,
} from "@/shared/utils/normalizeAndGroupWeekScheudle";
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
  user: User;
  actualGroupId: null;
  type: ShiftType | null;
  startAt: string | null;
  endAt: string | null;
}

type ClipShift =
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
  const oldShifts = rawShifts;
  const [operationShifts, setOperationShifts] = useState<OperationShift[]>([]);

  const [clipShift, setClipShift] = useState<ClipShift>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const mergedShifts = useMemo(() => {
    return scheduleMerge({ rawShifts: oldShifts, operationShifts });
  }, [oldShifts, operationShifts]);

  const handleSetCreateOperation = (user: User, date: string) => {
    setClipShift({
      operation: Operation.Create,
      shift: {
        _id: Date.now().toString(),
        user: user,
        actualGroupId: null,
        type: null,
        startAt: date,
        endAt: date,
      },
    });
    setIsFormOpen(true);
  };

  const handleSetOperationsShifts = (operation: OperationShift) => {
    setOperationShifts((operarions) => [...operarions, operation]);
  };

  const handleSetUpdateOperation = (shift: NormalizedShift) => {
    setClipShift({ operation: Operation.Update, shift });
    setIsFormOpen(true);
  };

  const handleSetDeleteOperation = ({
    id,
    version,
  }: {
    id: string;
    version?: number;
  }) => {
    setClipShift({ operation: Operation.Delete, shift: { id, version } });
    setIsFormOpen(true);
  };

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
    isFormOpen,
    setIsFormOpen,
    handleSetOperationsShifts,
    handleSetCreateOperation,
    handleSetUpdateOperation,
    handleSetDeleteOperation,
  };
}
