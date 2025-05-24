"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, CheckCircle, Loader2, Building2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useApiGet } from "@/hooks/use-api-query"

type Job = {
  _id: string
  title: string
  createdByDetails?: {
    companyName: string
    logoUrl?: string
  }
  category: string
  location: {
    city?: string
    state?: string
    country: string
  }
  employmentType: string
  description: string
  priority?: "NORMAL" | "FEATURED" | "SPONSORED" | "URGENT"
  status: string
  remote: boolean
  postedAt: string
}

export default function FeaturedJobs() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const router = useRouter()

  // Fetch featured jobs from API
  const {
    data: jobsData,
    isLoading,
    error,
  } = useApiGet<Job[]>("jobs/get-jobs?priority=FEATURED&limit=10", {}, ["featured-jobs"])

  const jobs = jobsData?.data || []
  const totalSlides = Math.ceil(jobs.length / slidesPerView)

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) setSlidesPerView(1)
      else if (window.innerWidth < 1024) setSlidesPerView(2)
      else setSlidesPerView(3)
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)

    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  useEffect(() => {
    if (totalSlides > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
      }, 4000)

      return () => clearInterval(timer)
    }
  }, [totalSlides])

  const handleDotClick = (index: number) => setCurrentSlide(index)

  const handleJobClick = (job: Job) => {
    // Build query parameters for job listing page
    const params = new URLSearchParams()

    if (job.title) {
      params.set("keywords", job.title)
    }

    if (job.category) {
      params.set("category", job.category)
    }

    // Use city if available, otherwise use country
    const location = job.location.city || job.location.country
    if (location) {
      params.set("location", location)
    }

    const queryString = params.toString()
    const url = queryString ? `/job-listings?${queryString}` : "/job-listings"

    router.push(url)
  }

  const formatLocation = (location: Job["location"]) => {
    const parts = [location.city, location.state, location.country].filter(Boolean)
    return parts.join(", ")
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const posted = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="py-24 px-4 sm:px-8 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover jobs that align with your passion and skills.
            </p>
          </div>

          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600">Loading featured jobs...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="py-24 px-4 sm:px-8 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover jobs that align with your passion and skills.
            </p>
          </div>

          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-600 mb-2">Failed to load featured jobs</p>
              <p className="text-gray-500 text-sm">Please try again later</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Empty state
  if (jobs.length === 0) {
    return (
      <div className="py-24 px-4 sm:px-8 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-start mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover jobs that align with your passion and skills.
            </p>
          </div>

          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-gray-600">No featured jobs available at the moment</p>
              <p className="text-gray-500 text-sm mt-1">Check back later for new opportunities</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-24 px-4 sm:px-8 lg:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-start mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Discover jobs that align with your passion and skills.
          </p>
        </div>

        {/* Job Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)` }}
          >
            {jobs.map((job) => (
              <div
                key={job._id}
                className="w-full flex-shrink-0 px-2 sm:px-3"
                style={{ flex: `0 0 ${100 / slidesPerView}%` }}
              >
                <Card
                  className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 h-full shadow-none cursor-pointer hover:scale-[1.02] border-none"
                  onClick={() => handleJobClick(job)}
                >
                  {/* Company Logo and Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {job.createdByDetails?.logoUrl ? (
                          <Image
                            src={job.createdByDetails.logoUrl || "/placeholder.svg"}
                            alt={job.createdByDetails.companyName || "Company"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Building2 className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-900">
                              {job.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                              {job.createdByDetails?.companyName || "Company"}
                            </p>
                          </div>
                          {job.status === "ACTIVE" && (
                            <Badge
                              variant="secondary"
                              className="bg-green-50 text-green-700 hover:bg-green-100 text-xs"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground mt-2">
                          <Briefcase className="h-3 w-3" />
                          <span className="truncate">{job.category}</span>
                          <MapPin className="h-3 w-3 ml-1" />
                          <span className="truncate">{formatLocation(job.location)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{job.description}</p>

                  {/* Badges and Meta Info */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs">
                        {job.employmentType.replace("_", " ")}
                      </Badge>
                      {job.remote && (
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs">
                          Remote
                        </Badge>
                      )}
                      {job.priority === "URGENT" && (
                        <Badge variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-100 text-xs">
                          Urgent
                        </Badge>
                      )}
                      {job.priority === "SPONSORED" && (
                        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 text-xs">
                          Sponsored
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{getTimeAgo(job.postedAt)}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-blue-600 w-6" : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
