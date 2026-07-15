// import axios from "axios";

// export interface LoginResponse {
//   accessToken: string;
// }

// export const login = async (values: Ilogin) => {
//   try {
//     // const cookie = await cookies();
//     const response = await api.post<LoginResponse>("/auth/login", values);
//   } catch (error) {}
// };

// export async function POST(request: Request) {
//   try {
//     const values = await request.json();

//     const response = await api.post<ApiResponse<LoginResponse>>(
//       "/auth/login",
//       values,
//     );
//     const { accessToken } = response.data;

//     const nextResponse = NextResponse.json({ message: "Успішно увійшли!" });

//     nextResponse.cookies.set("accessToken", accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 15 * 60,
//     });

//     return nextResponse;
//   } catch (error) {
//     if (isAxiosError<ApiError>(error)) {
//       return NextResponse.json(
//         { error: error.response?.data.message || "помилка авторизації" },
//         { status: 400 },
//       );
//     }
//   }
// }
