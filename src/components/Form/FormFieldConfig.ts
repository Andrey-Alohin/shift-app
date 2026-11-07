interface BaseField<TFormName extends string> {
  name: TFormName;
  label: string;
  disabled: boolean;
}

export type FormFieldConfig<TFormName extends string, TOptionValue = any> =
  | (BaseField<TFormName> & {
      type: "input";
      placeholder?: string;
      inputType?: "text" | "email" | "password";
    })
  | (BaseField<TFormName> & {
      type: "select";
      options: { label: string; value: TOptionValue }[];
    })
  | (BaseField<TFormName> & {
      type: "time-range";
      config: {
        min: string;
        max: string;
      };
      startAt: string;
      endAt: string;
    });
