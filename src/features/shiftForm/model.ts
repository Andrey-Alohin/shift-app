import { FormikHelpers } from "formik";
import { FormFieldConfig } from "@/components/Form/FormFieldConfig";
import { ShiftType, User, Group } from "@/shared/api";
import * as Yup from "yup";
import { toast } from "sonner";

// 1. Стан форми на базі ID (ідеально для нативних селектів)
const initialValues = {
  userId: "",
  actualGroupId: "",
  type: "" as ShiftType | "",
  startAt: "",
  endAt: "",
};

// 2. Сувора схема валідації через Yup
const validationSchema = Yup.object({
  userId: Yup.string().required("Оберіть працівника"),
  actualGroupId: Yup.string().required("Оберіть відділення"),
  type: Yup.string().required("Оберіть тип зміни"),
  startAt: Yup.string().required("Вкажіть час початку"),
  endAt: Yup.string().required("Вкажіть час кінця"),
});

export const useShiftFormModel = (
  users: User[],
  groups: Group[],
  initValues,
  onSuccess?: () => void,
) => {
  // 3. Динамічний конфіг полів із 100% збереженням типів
  const fields: FormFieldConfig<typeof initialValues>[] = [
    {
      name: "userId",
      label: "Працівник",
      type: "select",
      options: users.map((user) => ({
        label: user.firstName, // Назва користувача для відображення
        value: user._id, // ID як рядок, що чітко збігається з userId у initialValues
      })),
    },
    {
      name: "actualGroupId",
      label: "На яке відділення",
      type: "select",
      options: groups.map((group) => ({
        label: group.name,
        value: group._id,
      })),
    },
    {
      name: "type",
      label: "Вибір типу",
      type: "select",
      options: Object.values(ShiftType).map((type) => ({
        label: String(type),
        value: type,
      })),
    },
    {
      name: "startAt",
      label: "Початок зміни",
      type: "input",
      inputType: "range",
    },
  ];

  // 4. Функція сабміту та мапінгу даних для API
  const handleSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      // Трансформуємо плоскі ID з форми у структуру, яку чекає бекенд
      const payload = {
        user: { _id: values.userId },
        actualGroupId: { _id: values.actualGroupId },
        type: values.type,
        startAt: values.startAt,
        endAt: values.endAt,
      };

      console.log("Submitting shift payload:", payload);

      // Тут буде запит до API (наприклад, await axios.post("/api/shifts", payload))

      toast.success("Зміну успішно збережено!");
      onSuccess?.();
    } catch (err) {
      toast.error("Не вдалося зберегти зміну");
      console.error(err);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    fields,
    handleSubmit,
  };
};
