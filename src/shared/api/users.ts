import baseApi from "./client";
import type { ApiResponse, PopulatedUser } from "./types";

export const getMe = async (token: string): Promise<PopulatedUser> => {
  const { data } = await baseApi.get<ApiResponse<PopulatedUser>>("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
