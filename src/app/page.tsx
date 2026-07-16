import { cookies } from "next/headers";
import { api } from "@/shared/api";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let userName = "Guest";

  if (accessToken) {
    try {
      const user = await api.users.getMe(accessToken);
      userName = user.name;
      console.log(user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

  return (
    <main className="p-8">
      <h1>Hello {userName} Shift`s Schedule </h1>
    </main>
  );
}
