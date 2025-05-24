"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Megaphone,
  PenTool,
  Code2,
  Users2,
  UserCog,
  HeadphonesIcon,
  Stethoscope,
  Car,
  Building2,
  GraduationCap,
  Briefcase,
  Plane,
  Hammer,
  Calculator,
  FileText,
  Utensils,
  Shield,
  Truck,
  Factory,
  Microscope,
  Camera,
  Globe,
  Wrench,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import { useRouter } from "next/navigation"

type JobCategory = {
  id: number
  title: string
  icon: React.ComponentType<{ className?: string }>
  openPositions: number
}

const jobCategories = [
  "Accountant",
  "Administration",
  "Airlines",
  "Architect",
  "Audit",
  "Backoffice",
  "Broking",
  "CAD CAM",
  "Chef",
  "Civil Engineering",
  "Construction",
  "Consulting",
  "Content Writer",
  "CS",
  "Customer Service",
  "Data Entry",
  "Design Engineer",
  "Doctor",
  "Editing",
  "Education",
  "Equipment Operator",
  "Event Management",
  "Export",
  "Fashion",
  "Films",
  "Finance",
  "Fresh Graduate",
  "Front Desk",
  "Front Office",
  "Graphic Designer",
  "Guard",
  "Hardware",
  "Health Care",
  "Housekeeping",
  "HR",
  "Import",
  "Industrial",
  "Inspector",
  "Installation",
  "Insurance",
  "Interior Design Jobs",
  "IT Hardware Jobs",
  "IT Networking Jobs",
  "IT Software Jobs",
  "Journalism Jobs",
  "Lawyer Jobs",
  "Legal Advisor Jobs",
  "Legal Jobs",
  "Logistics Jobs",
  "Maintenance Jobs",
  "Management Jobs",
  "Manufacturing Jobs",
  "Marketing Jobs",
  "Medical Research Jobs",
  "MR Jobs",
  "Nurse Jobs",
  "Oil And Gas Jobs",
  "Operation Jobs",
  "Petroleum Jobs",
  "Pharma Jobs",
  "PR Jobs",
  "Production Jobs",
  "Projects Jobs",
  "Purchase Jobs",
  "Quality Jobs",
  "Real Estate Jobs",
  "Repair Jobs",
  "Research And Development Jobs",
  "Restaurant Jobs",
  "Retailing Jobs",
  "Sales Jobs",
  "Secretary Jobs",
  "Security Jobs",
  "Shipping Jobs",
  "Site Engineering Jobs",
  "Supply Chain Jobs",
  "Tax Jobs",
  "Teaching Jobs",
  "Telecalling Jobs",
  "Telecom Jobs",
  "Testing Jobs",
  "Textile Jobs",
  "Ticketing Jobs",
  "Traveling Jobs",
  "Visualizer Jobs",
  "Web Designer Jobs",
]

