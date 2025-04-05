"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Search,
  Filter,
  Download,
  Calendar,
  ArrowUpRight,
  FileText,
  Building,
  RefreshCw,
  Share2,
  Sliders,
  ChevronRight,
  CheckCircle,
  FileSpreadsheet,
  FileIcon as FilePdf,
  FileJson,
  Plus,
  Save,
  Trash,
  Eye,
  Edit,
  BarChartIcon,
  LineChartIcon,
  PieChartIcon as PieChartIconFull,
  TrendingUp,
  Zap,
  Layers,
  CalendarClock,
  LayoutDashboard,
  FileBarChart,
  FileTextIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// Sample data for charts and tables
const placementTrendData = [
  { month: "Jan", placements: 24, offers: 32, interviews: 65 },
  { month: "Feb", placements: 28, offers: 36, interviews: 72 },
  { month: "Mar", placements: 32, offers: 42, interviews: 80 },
  { month: "Apr", placements: 38, offers: 45, interviews: 85 },
  { month: "May", placements: 42, offers: 48, interviews: 90 },
  { month: "Jun", placements: 48, offers: 52, interviews: 95 },
  { month: "Jul", placements: 45, offers: 50, interviews: 88 },
  { month: "Aug", placements: 50, offers: 58, interviews: 98 },
]

const departmentPerformanceData = [
  {
    name: "Computer Science",
    students: 120,
    placed: 98,
    placementRate: 82,
    avgPackage: 8.5,
    highestPackage: 24,
    topRecruiter: "Tech Solutions Inc.",
  },
  {
    name: "Electronics Engineering",
    students: 85,
    placed: 65,
    placementRate: 76,
    avgPackage: 7.2,
    highestPackage: 18,
    topRecruiter: "Circuit Innovations",
  },
  {
    name: "Business Administration",
    students: 110,
    placed: 78,
    placementRate: 71,
    avgPackage: 6.8,
    highestPackage: 15,
    topRecruiter: "Global Finance Group",
  },
  {
    name: "Data Science",
    students: 65,
    placed: 58,
    placementRate: 89,
    avgPackage: 9.2,
    highestPackage: 22,
    topRecruiter: "Analytics Pro",
  },
  {
    name: "Mechanical Engineering",
    students: 90,
    placed: 62,
    placementRate: 69,
    avgPackage: 6.5,
    highestPackage: 14,
    topRecruiter: "AutoTech Industries",
  },
]

const recruiterFeedbackData = [
  {
    id: 1,
    company: "Tech Solutions Inc.",
    feedback:
      "Students demonstrated strong technical skills and problem-solving abilities. Communication skills could be improved for some candidates.",
    rating: 4.5,
    date: "2024-03-15",
    strengths: ["Technical knowledge", "Problem solving", "Adaptability"],
    improvements: ["Communication skills", "Project experience"],
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    company: "Global Finance Group",
    feedback:
      "Well-prepared candidates with good analytical skills. Would recommend more exposure to financial modeling tools used in the industry.",
    rating: 4.2,
    date: "2024-03-10",
    strengths: ["Analytical thinking", "Domain knowledge", "Presentation skills"],
    improvements: ["Industry tool familiarity", "Real-world case studies"],
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    company: "Circuit Innovations",
    feedback:
      "Strong theoretical foundation. Students would benefit from more hands-on experience with latest hardware technologies.",
    rating: 4.0,
    date: "2024-03-05",
    strengths: ["Theoretical knowledge", "Team collaboration", "Learning ability"],
    improvements: ["Practical experience", "Industry exposure"],
    avatar: "/placeholder.svg",
  },
]

const sectorDistributionData = [
  { name: "Technology", value: 45, color: "#10b981" },
  { name: "Finance", value: 20, color: "#6366f1" },
  { name: "Consulting", value: 15, color: "#f59e0b" },
  { name: "Manufacturing", value: 10, color: "#ec4899" },
  { name: "Healthcare", value: 8, color: "#8884d8" },
  { name: "Others", value: 2, color: "#82ca9d" },
]

const salaryRangeData = [
  { range: "3-5 LPA", students: 45 },
  { range: "5-7 LPA", students: 65 },
  { range: "7-10 LPA", students: 38 },
  { range: "10-15 LPA", students: 22 },
  { range: "15+ LPA", students: 8 },
]

