"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import {
  Building2,
  MapPin,
  Globe,
  Calendar,
  Users,
  Briefcase,
  GraduationCap,
  Languages,
  DollarSign,
  Clock,
  Tags,
  Edit,
  UserRound,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useApiGet } from "@/hooks/use-api-query"
import { useEffect, useState } from "react"
import { useAuth } from "@/app/(providers)/AuthContext"

interface Job {
  id: string
  title: string
  description: string
  company: {
    name: string
    logoUrl?: string
    website?: string
  }
  category: string
  location: {
    city?: string
    state?: string
    country: string
    zipCode?: string
    streetAddress?: string
    coordinates?: {
      latitude?: number
      longitude?: number
    }
  }
  employmentType: string
  industry: string
  skills: string[]
  experience: {
    level: string
    years: {
      min: number
      max: number
    }
  }
  education: string[]
  languages: string[]
  salary: {
    min?: number
    max?: number
    currency: string
  }
  numberOfOpenings: number
  validTill: string
  remote: boolean
  benefits: string[]
  applicationLink: string
  priority: string
  tags: string[]
  status: string
}

export default function JobPage() {
  const params = useParams()
  const jobId = params?.id as string
  const router = useRouter()
  const [job, setJob] = useState("")
  const { user } = useAuth()

  // Fetch job data from API
  const { data: singleJob, isLoading, error } = useApiGet<Job>(`jobs/get-job?jobId=${jobId}&userId=${user?.id}`, {}, ["job", { id: jobId }])
  console.log(singleJob, "JOBBB")

  useEffect(() => {
    if (singleJob) {
      console.log("single job ----->",singleJob?.data)
      setJob(singleJob?.data)
    }
  }, [singleJob])

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading job details...</p>
      </div>
    )
  }

  // Handle error state
  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-500 mb-2">Failed to load job details</p>
        <p className="text-muted-foreground">{error?.message || "Job not found"}</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/employer/jobs")}>
          Return to Jobs
        </Button>
      </div>
    )
  }

  return (
    <JobDetails
      job={job}
      onEdit={() => router.push(`/employer/jobs/update-job/${jobId}`)}
      onViewCandidates={() => router.push(`/employer/jobs/candidates/${jobId}`)}
      onBack={() => router.push("/employer/jobs")}
    />
  )
}

interface JobDetailsProps {
  job: Job
  onEdit: () => void
  onViewCandidates: () => void
  onBack: () => void
}

function JobDetails({ job, onEdit, onViewCandidates, onBack }: JobDetailsProps) {
  const formatSalary = (min?: number, max?: number, currency?: string) => {
    if (!min && !max) return "Not specified"
    if (min && max) return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
    if (min) return `${currency} ${min.toLocaleString()}+`
    return `Up to ${currency} ${max!.toLocaleString()}`
  }

  const getLocationString = () => {
    const parts = [job.location.city, job.location.state, job.location.country].filter(Boolean).join(", ")
    return job.remote ? `${parts} (Remote)` : parts
  }

  console.log("job-------->",job)

  return (
    <div className="px-1 sm:px-6 md:px-8 shadow-sm border-none">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={job?.createdBy?.userId?.employerDetails?.logoUrl} alt={"P"} />
              <AvatarFallback className="text-lg">{job?.createdBy?.userId?.employerDetails?.companyName?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{job?.createdBy?.userId?.employerDetails?.companyName}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Job
            </Button>
            <Button onClick={onViewCandidates}>
              <UserRound className="mr-2 h-4 w-4" />
              View Candidates
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Overview Card */}
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{getLocationString()}</span>
              </div>
              {job?.company?.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={job?.company?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Company Website
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Valid till {format(new Date(job?.validTill), "PPP")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {job.numberOfOpenings} {job?.numberOfOpenings === 1 ? "Opening" : "Openings"}
                </span>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">{job?.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Requirements Card */}
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-2">
                <Briefcase className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-muted-foreground">
                    {job?.experience?.level?.replace("_", " ")} · {job?.experience?.years?.min}-{job?.experience?.years?.max}{" "}
                    years
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Education</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.education.map((edu) => (
                      <Badge key={edu} variant="secondary">
                        {edu}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Languages className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Languages</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job?.languages?.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job?.skills?.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Details Card */}
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Salary Range</h4>
                  <p className="text-muted-foreground">
                    {formatSalary(job?.salary?.min, job?.salary?.max, job?.salary?.currency)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Employment Type</h4>
                  <p className="text-muted-foreground">{job?.employmentType?.replace("_", " ")}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Benefits</h4>
              <div className="flex flex-wrap gap-2">
                {job?.benefits?.map((benefit) => (
                  <Badge key={benefit} variant="secondary">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {job?.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tags className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Badge */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant="outline" className={getStatusColor(job?.status)}>
              {job?.status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get status color
function getStatusColor(status: string) {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "bg-green-100 text-green-800"
    case "IN REVIEW":
    case "PENDING":
      return "bg-blue-100 text-blue-800"
    case "INTERVIEW":
      return "bg-purple-100 text-purple-800"
    case "REJECTED":
    case "CLOSED":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

