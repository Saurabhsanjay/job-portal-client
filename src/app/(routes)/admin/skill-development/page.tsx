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
  MoreHorizontal,
  BookOpen,
  Users,
  BarChart,
  Calendar,
  Award,
  Video,
  FileText,
  Star,
  Download,
  Eye,
  Edit,
  Trash,
  Plus,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Play,
  Pause,
  MessageSquare,
  Layers,
  Upload,
  Tag,
  Briefcase,
  X,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { FileCheck } from "lucide-react"

// Sample data for skill development programs
const programs = [
  {
    id: 1,
    title: "Advanced Web Development",
    type: "Online Course",
    category: "Technology",
    status: "Active",
    enrollments: 245,
    completionRate: 68,
    averageRating: 4.7,
    duration: "8 weeks",
    startDate: "2024-02-15",
    endDate: "2024-04-10",
    instructor: "David Chen",
    description:
      "Learn advanced web development techniques including React, Node.js, and modern deployment strategies.",
    skills: ["React", "Node.js", "AWS", "CI/CD"],
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Business Communication Skills",
    type: "Webinar Series",
    category: "Business",
    status: "Active",
    enrollments: 320,
    completionRate: 75,
    averageRating: 4.5,
    duration: "4 weeks",
    startDate: "2024-03-01",
    endDate: "2024-03-28",
    instructor: "Jennifer Smith",
    description:
      "Enhance your business communication skills with this comprehensive webinar series covering presentations, emails, and negotiations.",
    skills: ["Public Speaking", "Business Writing", "Negotiation", "Presentation"],
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    type: "Certification",
    category: "Technology",
    status: "Active",
    enrollments: 180,
    completionRate: 62,
    averageRating: 4.8,
    duration: "12 weeks",
    startDate: "2024-01-10",
    endDate: "2024-04-03",
    instructor: "Michael Brown",
    description:
      "A comprehensive introduction to data science including Python, statistics, data visualization, and machine learning basics.",
    skills: ["Python", "Statistics", "Data Visualization", "Machine Learning"],
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Healthcare Management",
    type: "Online Course",
    category: "Healthcare",
    status: "Upcoming",
    enrollments: 0,
    completionRate: 0,
    averageRating: 0,
    duration: "10 weeks",
    startDate: "2024-04-15",
    endDate: "2024-06-24",
    instructor: "Dr. Sarah Thompson",
    description:
      "Learn essential healthcare management skills including policy, finance, and operations management for healthcare facilities.",
    skills: ["Healthcare Policy", "Finance", "Operations Management", "Leadership"],
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "Digital Marketing Masterclass",
    type: "Workshop",
    category: "Marketing",
    status: "Completed",
    enrollments: 275,
    completionRate: 85,
    averageRating: 4.6,
    duration: "6 weeks",
    startDate: "2024-01-05",
    endDate: "2024-02-16",
    instructor: "Robert Johnson",
    description:
      "A comprehensive digital marketing workshop covering SEO, social media, content marketing, and analytics.",
    skills: ["SEO", "Social Media Marketing", "Content Strategy", "Analytics"],
    image: "/placeholder.svg",
  },
  {
    id: 6,
    title: "Financial Planning Essentials",
    type: "Webinar Series",
    category: "Finance",
    status: "Active",
    enrollments: 150,
    completionRate: 70,
    averageRating: 4.4,
    duration: "5 weeks",
    startDate: "2024-02-20",
    endDate: "2024-03-27",
    instructor: "Maria Rodriguez",
    description:
      "Learn essential financial planning skills including budgeting, investing, retirement planning, and tax strategies.",
    skills: ["Budgeting", "Investing", "Retirement Planning", "Tax Strategy"],
    image: "/placeholder.svg",
  },
  {
    id: 7,
    title: "UX/UI Design Principles",
    type: "Online Course",
    category: "Design",
    status: "Active",
    enrollments: 210,
    completionRate: 72,
    averageRating: 4.9,
    duration: "8 weeks",
    startDate: "2024-02-10",
    endDate: "2024-04-05",
    instructor: "Emily Davis",
    description:
      "Master the principles of user experience and interface design with practical projects and industry best practices.",
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    image: "/placeholder.svg",
  },
]

