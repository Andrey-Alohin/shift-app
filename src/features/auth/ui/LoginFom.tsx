"use client";

import DynamicForm from "@/components/Form/Form";
import { useLoginModel } from "../model/login";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const { initialValues, fields, validationSchema, handleLoginSubmit } =
    useLoginModel(router);
  return (
    <div className="m-auto my-auto flex grow justify-center items-center">
      <DynamicForm
        initialValues={initialValues}
        fields={fields}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
        submitLabel="Вхід"
      >
        <div className="mb-3">
          <h1 className="text-2xl text-foreground mb-1.5">Вхід</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Введіть дані вашого облікового запису
          </p>
        </div>
      </DynamicForm>
    </div>
  );
}
