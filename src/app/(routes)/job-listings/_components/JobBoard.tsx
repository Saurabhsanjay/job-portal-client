"use client"

import { useState, useEffect, useCallback } from "react"
import { JobList } from "./JobList"
import type { IJob } from "../types/job.types"
import { JobEmploymentType, JobExperienceLevel, type JobFilters } from "../types/job.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useApiGet, useApiPost } from "@/hooks/use-api-query"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, Search, SlidersHorizontal, X } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/app/(providers)/AuthContext"
import toast from "react-hot-toast"
import { Badge } from "@/components/ui/badge"

const locations = [
  { city: "New York", state: "NY", country: "USA" },
  { city: "Los Angeles", state: "CA", country: "USA" },
  { city: "London", state: "", country: "UK" },
  { city: "Paris", state: "", country: "France" },
  { city: "Tokyo", state: "", country: "Japan" },
  { divider: true },
  { city: "Berlin", state: "", country: "Germany" },
  { city: "Sydney", state: "", country: "Australia" },
  { city: "Toronto", state: "ON", country: "Canada" },
]

const salaryRanges = [
  { label: "$0 - $50,000", min: 0, max: 50000 },
  { label: "$50,000 - $100,000", min: 50000, max: 100000 },
  { label: "$100,000 - $150,000", min: 100000, max: 150000 },
  { label: "$150,000+", min: 150000, max: null },
]

const educationLevels = ["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctorate"]

export interface BookmarkJobResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: {
    userId: string
    jobIds: string[]
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export interface BookmarkJobPayload {
  userId: string
  jobId: string
}

export interface UnbookmarkJobResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: {
    _id: string
    userId: string
    jobIds: string[]
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export function JobBoard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()

  // Initialize filters from URL parameters
  const initializeFiltersFromURL = useCallback(() => {
    const keywords = searchParams.get("keywords") || ""
    const location = searchParams.get("location") || ""
    const category = searchParams.get("category") || ""

    return {
      search: keywords,
      location: {
        city: location,
        state: "",
        country: "",
      },
      category: category,
      radius: 100,
      employmentType: [],
      datePosted: null,
    }
  }, [searchParams])

  const [jobs, setJobs] = useState<IJob[]>([])
  const [filters, setFilters] = useState<JobFilters>(initializeFiltersFromURL())
  const [isMobile, setIsMobile] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [isOpen, setIsOpen] = useState(false)
  const [openCombobox, setOpenCombobox] = useState<string | null>(null)

  const bookmarkJobMutation = useApiPost<BookmarkJobResponse, BookmarkJobPayload>()
  const removeBookmarkJobMutation = useApiPost<UnbookmarkJobResponse, BookmarkJobPayload>()

  // Update filters when URL changes
  useEffect(() => {
    setFilters(initializeFiltersFromURL())
  }, [initializeFiltersFromURL])

  // Update URL when filters change
  const updateURL = useCallback((newFilters: JobFilters) => {
    const params = new URLSearchParams()

    if (newFilters.search) params.set("keywords", newFilters.search)
    if (newFilters.location.city) params.set("location", newFilters.location.city)
    if (newFilters.category) params.set("category", newFilters.category)

    const queryString = params.toString()
    const newURL = queryString ? `/job-listings?${queryString}` : "/job-listings"

    // Update URL without triggering a page reload
    window.history.replaceState({}, "", newURL)
  }, [])

  const handleFilterChange = useCallback(
    (newFilters: JobFilters) => {
      setFilters(newFilters)
      updateURL(newFilters)
    },
    [updateURL],
  )

  const clearAllFilters = useCallback(() => {
    const clearedFilters = {
      search: "",
      location: { city: "", state: "", country: "" },
      category: "",
      radius: 100,
      employmentType: [],
      datePosted: null,
      salaryRange: undefined,
      education: undefined,
      experienceLevel: undefined,
    }
    setFilters(clearedFilters)
    router.push("/job-listings")
  }, [router])

  const handleRadiusChange = useCallback(
    (value: number[]) => {
      handleFilterChange({ ...filters, radius: value[0] })
    },
    [filters, handleFilterChange],
  )

  const handleEmploymentTypeChange = useCallback(
    (type: JobEmploymentType) => {
      const currentTypes = filters.employmentType || []
      const updatedTypes = currentTypes.includes(type)
        ? currentTypes.filter((t) => t !== type)
        : [...currentTypes, type]
      handleFilterChange({ ...filters, employmentType: updatedTypes })
    },
    [filters, handleFilterChange],
  )

