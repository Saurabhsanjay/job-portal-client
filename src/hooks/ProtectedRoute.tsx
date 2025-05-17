"use client";

import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "@/app/(providers)/AuthContext";
import { Loader2 } from "lucide-react";

const PUBLIC_ROUTES = ["/", "/auth/login", "/auth/register"];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user,loading } = useContext(AuthContext)!;
  console.log("user----->", user);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    if (!loading) {
      if (!user && !PUBLIC_ROUTES.includes(pathname)) {
        router.push("/auth/login");
      }
    }
  }, [user, loading, pathname, router]);

  useEffect(() => {
    if (loading) return;

    // Redirect unauthenticated users
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      const role = user.role;

      // Block JOBSEEKER from EMPLOYER-specific routes
      if (role === "JOBSEEKER" && pathname.includes("/employer")) {
        router.push("/job-seeker/dashboard");
        return;
      }

      // Block EMPLOYER from JOBSEEKER-specific routes
      if (role === "EMPLOYER" && pathname.includes("/job-seeker")) {
        router.push("/employer/dashboard");
        return;
      }
    }
  }, [user, loading, pathname, router]);


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div> */}
          <Loader2 className="animate-spin" />
          <p className="text-center text-lg mt-2">Loading...</p>
        </div>
      </div>
    ); 
  }

  return <>{children}</>;
}
