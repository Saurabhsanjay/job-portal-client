"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, MapPin, Building2, Loader2, Star, Bookmark, DollarSign, Clock } from "lucide-react"
import { format } from "date-fns"
import { useApiGet } from "@/hooks/use-api-query"
import { useAuth } from "@/app/(providers)/AuthContext"
import { useRouter } from "next/navigation"

export interface BookmarkedJobsResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: {
    bookmarkedJobs: BookmarkedJob[]
    totalbookmarkedJobCount: number
  }
}

export interface BookmarkedJob {
  _id: string
  title: string
  description: string
  category: string
  location: {
    city: string
    state: string
    country: string
  }
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | string
  industry: string
  skills: string[]
  experience: {
    level: "ENTRY_LEVEL" | "MID_LEVEL" | "SENIOR_LEVEL" | string
    years: {
      min: number
      max: number
      _id: string
    }
  }
  education: string[]
  languages: string[]
  salary: {
    min: number
    max: number
    currency: string
  }
  numberOfOpenings: number
  postedAt: string
  validTill: string
  remote: boolean
  benefits: string[]
  applicationLink: string
  createdBy: {
    userId: string
  }
  status: "ACTIVE" | "INACTIVE" | string
  priority: "LOW" | "NORMAL" | "HIGH" | string
  tags: string[]
  views: number
  applicationsCount: number
  savedCount: number
  moderationStatus: "APPROVED" | "PENDING" | "REJECTED" | string
  createdAt: string
  updatedAt: string
  __v: number
}

export default function SavedJobs() {
  const [jobs, setJobs] = useState<BookmarkedJob[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver>(null)
  const lastJobElementRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  const apiEndpoint = duration
    ? `bookmark-jobs/get-all-bookmark-jobs?userId=${user?.id}?appliedDateFilter=${duration}`
    : `bookmark-jobs/get-all-bookmark-jobs?userId=${user?.id}`

  const {
    data: savedJobsData,
    isLoading: isLoadingSavedJobs,
    error: savedJobsError,
    refetch,
  } = useApiGet<BookmarkedJobsResponse>(apiEndpoint, ["saved-jobs", duration])

  useEffect(() => {
    if (duration !== undefined) {
      refetch()
    }
  }, [duration, refetch])

  useEffect(() => {
    if (savedJobsData && savedJobsData?.statusCode === 200) {
      setJobs(savedJobsData?.data?.bookmarkedJobs || [])
    }
  }, [savedJobsData])

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
        // loadMoreJobs()
      }
    })

    if (lastJobElementRef.current) {
      observer.current.observe(lastJobElementRef.current)
    }
  }, [loading, hasMore, loadMoreJobs])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200"
      case "INACTIVE":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "PART_TIME":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "CONTRACT":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatSalary = (salary: BookmarkedJob["salary"]) => {
    if (!salary || !salary.min || !salary.max) return "Salary not disclosed"
    return `${salary.currency || "₹"} ${salary.min / 100000}L - ${salary.max / 100000}L`
  }

  const formatExperience = (experience: BookmarkedJob["experience"]) => {
    if (!experience || !experience.years) return "Experience not specified"
    return `${experience.years.min}-${experience.years.max} Yrs`
  }

  const calculateDaysAgo = (dateString: string) => {
    const postedDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - postedDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1d ago"
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    return `${Math.floor(diffDays / 30)}m ago`
  }

  const isJobExpiring = (validTill: string) => {
    const expiryDate = new Date(validTill)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  if (isLoadingSavedJobs) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading Saved jobs data...</span>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Saved Jobs</h2>
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
          <div className="text-gray-500">No Saved Jobs To Show</div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <Card
              key={index}
              className="relative bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
            >
              {/* Saved Badge and Expiry Warning */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-200"
                >
                  <Bookmark className="h-4 w-4 fill-current" />
                </Button>
                {isJobExpiring(job.validTill) && (
                  <Badge className="bg-orange-600 text-white text-xs">Expiring Soon</Badge>
                )}
              </div>

              {/* Company Logo and Basic Info */}
              <div className="flex items-start gap-4 mb-4 pr-20">
                <Avatar className="h-12 w-12 border-2 border-blue-300">
                  <AvatarImage src="/placeholder.svg" alt="Company" />
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">
                    {job?.title?.[0] || "J"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">{job?.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm">{job?.industry || "Company"}</span>
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
                    {job?.remote
                      ? "Remote"
                      : [job?.location?.city, job?.location?.state, job?.location?.country]
                          .filter(Boolean)
                          .join(", ") || "Location not specified"}
                  </span>
                </div>

                {/* Experience & Salary */}
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm">{formatExperience(job.experience)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{formatSalary(job.salary)}</span>
                  </div>
                </div>

                {/* Employment Type and Status */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={`${getEmploymentTypeColor(job?.employmentType)} text-xs`}>
                    {job?.employmentType?.replace("_", " ") || "Full Time"}
                  </Badge>
                  <Badge variant="secondary" className={`${getStatusColor(job?.status)} text-xs`}>
                    {job?.status}
                  </Badge>
                </div>

                {/* Valid Till */}
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">Valid till {format(new Date(job?.validTill), "MMM d, yyyy")}</span>
                </div>
              </div>

              {/* Skills/Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job?.skills?.slice(0, 3).map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="outline"
                    className="text-xs bg-blue-100 border-blue-300 text-blue-700"
                  >
                    {skill}
                  </Badge>
                )) || (
                  <>
                    <Badge variant="outline" className="text-xs bg-blue-100 border-blue-300 text-blue-700">
                      {job?.category || "General"}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-blue-100 border-blue-300 text-blue-700">
                      {job?.industry || "Technology"}
                    </Badge>
                  </>
                )}
                {job?.skills?.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-blue-100 border-blue-300 text-blue-700">
                    +{job.skills.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-blue-200">
                <span className="text-xs text-gray-600">{calculateDaysAgo(job?.postedAt)}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
                  onClick={() => {
                    router.push(`/job-listings/${job?._id}?saved=true`)
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
