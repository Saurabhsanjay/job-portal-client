"use client"

import * as React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Eye, MapPin, Building2, Search, CalendarIcon, SlidersHorizontal, PlusCircle, Pencil } from "lucide-react"
import Link from "next/link"

// Mock data generator
const generateMockData = (start: number, end: number) => {
    const locations = ["London, UK", "New York, US", "Berlin, DE", "Paris, FR", "Tokyo, JP", "Sydney, AU"]
    const jobTitles = [
        "Software Engineer",
        "Product Designer",
        "UI/UX Designer",
        "Frontend Developer",
        "Data Scientist",
        "Project Manager",
        "Marketing Specialist",
        "Customer Support Representative",
    ]
    const companies = ["TechCorp", "DesignHub", "InnovateLabs", "WebFlow", "DataInsights", "CloudSolutions"]

    return Array.from({ length: end - start }, (_, index) => ({
        id: start + index,
        title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        dateApplied: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
        status: ["Active", "In Review", "Rejected", "Interview"][Math.floor(Math.random() * 4)],
        logo: `/placeholder.svg?text=${Math.floor(Math.random() * 100)}`,
    }))
}

export default function SavedJobs() {
    const [isFiltersOpen, setIsFiltersOpen] = React.useState(false)
    const [jobs, setJobs] = useState(generateMockData(0, 20))
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef<IntersectionObserver>(null)
    const lastJobElementRef = useRef<HTMLDivElement>(null)

    const [searchTerm, setSearchTerm] = useState("")
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
    const [locationFilter, setLocationFilter] = useState("all")
    const [titleFilter, setTitleFilter] = useState("all")

    const locations = useMemo(() => [...new Set(jobs.map((job) => job.location))], [jobs])
    const titles = useMemo(() => [...new Set(jobs.map((job) => job.title))], [jobs])

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch =
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesDate = dateFilter === undefined || (dateFilter && job.dateApplied >= dateFilter)

            const matchesLocation = locationFilter === "all" || job.location === locationFilter
            const matchesTitle = titleFilter === "all" || job.title === titleFilter

            return matchesSearch && matchesDate && matchesLocation && matchesTitle
        })
    }, [jobs, searchTerm, dateFilter, locationFilter, titleFilter])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadMoreJobs = () => {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            const newJobs = generateMockData(jobs.length, jobs.length + 10)
            setJobs((prev) => [...prev, ...newJobs])
            setLoading(false)
            if (jobs.length >= 50) setHasMore(false) // Limit for demo
        }, 500)
    }

    useEffect(() => {
        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreJobs()
            }
        })

        if (lastJobElementRef.current) {
            observer.current.observe(lastJobElementRef.current)
        }
        // Added jobs and hasMore to the dependency array
    }, [loading, hasMore, jobs])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800"
            case "In Review":
                return "bg-blue-100 text-blue-800"
            case "Interview":
                return "bg-purple-100 text-purple-800"
            case "Rejected":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
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
                            <Link prefetch={false} href='/employer/jobs/create-job'>

                            <Button variant="default" >
                                <PlusCircle className=" h-4 w-4" />
                                Add New Job                        </Button>
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

                {/* Desktop Table View */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[400px]">Job Title</TableHead>
                                <TableHead className="w-[200px]">Date Applied</TableHead>
                                <TableHead className="w-[150px]">Status</TableHead>
                                <TableHead className="w-[100px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredJobs.map((job) => (
                                <TableRow key={job.id} className="group">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={job.logo} alt={job.company} />
                                                <AvatarFallback>{job.company[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{job.title}</div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Building2 className="h-3 w-3" />
                                                    <span>{job.company}</span>
                                                    <MapPin className="h-3 w-3 ml-2" />
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{format(job.dateApplied, "MMM d, yyyy")}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={getStatusColor(job.status)}>
                                            {job.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Link href={`/employer/jobs/${job.id}`}>
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

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {filteredJobs.map((job) => (
                        <Card key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={job.logo} alt={job.company} />
                                    <AvatarFallback>{job.company[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="font-medium">{job.title}</div>
                                    <div className="text-sm text-gray-500 space-y-1 mt-1">
                                        <div className="flex items-center gap-1">
                                            <Building2 className="h-3 w-3" />
                                            <span>{job.company}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            <span>{job.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <Badge variant="secondary" className={getStatusColor(job.status)}>
                                            {job.status}
                                        </Badge>
                                        <span className="text-sm text-gray-500">{format(job.dateApplied, "MMM d, yyyy")}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Loading indicator */}
                <div ref={lastJobElementRef} className="py-4 text-center">
                    {loading && (
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}

