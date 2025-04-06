"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Briefcase,
    Home,
    FileText,
    Bell,
    Mail,
    Lock,
    LogOut,
    Trash2,
    Menu,
    Heart,
    X,
    Building2,
    Search,
    Star,
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
// import Dashboard from "./Dashboard"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { Notifications } from "@/app/(containers)/notifications/Notifications"
import { useRouter } from "next/navigation"


const navigation = [
    { name: "Dashboard", href: "/employer/dashboard", icon: Home, current: true },
    { name: "Profile", href: "/employer/profile", icon: Building2, current: false },
    { name: "Talent Scout", href: "/employer/talent-sourcing", icon: Search, current: false },
    { name: "Jobs", href: "/employer/jobs", icon: Briefcase, current: false },
    // { name: "Shortlisted Candidates", href: "/employer/shortlisted-candidates", icon: Star, current: false },
    { name: "Messages", href: "/employer/messages", icon: Mail, current: false },
    { name: "Automations", href: "/employer/automations", icon: FileText, current: false },
]
const secondaryNavigation = [
    { name: "Change Password", href: "/employer/change-password", icon: Lock },
    // { name: "Logout", href: "/employer/logout", icon: LogOut },
    { name: "Delete Profile", href: "/employer/delete-account", icon: Trash2 },
]


const notifications = [
    {
        id: "1",
        title: "Application Received",
        description: "Your application for the Software Engineer position at TechCorp has been received.",
        timestamp: new Date(2024, 1, 1, 10, 0),
        read: false,
    },
    {
        id: "2",
        title: "Interview Scheduled",
        description: "Your interview for the Product Manager position at InnoTech is scheduled for March 5th, 2024.",
        timestamp: new Date(2024, 1, 1, 9, 45),
        read: false,
    },
    {
        id: "3",
        title: "Application Under Review",
        description: "Your application for the Data Analyst position at DataCorp is currently under review.",
        timestamp: new Date(2024, 1, 1, 9, 30),
        read: true,
    },
    {
        id: "4",
        title: "Job Offer Extended",
        description: "Congratulations! You have been offered the Machine Learning Engineer position at AI Solutions.",
        timestamp: new Date(2024, 1, 1, 9, 15),
        read: false,
    },
    {
        id: "5",
        title: "Position Filled",
        description: "The Frontend Developer position at WebWorks has been filled.",
        timestamp: new Date(2024, 1, 1, 9, 0),
        read: false,
    },
    {
        id: "6",
        title: "Application Withdrawn",
        description: "You have successfully withdrawn your application for the Marketing Specialist position at AdVenture.",
        timestamp: new Date(2024, 1, 1, 8, 45),
        read: false,
    },
    {
        id: "7",
        title: "New Job Posting",
        description: "A new Backend Developer position at CodeBase has been posted.",
        timestamp: new Date(2024, 1, 1, 8, 30),
        read: true,
    },
    {
        id: "8",
        title: "Application Rejected",
        description: "We regret to inform you that your application for the UX Designer position at DesignHub was not successful.",
        timestamp: new Date(2024, 1, 1, 8, 15),
        read: false,
    },
    {
        id: "9",
        title: "Application Status Updated",
        description: "The status of your application for the Project Manager position at BuildTech has been updated.",
        timestamp: new Date(2024, 1, 1, 8, 0),
        read: false,
    },
    {
        id: "10",
        title: "Interview Reminder",
        description: "Reminder: Your interview for the Software Engineer position at TechCorp is scheduled for tomorrow.",
        timestamp: new Date(2024, 1, 1, 7, 45),
        read: false,
    },
    {
        id: "11",
        title: "Offer Accepted",
        description: "You have accepted the offer for the Product Manager position at InnoTech.",
        timestamp: new Date(2024, 1, 1, 7, 30),
        read: true,
    },
    {
        id: "12",
        title: "Job Recommendation",
        description: "We recommend applying for the Data Scientist position at DataCorp based on your profile.",
        timestamp: new Date(2024, 1, 1, 7, 15),
        read: false,
    },
    {
        id: "13",
        title: "Application Submitted",
        description: "Your application for the Graphic Designer position at CreativeEdge has been submitted.",
        timestamp: new Date(2024, 1, 1, 7, 0),
        read: false,
    },
    {
        id: "14",
        title: "Interview Feedback",
        description: "Feedback from your interview for the Marketing Specialist position at AdVenture is available.",
        timestamp: new Date(2024, 1, 1, 6, 45),
        read: false,
    },
    {
        id: "15",
        title: "Job Application Reminder",
        description: "Reminder: Complete your application for the Backend Developer position at CodeBase.",
        timestamp: new Date(2024, 1, 1, 6, 30),
        read: true,
    },
]

export default function EmployerDashboardLayout({ children }: { children: React.ReactNode }) {
    const router=useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [count, setCount] = useState(99);
    const pathname = usePathname()
    const handleClick = () => {
        setCount(0);
    };

    return (
        <div className=" bg-gray-50">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b bg-white">
                <div className="flex h-16 items-center px-4 md:px-6">
                    <Button variant="ghost" size="icon" className=" mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                    <div className="flex items-center gap-2 font-semibold">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                        <span className="text-xl">Recruit-G</span>
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <div className=" flex md:items-center md:gap-4">
                            {/* <ModeToggle /> */}
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
                                <DropdownMenuItem onClick={() => router.push("/employer/logout")}>
                                    Log out
                                </DropdownMenuItem>
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
                        <div className="border-t p-4"> {/* Add consistent padding */}
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
                                        <item.icon className={cn(
                                            "mr-3 h-5 w-5 flex-shrink-0",
                                            pathname === item.href ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
                                        )} />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}                </div>
            </div>
        </div>
    )
}



/* 
on clcking on jobs go to jobs details
show candidates list for jobs 
on clicking  candidate show candidates details
candidates table should be there with pagination
candidate details should be there 
send message to candidate shoudl be there
automation setup we had to do 
send mail to rejected candidates send mail to shortlisted candidates
send mail who applies for job


*/