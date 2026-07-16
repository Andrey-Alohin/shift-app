import baseApi from "./client";
import type { ApiResponse, WeeklySchedule } from "./types";

interface Arguments {
  token: string;
  date?: string;
}

// 3. Функція тепер повертає конкретний тип `Promise<WeeklySchedule>`.
export const getWeeklySchedule = async (
  dto: Arguments,
): Promise<WeeklySchedule> => {
  const { token, date } = dto;

  const response = await baseApi.get<ApiResponse<WeeklySchedule>>(
    "/shifts/schedule/weekly",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: date ? { date } : undefined,
    },
  );
  return response.data.data;
};
