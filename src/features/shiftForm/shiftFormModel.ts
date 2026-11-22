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
  const fields: FormFieldConfig<typeof initialValues> = [
    {
      name: "user",
    },
  ];
}
