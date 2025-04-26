"use client"

import { useState, useEffect } from "react"
import { useApiGet, useApiPost } from "@/hooks/use-api-query"
import { useAuth } from "@/app/(providers)/AuthContext"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Loader2,
  ChevronRight,
  Building2,
} from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import toast from "react-hot-toast"

// Types
interface JobApplicationResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: {
    applications: JobApplication[]
    pagination: Pagination
  }
}

interface JobApplication {
  _id: string
  jobId: JobDetails
  candidateId: string
  status: "APPLIED" | "SHORTLISTED" | "REJECTED"
  isShortlisted: boolean
  appliedDate: string
  shortlistedDate?: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface JobDetails {
  _id: string
  title: string
  validTill: string
  status: "ACTIVE" | "INACTIVE"
}

interface Pagination {
  total: number
  page: number
  limit: number
  pages: number
}

interface BookmarkResponse {
  status: "SUCCESS" | "FAILURE"
  statusCode: number
  message: string
  formattedMessage: string
  data: {
    isBookmarked: boolean
    isDeleted: boolean
    _id: string
    jobId: string
    candidateId: string
    status: "SHORTLISTED" | "REJECTED" | "PENDING"
    isShortlisted: boolean
    appliedDate: string
    shortlistedDate: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

interface BookmarkRequest {
  jobId: string
  candidateId: string
  isBookmarked: boolean
}

// Mock data
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
    logo: "/placeholder.svg",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    experience: "5+ years",
    matchPercentage: 95,
    isNew: true,
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    id: 2,
    position: "UX Designer",
    company: "Design Studio",
    logo: "/placeholder.svg",
    location: "New York, NY",
    salary: "$90k - $110k",
    type: "Full-time",
    experience: "3+ years",
    matchPercentage: 88,
    isNew: true,
    skills: ["Figma", "UI/UX", "Prototyping", "User Research"],
  },
  {
    id: 3,
    position: "Product Manager",
    company: "Innovate Inc",
    logo: "/placeholder.svg",
    location: "Remote",
    salary: "$130k - $160k",
    type: "Full-time",
    experience: "4+ years",
    matchPercentage: 92,
    isNew: false,
    skills: ["Product Strategy", "Agile", "Roadmapping", "Analytics"],
  },
  {
    id: 4,
    position: "DevOps Engineer",
    company: "Cloud Systems",
    logo: "/placeholder.svg",
    location: "Austin, TX",
    salary: "$115k - $140k",
    type: "Full-time",
    experience: "2+ years",
    matchPercentage: 85,
    isNew: false,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
]

export default function MobileDashboard() {
  const { user } = useAuth()
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set())
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([])
  const bookmarkJobMutation = useApiPost<BookmarkResponse, BookmarkRequest>()

  // Fetch applied jobs
  const { data: appliedJobsData, isLoading: isLoadingAppliedJobs } = useApiGet<JobApplicationResponse>(
    `applied-candidates/candidate/${user?.id}`,
    ["applied-jobs"],
  )

  useEffect(() => {
    if (appliedJobsData) {
      setAppliedJobs(appliedJobsData?.data?.applications || [])
    }
  }, [appliedJobsData])

  // Toggle bookmark
  const toggleBookmark = (jobId: unknown) => {
    setBookmarkedJobs((prev) => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(jobId)) {
        newBookmarks.delete(jobId)
      } else {
        newBookmarks.add(jobId)
      }
      return newBookmarks
    })

    bookmarkJobMutation.mutate(
      {
        endpoint: "applied-candidates/bookmark-applied-candidate",
        payload: {
          jobId: "67e943dcbcb3d3e8419a8796",
          candidateId: user?.id || "",
          isBookmarked: !bookmarkedJobs.has(jobId),
        },
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Job bookmark updated")
          } else if (response.error) {
            toast.error(response?.error?.message || "Something went wrong")
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Something went wrong")
        },
      },
    )
  }

  if (isLoadingAppliedJobs) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
        <span>Loading dashboard...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 scroll-y max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Stats Cards */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-2">
          {[
            {
              title: "Applied Jobs",
              value: appliedJobs.length || 0,
              subtext: "5 new this week",
              icon: Briefcase,
              color: "blue",
            },
            {
              title: "Job Alerts",
              value: "9,382",
              subtext: "142 new alerts",
              icon: Bell,
              color: "purple",
            },
            {
              title: "Messages",
              value: 74,
              subtext: "12 unread",
              icon: MessageSquare,
              color: "red",
            },
            {
              title: "Shortlisted",
              value: 32,
              subtext: "8 new opportunities",
              icon: Bookmark,
              color: "green",
            },
          ].map((item, index) => (
            <Card key={index} className={`min-w-[200px] bg-white border-l-4 border-${item.color}-500 shadow-sm`}>
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Recommended Jobs */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recommended Jobs</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {recommendedJobs.map((job) => (
              <Card
                key={job.id}
                className="min-w-[280px] max-w-[280px] group flex flex-col bg-white border hover:border-blue-200 hover:shadow-md transition-all duration-300"
              >
                <CardHeader className="flex-row gap-4 items-start p-4">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                    <AvatarImage src={job.logo || "/placeholder.svg"} alt={job.company} />
                    <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">{job.company[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.position}
                    </CardTitle>
                    <p className="text-sm font-medium text-gray-600">{job.company}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                        {job.matchPercentage}% Match
                      </Badge>
                      {job.isNew && <Badge className="bg-green-50 text-green-700 border-green-100">New</Badge>}
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
                </CardContent>
                <CardFooter className="p-4 bg-gray-50 flex items-center justify-between gap-2 mt-auto border-t">
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-gray-500 hover:text-blue-600"
                      onClick={() => toggleBookmark(job.id)}
                    >
                      <BookmarkPlus className={bookmarkedJobs.has(job.id) ? "fill-blue-600 text-blue-600" : ""} />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-gray-500 hover:text-blue-600">
                      <Share2 />
                    </Button>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium">
                    Apply
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Profile Performance & Recruiter Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Profile Performance</h2>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="h-[200px]">
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

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recruiter Actions</CardTitle>
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

      {/* Recent Applied Jobs */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
          <Button variant="ghost" size="sm" className="text-blue-600" asChild>
            <a href="/mobile/applied-jobs">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>

        <div className="space-y-3">
          {appliedJobs.length > 0 ? (
            appliedJobs.slice(0, 3).map((job, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="Company" />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{job.jobId.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Building2 className="h-3 w-3 mr-1" />
                        <span>Company Name</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge
                          variant="outline"
                          className={
                            job.status === "APPLIED"
                              ? "bg-blue-50 text-blue-700"
                              : job.status === "SHORTLISTED"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                          }
                        >
                          {job.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{new Date(job.appliedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-white">
              <CardContent className="p-6 text-center">
                <Briefcase className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No applications yet</p>
                <Button className="mt-4" size="sm">
                  Browse Jobs
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
