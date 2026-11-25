import { useField, useFormikContext } from "formik";
import { FormFieldConfig } from "./Form/FormFieldConfig";
import Input from "@/shared/ui/Input";
import TimeRangeField from "./TimeRangeField/TimeRangeField";

interface FormFieldAdapterProps<TValues extends Record<string, unknown>> {
  fieldConfig: FormFieldConfig<TValues>;
}

export default function FormFieldAdapter<
  TValues extends Record<string, unknown>,
>({ fieldConfig }: FormFieldAdapterProps<TValues>) {
  const { values, isSubmitting } = useFormikContext<TValues>();
  const [field, meta] = useField(fieldConfig.name);

  const isVisible = fieldConfig.isVisible
    ? fieldConfig.isVisible?.(values)
    : true;

  if (!isVisible) {
    return null;
  }

  const isDisabled = isSubmitting || fieldConfig.isDisabled?.(values);

  const hasError = meta.touched && Boolean(meta.error);

  const renderFieldControl = () => {
    switch (fieldConfig.type) {
      case "input":
        return (
          <Input
            id={fieldConfig.name}
            type={fieldConfig.inputType || "text"}
            placeholder={fieldConfig.placeholder}
            disabled={isDisabled}
            {...field}
          />
        );
      case "select":
        return (
          <select id={fieldConfig.name} disabled={isDisabled} {...field}>
            <option value={""} disabled>
              Оберіть зі списку
            </option>
            {fieldConfig.options.map(({ label, value }) => (
              <option key={String(value)} value={String(value)}>
                {label}
              </option>
            ))}
          </select>
        );
      case "time-range":
        return (
          <TimeRangeField
            fields={fieldConfig.fields}
            config={fieldConfig.config}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <label
        className="text-xs font-semibold text-muted-foreground tracking-wide uppercase"
        htmlFor={fieldConfig.name}
      >
        {fieldConfig.label}
      </label>
      {renderFieldControl()}
      {hasError && (
        <div className="mt-1 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
          {meta.error}
        </div>
      )}
    </div>
  );
}
