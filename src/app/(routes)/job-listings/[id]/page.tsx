"use client"

import { useParams, useRouter } from "next/navigation"
import { useApiGet } from "@/hooks/use-api-query"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobDescriptionPage } from "../_components/JobDescriptionPage"
import { IJob } from "../types/job.types"

export default function JobPage() {
  const params = useParams()
  const jobId = params?.id as string
  const router = useRouter()

  // Fetch job data from API
  const { data: job, isLoading, error } = useApiGet<IJob>(`jobs/get-job/${jobId}`, {}, ["job", { id: jobId }])
  console.log(job, "JOBBBBBBBB")

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
  if (error || !job?.data) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-500 mb-2">Failed to load job details</p>
        <p className="text-muted-foreground">{error?.message || "Job not found"}</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/job-listings")}>
          Return to Jobs
        </Button>
      </div>
    )
  }

  // Transform API job data to match the JobDescriptionPage props format
  const formattedJob = {
    title: job?.data?.title,
    company: {
      name: job?.data?.createdBy?.userId?.employerDetails?.companyName||"",
      logo: job?.data?.createdBy?.userId?.employerDetails?.logoUrl || "/placeholder.svg?height=48&width=48",
    },
    location: {
      city: job?.data?.location.city || "",
      state: job?.data?.location.state || "",
      country: job?.data?.location.country,
    },
    salary: formatSalary(job?.data.salary.min, job?.data.salary.max, job?.data.salary.currency),
    type: job?.data.employmentType.replace("_", " "),
    posted: new Date(job?.data.postedAt),
    expires: new Date(job?.data.validTill),
    description: job?.data.description,
    responsibilities: extractResponsibilities(job?.data.description),
    requirements: job?.data.skills.map((skill) => `Experience with ${skill}`),
    benefits: job?.data.benefits,
    isPrivate: job?.data.status === "ACTIVE",
    isUrgent: job?.data.priority === "URGENT" || job.priority === "HIGH",
  }

  return <JobDescriptionPage job={formattedJob} />
}

// Helper function to format salary
function formatSalary(min?: number, max?: number, currency = "USD") {
  if (!min && !max) return "Competitive"
  if (!max) return `${currency} ${min?.toLocaleString()}+`
  if (!min) return `Up to ${currency} ${max.toLocaleString()}`
  return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
}

// Helper function to extract responsibilities from description
function extractResponsibilities(description: string): string[] {
  // This is a simple implementation - in a real app, you might have structured data
  // or use AI to extract responsibilities from the description
  const lines = description.split("\n").filter((line) => line.trim().length > 0)

  // If there are multiple lines, use them as responsibilities
  if (lines.length > 1) {
    return lines
      .slice(1)
      .map((line) => line.trim())
      .slice(0, 5)
  }

  // Otherwise, create some generic responsibilities based on the job
  return [
    "Collaborate with cross-functional teams",
    "Implement and maintain high-quality code",
    "Participate in code reviews and technical discussions",
    "Troubleshoot and resolve technical issues",
    "Stay up-to-date with industry trends and best practices",
  ]
}

