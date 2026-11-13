import baseApi from "./client";
import { ApiResponse } from "./types";

interface LoginArg {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}
export const login = async ({
  email,
  password,
}: LoginArg): Promise<LoginResponse> => {
  const { data } = await baseApi.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    { email, password },
  );
  return data.data;
};

export const refresh = async (): Promise<LoginResponse> => {
  const { data } =
    await baseApi.post<ApiResponse<LoginResponse>>("/auth/refresh");
  return data.data;
};
