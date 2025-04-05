"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Building, Award, Search, Download, Filter, ArrowUpRight, MessageSquare, Star } from "lucide-react"
import { useState } from "react"

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

const sectorDistributionData = [
  { name: "Technology", value: 45 },
  { name: "Finance", value: 20 },
  { name: "Consulting", value: 15 },
  { name: "Manufacturing", value: 10 },
  { name: "Healthcare", value: 8 },
  { name: "Others", value: 2 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

const salaryRangeData = [
  { range: "3-5 LPA", students: 45 },
  { range: "5-7 LPA", students: 65 },
  { range: "7-10 LPA", students: 38 },
  { range: "10-15 LPA", students: 22 },
  { range: "15+ LPA", students: 8 },
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

const topStudentsData = [
  {
    id: 1,
    name: "Priya Sharma",
    department: "Computer Science",
    cgpa: 9.2,
    package: "₹18.5 LPA",
    company: "Tech Solutions Inc.",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Rahul Verma",
    department: "Data Science",
    cgpa: 9.4,
    package: "₹22 LPA",
    company: "Analytics Pro",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Ananya Patel",
    department: "Computer Science",
    cgpa: 9.0,
    package: "₹16.8 LPA",
    company: "Global Systems",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Vikram Singh",
    department: "Electronics Engineering",
    cgpa: 8.8,
    package: "₹15.2 LPA",
    company: "Circuit Innovations",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Neha Gupta",
    department: "Business Administration",
    cgpa: 9.1,
    package: "₹15 LPA",
    company: "Global Finance Group",
    avatar: "/placeholder.svg",
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

export default function PlacementAnalytics() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedYear, setSelectedYear] = useState("2024")

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        {/* <div>
          <h1 className="text-2xl font-bold tracking-tight">Placement Success Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into placement performance, trends, and recruiter feedback
          </p>
        </div> */}
        <div className="flex flex-col sm:flex-row gap-2">
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

          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export Report
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
            <Award className="h-4 w-4 text-green-500" />
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
            <CardTitle className="text-sm font-medium">Highest Package</CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹24 LPA</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>20% from last year</span>
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Placement Metrics</TabsTrigger>
          <TabsTrigger value="performance">Student Performance</TabsTrigger>
          <TabsTrigger value="feedback">Recruiter Feedback</TabsTrigger>
        </TabsList>

        {/* Placement Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        </TabsContent>

        {/* Student Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Placement Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Placement Funnel</CardTitle>
              <CardDescription>Student journey through the placement process</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { stage: "Eligible", students: 470 },
                    { stage: "Applied", students: 420 },
                    { stage: "Shortlisted", students: 380 },
                    { stage: "Interviewed", students: 320 },
                    { stage: "Offered", students: 290 },
                    { stage: "Placed", students: 265 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="students" fill="#10b981" stroke="#10b981" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Performing Students */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Performing Students</CardTitle>
                  <CardDescription>Students with highest packages</CardDescription>
                </div>
                <Button variant="outline">View All Students</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStudentsData.map((student) => (
                  <div
                    key={student.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">
                          {student.department} • CGPA: {student.cgpa}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <div className="text-right">
                        <div className="font-medium text-green-600">{student.package}</div>
                        <div className="text-sm text-gray-500">{student.company}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Batch Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Batch Performance Comparison</CardTitle>
              <CardDescription>Year-on-year placement performance</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { year: "2020", placementRate: 68, avgPackage: 6.2 },
                    { year: "2021", placementRate: 72, avgPackage: 6.8 },
                    { year: "2022", placementRate: 75, avgPackage: 7.1 },
                    { year: "2023", placementRate: 74, avgPackage: 7.4 },
                    { year: "2024", placementRate: 78, avgPackage: 7.8 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6366f1" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="placementRate" name="Placement Rate (%)" fill="#10b981" />
                  <Bar yAxisId="right" dataKey="avgPackage" name="Avg. Package (LPA)" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recruiter Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          {/* Feedback Overview */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall Recruiter Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">4.2/5</div>
                <Progress value={84} className="h-2 mt-2" />
                <p className="text-xs text-gray-500 mt-2">Based on feedback from 28 employers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Technical Skills Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">4.4/5</div>
                <Progress value={88} className="h-2 mt-2" />
                <p className="text-xs text-gray-500 mt-2">Based on feedback from 28 employers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Soft Skills Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">3.9/5</div>
                <Progress value={78} className="h-2 mt-2" />
                <p className="text-xs text-gray-500 mt-2">Based on feedback from 28 employers</p>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback Analysis</CardTitle>
              <CardDescription>Common strengths and areas for improvement mentioned by recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-3 text-green-600 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Key Strengths
                  </h3>
                  <div className="space-y-2">
                    {[
                      { strength: "Technical knowledge", count: 24 },
                      { strength: "Problem solving abilities", count: 22 },
                      { strength: "Adaptability", count: 18 },
                      { strength: "Theoretical foundation", count: 17 },
                      { strength: "Learning ability", count: 15 },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.strength}</span>
                        <Badge variant="outline">{item.count} mentions</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-amber-600 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-2">
                    {[
                      { area: "Communication skills", count: 20 },
                      { area: "Practical experience", count: 18 },
                      { area: "Industry tool familiarity", count: 16 },
                      { area: "Project experience", count: 14 },
                      { area: "Team collaboration", count: 12 },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.area}</span>
                        <Badge variant="outline">{item.count} mentions</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Recruiter Feedback</CardTitle>
                  <CardDescription>Detailed feedback from recruiting companies</CardDescription>
                </div>
                <Button variant="outline">Collect New Feedback</Button>
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
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 font-medium">{feedback.rating}</span>
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

                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Respond
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feedback Collection Form */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback Collection</CardTitle>
              <CardDescription>Tools to gather structured feedback from recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Feedback Templates</h3>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium">General Recruitment Feedback</div>
                        <div className="text-xs text-gray-500">For overall recruitment process feedback</div>
                      </div>
                      <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium">Technical Skills Assessment</div>
                        <div className="text-xs text-gray-500">Focused on technical capabilities</div>
                      </div>
                      <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium">Soft Skills Evaluation</div>
                        <div className="text-xs text-gray-500">Communication, teamwork, and adaptability</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Feedback Collection Methods</h3>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium">Email Surveys</div>
                        <div className="text-xs text-gray-500">Send automated feedback requests</div>
                      </div>
                      <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium">Interview Debrief</div>
                        <div className="text-xs text-gray-500">Structured post-interview feedback</div>
                      </div>
                      <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium">Placement Follow-up</div>
                        <div className="text-xs text-gray-500">Feedback after 3 months of placement</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button>Create New Feedback Request</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