// Sample data for program modules
const programModules = [
  { id: 1, programId: 1, title: "Modern JavaScript Fundamentals", duration: "1 week", completionRate: 92 },
  { id: 2, programId: 1, title: "React Components and Hooks", duration: "2 weeks", completionRate: 85 },
  { id: 3, programId: 1, title: "Node.js and Express", duration: "2 weeks", completionRate: 78 },
  { id: 4, programId: 1, title: "Database Integration", duration: "1 week", completionRate: 72 },
  { id: 5, programId: 1, title: "Deployment and CI/CD", duration: "2 weeks", completionRate: 65 },

  { id: 6, programId: 2, title: "Effective Presentation Skills", duration: "1 week", completionRate: 88 },
  { id: 7, programId: 2, title: "Business Writing Essentials", duration: "1 week", completionRate: 82 },
  { id: 8, programId: 2, title: "Negotiation Techniques", duration: "1 week", completionRate: 75 },
  { id: 9, programId: 2, title: "Virtual Communication", duration: "1 week", completionRate: 80 },

  { id: 10, programId: 3, title: "Python for Data Science", duration: "3 weeks", completionRate: 85 },
  { id: 11, programId: 3, title: "Statistical Analysis", duration: "3 weeks", completionRate: 72 },
  { id: 12, programId: 3, title: "Data Visualization", duration: "3 weeks", completionRate: 68 },
  { id: 13, programId: 3, title: "Machine Learning Basics", duration: "3 weeks", completionRate: 60 },
]

// Sample data for participant feedback
const participantFeedback = [
  {
    id: 1,
    programId: 1,
    participant: "Alex Johnson",
    rating: 5,
    comment: "Excellent course! The content was well-structured and the instructor was very knowledgeable.",
    date: "2024-03-15",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    programId: 1,
    participant: "Sarah Williams",
    rating: 4,
    comment: "Very informative course. I would have liked more practical exercises, but overall it was great.",
    date: "2024-03-12",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    programId: 2,
    participant: "Michael Brown",
    rating: 5,
    comment: "The webinar series was incredibly helpful. I've already started applying the techniques in my work.",
    date: "2024-03-18",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    programId: 2,
    participant: "Emily Davis",
    rating: 4,
    comment: "Great content and presentation. Some sessions felt a bit rushed, but the material was excellent.",
    date: "2024-03-16",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    programId: 3,
    participant: "James Wilson",
    rating: 5,
    comment: "This certification program exceeded my expectations. The hands-on projects were particularly valuable.",
    date: "2024-03-10",
    avatar: "/placeholder.svg",
  },
]

// Sample data for skill categories
const skillCategories = [
  { id: 1, name: "Technology", programs: 12, enrollments: 1250 },
  { id: 2, name: "Business", programs: 8, enrollments: 980 },
  { id: 3, name: "Healthcare", programs: 5, enrollments: 620 },
  { id: 4, name: "Marketing", programs: 7, enrollments: 850 },
  { id: 5, name: "Finance", programs: 6, enrollments: 720 },
  { id: 6, name: "Design", programs: 4, enrollments: 580 },
]

