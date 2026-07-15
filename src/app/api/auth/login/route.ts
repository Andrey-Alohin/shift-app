import { ApiError, ApiResponse } from "@/lib/backend";
import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export interface LoginResponse {
  accessToken: string;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type LoginR = ApiResponse<LoginResponse>;

export async function POST(request: Request) {
  try {
    const values = await request.json();

    const { data } = await api.post<LoginR>("/auth/login", values);
    const { accessToken } = data.data;

    console.log(accessToken);

    const nextResponse = NextResponse.json({ message: "Успішно увійшли!" });

    nextResponse.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
    });

    return nextResponse;
  } catch (error) {
    if (isAxiosError<ApiError>(error)) {
      return NextResponse.json(
        { error: error.response?.data.message || "помилка авторизації" },
        { status: 400 },
      );
    }
  }
}
