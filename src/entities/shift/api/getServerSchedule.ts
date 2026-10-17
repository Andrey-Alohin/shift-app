import { getWeeklySchedule } from "@/shared/api/schedule";
import { cookies } from "next/headers";

export async function getServerSchedule(mondayStr: string) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "null";
    const rawShifts = await getWeeklySchedule({
      token: accessToken,
      date: new Date(mondayStr).toISOString(),
    });
    return rawShifts;
  } catch (err) {
    console.log("Failed to fetch schedule: ", err);
    throw new Error("Не вдалось завантажити розклад");
  }
}
