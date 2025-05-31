"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Mail,
  UserCheck,
  UserX,
  Eye,
  Edit,
  Lock,
  Unlock,
  Briefcase,
  Building,
  GraduationCap,
  FileUser,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Sample data for job seekers
const jobSeekers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    profileCompletion: 85,
    status: "Verified",
    lastActive: "2024-03-14T10:30:00",
    skills: ["React", "TypeScript", "Node.js"],
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    profileCompletion: 65,
    status: "Pending Verification",
    lastActive: "2024-03-13T14:45:00",
    skills: ["UI/UX Design", "Figma", "Adobe XD"],
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    profileCompletion: 95,
    status: "Verified",
    lastActive: "2024-03-14T09:15:00",
    skills: ["Python", "Data Science", "Machine Learning"],
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    profileCompletion: 40,
    status: "Incomplete",
    lastActive: "2024-03-10T11:20:00",
    skills: ["Marketing", "Content Writing"],
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@example.com",
    profileCompletion: 75,
    status: "Verified",
    lastActive: "2024-03-13T16:30:00",
    skills: ["Java", "Spring Boot", "AWS"],
    avatar: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    profileCompletion: 30,
    status: "Flagged",
    lastActive: "2024-03-08T13:45:00",
    skills: ["Sales", "Customer Relations"],
    avatar: "/placeholder.svg",
  },
]

// Sample data for employers
const employers = [
  {
    id: 1,
    companyName: "TechInnovate Solutions",
    contactPerson: "David Chen",
    email: "david.chen@techinnovate.com",
    activeJobs: 8,
    totalHires: 24,
    status: "Active",
    lastActive: "2024-03-14T11:30:00",
    verificationStatus: "Verified",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    companyName: "Global Finance Group",
    contactPerson: "Jennifer Smith",
    email: "jennifer.smith@globalfinance.com",
    activeJobs: 5,
    totalHires: 12,
    status: "Active",
    lastActive: "2024-03-13T15:45:00",
    verificationStatus: "Verified",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    companyName: "Creative Design Studio",
    contactPerson: "Robert Johnson",
    email: "robert.johnson@creativedesign.com",
    activeJobs: 3,
    totalHires: 8,
    status: "Inactive",
    lastActive: "2024-03-10T09:15:00",
    verificationStatus: "Pending",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    companyName: "HealthPlus Medical",
    contactPerson: "Maria Rodriguez",
    email: "maria.rodriguez@healthplus.com",
    activeJobs: 6,
    totalHires: 15,
    status: "Active",
    lastActive: "2024-03-14T10:20:00",
    verificationStatus: "Verified",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    companyName: "EduTech Innovations",
    contactPerson: "Thomas Wilson",
    email: "thomas.wilson@edutech.com",
    activeJobs: 4,
    totalHires: 10,
    status: "Active",
    lastActive: "2024-03-13T14:30:00",
    verificationStatus: "Verified",
    avatar: "/placeholder.svg",
  },
]

// Sample data for institutions
const institutions = [
  {
    id: 1,
    name: "Tech University",
    type: "University",
    contactPerson: "Dr. Alan Parker",
    email: "alan.parker@techuniversity.edu",
    students: 1250,
    recruiters: 45,
    accessLevel: "Full Access",
    status: "Active",
    lastActive: "2024-03-14T09:30:00",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Business Academy",
    type: "Business School",
    contactPerson: "Prof. Lisa Johnson",
    email: "lisa.johnson@businessacademy.edu",
    students: 850,
    recruiters: 32,
    accessLevel: "Limited Access",
    status: "Active",
    lastActive: "2024-03-13T11:45:00",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Design Institute",
    type: "Specialized Institute",
    contactPerson: "Dr. Mark Williams",
    email: "mark.williams@designinstitute.edu",
    students: 620,
    recruiters: 28,
    accessLevel: "Full Access",
    status: "Active",
    lastActive: "2024-03-14T10:15:00",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Medical College",
    type: "Medical School",
    contactPerson: "Dr. Sarah Thompson",
    email: "sarah.thompson@medicalcollege.edu",
    students: 780,
    recruiters: 22,
    accessLevel: "Limited Access",
    status: "Inactive",
    lastActive: "2024-03-10T14:20:00",
    avatar: "/placeholder.svg",
  },
]

