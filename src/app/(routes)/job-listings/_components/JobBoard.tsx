"use client"

import { useState, useEffect } from "react"
import { FilterSidebar } from "./FilterSidebar"
import { JobCard } from "./JobCard"
import type { IJob, JobFilters } from "../types/job.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JobBoardProps {
    initialJobs: IJob[]
}

export function JobBoard({ initialJobs }: JobBoardProps) {
    
    const [jobs] = useState<IJob[]>(initialJobs)
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

    useEffect(() => {
        const checkIfMobile = () => setIsMobile(window.innerWidth < 1024)
        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)
        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    const handleFilterChange = (newFilters: JobFilters) => {
        setFilters(newFilters)
        // Here you would typically fetch filtered jobs from the API
    }

    const handleSaveJob = (jobId: string) => {
        // Implement save job functionality
        console.log("Save job:", jobId)
    }

    const handleApplyJob = (jobId: string) => {
        // Implement apply job functionality
        console.log("Apply to job:", jobId)
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
                                <Select defaultValue="relevance">
                                    <SelectTrigger className="w-[140px] md:w-[180px] text-sm md:text-base">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevance" className="text-sm md:text-base">Most Relevant</SelectItem>
                                        <SelectItem value="recent" className="text-sm md:text-base">Most Recent</SelectItem>
                                        <SelectItem value="salary-high" className="text-sm md:text-base">Highest Salary</SelectItem>
                                        <SelectItem value="salary-low" className="text-sm md:text-base">Lowest Salary</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Job Cards */}
                        <div className="space-y-2 md:space-y-4">
                            {jobs.map((job,i) => (
                                <JobCard key={i} job={job} onSave={handleSaveJob} onApply={handleApplyJob} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}