import { api } from "@/shared/api";
import axios from "axios";
import { FormikHelpers } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NextRouter } from "next/router";
import { toast } from "sonner";
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

const loginToast = "loginToast";

export const useLoginModel = (router: AppRouterInstance) => {
  const handleLoginSubmit = async (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      toast.loading("Checking data", { id: loginToast });
      await axios.post("/api/auth/login", values);
      toast.success("Успішно війшли в систему!", { id: loginToast });
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Somethiing went wrong", { id: loginToast });
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
