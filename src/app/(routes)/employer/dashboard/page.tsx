"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Briefcase, TrendingUp, Clock, Calendar, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Progress } from "@/components/ui/progress" // Assuming you have a Progress component
import { useApiGet } from "@/hooks/use-api-query"
import { useAuth } from "@/app/(providers)/AuthContext"
import { useRouter } from "next/navigation"


const activeJobs = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote",
        applicants: 78,
        daysLeft: 5,
        status: "Active",
    },
    {
        id: 2,
        title: "Product Manager",
        department: "Product",
        location: "New York, NY",
        applicants: 56,
        daysLeft: 10,
        status: "Active",
    },
    {
        id: 3,
        title: "UX Designer",
        department: "Design",
        location: "San Francisco, CA",
        applicants: 34,
        daysLeft: 15,
        status: "Active",
    },
]

const topCandidates = [
    {
        id: 1,
        name: "Alice Johnson",
        role: "Senior Frontend Developer",
        matchPercentage: 95,
        status: "New",
        avatar: "/placeholder.svg",
    },
    {
        id: 2,
        name: "Bob Smith",
        role: "Product Manager",
        matchPercentage: 88,
        status: "Interviewed",
        avatar: "/placeholder.svg",
    },
    {
        id: 3,
        name: "Carol Williams",
        role: "UX Designer",
        matchPercentage: 92,
        status: "New",
        avatar: "/placeholder.svg",
    },
]

const upcomingInterviews = [
    {
        id: 1,
        candidate: "David Brown",
        role: "Senior Frontend Developer",
        date: "2024-03-15T10:00:00",
        type: "Video Call",
    },
    {
        id: 2,
        candidate: "Emma Davis",
        role: "Product Manager",
        date: "2024-03-16T14:30:00",
        type: "On-site",
    },
]

interface JobPostingsResponse {
    status: string;
    statusCode: number;
    message: string;
    formattedMessage: string;
    data: number;
}

interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  interface Location {
    coordinates: Coordinates;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    streetAddress: string;
    remoteRestriction: string;
  }
  
  interface JobPosting {
    _id: string;
    title: string;
    industry: string;
    applicationsCount: number;
    location: Location;
    remote: boolean;
    status: "ACTIVE" | "INACTIVE"; // add more status types if needed
    daysLeft: number;
  }
  
  interface JobPostingsListResponse {
    status: "SUCCESS" | "FAILURE"; // or just string if dynamic
    statusCode: number;
    message: string;
    formattedMessage: string;
    data: JobPosting[];
}

interface ApplicantTrendsData {
    Mon: number;
    Tue: number;
    Wed: number;
    Thu: number;
    Fri: number;
    Sat: number;
    Sun: number;
  }
  
  interface ApplicantTrendsResponse {
    status: "SUCCESS" | "FAILURE"; // or just string if dynamic
    statusCode: number;
    message: string;
    formattedMessage: string;
    data: ApplicantTrendsData;
  }

