"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ExternalLink,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useEffect, useState } from "react";
import { useApiPost } from "@/hooks/use-api-query";
import toast from "react-hot-toast";
import { useApiGet } from "@/hooks/use-api-query";
import { useAuth } from "@/app/(providers)/AuthContext";
import {ApplicationModal} from "../../job-listings/_components/ApplicationModal"
import { useRouter } from "next/navigation";

// Employer Details Interface
interface EmployerDetails {
  companyName: string;
  logoUrl: string;
}

// User ID Interface
interface UserId {
  _id: string;
  employerDetails: EmployerDetails;
}

// Created By Interface
interface CreatedBy {
  userId: UserId;
}

// Job ID Interface
interface JobId {
  _id: string;
  title: string;
  validTill: string;
  createdBy: CreatedBy;
  status: string;
}

// Application Interface
interface Application {
  _id: string;
  jobId: JobId;
  candidateId: string;
  status: string;
  isShortlisted: boolean;
  isBookmarked: boolean;
  isDeleted: boolean;
  appliedDate: string;
  shortlistedDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Pagination Interface
interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Data Interface
interface Data {
  applications: Application[];
  pagination: Pagination;
}

// Response Interface
interface JobApplicationsResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: Data;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// export const metadata:Metadata = {
//     title: "Job Seeker Dashboard",
//     description: "Your personalized job seeker dashboard",
// }

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
    skills: ["React", "Node.js", "TypeScript", "AWS"],
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
    skills: ["React", "Node.js", "TypeScript", "AWS"],
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
    skills: ["React", "Node.js", "TypeScript", "AWS"],
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
    skills: ["React", "Node.js", "TypeScript", "AWS"],
  },
];

// const appliedJobs = [
//   {
//     id: 1,
//     company: "InnoTech",
//     position: "Frontend Developer",
//     status: "Interview",
//     logo: "/placeholder.svg",
//   },
//   {
//     id: 2,
//     company: "DataCorp",
//     position: "Data Analyst",
//     status: "Applied",
//     logo: "/placeholder.svg",
//   },
//   {
//     id: 3,
//     company: "AI Solutions",
//     position: "Machine Learning Engineer",
//     status: "Rejected",
//     logo: "/placeholder.svg",
//   },
// ];

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
];

interface BookmarkResponse {
  status: "SUCCESS" | "FAILURE"; // Assuming it can be SUCCESS or FAILURE
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: {
    isBookmarked: boolean;
    isDeleted: boolean;
    _id: string;
    jobId: string;
    candidateId: string;
    status: "SHORTLISTED" | "REJECTED" | "PENDING"; // Assuming possible statuses
    isShortlisted: boolean;
    appliedDate: string; // ISO date format
    shortlistedDate: string; // ISO date format
    createdAt: string; // ISO date format
    updatedAt: string; // ISO date format
    __v: number;
  };
}

interface BookmarkRequest {
  jobId: string;
  candidateId: string;
  isBookmarked: boolean;
}

export interface ShortlistedJobsCountResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: number;
}

export interface JobAlert {
  _id: string;
  title: string;
  userId: string;
  frequency: 'daily' | 'weekly' | 'monthly' | string; // Adjust if there are only specific values
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface JobAlertData {
  jobAlerts: JobAlert[];
  jobAlertsCount: number;
}

export interface JobAlertResponse {
  status: 'SUCCESS' | 'FAILURE' | string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: JobAlertData;
}

export interface UserView {
  range: string;
  views: number;
}

export interface UserViewsData {
  data: UserView[];
}

export interface UserViewsResponse {
  status: 'SUCCESS' | 'FAILURE' | string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: UserViewsData;
}



export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  console.log("user------>", user);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([]);
  const bookmarkJobMutation = useApiPost<BookmarkResponse, BookmarkRequest>();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [job,setJob]=useState(null)

