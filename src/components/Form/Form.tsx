import { Formik, Form, FormikHelpers } from "formik";
import type { AnyObjectSchema } from "yup";
import Input from "@/shared/ui/Input";
import { InputHTMLAttributes, ReactNode } from "react";
import { FormFieldConfig } from "./FormFieldConfig";
import FormFieldAdapter from "../FormFieldAdapter";

interface IField extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface IDynamicFormProps<TValues extends Record<string, any>> {
  initialValues: TValues;
  fields: FormFieldConfig<keyof TValues & string>[];
  validationSchema: AnyObjectSchema;
  onSubmit: (values: TValues, actions: FormikHelpers<TValues>) => void;
  submitLabel?: string;
  children: ReactNode;
}

export default function DynamicForm<TValues extends Record<string, string>>(
  props: IDynamicFormProps<TValues>,
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
        {() => (
          <Form className="flex flex-col gap-1.5">
            {fields.map((fieldConfig) => (
              <FormFieldAdapter
                key={fieldConfig.name}
                fieldConfig={fieldConfig}
              />
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
