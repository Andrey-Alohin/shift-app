import DynamicForm from "@/components/Form/Form";
import useShiftFormModel from "../shiftFormModel";
import { Group, User } from "@/shared/api";
import { ClipShift } from "@/widgets/schedule-editor/model/useScheduleEditor";
import { OperationShift } from "@/widgets/schedule-editor/model/schedule-merge";

interface ShiftFormProps {
  users: User[];
  groups: Group[];
  clipShift: ClipShift | undefined;
  onSubmit: (newOPeration: OperationShift) => void;
}

export default function ShiftForm({
  users,
  groups,
  clipShift,
  onSubmit,
}: ShiftFormProps) {
  const { fields, initValues, handleSubmit } = useShiftFormModel({
    users,
    groups,
    initialValues: clipShift,
    onSuccess: onSubmit,
  });
  if (!clipShift) return null;
  console.log(initValues);
  return (
    <div className="min-w-3xs">
      <DynamicForm
        initialValues={initValues}
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Зберегти зміну"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Створити зміну</h1>
      </DynamicForm>
    </div>
  );
}
