"use client"

import * as React from "react"
import { Search, MapPin, Briefcase, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship"
]

const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
    "Director",
    "Executive"
]



export default function TalentSourcing() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeJobs, setActiveJobs] = React.useState([
        {
            id: 1,
            title: "Senior Frontend Developer",
            location: "Remote",
            type: "Full-time",
            matches: 45,
            newMatches: 12
        },
        {
            id: 2,
            title: "Product Manager",
            location: "New York, NY",
            type: "Full-time",
            matches: 28,
            newMatches: 5
        }
    ])


    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Talent Scout</h1>
                    <p className="text-muted-foreground">Find the perfect candidates for your open positions</p>
                </div>
            </div>

            <Tabs defaultValue="jobs" className="space-y-6">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="jobs">My Active Jobs</TabsTrigger>
                        <TabsTrigger value="search">Advanced Search</TabsTrigger>
                        {/* <TabsTrigger value="saved">Saved Talent Pools</TabsTrigger> */}
                    </TabsList>
                </div>

                <TabsContent value="jobs" className="space-y-4">
                    <div className="grid gap-4">
                        {activeJobs.map(job => (
                            <Card key={job.id}>
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold">{job.title}</h3>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="mr-1 h-4 w-4" />
                                            {job.location}
                                            <Separator orientation="vertical" className="mx-2 h-4" />
                                            <Briefcase className="mr-1 h-4 w-4" />
                                            {job.type}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="font-semibold">{job.matches} matches</div>
                                            {job.newMatches > 0 && (
                                                <Badge variant="secondary" className="mt-1">
                                                    {job.newMatches} new
                                                </Badge>
                                            )}
                                        </div>
                                        <Button>View Matches</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="search" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Advanced Candidate Search</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Keywords</label>
                                    <Input placeholder="Skills, job titles, or companies" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <Input placeholder="City, state, or remote" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Experience Level</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {experienceLevels.map(level => (
                                                <SelectItem key={level} value={level.toLowerCase()}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>


                            <div className="space-y-2">
                                <label className="text-sm font-medium">Additional Filters</label>
                                <div className="flex flex-wrap gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Industry</label>
                                        <Select>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Industry" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="medical">Medical</SelectItem>
                                                <SelectItem value="technology">Technology</SelectItem>
                                                <SelectItem value="finance">Finance</SelectItem>
                                                <SelectItem value="education">Education</SelectItem>
                                                <SelectItem value="retail">Retail</SelectItem>
                                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Availability</label>
                                        <Select>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Availability" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="immediate">Immediate</SelectItem>
                                                <SelectItem value="2-weeks">2 weeks notice</SelectItem>
                                                <SelectItem value="month">1 month notice</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Salary Range</label>
                                        <Select>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Salary Range" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0-50k">$0 - $50k</SelectItem>
                                                <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                                                <SelectItem value="100k+">$100k+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Work Type</label>
                                        <Select>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Work Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jobTypes.map(type => (
                                                    <SelectItem key={type} value={type.toLowerCase()}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button className="w-full">
                                    <Search className="mr-2 h-4 w-4" />
                                    Search Candidates
                                </Button>
                                <Button variant="outline">
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Search
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                </TabsContent>

                <TabsContent value="saved">
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
                            <div className="text-center space-y-2">
                                <h3 className="font-semibold">No saved talent pools yet</h3>
                                <p className="text-sm text-muted-foreground">
                                    Save your searches to create talent pools for quick access
                                </p>
                            </div>
                            <Button>Create Talent Pool</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
