import { FormFieldConfig } from "@/components/Form/FormFieldConfig";
import { Group, ShiftApiPayload, ShiftType, User } from "@/shared/api";
import { SHIFT_TYPE_OPTIONS } from "@/shared/config/shiftTypes";
import {
  Operation,
  OperationShift,
} from "@/widgets/schedule-editor/model/schedule-merge";
import { ClipShift } from "@/widgets/schedule-editor/model/useScheduleEditor";
import { FormikHelpers } from "formik";

const buildShiftTimestamps = (date: string) => {
  const datePart = date.slice(0, 10);
  const baseDate = new Date(datePart);
  if (!isNaN(baseDate.getTime())) {
    return (time: string) => new Date(`${datePart}T${time}:00`);
  }
  throw new Error("Date is not valid, try again");
};

const initialValues = {
  user: "",
  actualGroupId: "",
  type: ShiftType.Work,
  startAt: "",
  endAt: "",
};

interface UseShiftFormModel {
  users: User[];
  groups: Group[];
  initValues?: ClipShift;
  onSuccess: (newOperaion: OperationShift) => void;
}

export default function useShiftFormModel({
  users,
  groups,
  initValues,
  onSuccess,
}: UseShiftFormModel) {
  if (initValues?.operation === Operation.Create && initValues) {
    const fieldValues = {
      user: "",
      type: "",
      actualGroupId: "",
      startAt: "",
      endAt: "",
    };
    const fields: FormFieldConfig<typeof fieldValues>[] = [
      {
        name: "user",
        label: "Вибір працівника",
        type: "select",
        value: initValues.shift.user ? initValues.shift.user : fieldValues.user,
        options: users.map(({ _id, firstName, lastName }) => ({
          label: `${lastName} ${firstName}`,
          value: _id,
        })),
      },
      {
        name: "type",
        label: "Вибір типу зміни",
        type: "select",
        value: ShiftType.Work,
        options: SHIFT_TYPE_OPTIONS,
      },
      {
        name: "actualGroupId",
        label: "На яке відділення",
        type: "select",
        value: "",
        options: groups.map((group) => ({
          label: group.name,
          value: group._id,
        })),
      },
      {
        name: "startAt",
        type: "input",
        inputType: "time",
        value: "",
      },
      {
        name: "endAt",
        type: "input",
        inputType: "time",
        value: "",
      },
    ];
    const handleSubmit = async (
      values: typeof fieldValues,
      actions: FormikHelpers<typeof fieldValues>,
    ) => {
      const isWork = values.type === ShiftType.Work;
      const setTimeToDate = buildShiftTimestamps(values.startAt);

      try {
        const userObj = users.find((user) => user._id === values.user);

        if (userObj && isWork) {
          const payload: ShiftApiPayload = {
            ...values,
            originGroupId: userObj.groupId,
            startAt: setTimeToDate(values.startAt).toISOString(),
            endAt: setTimeToDate(values.endAt).toISOString(),
          };
        }
      } catch {
      } finally {
      }
    };
  }
}