  const Combobox = useCallback(
    ({
      options,
      value,
      onChange,
      placeholder,
      label,
    }: {
      options: any[]
      value: any
      onChange: (value: any) => void
      placeholder: string
      label: string
    }) => (
      <Popover open={openCombobox === label} onOpenChange={(isOpen) => setOpenCombobox(isOpen ? label : null)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox === label}
            className="w-full justify-between text-sm md:text-base"
          >
            {value
              ? typeof value === "string"
                ? value
                : `${value.city}, ${value.state ? value.state + ", " : ""}${value.country}`
              : placeholder}
            <SlidersHorizontal className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} className="text-sm md:text-base" />
            <CommandList>
              <CommandEmpty className="text-sm md:text-base">No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {options?.map((option, index) =>
                  option.divider ? (
                    <div key={`divider-${index}`} className="border-t my-2"></div>
                  ) : option?.label ? (
                    <CommandItem
                      key={option?.label ? `${option?.label}` : `option-${index}`}
                      onSelect={() => {
                        onChange(option)
                        setOpenCombobox(null)
                      }}
                      className="text-sm md:text-base"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          (typeof value === "string" ? value === option : value?.label === option?.label)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {typeof option === "string" ? option : `${option?.label}`}
                    </CommandItem>
                  ) : (
                    <CommandItem
                      key={option.city ? `${option.city}-${option.state}-${option.country}` : `option-${index}`}
                      onSelect={() => {
                        onChange(option)
                        setOpenCombobox(null)
                      }}
                      className="text-sm md:text-base"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          (typeof value === "string" ? value === option : value?.city === option.city)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {typeof option === "string"
                        ? option
                        : `${option.city}, ${option.state ? option.state + ", " : ""}${option.country}`}
                    </CommandItem>
                  ),
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    ),
    [openCombobox],
  )

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1024)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Build query parameters based on current filters
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams()

    if (filters.search) params.set("keywords", filters.search)
    if (filters.location.city) params.set("city", filters.location.city)
    if (filters.location.state) params.set("state", filters.location.state)
    if (filters.location.country) params.set("country", filters.location.country)
    if (filters.category) params.set("category", filters.category)

    if (filters.radius !== 100) params.set("radius", filters.radius.toString())

    if (filters.employmentType && filters.employmentType.length > 0)
      params.set("jobType", filters.employmentType.join(","))

    if (filters.experienceLevel && filters.experienceLevel.length > 0)
      params.set("experienceLevel", filters.experienceLevel.join(","))

    if (filters.datePosted) {
      let datePostedValue = ""
      switch (filters.datePosted) {
        case "24h":
          datePostedValue = "Last 24 hours"
          break
        case "7d":
          datePostedValue = "Last 7 days"
          break
        case "14d":
          datePostedValue = "Last 14 days"
          break
        case "30d":
          datePostedValue = "Last 30 days"
          break
      }
      if (datePostedValue) params.set("datePosted", datePostedValue)
    }

    if (filters.salaryRange) {
      params.set("salaryRange", JSON.stringify(filters.salaryRange))
    }

    if (filters.education) {
      params.set("educationLevel", filters.education)
    }

    if (sortBy !== "relevance") params.set("sortBy", sortBy)

