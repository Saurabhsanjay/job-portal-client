"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Building, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Progress } from "@/components/ui/progress"

const placementData = [
  { month: "Jan", placements: 24, interviews: 45 },
  { month: "Feb", placements: 28, interviews: 52 },
  { month: "Mar", placements: 32, interviews: 58 },
  { month: "Apr", placements: 38, interviews: 65 },
  { month: "May", placements: 42, interviews: 72 },
  { month: "Jun", placements: 48, interviews: 80 },
]

const skillGapData = [
  { name: "Technical", value: 35 },
  { name: "Soft Skills", value: 25 },
  { name: "Domain Knowledge", value: 20 },
  { name: "Communication", value: 15 },
  { name: "Leadership", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const topEmployers = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    hires: 18,
    openings: 5,
    rating: 4.8,
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Global Finance Group",
    hires: 15,
    openings: 3,
    rating: 4.6,
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Creative Design Studio",
    hires: 12,
    openings: 4,
    rating: 4.5,
    avatar: "/placeholder.svg",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Campus Recruitment Drive",
    date: "2024-03-20T10:00:00",
    company: "Tech Solutions Inc.",
    type: "On-Campus",
    priority: "High",
  },
  {
    id: 2,
    title: "Resume Building Workshop",
    date: "2024-03-22T14:30:00",
    company: "Career Services",
    type: "Workshop",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Mock Interview Sessions",
    date: "2024-03-25T09:00:00",
    company: "Multiple Employers",
    type: "Training",
    priority: "High",
  },
]

const studentPerformance = [
  {
    id: 1,
    name: "Computer Science",
    students: 120,
    placed: 98,
    placementRate: 82,
    avgPackage: "₹8.5L",
  },
  {
    id: 2,
    name: "Electronics Engineering",
    students: 85,
    placed: 65,
    placementRate: 76,
    avgPackage: "₹7.2L",
  },
  {
    id: 3,
    name: "Business Administration",
    students: 110,
    placed: 78,
    placementRate: 71,
    avgPackage: "₹6.8L",
  },
  {
    id: 4,
    name: "Data Science",
    students: 65,
    placed: 58,
    placementRate: 89,
    avgPackage: "₹9.2L",
  },
]

const skillDevelopmentPrograms = [
  {
    id: 1,
    title: "Full Stack Development",
    enrolled: 85,
    completed: 62,
    progress: 73,
    duration: "8 weeks",
  },
  {
    id: 2,
    title: "Data Analytics Essentials",
    enrolled: 65,
    completed: 48,
    progress: 74,
    duration: "6 weeks",
  },
  {
    id: 3,
    title: "Business Communication",
    enrolled: 120,
    completed: 95,
    progress: 79,
    duration: "4 weeks",
  },
]

