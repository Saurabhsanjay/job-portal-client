"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Search, Filter, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample job data
const jobsData = [
  {
    id: "1",
    title: "Software Engineer",
    company: "TechCorp",
    industry: "Technology",
    location: "San Francisco",
    status: "Active",
    applications: 45,
    featured: true,
    postedDate: "2024-01-15",
    expiryDate: "2024-02-15",
  },
  {
    id: "2",
    title: "Marketing Manager",
    company: "BrandCo",
    industry: "Marketing",
    location: "New York",
    status: "Draft",
    applications: 0,
    featured: false,
    postedDate: "2024-01-20",
    expiryDate: "2024-02-20",
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "DataTech",
    industry: "Technology",
    location: "Austin",
    status: "Paused",
    applications: 23,
    featured: false,
    postedDate: "2024-01-10",
    expiryDate: "2024-02-10",
  },
  {
    id: "4",
    title: "Financial Advisor",
    company: "FinanceFirst",
    industry: "Finance",
    location: "Chicago",
    status: "Expired",
    applications: 67,
    featured: false,
    postedDate: "2023-12-15",
    expiryDate: "2024-01-15",
  },
  {
    id: "5",
    title: "UX Designer",
    company: "DesignStudio",
    industry: "Design",
    location: "Los Angeles",
    status: "Active",
    applications: 34,
    featured: true,
    postedDate: "2024-01-18",
    expiryDate: "2024-02-18",
  },
]

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Draft: "bg-yellow-100 text-yellow-800",
  Paused: "bg-orange-100 text-orange-800",
  Expired: "bg-red-100 text-red-800",
}

export default function JobManagement() {
  const [jobs, setJobs] = useState(jobsData)
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = industryFilter === "all" || job.industry === industryFilter
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesLocation = locationFilter === "all" || job.location === locationFilter

    return matchesSearch && matchesIndustry && matchesStatus && matchesLocation
  })

  // Get unique values for filters
  const industries = [...new Set(jobs.map((job) => job.industry))]
  const locations = [...new Set(jobs.map((job) => job.location))]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(filteredJobs.map((job) => job.id))
    } else {
      setSelectedJobs([])
    }
  }

  const handleSelectJob = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId])
    } else {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId))
    }
  }

  const handleBulkStatusChange = (newStatus: string) => {
    setJobs(jobs.map((job) => (selectedJobs.includes(job.id) ? { ...job, status: newStatus } : job)))
    setSelectedJobs([])
  }

  const handleExpireOldJobs = (days: number) => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    setJobs(
      jobs.map((job) => {
        const postedDate = new Date(job.postedDate)
        return postedDate < cutoffDate ? { ...job, status: "Expired" } : job
      }),
    )
  }

  const toggleFeature = (jobId: string) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, featured: !job.featured } : job)))
  }

  const updateJobStatus = (jobId: string, newStatus: string) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job)))
  }

  return (
    <div className="">
      <div className="flex justify-between items-center py-2 ">
        <Button>Add New Job</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setIndustryFilter("all")
                setStatusFilter("all")
                setLocationFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-4">{selectedJobs.length} job(s) selected</span>

              <Button size="sm" onClick={() => handleBulkStatusChange("Active")}>
                Activate Selected
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkStatusChange("Paused")}>
                Pause Selected
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkStatusChange("Expired")}>
                Expire Selected
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    Expire Old Jobs
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExpireOldJobs(30)}>
                    Expire jobs older than 30 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExpireOldJobs(60)}>
                    Expire jobs older than 60 days
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExpireOldJobs(90)}>
                    Expire jobs older than 90 days
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Job Listings ({filteredJobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedJobs.includes(job.id)}
                      onCheckedChange={(checked) => handleSelectJob(job.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.industry}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[job.status as keyof typeof statusColors]}>{job.status}</Badge>
                  </TableCell>
                  <TableCell>{job.applications}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toggleFeature(job.id)}>
                      <Star
                        className={`h-4 w-4 ${job.featured ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => updateJobStatus(job.id, "Active")}>
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateJobStatus(job.id, "Paused")}>Pause</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateJobStatus(job.id, "Expired")}>Expire</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleFeature(job.id)}>
                          {job.featured ? "Remove from Featured" : "Feature on Homepage"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
