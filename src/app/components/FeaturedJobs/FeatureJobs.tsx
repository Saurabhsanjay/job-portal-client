'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, BookmarkIcon, CheckCircle } from 'lucide-react'
import Image from 'next/image'

type Job = {
    id: number
    title: string
    company: {
        name: string
        logo: string
    }
    category: string
    location: string
    type: 'Full Time' | 'Part Time'
    isUrgent?: boolean
    isVerified: boolean
}

const jobs: Job[] = [
    {
        id: 1,
        title: "Finance Manager & Health",
        company: {
            name: "Microsoft",
            logo: "https://picsum.photos/400"
        },
        category: "Design",
        location: "New York",
        type: "Full Time",
        isUrgent: true,
        isVerified: true
    },
    {
        id: 2,
        title: "General Ledger Accountant",
        company: {
            name: "Upwork",
            logo: "https://picsum.photos/400"
        },
        category: "Design",
        location: "New York",
        type: "Full Time",
        isVerified: true
    },
    {
        id: 3,
        title: "Assistant / Store Keeper",
        company: {
            name: "Netflix",
            logo: "https://picsum.photos/400"
        },
        category: "Automotive Jobs",
        location: "New York",
        type: "Part Time",
        isVerified: true
    },
    {
        id: 4,
        title: "Senior Software Engineer",
        company: {
            name: "Google",
            logo: "https://picsum.photos/400"
        },
        category: "Technology",
        location: "New York",
        type: "Full Time",
        isVerified: true
    },
    {
        id: 5,
        title: "Product Designer",
        company: {
            name: "Apple",
            logo: "https://picsum.photos/400"
        },
        category: "Design",
        location: "New York",
        type: "Full Time",
        isUrgent: true,
        isVerified: true
    }
]
export default function FeaturedJobs() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [slidesPerView, setSlidesPerView] = useState(3)
    const totalSlides = Math.ceil(jobs.length / slidesPerView)

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth < 640) setSlidesPerView(1)
            else if (window.innerWidth < 1024) setSlidesPerView(2)
            else setSlidesPerView(3)
        }

        updateSlidesPerView()
        window.addEventListener('resize', updateSlidesPerView)

        return () => window.removeEventListener('resize', updateSlidesPerView)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides)
        }, 3000)

        return () => clearInterval(timer)
    }, [totalSlides])

    const handleDotClick = (index: number) => setCurrentSlide(index)
  

    return (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-start mb-6 space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-semibold">Featured Jobs</h2>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Know your worth and find the job that qualifies your life
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100 / slidesPerView}%)` }}
                    >
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="w-full flex-shrink-0 px-2 sm:px-3"
                                style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                            >
                                <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow h-full shadow-none">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                <Image
                                                    src={job.company.logo}
                                                    alt={job.company.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="font-semibold text-sm sm:text-base">{job.title}</h3>
                                                   
                                                </div>
                                                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground mt-1">
                                                    <Briefcase className="h-4 w-4" />
                                                    <span>{job.category}</span>
                                                    <MapPin className="h-4 w-4 ml-2" />
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                     
                                    </div>

                                    <div className="flex items-center space-x-2 mt-4">
                                        <Badge
                                            variant="secondary"
                                            className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                        >
                                            {job.type}
                                        </Badge>
                                        {job.isUrgent && (
                                            <Badge
                                                variant="secondary"
                                                className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                                            >
                                                Urgent
                                            </Badge>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center space-x-2 mt-6">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`h-2 rounded-full transition-all ${index === currentSlide
                                ? 'bg-primary w-6'
                                : 'bg-gray-300 w-2 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