// Icon mapping function
const getCategoryIcon = (category: string): React.ComponentType<{ className?: string }> => {
  const lowerCategory = category.toLowerCase()

  if (lowerCategory.includes("account") || lowerCategory.includes("finance") || lowerCategory.includes("tax"))
    return Calculator
  if (lowerCategory.includes("marketing") || lowerCategory.includes("pr")) return Megaphone
  if (lowerCategory.includes("design") || lowerCategory.includes("graphic")) return PenTool
  if (
    lowerCategory.includes("software") ||
    lowerCategory.includes("web") ||
    lowerCategory.includes("it") ||
    lowerCategory.includes("networking")
  )
    return Code2
  if (lowerCategory.includes("hr") || lowerCategory.includes("human")) return Users2
  if (lowerCategory.includes("management") || lowerCategory.includes("consulting")) return UserCog
  if (lowerCategory.includes("customer") || lowerCategory.includes("telecalling") || lowerCategory.includes("telecom"))
    return HeadphonesIcon
  if (
    lowerCategory.includes("health") ||
    lowerCategory.includes("medical") ||
    lowerCategory.includes("doctor") ||
    lowerCategory.includes("nurse") ||
    lowerCategory.includes("pharma")
  )
    return Stethoscope
  if (lowerCategory.includes("automotive") || lowerCategory.includes("car")) return Car
  if (lowerCategory.includes("airline") || lowerCategory.includes("traveling")) return Plane
  if (lowerCategory.includes("construction") || lowerCategory.includes("civil") || lowerCategory.includes("architect"))
    return Hammer
  if (
    lowerCategory.includes("education") ||
    lowerCategory.includes("teaching") ||
    lowerCategory.includes("fresh graduate")
  )
    return GraduationCap
  if (lowerCategory.includes("chef") || lowerCategory.includes("restaurant")) return Utensils
  if (lowerCategory.includes("security") || lowerCategory.includes("guard")) return Shield
  if (lowerCategory.includes("logistics") || lowerCategory.includes("shipping") || lowerCategory.includes("supply"))
    return Truck
  if (
    lowerCategory.includes("manufacturing") ||
    lowerCategory.includes("production") ||
    lowerCategory.includes("industrial")
  )
    return Factory
  if (lowerCategory.includes("research") || lowerCategory.includes("testing")) return Microscope
  if (lowerCategory.includes("films") || lowerCategory.includes("journalism")) return Camera
  if (lowerCategory.includes("export") || lowerCategory.includes("import")) return Globe
  if (
    lowerCategory.includes("maintenance") ||
    lowerCategory.includes("repair") ||
    lowerCategory.includes("installation")
  )
    return Wrench
  if (lowerCategory.includes("content") || lowerCategory.includes("editing") || lowerCategory.includes("secretary"))
    return FileText
  if (lowerCategory.includes("real estate") || lowerCategory.includes("broking")) return Building2

  return Briefcase // Default icon
}

// Generate random job openings for demo (replace with real API data)
const getRandomJobCount = () => Math.floor(Math.random() * 50) + 1

// Convert categories to objects with icons and job counts
const categories: JobCategory[] = jobCategories.map((category, index) => ({
  id: index + 1,
  title: category,
  icon: getCategoryIcon(category),
  openPositions: getRandomJobCount(),
}))

export default function JobCategories() {
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter()
  const categoriesPerPage = 12
  const totalPages = Math.ceil(categories.length / categoriesPerPage)

  const currentCategories = categories.slice(currentPage * categoriesPerPage, (currentPage + 1) * categoriesPerPage)

  const handleCategoryClick = (categoryTitle: string) => {
    // Navigate to job listings with category filter
    const params = new URLSearchParams()
    params.set("category", categoryTitle)
    router.push(`/job-listings?${params.toString()}`)
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  const handleShowMore = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    } else {
      setCurrentPage(0) // Reset to first page
    }
  }

  return (
    <div className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-start mb-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold">Popular Job Categories</h2>
          <p className="text-muted-foreground">
            Explore {categories.length} job categories — Find your perfect career path.
          </p>
        </div>

        {/* Categories Grid - Now 4 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[200px]">
          {currentCategories.map((category) => (
            <Card
              key={category.id}
              className="p-4 border border-gray-100 hover:border-blue-200 transition-all duration-300 shadow-none group cursor-pointer hover:shadow-lg hover:scale-[1.02]"
              onClick={() => handleCategoryClick(category.title)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-500 transition-all duration-300">
                    <category.icon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 text-sm">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    ({category.openPositions} opening{category.openPositions !== 1 ? "s" : ""})
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          {/* Page Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {currentPage * categoriesPerPage + 1}-
              {Math.min((currentPage + 1) * categoriesPerPage, categories.length)} of {categories.length} categories
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Page Dots */}
            <div className="flex items-center gap-1 mx-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentPage ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            {/* Next/Show More Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Show More Button (Alternative) */}
          <Button onClick={handleShowMore} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <MoreHorizontal className="h-4 w-4" />
            {currentPage < totalPages - 1 ? "Show More Categories" : "Show All Categories"}
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
