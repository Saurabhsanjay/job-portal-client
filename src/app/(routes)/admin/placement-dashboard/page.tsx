"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
  Briefcase,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  MessageSquare,
  Calendar,
  UserCheck,
  Eye,
  Edit,
  Trash,
  Plus,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Handshake,
  Send,
  MessageCircle,
  FileCheck,
  UserPlus,
  BarChart,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart as RechartBarChart,
  Bar,
  LineChart as RechartLineChart,
  Line,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

// Sample data for applications
const applications = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    company: "TechCorp",
    applicant: "Alex Johnson",
    institution: "Tech University",
    status: "Interview Scheduled",
    appliedDate: "2024-03-10T09:30:00",
    lastUpdated: "2024-03-15T14:45:00",
    priority: "Medium",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    jobTitle: "Marketing Specialist",
    company: "Global Marketing",
    applicant: "Sarah Williams",
    institution: "Business Academy",
    status: "Application Submitted",
    appliedDate: "2024-03-12T11:20:00",
    lastUpdated: "2024-03-12T11:20:00",
    priority: "Low",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    jobTitle: "Data Scientist",
    company: "DataSystems Inc",
    applicant: "Michael Brown",
    institution: "Tech University",
    status: "Offer Extended",
    appliedDate: "2024-03-05T10:15:00",
    lastUpdated: "2024-03-18T16:30:00",
    priority: "High",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    jobTitle: "UX Designer",
    company: "Creative Studios",
    applicant: "Emily Davis",
    institution: "Design College",
    status: "Interview Scheduled",
    appliedDate: "2024-03-08T14:45:00",
    lastUpdated: "2024-03-14T09:20:00",
    priority: "Medium",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    jobTitle: "Financial Analyst",
    company: "Global Finance",
    applicant: "James Wilson",
    institution: "Business Academy",
    status: "Offer Accepted",
    appliedDate: "2024-03-01T09:00:00",
    lastUpdated: "2024-03-20T11:30:00",
    priority: "High",
    avatar: "/placeholder.svg",
  },
  {
    id: 6,
    jobTitle: "Nurse Practitioner",
    company: "Central Hospital",
    applicant: "Olivia Martinez",
    institution: "Medical Institute",
    status: "Application Submitted",
    appliedDate: "2024-03-14T15:30:00",
    lastUpdated: "2024-03-14T15:30:00",
    priority: "Medium",
    avatar: "/placeholder.svg",
  },
  {
    id: 7,
    jobTitle: "Civil Engineer",
    company: "BuildCorp",
    applicant: "Robert Johnson",
    institution: "Engineering School",
    status: "Application Rejected",
    appliedDate: "2024-03-07T10:45:00",
    lastUpdated: "2024-03-16T14:15:00",
    priority: "Low",
    avatar: "/placeholder.svg",
  },
]

// Sample data for application status distribution
const applicationStatusData = [
  { name: "Application Submitted", value: 245 },
  { name: "Interview Scheduled", value: 180 },
  { name: "Offer Extended", value: 95 },
  { name: "Offer Accepted", value: 75 },
  { name: "Application Rejected", value: 65 },
]

// Sample data for collaboration messages
const collaborationMessages = [
  {
    id: 1,
    sender: "Dr. Alan Parker",
    senderRole: "Institution Representative",
    institution: "Tech University",
    recipient: "David Chen",
    recipientRole: "Recruiter",
    company: "TechCorp",
    subject: "Software Engineer Candidates",
    message:
      "I wanted to follow up on the Software Engineer candidates we discussed last week. We have 5 additional students who match your requirements.",
    timestamp: "2024-03-18T09:30:00",
    status: "Unread",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    sender: "Jennifer Smith",
    senderRole: "Recruiter",
    company: "Global Finance",
    recipient: "Prof. Lisa Johnson",
    recipientRole: "Institution Representative",
    institution: "Business Academy",
    subject: "Financial Analyst Position",
    message:
      "Thank you for recommending James Wilson for the Financial Analyst position. We've extended an offer and he has accepted.",
    timestamp: "2024-03-17T14:45:00",
    status: "Read",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    sender: "Maria Rodriguez",
    senderRole: "Recruiter",
    company: "Central Hospital",
    recipient: "Dr. Sarah Thompson",
    recipientRole: "Institution Representative",
    institution: "Medical College",
    subject: "Upcoming Campus Visit",
    message:
      "I'm writing to confirm our campus visit next week to meet with your nursing students. We're looking forward to discussing opportunities at Central Hospital.",
    timestamp: "2024-03-16T11:20:00",
    status: "Read",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    sender: "Dr. Mark Williams",
    senderRole: "Institution Representative",
    institution: "Design Institute",
    recipient: "Robert Johnson",
    recipientRole: "Recruiter",
    company: "Creative Studios",
    subject: "Portfolio Review Session",
    message:
      "Our students are excited about the portfolio review session next month. Could you please share more details about what you'll be looking for?",
    timestamp: "2024-03-15T16:30:00",
    status: "Unread",
    avatar: "/placeholder.svg",
  },
]

