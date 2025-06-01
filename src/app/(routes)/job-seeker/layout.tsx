"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Home,
  User,
  FileText,
  Bell,
  Bookmark,
  Mail,
  Lock,
  LogOut,
  Trash2,
  Heart,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import Dashboard from "./Dashboard"
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter } from "next/navigation";
import { useApiGet } from "@/hooks/use-api-query";
import type { IJob } from "../job-listings/types/job.types";
import { useAuth } from "@/app/(providers)/AuthContext";
import Image from "next/image";

const navigation = [
  {
    name: "Dashboard",
    href: "/job-seeker/dashboard",
    icon: Home,
    current: true,
  },
  {
    name: "My Profile",
    href: "/job-seeker/profile",
    icon: User,
    current: false,
  },
  {
    name: "My Resume",
    href: "/job-seeker/resume",
    icon: FileText,
    current: false,
  },
  {
    name: "Applied Jobs",
    href: "/job-seeker/applied-jobs",
    icon: Briefcase,
    current: false,
  },
  {
    name: "Shortlisted Jobs",
    href: "/job-seeker/shortlisted-jobs",
    icon: Bookmark,
    current: false,
  },
  {
    name: "Saved Jobs",
    href: "/job-seeker/saved-jobs",
    icon: Heart,
    current: false,
  },
  {
    name: "Messages",
    href: "/job-seeker/messages",
    icon: Mail,
    current: false,
  },
  {
    name: "Job Alerts",
    href: "/job-seeker/alerts",
    icon: Bell,
    current: false,
  },
];

const secondaryNavigation = [
  { name: "Change Password", href: "/job-seeker/change-password", icon: Lock },
  { name: "Logout", href: "/job-seeker/logout", icon: LogOut },
];

export default function JobSeekerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [count, setCount] = useState(99);
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { user } = useAuth();
  const handleClick = () => {
    setCount(0);
  };

  const {
    data: jobListData,
    isLoading: isLoadingJobList,
    error: jobListError,
  } = useApiGet<IJob[]>(
    `jobs/get-jobs`,
    ["get-jobs"] // Query key for caching
  );

  const filteredJobs =
    searchTerm.trim() === ""
      ? []
      : jobListData?.data
          ?.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 6) || [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchDropdownOpen || filteredJobs.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredJobs.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedJob = filteredJobs[selectedIndex];
      setSearchTerm(selectedJob.title);
      setIsSearchDropdownOpen(false);
      router.push(
        `/job-listings?title=${encodeURIComponent(selectedJob.title)}`
      );
    } else if (e.key === "Escape") {
      setIsSearchDropdownOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4 md:px-6">
          {/* <Button variant="ghost" size="icon" className=" mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button> */}

            <div className="bg-blue-600 rounded-lg p-2">
              <Image
                src="/recruitg.png"
                alt="Recruit-G"
                width={140}
                height={40}
                className="h-6 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden md:flex md:items-center md:gap-4">
              {/* <Input
                placeholder="Search jobs..."
                className="w-[200px] lg:w-[300px]"
              /> */}
              <Input
                placeholder="Search jobs..."
                className="w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedIndex(-1);
                  // Only show dropdown if we have results
                  setIsSearchDropdownOpen(
                    jobListData?.data?.filter((job) =>
                      job.title
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    ).length > 0
                  );
                }}
                onKeyDown={handleKeyDown}
              />

              {isSearchDropdownOpen && filteredJobs.length > 0 && (
                <div className="absolute top-full right-25 w-[20%] mt-1 bg-white border rounded-md shadow-lg z-50">
                  <div className="max-h-[300px] overflow-y-auto p-1">
                    {isLoadingJobList ? (
                      <div className="p-3 text-center text-sm text-muted-foreground">
                        Loading...
                      </div>
                    ) : jobListError ? (
                      <div className="p-3 text-center text-sm text-red-500">
                        Error loading jobs
                      </div>
                    ) : (
                      filteredJobs.map((job, index) => (
                        <div
                          key={job.id}
                          className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-sm ${
                            selectedIndex === index
                              ? "bg-blue-50 text-blue-600"
                              : ""
                          }`}
                          onClick={() => {
                            setSearchTerm(job.title);
                            setIsSearchDropdownOpen(false);
                            router.push(
                              `/job-listings?title=${encodeURIComponent(
                                job.title
                              )}`
                            );
                          }}
                        >
                          {job.title}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setIsSearchDropdownOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={handleClick}
                aria-label="Notifications"
              >
                <Bell size={16} strokeWidth={2} aria-hidden="true" />
                {count > 0 && (
                  <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
                    {count > 99 ? "99+" : count}
                  </Badge>
                )}
              </Button>
              {/* <Button variant="ghost" size="icon" className="text-gray-500">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Favorites</span>
                            </Button> */}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/job-seeker/profile")}
                >
                  Profile
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                <DropdownMenuItem
                  onClick={() => router.push("/job-seeker/logout")}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        {" "}
        {/* Set height to viewport minus header height */}
        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-16 left-0 z-50 w-64 transform bg-white border-r transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto md:h-full",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto">
              <nav className="space-y-1 p-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg",
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        pathname === item.href
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              {" "}
              {/* Add consistent padding */}
              <nav className="space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg",
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        pathname === item.href
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
