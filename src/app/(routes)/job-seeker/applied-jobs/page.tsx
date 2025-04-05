"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MapPin, Building2, Loader2 } from "lucide-react";
import { format } from "date-fns";
// import * as z from "zod";
// import { useToast } from "@/hooks/use-toast";
import { useApiGet } from "@/hooks/use-api-query";
import { useAuth } from "@/app/(providers)/AuthContext";
// import { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Applied Jobs",
//   description: "View all jobs you have applied to",
// };

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
  status: "APPLIED" | "SHORTLISTED" | "REJECTED"; // Adjust based on actual statuses
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
  status: "ACTIVE" | "INACTIVE"; // Adjust based on actual statuses
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}


// Mock data generator
// const generateMockData = (start: number, end: number) => {
//   return Array.from({ length: end - start }, (_, index) => ({
//     id: start + index,
//     title: [
//       "Software Engineer",
//       "Product Designer",
//       "UI/UX Designer",
//       "Frontend Developer",
//     ][Math.floor(Math.random() * 4)],
//     company: ["TechCorp", "DesignHub", "InnovateLabs", "WebFlow"][
//       Math.floor(Math.random() * 4)
//     ],
//     location: ["London, UK", "New York, US", "Berlin, DE", "Paris, FR"][
//       Math.floor(Math.random() * 4)
//     ],
//     dateApplied: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
//     status: ["Active", "In Review", "Rejected", "Interview"][
//       Math.floor(Math.random() * 4)
//     ],
//     logo: `/placeholder.svg?text=${Math.floor(Math.random() * 100)}`,
//   }));
// };

export default function AppliedJobs() {
    type JobApplication = JobApplicationResponse["data"]["applications"][0];
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>(null);
  const lastJobElementRef = useRef<HTMLDivElement>(null);
  const [duration,setDuration] = useState("");
  const { user } = useAuth();


  const apiEndpoint = duration!==""
  ? `applied-candidates/candidate/${user?.id}?appliedDateFilter=${duration}`
  : `applied-candidates/candidate/${user?.id}`;

  const {
    data: appliedJobsData,
    isLoading: isLoadingAppliedJobs,
    error: appliedJobsError,
    refetch,
  } = useApiGet<JobApplicationResponse>(
    apiEndpoint,
    ["applied-jobs",duration] // Query key for caching
  );

  useEffect(() => {
    if (duration !== undefined) {
      refetch(); // Refetch data when duration changes
    }
  }, [duration, refetch]);

  console.log("appliedJobsData", appliedJobsData);
  console.log("isLoadingAppliedJobs", isLoadingAppliedJobs);
  console.log("appliedJobsError", appliedJobsError);

  useEffect(()=>{
    if(appliedJobsData){
        console.log("appliedJobsData", appliedJobsData.data.applications);
        setJobs(appliedJobsData.data.applications||[]);
    }
  },[appliedJobsData])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMoreJobs = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
    //   const newJobs = generateMockData(jobs.length, jobs.length + 10);
    //   setJobs((prev) => [...prev, ...newJobs]);
      setLoading(false);
      if (jobs.length >= 50) setHasMore(false); // Limit for demo
    }, 500);
  };

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        // loadMoreJobs();
      }
    });

    if (lastJobElementRef.current) {
      observer.current.observe(lastJobElementRef.current);
    }
  }, [loading, hasMore, loadMoreJobs]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-green-100 text-green-800";
      case "In Review":
        return "bg-blue-100 text-blue-800";
      case "Interview":
        return "bg-purple-100 text-purple-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoadingAppliedJobs) {
          return (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading Applied jobs data...</span>
            </div>
          );
        }

  return (
    <Card className="p-6 shadow-sm border-none">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          My Applied Jobs
        </h2>
        <Select onValueChange={(value) => setDuration(value)} defaultValue={duration}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LAST_MONTH">Last Month</SelectItem>
            <SelectItem value="LAST_3_MONTH">Last 3 Months</SelectItem>
            <SelectItem value="LAST_6_MONTH">Last 6 Months</SelectItem>
            <SelectItem value="LAST_YEAR">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Job Title</TableHead>
              <TableHead className="w-[200px]">Date Applied</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow className="group">
                <TableCell colSpan={4} className="text-center py-2">
                  No Applied Jobs To Show
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job,index) => (
                <TableRow key={index} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={job?.logo||"P"} alt={"P"} />
                        <AvatarFallback>{"P"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{job?.jobId?.title}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Building2 className="h-3 w-3" />
                          <span>{job?.company||"No Company"}</span>
                          <MapPin className="h-3 w-3 ml-2" />
                          <span>{job?.location||"No Location"}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {format(job?.appliedDate, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(job?.status)}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2  transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {/* <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {jobs.length === 0 ? (
          <Card className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="font-medium">No jobs to show</div>
              </div>
            </div>
          </Card>
        ) : (
          jobs.map((job,index) => (
            <Card key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                <AvatarImage src={job?.logo||"P"} alt={"P"} />
                  <AvatarFallback>{job?.company?.[0]||"P"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{job?.jobId?.title}</div>
                  <div className="text-sm text-gray-500 space-y-1 mt-1">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      <span>{job?.company||"No Company"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{job?.location||"No Location"}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(job?.status)}
                    >
                      {job.status}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {format(job?.appliedDate, "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Loading and Intersection Observer Reference */}
      <div ref={lastJobElementRef} className="py-4 text-center">
        {loading && (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          </div>
        )}
      </div>
    </Card>
  );
}