  const {
    data: appliedJobsData,
    isLoading: isLoadingAppliedJobs,
    error: appliedJobsError,
  } = useApiGet<JobApplicationsResponse>(
    `applied-candidates/candidate/${user?.id}`,
    ["applied-jobs"] // Query key for caching
  );

  console.log("appliedJobsData-------->", appliedJobsData);

  const {
    data: recommendedJobsData,
    isLoading: isLoadingRecmmendedJobs,
    error: recommendedJobsError,
  } = useApiGet<JobApplicationsResponse>(
    `job-seeker-dashboard/recommended-jobs/${user?.id}`,
    ["recommended-jobs"] // Query key for caching
  );


  useEffect(() => {
    if (appliedJobsData) {
      setAppliedJobs(appliedJobsData?.data?.applications);
    }
  }, [appliedJobsData]);
  console.log("applied jobs", appliedJobs);

  const { data: shortlistedJobsData } = useApiGet<ShortlistedJobsCountResponse>(
    `job-seeker-dashboard/shortlisted-jobscount/${user?.id}`
  );

  const { data: appliedJobsCountData } = useApiGet<ShortlistedJobsCountResponse>(
    `job-seeker-dashboard/applied-jobscount/${user?.id}`
  );

  const { data: jobAlertsCountData } = useApiGet<JobAlertResponse>(
    `job-alerts-for-jobseekers/get-job-alerts/${user?.id}`
  );

  const { data: messagesCountData } = useApiGet<ShortlistedJobsCountResponse>(
    `messages/getMessages-count?userId=${user?.id}`
  );

  const { data: profilePerformanceData } = useApiGet<UserViewsResponse>(
    `users/get-user-views?userId=${user?.id}`
  );

  const profilePerformanceChartData = profilePerformanceData?.data?.data?.map(item => ({
    day: item?.range,  // assign range value to `day`
    views: item?.views,
  }));

