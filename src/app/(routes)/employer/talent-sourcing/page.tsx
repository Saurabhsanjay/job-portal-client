"use client"

import * as React from "react"
import { Search, MapPin, Briefcase, Save, FileText, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useApiGet } from "@/hooks/use-api-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]

const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"]

export interface TalentScoutResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: TalentScout[]
}

export interface TalentScout {
  _id: string
  role: string
  personalDetails: PersonalDetails
  socialLogins: any[]
  jobSeekerDetails?: JobSeekerDetails
  employerDetails?: EmployerDetails
  activityDetails: ActivityDetails
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface PersonalDetails {
  firstName: string
  lastName: string
  phoneNumber?: PhoneNumber
  profilePicture?: string
  gender?: string
  email: string
  dateOfBirth?: string
  age?: string
  bio?: string
  address?: Address
  password?: string
  languages?: string[]
}

export interface PhoneNumber {
  number: string
  countryCode: string
}

export interface Address {
  street?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
}

export interface JobSeekerDetails {
  education?: Education[]
  professionalExperience?: ProfessionalExperience[]
  achivements?: Achievement[]
  professionalDetails: ProfessionalDetails
  jobPreferences?: JobPreferences
  applicationsHistory?: Application[]
}

export interface Education {
  _id: string
  qualification: string
  institution: string
  startDate: string
  endDate: string
  description: string
  grade: string
}

export interface ProfessionalExperience {
  _id: string
  companyName: string
  jobTitle: string
  startDate: string
  endDate: string
  keyAchievements: string
}

export interface Achievement {
  _id: string
  title: string
  organization: string
  issuedDate: string
  description: string
}

export interface ProfessionalDetails {
  currentJobTitle?: string
  currentEmployer?: string
  totalExperience?: number
  skills?: string[]
  resume?: string
  keyAchievements?: string
  noticePeriod?: string
  currentCTC?: number
  expectedCTC?: number
  employmentType?: string
  website?: string
  linkedIn?: string
  facebook?: string
  portfolio?: string
}

export interface JobPreferences {
  preferredJobTitles?: string[]
  preferredLocations?: string[]
  preferredIndustries?: string[]
  workType?: string
  expectedSalary?: number
  jobAlerts: boolean
}

export interface Application {
  _id: string
  jobId: string
  status: string
  appliedDate: string
}

export interface EmployerDetails {
  companyName?: string
  companyLogo?: string
  companyWebsite?: string
  companySize?: number
  companyIndustry?: string
  companyDescription?: string
  jobPostings?: any[]
  allowInSearch?: boolean
  benefitsAndPerks?: string[]
}

export interface ActivityDetails {
  passwordResetToken?: string
  passwordResetExpires?: string
  accountStatus: string
  lastLogin: string
  accountCreationDate?: string
}

const mapExperienceLevel = (experienceLevel: string) => {
    switch (experienceLevel) {
      case 'Entry Level':
        return { $lte: 2 };
      case 'Mid Level':
        return { $gt: 2, $lte: 5 };
      case 'Senior Level':
        return { $gt: 5, $lte: 10 };
      case 'Director':
        return { $gt: 10, $lte: 15 };
      case 'Executive':
        return { $gt: 15 };
      default:
        return {};
    }
  }

export default function TalentSourcing() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeJobs, setActiveJobs] = React.useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Remote",
      type: "Full-time",
      matches: 45,
      newMatches: 12,
    },
    {
      id: 2,
      title: "Product Manager",
      location: "New York, NY",
      type: "Full-time",
      matches: 28,
      newMatches: 5,
    },
  ])

  const [candidates, setCandidates] = React.useState([])

  const [searchParams, setSearchParams] = React.useState({
    keywords: "",
    location: "",
    experienceLevel: "",
    industry: "",
    availability: "",
    salaryRange: "",
    workType: "",
  })

  const [queryString, setQueryString] = React.useState("")

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle search button click
  const handleSearch = () => {
    const queryParams = new URLSearchParams()
    if (searchParams.keywords) queryParams.append("keywords", searchParams.keywords)
    if (searchParams.location) queryParams.append("location", searchParams.location)
    if (searchParams.experienceLevel) queryParams.append("experienceLevel", searchParams.experienceLevel)
    if (searchParams.industry) queryParams.append("industryType", searchParams.industry)
    if (searchParams.workType) queryParams.append("workType", searchParams.workType)
    if (searchParams.availability) queryParams.append("Availability", searchParams.availability)
    if (searchParams.salaryRange) queryParams.append("salaryRange", searchParams.salaryRange)
  
    const queryStr = queryParams.toString()
    setQueryString(queryStr)
  }
  

  const {
    data: TalentScoutDetails,
    isLoading,
    error,
    refetch,
  } = useApiGet<TalentScoutResponse>(`talent-scout/advance-talent-scout-details?${queryString}`, {}, ["talent-scouts", queryString])
  
  console.log("TalentScoutDetails----------------->", TalentScoutDetails)

  React.useEffect(() => {
    if (TalentScoutDetails) {
      setCandidates(TalentScoutDetails?.data)
    }
  }, [TalentScoutDetails])

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
            {activeJobs.map((job) => (
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
                  <Input
                    placeholder="Skills, job titles, or companies"
                    value={searchParams?.keywords}
                    onChange={(e) => handleInputChange("keywords", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="City, state, or remote"
                    value={searchParams.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Level</label>
                  <Select onValueChange={(value) => handleInputChange("experienceLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
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
                    <Select onValueChange={(value) => handleInputChange("industry", value)}>
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
                    <Select onValueChange={(value) => handleInputChange("availability", value)}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Immediate</SelectItem>
                        <SelectItem value="1">1 month notice</SelectItem>
                        <SelectItem value="2">2 month notice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 hidden">
                    <label className="text-sm font-medium">Salary Range</label>
                    <Select onValueChange={(value) => handleInputChange("salaryRange", value)}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Salary Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-50000">$0 - $50k</SelectItem>
                        <SelectItem value="50000-100000">$50k - $100k</SelectItem>
                        <SelectItem value="100000+">$100k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Work Type</label>
                    <Select onValueChange={(value) => handleInputChange("workType", value)}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Work Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button className="w-full" onClick={handleSearch}>
                  <Search className="mr-2 h-4 w-4" />
                  Search Candidates
                </Button>
                {/* <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Search
                </Button> */}
              </div>
            </CardContent>
          </Card>

          {/* Table/Cards Section */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Candidate</TableHead>
                  <TableHead className="w-[200px]">Job Title</TableHead>
                  <TableHead className="w-[150px]">Location</TableHead>
                  <TableHead className="w-[150px]">Experience Level</TableHead>
                  <TableHead className="w-[150px]">Employment Type</TableHead>
                  {/* <TableHead className="w-[150px]">Shortlisted Date</TableHead> */}
                  <TableHead className="w-[100px]">Resume</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates?.map((candidate, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={candidate?.personalDetails?.profilePicture}
                            alt={candidate.personalDetails?.firstName}
                          />
                          <AvatarFallback>{candidate?.personalDetails?.firstName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{candidate?.personalDetails?.firstName}</div>
                          <div className="text-sm text-muted-foreground">{candidate?.personalDetails?.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{candidate?.jobSeekerDetails?.professionalDetails?.currentJobTitle}</TableCell>
                    <TableCell>{candidate?.jobSeekerDetails?.jobPreferences?.preferredLocations?.[0] || "-"}</TableCell>
                    <TableCell>{candidate?.jobSeekerDetails?.professionalDetails?.totalExperience || "-"}</TableCell>
                    <TableCell>{candidate?.jobSeekerDetails?.professionalDetails?.employmentType || "-"}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a
                          href={candidate?.jobSeekerDetails?.professionalDetails?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
            {candidates?.map((candidate, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={candidate?.personalDetails?.profilePicture}
                      alt={candidate.personalDetails?.firstName}
                    />
                    <AvatarFallback>{candidate?.personalDetails?.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{candidate?.personalDetails?.firstName}</div>
                    <div className="text-sm text-muted-foreground">{candidate?.personalDetails?.email}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {candidate?.jobSeekerDetails?.professionalDetails?.currentJobTitle}
                    </div>
                    <div className="text-sm text-gray-500">{candidate?.jobSeekerDetails?.jobPreferences?.preferredLocations?.[0] || "-"}</div>
                    {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      Applied: {"-"}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      Shortlisted: {"-"}
                    </div> */}
                    <div className="mt-3 flex justify-between items-center">
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={candidate?.jobSeekerDetails?.professionalDetails?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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