const skillGapData = [
  { name: "Technical", value: 35, color: "#0088FE" },
  { name: "Soft Skills", value: 25, color: "#00C49F" },
  { name: "Domain Knowledge", value: 20, color: "#FFBB28" },
  { name: "Communication", value: 15, color: "#FF8042" },
  { name: "Leadership", value: 5, color: "#8884D8" },
]

const savedReports = [
  {
    id: 1,
    name: "Annual Placement Report 2023-24",
    description: "Comprehensive overview of placement statistics for the academic year",
    type: "Placement",
    created: "2024-03-15",
    lastRun: "2024-04-01",
    scheduled: true,
    frequency: "Monthly",
    format: "PDF",
    icon: FilePdf,
  },
  {
    id: 2,
    name: "Department-wise Performance",
    description: "Comparative analysis of placement performance across departments",
    type: "Performance",
    created: "2024-02-20",
    lastRun: "2024-04-02",
    scheduled: true,
    frequency: "Weekly",
    format: "Excel",
    icon: FileSpreadsheet,
  },
  {
    id: 3,
    name: "Recruiter Engagement Report",
    description: "Analysis of recruiter participation and feedback",
    type: "Recruiter",
    created: "2024-01-10",
    lastRun: "2024-03-28",
    scheduled: false,
    frequency: "Ad-hoc",
    format: "PDF",
    icon: FilePdf,
  },
  {
    id: 4,
    name: "Skill Gap Analysis",
    description: "Identification of skill gaps based on industry requirements",
    type: "Skills",
    created: "2024-03-05",
    lastRun: "2024-03-30",
    scheduled: true,
    frequency: "Monthly",
    format: "Excel",
    icon: FileSpreadsheet,
  },
  {
    id: 5,
    name: "Salary Trend Analysis",
    description: "Year-on-year analysis of salary packages offered",
    type: "Salary",
    created: "2024-02-15",
    lastRun: "2024-04-01",
    scheduled: false,
    frequency: "Ad-hoc",
    format: "JSON",
    icon: FileJson,
  },
]

