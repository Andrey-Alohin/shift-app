import { getMe } from "@/shared/api/users";
import { console } from "inspector";
import { cookies } from "next/headers";

export async function getServerUser() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "null";
    const user = await getMe(accessToken);
    return user;
  } catch (err) {
    console.log("Failed to fetch user: ", err);
    throw new Error("Помилка завантаження інформації щодо користувача");
  }
}
