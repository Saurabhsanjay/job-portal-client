"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  Search,
  Download,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  BarChart2,
  Zap,
  Target,
  CheckSquare,
  AlertTriangle,
  ChevronRight,
  Cloud,
} from "lucide-react"

const SkillDevelopment = () => {
  const [activeTab, setActiveTab] = useState("training-modules")
  const [showNewModuleDialog, setShowNewModuleDialog] = useState(false)
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [showSkillGapDialog, setShowSkillGapDialog] = useState(false)

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        {/* <div>
          <h1 className="text-3xl font-bold text-gray-900">Skill Development Programs</h1>
          <p className="text-gray-500 mt-1">Design, track, and optimize skill development initiatives for students</p>
        </div> */}
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Data
          </Button>
          <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Plus size={16} />
            New Program
          </Button>
        </div>
      </div>

      <Tabs defaultValue="training-modules" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="training-modules">Customizable Training Modules</TabsTrigger>
          <TabsTrigger value="progress-tracking">Progress Tracking</TabsTrigger>
          <TabsTrigger value="skill-gap">Skill Gap Reports</TabsTrigger>
        </TabsList>

        {/* Customizable Training Modules Tab */}
        <TabsContent value="training-modules" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search modules..." className="pl-8 w-[300px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technical">Technical Skills</SelectItem>
                  <SelectItem value="soft">Soft Skills</SelectItem>
                  <SelectItem value="domain">Domain Knowledge</SelectItem>
                  <SelectItem value="certification">Certification Prep</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setShowNewModuleDialog(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Create Module
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Technical Interview Prep Module */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Technical</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">Technical Interview Preparation</CardTitle>
                <CardDescription>
                  Comprehensive program to prepare students for technical interviews in IT sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">8 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sessions:</span>
                    <span className="font-medium">24 sessions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Enrolled:</span>
                    <span className="font-medium">128 students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="font-medium text-green-600">87%</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Student Satisfaction</span>
                      <span className="font-medium">4.7/5</span>
                    </div>
                    <Progress value={94} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowAssignDialog(true)}>
                  Assign to Students
                </Button>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            {/* Soft Skills Module */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Soft Skills</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">Communication Excellence</CardTitle>
                <CardDescription>Develop professional communication skills for workplace success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">6 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sessions:</span>
                    <span className="font-medium">12 sessions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Enrolled:</span>
                    <span className="font-medium">95 students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="font-medium text-green-600">92%</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Student Satisfaction</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                    <Progress value={96} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowAssignDialog(true)}>
                  Assign to Students
                </Button>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            {/* Certification Prep Module */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Certification</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">AWS Cloud Practitioner</CardTitle>
                <CardDescription>Preparation program for AWS Certified Cloud Practitioner exam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">4 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sessions:</span>
                    <span className="font-medium">16 sessions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Enrolled:</span>
                    <span className="font-medium">64 students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="font-medium text-amber-600">76%</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Student Satisfaction</span>
                      <span className="font-medium">4.5/5</span>
                    </div>
                    <Progress value={90} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowAssignDialog(true)}>
                  Assign to Students
                </Button>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            {/* Domain Knowledge Module */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Domain</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">FinTech Fundamentals</CardTitle>
                <CardDescription>Introduction to financial technology concepts and applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">10 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sessions:</span>
                    <span className="font-medium">20 sessions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Enrolled:</span>
                    <span className="font-medium">42 students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="font-medium text-green-600">82%</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Student Satisfaction</span>
                      <span className="font-medium">4.6/5</span>
                    </div>
                    <Progress value={92} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowAssignDialog(true)}>
                  Assign to Students
                </Button>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            {/* Job Readiness Module */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100">Job Prep</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">Job Readiness Bootcamp</CardTitle>
                <CardDescription>
                  Comprehensive preparation for job search, interviews, and workplace readiness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">3 weeks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sessions:</span>
                    <span className="font-medium">15 sessions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Enrolled:</span>
                    <span className="font-medium">156 students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Completion Rate:</span>
                    <span className="font-medium text-green-600">94%</span>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Student Satisfaction</span>
                      <span className="font-medium">4.9/5</span>
                    </div>
                    <Progress value={98} className="h-2 bg-gray-100" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setShowAssignDialog(true)}>
                  Assign to Students
                </Button>
                <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                  View Details
                </Button>
              </CardFooter>
            </Card>

            {/* Add New Module Card */}
            <Card
              className="border-dashed border-2 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setShowNewModuleDialog(true)}
            >
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Create New Module</h3>
              <p className="text-gray-500 text-sm text-center">Design a custom training module for your students</p>
            </Card>
          </div>
        </TabsContent>

        {/* Progress Tracking Tab */}
        <TabsContent value="progress-tracking" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Overall Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-3xl font-bold">78%</span>
                        <p className="text-sm text-gray-500">Completion Rate</p>
                      </div>
                    </div>
                    <svg className="h-40 w-40" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-100"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-600"
                        strokeWidth="10"
                        strokeDasharray={78 * 2.51}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Total Programs</p>
                    <p className="text-xl font-semibold">24</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Active Students</p>
                    <p className="text-xl font-semibold">342</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Program Participation</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Technical", students: 128, completion: 87 },
                        { name: "Soft Skills", students: 95, completion: 92 },
                        { name: "Domain", students: 42, completion: 82 },
                        { name: "Certification", students: 64, completion: 76 },
                        { name: "Job Prep", students: 156, completion: 94 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" name="Enrolled Students" fill="#10b981" />
                      <Bar dataKey="completion" name="Completion %" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Certification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Completed", value: 156, color: "#10b981" },
                          { name: "In Progress", value: 98, color: "#f59e0b" },
                          { name: "Not Started", value: 64, color: "#6b7280" },
                          { name: "Failed", value: 24, color: "#ef4444" },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {[
                          { name: "Completed", value: 156, color: "#10b981" },
                          { name: "In Progress", value: 98, color: "#f59e0b" },
                          { name: "Not Started", value: 64, color: "#6b7280" },
                          { name: "Failed", value: 24, color: "#ef4444" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Student Progress Tracking</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search students..." className="pl-8 w-[250px]" />
                  </div>
                  <Select defaultValue="all-programs">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-programs">All Programs</SelectItem>
                      <SelectItem value="technical">Technical Interview Prep</SelectItem>
                      <SelectItem value="communication">Communication Excellence</SelectItem>
                      <SelectItem value="aws">AWS Cloud Practitioner</SelectItem>
                      <SelectItem value="fintech">FinTech Fundamentals</SelectItem>
                      <SelectItem value="job-readiness">Job Readiness Bootcamp</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download size={16} />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Certifications</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Aisha Patel</TableCell>
                    <TableCell>Technical Interview Preparation</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="h-2 w-24" />
                        <span className="text-sm">85%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-800 border border-white">
                          JS
                        </div>
                        <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-800 border border-white">
                          DS
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">Today, 10:42 AM</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Raj Singh</TableCell>
                    <TableCell>AWS Cloud Practitioner</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={62} className="h-2 w-24" />
                        <span className="text-sm">62%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-xs text-amber-800 border border-white">
                          AZ
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">Yesterday, 3:15 PM</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Attention</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Johnson</TableCell>
                    <TableCell>Communication Excellence</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={100} className="h-2 w-24" />
                        <span className="text-sm">100%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-800 border border-white">
                          CE
                        </div>
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-800 border border-white">
                          PL
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">2 days ago</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Michael Chen</TableCell>
                    <TableCell>FinTech Fundamentals</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="h-2 w-24" />
                        <span className="text-sm">45%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-800 border border-white">
                          FF
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">3 days ago</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Behind Schedule</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Emily Rodriguez</TableCell>
                    <TableCell>Job Readiness Bootcamp</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="h-2 w-24" />
                        <span className="text-sm">92%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full bg-rose-100 flex items-center justify-center text-xs text-rose-800 border border-white">
                          JR
                        </div>
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-800 border border-white">
                          IV
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">Today, 9:30 AM</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">Showing 5 of 342 students</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-gray-100">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Webinar & Workshop Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", attendance: 65, target: 70 },
                        { month: "Feb", attendance: 72, target: 70 },
                        { month: "Mar", attendance: 68, target: 70 },
                        { month: "Apr", attendance: 75, target: 75 },
                        { month: "May", attendance: 82, target: 75 },
                        { month: "Jun", attendance: 78, target: 75 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="attendance"
                        name="Attendance %"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line type="monotone" dataKey="target" name="Target %" stroke="#6b7280" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Total Webinars</p>
                    <p className="text-xl font-semibold">24</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Avg. Attendance</p>
                    <p className="text-xl font-semibold">73%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Upcoming</p>
                    <p className="text-xl font-semibold">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certification Completion Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "AWS", completed: 42, inProgress: 28, notStarted: 14 },
                        { name: "Azure", completed: 36, inProgress: 22, notStarted: 18 },
                        { name: "Google", completed: 28, inProgress: 18, notStarted: 12 },
                        { name: "Salesforce", completed: 24, inProgress: 16, notStarted: 10 },
                        { name: "Agile", completed: 48, inProgress: 24, notStarted: 8 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" stackId="a" fill="#10b981" />
                      <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#f59e0b" />
                      <Bar dataKey="notStarted" name="Not Started" stackId="a" fill="#6b7280" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Total Certifications</p>
                    <p className="text-xl font-semibold">342</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Pass Rate</p>
                    <p className="text-xl font-semibold">86%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Avg. Completion Time</p>
                    <p className="text-xl font-semibold">4.2 weeks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skill Gap Reports Tab */}
        <TabsContent value="skill-gap" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Overall Skill Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      outerRadius={90}
                      data={[
                        { subject: "Technical", A: 85, B: 95, fullMark: 100 },
                        { subject: "Soft Skills", A: 78, B: 90, fullMark: 100 },
                        { subject: "Domain", A: 65, B: 85, fullMark: 100 },
                        { subject: "Leadership", A: 70, B: 80, fullMark: 100 },
                        { subject: "Problem Solving", A: 82, B: 90, fullMark: 100 },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Current Level" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                      <Radar name="Required Level" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setShowSkillGapDialog(true)}
                  >
                    Generate Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Top Skill Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cloud Computing</span>
                      <span className="text-sm text-gray-500">Gap: 22%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "22%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Data Analysis</span>
                      <span className="text-sm text-gray-500">Gap: 18%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">AI/ML Fundamentals</span>
                      <span className="text-sm text-gray-500">Gap: 15%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Project Management</span>
                      <span className="text-sm text-gray-500">Gap: 12%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Business Communication</span>
                      <span className="text-sm text-gray-500">Gap: 8%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    View All Skill Gaps
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Recommended Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-blue-100 p-2 mt-1">
                      <Cloud className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">AWS Cloud Practitioner</h4>
                      <p className="text-xs text-gray-500 mt-1">Addresses 22% skill gap in Cloud Computing</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">High Priority</Badge>
                        <span className="text-xs text-gray-500">8 weeks</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-purple-100 p-2 mt-1">
                      <BarChart2 className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Data Analysis Fundamentals</h4>
                      <p className="text-xs text-gray-500 mt-1">Addresses 18% skill gap in Data Analysis</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">High Priority</Badge>
                        <span className="text-xs text-gray-500">6 weeks</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="rounded-full bg-amber-100 p-2 mt-1">
                      <Zap className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">AI/ML Foundations</h4>
                      <p className="text-xs text-gray-500 mt-1">Addresses 15% skill gap in AI/ML Fundamentals</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs">
                          Medium Priority
                        </Badge>
                        <span className="text-xs text-gray-500">10 weeks</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Create Custom Program</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Industry Skill Demand vs. Student Proficiency</CardTitle>
                <Select defaultValue="all-departments">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-departments">All Departments</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="information-technology">Information Technology</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="business">Business Administration</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Cloud Computing", industry: 95, student: 73 },
                      { name: "Data Analysis", industry: 90, student: 72 },
                      { name: "AI/ML", industry: 85, student: 70 },
                      { name: "DevOps", industry: 80, student: 65 },
                      { name: "Cybersecurity", industry: 88, student: 75 },
                      { name: "Agile/Scrum", industry: 82, student: 74 },
                      { name: "UI/UX Design", industry: 78, student: 68 },
                      { name: "Mobile Dev", industry: 75, student: 70 },
                      { name: "Blockchain", industry: 70, student: 60 },
                      { name: "AR/VR", industry: 65, student: 55 },
                    ]}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="industry" name="Industry Demand" fill="#6366f1" />
                    <Bar dataKey="student" name="Student Proficiency" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Highest Skill Gap</h4>
                        <p className="text-sm text-gray-600 mt-1">Cloud Computing (22%)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Strongest Skill Area</h4>
                        <p className="text-sm text-gray-600 mt-1">Cybersecurity (13% gap)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-amber-100 p-2">
                        <Target className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Recommended Focus</h4>
                        <p className="text-sm text-gray-600 mt-1">Cloud & Data Skills</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Skill Gap Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Computer Science</h4>
                      <span className="text-sm text-gray-500">Avg. Gap: 14%</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cloud Computing</span>
                          <span className="text-red-500">20%</span>
                        </div>
                        <Progress value={20} className="h-1.5 bg-gray-100 bg-red-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>AI/ML</span>
                          <span className="text-amber-500">15%</span>
                        </div>
                        <Progress value={15} className="h-1.5 bg-gray-100 bg-amber-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>DevOps</span>
                          <span className="text-green-500">8%</span>
                        </div>
                        <Progress value={8} className="h-1.5 bg-gray-100 bg-green-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Information Technology</h4>
                      <span className="text-sm text-gray-500">Avg. Gap: 16%</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Data Analysis</span>
                          <span className="text-red-500">22%</span>
                        </div>
                        <Progress value={22} className="h-1.5 bg-gray-100 bg-red-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Cybersecurity</span>
                          <span className="text-amber-500">14%</span>
                        </div>
                        <Progress value={14} className="h-1.5 bg-gray-100 bg-amber-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>UI/UX Design</span>
                          <span className="text-amber-500">12%</span>
                        </div>
                        <Progress value={12} className="h-1.5 bg-gray-100 bg-amber-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Business Administration</h4>
                      <span className="text-sm text-gray-500">Avg. Gap: 18%</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Data Analysis</span>
                          <span className="text-red-500">24%</span>
                        </div>
                        <Progress value={24} className="h-1.5 bg-gray-100 bg-red-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Project Management</span>
                          <span className="text-amber-500">16%</span>
                        </div>
                        <Progress value={16} className="h-1.5 bg-gray-100 bg-amber-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Digital Marketing</span>
                          <span className="text-amber-500">14%</span>
                        </div>
                        <Progress value={14} className="h-1.5 bg-gray-100 bg-amber-500" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    View Detailed Department Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Trends Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Jan", technical: 22, soft: 18, domain: 24 },
                        { month: "Feb", technical: 20, soft: 16, domain: 22 },
                        { month: "Mar", technical: 18, soft: 15, domain: 20 },
                        { month: "Apr", technical: 16, soft: 14, domain: 18 },
                        { month: "May", technical: 15, soft: 12, domain: 16 },
                        { month: "Jun", technical: 14, soft: 10, domain: 15 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="technical"
                        name="Technical Skills Gap %"
                        stroke="#6366f1"
                        strokeWidth={2}
                      />
                      <Line type="monotone" dataKey="soft" name="Soft Skills Gap %" stroke="#10b981" strokeWidth={2} />
                      <Line
                        type="monotone"
                        dataKey="domain"
                        name="Domain Knowledge Gap %"
                        stroke="#f59e0b"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Key Insights</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Overall skill gaps reduced by 8% in the last 6 months</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckSquare className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Soft skills showing the most improvement (8% reduction)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <span>Domain knowledge gaps still need significant attention</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Generate Trend Analysis Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create New Module Dialog */}
      <Dialog open={showNewModuleDialog} onOpenChange={setShowNewModuleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Training Module</DialogTitle>
            <DialogDescription>Design a customized skill development program for your students.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-name" className="text-right">
                Module Name
              </Label>
              <Input id="module-name" placeholder="e.g., Python for Data Science" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-category" className="text-right">
                Category
              </Label>
              <Select defaultValue="technical">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Skills</SelectItem>
                  <SelectItem value="soft">Soft Skills</SelectItem>
                  <SelectItem value="domain">Domain Knowledge</SelectItem>
                  <SelectItem value="certification">Certification Prep</SelectItem>
                  <SelectItem value="job-prep">Job Preparation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-duration" className="text-right">
                Duration
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input id="module-duration" type="number" placeholder="e.g., 8" className="w-20" />
                <Select defaultValue="weeks">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="module-sessions" className="text-right">
                Sessions
              </Label>
              <Input id="module-sessions" type="number" placeholder="e.g., 16" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="module-description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="module-description"
                placeholder="Provide a brief description of the module..."
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Learning Outcomes</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Input placeholder="e.g., Understand basic Python syntax" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="e.g., Create data visualizations with matplotlib" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="e.g., Build machine learning models with scikit-learn" />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  Add Outcome
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Assessment Methods</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="assessment-quiz" />
                  <Label htmlFor="assessment-quiz" className="font-normal">
                    Quizzes
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="assessment-project" defaultChecked />
                  <Label htmlFor="assessment-project" className="font-normal">
                    Projects
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="assessment-exam" />
                  <Label htmlFor="assessment-exam" className="font-normal">
                    Final Exam
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="assessment-peer" />
                  <Label htmlFor="assessment-peer" className="font-normal">
                    Peer Review
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="assessment-presentation" defaultChecked />
                  <Label htmlFor="assessment-presentation" className="font-normal">
                    Presentations
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewModuleDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowNewModuleDialog(false)}>
              Create Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Module Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Module to Students</DialogTitle>
            <DialogDescription>Select students or groups to assign this training module.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Tabs defaultValue="students">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="students">Individual Students</TabsTrigger>
                <TabsTrigger value="batches">Batches</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
              </TabsList>
              <TabsContent value="students" className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search students..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ds">Data Science</SelectItem>
                      <SelectItem value="ba">Business Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ScrollArea className="h-[300px] border rounded-md">
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-1" />
                      <Label htmlFor="student-1" className="font-normal">
                        Aisha Patel (CS-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-2" />
                      <Label htmlFor="student-2" className="font-normal">
                        Raj Singh (IT-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-3" />
                      <Label htmlFor="student-3" className="font-normal">
                        Sarah Johnson (DS-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-4" />
                      <Label htmlFor="student-4" className="font-normal">
                        Michael Chen (CS-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-5" />
                      <Label htmlFor="student-5" className="font-normal">
                        Emily Rodriguez (BA-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-6" />
                      <Label htmlFor="student-6" className="font-normal">
                        David Kim (IT-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-7" />
                      <Label htmlFor="student-7" className="font-normal">
                        Priya Sharma (CS-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-8" />
                      <Label htmlFor="student-8" className="font-normal">
                        James Wilson (DS-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-9" />
                      <Label htmlFor="student-9" className="font-normal">
                        Olivia Martinez (BA-2023)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="student-10" />
                      <Label htmlFor="student-10" className="font-normal">
                        Wei Zhang (CS-2023)
                      </Label>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="batches" className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search batches..." className="pl-8" />
                  </div>
                </div>
                <ScrollArea className="h-[300px] border rounded-md">
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="batch-1" />
                      <Label htmlFor="batch-1" className="font-normal">
                        CS Batch 2023 (42 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="batch-2" />
                      <Label htmlFor="batch-2" className="font-normal">
                        IT Batch 2023 (38 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="batch-3" />
                      <Label htmlFor="batch-3" className="font-normal">
                        DS Batch 2023 (24 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="batch-4" />
                      <Label htmlFor="batch-4" className="font-normal">
                        BA Batch 2023 (56 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="batch-5" />
                      <Label htmlFor="batch-5" className="font-normal">
                        CS Batch 2022 (45 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="batch-6" />
                      <Label htmlFor="batch-6" className="font-normal">
                        IT Batch 2022 (40 students)
                      </Label>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="departments" className="space-y-4 pt-4">
                <ScrollArea className="h-[300px] border rounded-md">
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="dept-1" />
                      <Label htmlFor="dept-1" className="font-normal">
                        Computer Science (87 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dept-2" />
                      <Label htmlFor="dept-2" className="font-normal">
                        Information Technology (78 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dept-3" />
                      <Label htmlFor="dept-3" className="font-normal">
                        Data Science (24 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dept-4" />
                      <Label htmlFor="dept-4" className="font-normal">
                        Business Administration (56 students)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="dept-5" />
                      <Label htmlFor="dept-5" className="font-normal">
                        Engineering (64 students)
                      </Label>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="assignment-note">Note (Optional)</Label>
                <Textarea
                  id="assignment-note"
                  placeholder="Add any additional instructions or notes..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowAssignDialog(false)}>
              Assign Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Skill Gap Report Dialog */}
      <Dialog open={showSkillGapDialog} onOpenChange={setShowSkillGapDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detailed Skill Gap Report</DialogTitle>
            <DialogDescription>
              Comprehensive analysis of skill gaps and recommended improvement actions.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Overall Gap</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-500">16.4%</div>
                      <p className="text-sm text-gray-500 mt-1">Average skill gap across all domains</p>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Technical Skills</span>
                        <span className="font-medium">18.2%</span>
                      </div>
                      <Progress value={18.2} className="h-2 bg-gray-100" />
                      <div className="flex justify-between text-sm mb-1 mt-2">
                        <span>Soft Skills</span>
                        <span className="font-medium">12.5%</span>
                      </div>
                      <Progress value={12.5} className="h-2 bg-gray-100" />
                      <div className="flex justify-between text-sm mb-1 mt-2">
                        <span>Domain Knowledge</span>
                        <span className="font-medium">18.6%</span>
                      </div>
                      <Progress value={18.6} className="h-2 bg-gray-100" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Critical Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-red-100 p-1.5">
                          <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cloud Computing</p>
                          <p className="text-xs text-gray-500">22% gap - High Priority</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-red-100 p-1.5">
                          <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Data Analysis</p>
                          <p className="text-xs text-gray-500">18% gap - High Priority</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-1.5">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">AI/ML Fundamentals</p>
                          <p className="text-xs text-gray-500">15% gap - Medium Priority</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-1.5">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Project Management</p>
                          <p className="text-xs text-gray-500">12% gap - Medium Priority</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Improvement Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: "Jan", gap: 22 },
                            { month: "Feb", gap: 20 },
                            { month: "Mar", gap: 19 },
                            { month: "Apr", gap: 18 },
                            { month: "May", gap: 17 },
                            { month: "Jun", gap: 16.4 },
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis domain={[15, 25]} tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="gap"
                            name="Skill Gap %"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-sm font-medium text-green-600">5.6% Improvement</div>
                      <p className="text-xs text-gray-500">Over the last 6 months</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Technical Skills Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill</TableHead>
                      <TableHead>Current Level</TableHead>
                      <TableHead>Required Level</TableHead>
                      <TableHead>Gap</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Recommended Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Cloud Computing</TableCell>
                      <TableCell>73%</TableCell>
                      <TableCell>95%</TableCell>
                      <TableCell className="text-red-500">22%</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          AWS Cloud Practitioner Program
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Data Analysis</TableCell>
                      <TableCell>72%</TableCell>
                      <TableCell>90%</TableCell>
                      <TableCell className="text-red-500">18%</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          Data Analysis Fundamentals
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AI/ML</TableCell>
                      <TableCell>70%</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell className="text-amber-500">15%</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          AI/ML Foundations
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DevOps</TableCell>
                      <TableCell>65%</TableCell>
                      <TableCell>80%</TableCell>
                      <TableCell className="text-amber-500">15%</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          DevOps Essentials
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cybersecurity</TableCell>
                      <TableCell>75%</TableCell>
                      <TableCell>88%</TableCell>
                      <TableCell className="text-amber-500">13%</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          Security Fundamentals
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Soft Skills Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Skill</TableHead>
                      <TableHead>Current Level</TableHead>
                      <TableHead>Required Level</TableHead>
                      <TableHead>Gap</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Recommended Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Project Management</TableCell>
                      <TableCell>68%</TableCell>
                      <TableCell>80%</TableCell>
                      <TableCell className="text-amber-500">12%</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          Project Management Essentials
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Communication</TableCell>
                      <TableCell>76%</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell className="text-green-500">9%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          Communication Excellence
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Leadership</TableCell>
                      <TableCell>72%</TableCell>
                      <TableCell>80%</TableCell>
                      <TableCell className="text-green-500">8%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          Leadership Development
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Domain Knowledge Analysis</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>Current Level</TableHead>
                      <TableHead>Required Level</TableHead>
                      <TableHead>Gap</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Recommended Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">FinTech</TableCell>
                      <TableCell>62%</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell className="text-red-500">23%</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          FinTech Fundamentals
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Healthcare IT</TableCell>
                      <TableCell>65%</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell className="text-red-500">20%</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          Healthcare IT Essentials
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">E-commerce</TableCell>
                      <TableCell>70%</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell className="text-amber-500">15%</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-green-600">
                          E-commerce Fundamentals
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Recommended Action Plan</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">High Priority Actions (Next 30 Days)</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Launch AWS Cloud Practitioner Program</p>
                          <p className="text-xs text-gray-600">Target: 100 students from CS and IT departments</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Implement Data Analysis Fundamentals Course</p>
                          <p className="text-xs text-gray-600">Target: 80 students from Business and Data Science</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Organize FinTech Industry Workshop Series</p>
                          <p className="text-xs text-gray-600">
                            Target: All students with interest in financial sector
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Medium Priority Actions (60-90 Days)</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Launch AI/ML Foundations Program</p>
                          <p className="text-xs text-gray-600">Target: CS, IT and Data Science students</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Implement Project Management Certification</p>
                          <p className="text-xs text-gray-600">Target: Final year students across all departments</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Develop Healthcare IT Specialization Track</p>
                          <p className="text-xs text-gray-600">Target: Students interested in healthcare sector</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Long-term Strategy (6-12 Months)</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-gray-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Establish Industry Partnership Program</p>
                          <p className="text-xs text-gray-600">Create direct training pipelines with major employers</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-gray-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Develop Comprehensive Skill Development Platform</p>
                          <p className="text-xs text-gray-600">Integrate all training programs into unified system</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-gray-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Implement Continuous Skill Assessment Framework</p>
                          <p className="text-xs text-gray-600">
                            Regular evaluation and adjustment of training programs
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Export Report
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setShowSkillGapDialog(false)}>
                  Close
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowSkillGapDialog(false)}>
                  Implement Recommendations
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SkillDevelopment

