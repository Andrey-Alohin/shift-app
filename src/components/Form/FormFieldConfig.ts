interface BaseField<
  TFormName extends string,
  TValues extends Record<string, unknown>,
  TValue = string,
> {
  name: TFormName;
  label: string;
  value?: TValue;
  isVisible?: (values: TValues) => boolean;
  isDisabled?: (values: TValues) => boolean;
}

export type FormFieldConfig<TValues extends Record<string, unknown>> = {
  [K in keyof TValues]:
    | (BaseField<K & string, TValues, TValues[K]> & {
        type: "input";
        placeholder?: string;
        inputType?: "text" | "email" | "password" | "time";
      })
    | (BaseField<K & string, TValues, TValues[K]> & {
        type: "select";
        options: { label: string; value: TValues[K] }[];
      })
    | (BaseField<K & string, TValues, TValues[K]> & {
        type: "time-range";
        config: {
          min: string;
          max: string;
        };
        fields: [
          { name: "startAt"; type: "time"; value: string },
          {
            name: "endAt";
            type: "time";
            value: string;
          },
        ];
      });
}[keyof TValues];
