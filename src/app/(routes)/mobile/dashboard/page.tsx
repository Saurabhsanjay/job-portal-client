"use client";

import { useState, useEffect } from "react";
import { useApiGet, useApiPost } from "@/hooks/use-api-query";
import { useAuth } from "@/app/(providers)/AuthContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  Bell,
  MessageSquare,
  Bookmark,
  MapPin,
  DollarSign,
  Share2,
  BookmarkPlus,
  Clock,
  Loader2,
  ChevronRight,
  Building2,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";

// Types
interface JobApplicationResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: {
    applications: JobApplication[];
    pagination: Pagination;
  };
}

interface JobApplication {
  _id: string;
  jobId: JobDetails;
  candidateId: string;
  status: "APPLIED" | "SHORTLISTED" | "REJECTED";
  isShortlisted: boolean;
  appliedDate: string;
  shortlistedDate?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface JobDetails {
  _id: string;
  title: string;
  validTill: string;
  status: "ACTIVE" | "INACTIVE";
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface BookmarkResponse {
  status: "SUCCESS" | "FAILURE";
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: {
    isBookmarked: boolean;
    isDeleted: boolean;
    _id: string;
    jobId: string;
    candidateId: string;
    status: "SHORTLISTED" | "REJECTED" | "PENDING";
    isShortlisted: boolean;
    appliedDate: string;
    shortlistedDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface BookmarkRequest {
  jobId: string;
  candidateId: string;
  isBookmarked: boolean;
}

interface ShortlistedJobsCountResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: number;
}

interface JobAlert {
  _id: string;
  title: string;
  userId: string;
  frequency: "daily" | "weekly" | "monthly" | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface JobAlertData {
  jobAlerts: JobAlert[];
  jobAlertsCount: number;
}

interface JobAlertResponse {
  status: "SUCCESS" | "FAILURE" | string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: JobAlertData;
}

interface UserView {
  range: string;
  views: number;
}

interface UserViewsData {
  data: UserView[];
}

interface UserViewsResponse {
  status: "SUCCESS" | "FAILURE" | string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: UserViewsData;
}

// Add a new interface for recommended jobs response
interface RecommendedJobsResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: any[]; // Using any[] since the exact structure wasn't clear from the desktop code
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
];

const recruiterActions = [
  { title: "Profile Views", value: 1245, increase: 12 },
  { title: "Search Appearances", value: 3721, increase: 18 },
  { title: "InMail Response Rate", value: 89, increase: 5 },
];

// Remove the dummy recommendedJobs array

export default function MobileDashboard() {
  const { user } = useAuth();
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([]);
  const bookmarkJobMutation = useApiPost<BookmarkResponse, BookmarkRequest>();

  // Fetch applied jobs
  const { data: appliedJobsData, isLoading: isLoadingAppliedJobs } =
    useApiGet<JobApplicationResponse>(
      `applied-candidates/candidate/${user?.id}`,
      ["applied-jobs"]
    );

  // Fetch shortlisted jobs count
  const { data: shortlistedJobsData } = useApiGet<ShortlistedJobsCountResponse>(
    `job-seeker-dashboard/shortlisted-jobscount/${user?.id}`
  );

  // Fetch applied jobs count
  const { data: appliedJobsCountData } =
    useApiGet<ShortlistedJobsCountResponse>(
      `job-seeker-dashboard/applied-jobscount/${user?.id}`
    );

  // Fetch job alerts
  const { data: jobAlertsCountData } = useApiGet<JobAlertResponse>(
    `job-alerts-for-jobseekers/get-job-alerts/${user?.id}`
  );

  // Fetch messages count
  const { data: messagesCountData } = useApiGet<ShortlistedJobsCountResponse>(
    `messages/getMessages-count?userId=${user?.id}`
  );

  // Fetch profile performance data
  const { data: profilePerformanceData } = useApiGet<UserViewsResponse>(
    `users/get-user-views?userId=${user?.id}`
  );

  // Transform profile performance data for chart
  const profilePerformanceChartData = profilePerformanceData?.data?.data?.map(
    (item) => ({
      day: item?.range,
      views: item?.views,
    })
  );

  useEffect(() => {
    if (appliedJobsData) {
      setAppliedJobs(appliedJobsData?.data?.applications || []);
    }
  }, [appliedJobsData]);

  // Toggle bookmark
  const toggleBookmark = (jobId: unknown) => {
    setBookmarkedJobs((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(jobId)) {
        newBookmarks.delete(jobId);
      } else {
        newBookmarks.add(jobId);
      }
      return newBookmarks;
    });

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
            toast.success("Job bookmark updated");
          } else if (response.error) {
            toast.error(response?.error?.message || "Something went wrong");
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Something went wrong");
        },
      }
    );
  };

  // Replace the dummy recommendedJobs array with this API call after the other API calls
  // Fetch recommended jobs
  const {
    data: recommendedJobsData,
    isLoading: isLoadingRecommendedJobs,
    error: recommendedJobsError,
  } = useApiGet<RecommendedJobsResponse>(
    `job-seeker-dashboard/recommended-jobs/${user?.id}`,
    ["recommended-jobs"]
  );

  if (isLoadingAppliedJobs) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
        <span>Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 scroll-y max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Stats Cards */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-2">
          {[
            {
              title: "Applied Jobs",
              value: appliedJobsCountData?.data || 0,
              subtext: "Your job applications",
              icon: Briefcase,
              color: "blue",
            },
            {
              title: "Job Alerts",
              value: jobAlertsCountData?.data?.jobAlertsCount || 0,
              subtext: "Active alerts",
              icon: Bell,
              color: "purple",
            },
            {
              title: "Messages",
              value: messagesCountData?.data || 0,
              subtext: "Unread messages",
              icon: MessageSquare,
              color: "red",
            },
            {
              title: "Shortlisted",
              value: shortlistedJobsData?.data || 0,
              subtext: "Shortlisted by employers",
              icon: Bookmark,
              color: "green",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className={`min-w-[200px] bg-white border-l-4 border-${item.color}-500 shadow-sm`}
            >
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="text-base font-medium text-gray-700">
                  {item.title}
                </CardTitle>
                <item.icon className={`h-5 w-5 text-${item.color}-500`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {item.value}
                </div>
                <p className="text-xs mt-1 text-gray-500">{item.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Replace the Recommended Jobs section with this updated version that uses real data */}
      {/* Recommended Jobs */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recommended Jobs</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {isLoadingRecommendedJobs ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
            <span>Loading recommended jobs...</span>
          </div>
        ) : recommendedJobsData?.data?.length ? (
          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {recommendedJobsData.data.map((job) => (
                <Card
                  key={job._id}
                  className="min-w-[280px] max-w-[280px] group flex flex-col bg-white border hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <CardHeader className="flex-row gap-4 items-start p-4">
                    <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                      <AvatarImage
                        src={
                          job?.createdBy?.userId?.employerDetails?.logoUrl ||
                          "/placeholder.svg"
                        }
                        alt={
                          job?.createdBy?.userId?.employerDetails
                            ?.companyName || "Company"
                        }
                      />
                      <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">
                        {job?.createdBy?.userId?.employerDetails
                          ?.companyName?.[0] || "C"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </CardTitle>
                      <p className="text-sm font-medium text-gray-600">
                        {job?.createdBy?.userId?.employerDetails?.companyName ||
                          "Company"}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border-blue-100"
                        >
                          {job.matchPercentage || "90"}% Match
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
                        <span className="truncate">
                          {job?.location?.city || "Location"}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">
                          {job?.salary?.min && job?.salary?.max
                            ? `${job.salary.min} - ${job.salary.max}`
                            : "Salary"}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">
                          {job?.employmentType === "FULL_TIME"
                            ? "Full Time"
                            : job?.employmentType === "PART_TIME"
                            ? "Part Time"
                            : job?.employmentType === "CONTRACT"
                            ? "Contract"
                            : job?.employmentType === "FREELANCE"
                            ? "Freelance"
                            : job?.employmentType || "Employment Type"}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">
                          {job?.experience?.level
                            ? job.experience.level[0].toUpperCase() +
                              job.experience.level.slice(1).toLowerCase()
                            : "Experience"}
                        </span>
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
                  <CardFooter className="p-4 bg-gray-50 flex items-center justify-between gap-2 mt-auto border-t">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-gray-500 hover:text-blue-600"
                        onClick={() => toggleBookmark(job._id)}
                      >
                        <BookmarkPlus
                          className={
                            bookmarkedJobs.has(job._id)
                              ? "fill-blue-600 text-blue-600"
                              : ""
                          }
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
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium"
                    >
                      Apply
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <Card className="bg-white">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No recommended jobs available</p>
              <Button className="mt-4" size="sm">
                Browse Jobs
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Profile Performance */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Profile Performance</h2>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={profilePerformanceChartData || profileViewsData}
                >
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
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
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
                        <span className="text-xs text-gray-500">
                          {new Date(job.appliedDate).toLocaleDateString()}
                        </span>
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
  );
}