  console.log("profilePerformanceData----------->", profilePerformanceData);

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
          candidateId: "677a5abca1c88d37c860cd0d",
          isBookmarked: false,
        },
        // payload: data,
        //   invalidateQueries: [["user-profile"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Job bookmarked successfully");
          } else if (response.error) {
            toast.error(response?.error?.message || "Something Went Wrong");
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Something Went Wrong");
        },
      }
    );
  };
  return (
    <div className="space-y-8 bg-gray-50 md:p-2  rounded-xl">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Applied Jobs",
            value: appliedJobsCountData?.data || 0,
            subtext: "5 new this week",
            icon: Briefcase,
            color: "blue",
            link: "/job-seeker/applied-jobs",
          },
          {
            title: "Job Alerts",
            value: jobAlertsCountData?.data?.jobAlertsCount || 0,
            subtext: "142 new alerts",
            icon: Bell,
            color: "purple",
            link: "/job-seeker/alerts",
          },
          {
            title: "Messages",
            value: messagesCountData?.data || 0,
            subtext: "12 unread",
            icon: MessageSquare,
            color: "red",
            link: "/job-seeker/messages",
          },
          {
            title: "Shortlisted",
            value: shortlistedJobsData?.data || 0,
            subtext: "8 new opportunities",
            icon: Bookmark,
            color: "green",
            link: "/job-seeker/shortlisted-jobs",
          },
        ].map((item, index) => (
          <Card
            key={index}
            className={`bg-white cursor-pointer border-l-4 border-${item.color}-500 shadow-sm hover:shadow-md transition-shadow rounded-xl`}
            onClick={() => router.push(item.link)}
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
              {/* <p className="text-xs mt-1 text-gray-500">{item.subtext}</p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-10">
        <Card className="md:col-span-10 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Profile Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profilePerformanceChartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12}/>
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

        {/* <Card className="md:col-span-3 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Recruiter Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recruiterActions.map((action, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500">
                      {action.title}
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {action.value}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-2 bg-green-50 text-green-700 border-green-200"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {action.increase}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Recommended Jobs
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Personalized matches based on your profile
              </p>
            </div>
            {/* <Button variant="outline" className="text-gray-600">
              View All
            </Button> */}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {!recommendedJobsData?.data?.length ? (
              <div className="col-span-full text-center">
                <p className="text-center text-gray-600">
                  No Recommended Jobs To Show
                </p>
              </div>
            ) : (
              recommendedJobsData?.data?.map((job, index) => (
                <Card
                  key={index}
                  className="group flex flex-col bg-white border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 rounded-xl"
                >
                  <CardHeader className="flex-row gap-4 items-start p-4">
                    <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                      <AvatarImage src={job?.createdBy?.userId?.employerDetails?.logoUrl} alt={job?.createdBy?.userId?.employerDetails?.companyName} />
                      <AvatarFallback className="bg-blue-50 text-blue-600 font-semibold">
                        {job?.createdBy?.userId?.employerDetails?.companyName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job?.title}
                      </CardTitle>
                      <p className="text-sm font-medium text-gray-600">
                        {job?.company?.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border-blue-100"
                        >
                          {job?.matchPercentage}% Match
                        </Badge>
                        {/* {job.isNew && (
                          <Badge className="bg-green-50 text-green-700 border-green-100">
                            New
                          </Badge>
                        )} */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{job?.location?.city}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{job?.salary?.min} - {job?.salary?.max}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{job?.employmentType === 'FULL_TIME' ? 'Full Time' : job?.employmentType === 'PART_TIME' ? 'Part Time' : job?.employmentType === 'CONTRACT' ? 'Contract' : job?.employmentType === 'FREELANCE' ? 'Freelance' : job?.employmentType}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="truncate">{job?.experience?.level?.[0]?.toUpperCase() + job?.experience?.level?.slice(1)?.toLowerCase()}</span>
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
                      {/* <Button
                        size="icon"
                        variant="ghost"
                        className="text-gray-500 hover:text-blue-600"
                        onClick={() => toggleBookmark(job.id)}
                      >
                        <BookmarkPlus
                          className={
                            bookmarkedJobs.has(job.id)
                              ? "fill-blue-600 text-blue-600"
                              : ""
                          }
                        />
                      </Button> */}
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
                      variant={"outline"}
                      className=" rounded-xl text-black font-medium px-4 flex items-center"
                      onClick={()=>{
                        router.push(`/job-listings/${job._id}`)
                      }}
                    >
                      View Details
                      <ExternalLink className="h-4 w-4" />
                    </Button> 
                    
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium px-6"
                      onClick={()=>{
                        setIsApplicationModalOpen(true)
                        setJob(job)
                      }}
                    >
                      Apply Now
                    </Button>

                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Applied Jobs
            </CardTitle>
            <Button
              variant="outline"
              className="text-gray-600"
              onClick={() =>
                (window.location.href = "/job-seeker/applied-jobs")
              }
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingAppliedJobs ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            </div>
          ) : !appliedJobs?.length ? (
            <p className="text-center text-gray-600">No Applied Jobs To Show</p>
          ) : (
            <div className="space-y-4">
              {appliedJobs?.slice(0, 3).map((job) => (
                <div
                  key={job._id}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={job?.jobId?.createdBy?.userId?.employerDetails?.logoUrl || ""}
                      alt={job?.company || ""}
                    />
                    <AvatarFallback>{job?.company?.[0] || "P"}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-1">
                    <h4 className="text-base font-semibold text-gray-900">
                      {job?.jobId?.title || "No position"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {job?.jobId?.createdBy?.userId?.employerDetails?.companyName || "No Company"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      job?.status === "Interview"
                        ? "default"
                        : job?.status === "APPLIED"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {job?.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* <Card className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Recent Messages
          </CardTitle>
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
                  <h4 className="text-sm font-semibold text-gray-900">
                    {message.sender}
                  </h4>
                  <p className="text-xs text-gray-600">{message.company}</p>
                  <p className="text-sm mt-1 text-gray-700">
                    {message.message}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Reply
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={job}
      />
    </div>
  );
}
