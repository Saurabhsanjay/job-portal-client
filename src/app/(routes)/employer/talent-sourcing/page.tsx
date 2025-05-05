"use client"

import * as React from "react"
import { Search, MapPin, Briefcase, FileText, Eye, Loader2, User } from "lucide-react"
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
import { useAuth } from "@/app/(providers)/AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

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

interface JobResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: Job[]
}

interface Job {
  _id: string
  title: string
  location: Location
  employmentType: string
  industry: string
  filteredCandidatesCount: number
}

interface Location {
  city: string
  state: string
  country: string
}

interface MatchTalentScoutResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: TalentScoutMatch[]
}

interface TalentScoutMatch {
  _id: string
  jobId: string
  matchCount: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
  candidateId: CandidateMatch[]
}

interface CandidateMatch {
  _id: string
  personalDetails: PersonalDetailMatch
  jobSeekerDetails: JobSeekerDetailsMatch
}

interface PersonalDetailMatch {
  firstName: string
  lastName: string
  profilePicture: string
  email: string
}

interface JobSeekerDetailsMatch {
  professionalDetails: ProfessionalDetailsMatch
}

interface ProfessionalDetailsMatch {
  currentJobTitle: string
  currentEmployer: string
  totalExperience: number
  skills: string[]
  keyAchievements: string
  currentCTC: number
  expectedCTC: number
  employmentType: string
}

const getExperienceLevelLabel = (years: number | null | undefined): string => {
  if (years === null || years === undefined || isNaN(Number(years))) return "-"

  if (years <= 2) return "Entry Level"
  if (years > 2 && years <= 5) return "Mid Level"
  if (years > 5 && years <= 10) return "Senior Level"
  if (years > 10 && years <= 15) return "Director"
  if (years > 15) return "Executive"

  return "-"
}