export default function UserManagement() {
  const [searchJobSeekers, setSearchJobSeekers] = useState("")
  const [searchEmployers, setSearchEmployers] = useState("")
  const [searchInstitutions, setSearchInstitutions] = useState("")

  // Filter job seekers based on search
  const filteredJobSeekers = jobSeekers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchJobSeekers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchJobSeekers.toLowerCase()),
  )

  // Filter employers based on search
  const filteredEmployers = employers.filter(
    (employer) =>
      employer.companyName.toLowerCase().includes(searchEmployers.toLowerCase()) ||
      employer.contactPerson.toLowerCase().includes(searchEmployers.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchEmployers.toLowerCase()),
  )

  // Filter institutions based on search
  const filteredInstitutions = institutions.filter(
    (institution) =>
      institution.name.toLowerCase().includes(searchInstitutions.toLowerCase()) ||
      institution.contactPerson.toLowerCase().includes(searchInstitutions.toLowerCase()) ||
      institution.email.toLowerCase().includes(searchInstitutions.toLowerCase()),
  )

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
            case "Verified":
            return "bg-green-100 text-green-800"
        case "Pending Verification":
            return "bg-blue-100 text-blue-800"
        case "Flagged":
            return "bg-purple-100 text-purple-800"
        case "Pending":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage job seekers, employers, and institutions on the platform.</p>
      </div> */}

      <Tabs defaultValue="job-seekers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="job-seekers" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Job Seekers
          </TabsTrigger>
          <TabsTrigger value="employers" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Employers
          </TabsTrigger>
          <TabsTrigger value="institutions" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Institutions
          </TabsTrigger>
        </TabsList>

        {/* Job Seekers Tab */}
        <TabsContent value="job-seekers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Seeker Management</CardTitle>
              <CardDescription>
                View and manage job seeker accounts, verify profiles, and assist with profile completion.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search job seekers..."
                    className="pl-8"
                    value={searchJobSeekers}
                    onChange={(e) => setSearchJobSeekers(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button>Add Job Seeker</Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Profile Completion</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobSeekers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{user.profileCompletion}%</span>
                              <span className="text-xs text-muted-foreground">
                                {user.profileCompletion < 50 ? "Needs attention" : ""}
                              </span>
                            </div>
                            <Progress value={user.profileCompletion} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                         
                          <Badge variant="secondary" className={getStatusColor(user.status)}>
                                 {user.status}
                              </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.skills.slice(0, 2).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {user.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{user.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit className="h-4 w-4" /> Edit Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <FileUser className="h-4 w-4" /> Download Resume
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Manage Complaints
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <UserX className="h-4 w-4" /> Suspend Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredJobSeekers.length}</strong> of <strong>{jobSeekers.length}</strong> job
                  seekers
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">

            <Card>
              <CardHeader>
                <CardTitle>Profile Completion Assistance</CardTitle>
                <CardDescription>Help job seekers complete their profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>ED</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Emily Davis</div>
                        <div className="text-sm text-muted-foreground">40% Complete</div>
                      </div>
                    </div>
                    <Button size="sm">
                      <Mail className="h-4 w-4 mr-1" /> Send Reminder
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Olivia Martinez</div>
                        <div className="text-sm text-muted-foreground">30% Complete</div>
                      </div>
                    </div>
                    <Button size="sm">
                      <Mail className="h-4 w-4 mr-1" /> Send Reminder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Employers Tab */}
        <TabsContent value="employers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employer Management</CardTitle>
              <CardDescription>Monitor employer activities, job postings, and hiring trends.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search employers..."
                    className="pl-8"
                    value={searchEmployers}
                    onChange={(e) => setSearchEmployers(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button>Add Employer</Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Active Jobs</TableHead>
                      <TableHead>Total Hires</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployers.map((employer) => (
                      <TableRow key={employer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={employer.avatar} alt={employer.companyName} />
                              <AvatarFallback>{employer.companyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{employer.companyName}</div>
                              <Badge variant="secondary" className={getStatusColor(employer.verificationStatus)}>
                                 {employer.verificationStatus}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{employer.contactPerson}</div>
                          <div className="text-sm text-muted-foreground">{employer.email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{employer.activeJobs}</div>
                          <div className="text-sm text-muted-foreground">Active postings</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{employer.totalHires}</div>
                          <div className="text-sm text-muted-foreground">Total hires</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={employer.status === "Active" ? "success" : "secondary"}>
                            {employer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit className="h-4 w-4" /> Edit Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Contact Employer
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" /> View Job Postings
                              </DropdownMenuItem>
                              {employer.verificationStatus !== "Verified" ? (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4" /> Verify Employer
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <XCircle className="h-4 w-4" /> Revoke Verification
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Lock className="h-4 w-4" /> Suspend Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredEmployers.length}</strong> of <strong>{employers.length}</strong> employers
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Employer Verification</CardTitle>
                <CardDescription>Verify employer accounts and business credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>CD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Creative Design Studio</div>
                        <div className="text-sm text-muted-foreground">Pending Verification</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" /> Verify
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiring Trends</CardTitle>
                <CardDescription>Monitor employer hiring activities and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">TechInnovate Solutions</div>
                      <div className="text-sm text-muted-foreground">8 active jobs, 24 total hires</div>
                    </div>
                    <Badge variant="success">High Activity</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">Global Finance Group</div>
                      <div className="text-sm text-muted-foreground">5 active jobs, 12 total hires</div>
                    </div>
                    <Badge variant="success">High Activity</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">HealthPlus Medical</div>
                      <div className="text-sm text-muted-foreground">6 active jobs, 15 total hires</div>
                    </div>
                    <Badge variant="success">High Activity</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Institutions Tab */}
        <TabsContent value="institutions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institution Management</CardTitle>
              <CardDescription>
                Manage institutional access and oversee their collaborations with recruiters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search institutions..."
                    className="pl-8"
                    value={searchInstitutions}
                    onChange={(e) => setSearchInstitutions(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button>Add Institution</Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institution</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Recruiters</TableHead>
                      <TableHead>Access Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInstitutions.map((institution) => (
                      <TableRow key={institution.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={institution.avatar} alt={institution.name} />
                              <AvatarFallback>{institution.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{institution.name}</div>
                              <div className="text-sm text-muted-foreground">{institution.type}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{institution.contactPerson}</div>
                          <div className="text-sm text-muted-foreground">{institution.email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{institution.students}</div>
                          <div className="text-sm text-muted-foreground">Registered</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{institution.recruiters}</div>
                          <div className="text-sm text-muted-foreground">Connected</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={institution.accessLevel === "Full Access" ? "success" : "secondary"}>
                            {institution.accessLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={institution.status === "Active" ? "success" : "secondary"}>
                            {institution.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit className="h-4 w-4" /> Edit Institution
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Contact Institution
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Building className="h-4 w-4" /> View Recruiters
                              </DropdownMenuItem>
                              {institution.accessLevel !== "Full Access" ? (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Unlock className="h-4 w-4" /> Grant Full Access
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Lock className="h-4 w-4" /> Limit Access
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Lock className="h-4 w-4" /> Suspend Access
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredInstitutions.length}</strong> of <strong>{institutions.length}</strong>{" "}
                  institutions
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recruiter Collaborations</CardTitle>
                <CardDescription>Monitor collaborations between institutions and recruiters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">Tech University + TechInnovate Solutions</div>
                      <div className="text-sm text-muted-foreground">12 placements this month</div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">Business Academy + Global Finance Group</div>
                      <div className="text-sm text-muted-foreground">8 placements this month</div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">Design Institute + Creative Design Studio</div>
                      <div className="text-sm text-muted-foreground">5 placements this month</div>
                    </div>
                    <Badge variant="secondary">Inactive</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Management</CardTitle>
                <CardDescription>Manage access levels for institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Medical College</div>
                        <div className="text-sm text-muted-foreground">Limited Access</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Unlock className="h-4 w-4 mr-1" /> Grant Full Access
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>BA</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Business Academy</div>
                        <div className="text-sm text-muted-foreground">Limited Access</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Unlock className="h-4 w-4 mr-1" /> Grant Full Access
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

