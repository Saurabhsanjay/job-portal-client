"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, MapPin, Building2, Loader2, Star, Bookmark, Calendar, DollarSign } from "lucide-react"
import { format } from "date-fns"
import { useApiGet } from "@/hooks/use-api-query"
import { useAuth } from "@/app/(providers)/AuthContext"
import { useRouter } from "next/navigation"

// Contact Info Interface
interface ContactInfo {
  country: string
  state: string
  city: string
  completeAddress: string
}

// Employer Details Interface
interface EmployerDetails {
  companyName: string
  logoUrl: string
  contactInfo: ContactInfo
}

// User ID Interface
interface UserId {
  _id: string
  employerDetails: EmployerDetails
}

// Created By Interface
interface CreatedBy {
  userId: UserId
}

// Job ID Interface
interface JobId {
  _id: string
  title: string
  validTill: string
  createdBy: CreatedBy
  status: string
}

// Application Interface
interface Application {
  _id: string
  jobId: JobId
  candidateId: string
  status: string
  isShortlisted: boolean
  isBookmarked: boolean
  isDeleted: boolean
  appliedDate: string
  shortlistedDate: string
  createdAt: string
  updatedAt: string
  __v: number
}

// Pagination Interface
interface Pagination {
  total: number
  page: number
  limit: number
  pages: number
}

// Data Interface
interface Data {
  applications: Application[]
  pagination: Pagination
}

// Response Interface
interface JobApplicationsResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: Data
}

export default function AppliedJobs() {
  type JobApplication = JobApplicationsResponse["data"]["applications"][0]
  const [jobs, setJobs] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver>(null)
  const lastJobElementRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  const apiEndpoint =
    duration !== ""
      ? `applied-candidates/candidate/${user?.id}?appliedDateFilter=${duration}`
      : `applied-candidates/candidate/${user?.id}`

  const {
    data: appliedJobsData,
    isLoading: isLoadingAppliedJobs,
    error: appliedJobsError,
    refetch,
  } = useApiGet<JobApplicationsResponse>(apiEndpoint, ["applied-jobs", duration])

  useEffect(() => {
    if (duration !== undefined) {
      refetch()
    }
  }, [duration, refetch])

  useEffect(() => {
    if (appliedJobsData) {
      setJobs(appliedJobsData.data.applications || [])
    }
  }, [appliedJobsData])

  const loadMoreJobs = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (jobs.length >= 50) setHasMore(false)
    }, 500)
  }

  useEffect(() => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        // loadMoreJobs();
      }
    })

    if (lastJobElementRef.current) {
      observer.current.observe(lastJobElementRef.current)
    }
  }, [loading, hasMore, loadMoreJobs])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Review":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Interview":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const calculateDaysAgo = (dateString: string) => {
    const appliedDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - appliedDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1d ago"
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    return `${Math.floor(diffDays / 30)}m ago`
  }

  if (isLoadingAppliedJobs) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading Applied jobs data...</span>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">My Applied Jobs</h2>
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

      {/* Cards Grid View */}
      {jobs.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="text-gray-500">No Applied Jobs To Show</div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <Card
              key={index}
              className="relative bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
            >
              {/* Save Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-200"
              >
                <Bookmark className="h-4 w-4" />
              </Button>

              {/* Company Logo and Basic Info */}
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-12 w-12 border-2 border-blue-300">
                  <AvatarImage
                    src={job?.jobId?.createdBy?.userId?.employerDetails?.logoUrl || ""}
                    alt={job?.jobId?.createdBy?.userId?.employerDetails?.companyName || "Company"}
                  />
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">
                    {job?.jobId?.createdBy?.userId?.employerDetails?.companyName?.[0] || "C"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">{job?.jobId?.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm">
                      {job?.jobId?.createdBy?.userId?.employerDetails?.companyName || "Company"}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">4.2 (100 Reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-3 mb-4">
                {/* Location */}
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">
                    {job?.jobId?.createdBy?.userId?.employerDetails?.contactInfo?.city &&
                    job?.jobId?.createdBy?.userId?.employerDetails?.contactInfo?.state
                      ? `${job.jobId.createdBy.userId.employerDetails.contactInfo.city}, ${job.jobId.createdBy.userId.employerDetails.contactInfo.state}`
                      : "Remote"}
                  </span>
                </div>

                {/* Experience & Salary */}
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm">1-2 Yrs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">2.5-3.25 Lacs PA</span>
                  </div>
                </div>

                {/* Application Status */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={`${getStatusColor(job?.status)} text-xs`}>
                    {job.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">Applied {format(new Date(job?.appliedDate), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>

              {/* Skills/Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs bg-blue-100 border-blue-300 text-blue-700">
                  HR Operations
                </Badge>
                <Badge variant="outline" className="text-xs bg-blue-100 border-blue-300 text-blue-700">
                  Communication
                </Badge>
                <Badge variant="outline" className="text-xs bg-blue-100 border-blue-300 text-blue-700">
                  HR Generalist
                </Badge>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-blue-200">
                <span className="text-xs text-gray-600">{calculateDaysAgo(job?.appliedDate)}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
                  onClick={() => {
                    router.push(`/job-listings/${job?.jobId?._id}?applied=true`)
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

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
    </div>
  )
}