export default function TalentSourcing() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth()
  console.log("user------>", user)
  const [activeJobs, setActiveJobs] = React.useState([
    // {
    //   id: 1,
    //   title: "Senior Frontend Developer",
    //   location: "Remote",
    //   type: "Full-time",
    //   matches: 45,
    //   newMatches: 12,
    // },
    // {
    //   id: 2,
    //   title: "Product Manager",
    //   location: "New York, NY",
    //   type: "Full-time",
    //   matches: 28,
    //   newMatches: 5,
    // },
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
  const [jobId, setJobId] = React.useState(null)
  const [isMatchModalOpen, setIsMatchModalOpen] = React.useState(false)

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

  const handleResetFilters = () => {
    setSearchParams({
      keywords: "",
      location: "",
      experienceLevel: "",
      industry: "",
      availability: "",
      salaryRange: "",
      workType: "",
    })
    setQueryString("")
    setCandidates([])
  }

  const {
    data: TalentScoutDetails,
    isLoading,
    error,
    refetch,
  } = useApiGet<TalentScoutResponse>(
    queryString ? `talent-scout/advance-talent-scout-details?${queryString}` : null,
    {},
    ["talent-scouts", queryString],
  )

  console.log("TalentScoutDetails----------------->", TalentScoutDetails)

  React.useEffect(() => {
    if (TalentScoutDetails) {
      setCandidates(TalentScoutDetails?.data)
    }
  }, [TalentScoutDetails])

  const {
    data: TalentScoutJobs,
    isJobsLoading,
    // error,
    // refetch,
  } = useApiGet<JobResponse>(`talent-scout/talent-scout-jobs/${user?.id}`, {}, ["talent-scouts-jobs"])

  console.log("talent scout jobs------------->", TalentScoutJobs)

  React.useEffect(() => {
    if (TalentScoutJobs) {
      const activeJobs = TalentScoutJobs?.data?.map((job) => ({
        id: job._id,
        title: job.title,
        location: [job.location.city, job.location.state, job.location.country]
          .filter((item) => item !== null && item !== "")
          .join(", "),
        employmentType: job.employmentType,
        type: job.industry,
        matches: job.filteredCandidatesCount,
        newMatches: job.newFilteredCandidatesCount || 0,
      }))
      setActiveJobs(activeJobs)
    }
  }, [TalentScoutJobs])

  const {
    data: MatchCandidates,
    isMatchCandidatesLoading,
    // error,
    refetch: refetchMatchCandidates,
  } = useApiGet<MatchTalentScoutResponse>(jobId ? `talent-scout/talent-scout-details?jobId=${jobId}` : null, {}, [
    "match-candidates",
    jobId,
  ])

  React.useEffect(() => {
    refetchMatchCandidates()
    console.log("jobId----------->", jobId)
    if (jobId !== null) {
      setIsMatchModalOpen(true)
    }
  }, [jobId, refetchMatchCandidates])

  const handleViewMatches = (jobId: string) => {
    setJobId(jobId)
    // refetchMatchCandidates().then(() => {
    //   setIsMatchModalOpen(true)
    // })
  }

  console.log("MatchCandidates------->", MatchCandidates)

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
            {activeJobs.map((job, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{job.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job?.location}
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <Briefcase className="mr-1 h-4 w-4" />
                      {job?.employmentType}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">{job?.matches} matches</div>
                    </div>
                    <Button onClick={() => handleViewMatches(job?.id)}>View Matches</Button>
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
                  <Select value={searchParams?.experienceLevel} onValueChange={(value) => handleInputChange("experienceLevel", value)}>
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
                    <Select value={searchParams?.industry} onValueChange={(value) => handleInputChange("industry", value)}>
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
                    <Select value={searchParams?.availability} onValueChange={(value) => handleInputChange("availability", value)}>
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
                    <Select value={searchParams?.salaryRange} onValueChange={(value) => handleInputChange("salaryRange", value)}>
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
                    <Select value={searchParams?.workType} onValueChange={(value) => handleInputChange("workType", value)}>
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
                <Button variant="outline" onClick={handleResetFilters}>
                  Reset Filters
                </Button>
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
                  <TableHead className="w-[150px]">Industry</TableHead>
                  <TableHead className="w-[150px]">Availability</TableHead>
                  <TableHead className="w-[150px]">Skills</TableHead>
                  <TableHead className="w-[100px]">Resume</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-sm text-muted-foreground">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : candidates?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-sm text-muted-foreground">
                      No Candidates To Show
                    </TableCell>
                  </TableRow>
                ) : (
                  candidates?.map((candidate, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={candidate?.personalDetails?.profilePicture || "/placeholder.svg"}
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
                      <TableCell>
                        {candidate?.jobSeekerDetails?.jobPreferences?.preferredLocations?.[0] || "-"}
                      </TableCell>
                      <TableCell>
                        {getExperienceLevelLabel(candidate?.jobSeekerDetails?.professionalDetails?.totalExperience) ||
                          "-"}
                      </TableCell>
                      <TableCell>{candidate?.jobSeekerDetails?.professionalDetails?.employmentType || "-"}</TableCell>
                      <TableCell>{candidate?.employerDetails?.companyIndustry || "-"}</TableCell>
                      <TableCell>{candidate?.jobSeekerDetails?.professionalDetails?.noticePeriod || "-"}</TableCell>
                      <TableCell>
                        {candidate?.jobSeekerDetails?.professionalDetails?.skills
                          ?.slice(0, 3)
                          .map((skill) => skill)
                          .join(", ") || "-"}
                      </TableCell>
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
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : candidates?.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted-foreground">No Candidates To Show</div>
            ) : (
              candidates?.map((candidate, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={candidate?.personalDetails?.profilePicture || "/placeholder.svg"}
                          alt={candidate.personalDetails?.firstName}
                        />
                        <AvatarFallback>{candidate?.personalDetails?.firstName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-base">
                          {candidate?.personalDetails?.firstName} {candidate?.personalDetails?.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">{candidate?.personalDetails?.email}</div>
                        <div className="text-sm font-medium mt-1">
                          {candidate?.jobSeekerDetails?.professionalDetails?.currentJobTitle || "-"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Location:</span>
                        <div>{candidate?.jobSeekerDetails?.jobPreferences?.preferredLocations?.[0] || "-"}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Experience:</span>
                        <div>
                          {getExperienceLevelLabel(candidate?.jobSeekerDetails?.professionalDetails?.totalExperience) ||
                            "-"}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Employment:</span>
                        <div>{candidate?.jobSeekerDetails?.professionalDetails?.employmentType || "-"}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Industry:</span>
                        <div>{candidate?.employerDetails?.companyIndustry || "-"}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Availability:</span>
                        <div>{candidate?.jobSeekerDetails?.professionalDetails?.noticePeriod || "-"}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Skills:</span>
                        <div className="truncate">
                          {candidate?.jobSeekerDetails?.professionalDetails?.skills
                            ?.slice(0, 3)
                            .map((skill) => skill)
                            .join(", ") || "-"}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={candidate?.jobSeekerDetails?.professionalDetails?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Resume
                        </a>
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
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
      <Dialog open={isMatchModalOpen} onOpenChange={setIsMatchModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Candidate Matches</DialogTitle>
            <DialogDescription>Candidates that match the requirements for this job position</DialogDescription>
          </DialogHeader>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Current Job Title</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Expected CTC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isMatchCandidatesLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : MatchCandidates?.data?.[0]?.candidateId?.length === 0 ||
                  MatchCandidates?.data?.length === 0 ||
                  MatchCandidates === undefined ||
                  MatchCandidates === null ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-sm text-muted-foreground">
                      No matching candidates found
                    </TableCell>
                  </TableRow>
                ) : (
                  MatchCandidates?.data?.[0]?.candidateId?.map((candidate) => (
                    <TableRow key={candidate._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={candidate.personalDetails.profilePicture || "/placeholder.svg"}
                              alt={candidate.personalDetails.firstName}
                            />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {candidate.personalDetails.firstName} {candidate.personalDetails.lastName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.personalDetails.email}</TableCell>
                      <TableCell>{candidate.jobSeekerDetails.professionalDetails.currentJobTitle}</TableCell>
                      <TableCell>{candidate.jobSeekerDetails.professionalDetails.totalExperience} years</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {candidate.jobSeekerDetails.professionalDetails.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>${candidate.jobSeekerDetails.professionalDetails.expectedCTC}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// export default TalentSourcing
