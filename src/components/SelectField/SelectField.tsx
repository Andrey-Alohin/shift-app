import { FormFieldConfig } from "../Form/FormFieldConfig";

interface SelectFieldProps<Tvalues extends Record<string, unknown>> {
  fieldConfig: FormFieldConfig<Tvalues>;
}

export default function SelectField({ fieldConfig }: SelectFieldProps) {}
