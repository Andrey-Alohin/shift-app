import { ApiResponse, ApiError, api } from "@/shared/api";
import axios, { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const values = await request.json();

    const res = await api.auth.login(values);
    const { accessToken } = res;

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
