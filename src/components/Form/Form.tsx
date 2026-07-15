import { Formik, Form, FormikHelpers } from "formik";
import type { AnyObjectSchema } from "yup";
import Input from "@/shared/ui/Input";
import { InputHTMLAttributes, ReactNode } from "react";

interface IField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface IDynamicFormProps<TinitValues> {
  initialValues: TinitValues;
  fields: IField[];
  validationSchema: AnyObjectSchema;
  onSubmit: (values: TinitValues, actions: FormikHelpers<TinitValues>) => void;
  submitLabel?: string;
  children: ReactNode;
}

export default function DynamicForm<TinitValues extends Record<string, string>>(
  props: IDynamicFormProps<TinitValues>,
) {
  const {
    initialValues,
    fields,
    validationSchema,
    onSubmit,
    submitLabel,
    children,
  } = props;

  return (
    <div className="w-full max-w-sm space-y-8">
      {children}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, values, errors, touched, handleBlur }) => (
          <Form className="flex flex-col gap-1.5">
            {fields.map(({ name, label, type, placeholder }, i) => (
              <div key={i} className="flex flex-col space-y-1.5">
                <label
                  className="text-xs font-semibold text-muted-foreground tracking-wide uppercase"
                  htmlFor={name + i}
                >
                  {label}
                </label>
                <Input
                  id={name + i}
                  key={i}
                  name={name}
                  type={type}
                  aria-label={label}
                  onChange={handleChange}
                  value={values[name]}
                  onBlur={handleBlur}
                  placeholder={placeholder ?? label}
                  className="mb-0.5"
                />
                {touched[name] && typeof errors[name] === "string" && (
                  <div className="mt-1 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                    {errors[name]}
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary/85 active:scale-[0.99] transition-all disabled:opacity-60"
            >
              {submitLabel}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
