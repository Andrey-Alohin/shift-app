import { api } from "@/shared/api";
import axios from "axios";
import { FormikHelpers } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NextRouter } from "next/router";
import * as Yup from "yup";

const fields = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "name@company.com",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "••••••••",
  },
];

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(7).max(20).required().label("Password"),
});

export const useLoginModel = (router: AppRouterInstance) => {
  const handleLoginSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      await axios.post("/api/auth/login", values);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.log("Failed to login: ", err);
    } finally {
      actions.setSubmitting(false);
    }
  };
  return {
    initialValues,
    fields,
    validationSchema,
    handleLoginSubmit,
  };
};