// Sample data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "TechCorp Campus Recruitment",
    institution: "Tech University",
    company: "TechCorp",
    date: "2024-03-25T10:00:00",
    type: "Campus Visit",
    status: "Confirmed",
    participants: 45,
  },
  {
    id: 2,
    title: "Finance Industry Panel",
    institution: "Business Academy",
    company: "Multiple Companies",
    date: "2024-03-28T14:30:00",
    type: "Panel Discussion",
    status: "Confirmed",
    participants: 120,
  },
  {
    id: 3,
    title: "Healthcare Career Fair",
    institution: "Medical Institute",
    company: "Multiple Companies",
    date: "2024-04-05T09:00:00",
    type: "Career Fair",
    status: "Planning",
    participants: 200,
  },
]

// Sample data for industry partnerships
const industryPartnerships = [
  {
    id: 1,
    company: "TechCorp",
    industry: "Technology",
    partnershipLevel: "Platinum",
    startDate: "2023-01-15",
    institutions: ["Tech University", "Engineering School"],
    hiringTarget: 50,
    currentHires: 32,
    upcomingEvents: 3,
    logo: "/placeholder.svg",
  },
  {
    id: 2,
    company: "Global Finance",
    industry: "Finance",
    partnershipLevel: "Gold",
    startDate: "2023-03-10",
    institutions: ["Business Academy"],
    hiringTarget: 35,
    currentHires: 28,
    upcomingEvents: 2,
    logo: "/placeholder.svg",
  },
  {
    id: 3,
    company: "Central Hospital",
    industry: "Healthcare",
    partnershipLevel: "Silver",
    startDate: "2023-05-22",
    institutions: ["Medical Institute", "Medical College"],
    hiringTarget: 40,
    currentHires: 22,
    upcomingEvents: 1,
    logo: "/placeholder.svg",
  },
  {
    id: 4,
    company: "Creative Studios",
    industry: "Design & Media",
    partnershipLevel: "Gold",
    startDate: "2023-02-18",
    institutions: ["Design College", "Design Institute"],
    hiringTarget: 30,
    currentHires: 18,
    upcomingEvents: 2,
    logo: "/placeholder.svg",
  },
  {
    id: 5,
    company: "BuildCorp",
    industry: "Construction",
    partnershipLevel: "Silver",
    startDate: "2023-06-05",
    institutions: ["Engineering School"],
    hiringTarget: 25,
    currentHires: 12,
    upcomingEvents: 1,
    logo: "/placeholder.svg",
  },
]

