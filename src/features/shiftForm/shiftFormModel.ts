import { FormFieldConfig } from "@/components/Form/FormFieldConfig";
import { Group, ShiftApiPayload, ShiftType, User } from "@/shared/api";
import { SHIFT_TYPE_OPTIONS } from "@/shared/config/shiftTypes";
import { formatToKiyvDate } from "@/shared/lib/date";
import {
  Operation,
  OperationShift,
} from "@/widgets/schedule-editor/model/schedule-merge";
import { ClipShift } from "@/widgets/schedule-editor/model/useScheduleEditor";
import { FormikHelpers } from "formik";
import { useMemo } from "react";

type ShiftFormValues = {
  user: string;
  type: ShiftType;
  actualGroupId: string;
  startAt: string;
  endAt: string;
};

const buildShiftTimestamps = (date: string) => {
  const datePart = date.slice(0, 10);
  const baseDate = new Date(datePart);
  if (!isNaN(baseDate.getTime())) {
    return (time: string) => new Date(`${datePart}T${time}:00`);
  }
  throw new Error("Date is not valid, try again");
};

const DEFAULT_VALUES: ShiftFormValues = {
  user: "",
  type: ShiftType.Work,
  actualGroupId: "",
  startAt: "",
  endAt: "",
};

interface UseShiftFormModelProps {
  users: User[];
  groups: Group[];
  initialValues?: ClipShift;
  onSuccess: (newOperaion: OperationShift) => void;
}

export default function useShiftFormModel({
  users,
  groups,
  initialValues,
  onSuccess,
}: UseShiftFormModelProps) {
  const isUpdate = initialValues?.operation === Operation.Update;
  const isCreate = initialValues?.operation === Operation.Create;

  const baseDate = useMemo(() => {
    if (isUpdate || isCreate) {
      return initialValues.shift.date;
    }
    return formatToKiyvDate(new Date());
  }, [isUpdate, isCreate, initialValues]);

  const isUserLocked = useMemo(() => {
    if (isUpdate) return true;
    if (isCreate && Boolean(initialValues.shift.user)) return true;
    return false;
  }, [isUpdate, isCreate, initialValues]);

  const initValues: ShiftFormValues = useMemo(() => {
    if (isCreate) {
      return {
        user: initialValues.shift.user._ || "",
        type: initialValues.shift.type || "",
        actualGroupId: initialValues.shift.actualGroupId || "",
        startAt: "",
        endAt: "",
      };
    }

    if (isUpdate) {
      return {
        user: initialValues.shift.user,
        type: initialValues.shift.type,
        actualGroupId: initialValues.shift.actualGroupId || "",
        startAt: initialValues.shift.startAt,
        endAt: initialValues.shift.endAt,
      };
    }

    return DEFAULT_VALUES;
  }, [initialValues, isCreate, isUpdate]);

  const fields: FormFieldConfig<ShiftFormValues>[] =
    useMemo((): FormFieldConfig<ShiftFormValues>[] => {
      const isShiftWork = (values: ShiftFormValues) =>
        values.type === ShiftType.Work;

      return [
        {
          name: "user",
          label: "Вибір працівника",
          type: "select",
          value: initValues.user,
          isDisabled: () => isUserLocked,
          options: users.map(({ _id, firstName, lastName }) => ({
            label: `${lastName} ${firstName}`,
            value: _id,
          })),
        },
        {
          name: "type",
          label: "Вибір типу зміни",
          type: "select",
          value: initValues.type,
          options: SHIFT_TYPE_OPTIONS,
        },
        {
          name: "actualGroupId",
          label: "На яке відділення",
          type: "select",
          value: initValues.actualGroupId,
          isVisible: isShiftWork,
          options: groups.map(({ _id, name }) => ({
            label: name,
            value: _id,
          })),
        },
        {
          name: "startAt",
          label: "Початок зміни",
          type: "input",
          inputType: "time",
          value: initValues.startAt,
          isVisible: isShiftWork,
        },
        {
          name: "endAt",
          label: "Кінець зміни",
          type: "input",
          inputType: "time",
          value: initValues.endAt,
          isVisible: isShiftWork,
        },
      ];
    }, [users, groups, initValues, isUserLocked]);

  const handleSubmit = async (
    values: typeof initValues,
    actions: FormikHelpers<typeof initValues>,
  ) => {
    if (!initialValues || initialValues.operation === Operation.Delete) return;

    const userObj = users.find((u) => u._id === values.user);
    if (!userObj) return;

    const isWork = values.type === ShiftType.Work;

    const buildTime = buildShiftTimestamps(baseDate);
    const { startAt, endAt } = isWork
      ? { startAt: buildTime(values.startAt), endAt: buildTime(values.endAt) }
      : { startAt: buildTime("09: 00"), endAt: buildTime("18:00") };

      try {
        if (initialValues.operation === Operation.Create) {
          const originGroup = groups.find(g => g._id === userObj.groupId)
          const actualGroup = groups.find(g => g._id === (isWork ? values.actualGroupId : userObj.groupId));
          if (originGroup &&  actualGroup) {

            onSuccess({
              operation: Operation.Create,
              shift: {
                _id: initialValues.shift._id,
                user: userObj, 
                originGroupId: originGroup,
                actualGroupId: actualGroup,
                type: values.type,
                startAt, 
                endAt,
              }
            })
          }
        }
      }
  };
}
