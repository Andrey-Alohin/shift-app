import { api } from "@/shared/api";
import { isAxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await api.auth.refresh();
    const { accessToken } = res;

    const nextResponse = NextResponse.json({ message: "Оновлено токен!" });
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
        {
          error: error.response?.data.message || "помилка авторизації",
        },
        { status: 400 },
      );
    }
  }
}
