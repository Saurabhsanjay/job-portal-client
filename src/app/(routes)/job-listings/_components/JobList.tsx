"use client"

import { memo } from "react"
import { JobCard } from "./JobCard"
import type { IJob } from "../types/job.types"
import { Loader2 } from "lucide-react"

interface JobListProps {
  jobs: IJob[]
  isLoading: boolean
  error: Error | null
  onSaveJob: (jobId: string) => void
  onApplyJob: (jobId: string) => void
}

function JobListComponent({ jobs, isLoading, error, onSaveJob, onApplyJob }: JobListProps) {

  console.log("jobs   ----joblist", jobs)
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

  // Show empty state
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 mb-2">No jobs found matching your criteria</p>
        <p className="text-sm text-gray-400">Try adjusting your filters</p>
      </div>
    )
  }

  // Show job list
  return (
    <div className="space-y-2 md:space-y-4 max-h-full overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onSave={() => onSaveJob(job._id || "")}
          onApply={() => onApplyJob(job._id || "")}
        />
      ))}
    </div>
  )
}

// Use React.memo to prevent re-renders when props haven't changed
export const JobList = memo(JobListComponent)
