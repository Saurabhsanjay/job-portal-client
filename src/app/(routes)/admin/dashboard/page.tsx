"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, FileText, CheckCircle } from "lucide-react"
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

// Sample data
const userRegistrationData = [
  { day: "Mon", jobSeekers: 45, employers: 12 },
  { day: "Tue", jobSeekers: 525, employers: 15 },
  { day: "Wed", jobSeekers: 49, employers: 10 },
  { day: "Thu", jobSeekers: 63, employers: 18 },
  { day: "Fri", jobSeekers: 58, employers: 14 },
  { day: "Sat", jobSeekers: 32, employers: 8 },
  { day: "Sun", jobSeekers: 28, employers: 6 },
]

const jobPostingData = [
  { day: "Mon", postings: 12 },
  { day: "Tue", postings: 18 },
  { day: "Wed", postings: 15 },
  { day: "Thu", postings: 22 },
  { day: "Fri", postings: 19 },
  { day: "Sat", postings: 8 },
  { day: "Sun", postings: 5 },
]

const applicationData = [
  { day: "Mon", applications: 85 },
  { day: "Tue", applications: 102 },
  { day: "Wed", applications: 91 },
  { day: "Thu", applications: 125 },
  { day: "Fri", applications: 118 },
  { day: "Sat", applications: 62 },
  { day: "Sun", applications: 45 },
]

const topJobCategories = [
  { name: "Software Development", value: 35 },
  { name: "Marketing", value: 25 },
  { name: "Design", value: 20 },
  { name: "Sales", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const topEmployers = [
  {
    id: 1,
    name: "Tech Innovations",
    jobPostings: 24,
    hires: 12,
    avatar: "/texas-instruments-logo.png",
  },
  {
    id: 2,
    name: "Global Solutions",
    jobPostings: 18,
    hires: 8,
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    id: 3,
    name: "Creative Designs",
    jobPostings: 15,
    hires: 6,
    avatar: "/compact-disc.png",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8 bg-gray-50 p-2 md:p-4 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>Platform Settings</Button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,845</div>
            <div className="flex justify-between items-center text-xs">
              <span>10,624 Job Seekers</span>
              <span>2,221 Employers</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Job Postings</CardTitle>
            <Briefcase className="h-4 w-4 text-green-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,186</div>
            <div className="flex justify-between items-center text-xs">
              <span>186 new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications Submitted</CardTitle>
            <FileText className="h-4 w-4 text-amber-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,642</div>
            <div className="flex justify-between items-center text-xs">
              <span>628 today</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">386</div>
            <div className="flex justify-between items-center text-xs">
              <span>24 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged or Reported Jobs</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-100" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <div className="flex justify-between items-center text-xs">
              <span>4 this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Activity Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="jobseekers">Job Seekers</TabsTrigger>
          <TabsTrigger value="employers">Employers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* User Registration and Job Posting Trends */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">User Registration Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userRegistrationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="jobSeekers" name="Job Seekers" fill="#3b82f6" />
                      <Bar dataKey="employers" name="Employers" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Job Posting & Application Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={applicationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="applications" name="Applications" stroke="#8884d8" />
                      <Line type="monotone" dataKey="postings" name="Job Postings" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Job Categories */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Top Job Categories</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topJobCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {topJobCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 w-full">
                {topJobCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm">
                      {category.name}: {category.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobseekers" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Job Seeker Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Age Distribution</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div>
                        <div className="bg-blue-100 text-blue-800 p-2 rounded-md">18-24</div>
                        <div className="mt-1">28%</div>
                      </div>
                      <div>
                        <div className="bg-blue-200 text-blue-800 p-2 rounded-md">25-34</div>
                        <div className="mt-1">42%</div>
                      </div>
                      <div>
                        <div className="bg-blue-300 text-blue-800 p-2 rounded-md">35-44</div>
                        <div className="mt-1">22%</div>
                      </div>
                      <div>
                        <div className="bg-blue-400 text-blue-800 p-2 rounded-md">45+</div>
                        <div className="mt-1">8%</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Experience Level</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Entry Level</span>
                          <span>35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Mid Level</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Senior Level</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Top Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">JavaScript</Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">React</Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Python</Badge>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Data Analysis</Badge>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Project Management</Badge>
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">UX Design</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Job Seeker Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Most Applied Job Types</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Remote Positions</span>
                          <span>42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Full-time Positions</span>
                          <span>35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Contract Positions</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Part-time Positions</span>
                          <span>8%</span>
                        </div>
                        <Progress value={8} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Application Status</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Pending Review</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Interview Stage</span>
                          <span>28%</span>
                        </div>
                        <Progress value={28} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Rejected</span>
                          <span>18%</span>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Hired</span>
                          <span>9%</span>
                        </div>
                        <Progress value={9} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employers" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">Top Performing Employers</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEmployers.map((employer) => (
                    <div
                      key={employer.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={employer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{employer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employer.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{employer.jobPostings} job postings</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Employers
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Employer Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Employer Distribution by Size</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Small (1-50 employees)</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Medium (51-200 employees)</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Large (201-1000 employees)</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Enterprise (1000+ employees)</span>
                          <span>10%</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Industry Distribution</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Technology</span>
                          <span>38%</span>
                        </div>
                        <Progress value={38} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Healthcare</span>
                          <span>22%</span>
                        </div>
                        <Progress value={22} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Finance</span>
                          <span>18%</span>
                        </div>
                        <Progress value={18} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Other Industries</span>
                          <span>22%</span>
                        </div>
                        <Progress value={22} className="h-2" />
                      </div>
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
