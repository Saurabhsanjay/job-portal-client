"use client"

import { PostJobFlow } from "./post-job-flow"

export default function Home() {
  const handleJobPost = (data: any) => {
    console.log("Job posted:", data)
    // Handle job posting logic here
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <PostJobFlow
          isAuthenticated={false} // Set to true if user is logged in
          onJobPost={handleJobPost}
        />
      </div>
    </main>
  )
}
