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
  if (!isNaN(new Date(date).getTime())) {
    return (time) => new Date(`${date}T${time}:00`);
  }
} 

const initialValues = {
  user: "",
  actualGroupId: "",
  type: "",
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
        value: "",
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

      try {
        const userObj = users.find((user) => user._id === values.user);

        if (userObj && typeof userObj.groupId === "string") {
          const payload: ShiftApiPayload = {
            ...values,
            originGroupId: userObj.groupId,
            startAt: 
          };
        }
      } catch {
      } finally {
      }
    };
  }
}
