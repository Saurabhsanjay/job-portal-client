'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, MapPin, Briefcase, Users, FileText, Building, Loader2 } from 'lucide-react'
import { motion } from "framer-motion"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"

type SearchFormData = {
  query: string
  location: string
  category: string
}

export default function HeroSection() {
  const [isSearching, setIsSearching] = useState(false)
  const { register, handleSubmit, control, formState: { errors } } = useForm<SearchFormData>({
    defaultValues: {
      query: '',
      location: '',
      category: 'all'
    }
  })

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Search data:', data)
      toast.success('Search completed successfully!')
      // Here you would typically redirect to search results page
    } catch (error) {
      toast.error('Failed to perform search. Please try again.')
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
        <div className="max-w-3xl mx-auto">
          <div className="text-start mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-loose"
            >
              Join us & Explore <span className="text-blue-600">Thousands</span> of Jobs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Find Jobs, Employment & Career Opportunities
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
                    placeholder="Job title or company"
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500"
                    {...register("query", { required: true })}
                  />
                </div>
                <div className="flex-1 flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 group focus-within:bg-gray-50 transition-colors">
                  <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 mr-3 flex-shrink-0 transition-colors" />
                  <input
                    type="text"
                    placeholder="City or postcode"
                    className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder:text-gray-500"
                    {...register("location")}
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
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="p-2 md:p-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="w-full md:w-auto px-8 py-8 bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 rounded-xl md:rounded-l-none md:rounded-r-2xl shadow-lg hover:shadow-xl"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      'Find Jobs'
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
              { icon: Briefcase, number: "97,216", label: "Jobs" },
              { icon: Users, number: "4,782", label: "Members" },
              { icon: FileText, number: "5,322", label: "Resume" },
              { icon: Building, number: "6,329", label: "Company" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
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

