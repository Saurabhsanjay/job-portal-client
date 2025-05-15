"use client";

import { useState } from "react";
import { useApiGet } from "@/hooks/use-api-query";
import { useAuth } from "@/app/(providers)/AuthContext";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  MapPin,
  Building2,
  Loader2,
  Filter,
  Eye,
  Bookmark,
  Heart,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

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

export default function MobileAppliedJobs() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("applied");
  const [duration, setDuration] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Applied Jobs
  const { data: appliedJobsData, isLoading: isLoadingAppliedJobs } =
    useApiGet<JobApplicationResponse>(
      `applied-candidates/candidate/${user?.id}${
        duration ? `?appliedDateFilter=${duration}` : ""
      }`,
      ["applied-jobs", duration]
    );

  // Shortlisted Jobs
  const { data: shortlistedJobsData, isLoading: isLoadingShortlistedJobs } =
    useApiGet<JobApplicationResponse>(
      `applied-candidates/candidate/${user?.id}?shortlist=true${
        duration ? `&appliedDateFilter=${duration}` : ""
      }`,
      ["shortlisted-jobs", duration]
    );

  // Saved Jobs
  const { data: savedJobsData, isLoading: isLoadingSavedJobs } =
    useApiGet<JobApplicationResponse>(
      `applied-candidates/candidate/${user?.id}?saved=true${
        duration ? `&appliedDateFilter=${duration}` : ""
      }`,
      ["saved-jobs", duration]
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-50 text-blue-700";
      case "SHORTLISTED":
        return "bg-green-50 text-green-700";
      case "REJECTED":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const isLoading =
    isLoadingAppliedJobs || isLoadingShortlistedJobs || isLoadingSavedJobs;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
        <span>Loading jobs...</span>
      </div>
    );
  }

  const appliedJobs = appliedJobsData?.data?.applications || [];
  const shortlistedJobs = shortlistedJobsData?.data?.applications || [];
  const savedJobs = savedJobsData?.data?.applications || [];

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Jobs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {showFilters && (
        <div className="bg-white p-3 rounded-lg shadow-sm border">
          <Select
            onValueChange={(value) => setDuration(value)}
            defaultValue={duration}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL_TIME">All Time</SelectItem>
              <SelectItem value="LAST_MONTH">Last Month</SelectItem>
              <SelectItem value="LAST_3_MONTH">Last 3 Months</SelectItem>
              <SelectItem value="LAST_6_MONTH">Last 6 Months</SelectItem>
              <SelectItem value="LAST_YEAR">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Tabs
        defaultValue="applied"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="applied" className="relative">
            Applied
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {appliedJobs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="shortlisted" className="relative">
            Shortlisted
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {shortlistedJobs.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="saved" className="relative">
            Saved
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
              {savedJobs.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="applied"
          className="mt-4 space-y-3 scroll-y max-h-[calc(100vh-200px)] overflow-y-auto"
        >
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job, index) => (
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
                        <span className="mr-3">Company Name</span>
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Location</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge
                          variant="outline"
                          className={getStatusColor(job.status)}
                        >
                          {job.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {format(new Date(job.appliedDate), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            router.push(
                              `/job-listings/${job?.jobId?._id}?applied=mobile`
                            );
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium">No applied jobs</h3>
              <p className="text-sm text-gray-500 mt-1">
                You haven't applied to any jobs yet
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="shortlisted"
          className="mt-4 space-y-3 scroll-y max-h-[calc(100vh-200px)] overflow-y-auto"
        >
          {shortlistedJobs.length > 0 ? (
            shortlistedJobs.map((job, index) => (
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
                        <span className="mr-3">Company Name</span>
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Location</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700"
                        >
                          Shortlisted
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {format(new Date(job.appliedDate), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            router.push(
                              `/job-listings/${job?.jobId?._id}?applied=mobile`
                            );
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium">No shortlisted jobs</h3>
              <p className="text-sm text-gray-500 mt-1">
                You don't have any shortlisted jobs yet
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="saved"
          className="mt-4 space-y-3 scroll-y max-h-[calc(100vh-200px)] overflow-y-auto"
        >
          {savedJobs.length > 0 ? (
            savedJobs.map((job, index) => (
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
                        <span className="mr-3">Company Name</span>
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Location</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700"
                        >
                          Saved
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {format(new Date(job.appliedDate), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            router.push(
                              `/job-listings/${job?.jobId?._id}?applied=mobile`
                            );
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium">No saved jobs</h3>
              <p className="text-sm text-gray-500 mt-1">
                You haven't saved any jobs yet
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
