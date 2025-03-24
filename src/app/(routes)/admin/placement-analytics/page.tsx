"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  TrendingUp,
  Clock,
  Users,
  BarChart,
  PieChart,
  Download,
  Calendar,
  FileText,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertCircle,
  Building,
  Share2,
  Mail,
  Edit,
  Play,
  Trash,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart as RechartBarChart,
  Bar,
  Line,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts"

// Sample data for placement metrics
const placementMetrics = {
  overallSuccessRate: 78.5,
  averagePlacementTime: 42, // days
  matchRate: 65.2,
  activeJobSeekers: 8450,
  activeEmployers: 1250,
  totalPlacements: 3865,
  monthlyTrend: [
    { month: "Jan", placements: 285, successRate: 75.2 },
    { month: "Feb", placements: 310, successRate: 76.8 },
    { month: "Mar", placements: 342, successRate: 77.5 },
    { month: "Apr", placements: 325, successRate: 78.1 },
    { month: "May", placements: 368, successRate: 79.3 },
    { month: "Jun", placements: 352, successRate: 78.9 },
  ],
}

// Sample data for sector performance
const sectorPerformance = [
  {
    sector: "Technology",
    placements: 1245,
    growthRate: 15.2,
    avgSalary: 85000,
    demandScore: 92,
    topRoles: ["Software Engineer", "Data Scientist", "Product Manager"],
  },
  {
    sector: "Healthcare",
    placements: 865,
    growthRate: 12.8,
    avgSalary: 72000,
    demandScore: 88,
    topRoles: ["Registered Nurse", "Medical Technician", "Healthcare Administrator"],
  },
  {
    sector: "Finance",
    placements: 720,
    growthRate: 8.5,
    avgSalary: 78000,
    demandScore: 85,
    topRoles: ["Financial Analyst", "Investment Associate", "Risk Manager"],
  },
  {
    sector: "Manufacturing",
    placements: 540,
    growthRate: 5.2,
    avgSalary: 65000,
    demandScore: 76,
    topRoles: ["Production Manager", "Quality Control", "Supply Chain Specialist"],
  },
  {
    sector: "Education",
    placements: 495,
    growthRate: 6.8,
    avgSalary: 58000,
    demandScore: 79,
    topRoles: ["Teacher", "Educational Consultant", "Curriculum Developer"],
  },
]

// Sample data for regional performance
const regionalPerformance = [
  { region: "North", placements: 1250, growthRate: 12.5 },
  { region: "South", placements: 980, growthRate: 8.2 },
  { region: "East", placements: 845, growthRate: 10.8 },
  { region: "West", placements: 790, growthRate: 9.5 },
]

// Sample data for institutions
const institutions = [
  {
    id: 1,
    name: "Tech University",
    placements: 425,
    students: 1250,
    placementRate: 92,
    topEmployers: ["TechCorp", "Innovate Solutions", "DataSystems"],
    topSectors: ["Technology", "Finance", "Consulting"],
    avgPlacementTime: 35, // days
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Business Academy",
    placements: 380,
    students: 950,
    placementRate: 86,
    topEmployers: ["Global Finance", "ConsultCo", "Enterprise Inc"],
    topSectors: ["Finance", "Consulting", "Marketing"],
    avgPlacementTime: 42, // days
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Medical Institute",
    placements: 310,
    students: 780,
    placementRate: 89,
    topEmployers: ["Central Hospital", "MediCare", "Health Systems"],
    topSectors: ["Healthcare", "Pharmaceuticals", "Research"],
    avgPlacementTime: 38, // days
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Design College",
    placements: 265,
    students: 620,
    placementRate: 82,
    topEmployers: ["Creative Studios", "DesignWorks", "Media Solutions"],
    topSectors: ["Media", "Advertising", "Technology"],
    avgPlacementTime: 45, // days
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Engineering School",
    placements: 295,
    students: 850,
    placementRate: 88,
    topEmployers: ["BuildCorp", "TechSystems", "InfraWorks"],
    topSectors: ["Construction", "Technology", "Manufacturing"],
    avgPlacementTime: 40, // days
    avatar: "/placeholder.svg",
  },
]