    return params.toString()
  }, [filters, sortBy])

  const queryString = buildQueryParams()

  const {
    data: jobList,
    isLoading,
    error,
    refetch,
  } = useApiGet<IJob[]>(`jobs/get-jobs${queryString ? `?${queryString}` : ""}`, {}, ["jobs", queryString])

  useEffect(() => {
    if (jobList?.data) {
      setJobs(jobList.data)
    }
  }, [jobList?.data])

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value)
  }, [])

  const handleSaveJob = useCallback(
    (job: IJob) => {
      if (job?.bookmarked) {
        removeBookmarkJobMutation.mutate(
          {
            endpoint: "bookmark-jobs/remove-job-bookmark",
            payload: {
              userId: user?.id || "",
              jobId: job?._id || "",
            },
          },
          {
            onSuccess: (response) => {
              if (response.data) {
                toast.success("Job unbookmarked successfully")
                refetch()
              } else if (response.error) {
                toast.error(response?.error?.message || "Something Went Wrong")
              }
            },
            onError: (error) => {
              toast.error(error?.message || "Something Went Wrong")
            },
          },
        )
      } else {
        bookmarkJobMutation.mutate(
          {
            endpoint: "bookmark-jobs/create-job-bookmark",
            payload: {
              userId: user?.id || "",
              jobId: job?._id || "",
            },
          },
          {
            onSuccess: (response) => {
              if (response.data) {
                toast.success("Job bookmarked successfully")
                refetch()
              } else if (response.error) {
                toast.error(response?.error?.message || "Something Went Wrong")
              }
            },
            onError: (error) => {
              toast.error(error?.message || "Something Went Wrong")
            },
          },
        )
      }
    },
    [bookmarkJobMutation, user?.id, refetch, removeBookmarkJobMutation],
  )

  const handleApplyJob = useCallback(
    (jobId: string) => {
      router.push(`/job-listings/${jobId}`)
    },
    [router],
  )

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0
    if (filters.search) count++
    if (filters.location.city) count++
    if (filters.category) count++
    if (filters.employmentType && filters.employmentType.length > 0) count++
    if (filters.experienceLevel && filters.experienceLevel.length > 0) count++
    if (filters.datePosted) count++
    if (filters.salaryRange) count++
    if (filters.education) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  const FilterContent = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Search by Keywords</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Job title, keywords, or company"
            value={filters.search}
            onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
            className="pl-9 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Location</h3>
        <Combobox
          options={locations}
          value={filters.location.city}
          onChange={(location) => handleFilterChange({ ...filters, location })}
          placeholder="Select location"
          label="Location"
        />

        <div className="space-y-2 md:space-y-4">
          <Label className="text-sm md:text-base">Radius around selected destination</Label>
          <Slider defaultValue={[filters.radius]} max={200} step={10} onValueChange={handleRadiusChange} />
          <div className="text-sm text-gray-500">{filters.radius}km</div>
        </div>
      </div>

      {/* Salary */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Salary Range</h3>
        <Combobox
          options={salaryRanges}
          value={
            filters?.salaryRange
              ? `$${filters?.salaryRange?.min?.toLocaleString()} - ${
                  filters?.salaryRange?.max ? "$" + filters?.salaryRange?.max?.toLocaleString() : ""
                }`
              : undefined
          }
          onChange={(salary) => {
            handleFilterChange({ ...filters, salaryRange: { min: salary.min, max: salary.max } })
          }}
          placeholder="Select salary range"
          label="Salary"
        />
      </div>

      {/* Education */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Education Level</h3>
        <Combobox
          options={educationLevels}
          value={filters.education?.[0]}
          onChange={(education) => handleFilterChange({ ...filters, education: [education] })}
          placeholder="Select education level"
          label="Education"
        />
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Job Type</h3>
        <div className="space-y-2">
          {Object.values(JobEmploymentType).map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.employmentType?.includes(type)}
                onCheckedChange={() => handleEmploymentTypeChange(type)}
                className="text-sm md:text-base"
              />
              <label
                htmlFor={type}
                className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.charAt(0) + type.slice(1).toLowerCase().replace("_", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Experience Level</h3>
        <RadioGroup
          value={filters.experienceLevel?.[0]}
          onValueChange={(value) =>
            handleFilterChange({
              ...filters,
              experienceLevel: [value as JobExperienceLevel],
            })
          }
        >
          {Object.values(JobExperienceLevel).map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={level} className="text-sm md:text-base" />
              <Label htmlFor={level} className="text-sm md:text-base">
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Date Posted */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Date Posted</h3>
        <RadioGroup
          value={filters.datePosted}
          onValueChange={(value) => handleFilterChange({ ...filters, datePosted: value })}
        >
          {["24h", "7d", "14d", "30d"].map((period) => (
            <div key={period} className="flex items-center space-x-2">
              <RadioGroupItem value={period} id={period} className="text-sm md:text-base" />
              <Label htmlFor={period} className="text-sm md:text-base">
                Last {period.endsWith("h") ? period.replace("h", " hours") : period.replace("d", " days")}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 md:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Filters Sidebar */}
          <div
            className="hidden lg:block w-80 space-y-6 p-4 md:p-6 bg-white rounded-lg shadow-sm border-none overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 40px)" }}
          >
            <FilterContent />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with Active Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2 md:gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm md:text-base text-gray-500">
                  Showing <span className="font-medium text-gray-900">{jobs.length}</span> jobs
                </div>

                {/* Active Filters Display */}
                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {filters.search && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Keywords: {filters.search}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleFilterChange({ ...filters, search: "" })}
                        />
                      </Badge>
                    )}
                    {filters.location.city && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Location: {filters.location.city}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() =>
                            handleFilterChange({ ...filters, location: { city: "", state: "", country: "" } })
                          }
                        />
                      </Badge>
                    )}
                    {filters.category && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Category: {filters.category}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleFilterChange({ ...filters, category: "" })}
                        />
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-blue-600 hover:text-blue-700 p-1 h-auto"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                {isMobile && (
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden text-sm md:text-base">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] p-4">
                      <FilterContent />
                    </SheetContent>
                  </Sheet>
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

            {/* Job List */}
            <JobList
              jobs={jobs}
              isLoading={isLoading}
              error={error}
              onSaveJob={handleSaveJob}
              onApplyJob={handleApplyJob}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
