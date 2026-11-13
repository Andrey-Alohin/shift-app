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
  const hasError =
    (startAtMeta?.touched && Boolean(startAtMeta.error)) ||
    (endAtMeta?.touched && Boolean(endAtMeta.error));
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
      {hasError && (
        <div className="mt-1 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
          {startAtMeta?.error || endAtMeta?.error}
        </div>
      )}
    </fieldset>
  );
}
