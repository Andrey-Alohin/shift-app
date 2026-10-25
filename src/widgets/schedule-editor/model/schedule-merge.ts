import { Group, Shift, ShiftType, User } from "@/shared/api";

export enum Operation {
  Create = "create",
  Update = "update",
  Delete = "delete",
}

interface CreateShiftPayload {
  _id: string;
  user: User;
  actualGroupId: Group;
  originGroupId: Group;
  type: ShiftType;
  startAt: string;
  endAt: string;
}

interface UpdateShiftPayload extends CreateShiftPayload {
  _id: string;
  version: number;
}

interface DeleteShiftPayload {
  _id: string;
  version: number;
}

type OperationShift =
  | {
      operation: Operation.Create;
      shift: CreateShiftPayload;
    }
  | { operation: Operation.Update; shift: UpdateShiftPayload }
  | {
      operation: Operation.Delete;
      shift: DeleteShiftPayload;
    };

export interface MergedShifts extends Shift {
  status?: Operation;
}

interface ScheduleMerge {
  rawShifts: Shift[];
  operationShifts: OperationShift[];
}

export function scheduleMerge({
  rawShifts,
  operationShifts,
}: ScheduleMerge): MergedShifts[] {
  if (operationShifts.length === 0) return rawShifts;

  const operationsMap = new Map<string, OperationShift>();

  operationShifts.forEach((op) => {
    operationsMap.set(op.shift._id, op);
  });

  const result: MergedShifts[] = [];

  rawShifts.forEach((rawShift) => {
    const opAction = operationsMap.get(rawShift._id);

    if (!opAction) {
      result.push(rawShift);
      return;
    }

    if (opAction.operation === Operation.Update) {
      result.push({
        ...rawShift,
        ...opAction.shift,
        status: Operation.Update,
      });
    } else if (opAction.operation === Operation.Delete) {
      result.push({
        ...rawShift,
        status: Operation.Delete,
      });
      operationsMap.delete(rawShift._id);
    }
  });

  operationsMap.forEach((opAction) => {
    if (opAction.operation === Operation.Create) {
      result.push({
        ...opAction.shift,
        status: Operation.Create,
      } as MergedShifts);
    }
  });
  return result;
}
