"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Briefcase,
    Bell,
    MessageSquare,
    Bookmark,
    MapPin,
    DollarSign,
    TrendingUp,
    Share2,
    BookmarkPlus,
    Clock,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { useState } from "react"

const profileViewsData = [
    { day: "Mon", views: 45 },
    { day: "Tue", views: 52 },
    { day: "Wed", views: 49 },
    { day: "Thu", views: 62 },
    { day: "Fri", views: 58 },
    { day: "Sat", views: 40 },
    { day: "Sun", views: 35 },
]

const recruiterActions = [
    { title: "Profile Views", value: 1245, increase: 12 },
    { title: "Search Appearances", value: 3721, increase: 18 },
    { title: "InMail Response Rate", value: 89, increase: 5 },
]

const recommendedJobs = [
    {
        id: 1,
        position: "Senior Developer",
        company: "Tech Corp",
        logo: "/company-logo.png",
        location: "San Francisco, CA",
        salary: "$120k - $150k",
        type: "Full-time",
        experience: "5+ years",
        matchPercentage: 95,
        isNew: true,
        skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
        id: 2,
        position: "Senior Developer",
        company: "Tech Corp",
        logo: "/company-logo.png",
        location: "San Francisco, CA",
        salary: "$120k - $150k",
        type: "Full-time",
        experience: "5+ years",
        matchPercentage: 95,
        isNew: true,
        skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
        id: 3,
        position: "Senior Developer",
        company: "Tech Corp",
        logo: "/company-logo.png",
        location: "San Francisco, CA",
        salary: "$120k - $150k",
        type: "Full-time",
        experience: "5+ years",
        matchPercentage: 95,
        isNew: true,
        skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
        id: 4,
        position: "Senior Developer",
        company: "Tech Corp",
        logo: "/company-logo.png",
        location: "San Francisco, CA",
        salary: "$120k - $150k",
        type: "Full-time",
        experience: "5+ years",
        matchPercentage: 95,
        isNew: true,
        skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
]

const appliedJobs = [
    { id: 1, company: "InnoTech", position: "Frontend Developer", status: "Interview", logo: "/placeholder.svg" },
    { id: 2, company: "DataCorp", position: "Data Analyst", status: "Applied", logo: "/placeholder.svg" },
    {
        id: 3,
        company: "AI Solutions",
        position: "Machine Learning Engineer",
        status: "Rejected",
        logo: "/placeholder.svg",
    },
]

const messages = [
    {
        id: 1,
        sender: "John Doe",
        company: "TechGiant",
        message: "We'd like to schedule an interview...",
        avatar: "/placeholder.svg",
    },
    {
        id: 2,
        sender: "Jane Smith",
        company: "InnoSoft",
        message: "Thank you for your application...",
        avatar: "/placeholder.svg",
    },
]

export default function Dashboard() {
    const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());

    const toggleBookmark = (jobId: unknown) => {
        setBookmarkedJobs(prev => {
            const newBookmarks = new Set(prev);
            if (newBookmarks.has(jobId)) {
                newBookmarks.delete(jobId);
            } else {
                newBookmarks.add(jobId);
            }
            return newBookmarks;
        });
    };
    return (
        <div className="space-y-8 bg-gray-50 md:p-2  rounded-xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Applied Jobs", value: 22, subtext: "5 new this week", icon: Briefcase, color: "blue" },
                    { title: "Job Alerts", value: "9,382", subtext: "142 new alerts", icon: Bell, color: "purple" },
                    { title: "Messages", value: 74, subtext: "12 unread", icon: MessageSquare, color: "red" },
                    { title: "Shortlisted", value: 32, subtext: "8 new opportunities", icon: Bookmark, color: "green" },
                ].map((item, index) => (
                    <Card
                        key={index}
                        className={`bg-white border-l-4 border-${item.color}-500 shadow-sm hover:shadow-md transition-shadow rounded-xl`}
                    >
                        <CardHeader className="flex flex-row items-center justify-between py-4">
                            <CardTitle className="text-base font-medium text-gray-700">{item.title}</CardTitle>
                            <item.icon className={`h-5 w-5 text-${item.color}-500`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                            <p className="text-xs mt-1 text-gray-500">{item.subtext}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-10">
                <Card className="md:col-span-7 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800">Profile Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={profileViewsData}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="day" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="views" stroke="#3b82f6" fillOpacity={1} fill="url(#colorViews)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-3 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800">Recruiter Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recruiterActions.map((action, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-500">{action.title}</p>
                                        <p className="text-xl font-bold text-gray-900">{action.value}</p>
                                    </div>
                                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        {action.increase}%
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl">
                <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-semibold text-gray-800">Recommended Jobs</CardTitle>
                            <p className="text-sm text-gray-500 mt-1">Personalized matches based on your profile</p>
                        </div>
                        <Button variant="outline" className="text-gray-600">
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {recommendedJobs.map((job) => (
                            <Card
                                key={job.id}
                                className="group flex flex-col bg-white border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 rounded-xl"
                            >
                                <CardHeader className="flex-row gap-4 items-start p-4">
                                    <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                                        <AvatarImage src={job.logo} alt={job.company} />
                                        <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">
                                            {job.company[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {job.position}
                                        </CardTitle>
                                        <p className="text-sm font-medium text-gray-600">{job.company}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                                                {job.matchPercentage}% Match
                                            </Badge>
                                            {job.isNew && (
                                                <Badge className="bg-green-50 text-green-700 border-green-100">
                                                    New
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 p-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="truncate">{job.location}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="truncate">{job.salary}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="truncate">{job.type}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                                            <span className="truncate">{job.experience}</span>
                                        </div>
                                    </div>
                                    {job.skills && (
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.slice(0, 3).map((skill) => (
                                                <Badge
                                                    key={skill}
                                                    variant="outline"
                                                    className="bg-gray-50 text-gray-600 border-gray-200"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {job.skills.length > 3 && (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-gray-50 text-gray-600 border-gray-200"
                                                >
                                                    +{job.skills.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                                <div className="p-4 bg-gray-50 flex items-center justify-between gap-2 mt-auto border-t border-gray-100 rounded-b-xl">
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="text-gray-500 hover:text-blue-600"
                                            onClick={() => toggleBookmark(job.id)}
                                        >
                                            <BookmarkPlus
                                                className={bookmarkedJobs.has(job.id) ? "fill-blue-600 text-blue-600" : ""}
                                            />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="text-gray-500 hover:text-blue-600"
                                        >
                                            <Share2 />
                                        </Button>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium px-6"
                                    >
                                        Apply Now
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Applied Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {appliedJobs.map((job) => (
                            <div
                                key={job.id}
                                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={job.logo} alt={job.company} />
                                    <AvatarFallback>{job.company[0]}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 flex-1">
                                    <h4 className="text-base font-semibold text-gray-900">{job.position}</h4>
                                    <p className="text-sm text-gray-600">{job.company}</p>
                                </div>
                                <Badge
                                    variant={
                                        job.status === "Interview" ? "default" : job.status === "Applied" ? "secondary" : "destructive"
                                    }
                                >
                                    {job.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={message.avatar} alt={message.sender} />
                                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900">{message.sender}</h4>
                                    <p className="text-xs text-gray-600">{message.company}</p>
                                    <p className="text-sm mt-1 text-gray-700">{message.message}</p>
                                </div>
                                <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Reply
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>


        </div>
    )
}

