import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  console.log("TOKEN", token);
  console.log("isAuthenticated", isAuthenticated);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if (!req.nextUrl.pathname.startsWith("/auth") && !isAuthenticated) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
