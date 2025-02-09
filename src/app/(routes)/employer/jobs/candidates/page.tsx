"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, FileText, Calendar, Search, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const jobTitles = ["All titles", "Software Engineer", "Product Designer", "UI/UX Designer", "Frontend Developer"]

const locations = ["All locations", "London, UK", "New York, US", "Berlin, DE", "Paris, FR"]

// Mock data generator
const generateMockData = (start: number, end: number) => {
    return Array.from({ length: end - start }, (_, index) => ({
        id: start + index,
        name: ["John Doe", "Jane Smith", "Mike Johnson", "Emily Brown"][Math.floor(Math.random() * 4)],
        jobTitle: ["Software Engineer", "Product Designer", "UI/UX Designer", "Frontend Developer"][
            Math.floor(Math.random() * 4)
        ],
        company: ["TechCorp", "DesignHub", "InnovateLabs", "WebFlow"][Math.floor(Math.random() * 4)],
        location: ["London, UK", "New York, US", "Berlin, DE", "Paris, FR"][Math.floor(Math.random() * 4)],
        appliedDate: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
        shortlistedDate: new Date(2024, 1, Math.floor(Math.random() * 28) + 1),
        resumeUrl: `/resumes/resume_${start + index}.pdf`,
        avatar: `/placeholder.svg?text=${Math.floor(Math.random() * 100)}`,
    }))
}

export default function AppliedCandidates() {
    const [candidates, setCandidates] = React.useState(generateMockData(0, 20))
    const [loading, setLoading] = React.useState(false)
    const [hasMore, setHasMore] = React.useState(true)
    const [filters, setFilters] = React.useState({
        search: "",
        jobTitle: "All titles",
        location: "All locations",
        date: undefined as Date | undefined,
    })
    const [appliedFilters, setAppliedFilters] = React.useState(filters)

    const observer = React.useRef<IntersectionObserver>(null)
    const lastCandidateElementRef = React.useRef<HTMLDivElement>(null)

    const loadMoreCandidates = React.useCallback(() => {
        setLoading(true)
        setTimeout(() => {
            const newCandidates = generateMockData(candidates.length, candidates.length + 10)
            setCandidates((prev) => [...prev, ...newCandidates])
            setLoading(false)
            if (candidates.length >= 50) setHasMore(false) // Limit for demo
        }, 500)
    }, [candidates.length])

    React.useEffect(() => {
        if (loading) return
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                loadMoreCandidates()
            }
        })

        if (lastCandidateElementRef.current) {
            observer.current.observe(lastCandidateElementRef.current)
        }
    }, [loading, hasMore, loadMoreCandidates])

    const applyFilters = () => {
        setAppliedFilters(filters)
    }

    const filteredCandidates = React.useMemo(() => {
        return candidates.filter((candidate) => {
            const matchesSearch = appliedFilters.search
                ? candidate.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
                candidate.company.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
                candidate.location.toLowerCase().includes(appliedFilters.search.toLowerCase())
                : true

            const matchesJobTitle = appliedFilters.jobTitle === "All titles" || candidate.jobTitle === appliedFilters.jobTitle
            const matchesLocation = appliedFilters.location === "All locations" || candidate.location === appliedFilters.location
            const matchesDate = !appliedFilters.date || format(candidate.shortlistedDate, "PP") === format(appliedFilters.date, "PP")

            return matchesSearch && matchesJobTitle && matchesLocation && matchesDate
        })
    }, [candidates, appliedFilters])

    const handleReset = () => {
        setFilters({
            search: "",
            jobTitle: "All titles",
            location: "All locations",
            date: undefined,
        })
        setAppliedFilters({
            search: "",
            jobTitle: "All titles",
            location: "All locations",
            date: undefined,
        })
    }

    return (
        <Card className="p-6 shadow-sm border-none">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Applied Candidates for Software Engineer</h2>
                </div>

                {/* Filters Section */}
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search candidate name, company, or location..."
                            value={filters.search}
                            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                            className="pl-8"
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Job Title</Label>
                                <Select
                                    value={filters.jobTitle}
                                    onValueChange={(value) => setFilters((prev) => ({ ...prev, jobTitle: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select job title" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jobTitles.map((title) => (
                                            <SelectItem key={title} value={title}>
                                                {title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Select
                                    value={filters.location}
                                    onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {locations.map((location) => (
                                            <SelectItem key={location} value={location}>
                                                {location}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Date Posted</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${!filters.date && "text-muted-foreground"}`}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {filters.date ? format(filters.date, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            selected={filters.date}
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-ignore
                                            onSelect={(date) => setFilters((prev) => ({ ...prev, date }))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={handleReset}>
                                Reset Filters
                            </Button>
                            <Button onClick={applyFilters}>Apply Filters</Button>
                        </div>
                    </div>
                </div>

                {/* Table/Cards Section */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Candidate</TableHead>
                                <TableHead className="w-[200px]">Job Title</TableHead>
                                <TableHead className="w-[150px]">Location</TableHead>
                                <TableHead className="w-[150px]">Applied Date</TableHead>
                                <TableHead className="w-[150px]">Shortlisted Date</TableHead>
                                <TableHead className="w-[100px]">Resume</TableHead>
                                <TableHead className="w-[100px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCandidates.map((candidate) => (
                                <TableRow key={candidate.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                                <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{candidate.name}</div>
                                                <div className="text-sm text-muted-foreground">{candidate.company}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{candidate.jobTitle}</TableCell>
                                    <TableCell>{candidate.location}</TableCell>
                                    <TableCell>{format(candidate.appliedDate, "MMM d, yyyy")}</TableCell>
                                    <TableCell>{format(candidate.shortlistedDate, "MMM d, yyyy")}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                            <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                <FileText className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {filteredCandidates.map((candidate) => (
                        <Card key={candidate.id} className="p-4">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                                    <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="font-medium">{candidate.name}</div>
                                    <div className="text-sm text-muted-foreground">{candidate.company}</div>
                                    <div className="text-sm text-gray-500 mt-1">{candidate.jobTitle}</div>
                                    <div className="text-sm text-gray-500">{candidate.location}</div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Applied: {format(candidate.appliedDate, "MMM d, yyyy")}
                                    </div>
                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Shortlisted: {format(candidate.shortlistedDate, "MMM d, yyyy")}
                                    </div>
                                    <div className="mt-3 flex justify-between items-center">
                                        <Button variant="ghost" size="sm" asChild>
                                            <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                <FileText className="mr-2 h-4 w-4" />
                                                Resume
                                            </a>
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Loading and Intersection Observer Reference */}
                <div ref={lastCandidateElementRef} className="py-4 text-center">
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