export default function EmployerDashboard() {
    const router = useRouter()
    const { user } = useAuth()

    const {
        data: jobPostingData,
      } = useApiGet<JobPostingsResponse>(
        `dashboard/totaljobpostingcount/${user?.id}`,
      )

      const {
        data: activeApplicantsData,
      } = useApiGet<JobPostingsResponse>(
        `dashboard/totalcount-active-applicants/${user?.id}`,
      )

      const {
        data: jobPerformanceTotalApplicants,
      } = useApiGet<JobPostingsResponse>(
        `dashboard/job-performance/total-applicants/${user?.id}`,
      )

      const {
        data: jobPerformanceShortlisted,
      } = useApiGet<JobPostingsResponse>(
        `dashboard/job-performance/shortlisted/${user?.id}`,
      )

      const {
        data: jobPerformanceTotalViews,
      } = useApiGet<JobPostingsResponse>(
        `dashboard/job-performance/totalviewsCountforJobs/${user?.id}`,
      )

      const {
        data: jobPostingList,
      } = useApiGet<JobPostingsListResponse>(
        `dashboard/joblist-postings/${user?.id}`,
      )

      const {
        data: applicantTrendsList,
      } = useApiGet<ApplicantTrendsResponse>(
        `dashboard/applicant-trends/${user?.id}`,
      )

      const {
        data: jobsExpiringTodayData,
      } = useApiGet<ApplicantTrendsResponse>(
        `dashboard/job-expiry/${user?.id}`,
      )

      const {
        data: bookmarkData,
      } = useApiGet<ApplicantTrendsResponse>(
        `dashboard/bookmarkcount/${user?.id}`,
      )

      console.log("bookmarkData---->",bookmarkData)

      const jobPerformance = [
        { title: "Total Views", value: jobPerformanceTotalViews?.data||0, increase: 15 },
        { title: "Total Applications", value: jobPerformanceTotalApplicants?.data||0, increase: 8 },
        { title: "Shortlisted", value: jobPerformanceShortlisted?.data||0, increase: 12 },
    ]

    const applicantData = [
        { day: "Mon", applicants: applicantTrendsList?.data?.Mon || 0 },
        { day: "Tue", applicants: applicantTrendsList?.data?.Tue || 0 },
        { day: "Wed", applicants: applicantTrendsList?.data?.Wed || 0 },
        { day: "Thu", applicants: applicantTrendsList?.data?.Thu || 0 },
        { day: "Fri", applicants: applicantTrendsList?.data?.Fri || 0 },
        { day: "Sat", applicants: applicantTrendsList?.data?.Sat || 0 },
        { day: "Sun", applicants: applicantTrendsList?.data?.Sun || 0 },
    ]

    return (
        <div className="space-y-8 bg-gray-50 md:p-2  rounded-xl">
            {/* Top Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Job Postings", value: jobPostingData?.data||0, subtext: "3 new this week", icon: Briefcase, color: "blue" },
                    { title: "Active Applications", value: activeApplicantsData?.data||0, subtext: "24 new today", icon: FileText, color: "green" },
                    { title: "Total Bookmarks", value: bookmarkData?.data||0, subtext: "For next 7 days", icon: Calendar, color: "purple" },
                    {
                        title: "Jobs Expiring Today",
                        value: `${jobsExpiringTodayData?.data||0} days`,
                        subtext: "2 days faster than last month",
                        icon: Clock,
                        color: "red",
                    },
                ].map((item, index) => (
                    <Card
                        key={index}
                        className={`bg-white border-l-4 border-${item.color}-500 shadow-sm hover:shadow-md transition-shadow`}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                            <item.icon className={`h-4 w-4 text-${item.color}-500`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            {/* <p className="text-xs text-muted-foreground">{item.subtext}</p> */}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Applicant Trends and Job Performance */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Applicant Trends */}
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Applicant Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={applicantData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="applicants" fill="#3b82f6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Job Performance */}
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Job Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                            {jobPerformance.map((stat, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{stat.title}</p>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                        </div>
                                        {/* <div className="flex items-center space-x-2">
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                            <span className="text-green-500">{stat.increase}%</span>
                                        </div> */}
                                    </div>
                                    <Progress value={stat.increase} className="h-1 mt-2" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Active Job Postings */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold">Job Postings</CardTitle>
                        <Button onClick={() => router.push("/employer/jobs")} variant="outline">View All Jobs</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {jobPostingList?.data?.length ? (
                            jobPostingList.data.slice(0, 3).map((job, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <h3 className="font-medium">{job.title}</h3>
                                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                                            <Briefcase className="h-4 w-4" />
                                            <span>{job?.industry}</span>
                                            <span>•</span>
                                            <MapPin className="h-4 w-4" />
                                            <span>
                                                {[job.location.city, job.location.state, job.location.country]
                                                    .filter((loc) => loc)
                                                    .join(", ") || ""}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                                        <div className="text-right">
                                            <div className="text-sm font-medium">{job?.applicationsCount || 0} applicants</div>
                                            <div className="text-sm text-gray-500">{job.daysLeft || 0} days left</div>
                                        </div>
                                        <Badge
                                            variant={job?.status === "ACTIVE" ? "success" : "secondary"}
                                        >
                                            {job?.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 bg-gray-50 rounded-lg text-center">
                                No Jobs To Show
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Top Candidates and Upcoming Interviews */}
            <div className="grid gap-6 md:grid-cols-1">
                {/* Top Candidates */}
                <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Top Candidates</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topCandidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage src={candidate.avatar} />
                                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{candidate.name}</p>
                                            <p className="text-sm text-gray-500">{candidate.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                                        <div className="text-right">
                                            <div className="font-medium">{candidate.matchPercentage}% Match</div>
                                            <Badge variant={candidate.status === "New" ? "default" : "secondary"}>
                                                {candidate.status}
                                            </Badge>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Interviews */}
                {/* <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Upcoming Interviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingInterviews.map((interview) => (
                                <div
                                    key={interview.id}
                                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div>
                                        <p className="font-medium">{interview.candidate}</p>
                                        <p className="text-sm text-gray-500">{interview.role}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            {new Date(interview.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(interview.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                        </p>
                                    </div>
                                    <Badge>{interview.type}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card> */}
            </div>
        </div>
    )
}