// Sample data for program templates
const programTemplates = [
  { id: 1, title: "Technical Certification", modules: 5, duration: "12 weeks", category: "Technology" },
  { id: 2, title: "Professional Development", modules: 4, duration: "8 weeks", category: "Business" },
  { id: 3, title: "Webinar Series", modules: 4, duration: "4 weeks", category: "Various" },
  { id: 4, title: "Industry Workshop", modules: 3, duration: "6 weeks", category: "Various" },
  { id: 5, title: "Micro-Learning Course", modules: 10, duration: "5 weeks", category: "Various" },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function SkillDevelopment() {
  const [searchPrograms, setSearchPrograms] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null)

  // Filter programs based on search, category, and status
  const filteredPrograms = programs.filter(
    (program) =>
      (program.title.toLowerCase().includes(searchPrograms.toLowerCase()) ||
        program.type.toLowerCase().includes(searchPrograms.toLowerCase()) ||
        program.category.toLowerCase().includes(searchPrograms.toLowerCase())) &&
      (selectedCategory === "all" || program.category === selectedCategory) &&
      (selectedStatus === "all" || program.status === selectedStatus),
  )

  // Get modules for selected program
  const selectedProgramModules = programModules.filter((module) => module.programId === selectedProgram)

  // Get feedback for selected program
  const selectedProgramFeedback = participantFeedback.filter((feedback) => feedback.programId === selectedProgram)

  const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800"
        case "Upcomming":
            return "bg-yellow-100 text-yellow-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold tracking-tight">Skill Development Programs</h1>
        <p className="text-muted-foreground">Manage and monitor skill development initiatives across the platform.</p>
      </div> */}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Program Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Participation Analytics
          </TabsTrigger>
          <TabsTrigger value="creation" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Custom Program Creation
          </TabsTrigger>
        </TabsList>

        {/* Program Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Active Programs",
                value: "18",
                subtext: "5 upcoming, 7 completed",
                icon: BookOpen,
                color: "blue",
              },
              {
                title: "Total Enrollments",
                value: "3,850",
                subtext: "+425 this month",
                icon: Users,
                color: "green",
              },
              {
                title: "Average Completion Rate",
                value: "72%",
                subtext: "+3% from last quarter",
                icon: CheckCircle,
                color: "purple",
              },
              {
                title: "Average Rating",
                value: "4.6/5",
                subtext: "Based on 1,245 reviews",
                icon: Star,
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
                  <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Skill Development Programs</CardTitle>
                  <CardDescription>Monitor ongoing skill development initiatives across the platform.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search programs..."
                      className="pl-8 w-[250px]"
                      value={searchPrograms}
                      onChange={(e) => setSearchPrograms(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Program
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrograms.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={program.image} alt={program.title} />
                              <AvatarFallback>{program.title.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{program.title}</div>
                              <div className="text-sm text-muted-foreground">Instructor: {program.instructor}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {program.type === "Online Course" ? (
                              <BookOpen className="h-3 w-3 mr-1" />
                            ) : program.type === "Webinar Series" ? (
                              <Video className="h-3 w-3 mr-1" />
                            ) : program.type === "Certification" ? (
                              <Award className="h-3 w-3 mr-1" />
                            ) : program.type === "Workshop" ? (
                              <Users className="h-3 w-3 mr-1" />
                            ) : null}
                            {program.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{program.category}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(program.status)}>
                                 {program.status}
                              </Badge>
                        </TableCell>
                        <TableCell>{program.enrollments}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{program.completionRate}%</span>
                            </div>
                            <Progress value={program.completionRate} className="h-1" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1">{program.averageRating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{program.duration}</TableCell>
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
                              <DropdownMenuItem
                                className="flex items-center gap-2"
                                onClick={() => setSelectedProgram(program.id)}
                              >
                                <Eye className="h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit className="h-4 w-4" /> Edit Program
                              </DropdownMenuItem>
                              {program.status === "Active" ? (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Pause className="h-4 w-4" /> Pause Program
                                </DropdownMenuItem>
                              ) : program.status === "Upcoming" ? (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Play className="h-4 w-4" /> Start Program
                                </DropdownMenuItem>
                              ) : null}
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Download className="h-4 w-4" /> Export Data
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete Program
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
                  Showing <strong>{filteredPrograms.length}</strong> of <strong>{programs.length}</strong> programs
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

          {selectedProgram && (
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>{programs.find((p) => p.id === selectedProgram)?.title} - Program Details</CardTitle>
                    <CardDescription>Detailed information about the selected program</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedProgram(null)}>
                    Close Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Program Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Type</div>
                          <div className="font-medium">{programs.find((p) => p.id === selectedProgram)?.type}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Category</div>
                          <div className="font-medium">{programs.find((p) => p.id === selectedProgram)?.category}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Duration</div>
                          <div className="font-medium">{programs.find((p) => p.id === selectedProgram)?.duration}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Instructor</div>
                          <div className="font-medium">
                            {programs.find((p) => p.id === selectedProgram)?.instructor}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Start Date</div>
                          <div className="font-medium">
                            {new Date(
                              programs.find((p) => p.id === selectedProgram)?.startDate || "",
                            ).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">End Date</div>
                          <div className="font-medium">
                            {new Date(
                              programs.find((p) => p.id === selectedProgram)?.endDate || "",
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Description</div>
                        <div className="text-sm">{programs.find((p) => p.id === selectedProgram)?.description}</div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Skills Covered</div>
                        <div className="flex flex-wrap gap-1">
                          {programs
                            .find((p) => p.id === selectedProgram)
                            ?.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mt-6 mb-4">Program Modules</h3>
                    <div className="space-y-3">
                      {selectedProgramModules.map((module) => (
                        <div key={module.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">{module.title}</div>
                            <div className="text-sm text-muted-foreground">Duration: {module.duration}</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-sm font-medium">{module.completionRate}%</div>
                            <div className="text-xs text-muted-foreground">Completion Rate</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Program Metrics</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground">Enrollments</div>
                        <div className="text-2xl font-bold">
                          {programs.find((p) => p.id === selectedProgram)?.enrollments}
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                        <div className="text-2xl font-bold">
                          {programs.find((p) => p.id === selectedProgram)?.completionRate}%
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                        <div className="text-2xl font-bold flex items-center">
                          {programs.find((p) => p.id === selectedProgram)?.averageRating}
                          <Star className="h-5 w-5 ml-1 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground">Total Feedback</div>
                        <div className="text-2xl font-bold">{selectedProgramFeedback.length}</div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">Module Completion Rates</h3>
                    <div className="h-[200px] mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartBarChart data={selectedProgramModules} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="title" type="category" width={150} />
                          <RechartsTooltip formatter={(value) => [`${value}%`, "Completion Rate"]} />
                          <Bar dataKey="completionRate" name="Completion Rate" fill="#8884d8" />
                        </RechartBarChart>
                      </ResponsiveContainer>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
                    <div className="space-y-4">
                      {selectedProgramFeedback.map((feedback) => (
                        <div key={feedback.id} className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={feedback.avatar} alt={feedback.participant} />
                                <AvatarFallback>{feedback.participant.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{feedback.participant}</div>
                            </div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm">{feedback.comment}</div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {new Date(feedback.date).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Export Report
                </Button>
                <Button className="flex items-center gap-2">
                  <Edit className="h-4 w-4" /> Edit Program
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Program Categories</CardTitle>
                <CardDescription>Distribution of programs by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={skillCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="programs"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {skillCategories.map((category, index) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div className="text-sm">{category.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Programs</CardTitle>
                <CardDescription>Programs scheduled to start soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs
                    .filter((program) => program.status === "Upcoming")
                    .map((program) => (
                      <div key={program.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-primary/10`}>
                            {program.type === "Online Course" ? (
                              <BookOpen className="h-5 w-5 text-primary" />
                            ) : program.type === "Webinar Series" ? (
                              <Video className="h-5 w-5 text-primary" />
                            ) : program.type === "Certification" ? (
                              <Award className="h-5 w-5 text-primary" />
                            ) : program.type === "Workshop" ? (
                              <Users className="h-5 w-5 text-primary" />
                            ) : (
                              <BookOpen className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{program.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {program.type} • {program.category}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {new Date(program.startDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-sm text-muted-foreground">{program.duration}</div>
                        </div>
                      </div>
                    ))}

                  {programs.filter((program) => program.status === "Upcoming").length === 0 && (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="font-medium">No Upcoming Programs</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        There are no upcoming programs scheduled at the moment.
                      </p>
                      <Button className="mt-4">Create New Program</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Participation Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Total Participants",
                value: "3,850",
                change: "+425 this month",
                changeType: "positive",
                icon: Users,
                color: "blue",
              },
              {
                title: "Average Engagement",
                value: "78%",
                change: "+2.5%",
                changeType: "positive",
                icon: BarChart,
                color: "green",
              },
              {
                title: "Certification Rate",
                value: "65%",
                change: "+3.2%",
                changeType: "positive",
                icon: Award,
                color: "purple",
              },
              {
                title: "Satisfaction Score",
                value: "4.6/5",
                change: "+0.2",
                changeType: "positive",
                icon: Star,
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
                <CardTitle>Enrollment Trends</CardTitle>
                <CardDescription>Monthly enrollment trends across all programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLineChart
                      data={[
                        { month: "Jan", enrollments: 280, completions: 210 },
                        { month: "Feb", enrollments: 320, completions: 245 },
                        { month: "Mar", enrollments: 425, completions: 310 },
                        { month: "Apr", enrollments: 380, completions: 285 },
                        { month: "May", enrollments: 410, completions: 320 },
                        { month: "Jun", enrollments: 450, completions: 340 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="enrollments"
                        name="Enrollments"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="completions" name="Completions" stroke="#82ca9d" />
                    </RechartLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completion Rates by Category</CardTitle>
                <CardDescription>Program completion rates across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart
                      data={[
                        { category: "Technology", completionRate: 72 },
                        { category: "Business", completionRate: 78 },
                        { category: "Healthcare", completionRate: 68 },
                        { category: "Marketing", completionRate: 75 },
                        { category: "Finance", completionRate: 70 },
                        { category: "Design", completionRate: 82 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 100]} />
                      <RechartsTooltip formatter={(value) => [`${value}%`, "Completion Rate"]} />
                      <Bar dataKey="completionRate" name="Completion Rate %" fill="#8884d8" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Program Performance</CardTitle>
                  <CardDescription>Detailed performance metrics for all programs</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="enrollments">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enrollments">Sort by Enrollments</SelectItem>
                      <SelectItem value="completion">Sort by Completion Rate</SelectItem>
                      <SelectItem value="rating">Sort by Rating</SelectItem>
                      <SelectItem value="recent">Sort by Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
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
                      <TableHead>Program</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Engagement Score</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs
                      .sort((a, b) => b.enrollments - a.enrollments)
                      .map((program) => (
                        <TableRow key={program.id}>
                          <TableCell>
                            <div className="font-medium">{program.title}</div>
                            <div className="text-sm text-muted-foreground">{program.type}</div>
                          </TableCell>
                          <TableCell>{program.category}</TableCell>
                          <TableCell>{program.enrollments}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{program.completionRate}%</span>
                              </div>
                              <Progress value={program.completionRate} className="h-1" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{Math.round(program.completionRate * 0.9)}%</span>
                              </div>
                              <Progress value={program.completionRate * 0.9} className="h-1" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1">{program.averageRating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {participantFeedback.filter((f) => f.programId === program.id).length} reviews
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
                                <DropdownMenuItem
                                  className="flex items-center gap-2"
                                  onClick={() => setSelectedProgram(program.id)}
                                >
                                  <Eye className="h-4 w-4" /> View Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <BarChart className="h-4 w-4" /> Detailed Metrics
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4" /> View Feedback
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Download className="h-4 w-4" /> Export Report
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Participant Demographics</CardTitle>
                <CardDescription>Breakdown of program participants by demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartPieChart>
                          <Pie
                            data={[
                              { name: "18-24", value: 25 },
                              { name: "25-34", value: 40 },
                              { name: "35-44", value: 20 },
                              { name: "45+", value: 15 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {[...Array(4)].map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </RechartPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Experience Level</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartPieChart>
                          <Pie
                            data={[
                              { name: "Entry", value: 35 },
                              { name: "Intermediate", value: 45 },
                              { name: "Advanced", value: 20 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {[...Array(3)].map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </RechartPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <h4 className="text-sm font-medium mb-2">Industry Background</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart
                      data={[
                        { industry: "Technology", participants: 35 },
                        { industry: "Finance", participants: 20 },
                        { industry: "Healthcare", participants: 15 },
                        { industry: "Education", participants: 12 },
                        { industry: "Manufacturing", participants: 10 },
                        { industry: "Other", participants: 8 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="industry" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="participants" name="Participants %" fill="#8884d8" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Participant Feedback Analysis</CardTitle>
                <CardDescription>Analysis of feedback received from program participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600">4.6</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                    <div className="flex justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-500 fill-yellow-500" : i < 5 ? "text-yellow-500 fill-yellow-500 opacity-60" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-3xl font-bold">92%</div>
                    <div className="text-sm text-muted-foreground">Would Recommend</div>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="text-3xl font-bold">85%</div>
                    <div className="text-sm text-muted-foreground">Found Valuable</div>
                  </div>
                </div>

                <h4 className="text-sm font-medium mb-2">Rating Distribution</h4>
                <div className="space-y-2 mb-6">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="flex items-center w-12">
                        <span className="text-sm">{rating}</span>
                        <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                      </div>
                      <Progress
                        value={rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1}
                        className="h-2 flex-1"
                      />
                      <div className="text-sm w-10 text-right">
                        {rating === 5 ? "65%" : rating === 4 ? "25%" : rating === 3 ? "7%" : rating === 2 ? "2%" : "1%"}
                      </div>
                    </div>
                  ))}
                </div>

                <h4 className="text-sm font-medium mb-2">Common Feedback Themes</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      outerRadius={90}
                      data={[
                        { subject: "Content Quality", A: 85, fullMark: 100 },
                        { subject: "Instructor", A: 90, fullMark: 100 },
                        { subject: "Materials", A: 78, fullMark: 100 },
                        { subject: "Pace", A: 72, fullMark: 100 },
                        { subject: "Relevance", A: 88, fullMark: 100 },
                        { subject: "Support", A: 80, fullMark: 100 },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Satisfaction Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Custom Program Creation Tab */}
        <TabsContent value="creation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Program</CardTitle>
              <CardDescription>Design and add a new skill development program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="program-title">Program Title</Label>
                    <Input id="program-title" placeholder="Enter program title" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="program-type">Program Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online-course">Online Course</SelectItem>
                          <SelectItem value="webinar-series">Webinar Series</SelectItem>
                          <SelectItem value="certification">Certification</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="program-category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program-instructor">Instructor</Label>
                    <Input id="program-instructor" placeholder="Enter instructor name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program-description">Description</Label>
                    <Textarea
                      id="program-description"
                      placeholder="Enter program description"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Skills Covered</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                      {["React", "Node.js"].map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button className="h-3 w-3 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-muted-foreground/40">
                            <span className="sr-only">Remove</span>
                            <X className="h-2 w-2" />
                          </button>
                        </Badge>
                      ))}
                      <Input
                        placeholder="Add skill..."
                        className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Program Modules</Label>
                    <div className="space-y-3 p-4 border rounded-md">
                      {[
                        { title: "Module 1: Introduction", duration: "1 week" },
                        { title: "Module 2: Core Concepts", duration: "2 weeks" },
                      ].map((module, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="font-medium">{module.title}</div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">{module.duration}</div>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Module
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Program Resources</Label>
                    <div className="space-y-3 p-4 border rounded-md">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div className="font-medium">Course Syllabus.pdf</div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Upload className="h-4 w-4" /> Upload Resources
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="audience-beginners" />
                        <Label htmlFor="audience-beginners">Beginners</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="audience-intermediate" checked />
                        <Label htmlFor="audience-intermediate">Intermediate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="audience-advanced" />
                        <Label htmlFor="audience-advanced">Advanced</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Program Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="setting-certificate" checked />
                        <Label htmlFor="setting-certificate">Issue Certificate on Completion</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="setting-feedback" checked />
                        <Label htmlFor="setting-feedback">Collect Participant Feedback</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="setting-progress" checked />
                        <Label htmlFor="setting-progress">Track Progress</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="setting-notifications" />
                        <Label htmlFor="setting-notifications">Send Reminder Notifications</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <div className="flex gap-2">
                <Button variant="outline">Preview</Button>
                <Button>Create Program</Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Program Templates</CardTitle>
                <CardDescription>Pre-designed templates to quickly create new programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Layers className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{template.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {template.modules} modules • {template.duration} • {template.category}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Program Creation Tips</CardTitle>
                <CardDescription>Best practices for creating effective skill development programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Define Clear Learning Objectives",
                      description:
                        "Clearly define what participants will learn and be able to do after completing the program.",
                      icon: CheckCircle,
                    },
                    {
                      title: "Structure Content Logically",
                      description: "Organize content in a logical sequence that builds on previous knowledge.",
                      icon: Layers,
                    },
                    {
                      title: "Include Interactive Elements",
                      description: "Add quizzes, assignments, and discussions to increase engagement.",
                      icon: Users,
                    },
                    {
                      title: "Provide Practical Applications",
                      description:
                        "Include real-world examples and case studies to demonstrate practical applications.",
                      icon: Briefcase,
                    },
                    {
                      title: "Gather and Implement Feedback",
                      description: "Collect feedback from participants and use it to improve future iterations.",
                      icon: MessageSquare,
                    },
                  ].map((tip, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted rounded-lg">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <tip.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{tip.title}</div>
                        <div className="text-sm text-muted-foreground">{tip.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Program Creation Tools</CardTitle>
              <CardDescription>Additional tools to help you create and manage programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Content Library",
                    description: "Access pre-made content modules, exercises, and assessments",
                    icon: BookOpen,
                    action: "Browse Library",
                  },
                  {
                    title: "Assessment Builder",
                    description: "Create quizzes, tests, and assignments for your programs",
                    icon: FileCheck,
                    action: "Create Assessment",
                  },
                  {
                    title: "Certificate Designer",
                    description: "Design custom certificates for program completion",
                    icon: Award,
                    action: "Design Certificate",
                  },
                  {
                    title: "Skill Mapping Tool",
                    description: "Map program content to specific skills and competencies",
                    icon: Tag,
                    action: "Map Skills",
                  },
                  {
                    title: "Feedback Templates",
                    description: "Create templates for collecting participant feedback",
                    icon: MessageSquare,
                    action: "Create Template",
                  },
                  {
                    title: "Program Analytics",
                    description: "Set up custom analytics dashboards for your programs",
                    icon: BarChart,
                    action: "Configure Analytics",
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