// Sample data for skill demand
const skillDemand = [
  { name: "Programming", demand: 95, growth: 15 },
  { name: "Data Analysis", demand: 92, growth: 18 },
  { name: "Project Management", demand: 88, growth: 12 },
  { name: "Digital Marketing", demand: 85, growth: 14 },
  { name: "Healthcare", demand: 82, growth: 10 },
  { name: "Financial Analysis", demand: 80, growth: 8 },
  { name: "UI/UX Design", demand: 78, growth: 16 },
  { name: "Sales", demand: 75, growth: 5 },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function PlacementAnalytics() {
  const [searchInstitutions, setSearchInstitutions] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedSector, setSelectedSector] = useState("all")

  // Filter institutions based on search
  const filteredInstitutions = institutions.filter((institution) =>
    institution.name.toLowerCase().includes(searchInstitutions.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold tracking-tight">Placement Success Analytics</h1>
        <p className="text-muted-foreground">
          Analyze placement metrics, sector performance, and institutional success rates.
        </p>
      </div> */}

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Insights Dashboard
          </TabsTrigger>
          <TabsTrigger value="sectors" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Sector Performance
          </TabsTrigger>
          <TabsTrigger value="institutions" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Institutional Reports
          </TabsTrigger>
        </TabsList>

        {/* Insights Dashboard Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Placement Success Rate",
                value: `${placementMetrics.overallSuccessRate}%`,
                change: "+2.3%",
                changeType: "positive",
                icon: CheckCircle,
                color: "green",
              },
              {
                title: "Average Placement Time",
                value: `${placementMetrics.averagePlacementTime} days`,
                change: "-3 days",
                changeType: "positive",
                icon: Clock,
                color: "blue",
              },
              {
                title: "Job Seeker-Employer Match Rate",
                value: `${placementMetrics.matchRate}%`,
                change: "+1.8%",
                changeType: "positive",
                icon: Users,
                color: "purple",
              },
              {
                title: "Total Placements",
                value: placementMetrics.totalPlacements.toLocaleString(),
                change: "+352 this month",
                changeType: "positive",
                icon: Briefcase,
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
                    {metric.change} from last period
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Placement Success Trends</CardTitle>
                  <CardDescription>Track placement success rates and total placements over time.</CardDescription>
                </div>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="12months">Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={placementMetrics.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="placements" name="Total Placements" fill="#8884d8" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="successRate"
                      name="Success Rate %"
                      stroke="#ff7300"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Placement Funnel</CardTitle>
                <CardDescription>Conversion rates through the placement process</CardDescription>
              </CardHeader>
              <CardContent>
  <div className="space-y-6">
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-sm font-medium">Applications Submitted</span>
        </div>
        <span className="text-sm font-medium">12,450</span>
      </div>
      <Progress value={100} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
    </div>

    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium">Interviews Scheduled</span>
        </div>
        <span className="text-sm font-medium">8,320 (66.8%)</span>
      </div>
      <Progress value={66.8} className="h-2 bg-green-100 [&>div]:bg-green-500" />
    </div>

    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm font-medium">Offers Extended</span>
        </div>
        <span className="text-sm font-medium">5,180 (41.6%)</span>
      </div>
      <Progress value={41.6} className="h-2 bg-yellow-100 [&>div]:bg-yellow-500" />
    </div>

    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
          <span className="text-sm font-medium">Offers Accepted</span>
        </div>
        <span className="text-sm font-medium">3,865 (31.0%)</span>
      </div>
      <Progress value={31.0} className="h-2 bg-purple-100 [&>div]:bg-purple-500" />
    </div>
  </div>
</CardContent>

            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Placement Time Distribution</CardTitle>
                <CardDescription>Time to placement across different sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart
                      data={[
                        { sector: "Technology", days: 35 },
                        { sector: "Healthcare", days: 42 },
                        { sector: "Finance", days: 38 },
                        { sector: "Manufacturing", days: 45 },
                        { sector: "Education", days: 50 },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 60]} />
                      <YAxis dataKey="sector" type="category" />
                      <RechartsTooltip formatter={(value) => [`${value} days`, "Avg. Placement Time"]} />
                      <Bar dataKey="days" name="Days to Placement" fill="#8884d8" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Demand Analysis</CardTitle>
                <CardDescription>Most in-demand skills and their growth rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={skillDemand} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={120} />
                      <RechartsTooltip />
                      <Bar dataKey="demand" name="Demand Score" fill="#8884d8" />
                      <Bar dataKey="growth" name="Growth %" fill="#82ca9d" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Placement Success Factors</CardTitle>
                <CardDescription>Key factors contributing to successful placements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={[
                          { name: "Skill Match", value: 35 },
                          { name: "Interview Performance", value: 25 },
                          { name: "Experience Level", value: 20 },
                          { name: "Education", value: 15 },
                          { name: "Other Factors", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {skillDemand.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sector Performance Tab */}
        <TabsContent value="sectors" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Top Performing Sector",
                value: "Technology",
                subtext: "1,245 placements",
                icon: Briefcase,
                color: "blue",
              },
              {
                title: "Highest Growth Sector",
                value: "Healthcare",
                subtext: "+12.8% growth rate",
                icon: TrendingUp,
                color: "green",
              },
              {
                title: "Highest Demand Skills",
                value: "Programming",
                subtext: "95/100 demand score",
                icon: BarChart,
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
                  <CardTitle>Sector Performance Overview</CardTitle>
                  <CardDescription>Analyze hiring trends across industries and regions.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="north">North</SelectItem>
                      <SelectItem value="south">South</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="west">West</SelectItem>
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
                      <TableHead>Sector</TableHead>
                      <TableHead>Placements</TableHead>
                      <TableHead>Growth Rate</TableHead>
                      <TableHead>Avg. Salary</TableHead>
                      <TableHead>Demand Score</TableHead>
                      <TableHead>Top Roles</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sectorPerformance.map((sector, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{sector.sector}</div>
                        </TableCell>
                        <TableCell>{sector.placements.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                            <span>{sector.growthRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>${sector.avgSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{sector.demandScore}/100</span>
                            </div>
                            <Progress value={sector.demandScore} className="h-1" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {sector.topRoles.slice(0, 2).map((role, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {role}
                              </Badge>
                            ))}
                            {sector.topRoles.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{sector.topRoles.length - 2}
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
                                <BarChart className="h-4 w-4" /> View Detailed Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Generate Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Share2 className="h-4 w-4" /> Share Insights
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
                <CardTitle>Regional Performance</CardTitle>
                <CardDescription>Placement distribution across different regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={regionalPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <RechartsTooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="placements" name="Placements" fill="#8884d8" />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="growthRate"
                        name="Growth Rate %"
                        stroke="#ff7300"
                      />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Growth Trends</CardTitle>
                <CardDescription>Year-over-year growth rates by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        {
                          year: "2020",
                          technology: 8.5,
                          healthcare: 7.2,
                          finance: 5.8,
                          manufacturing: 3.2,
                          education: 4.5,
                        },
                        {
                          year: "2021",
                          technology: 10.2,
                          healthcare: 8.5,
                          finance: 6.3,
                          manufacturing: 3.8,
                          education: 5.1,
                        },
                        {
                          year: "2022",
                          technology: 12.8,
                          healthcare: 10.2,
                          finance: 7.5,
                          manufacturing: 4.5,
                          education: 5.8,
                        },
                        {
                          year: "2023",
                          technology: 14.5,
                          healthcare: 11.8,
                          finance: 8.2,
                          manufacturing: 5.0,
                          education: 6.5,
                        },
                        {
                          year: "2024",
                          technology: 15.2,
                          healthcare: 12.8,
                          finance: 8.5,
                          manufacturing: 5.2,
                          education: 6.8,
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="technology"
                        name="Technology"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                      <Area
                        type="monotone"
                        dataKey="healthcare"
                        name="Healthcare"
                        stackId="2"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                      <Area
                        type="monotone"
                        dataKey="healthcare"
                        name="Healthcare"
                        stackId="2"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                      <Area
                        type="monotone"
                        dataKey="finance"
                        name="Finance"
                        stackId="3"
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                      <Area
                        type="monotone"
                        dataKey="manufacturing"
                        name="Manufacturing"
                        stackId="4"
                        stroke="#ff8042"
                        fill="#ff8042"
                      />
                      <Area
                        type="monotone"
                        dataKey="education"
                        name="Education"
                        stackId="5"
                        stroke="#a4de6c"
                        fill="#a4de6c"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Salary Trends by Sector</CardTitle>
              <CardDescription>Average salary ranges and trends across different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={[
                      { sector: "Technology", entryLevel: 65000, midLevel: 85000, seniorLevel: 120000 },
                      { sector: "Healthcare", entryLevel: 58000, midLevel: 72000, seniorLevel: 95000 },
                      { sector: "Finance", entryLevel: 62000, midLevel: 78000, seniorLevel: 110000 },
                      { sector: "Manufacturing", entryLevel: 52000, midLevel: 65000, seniorLevel: 85000 },
                      { sector: "Education", entryLevel: 48000, midLevel: 58000, seniorLevel: 75000 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="entryLevel" name="Entry Level" fill="#8884d8" />
                    <Bar dataKey="midLevel" name="Mid Level" fill="#82ca9d" />
                    <Bar dataKey="seniorLevel" name="Senior Level" fill="#ffc658" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Institutional Reports Tab */}
        <TabsContent value="institutions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Institutional Performance</CardTitle>
                  <CardDescription>Generate placement performance reports for partner institutions.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search institutions..."
                      className="pl-8 w-[250px]"
                      value={searchInstitutions}
                      onChange={(e) => setSearchInstitutions(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Generate Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institution</TableHead>
                      <TableHead>Placement Rate</TableHead>
                      <TableHead>Total Placements</TableHead>
                      <TableHead>Avg. Placement Time</TableHead>
                      <TableHead>Top Sectors</TableHead>
                      <TableHead>Top Employers</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInstitutions.map((institution) => (
                      <TableRow key={institution.id}>
                        <TableCell>
                          <div className="font-medium">{institution.name}</div>
                          <div className="text-sm text-muted-foreground">{institution.students} students</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{institution.placementRate}%</span>
                            </div>
                            <Progress value={institution.placementRate} className="h-1" />
                          </div>
                        </TableCell>
                        <TableCell>{institution.placements.toLocaleString()}</TableCell>
                        <TableCell>{institution.avgPlacementTime} days</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {institution.topSectors.slice(0, 2).map((sector, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {sector}
                              </Badge>
                            ))}
                            {institution.topSectors.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{institution.topSectors.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {institution.topEmployers.slice(0, 2).map((employer, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {employer}
                              </Badge>
                            ))}
                            {institution.topEmployers.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{institution.topEmployers.length - 2}
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
                                <BarChart className="h-4 w-4" /> View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Generate Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Contact Institution
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
                <CardTitle>Top Performing Institutions</CardTitle>
                <CardDescription>Institutions with the highest placement rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart
                      data={institutions.sort((a, b) => b.placementRate - a.placementRate)}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={120} />
                      <RechartsTooltip formatter={(value) => [`${value}%`, "Placement Rate"]} />
                      <Bar dataKey="placementRate" name="Placement Rate %" fill="#8884d8" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Institution-Employer Connections</CardTitle>
                <CardDescription>Top institution-employer partnerships by placement volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { institution: "Tech University", employer: "TechCorp", placements: 85, growth: "+12%" },
                    { institution: "Business Academy", employer: "Global Finance", placements: 72, growth: "+8%" },
                    { institution: "Medical Institute", employer: "Central Hospital", placements: 68, growth: "+15%" },
                    { institution: "Engineering School", employer: "BuildCorp", placements: 65, growth: "+10%" },
                    { institution: "Design College", employer: "Creative Studios", placements: 58, growth: "+7%" },
                  ].map((connection, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">
                          {connection.institution} → {connection.employer}
                        </div>
                        <div className="text-sm text-muted-foreground">{connection.placements} placements</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600">{connection.growth} YoY</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-designed report templates for institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Placement Performance",
                    description: "Overall placement metrics and trends",
                    icon: BarChart,
                  },
                  {
                    title: "Sector Analysis",
                    description: "Placement distribution across sectors",
                    icon: PieChart,
                  },
                  {
                    title: "Employer Engagement",
                    description: "Top employers and hiring trends",
                    icon: Building,
                  },
                  {
                    title: "Skill Gap Analysis",
                    description: "Skills in demand vs. student skills",
                    icon: AlertCircle,
                  },
                  {
                    title: "Salary Benchmarking",
                    description: "Salary trends for graduates",
                    icon: TrendingUp,
                  },
                  {
                    title: "Placement Timeline",
                    description: "Time-to-placement analysis",
                    icon: Clock,
                  },
                ].map((template, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 bg-muted rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <template.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="font-medium">{template.title}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">{template.description}</div>
                    <Button variant="outline" size="sm" className="mt-auto">
                      Generate Report
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automated reports scheduled for institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Delivery</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Monthly Placement Summary",
                        institution: "Tech University",
                        frequency: "Monthly",
                        nextDelivery: "2024-04-01T09:00:00",
                        recipients: 3,
                      },
                      {
                        name: "Quarterly Performance Report",
                        institution: "Business Academy",
                        frequency: "Quarterly",
                        nextDelivery: "2024-06-30T09:00:00",
                        recipients: 5,
                      },
                      {
                        name: "Weekly Placement Updates",
                        institution: "Medical Institute",
                        frequency: "Weekly",
                        nextDelivery: "2024-03-25T09:00:00",
                        recipients: 2,
                      },
                      {
                        name: "Annual Placement Analysis",
                        institution: "Engineering School",
                        frequency: "Annually",
                        nextDelivery: "2024-12-31T09:00:00",
                        recipients: 8,
                      },
                    ].map((report, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{report.name}</div>
                        </TableCell>
                        <TableCell>{report.institution}</TableCell>
                        <TableCell>{report.frequency}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(report.nextDelivery).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.recipients} recipients</TableCell>
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
                                <Edit className="h-4 w-4" /> Edit Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Preview Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Play className="h-4 w-4" /> Send Now
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete Schedule
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

