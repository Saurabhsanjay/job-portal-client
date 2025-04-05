"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertCircle,
  Bell,
  CalendarIcon,
  Download,
  Edit,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  Trash,
  Upload,
  Users,
} from "lucide-react"
import { format } from "date-fns"

// Mock data for student profiles
const studentProfiles = [
  {
    id: 1,
    name: "Emma Johnson",
    studentId: "ST2023001",
    department: "Computer Science",
    year: "Final Year",
    gpa: 3.8,
    skills: ["React", "Node.js", "Python", "Machine Learning"],
    email: "emma.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeStatus: "Approved",
    applications: 8,
    interviews: 3,
    offers: 1,
  },
  {
    id: 2,
    name: "Michael Chen",
    studentId: "ST2023002",
    department: "Electrical Engineering",
    year: "Final Year",
    gpa: 3.9,
    skills: ["Circuit Design", "MATLAB", "C++", "Embedded Systems"],
    email: "michael.chen@university.edu",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeStatus: "Pending Review",
    applications: 5,
    interviews: 2,
    offers: 0,
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    studentId: "ST2023003",
    department: "Business Administration",
    year: "Final Year",
    gpa: 3.7,
    skills: ["Financial Analysis", "Project Management", "Marketing", "Data Analytics"],
    email: "sophia.rodriguez@university.edu",
    phone: "+1 (555) 345-6789",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeStatus: "Approved",
    applications: 10,
    interviews: 5,
    offers: 2,
  },
  {
    id: 4,
    name: "James Wilson",
    studentId: "ST2023004",
    department: "Mechanical Engineering",
    year: "Final Year",
    gpa: 3.6,
    skills: ["CAD", "Thermodynamics", "Fluid Mechanics", "Project Management"],
    email: "james.wilson@university.edu",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeStatus: "Needs Revision",
    applications: 6,
    interviews: 1,
    offers: 0,
  },
  {
    id: 5,
    name: "Olivia Kim",
    studentId: "ST2023005",
    department: "Data Science",
    year: "Final Year",
    gpa: 4.0,
    skills: ["Python", "R", "Machine Learning", "Big Data", "SQL"],
    email: "olivia.kim@university.edu",
    phone: "+1 (555) 567-8901",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeStatus: "Approved",
    applications: 12,
    interviews: 7,
    offers: 3,
  },
]

