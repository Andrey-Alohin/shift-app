import DynamicForm from "@/components/Form/Form";
import { useShiftFormModel } from "../model";

export default function ShiftCreatePage({ users, groups }) {
  const { initialValues, validationSchema, fields, handleSubmit } =
    useShiftFormModel(users, groups, () => console.log("Готово!"));

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Створити зміну</h1>
      <DynamicForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Зберегти зміну"
      />
    </div>
  );
}
