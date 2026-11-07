interface BaseField<TFormName extends string> {
  name: TFormName;
  label: string;
  disabled: boolean;
}

export type FormFieldConfig<TValues extends Record<string, any>> = {
  [K in keyof TValues]:
    | (BaseField<K & string> & {
        type: "input";
        placeholder?: string;
        inputType?: "text" | "email" | "password";
      })
    | (BaseField<K & string> & {
        type: "select";
        options: { label: string; value: TValues[K] }[];
      })
    | (BaseField<K & string> & {
        type: "time-range";
        config: {
          min: string;
          max: string;
        };
        startAt: string;
        endAt: string;
      });
}[keyof TValues];
