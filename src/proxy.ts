import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const isSheduleRoute = request.nextUrl.pathname.startsWith("/schedule");

  if (!token && isSheduleRoute) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("form", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
