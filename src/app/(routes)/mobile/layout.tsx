"use client";

import type React from "react";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Briefcase,
  Bell,
  User,
  Menu,
  Search,
  FileText,
  Bookmark,
  Heart,
  Mail,
  Lock,
  LogOut,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
// import PWAInstallPrompt from "@/pwa/pwa-install-prompt"
import PWARegister from "@/pwa/pwa-register";
import { useApiGet } from "@/hooks/use-api-query";
import { useAuth } from "@/app/(providers)/AuthContext";

interface UserProfile {
  data: {
    personalDetails: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: {
        countryCode: string;
        number: string;
      };
      profilePicture: string;
      gender: string;
      age: string;
      address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
      };
      bio: string;
      languages: string[];
    };
    jobSeekerDetails: {
      education: any[];
      professionalExperience: any[];
      achivements: any[];
      professionalDetails: {
        currentJobTitle: string;
        skills: string[];
        noticePeriod: string;
        currentCTC: number;
        expectedCTC: number;
        employmentType: string;
        website: string;
        linkedIn: string;
        facebook: string;
        portfolio: string;
      };
    };
  };
}

const navigation = [
  { name: "Dashboard", href: "/mobile/dashboard", icon: Home },
  { name: "My Profile", href: "/mobile/update-profile", icon: User },
  { name: "My Resume", href: "/mobile/resume", icon: FileText },
  { name: "Applied Jobs", href: "/mobile/applied-jobs", icon: Briefcase },
  {
    name: "Shortlisted Jobs",
    href: "/mobile/shortlisted-jobs",
    icon: Bookmark,
  },
  { name: "Saved Jobs", href: "/mobile/saved-jobs", icon: Heart },
  { name: "Messages", href: "/mobile/messages", icon: Mail },
  { name: "Job Alerts", href: "/mobile/alerts", icon: Bell },
];

const secondaryNavigation = [
  { name: "Change Password", href: "/mobile/change-password", icon: Lock },
  { name: "Logout", href: "/mobile/logout", icon: LogOut },
  { name: "Delete Profile", href: "/mobile/delete-account", icon: Trash2 },
];

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notificationCount, setNotificationCount] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  // Handle notification click
  const handleNotificationClick = () => {
    setNotificationCount(0);
    router.push("/mobile/alerts");
  };

  const { data: profileData, isLoading } = useApiGet<UserProfile>(
    "users/get-profile",
    user?.id ? { userId: user.id } : null,
    [user?.id, "user-profile"]
  );

  const personalDetails = profileData?.data?.personalDetails;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PWARegister />
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 w-full bg-white border-b">
        <div className="flex h-14 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>

          <div className="flex-1 mx-2 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              className="pl-8 h-9 md:w-[200px] lg:w-[300px]"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                {notificationCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Sidebar Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src={personalDetails?.profilePicture || "/placeholder.svg"}
                  alt={`${personalDetails?.firstName} ${personalDetails?.lastName}`}
                />
                <AvatarFallback>
                  {personalDetails?.firstName?.[0]}
                  {personalDetails?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {personalDetails?.firstName} {personalDetails?.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {personalDetails?.email || "Not specified"}
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <div className="space-y-1 px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      pathname === item.href ? "text-blue-600" : "text-gray-500"
                    )}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="space-y-1 px-3">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5",
                        pathname === item.href
                          ? "text-blue-600"
                          : "text-gray-500"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-16">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t flex justify-around items-center h-16">
        <Link
          href="/mobile/dashboard"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            pathname === "/mobile/dashboard" ? "text-blue-600" : "text-gray-500"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/mobile/applied-jobs"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            pathname === "/mobile/applied-jobs"
              ? "text-blue-600"
              : "text-gray-500"
          )}
        >
          <Briefcase className="h-5 w-5" />
          <span className="text-xs mt-1">Applied</span>
        </Link>
        <Link
          href="/mobile/messages"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            pathname === "/mobile/alerts" ? "text-blue-600" : "text-gray-500"
          )}
        >
          <Mail className="h-5 w-5" />
          <span className="text-xs mt-1">Message</span>
        </Link>
        <Link
          href="/mobile/profile"
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full",
            pathname === "/mobile/profile" ? "text-blue-600" : "text-gray-500"
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
      {/* <PWAInstallPrompt /> */}
    </div>
  );
}