export default function InstitutionalDashboard() {
  return (
    <div className="space-y-8 bg-gray-50 md:p-2 rounded-xl">
      {/* Top Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Students", value: "1,245", subtext: "85 graduating this month", icon: Users, color: "green" },
          {
            title: "Placement Rate",
            value: "78%",
            subtext: "↑ 12% from last year",
            icon: TrendingUp,
            color: "green",
          },
          {
            title: "Employer Partners",
            value: "86",
            subtext: "12 new this semester",
            icon: Building,
            color: "green",
          },
          {
            title: "Avg. Starting Salary",
            value: "₹7.2L",
            subtext: "↑ 8% from last year",
            icon: Award,
            color: "green",
          },
        ].map((item, index) => (
          <Card
            key={index}
            className={`bg-white border-l-4 border-${item.color}-500 shadow-sm hover:shadow-md transition-shadow`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 text-${item.color}-500`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="placements">Placements</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="employers">Employers</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Placement Trends and Skill Gap Analysis */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Placement Trends */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Placement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={placementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="placements" name="Placements" stroke="#10b981" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="interviews"
                        name="Interviews"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Skill Gap Analysis */}
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Skill Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
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
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  Areas where students need additional training based on employer feedback
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Upcoming Events</CardTitle>
                <Button variant="outline">Manage Events</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>{event.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      <Badge variant={event.priority === "High" ? "destructive" : "outline"}>{event.priority}</Badge>
                      <Badge>{event.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placements Tab */}
        <TabsContent value="placements" className="space-y-6">
          {/* Department-wise Placement Performance */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Department-wise Placement Performance</CardTitle>
                <Button variant="outline">Export Report</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentPerformance.map((dept) => (
                  <div
                    key={dept.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-sm text-gray-500">{dept.students} students</p>
                    </div>
                    <div className="w-full sm:w-1/3 my-2 sm:my-0">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{dept.placed} placed</span>
                        <span>{dept.placementRate}%</span>
                      </div>
                      <Progress value={dept.placementRate} className="h-2" />
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Avg. Package</p>
                      <p className="text-green-600 font-bold">{dept.avgPackage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Employers */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Top Recruiting Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEmployers.map((employer) => (
                  <div
                    key={employer.id}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={employer.avatar} />
                        <AvatarFallback>{employer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employer.name}</p>
                        <p className="text-sm text-gray-500">{employer.hires} students hired</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <div className="text-right">
                        <div className="font-medium">{employer.openings} current openings</div>
                        <div className="text-sm text-amber-600">★ {employer.rating} rating</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-4">
                  <Button variant="outline">View All Partners</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          {/* Skill Development Programs */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Skill Development Programs</CardTitle>
                <Button variant="outline">Create New Program</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillDevelopmentPrograms.map((program) => (
                  <div
                    key={program.id}
                    className="flex flex-col p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{program.title}</h3>
                      <Badge variant="outline">{program.duration}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                      <div>
                        <p className="text-sm text-gray-500">Enrolled</p>
                        <p className="font-medium">{program.enrolled} students</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Completed</p>
                        <p className="font-medium">{program.completed} students</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion Rate</span>
                        <span>{program.progress}%</span>
                      </div>
                      <Progress value={program.progress} className="h-2" />
                    </div>
                    <div className="flex justify-end mt-3">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit Program
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Industry Skill Demand */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Industry Skill Demand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { skill: "Cloud Computing", demand: 85, growth: 15 },
                      { skill: "Data Science", demand: 78, growth: 22 },
                      { skill: "AI/ML", demand: 72, growth: 28 },
                      { skill: "DevOps", demand: 68, growth: 18 },
                      { skill: "Cybersecurity", demand: 65, growth: 25 },
                      { skill: "UI/UX Design", demand: 58, growth: 12 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="demand" name="Demand Score" fill="#10b981" />
                    <Bar dataKey="growth" name="YoY Growth %" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline">Align Curriculum</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employers Tab */}
        <TabsContent value="employers" className="space-y-6">
          {/* Employer Engagement */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Employer Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: "Jan", visits: 5, interviews: 12, offers: 8 },
                      { month: "Feb", visits: 7, interviews: 15, offers: 10 },
                      { month: "Mar", visits: 4, interviews: 18, offers: 12 },
                      { month: "Apr", visits: 8, interviews: 22, offers: 15 },
                      { month: "May", visits: 10, interviews: 28, offers: 18 },
                      { month: "Jun", visits: 6, interviews: 20, offers: 14 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visits" name="Campus Visits" stroke="#8884d8" />
                    <Line type="monotone" dataKey="interviews" name="Interviews" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="offers" name="Offers Made" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Industry Feedback */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Industry Feedback</CardTitle>
                <Button variant="outline">Request Feedback</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Technical Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-500">4.2/5</div>
                      <Progress value={84} className="h-2 mt-2" />
                      <p className="text-xs text-gray-500 mt-2">Based on feedback from 28 employers</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Communication Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-500">3.8/5</div>
                      <Progress value={76} className="h-2 mt-2" />
                      <p className="text-xs text-gray-500 mt-2">Based on feedback from 28 employers</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Problem Solving</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-amber-500">4.0/5</div>
                      <Progress value={80} className="h-2 mt-2" />
                      <p className="text-xs text-gray-500 mt-2">Based on feedback from 28 employers</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-2">Recent Feedback</h3>
                  <p className="text-sm text-gray-700 italic">
                    "Students from your institution demonstrate strong technical skills, but could benefit from more
                    exposure to real-world project scenarios and team collaboration experiences."
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">Tech Solutions Inc. - HR Director</span>
                    <Badge variant="outline">2 days ago</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

