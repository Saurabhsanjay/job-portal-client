"use client"
import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  MapPin,
  Building2,
  Search,
  CalendarIcon,
  SlidersHorizontal,
  PlusCircle,
  Pencil,
  Loader2,
  MoreVertical,
  User,
} from "lucide-react"
import Link from "next/link"
import { useApiGet } from "@/hooks/use-api-query"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/app/(providers)/AuthContext"

// Job type definition based on your API response
interface Job {
  id: string
  title: string
  company: {
    name: string
    website?: string
  }
  location: {
    city?: string
    state?: string
    country: string
  }
  postedAt: string
  validTill: string
  status: string
  remote: boolean
  employmentType: string
}

export default function SavedJobs() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [locationFilter, setLocationFilter] = useState("all")
  const [titleFilter, setTitleFilter] = useState("all")
  const { user } = useAuth()

  // Create a query string with the filter parameters
  const buildQueryString = () => {
    const params = new URLSearchParams()

    // Add search term if it exists
    if (searchTerm) {
      params.append("keywords", searchTerm)
    }

    // Add date filter if it exists
    if (dateFilter) {
      params.append("datePosted", format(dateFilter, "yyyy-MM-dd"))
    }

    // Add location filter if it's not "all"
    if (locationFilter && locationFilter !== "all") {
      params.append("location", locationFilter)
    }

    // Add title filter if it's not "all"
    if (titleFilter && titleFilter !== "all") {
      params.append("title", titleFilter)
    }

    return params.toString()
  }

  // Use the query string in the API call
  const queryString = buildQueryString()
  const endpoint = `jobs/get-jobs?userId=${user?.id}&${queryString ? `?${queryString}` : ""}`

  const {
    data: jobsData,
    isLoading,
    error,
    refetch,
  } = useApiGet<Job[]>(endpoint, {}, ["jobs", searchTerm, dateFilter?.toString(), locationFilter, titleFilter])

  // Store jobs in state
  const [jobs, setJobs] = useState<Job[]>([])

  // Update jobs when API data is loaded - only once when data changes
  useEffect(() => {
    if (jobsData && !jobs.length) {
      setJobs(jobsData?.data)
    }
  }, [jobsData, jobs.length])

  // Extract unique locations and titles for filters
  const locations = useMemo(() => {
    if (!jobs.length) return []
    const locationSet = new Set(
      jobs.map((job) => [job.location.city, job.location.state, job.location.country].filter(Boolean).join(", ")),
    )
    return Array.from(locationSet)
  }, [jobs])

  const titles = useMemo(() => {
    if (!jobs.length) return []
    return [...new Set(jobs.map((job) => job.title))]
  }, [jobs])

  // Format location string for display
  const getLocationString = (job: Job) => {
    return [job.location.city, job.location.state, job.location.country].filter(Boolean).join(", ")
  }

  // Replace the complex filteredJobs logic with this simpler version
  // that just uses the data from the API
  const filteredJobs = useMemo(() => {
    if (!jobsData?.data?.length) return []
    return jobsData.data
  }, [jobsData])

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
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

  useEffect(() => {
    refetch()
  }, [refetch, searchTerm, dateFilter, locationFilter, titleFilter])

  // Show loading state
  if (isLoading) {
    return (
      <Card className="p-6 shadow-sm border-none">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading jobs...</p>
        </div>
      </Card>
    )
  }

  // Show error state
  if (error) {
    return (
      <Card className="p-6 shadow-sm border-none">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-red-500 mb-2">Failed to load jobs</p>
          <p className="text-muted-foreground">{error.message}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 shadow-sm border-none">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">All Jobs</h2>
            <div className="flex gap-3">
              <Button className="hidden" variant="outline" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Link prefetch={false} href="/employer/jobs/create-job">
                <Button variant="default">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Job
                </Button>
              </Link>
            </div>
          </div>

          <Collapsible open={true} onOpenChange={setIsFiltersOpen}>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search job title, company, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4"
                    />
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("justify-start text-left font-normal", !dateFilter && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFilter ? format(dateFilter, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <CollapsibleContent className="space-y-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setDateFilter(undefined)
                        setLocationFilter("all")
                        setTitleFilter("all")
                      }}
                    >
                      Reset Filters
                    </Button>
                    <Button className="hidden" onClick={() => setIsFiltersOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </CollapsibleContent>
              </div>
            </div>
          </Collapsible>
        </div>

        {/* No jobs found state */}
        {filteredJobs.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No jobs found</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setDateFilter(undefined)
                setLocationFilter("all")
                setTitleFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Desktop Table View */}
        {filteredJobs.length > 0 && (
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Job Title</TableHead>
                  <TableHead className="w-[200px]">Date Posted</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job,index) => (
                  <TableRow key={index} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={job?.createdByDetails?.logoUrl||"P"} alt={"P"} />
                          <AvatarFallback>{job?.createdByDetails?.companyName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Building2 className="h-3 w-3" />
                            <span>{job?.createdByDetails?.companyName}</span>
                            <MapPin className="h-3 w-3 ml-2" />
                            <span>{getLocationString(job)}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{format(new Date(job?.postedAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(job?.status)}>
                        {job?.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Link href={`/employer/jobs/update-job/${job?._id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link href={`/employer/jobs/${job?._id}`} className="flex w-full">
                                View job details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/employer/jobs/candidates/${job?._id}`} className="flex w-full">
                                View applied candidates
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/employer/jobs/shortlisted-candidates/${job?._id}`} className="flex w-full">
                                View shortlisted candidates
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Mobile Card View */}
        {filteredJobs.length > 0 && (
          <div className="md:hidden space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                  <AvatarImage src={job?.createdByDetails?.logoUrl||"P"} alt={"P"} />
                  <AvatarFallback>{job?.createdByDetails?.companyName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{job?.title}</div>
                    <div className="text-sm text-gray-500 space-y-1 mt-1">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        <span>{job?.createdByDetails?.companyName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{getLocationString(job)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="secondary" className={getStatusColor(job?.status)}>
                        {job?.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{format(new Date(job?.postedAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-end mt-3 gap-2">
                      <Button variant="ghost" size="sm">
                        <Link href={`/employer/jobs/edit/${job?._id}`}>
                          <Pencil className="h-4 w-4 mr-1" />
                          {/* Edit */}
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4 mr-1" />
                            {/* Options */}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link href={`/employer/jobs/${job?.id}`} className="flex w-full">
                              View job details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/employer/jobs/candidates/${job?.id}`} className="flex w-full">
                              View applied candidates
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`/employer/jobs/shortlisted-candidates/${job?.id}`} className="flex w-full">
                              View shortlisted candidates
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