// Mock data for job applications
const jobApplications = [
  {
    id: 1,
    studentId: 1,
    studentName: "Emma Johnson",
    jobTitle: "Frontend Developer",
    company: "TechCorp Inc.",
    applicationDate: "2023-10-15",
    status: "Interview Scheduled",
    progress: 60,
    nextStep: "Technical Interview on Nov 5, 2023",
  },
  {
    id: 2,
    studentId: 1,
    jobTitle: "Full Stack Developer",
    company: "InnovateSoft",
    applicationDate: "2023-10-10",
    status: "Application Submitted",
    progress: 20,
    nextStep: "Waiting for screening call",
  },
  {
    id: 3,
    studentId: 2,
    studentName: "Michael Chen",
    jobTitle: "Electrical Engineer",
    company: "PowerTech Solutions",
    applicationDate: "2023-10-12",
    status: "Assessment Completed",
    progress: 40,
    nextStep: "Waiting for interview invitation",
  },
  {
    id: 4,
    studentId: 3,
    studentName: "Sophia Rodriguez",
    jobTitle: "Business Analyst",
    company: "Global Consulting Group",
    applicationDate: "2023-10-08",
    status: "Offer Received",
    progress: 100,
    nextStep: "Decision deadline: Nov 15, 2023",
  },
  {
    id: 5,
    studentId: 3,
    studentName: "Sophia Rodriguez",
    jobTitle: "Marketing Specialist",
    company: "BrandForward",
    applicationDate: "2023-10-05",
    status: "Final Interview",
    progress: 80,
    nextStep: "Waiting for decision",
  },
]

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: "opportunity",
    title: "New Job Posting",
    description: "TechCorp Inc. has posted a new Software Engineer position",
    date: "2023-11-01",
    recipients: "Computer Science, Final Year",
    status: "Scheduled",
    scheduledDate: "2023-11-02",
  },
  {
    id: 2,
    type: "deadline",
    title: "Application Deadline",
    description: "Application deadline for InnovateSoft internship is approaching",
    date: "2023-11-01",
    recipients: "All Departments, Final Year",
    status: "Sent",
    sentDate: "2023-11-01",
  },
  {
    id: 3,
    type: "event",
    title: "Career Fair Reminder",
    description: "Annual Career Fair is scheduled for next week",
    date: "2023-10-30",
    recipients: "All Students",
    status: "Sent",
    sentDate: "2023-10-30",
  },
  {
    id: 4,
    type: "opportunity",
    title: "New Graduate Program",
    description: "Global Consulting Group has opened applications for their Graduate Program",
    date: "2023-10-28",
    recipients: "Business Administration, Final Year",
    status: "Sent",
    sentDate: "2023-10-28",
  },
  {
    id: 5,
    type: "deadline",
    title: "Resume Submission Deadline",
    description: "Deadline for resume submissions for the upcoming placement season",
    date: "2023-10-25",
    recipients: "All Departments, Final Year",
    status: "Sent",
    sentDate: "2023-10-25",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color = ""

  switch (status) {
    case "Approved":
      color = "bg-green-100 text-green-800"
      break
    case "Pending Review":
      color = "bg-yellow-100 text-yellow-800"
      break
    case "Needs Revision":
      color = "bg-red-100 text-red-800"
      break
    case "Interview Scheduled":
    case "Final Interview":
      color = "bg-blue-100 text-blue-800"
      break
    case "Application Submitted":
    case "Assessment Completed":
      color = "bg-purple-100 text-purple-800"
      break
    case "Offer Received":
      color = "bg-green-100 text-green-800"
      break
    case "Scheduled":
      color = "bg-blue-100 text-blue-800"
      break
    case "Sent":
      color = "bg-green-100 text-green-800"
      break
    default:
      color = "bg-gray-100 text-gray-800"
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>
}

// Notification type badge component
const NotificationTypeBadge = ({ type }: { type: string }) => {
  let color = ""
  let icon = null

  switch (type) {
    case "opportunity":
      color = "bg-green-100 text-green-800"
      icon = <FileText className="h-3 w-3 mr-1" />
      break
    case "deadline":
      color = "bg-red-100 text-red-800"
      icon = <AlertCircle className="h-3 w-3 mr-1" />
      break
    case "event":
      color = "bg-blue-100 text-blue-800"
      icon = <CalendarIcon className="h-3 w-3 mr-1" />
      break
    default:
      color = "bg-gray-100 text-gray-800"
      icon = <Bell className="h-3 w-3 mr-1" />
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} flex items-center`}>
      {icon}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Filter students based on search term and filters
  const filteredStudents = studentProfiles.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment
    const matchesYear = selectedYear === "all" || student.year === selectedYear

    return matchesSearch && matchesDepartment && matchesYear
  })

  // Get applications for a specific student
  const getStudentApplications = (studentId: number) => {
    return jobApplications.filter((app) => app.studentId === studentId)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management Tools</h1>
          <p className="text-gray-500 mt-1">Manage student profiles, track applications, and send notifications</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="database" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="database">
            <Users className="h-4 w-4 mr-2" />
            Centralized Student Database
          </TabsTrigger>
          <TabsTrigger value="applications">
            <FileText className="h-4 w-4 mr-2" />
            Application Tracker
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Automated Notifications
          </TabsTrigger>
        </TabsList>

        {/* Centralized Student Database Tab */}
        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Student Database</CardTitle>
                  <CardDescription>Manage student profiles, resumes, and performance history</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search students..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                        <SelectItem value="Business Administration">Business Administration</SelectItem>
                        <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="First Year">First Year</SelectItem>
                        <SelectItem value="Second Year">Second Year</SelectItem>
                        <SelectItem value="Third Year">Third Year</SelectItem>
                        <SelectItem value="Final Year">Final Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead className="w-[250px]">Student</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>GPA</TableHead>
                        <TableHead>Resume Status</TableHead>
                        <TableHead>Applications</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.studentId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.year}</TableCell>
                          <TableCell>{student.gpa}</TableCell>
                          <TableCell>
                            <StatusBadge status={student.resumeStatus} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{student.applications}</span>
                              <span className="text-xs text-gray-500">
                                ({student.interviews} interviews, {student.offers} offers)
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setSelectedStudent(student)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Resume
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing {filteredStudents.length} of {studentProfiles.length} students
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Profile Dialog */}
          {selectedStudent && (
            <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Student Profile</DialogTitle>
                  <DialogDescription>Comprehensive view of student information and performance</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                        {/* <AvatarFallback className="text-2xl">
                          {selectedStudent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback> */}
                      </Avatar>
                      <div className="text-center">
                        <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                        <p className="text-gray-500">{selectedStudent.studentId}</p>
                      </div>
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Department:</span>
                          <span className="font-medium">{selectedStudent.department}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Year:</span>
                          <span className="font-medium">{selectedStudent.year}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">GPA:</span>
                          <span className="font-medium">{selectedStudent.gpa}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Email:</span>
                          <span className="font-medium">{selectedStudent.email}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Phone:</span>
                          <span className="font-medium">{selectedStudent.phone}</span>
                        </div>
                      </div>
                      <div className="w-full pt-4">
                        <Button className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          View Resume
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 space-y-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3">Application History</h3>
                      <div className="space-y-3">
                        {getStudentApplications(selectedStudent.id).length > 0 ? (
                          getStudentApplications(selectedStudent.id).map((app) => (
                            <div key={app.id} className="border rounded-lg p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{app.jobTitle}</h4>
                                  <p className="text-sm text-gray-500">{app.company}</p>
                                </div>
                                <StatusBadge status={app.status} />
                              </div>
                              <div className="mt-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Application Progress</span>
                                  <span>{app.progress}%</span>
                                </div>
                                <Progress value={app.progress} className="h-2" />
                              </div>
                              <div className="mt-2 text-sm">
                                <span className="text-gray-500">Applied on:</span>
                                <span className="ml-1">{new Date(app.applicationDate).toLocaleDateString()}</span>
                              </div>
                              <div className="mt-1 text-sm">
                                <span className="text-gray-500">Next Step:</span>
                                <span className="ml-1">{app.nextStep}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-500">No applications found for this student</div>
                        )}
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-3xl font-bold text-green-600">{selectedStudent.applications}</div>
                          <div className="text-sm text-gray-500">Total Applications</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-3xl font-bold text-blue-600">{selectedStudent.interviews}</div>
                          <div className="text-sm text-gray-500">Interviews</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-3xl font-bold text-purple-600">{selectedStudent.offers}</div>
                          <div className="text-sm text-gray-500">Offers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* Application Tracker Tab */}
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Application Tracker</CardTitle>
                  <CardDescription>Track which students have applied for which jobs and their progress</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Application
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search applications..." className="pl-8" />
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Student</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Application Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {jobApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div className="font-medium">{application.studentName}</div>
                          </TableCell>
                          <TableCell>{application.jobTitle}</TableCell>
                          <TableCell>{application.company}</TableCell>
                          <TableCell>{new Date(application.applicationDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <StatusBadge status={application.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={application.progress} className="h-2 w-24" />
                              <span className="text-sm">{application.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Reminder
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Showing {jobApplications.length} applications</div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Pipeline</CardTitle>
                <CardDescription>Overview of applications at each stage of the hiring process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Application Submitted</h4>
                      <Badge variant="outline">1</Badge>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Assessment Completed</h4>
                      <Badge variant="outline">1</Badge>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Interview Scheduled</h4>
                      <Badge variant="outline">1</Badge>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Final Interview</h4>
                      <Badge variant="outline">1</Badge>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Offer Received</h4>
                      <Badge variant="outline">1</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates and deadlines for applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Technical Interview</h4>
                        <p className="text-sm text-gray-500">Emma Johnson - TechCorp Inc.</p>
                      </div>
                      <Badge variant="outline">Nov 5, 2023</Badge>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Offer Decision Deadline</h4>
                        <p className="text-sm text-gray-500">Sophia Rodriguez - Global Consulting Group</p>
                      </div>
                      <Badge variant="outline">Nov 15, 2023</Badge>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Application Deadline</h4>
                        <p className="text-sm text-gray-500">PowerTech Solutions - Graduate Program</p>
                      </div>
                      <Badge variant="outline">Nov 20, 2023</Badge>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Assessment Submission</h4>
                        <p className="text-sm text-gray-500">James Wilson - MechDesign Inc.</p>
                      </div>
                      <Badge variant="outline">Nov 25, 2023</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Automated Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Automated Notifications</CardTitle>
                  <CardDescription>
                    Notify students about new opportunities, deadlines, and upcoming events
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Notification
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Type</TableHead>
                        <TableHead className="w-[250px]">Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notifications.map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            <NotificationTypeBadge type={notification.type} />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{notification.title}</div>
                          </TableCell>
                          <TableCell>{notification.description}</TableCell>
                          <TableCell>{notification.recipients}</TableCell>
                          <TableCell>
                            <StatusBadge status={notification.status} />
                          </TableCell>
                          {/* <TableCell>
                            {notification.status === "Sent"
                              ? `Sent: ${new Date(notification.sentDate).toLocaleDateString()}`
                              : `Scheduled: ${new Date(notification.scheduledDate).toLocaleDateString()}`}
                          </TableCell> */}
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Now
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Notification</CardTitle>
                <CardDescription>Set up automated notifications for students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notification Type</label>
                    <Select defaultValue="opportunity">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opportunity">New Opportunity</SelectItem>
                        <SelectItem value="deadline">Deadline Reminder</SelectItem>
                        <SelectItem value="event">Event Notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input placeholder="Enter notification title" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Enter notification description" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Recipients</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Students</SelectItem>
                        <SelectItem value="final">Final Year Students</SelectItem>
                        <SelectItem value="cs">Computer Science Department</SelectItem>
                        <SelectItem value="business">Business Administration Department</SelectItem>
                        <SelectItem value="engineering">Engineering Departments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Schedule Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Schedule Notification
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Templates</CardTitle>
                <CardDescription>Quickly create notifications using pre-defined templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">New Job Opportunity</h4>
                        <p className="text-sm text-gray-500">Notify students about a new job posting</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Application Deadline Reminder</h4>
                        <p className="text-sm text-gray-500">Remind students about upcoming application deadlines</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Career Fair Announcement</h4>
                        <p className="text-sm text-gray-500">Inform students about upcoming career fairs</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Resume Submission Reminder</h4>
                        <p className="text-sm text-gray-500">Remind students to submit or update their resumes</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Interview Preparation Workshop</h4>
                        <p className="text-sm text-gray-500">Notify students about interview preparation resources</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
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

