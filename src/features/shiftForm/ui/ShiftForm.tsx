import DynamicForm from "@/components/Form/Form";
import { useShiftFormModel } from "../model";

export default function ShiftForm({ users, groups, clipShift, onSubmit }) {
  const { initialValues, validationSchema, fields, handleSubmit } =
    useShiftFormModel(users, groups, clipShift, onSubmit);
  if (!clipShift) return null;
  console.log(initialValues);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Створити зміну</h1>
      <DynamicForm
        initialValues={initialValues}
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Зберегти зміну"
      />
    </div>
  );
}
