"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
    Menu,
    Heart,
} from "lucide-react"
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
// import Dashboard from "./Dashboard"
import Profile from "./Profile"
import { Badge } from "@/components/ui/badge"

const navigation = [
    { name: "Dashboard", href: "#", icon: Home, current: true },
    { name: "My Profile", href: "#", icon: User, current: false },
    { name: "My Resume", href: "#", icon: FileText, current: false },
    { name: "Applied Jobs", href: "#", icon: Briefcase, current: false },
    { name: "Shortlisted Jobs", href: "#", icon: Bookmark, current: false },
    { name: "Saved Jobs", href: "#", icon: Heart, current: false },
    { name: "Messages", href: "#", icon: Mail, current: false },
    { name: "Job Alerts", href: "#", icon: Bell, current: false },
]

const secondaryNavigation = [
    { name: "Change Password", href: "#", icon: Lock },
    { name: "Logout", href: "#", icon: LogOut },
    { name: "Delete Profile", href: "#", icon: Trash2 },
]

export default function JobSeekerDashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [count, setCount] = useState(99);

    const handleClick = () => {
        setCount(0);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b bg-white">
                <div className="flex h-16 items-center px-4 md:px-6">
                    <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2 font-semibold">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                        <span className="text-xl">Recruit-G</span>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className="hidden md:flex md:items-center md:gap-4">
                            <Input placeholder="Search jobs..." className="w-[200px] lg:w-[300px]" />
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
                            <Button variant="ghost" size="icon" className="text-gray-500">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Favorites</span>
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
                                        <p className="text-sm font-medium leading-none">John Doe</p>
                                        <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
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

            <div className="flex h-[calc(100vh-4rem)]"> {/* Set height to viewport minus header height */}
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
                                            item.current ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50",
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                "mr-3 h-5 w-5 flex-shrink-0",
                                                item.current ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
                                            )}
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="border-t p-4"> {/* Add consistent padding */}
                            <nav className="space-y-1">
                                {secondaryNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        <item.icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Profile  />
                </div>
            </div>
        </div>
    )
}