"use client"
import { useApiGet } from "@/hooks/use-api-query"
import { Loader2 } from "lucide-react"
import { JobBoard } from "./_components/JobBoard"
import { IJob } from "./types/job.types"
import { useEffect, useState } from "react"

export default function JobsPage() {
  const [jobs, setJobs] = useState("")

  // const { data: jobList, isLoading, error } = useApiGet<IJob[]>("jobs/get-jobs", {}, ["jobs"])

  // useEffect(() => {
  //   if (jobList) {
  //       setJobs(jobList?.data)
  //   }
  // }, [jobList])


  return <JobBoard />
}

