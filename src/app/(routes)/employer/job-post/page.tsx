"use client"

import Link from "next/link"
import { PostJobFlow } from "./post-job-flow"
import { Button } from "@/components/ui/button"
import { ArrowLeftCircle } from "lucide-react"

export default function Home() {
  const handleJobPost = (data: any) => {
    console.log("Job posted:", data)
    // Handle job posting logic here
  }

  return (
    <main>
      <div className="">
                <Link href="/employer/jobs">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <ArrowLeftCircle className="h-8 w-8" />
                  </Button>
                </Link>
        <PostJobFlow
          isAuthenticated={true}
          onJobPost={handleJobPost}
        />
      </div>
    </main>
  )
}
