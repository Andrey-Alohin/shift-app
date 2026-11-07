import { useField } from "formik";
import { FormFieldConfig } from "./Form/FormFieldConfig";
import Input from "@/shared/ui/Input";

interface FormFieldAdapterProps<TValues extends Record<string, unknown>> {
  fieldConfig: FormFieldConfig<TValues>;
}

export default function FormFieldAdapter<
  TAVlues extends Record<string, unknown>,
>({ fieldConfig }: FormFieldAdapterProps<TAVlues>) {
  const [field, meta] = useField(fieldConfig.name);
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <div className="flex flex-col space-y-1.5">
      <label
        className="text-xs font-semibold text-muted-foreground tracking-wide uppercase"
        htmlFor={fieldConfig.name}
      >
        {fieldConfig.label}
      </label>
      {(() => {
        switch (fieldConfig.type) {
          case "input":
            return (
              <Input
                id={fieldConfig.name}
                type={fieldConfig.inputType || "text"}
                placeholder={fieldConfig.placeholder}
                {...field}
              />
            );
          case "select":
            return (
              <select
                id={fieldConfig.name}
                disabled={fieldConfig.disabled}
                {...field}
              >
                <option value="" disabled>
                  Оберіть зі списку
                </option>
                {fieldConfig.options.map((opt) => (
                  <option key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </option>
                ))}
              </select>
            );
          case "time-range":
            return (
              <div>
                <input type="time" {...field} />
                <span>
                  {fieldConfig.config.min}-{fieldConfig.config.max}
                </span>
              </div>
            );
          default:
            return null;
        }
      })()}
      {hasError && (
        <div className="mt-1 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
          {meta.error}
        </div>
      )}
    </div>
  );
}
