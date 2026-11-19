import { FormFieldConfig } from "@/components/Form/FormFieldConfig";
import { Group, ShiftType, User } from "@/shared/api";
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
      type: "",
      startAt: "",
      endAt: "",
    };
    const fields: FormFieldConfig<typeof fieldValues>[] = [
      {
        name: "type",
        label: "Вибір типу зміни",
        type: "select",
        options: Object.values(ShiftType).map((type) => ({
          label: "",
          value: type,
        })),
      },
    ];
  }
}
