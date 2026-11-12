import { useField } from "formik";

export const useTimeRangeField = (
  fields: [
    { type: string; name: string; value?: string },
    { type: string; name: string; value?: string },
  ],
) => {
  const [field1, field2] = fields;
  const [startAtField, startAtMeta] = useField(field1);
  const [endAtField, endAtMeta] = useField(field2);
  return [
    { startAtField, startAtMeta },
    { endAtField, endAtMeta },
  ];
};
