import { Field } from "formik";
import { useTimeRangeField } from "../useTimeRangeField";
import Input from "@/shared/ui/Input";

interface TimeRangeFieldProps {
  fields: [
    {
      name: "startAt";
      type: "time";
      value?: string;
    },
    {
      name: "endAt";
      type: "time";
      value?: string;
    },
  ];
  config: {
    min: string;
    max: string;
  };
}

export default function TimeRangeField({
  fields,
  config,
}: TimeRangeFieldProps) {
  const [{ startAtField, startAtMeta }, { endAtField, endAtMeta }] =
    useTimeRangeField(fields);
  return (
    <fieldset>
      <legend>Select time range</legend>
      <label htmlFor="startAt">Початок зміни</label>
      <Input
        {...startAtField}
        type={fields[0].type}
        min={config.min}
        max={config.max}
      />
      <label htmlFor="endAt">Кінець зміни</label>
      <Input
        {...endAtField}
        type={fields[1].type}
        min={config.min}
        max={config.max}
      />
    </fieldset>
  );
}
