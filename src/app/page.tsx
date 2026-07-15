import axios from "axios";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let userName = "Guest";

  if (accessToken) {
    try {
      const { data } = await axios.get("http://localhost:4000/api/users/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // Правильний шлях до імені користувача
      userName = data.data.name;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // Тут можна обробити помилку, наприклад, перенаправити на сторінку логіну
    }
  }

  return (
    <main className="p-8">
      <h1>Hello {userName} Shift`s Schedule </h1>
    </main>
  );
}