const ReportingInsights = () => {
  const [activeTab, setActiveTab] = useState("dashboards")
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showCustomizeDialog, setShowCustomizeDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedTimeframe, setSelectedTimeframe] = useState("yearly")
  const [selectedReportFormat, setSelectedReportFormat] = useState("pdf")
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        {/* <div>
          <h1 className="text-3xl font-bold text-gray-900">Reporting & Insights</h1>
          <p className="text-gray-500 mt-1">
            Comprehensive dashboards, exportable reports, and customizable data views
          </p>
        </div> */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowExportDialog(true)}>
            <Download size={16} />
            Export Data
          </Button>
          <Button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            onClick={() => setShowReportDialog(true)}
          >
            <FileText size={16} />
            Generate Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboards" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboards">Real-Time Dashboards</TabsTrigger>
          <TabsTrigger value="reports">Exportable Reports</TabsTrigger>
          <TabsTrigger value="custom-views">Customizable Views</TabsTrigger>
        </TabsList>

        {/* Real-Time Dashboards Tab */}
        <TabsContent value="dashboards" className="space-y-6">
          {/* Dashboard Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ee">Electronics Engineering</SelectItem>
                  <SelectItem value="ba">Business Administration</SelectItem>
                  <SelectItem value="ds">Data Science</SelectItem>
                  <SelectItem value="me">Mechanical Engineering</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw size={14} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowCustomizeDialog(true)}
              >
                <Sliders size={14} />
                Customize
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white border-l-4 border-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Placement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.5%</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>5.2% from last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Package</CardTitle>
                <BarChartIcon className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹7.8 LPA</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>8.3% from last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recruiter Satisfaction</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2/5</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>0.3 from last year</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-l-4 border-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recruiting Companies</CardTitle>
                <Building className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86</div>
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>12 new this year</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Placement Trends */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Placement Trends</CardTitle>
                    <CardDescription>Monthly placement statistics for the current academic year</CardDescription>
                  </div>
                  <Select defaultValue="line">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Chart Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={placementTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="placements" name="Placements" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="offers" name="Offers" stroke="#6366f1" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="interviews"
                      name="Interviews"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sector Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Sector Distribution</CardTitle>
                <CardDescription>Placement distribution across industry sectors</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sectorDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Salary Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Distribution</CardTitle>
                <CardDescription>Number of students in different salary ranges</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryRangeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" name="Number of Students" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Department-wise Performance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Department-wise Performance</CardTitle>
                  <CardDescription>Placement statistics across different departments</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search departments..."
                    className="max-w-sm"
                  />
                  <Search className="h-4 w-4" />
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-slate-50 p-3 text-sm font-medium">
                  <div>Department</div>
                  <div className="text-center">Students</div>
                  <div className="text-center">Placed</div>
                  <div className="text-center">Placement %</div>
                  <div className="text-center">Avg. Package</div>
                  <div className="text-center">Highest Package</div>
                  <div className="text-center">Top Recruiter</div>
                </div>
                <div className="divide-y">
                  {departmentPerformanceData.map((dept, index) => (
                    <div key={index} className="grid grid-cols-7 p-3 text-sm">
                      <div className="font-medium">{dept.name}</div>
                      <div className="text-center">{dept.students}</div>
                      <div className="text-center">{dept.placed}</div>
                      <div className="text-center">
                        <Badge
                          variant={
                            dept.placementRate >= 80 ? "success" : dept.placementRate >= 70 ? "default" : "secondary"
                          }
                        >
                          {dept.placementRate}%
                        </Badge>
                      </div>
                      <div className="text-center">₹{dept.avgPackage} LPA</div>
                      <div className="text-center">₹{dept.highestPackage} LPA</div>
                      <div className="text-center truncate max-w-[150px]" title={dept.topRecruiter}>
                        {dept.topRecruiter}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recruiter Feedback */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recruiter Feedback</CardTitle>
                  <CardDescription>Recent feedback from recruiting partners</CardDescription>
                </div>
                <Button variant="outline">View All Feedback</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recruiterFeedbackData.map((feedback) => (
                  <div key={feedback.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={feedback.avatar} />
                          <AvatarFallback>{feedback.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{feedback.company}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(feedback.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-amber-500 flex items-center">
                          <span className="ml-1 font-medium">{feedback.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm">{feedback.feedback}</p>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium text-green-600 mb-1">Strengths:</p>
                        <div className="flex flex-wrap gap-1">
                          {feedback.strengths.map((strength, idx) => (
                            <Badge key={idx} variant="outline" className="bg-green-50">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-amber-600 mb-1">Areas for improvement:</p>
                        <div className="flex flex-wrap gap-1">
                          {feedback.improvements.map((improvement, idx) => (
                            <Badge key={idx} variant="outline" className="bg-amber-50">
                              {improvement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>
                Areas where students need additional training based on employer feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillGapData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillGapData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Key Insights</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Technical skills remain the largest gap area (35%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Soft skills and domain knowledge gaps have reduced by 5% since last year</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Communication skills need continued focus (15%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Leadership skills show the smallest gap (5%)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Recommended Actions</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Enhance technical training programs with focus on emerging technologies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Implement communication workshops with industry professionals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Organize domain-specific seminars and guest lectures</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exportable Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          {/* Report Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="placement">Placement Reports</SelectItem>
                  <SelectItem value="performance">Performance Reports</SelectItem>
                  <SelectItem value="recruiter">Recruiter Reports</SelectItem>
                  <SelectItem value="skills">Skill Reports</SelectItem>
                  <SelectItem value="salary">Salary Reports</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formats</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowReportDialog(true)}>
                <Plus size={16} />
                New Report
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={() => setShowScheduleDialog(true)}
              >
                <CalendarClock size={16} />
                Schedule Reports
              </Button>
            </div>
          </div>

          {/* Saved Reports */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Saved Reports</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search reports..." className="pl-8 w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-slate-50 p-3 text-sm font-medium">
                  <div className="col-span-2">Report Name</div>
                  <div>Type</div>
                  <div>Created</div>
                  <div>Last Run</div>
                  <div>Format</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {savedReports.map((report) => (
                    <div key={report.id} className="grid grid-cols-7 p-3 text-sm items-center">
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <report.icon className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <p className="text-xs text-gray-500">{report.description}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                      <div className="text-gray-500 text-xs">{new Date(report.created).toLocaleDateString()}</div>
                      <div className="text-gray-500 text-xs">{new Date(report.lastRun).toLocaleDateString()}</div>
                      <div>
                        <Badge variant="secondary">{report.format}</Badge>
                      </div>
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" title="Run Report">
                          <Zap className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-configured report templates for common reporting needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Popular</Badge>
                      <FileBarChart className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg mt-2">Comprehensive Placement Report</CardTitle>
                    <CardDescription>
                      Complete overview of placement statistics with department-wise breakdown
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm text-gray-500 mt-2">
                      <p>Includes:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Placement rates by department</li>
                        <li>Salary distribution analysis</li>
                        <li>Recruiter participation metrics</li>
                        <li>Year-on-year comparison</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setShowReportDialog(true)}
                    >
                      Generate
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Detailed</Badge>
                      <FileTextIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg mt-2">Recruiter Engagement Report</CardTitle>
                    <CardDescription>
                      Analysis of recruiter participation, feedback, and hiring patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm text-gray-500 mt-2">
                      <p>Includes:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Recruiter participation trends</li>
                        <li>Feedback analysis</li>
                        <li>Hiring patterns by company</li>
                        <li>Relationship strength metrics</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setShowReportDialog(true)}
                    >
                      Generate
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Strategic</Badge>
                      <LayoutDashboard className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg mt-2">Strategic Insights Report</CardTitle>
                    <CardDescription>Executive summary with key insights and strategic recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm text-gray-500 mt-2">
                      <p>Includes:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Key performance indicators</li>
                        <li>Trend analysis and forecasting</li>
                        <li>Competitive benchmarking</li>
                        <li>Strategic recommendations</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setShowReportDialog(true)}
                    >
                      Generate
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Recent Exports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Exports</CardTitle>
              <CardDescription>Recently generated and downloaded reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Generated On</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Placement Summary Q1 2024</TableCell>
                    <TableCell>Apr 2, 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <FilePdf className="h-3 w-3" />
                        PDF
                      </Badge>
                    </TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>2.4 MB</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Department Performance Report</TableCell>
                    <TableCell>Apr 1, 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <FileSpreadsheet className="h-3 w-3" />
                        Excel
                      </Badge>
                    </TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>1.8 MB</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Recruiter Feedback Analysis</TableCell>
                    <TableCell>Mar 28, 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <FilePdf className="h-3 w-3" />
                        PDF
                      </Badge>
                    </TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>3.2 MB</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Salary Trends 2022-2024</TableCell>
                    <TableCell>Mar 25, 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <FileSpreadsheet className="h-3 w-3" />
                        Excel
                      </Badge>
                    </TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>1.5 MB</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">API Data Export</TableCell>
                    <TableCell>Mar 20, 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <FileJson className="h-3 w-3" />
                        JSON
                      </Badge>
                    </TableCell>
                    <TableCell>System</TableCell>
                    <TableCell>4.7 MB</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customizable Views Tab */}
        <TabsContent value="custom-views" className="space-y-6">
          {/* Custom View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="placement">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Data Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placement">Placement Data</SelectItem>
                  <SelectItem value="student">Student Data</SelectItem>
                  <SelectItem value="recruiter">Recruiter Data</SelectItem>
                  <SelectItem value="salary">Salary Data</SelectItem>
                  <SelectItem value="skills">Skills Data</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="department">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Group By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department">Department</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                  <SelectItem value="sector">Industry Sector</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="bar">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Visualization Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="table">Table View</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Save size={16} />
                Save View
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={() => setShowCustomizeDialog(true)}
              >
                <Sliders size={16} />
                Advanced Customize
              </Button>
            </div>
          </div>

          {/* Custom View Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Department-wise Placement Performance</CardTitle>
                  <CardDescription>Customizable view of placement data grouped by department</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye size={14} />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Share2 size={14} />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                    <YAxis yAxisId="right" orientation="right" stroke="#6366f1" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="placementRate" name="Placement Rate (%)" fill="#10b981" />
                    <Bar yAxisId="right" dataKey="avgPackage" name="Avg. Package (LPA)" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Saved Custom Views */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Custom Views</CardTitle>
              <CardDescription>Your personalized data views and visualizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Placement</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">Department Performance</CardTitle>
                    <CardDescription>Placement rates and packages by department</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[120px] mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={departmentPerformanceData.slice(0, 3)}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <XAxis dataKey="name" tick={false} />
                          <Tooltip />
                          <Bar dataKey="placementRate" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Export
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Salary</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">Salary Trends</CardTitle>
                    <CardDescription>Year-on-year salary package trends</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[120px] mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { year: "2020", avg: 6.2 },
                            { year: "2021", avg: 6.8 },
                            { year: "2022", avg: 7.1 },
                            { year: "2023", avg: 7.4 },
                            { year: "2024", avg: 7.8 },
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <XAxis dataKey="year" tick={false} />
                          <Tooltip />
                          <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Export
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Recruiter</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg mt-2">Recruiter Engagement</CardTitle>
                    <CardDescription>Recruiter participation and hiring patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[120px] mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Tech", value: 45 },
                              { name: "Finance", value: 20 },
                              { name: "Other", value: 35 },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#6366f1" />
                            <Cell fill="#f59e0b" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Export
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Data Filtering Options */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Filtering Options</CardTitle>
              <CardDescription>Create complex filters to analyze specific data segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department-filter">Department</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="department-filter">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="ee">Electronics Engineering</SelectItem>
                        <SelectItem value="ba">Business Administration</SelectItem>
                        <SelectItem value="ds">Data Science</SelectItem>
                        <SelectItem value="me">Mechanical Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year-filter">Academic Year</Label>
                    <Select defaultValue="2024">
                      <SelectTrigger id="year-filter">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sector-filter">Industry Sector</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="sector-filter">
                        <SelectValue placeholder="Select Sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sectors</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Salary Range (LPA)</Label>
                    <div className="pt-2 px-1">
                      <Slider defaultValue={[3, 15]} min={3} max={25} step={1} />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>₹3 LPA</span>
                        <span>₹25 LPA</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Placement Rate</Label>
                    <div className="pt-2 px-1">
                      <Slider defaultValue={[50, 100]} min={0} max={100} step={5} />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Filters</Label>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="top-recruiters" />
                      <label
                        htmlFor="top-recruiters"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Top Recruiters Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="high-packages" />
                      <label
                        htmlFor="high-packages"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        High Packages (10 LPA)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="first-time" />
                      <label
                        htmlFor="first-time"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First-time Recruiters
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="international" />
                      <label
                        htmlFor="international"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        International Placements
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Reset Filters</Button>
                  <Button className="bg-green-600 hover:bg-green-700">Apply Filters</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Visualization Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Data Visualization Tools</CardTitle>
              <CardDescription>Choose the right visualization for your data analysis needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-2 hover:border-green-200 cursor-pointer transition-all">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <BarChartIcon className="h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="font-medium">Bar Charts</h3>
                    <p className="text-xs text-gray-500 mt-1">Compare values across categories</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-200 cursor-pointer transition-all">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <LineChartIcon className="h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="font-medium">Line Charts</h3>
                    <p className="text-xs text-gray-500 mt-1">Show trends over time periods</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-200 cursor-pointer transition-all">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <PieChartIconFull className="h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="font-medium">Pie Charts</h3>
                    <p className="text-xs text-gray-500 mt-1">Display proportional data distribution</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-200 cursor-pointer transition-all">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Layers className="h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="font-medium">Data Tables</h3>
                    <p className="text-xs text-gray-500 mt-1">View detailed tabular data</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Visualization Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>
                      <span className="font-medium">Bar charts</span> are best for comparing values across categories
                      (e.g., department-wise placement rates)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>
                      <span className="font-medium">Line charts</span> work well for showing trends over time (e.g.,
                      monthly placement statistics)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>
                      <span className="font-medium">Pie charts</span> are ideal for showing proportional data (e.g.,
                      sector distribution of placements)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>
                      <span className="font-medium">Tables</span> provide detailed information when exact values are
                      important
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>Select the data you want to export and the preferred format</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Data to Export</Label>
              <Select defaultValue="placement">
                <SelectTrigger>
                  <SelectValue placeholder="Select data to export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placement">Placement Data</SelectItem>
                  <SelectItem value="student">Student Performance Data</SelectItem>
                  <SelectItem value="recruiter">Recruiter Feedback Data</SelectItem>
                  <SelectItem value="salary">Salary Statistics</SelectItem>
                  <SelectItem value="department">Department-wise Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time Period</Label>
              <Select defaultValue="current">
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Academic Year (2023-24)</SelectItem>
                  <SelectItem value="previous">Previous Academic Year (2022-23)</SelectItem>
                  <SelectItem value="last3">Last 3 Years</SelectItem>
                  <SelectItem value="last5">Last 5 Years</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Export Format</Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center space-y-1.5">
                  <div
                    className={`border-2 rounded-md p-3 cursor-pointer ${selectedReportFormat === "pdf" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                    onClick={() => setSelectedReportFormat("pdf")}
                  >
                    <FilePdf className="h-8 w-8 text-red-500" />
                  </div>
                  <span className="text-xs">PDF</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <div
                    className={`border-2 rounded-md p-3 cursor-pointer ${selectedReportFormat === "excel" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                    onClick={() => setSelectedReportFormat("excel")}
                  >
                    <FileSpreadsheet className="h-8 w-8 text-green-700" />
                  </div>
                  <span className="text-xs">Excel</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <div
                    className={`border-2 rounded-md p-3 cursor-pointer ${selectedReportFormat === "json" ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                    onClick={() => setSelectedReportFormat("json")}
                  >
                    <FileJson className="h-8 w-8 text-amber-500" />
                  </div>
                  <span className="text-xs">JSON</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="include-charts" />
                <label
                  htmlFor="include-charts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include charts and visualizations
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="include-summary" defaultChecked />
                <label
                  htmlFor="include-summary"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Include executive summary
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowExportDialog(false)}>
              Export Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>Create a comprehensive report with customized data and visualizations</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input id="report-name" placeholder="Enter report name" defaultValue="Placement Performance Report" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-description">Description</Label>
                <Textarea
                  id="report-description"
                  placeholder="Enter report description"
                  defaultValue="Comprehensive analysis of placement performance across departments with key insights and recommendations."
                />
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Report Sections</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                    <Checkbox id="section-1" defaultChecked />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="section-1"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Executive Summary
                        </label>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Overview of key metrics and highlights</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                    <Checkbox id="section-2" defaultChecked />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="section-2"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Placement Statistics
                        </label>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Detailed placement data with trends and comparisons</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                    <Checkbox id="section-3" defaultChecked />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="section-3"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Department Performance
                        </label>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Department-wise analysis of placement metrics</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                    <Checkbox id="section-4" defaultChecked />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="section-4"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Salary Analysis
                        </label>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Salary trends, distributions, and benchmarking</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                    <Checkbox id="section-5" defaultChecked />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="section-5"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Recruiter Insights
                        </label>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Recruiter participation and feedback analysis</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                    <Checkbox id="section-6" />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="section-6"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Skill Gap Analysis
                        </label>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Analysis of skill gaps based on industry requirements</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-md bg-gray-50">
                    <Checkbox id="section-7" defaultChecked />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="section-7"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Recommendations
                        </label>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">Strategic recommendations based on data insights</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Plus size={16} />
                    Add Custom Section
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Report Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time Period</Label>
                    <Select defaultValue="current">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Academic Year (2023-24)</SelectItem>
                        <SelectItem value="previous">Previous Academic Year (2022-23)</SelectItem>
                        <SelectItem value="last3">Last 3 Years</SelectItem>
                        <SelectItem value="last5">Last 5 Years</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Report Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="ppt">PowerPoint Presentation</SelectItem>
                        <SelectItem value="web">Web Dashboard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Granularity</Label>
                    <Select defaultValue="department">
                      <SelectTrigger>
                        <SelectValue placeholder="Select granularity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="institution">Institution Level</SelectItem>
                        <SelectItem value="department">Department Level</SelectItem>
                        <SelectItem value="program">Program Level</SelectItem>
                        <SelectItem value="student">Student Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Comparison Baseline</Label>
                    <Select defaultValue="previous">
                      <SelectTrigger>
                        <SelectValue placeholder="Select baseline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="previous">Previous Year</SelectItem>
                        <SelectItem value="target">Target Metrics</SelectItem>
                        <SelectItem value="industry">Industry Benchmarks</SelectItem>
                        <SelectItem value="none">No Comparison</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-charts-report" defaultChecked />
                    <label
                      htmlFor="include-charts-report"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include charts and visualizations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-raw-data" />
                    <label
                      htmlFor="include-raw-data"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include raw data tables
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-appendix" defaultChecked />
                    <label
                      htmlFor="include-appendix"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include methodology appendix
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Schedule Report (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">One-time only</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label>Recipients</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-1">
                      admin@techuniversity.edu
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-1">
                      placement@techuniversity.edu
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1">
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                    <Input placeholder="Add email address" className="w-[200px]" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" className="flex items-center gap-2">
                <Save size={16} />
                Save as Draft
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowReportDialog(false)}>
                  Generate Report
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customize Dashboard Dialog */}
      <Dialog open={showCustomizeDialog} onOpenChange={setShowCustomizeDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customize Dashboard</DialogTitle>
            <DialogDescription>Personalize your dashboard layout and visualizations</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">{/* Dialog content for customizing dashboard */}</div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomizeDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowCustomizeDialog(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Reports Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Schedule Reports</DialogTitle>
            <DialogDescription>Set up automated report generation and distribution</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">{/* Dialog content for scheduling reports */}</div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowScheduleDialog(false)}>
              Save Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReportingInsights

