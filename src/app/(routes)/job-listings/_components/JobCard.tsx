"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bookmark, Building2, MapPin, Clock, DollarSign, ExternalLink, Share2 } from "lucide-react"
import { type IJob, JobPriority } from "../types/job.types"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface JobCardProps {
  job: IJob
  onSave?: (job: IJob) => void
  onApply?: (jobId: string) => void
}

export function JobCard({ job, onSave, onApply }: JobCardProps) {

  console.log("JobCard--------->", job)
  const formatSalary = (min?: number, max?: number, currency = "USD") => {
    if (!min && !max) return "Competitive"
    if (!max) return `${currency} ${min?.toLocaleString()}+`
    if (!min) return `Up to ${currency} ${max.toLocaleString()}`
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const postedDate = new Date(date)
    const diffInHours = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60))
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const jobId = job._id || job.id || ""

  const handleShare = () => {
    console.log("Share job:", job)
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.createdByDetails?.companyName}`,
        url: `${window.location.href}/${jobId}`,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Share URL: ${window.location.href}/${jobId}`)
    }
  }

  return (
    <Card className="p-4 sm:p-6 hover:shadow-lg shadow-sm border-none transition-shadow duration-200">
      <div className="flex flex-col gap-3">
        {/* Company Logo and Job Title */}
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              {job?.createdByDetails?.logoUrl ? (
                <Image
                  width={48}
                  height={48}
                  src={job?.createdByDetails?.logoUrl || "/placeholder.svg"}
                  alt={job?.createdByDetails?.companyName || "Company Logo"}
                  priority={true} // Use priority for the first image to load faster
                  className="h-full w-full object-cover"
                />
              ) : (
                <Building2 className="h-6 w-6 text-gray-400" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate md:text-xl">{job?.title}</h3>
              <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10" onClick={handleShare}>
                      <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
            </div>
            <p className="text-sm text-gray-500 md:text-base">{job?.createdByDetails?.companyName}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 md:text-base">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4 md:h-5 md:w-5" />
            {job?.location?.city || ""}, {job?.location?.country}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 md:h-5 md:w-5" />
            {getTimeAgo(job?.postedAt)}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
            {formatSalary(job?.salary?.min, job?.salary?.max, job?.salary?.currency)}
          </span>
        </div>

        {/* Description Preview */}
        <p className="text-sm text-gray-600 line-clamp-2 md:text-base">{job?.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-xs md:text-sm">
            {job.employmentType.replace("_", " ")}
          </Badge>
          {job.remote && (
            <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs md:text-sm">
              Remote
            </Badge>
          )}
          {job.priority === JobPriority.URGENT && (
            <Badge variant="secondary" className="bg-orange-50 text-orange-700 text-xs md:text-sm">
              Urgent
            </Badge>
          )}
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 text-xs md:text-sm">
            {job.experience.level}
          </Badge>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="bg-gray-50 text-xs md:text-sm">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="bg-gray-50 text-xs md:text-sm">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>

        {/* View Details Button */}
        <div className="flex justify-end mt-2">
          <Link href={`/job-listings/${jobId}`}>
            <Button variant="outline" className="text-sm md:text-base" onClick={() => onApply?.(jobId)}>
              View Details
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

