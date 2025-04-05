"use client"

import { useState, useEffect } from "react"
import { FilterSidebar } from "./FilterSidebar"
import { JobCard } from "./JobCard"
import type { IJob, JobFilters } from "../types/job.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

interface JobBoardProps {
  initialJobs: IJob[]
}

export function JobBoard({ initialJobs }: JobBoardProps) {
  const router = useRouter()
  const [jobs, setJobs] = useState<IJob[]>(initialJobs)
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    location: {
      city: "",
      state: "",
      country: "",
    },
    radius: 100,
    employmentType: [],
    datePosted: "30d",
  })
  const [isMobile, setIsMobile] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1024)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    // Update jobs when initialJobs changes
    if (initialJobs.length > 0) {
      setJobs(initialJobs)
    }
  }, [initialJobs])

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters)
    // Here you would typically fetch filtered jobs from the API
    // For now, we'll just filter the existing jobs client-side
    filterJobs(newFilters)
  }

  const filterJobs = (currentFilters: JobFilters) => {
    let filteredJobs = [...initialJobs]

    // Filter by search term
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase()
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.name.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm),
      )
    }

    // Filter by location
    if (currentFilters.location.city || currentFilters.location.state || currentFilters.location.country) {
      filteredJobs = filteredJobs.filter((job) => {
        if (currentFilters.location.city && job.location.city !== currentFilters.location.city) return false
        if (currentFilters.location.state && job.location.state !== currentFilters.location.state) return false
        if (currentFilters.location.country && job.location.country !== currentFilters.location.country) return false
        return true
      })
    }

    // Filter by employment type
    // if (currentFilters.employmentType.length > 0) {
    //   filteredJobs = filteredJobs.filter((job) => currentFilters.employmentType.includes(job.employmentType))
    // }

    // Filter by experience level
    if (currentFilters.experienceLevel && currentFilters.experienceLevel.length > 0) {
      filteredJobs = filteredJobs.filter((job) => currentFilters.experienceLevel?.includes(job.experience.level))
    }

    // Filter by date posted
    if (currentFilters.datePosted) {
      const now = new Date()
      let daysAgo = 30 // default

      if (currentFilters.datePosted === "24h") daysAgo = 1
      else if (currentFilters.datePosted === "7d") daysAgo = 7
      else if (currentFilters.datePosted === "14d") daysAgo = 14

      const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo))

      filteredJobs = filteredJobs.filter((job) => new Date(job.postedAt) >= cutoffDate)
    }

    // Apply sorting
    sortJobs(filteredJobs, sortBy)
  }

  const sortJobs = (jobsToSort: IJob[], sortCriteria: string) => {
    const sortedJobs = [...jobsToSort]

    switch (sortCriteria) {
      case "recent":
        sortedJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
        break
      case "salary-high":
        sortedJobs.sort((a, b) => (b.salary.max || b.salary.min || 0) - (a.salary.max || a.salary.min || 0))
        break
      case "salary-low":
        sortedJobs.sort((a, b) => (a.salary.min || a.salary.max || 0) - (b.salary.min || b.salary.max || 0))
        break
      case "relevance":
      default:
        // For relevance, we might consider factors like matching skills, location, etc.
        // For simplicity, we'll just use the default order
        break
    }

    setJobs(sortedJobs)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    sortJobs(jobs, value)
  }

  const handleSaveJob = (jobId: string) => {
    // Implement save job functionality
    console.log("Save job:", jobId)
  }

  const handleApplyJob = (jobId: string) => {
    // Navigate to job details page
    router.push(`/jobs/${jobId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 md:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} isMobile={isMobile} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2 md:gap-4">
              <div className="text-sm md:text-base text-gray-500">
                Showing <span className="font-medium text-gray-900">{jobs.length}</span> jobs
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                {isMobile && (
                  <FilterSidebar filters={filters} onFilterChange={handleFilterChange} isMobile={isMobile} />
                )}
                <Select defaultValue={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[140px] md:w-[180px] text-sm md:text-base">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance" className="text-sm md:text-base">
                      Most Relevant
                    </SelectItem>
                    <SelectItem value="recent" className="text-sm md:text-base">
                      Most Recent
                    </SelectItem>
                    <SelectItem value="salary-high" className="text-sm md:text-base">
                      Highest Salary
                    </SelectItem>
                    <SelectItem value="salary-low" className="text-sm md:text-base">
                      Lowest Salary
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Cards */}
            {jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 mb-2">No jobs found matching your criteria</p>
                <p className="text-sm text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-2 md:space-y-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onSave={handleSaveJob}
                    onApply={() => handleApplyJob(job._id || "")}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

