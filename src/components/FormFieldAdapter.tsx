import { useField, useFormikContext } from "formik";
import { FormFieldConfig } from "./Form/FormFieldConfig";
import Input from "@/shared/ui/Input";
import TimeRangeField from "./TimeRangeField/TimeRangeField";
import { cn } from "@/shared/utils";

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

  const isDisabled = isSubmitting || fieldConfig.isDisabled?.(values);

  const DisabledStyle = isDisabled ? "text-muted-foreground" : "";
  const hasError = meta.touched && Boolean(meta.error);

  const renderFieldControl = () => {
    switch (fieldConfig.type) {
      case "input":
        return (
          <Input
            id={fieldConfig.name}
            type={fieldConfig.inputType || "text"}
            placeholder={fieldConfig.placeholder}
            className={DisabledStyle}
            tabIndex={isVisible ? undefined : -1}
            disabled={isDisabled}
            {...field}
          />
        );
      case "select":
        return (
          <select
            className={cn(
              "w-full bg-secondary border border-border rounded-xl px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all",
              DisabledStyle,
            )}
            id={fieldConfig.name}
            disabled={isDisabled}
            {...field}
          >
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
    <div
      aria-hidden={!isVisible}
      className={cn(
        "grid transition-[grid-template-rows,opacity,margin] min-h-0",
        isVisible ? "opacity-100 mt-1.5" : "opacity-0 mt-0 pointer-events-none",
      )}
      style={{
        gridTemplateRows: isVisible ? "1fr" : "0fr",
      }}
    >
      <div className="overflow-hidden flex flex-col">
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
    </div>
  );
}
