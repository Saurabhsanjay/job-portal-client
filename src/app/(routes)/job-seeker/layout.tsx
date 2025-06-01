"use client"

import React from "react"

import type { ReactNode } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Briefcase, Home, User, FileText, Bell, Bookmark, Mail, Lock, LogOut, Heart, Menu, Search, MapPin, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { usePathname, useRouter } from "next/navigation"
import { useApiGet } from "@/hooks/use-api-query"
import type { IJob } from "../job-listings/types/job.types"
import { useAuth } from "@/app/(providers)/AuthContext"
import Image from "next/image"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SearchFormData = {
  query: string
  location: string
  category: string
}

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
]

const secondaryNavigation = [
  { name: "Change Password", href: "/job-seeker/change-password", icon: Lock },
  { name: "Logout", href: "/job-seeker/logout", icon: LogOut },
]

export default function JobSeekerDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [count, setCount] = useState(99)
  const pathname = usePathname()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const { user } = useAuth()

  const handleClick = () => {
    setCount(0)
  }

  const {
    data: jobListData,
    isLoading: isLoadingJobList,
    error: jobListError,
  } = useApiGet<IJob[]>(
    `jobs/get-jobs`,
    ["get-jobs"], // Query key for caching
  )

  const filteredJobs =
    searchTerm.trim() === ""
      ? []
      : jobListData?.data?.filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 6) || []

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchDropdownOpen || filteredJobs.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < filteredJobs.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      const selectedJob = filteredJobs[selectedIndex]
      setSearchTerm(selectedJob.title)
      setIsSearchDropdownOpen(false)
      router.push(`/job-listings?title=${encodeURIComponent(selectedJob.title)}`)
    } else if (e.key === "Escape") {
      setIsSearchDropdownOpen(false)
    }
  }

  // Keyboard shortcut for sidebar toggle
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setSidebarCollapsed(!sidebarCollapsed)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [sidebarCollapsed])

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 w-full border-b bg-white">
          <div className="flex h-16 items-center px-4 md:px-6">
            {/* Sidebar Toggle Button */}
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="bg-blue-600 rounded-lg p-2">
              <Image
                src="/recruitg.png"
                alt="Recruit-G"
                width={140}
                height={40}
                className="h-5 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <div className="hidden md:flex md:items-center md:gap-4">
              <SearchJobsModal />
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
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/job-seeker/profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/job-seeker/logout")}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>

        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <div
            className={cn(
              "fixed inset-y-16 left-0 z-50 transform bg-white border-r transition-all duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:h-full",
              sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
              sidebarCollapsed ? "w-16" : "w-64",
            )}
          >
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-y-auto">
                <nav className="space-y-1 p-4">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    const NavItem = (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                          isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50",
                          sidebarCollapsed ? "justify-center" : "",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0 transition-all duration-200",
                            isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
                            sidebarCollapsed ? "mr-0" : "mr-3",
                          )}
                        />
                        {!sidebarCollapsed && <span className="transition-opacity duration-200">{item.name}</span>}
                      </Link>
                    )

                    if (sidebarCollapsed) {
                      return (
                        <Tooltip key={item.name}>
                          <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    }

                    return NavItem
                  })}
                </nav>
              </div>
              <div className="border-t p-4">
                <nav className="space-y-1">
                  {secondaryNavigation.map((item) => {
                    const isActive = pathname === item.href
                    const NavItem = (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                          isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50",
                          sidebarCollapsed ? "justify-center" : "",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0 transition-all duration-200",
                            isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
                            sidebarCollapsed ? "mr-0" : "mr-3",
                          )}
                        />
                        {!sidebarCollapsed && <span className="transition-opacity duration-200">{item.name}</span>}
                      </Link>
                    )

                    if (sidebarCollapsed) {
                      return (
                        <Tooltip key={item.name}>
                          <TooltipTrigger asChild>{NavItem}</TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    }

                    return NavItem
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div
            className={cn(
              "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 transition-all duration-300",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

function SearchJobsModal() {
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, control, reset } = useForm<SearchFormData>({
    defaultValues: {
      query: "",
      location: "",
      category: "all",
    },
  })

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()

      if (data.query.trim()) {
        params.set("keywords", data.query.trim())
      }

      if (data.location.trim()) {
        params.set("location", data.location.trim())
      }

      if (data.category && data.category !== "all") {
        params.set("category", data.category)
      }

      // Redirect to job listings with search parameters
      const queryString = params.toString()
      const url = queryString ? `/job-listings?${queryString}` : "/job-listings"

      router.push(url)
      toast.success("Redirecting to job listings...")
      setIsOpen(false)
      reset() // Reset form after successful search
    } catch (error) {
      toast.error("Failed to perform search. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden md:flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search Jobs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Search Jobs</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Job Title/Keywords Field */}
            <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 group focus-within:bg-gray-50 transition-colors">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 mr-3 flex-shrink-0 transition-colors" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500"
                {...register("query")}
              />
            </div>

            {/* Location Field */}
            <div className="flex-1 flex items-center px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200 group focus-within:bg-gray-50 transition-colors">
              <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 mr-3 flex-shrink-0 transition-colors" />
              <input
                type="text"
                placeholder="City, state, or country"
                className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500"
                {...register("location")}
              />
            </div>

            {/* Category Field */}
            <div className="flex-1 flex items-center px-4 py-3 group focus-within:bg-gray-50 transition-colors">
              <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 mr-3 flex-shrink-0 transition-colors" />
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="border-none shadow-none focus:ring-0 p-0 h-auto">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="IT Software Jobs">Technology</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing Jobs">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Sales Jobs">Sales</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Health Care">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Jobs
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
