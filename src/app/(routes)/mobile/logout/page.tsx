"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/app/(providers)/AuthContext";

export default function MobileLogout() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Add a small delay to show the loading state
    setTimeout(() => {
      logout();
      router.push("/login");
    }, 1000);
  };

  const handleCancel = () => {
    router.push("/mobile/profile");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={handleCancel}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Log Out</h1>
      </div>

      <Card className="bg-white">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
          <p className="text-gray-600 mb-6">
            Do you want to log out? You will need to log in again to access your
            account.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Log Out"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
