"use client"
import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Eye,
  MapPin,
  Building2,
  Search,
  CalendarIcon,
  SlidersHorizontal,
  PlusCircle,
  Pencil,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useApiGet } from "@/hooks/use-api-query"

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

  const { data: jobsData, isLoading, error } = useApiGet<Job[]>("jobs/get-jobs", {}, ["jobs"])

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

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    if (!jobs.length) return []

    return jobs.filter((job) => {
      const locationString = getLocationString(job)

      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        locationString.toLowerCase().includes(searchTerm.toLowerCase())

      const jobDate = new Date(job.postedAt)
      const matchesDate = dateFilter === undefined || (dateFilter && jobDate >= dateFilter)

      const matchesLocation = locationFilter === "all" || locationString === locationFilter

      const matchesTitle = titleFilter === "all" || job.title === titleFilter

      return matchesSearch && matchesDate && matchesLocation && matchesTitle
    })
  }, [jobs, searchTerm, dateFilter, locationFilter, titleFilter])

  const getStatusColor = (status: string) => {
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
              <Button variant="outline" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
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

          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search job title, company, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>

              <CollapsibleContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <Select value={titleFilter} onValueChange={setTitleFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All titles</SelectItem>
                        {titles.map((title) => (
                          <SelectItem key={title} value={title}>
                            {title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All locations</SelectItem>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Posted</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateFilter && "text-muted-foreground",
                          )}
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
                </div>

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
                  <Button onClick={() => setIsFiltersOpen(false)}>Apply Filters</Button>
                </div>
              </CollapsibleContent>
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
                {filteredJobs.map((job) => (
                  <TableRow key={job._id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{job?.company?.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{job.title}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Building2 className="h-3 w-3" />
                            <span>{job?.company?.name}</span>
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Link href={`/employer/jobs/${job?._id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
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
              <Card key={job._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{job?.company?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{job?.title}</div>
                    <div className="text-sm text-gray-500 space-y-1 mt-1">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        <span>{job?.company?.name}</span>
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
                          Edit
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Link href={`/employer/jobs/${job?._id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
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

