"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Briefcase, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import Image from "next/image"
import { useRouter } from "next/navigation"

type SearchFormData = {
  query: string
  location: string
  category: string
}

export default function HeroSection() {
  const [isSearching, setIsSearching] = useState(false)
  const [locationList, setLocationList] = useState<string[]>([])
  const router = useRouter()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""

  const { register, handleSubmit, control } = useForm<SearchFormData>({
    defaultValues: {
      query: "",
      location: "",
      category: "all",
    },
  })

  const fetchLocations = async (query: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/locations/list?search=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch locations")
      }
      const data = await response.json()
      setLocationList(data || [])
    } catch (error) {
      console.error("Error fetching locations:", error)
      toast.error("Failed to fetch locations. Please try again.")
    }
  }
  // Handle location input change
  const handleLocationChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value.trim()) {
      await fetchLocations(value)
    } else {
      setLocationList([]) // Clear locations if input is empty
      setLocationList(["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]) // Default locations
    }
  }
  

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true)
    try {
      // Build query parameters
      const params = new URLSearchParams()

      if (data.query.trim()) {
        params.set("keywords", data.query.trim())
      }

      if (data.location.trim()) {
        params.set("location", data.location.trim())
      }

      if (data.category && data.category !== "all") {
        params.set("category", data.category)
      }

      // Redirect to job listings with search parameters
      const queryString = params.toString()
      const url = queryString ? `/job-listings?${queryString}` : "/job-listings"

      router.push(url)
      toast.success("Redirecting to job listings...")
    } catch (error) {
      toast.error("Failed to perform search. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
      <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-start mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight"
            >
              Connecting Talent with  <span className="text-blue-600">Opportunity</span>{" "}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 text-center"
            >
              Discover your perfect job opportunity today with Recruit-G.
            </motion.p>
          </div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-all duration-300">
                <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 group focus-within:bg-gray-50 transition-colors">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 mr-3 flex-shrink-0 transition-colors" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500"
                    {...register("query")}
                  />
                </div>
                <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 group focus-within:bg-gray-50 transition-colors">
                  <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 mr-3 flex-shrink-0 transition-colors" />
                  <input
                    type="text"
                    placeholder="City, state, or country"
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500"
                    {...register("location", {
                      onChange: handleLocationChange,
                    })}
                  />
                </div>
                <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 group focus-within:bg-gray-50 transition-colors">
                  <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 mr-3 flex-shrink-0 transition-colors" />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="border-none shadow-none focus:ring-0 p-0 h-auto">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="IT Software Jobs">Technology</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Marketing Jobs">Marketing</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Sales Jobs">Sales</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Health Care">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="p-2 md:p-0 flex items-center justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-4 md:px-8 py-3 md:py-8 bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 rounded-xl md:rounded-l-none md:rounded-r-2xl shadow-lg hover:shadow-xl"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      "Find Jobs"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {[
              { image: "/job.png", number: "97,216", label: "Jobs" },
              {
                image: "/members.png",
                number: "4,782",
                label: "Members",
              },
              { image: "/resume.png", number: "5,322", label: "Resume" },
              {
                image: "/company.png",
                number: "6,329",
                label: "Company",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="inline-flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300 rounded-full shadow-md group-hover:shadow-lg">
                  <Image
                    src={stat.image || "/placeholder.svg"}
                    alt={stat.label}
                    width={64}
                    height={64}
                    className="p-2 rounded-full h-16 w-16 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 group-hover:text-gray-900 transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
