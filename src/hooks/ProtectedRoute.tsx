"use client";

import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/app/(providers)/AuthContext";

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext)!;
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    // If user is NOT logged in and NOT on a public route, redirect to login
    console.log("User:", user);
    console.log("Pathname:", pathname);
    if (!user) {
        console.log("Redirecting to login...");
      router.push("/auth/login");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
