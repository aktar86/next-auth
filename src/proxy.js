import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privetRoute = ["/public", "/privet", "/admin", "/creator"];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;

  const isAuthenticated = Boolean(token);

  const isUser = token?.role === "user";
  const isPrivet = privetRoute.some((route) => reqPath.startsWith(route));

  if (!isAuthenticated && isPrivet) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  //admin route protection
  if (reqPath.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //creator route protection
  if (reqPath.startsWith("/creator") && token?.role !== "creator") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: [
    "/public/:path*",
    "/privet/:path*",
    "/admin/:path*",
    "/creator/:path*",
  ],
};
