"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  User2,
  Bookmark,
  Share2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ApplicationModal } from "./ApplicationModal";
import { IJob } from "../types/job.types";
import { useApiPost } from "@/hooks/use-api-query";
import {
  BookmarkJobPayload,
  BookmarkJobResponse,
  UnbookmarkJobResponse,
} from "./JobBoard";
import { useAuth } from "@/app/(providers)/AuthContext";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

interface JobDescriptionProps {
  job: {
    title: string;
    company: {
      name: string;
      logo: string;
    };
    location: {
      city: string;
      state: string;
      country: string;
    };
    salary: string;
    type: string;
    posted: Date;
    expires: Date;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    isPrivate: boolean;
    isUrgent: boolean;
  };
  jobRefetch: () => void;
}

export function JobDescriptionPage({ job,jobRefetch }: JobDescriptionProps) {
  const router = useRouter();
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const bookmarkJobMutation = useApiPost<
    BookmarkJobResponse,
    BookmarkJobPayload
  >();

  const removeBookmarkJobMutation = useApiPost<
    UnbookmarkJobResponse,
    BookmarkJobPayload
  >();

  const { user } = useAuth();
  const params = useSearchParams();

  const handleApply = () => {
    // Open the application modal instead of showing an alert
    setIsApplicationModalOpen(true);
  };

  const handleSaveJob = useCallback(
    (job: IJob) => {
      console.log("Save job:", job?._id);

      if (job?.isBookmarked) {
        removeBookmarkJobMutation.mutate(
          {
            endpoint: "bookmark-jobs/remove-job-bookmark",
            payload: {
              userId: user?.id || "",
              jobId: job?._id || "",
            },
            // payload: data,
            //   invalidateQueries: [["user-profile"]],
          },
          {
            onSuccess: (response) => {
              if (response.data) {
                // reset();
                toast.success("Job unbookmarked successfully");
                jobRefetch();
              } else if (response.error) {
                toast.error(response?.error?.message || "Something Went Wrong");
              }
            },
            onError: (error) => {
              toast.error(error?.message || "Something Went Wrong");
            },
          }
        );
      } else {
        bookmarkJobMutation.mutate(
          {
            endpoint: "bookmark-jobs/create-job-bookmark",
            payload: {
              userId: user?.id || "",
              jobId: job?._id || "",
            },
            // payload: data,
            //   invalidateQueries: [["user-profile"]],
          },
          {
            onSuccess: (response) => {
              if (response.data) {
                // reset();
                toast.success("Job bookmarked successfully");
                jobRefetch();
              } else if (response.error) {
                toast.error(response?.error?.message || "Something Went Wrong");
              }
            },
            onError: (error) => {
              toast.error(error?.message || "Something Went Wrong");
            },
          }
        );
      }
    },
    [bookmarkJobMutation, user?.id, removeBookmarkJobMutation, jobRefetch]
  );

  const handleShare = () => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Share URL: ${window.location.href}`);
    }
  };

  return (
    <div className="bg-gray-50 py-4 md:py-8 px-4 md:px-20 overflow-auto max-h-screen">
      <div className="container mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={() => {
            if(params.get("applied") === "true") {
              router.push("/job-seeker/applied-jobs")
            }else if(params.get("shortlisted") === "true") {
              router.push("/job-seeker/shortlisted-jobs")
            }else if(params.get("saved") === "true") {
              router.push("/job-seeker/saved-jobs")
            }else{
              router.push("/job-listings")
            }
            // router.push("/job-listings")
          }
          }
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Button>

        {/* Header Card */}
        <Card className="mb-4 md:mb-6 p-4 md:p-6 border-none shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Logo and Title */}
            <div className="flex items-start gap-4 flex-1">
              <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                <Image
                  width={60}
                  height={60}
                  src={job.company.logo || "/placeholder.svg"}
                  alt={job.company.name}
                  className="h-12 w-12 md:h-12 md:w-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="text-sm md:text-base text-gray-600">
                    {job.company.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 md:h-10 md:w-10"
                      onClick={handleShare}
                    >
                      <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share job</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 md:h-10 md:w-10"
                      onClick={() => handleSaveJob(job)}
                    >
                      <Bookmark
                        className={`h-3 w-3 md:h-4 md:w-4 ${
                          job?.isBookmarked ? "fill-blue-500 text-blue-500" : ""
                        }`}
                        fill={job?.isBookmarked ? "blue" : "none"}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Save job</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <Button
                size="sm"
                className="px-4 md:px-8 bg-blue-500 text-sm md:text-base"
                onClick={handleApply}
              >
                Apply Now
              </Button> */}

              <Button
      size="sm"
      className={`px-4 md:px-8 text-sm md:text-base ${
        job?.isAppliedBookmarked
          ? "bg-gray-300 text-gray-900 cursor-not-allowed opacity-50"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
      onClick={handleApply}
      disabled={job?.isAppliedBookmarked}
    >
      {job?.isAppliedBookmarked ? "Already Applied" : "Apply Now"}
    </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 text-xs md:text-sm"
            >
              {job.type}
            </Badge>
            {job.isPrivate && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 hover:bg-green-200 text-xs md:text-sm"
              >
                Active
              </Badge>
            )}
            {job.isUrgent && (
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-xs md:text-sm"
              >
                Urgent
              </Badge>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <Card className="p-4 md:p-6 border-none shadow-sm">
              <h2 className="text-lg font-semibold mb-3 md:mb-4">
                Job Description
              </h2>
              <p className="text-sm md:text-base text-gray-600 whitespace-pre-line">
                {job.description}
              </p>

              <Separator className="my-4 md:my-6" />

              <h2 className="text-lg font-semibold mb-3 md:mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-2 md:space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm md:text-base text-gray-600"
                  >
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Separator className="my-4 md:my-6" />

              <h2 className="text-lg font-semibold mb-3 md:mb-4">
                Requirements
              </h2>
              <ul className="space-y-2 md:space-y-3">
                {job.requirements.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm md:text-base text-gray-600"
                  >
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Separator className="my-4 md:my-6" />

              <h2 className="text-lg font-semibold mb-3 md:mb-4">Benefits</h2>
              <ul className="space-y-2 md:space-y-3">
                {job.benefits.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm md:text-base text-gray-600"
                  >
                    <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {job.company.name && (
                <>
                  <Separator className="my-4 md:my-6" />
                  <h2 className="text-lg font-semibold mb-3 md:mb-4">
                    About {job.company.name}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    {job.company.name} is a leading company in its field,
                    committed to innovation and excellence. We provide a
                    collaborative and inclusive work environment where employees
                    can grow and thrive.
                  </p>
                </>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <Card className="p-4 md:p-6 h-fit border-none shadow-sm">
            <h2 className="text-lg font-semibold mb-4 md:mb-6">Job Overview</h2>
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-3">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">
                    Date Posted
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    {format(job.posted, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">
                    Expiration date
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    {format(job.expires, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">Location</p>
                  <p className="text-sm md:text-base text-gray-600">
                    {[
                      job.location.city,
                      job.location.state,
                      job.location.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">Job Type</p>
                  <p className="text-sm md:text-base text-gray-600">
                    {job.type}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">Experience</p>
                  <p className="text-sm md:text-base text-gray-600">
                    3-5 years
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <User2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium text-sm md:text-base">
                    Salary Range
                  </p>
                  <p className="text-sm md:text-base text-gray-600">
                    {job.salary}
                  </p>
                </div>
              </div>

              <Separator />

              <Button
                size="default"
                className="w-full bg-blue-500 text-sm md:text-base"
                onClick={handleApply}
              >
                Apply Now
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        job={job}
      />
    </div>
  );
}