// Sample data for partnership opportunities
const partnershipOpportunities = [
  {
    id: 1,
    company: "TechCorp",
    opportunityType: "Internship Program",
    positions: 15,
    duration: "3 months",
    targetInstitutions: ["Tech University", "Engineering School"],
    status: "Active",
    applications: 45,
  },
  {
    id: 2,
    company: "Global Finance",
    opportunityType: "Graduate Trainee Program",
    positions: 10,
    duration: "12 months",
    targetInstitutions: ["Business Academy"],
    status: "Active",
    applications: 32,
  },
  {
    id: 3,
    company: "Central Hospital",
    opportunityType: "Clinical Placement",
    positions: 20,
    duration: "6 months",
    targetInstitutions: ["Medical Institute", "Medical College"],
    status: "Active",
    applications: 38,
  },
  {
    id: 4,
    company: "Creative Studios",
    opportunityType: "Design Fellowship",
    positions: 8,
    duration: "4 months",
    targetInstitutions: ["Design College", "Design Institute"],
    status: "Upcoming",
    applications: 0,
  },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function PlacementDashboard() {
  const [searchApplications, setSearchApplications] = useState("")
  const [searchPartnerships, setSearchPartnerships] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  // Filter applications based on search and status
  const filteredApplications = applications.filter(
    (application) =>
      (application.jobTitle.toLowerCase().includes(searchApplications.toLowerCase()) ||
        application.company.toLowerCase().includes(searchApplications.toLowerCase()) ||
        application.applicant.toLowerCase().includes(searchApplications.toLowerCase()) ||
        application.institution.toLowerCase().includes(searchApplications.toLowerCase())) &&
      (selectedStatus === "all" || application.status === selectedStatus),
  )

  // Filter partnerships based on search and industry
  const filteredPartnerships = industryPartnerships.filter(
    (partnership) =>
      (partnership.company.toLowerCase().includes(searchPartnerships.toLowerCase()) ||
        partnership.industry.toLowerCase().includes(searchPartnerships.toLowerCase())) &&
      (selectedIndustry === "all" || partnership.industry === selectedIndustry),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
        case "Offer Accepted":
            return "bg-green-100 text-green-800"
        case "Offer Extended":
            return "bg-blue-100 text-blue-800"
        case "Interview Scheduled":
            return "bg-purple-100 text-purple-800"
        case "Application Rejected":
            return "bg-red-100 text-red-800"
            case "Hign":
            return "bg-green-100 text-green-800"
        case "Medium":
            return "bg-blue-100 text-blue-800"
        case "Confirmed":
            return "bg-purple-100 text-purple-800"
        case "Planning":
            return "bg-red-100 text-red-800"
            case "Platinum":
            return "bg-purple-100 text-purple-800"
        case "Gold":
            return "bg-yellow-100 text-yellow-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold tracking-tight">Placement Dashboard</h1>
        <p className="text-muted-foreground">
          Track applications, facilitate collaboration, and manage industry partnerships.
        </p>
      </div> */}

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Application Tracking
          </TabsTrigger>
          <TabsTrigger value="collaboration" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Collaboration Tools
          </TabsTrigger>
          <TabsTrigger value="partnerships" className="flex items-center gap-2">
            <Handshake className="h-4 w-4" />
            Industry Partnerships
          </TabsTrigger>
        </TabsList>

        {/* Application Tracking Tab */}
        <TabsContent value="applications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Total Applications",
                value: "1,245",
                change: "+125 this month",
                changeType: "positive",
                icon: FileText,
                color: "blue",
              },
              {
                title: "Interview Rate",
                value: "68.5%",
                change: "+2.3%",
                changeType: "positive",
                icon: UserCheck,
                color: "green",
              },
              {
                title: "Offer Acceptance Rate",
                value: "78.2%",
                change: "+1.5%",
                changeType: "positive",
                icon: CheckCircle,
                color: "purple",
              },
              {
                title: "Avg. Time to Hire",
                value: "18 days",
                change: "-2 days",
                changeType: "positive",
                icon: Clock,
                color: "orange",
              },
            ].map((metric, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <div className={`h-8 w-8 rounded-full bg-${metric.color}-100 flex items-center justify-center`}>
                    <metric.icon className={`h-4 w-4 text-${metric.color}-500`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p
                    className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"} flex items-center gap-1`}
                  >
                    {metric.changeType === "positive" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {metric.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Status Distribution</CardTitle>
                <CardDescription>Current distribution of applications by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={applicationStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {applicationStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>Monthly application and placement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLineChart
                      data={[
                        { month: "Jan", applications: 180, placements: 45 },
                        { month: "Feb", applications: 200, placements: 52 },
                        { month: "Mar", applications: 245, placements: 65 },
                        { month: "Apr", applications: 210, placements: 58 },
                        { month: "May", applications: 230, placements: 62 },
                        { month: "Jun", applications: 250, placements: 70 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        name="Applications"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="placements" name="Placements" stroke="#82ca9d" />
                    </RechartLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Application Tracking</CardTitle>
                  <CardDescription>Monitor and manage job applications across the platform.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search applications..."
                      className="pl-8 w-[250px]"
                      value={searchApplications}
                      onChange={(e) => setSearchApplications(e.target.value)}
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Application Submitted">Application Submitted</SelectItem>
                      <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                      <SelectItem value="Offer Extended">Offer Extended</SelectItem>
                      <SelectItem value="Offer Accepted">Offer Accepted</SelectItem>
                      <SelectItem value="Application Rejected">Application Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Job Position</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={application.avatar} alt={application.applicant} />
                              <AvatarFallback>{application.applicant.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{application.applicant}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{application.jobTitle}</div>
                          <div className="text-sm text-muted-foreground">{application.company}</div>
                        </TableCell>
                        <TableCell>{application.institution}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(application.status)}>
                                 {application.status}
                              </Badge>
                        </TableCell>
                        <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(application.lastUpdated).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(application.priority)}>
                                 {application.priority}
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
                                <Edit className="h-4 w-4" /> Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4" /> Send Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Remove Application
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
                  Showing <strong>{filteredApplications.length}</strong> of <strong>{applications.length}</strong>{" "}
                  applications
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
                <CardTitle>Top Hiring Companies</CardTitle>
                <CardDescription>Companies with the most active applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { company: "TechCorp", applications: 85, openPositions: 12, hireRate: "78%" },
                    { company: "Global Finance", applications: 72, openPositions: 8, hireRate: "65%" },
                    { company: "Central Hospital", applications: 68, openPositions: 15, hireRate: "72%" },
                    { company: "Creative Studios", applications: 54, openPositions: 6, hireRate: "70%" },
                    { company: "BuildCorp", applications: 48, openPositions: 10, hireRate: "62%" },
                  ].map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{company.company}</div>
                        <div className="text-sm text-muted-foreground">{company.openPositions} open positions</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{company.applications} applications</div>
                        <div className="text-sm text-green-600">{company.hireRate} hire rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Alerts</CardTitle>
                <CardDescription>Recent alerts and notifications for applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Interview Reminder",
                      description: "5 interviews scheduled for tomorrow",
                      timestamp: "2024-03-20T09:30:00",
                      type: "reminder",
                      icon: Calendar,
                    },
                    {
                      title: "Application Deadline",
                      description: "12 applications closing today",
                      timestamp: "2024-03-20T10:15:00",
                      type: "deadline",
                      icon: Clock,
                    },
                    {
                      title: "Pending Responses",
                      description: "8 offers pending response for more than 5 days",
                      timestamp: "2024-03-19T14:45:00",
                      type: "warning",
                      icon: AlertCircle,
                    },
                    {
                      title: "New Applications",
                      description: "25 new applications received today",
                      timestamp: "2024-03-20T08:30:00",
                      type: "info",
                      icon: FileText,
                    },
                  ].map((alert, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          alert.type === "reminder"
                            ? "bg-blue-100"
                            : alert.type === "deadline"
                              ? "bg-orange-100"
                              : alert.type === "warning"
                                ? "bg-red-100"
                                : "bg-green-100"
                        }`}
                      >
                        <alert.icon
                          className={`h-5 w-5 ${
                            alert.type === "reminder"
                              ? "text-blue-500"
                              : alert.type === "deadline"
                                ? "text-orange-500"
                                : alert.type === "warning"
                                  ? "text-red-500"
                                  : "text-green-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm text-muted-foreground">{alert.description}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Collaboration Tools Tab */}
        <TabsContent value="collaboration" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Active Conversations",
                value: "48",
                subtext: "12 new this week",
                icon: MessageSquare,
                color: "blue",
              },
              {
                title: "Upcoming Events",
                value: "15",
                subtext: "3 this week",
                icon: Calendar,
                color: "green",
              },
              {
                title: "Institution-Recruiter Connections",
                value: "86",
                subtext: "8 new this month",
                icon: Handshake,
                color: "purple",
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`h-8 w-8 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                    <stat.icon className={`h-4 w-4 text-${stat.color}-500`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Communication between institutions and recruiters</CardDescription>
                  </div>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> New Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collaborationMessages.map((message) => (
                    <div key={message.id} className="flex flex-col p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={message.avatar} alt={message.sender} />
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{message.sender}</div>
                            <div className="text-xs text-muted-foreground">
                              {message.senderRole} • {message.institution || message.company}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {message.status === "Unread" && <Badge variant="secondary">Unread</Badge>}
                          <div className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="font-medium">To: {message.recipient}</div>
                        <div className="text-xs text-muted-foreground">
                          {message.recipientRole} • {message.institution || message.company}
                        </div>
                      </div>
                      <div className="font-medium mb-1">Subject: {message.subject}</div>
                      <div className="text-sm">{message.message}</div>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm" className="flex items-center gap-1">
                          <Send className="h-3 w-3" /> Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline">View All Messages</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Collaboration Events</CardTitle>
                  <CardDescription>Scheduled events between institutions and recruiters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.institution} • {event.participants} participants
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                         
                          <Badge variant="secondary" className={getStatusColor(event.status)}>
                                 {event.status}
                              </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button variant="outline">View Calendar</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Message</CardTitle>
                  <CardDescription>Send a message to an institution or recruiter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech-university">Tech University</SelectItem>
                          <SelectItem value="business-academy">Business Academy</SelectItem>
                          <SelectItem value="medical-institute">Medical Institute</SelectItem>
                          <SelectItem value="techcorp">TechCorp</SelectItem>
                          <SelectItem value="global-finance">Global Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enter subject" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Enter your message" className="min-h-[100px]" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="urgent" />
                      <Label htmlFor="urgent">Mark as urgent</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Send className="h-4 w-4" /> Send Message
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Collaboration Analytics</CardTitle>
              <CardDescription>Insights into communication and collaboration activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="font-medium">Message Response Time</div>
                  <div className="text-3xl font-bold">4.2 hrs</div>
                  <Progress value={70} className="h-2" />
                  <div className="text-xs text-muted-foreground">Target: 6 hours</div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Event Participation Rate</div>
                  <div className="text-3xl font-bold">82%</div>
                  <Progress value={82} className="h-2" />
                  <div className="text-xs text-muted-foreground">Target: 75%</div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Institution-Recruiter Engagement</div>
                  <div className="text-3xl font-bold">68%</div>
                  <Progress value={68} className="h-2" />
                  <div className="text-xs text-muted-foreground">Target: 70%</div>
                </div>
              </div>

              <div className="mt-8 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={[
                      { name: "Tech University", messages: 145, events: 8, connections: 12 },
                      { name: "Business Academy", messages: 120, events: 6, connections: 10 },
                      { name: "Medical Institute", messages: 95, events: 5, connections: 8 },
                      { name: "Design College", messages: 85, events: 4, connections: 7 },
                      { name: "Engineering School", messages: 75, events: 3, connections: 6 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="messages" name="Messages" fill="#8884d8" />
                    <Bar dataKey="events" name="Events" fill="#82ca9d" />
                    <Bar dataKey="connections" name="Connections" fill="#ffc658" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industry Partnerships Tab */}
        <TabsContent value="partnerships" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Active Partnerships",
                value: "28",
                subtext: "5 platinum, 12 gold, 11 silver",
                icon: Handshake,
                color: "blue",
              },
              {
                title: "Total Hiring Target",
                value: "850",
                subtext: "425 positions filled (50%)",
                icon: UserPlus,
                color: "green",
              },
              {
                title: "Partnership Opportunities",
                value: "42",
                subtext: "15 internships, 27 full-time",
                icon: Briefcase,
                color: "purple",
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`h-8 w-8 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                    <stat.icon className={`h-4 w-4 text-${stat.color}-500`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Industry Partnerships</CardTitle>
                  <CardDescription>
                    Track partnerships with companies and the opportunities they provide.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search partnerships..."
                      className="pl-8 w-[250px]"
                      value={searchPartnerships}
                      onChange={(e) => setSearchPartnerships(e.target.value)}
                    />
                  </div>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Design & Media">Design & Media</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Partnership
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Partnership Level</TableHead>
                      <TableHead>Institutions</TableHead>
                      <TableHead>Hiring Progress</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPartnerships.map((partnership) => (
                      <TableRow key={partnership.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={partnership.logo} alt={partnership.company} />
                              <AvatarFallback>{partnership.company.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{partnership.company}</div>
                          </div>
                        </TableCell>
                        <TableCell>{partnership.industry}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(partnership.partnershipLevel)}>
                                 {partnership.partnershipLevel}
                              </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {partnership.institutions.slice(0, 2).map((institution, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {institution}
                              </Badge>
                            ))}
                            {partnership.institutions.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{partnership.institutions.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                {partnership.currentHires}/{partnership.hiringTarget}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {Math.round((partnership.currentHires / partnership.hiringTarget) * 100)}%
                              </span>
                            </div>
                            <Progress
                              value={(partnership.currentHires / partnership.hiringTarget) * 100}
                              className="h-1"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{new Date(partnership.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge>{partnership.upcomingEvents}</Badge>
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
                                <Edit className="h-4 w-4" /> Edit Partnership
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Schedule Event
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <BarChart className="h-4 w-4" /> View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> End Partnership
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
                  Showing <strong>{filteredPartnerships.length}</strong> of{" "}
                  <strong>{industryPartnerships.length}</strong> partnerships
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
                <CardTitle>Partnership Opportunities</CardTitle>
                <CardDescription>Current opportunities provided by industry partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partnershipOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{opportunity.opportunityType}</div>
                        <Badge variant={opportunity.status === "Active" ? "success" : "secondary"}>
                          {opportunity.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {opportunity.company} • {opportunity.positions} positions • {opportunity.duration}
                      </div>
                      <div className="text-sm mb-3">
                        Target Institutions:
                        <div className="flex flex-wrap gap-1 mt-1">
                          {opportunity.targetInstitutions.map((institution, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {institution}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {opportunity.status === "Active" && (
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="font-medium">{opportunity.applications}</span> applications received
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      )}
                      {opportunity.status === "Upcoming" && (
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline">
                            Publish
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partnership Analytics</CardTitle>
                <CardDescription>Performance metrics for industry partnerships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={[
                          { name: "Technology", value: 35 },
                          { name: "Finance", value: 25 },
                          { name: "Healthcare", value: 20 },
                          { name: "Design & Media", value: 15 },
                          { name: "Construction", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {industryPartnerships.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm font-medium mb-1">Average Hiring Rate</div>
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-xs text-green-600">+5% from last year</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-sm font-medium mb-1">Partnership Renewal Rate</div>
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-xs text-green-600">+3% from last year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Partnership Management</CardTitle>
              <CardDescription>Tools to manage and enhance industry partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Partnership Agreement Templates",
                    description: "Standardized templates for different partnership levels",
                    icon: FileCheck,
                    action: "View Templates",
                  },
                  {
                    title: "Partnership Onboarding",
                    description: "Step-by-step guide for onboarding new industry partners",
                    icon: UserPlus,
                    action: "Start Onboarding",
                  },
                  {
                    title: "Partnership Reports",
                    description: "Generate reports on partnership performance and impact",
                    icon: BarChart,
                    action: "Generate Report",
                  },
                  {
                    title: "Event Planning",
                    description: "Plan and schedule events with industry partners",
                    icon: Calendar,
                    action: "Plan Event",
                  },
                  {
                    title: "Communication Tools",
                    description: "Tools for effective communication with partners",
                    icon: MessageCircle,
                    action: "Open Tools",
                  },
                  {
                    title: "Partnership Renewal",
                    description: "Process for renewing and upgrading partnerships",
                    icon: Handshake,
                    action: "Start Renewal",
                  },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 bg-muted rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <tool.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="font-medium">{tool.title}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">{tool.description}</div>
                    <Button variant="outline" size="sm" className="mt-auto flex items-center gap-2">
                      {tool.action} <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

