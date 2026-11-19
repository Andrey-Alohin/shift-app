import { FormFieldConfig } from "@/components/Form/FormFieldConfig";
import { Group, ShiftType, User } from "@/shared/api";
import { SHIFT_TYPE_OPTIONS } from "@/shared/config/shiftTypes";
import {
  Operation,
  OperationShift,
} from "@/widgets/schedule-editor/model/schedule-merge";
import { ClipShift } from "@/widgets/schedule-editor/model/useScheduleEditor";

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
        inputType: "",
      },
    ];
  }
}
