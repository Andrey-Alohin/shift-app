import baseApi from "./client";
import type { ApiResponse, User } from "./types";

export const getMe = async (token: string): Promise<User> => {
  const { data } = await baseApi.get<ApiResponse<User>>("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
