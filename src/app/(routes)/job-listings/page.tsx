"use client"
import { useApiGet } from "@/hooks/use-api-query"
import { Loader2 } from "lucide-react"
import { JobBoard } from "./_components/JobBoard"
import { IJob } from "./types/job.types"
import { useEffect, useState } from "react"

export default function JobsPage() {
  const [jobs, setJobs] = useState("")

  const { data: jobList, isLoading, error } = useApiGet<IJob[]>("jobs/get-jobs", {}, ["jobs"])

  useEffect(() => {
    if (jobList) {
        setJobs(jobList?.data)
    }
  }, [jobList])

  console.log(jobs, "JOBS===")

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading jobs...</p>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-500 mb-2">Failed to load jobs</p>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    )
  }

  return <JobBoard initialJobs={jobs || []} />
}

