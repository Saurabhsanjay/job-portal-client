"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Users,
  Mail,
  LineChart,
  Layout,
  BookOpen,
  FileText,
  Bell,
  FileCode,
  ShieldCheck,
  UserCog,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { Notifications } from "@/app/(containers)/notifications/Notifications"

// Updated navigation for institute panel
const navigation = [
  { name: "Dashboard", href: "/institute/dashboard", icon: BarChart3, current: true },
  { name: "Collaboration Tools", href: "/institute/collaboration-tools", icon: Users, current: false },
  { name: "Placement Analytics", href: "/institute/placement-analytics", icon: Mail, current: false },
  { name: "Skill Development", href: "/institute/skill-development", icon: LineChart, current: false },
  { name: "Candidate Scoring", href: "/institute/candidate-scoring", icon: Layout, current: false },
  { name: "Reports & Insights", href: "/institute/insights-reports", icon: FileText, current: false },
  { name: "Job Market Integration", href: "/institute/job-market", icon: Bell, current: false },
  { name: "Student Management", href: "/institute/student-management", icon: FileCode, current: false },
]

const secondaryNavigation = [
  { name: "Change Password", href: "/institute/change-password", icon: Bell },
  { name: "Logout", href: "/institute/logout", icon: Bell },
]

const notifications = [
  {
    id: "1",
    title: "New User Registration",
    description: "10 new users registered in the last hour.",
    timestamp: new Date(2024, 1, 1, 10, 0),
    read: false,
  },
  {
    id: "2",
    title: "System Alert",
    description: "High server load detected. Consider scaling resources.",
    timestamp: new Date(2024, 1, 1, 9, 45),
    read: false,
  },
  {
    id: "3",
    title: "Fraud Detection",
    description: "Suspicious activity detected on employer account ID #4532.",
    timestamp: new Date(2024, 1, 1, 9, 30),
    read: true,
  },
  // Additional notifications can be added here
]

export default function InstituteDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [count, setCount] = useState(99)
  const pathname = usePathname()
  const handleClick = () => {
    setCount(0)
  }

  return (
    <div className=" bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Button variant="ghost" size="icon" className=" mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="text-xl">Recruit-G Institute</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className=" flex md:items-center md:gap-4">
              <Notifications
                notifications={notifications}
                trigger={
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
                }
                onMarkAsRead={(id) => console.log("Mark as read:", id)}
                onSeeAll={() => console.log("See all clicked")}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="@admin" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Institute User</p>
                    <p className="text-xs leading-none text-muted-foreground">institute@recruit-g.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
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
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
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
                      pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        pathname === item.href ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
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
                      pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        pathname === item.href ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
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
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  )
}

