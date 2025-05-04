"use client";

import { Bell, Briefcase } from "lucide-react";
import { JobBoard } from "./_components/JobBoard";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/app/(providers)/AuthContext";
import { useApiGet } from "@/hooks/use-api-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function JobsPage() {
  const [count, setCount] = useState(99);
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    setCount(0);
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
          <div className="flex items-center gap-2 font-semibold cursor-pointer" onClick={() => router.push("/job-seeker/dashboard")}>
            <Briefcase className="h-6 w-6 text-blue-600" />
            <span className="text-xl">Recruit-G</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden md:flex md:items-center md:gap-4">
              {/* <Input
                      placeholder="Search jobs..."
                      className="w-[200px] lg:w-[300px]"
                    /> */}

              
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

      <JobBoard />
    </div>
  );
}
