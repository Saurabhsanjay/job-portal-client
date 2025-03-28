import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  // If user is authenticated and trying to access auth pages, redirect to home
  if (req.nextUrl.pathname.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Optional: Uncomment to enforce authentication for non-auth pages
  // if (!req.nextUrl.pathname.startsWith("/auth") && !isAuthenticated) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // }

  // Add the token to the request headers for API calls
  if (token?.accessToken) {
    requestHeaders.set("Authorization", `Bearer ${token.accessToken}`);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
