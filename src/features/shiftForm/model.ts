import { FormikHelpers } from "formik";
import { FormFieldConfig } from "@/components/Form/FormFieldConfig";
import { ShiftType, User, Group } from "@/shared/api";
import * as Yup from "yup";
import { toast } from "sonner";

// 1. Стан форми на базі ID (ідеально для нативних селектів)
const initialValues = {
  user: "",
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
  const fieldValues = { ...initialValues, ...initValues.shift };
  // 3. Динамічний конфіг полів із 100% збереженням типів
  const fields: FormFieldConfig<typeof initialValues>[] = [
    {
      name: "user",
      label: "Працівник",
      type: "select",
      value: "",
      options: users.map((user) => ({
        label: user.firstName, // Назва користувача для відображення
        value: user._id, // ID як рядок, що чітко збігається з userId у initialValues
      })),
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
      name: "type",
      label: "Вибір типу",
      type: "select",
      value: "",
      options: Object.values(ShiftType).map((type) => ({
        label: String(type),
        value: type,
      })),
    },
    {
      name: "startAt",
      label: "Початок зміни",
      type: "time-range",
      config: {
        min: "08:00",
        max: "21:00",
      },
      fields: [
        {
          name: "startAt",
          type: "datetime-local",
          value: fieldValues.startAt && "",
        },
        {
          name: "endAt",
          type: "datetime-local",
          value: fieldValues.endAt && "",
        },
      ],
    },
  ];

  // 4. Функція сабміту та мапінгу даних для API
  const handleSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      console.log(values);
      // Трансформуємо плоскі ID з форми у структуру, яку чекає бекенд
      const payload = {
        user: values.user,
        actualGroupId: values.actualGroupId,
        type: values.type,
        startAt: values.startAt,
        endAt: values.endAt,
      };

      console.log("Submitting shift payload:", payload);

      // Тут буде запит до API (наприклад, await axios.post("/api/shifts", payload))

      toast.success("Зміну успішно збережено!");
      console.log(initValues);
      const startAt = new Date(payload.startAt);
      const setTime = startAt.toISOString();
      // new Date(
      //   startAt.setHours(
      //     Number(payload.startAt.slice(":")[0]),
      //     Number(payload.startAt.slice(":")[1]),
      //   ),
      // );

      const endAt = new Date(payload.endAt);
      const endTime = endAt.toISOString();
      // new Date(
      //   endAt.setHours(
      //     Number(payload.endAt.slice(":")[0]),
      //     Number(payload.endAt.slice(":")[1]),
      //   ),
      // );
      console.log(startAt.toString());
      // const endAt = new Date(
      //   initValues.shift.startAt + payload.endAt,
      // ).toISOString();

      const objUser = users.find((user) => payload.user === user._id);
      const GroupObj = groups.find((group) => group._id === objUser?.groupId);

      console.log(GroupObj);
      onSuccess?.({
        operation: initValues.operation,
        shift: {
          ...payload,
          user: objUser,
          actualGroupId: groups.find(
            (group) => group._id === payload.actualGroupId,
          ),
          originGroup: GroupObj,
          startAt: setTime,
          endAt: endTime,
        },
      });
    } catch (err) {
      toast.error("Не вдалося зберегти зміну");
      console.error(err);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return {
    initialValues: fieldValues,
    validationSchema,
    fields,
    handleSubmit,
  };
};
