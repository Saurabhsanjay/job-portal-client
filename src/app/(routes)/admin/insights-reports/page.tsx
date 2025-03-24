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
  FileText,
  BarChart,
  TrendingUp,
  Download,
  Calendar,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  Eye,
  Edit,
  Trash,
  Plus,
  Share2,
  Printer,
  Save,
  FileUp,
  Settings,
  Zap,
  Building,
  GraduationCap,
  MapPin,
  Layers,
  Play,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  AreaChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"

// Sample data for saved reports
const savedReports = [
  {
    id: 1,
    title: "Monthly Placement Success",
    category: "Placement",
    createdBy: "Admin User",
    createdAt: "2024-03-10T09:30:00",
    lastRun: "2024-03-15T14:45:00",
    scheduled: true,
    frequency: "Monthly",
    recipients: 3,
    description: "Monthly report on placement success rates across all sectors and institutions.",
  },
  {
    id: 2,
    title: "Job Seeker Activity Analysis",
    category: "Job Seekers",
    createdBy: "Admin User",
    createdAt: "2024-02-20T11:20:00",
    lastRun: "2024-03-14T10:15:00",
    scheduled: false,
    frequency: null,
    recipients: 0,
    description:
      "Detailed analysis of job seeker activity including profile completion, application rates, and engagement.",
  },
  {
    id: 3,
    title: "Employer Engagement Metrics",
    category: "Employers",
    createdBy: "Admin User",
    createdAt: "2024-02-15T14:30:00",
    lastRun: "2024-03-12T09:45:00",
    scheduled: true,
    frequency: "Weekly",
    recipients: 5,
    description:
      "Weekly report on employer engagement metrics including job postings, candidate interactions, and hiring rates.",
  },
  {
    id: 4,
    title: "Skill Demand Trends",
    category: "Market Trends",
    createdBy: "Admin User",
    createdAt: "2024-01-25T10:00:00",
    lastRun: "2024-03-01T11:30:00",
    scheduled: true,
    frequency: "Monthly",
    recipients: 8,
    description: "Monthly analysis of in-demand skills across different sectors and regions.",
  },
  {
    id: 5,
    title: "Platform Growth Metrics",
    category: "Platform",
    createdBy: "Admin User",
    createdAt: "2024-01-10T09:15:00",
    lastRun: "2024-03-10T10:30:00",
    scheduled: true,
    frequency: "Monthly",
    recipients: 10,
    description:
      "Monthly report on platform growth including user registrations, active users, and engagement metrics.",
  },
  {
    id: 6,
    title: "Institution Performance",
    category: "Institutions",
    createdBy: "Admin User",
    createdAt: "2024-02-05T13:45:00",
    lastRun: "2024-03-05T14:20:00",
    scheduled: true,
    frequency: "Monthly",
    recipients: 12,
    description:
      "Monthly report on institution performance including placement rates, employer connections, and student engagement.",
  },
]

// Sample data for report templates
const reportTemplates = [
  {
    id: 1,
    title: "Job Seeker Activity",
    description: "Analyze job seeker activity including profile completion, application rates, and engagement.",
    category: "Job Seekers",
    metrics: ["Profile Completion", "Application Rate", "Engagement Score", "Login Frequency"],
    icon: Users,
  },
  {
    id: 2,
    title: "Employer Engagement",
    description: "Track employer engagement metrics including job postings, candidate interactions, and hiring rates.",
    category: "Employers",
    metrics: ["Job Postings", "Candidate Interactions", "Hiring Rate", "Employer Activity"],
    icon: Building,
  },
  {
    id: 3,
    title: "Placement Success",
    description: "Measure placement success rates across different sectors, institutions, and time periods.",
    category: "Placement",
    metrics: ["Placement Rate", "Time to Placement", "Salary Metrics", "Retention Rate"],
    icon: CheckCircle,
  },
  {
    id: 4,
    title: "Skill Demand Analysis",
    description: "Analyze in-demand skills across different sectors and regions.",
    category: "Market Trends",
    metrics: ["Skill Frequency", "Sector Distribution", "Regional Demand", "Growth Rate"],
    icon: TrendingUp,
  },
  {
    id: 5,
    title: "Platform Performance",
    description: "Track platform performance metrics including user growth, engagement, and system metrics.",
    category: "Platform",
    metrics: ["User Growth", "Engagement Metrics", "System Performance", "Feature Usage"],
    icon: BarChart,
  },
]

// Sample data for market trends
const marketTrends = {
  skillDemand: [
    { name: "Programming", value: 95, change: 15 },
    { name: "Data Analysis", value: 92, change: 18 },
    { name: "Project Management", value: 88, change: 12 },
    { name: "Digital Marketing", value: 85, change: 14 },
    { name: "Healthcare", value: 82, change: 10 },
    { name: "Financial Analysis", value: 80, change: 8 },
    { name: "UI/UX Design", value: 78, change: 16 },
    { name: "Sales", value: 75, change: 5 },
  ],
  sectorGrowth: [
    { name: "Technology", value: 18.5, change: 3.2 },
    { name: "Healthcare", value: 15.2, change: 2.8 },
    { name: "Finance", value: 12.8, change: 1.5 },
    { name: "Education", value: 10.5, change: 2.2 },
    { name: "Manufacturing", value: 8.2, change: -0.5 },
    { name: "Retail", value: 7.5, change: -1.2 },
    { name: "Construction", value: 9.8, change: 1.8 },
    { name: "Energy", value: 11.2, change: 2.5 },
  ],
  regionalDemand: [
    { name: "North", jobs: 2450, candidates: 1850, gap: 600 },
    { name: "South", jobs: 1850, candidates: 2100, gap: -250 },
    { name: "East", jobs: 2100, candidates: 1950, gap: 150 },
    { name: "West", jobs: 2300, candidates: 2050, gap: 250 },
    { name: "Central", jobs: 1950, candidates: 1800, gap: 150 },
  ],
  salaryTrends: [
    { name: "Technology", entry: 65000, mid: 95000, senior: 135000 },
    { name: "Healthcare", entry: 58000, mid: 85000, senior: 120000 },
    { name: "Finance", entry: 62000, mid: 92000, senior: 130000 },
    { name: "Education", entry: 48000, mid: 65000, senior: 85000 },
    { name: "Manufacturing", entry: 52000, mid: 72000, senior: 95000 },
  ],
  platformGrowth: [
    { month: "Jan", users: 12500, employers: 850, institutions: 120 },
    { month: "Feb", users: 13200, employers: 920, institutions: 125 },
    { month: "Mar", users: 14100, employers: 980, institutions: 130 },
    { month: "Apr", users: 14800, employers: 1050, institutions: 135 },
    { month: "May", users: 15600, employers: 1120, institutions: 140 },
    { month: "Jun", users: 16500, employers: 1200, institutions: 145 },
  ],
}

// Sample data for export formats
const exportFormats = [
  {
    id: "pdf",
    name: "PDF Document",
    icon: FileText,
    description: "Export as PDF document for easy sharing and printing",
  },
  {
    id: "excel",
    name: "Excel Spreadsheet",
    icon: FileText,
    description: "Export as Excel spreadsheet for further analysis",
  },
  { id: "csv", name: "CSV File", icon: FileText, description: "Export as CSV file for data processing" },
  { id: "json", name: "JSON Data", icon: FileText, description: "Export as JSON data for system integration" },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function InsightsReports() {
  const [searchReports, setSearchReports] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedReport, setSelectedReport] = useState<number | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [selectedExportFormat, setSelectedExportFormat] = useState<string | null>(null)

  // Filter reports based on search and category
  const filteredReports = savedReports.filter(
    (report) =>
      (report.title.toLowerCase().includes(searchReports.toLowerCase()) ||
        report.category.toLowerCase().includes(searchReports.toLowerCase()) ||
        report.description.toLowerCase().includes(searchReports.toLowerCase())) &&
      (selectedCategory === "all" || report.category === selectedCategory),
  )

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold tracking-tight">Insights and Reports</h1>
        <p className="text-muted-foreground">
          Generate custom reports, analyze trends, and export data for stakeholders.
        </p>
      </div> */}

      <Tabs defaultValue="custom-reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="custom-reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Custom Reports
          </TabsTrigger>
          <TabsTrigger value="trend-analysis" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trend Analysis
          </TabsTrigger>
          <TabsTrigger value="exportable-data" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportable Data
          </TabsTrigger>
        </TabsList>

        {/* Custom Reports Tab */}
        <TabsContent value="custom-reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Saved Reports",
                value: savedReports.length.toString(),
                subtext: "3 scheduled reports",
                icon: FileText,
                color: "blue",
              },
              {
                title: "Report Templates",
                value: reportTemplates.length.toString(),
                subtext: "Ready to use templates",
                icon: Layers,
                color: "green",
              },
              {
                title: "Reports Generated",
                value: "245",
                subtext: "Last 30 days",
                icon: BarChart,
                color: "purple",
              },
              {
                title: "Report Recipients",
                value: "38",
                subtext: "Across all departments",
                icon: Users,
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
                  <CardTitle>Saved Reports</CardTitle>
                  <CardDescription>View and manage your saved custom reports</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search reports..."
                      className="pl-8 w-[250px]"
                      value={searchReports}
                      onChange={(e) => setSearchReports(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Job Seekers">Job Seekers</SelectItem>
                      <SelectItem value="Employers">Employers</SelectItem>
                      <SelectItem value="Placement">Placement</SelectItem>
                      <SelectItem value="Market Trends">Market Trends</SelectItem>
                      <SelectItem value="Platform">Platform</SelectItem>
                      <SelectItem value="Institutions">Institutions</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex items-center gap-2" onClick={() => setSelectedTemplate(null)}>
                    <Plus className="h-4 w-4" /> Create Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Run</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="font-medium">{report.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                            {report.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {report.category === "Job Seekers" ? (
                              <Users className="h-3 w-3 mr-1" />
                            ) : report.category === "Employers" ? (
                              <Building className="h-3 w-3 mr-1" />
                            ) : report.category === "Placement" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : report.category === "Market Trends" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : report.category === "Platform" ? (
                              <BarChart className="h-3 w-3 mr-1" />
                            ) : report.category === "Institutions" ? (
                              <GraduationCap className="h-3 w-3 mr-1" />
                            ) : null}
                            {report.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{new Date(report.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">by {report.createdBy}</div>
                        </TableCell>
                        <TableCell>{new Date(report.lastRun).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {report.scheduled ? (
                            <Badge variant="success" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {report.frequency}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Not Scheduled</Badge>
                          )}
                        </TableCell>
                        <TableCell>{report.recipients}</TableCell>
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
                                onClick={() => setSelectedReport(report.id)}
                              >
                                <Eye className="h-4 w-4" /> View Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit className="h-4 w-4" /> Edit Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Play className="h-4 w-4" /> Run Now
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Download className="h-4 w-4" /> Download
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Share2 className="h-4 w-4" /> Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete Report
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
                  Showing <strong>{filteredReports.length}</strong> of <strong>{savedReports.length}</strong> reports
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

          {selectedReport && (
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>{savedReports.find((r) => r.id === selectedReport)?.title} - Report Preview</CardTitle>
                    <CardDescription>{savedReports.find((r) => r.id === selectedReport)?.description}</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedReport(null)}>
                    Close Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Report Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-muted rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {savedReports.find((r) => r.id === selectedReport)?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Generated on {new Date().toLocaleDateString()} • Category:{" "}
                        {savedReports.find((r) => r.id === selectedReport)?.category}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" /> Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Printer className="h-4 w-4" /> Print
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" /> Share
                      </Button>
                    </div>
                  </div>

                  {/* Report Content - Example for different report types */}
                  {savedReports.find((r) => r.id === selectedReport)?.category === "Placement" && (
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-4">
                        {[
                          {
                            title: "Total Placements",
                            value: "3,865",
                            change: "+352 this month",
                            changeType: "positive",
                          },
                          { title: "Placement Rate", value: "78.5%", change: "+2.3%", changeType: "positive" },
                          {
                            title: "Avg. Time to Placement",
                            value: "42 days",
                            change: "-3 days",
                            changeType: "positive",
                          },
                          { title: "Retention Rate", value: "92%", change: "+1.5%", changeType: "positive" },
                        ].map((metric, index) => (
                          <div key={index} className="p-4 bg-white border rounded-lg">
                            <div className="text-sm font-medium text-muted-foreground">{metric.title}</div>
                            <div className="text-2xl font-bold mt-1">{metric.value}</div>
                            <div
                              className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"} flex items-center gap-1 mt-1`}
                            >
                              {metric.changeType === "positive" ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              {metric.change}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Placement Trends (Last 6 Months)</h4>
                          <div className="h-[300px] bg-white p-4 border rounded-lg">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartLineChart
                                data={[
                                  { month: "Jan", placements: 285, rate: 75.2 },
                                  { month: "Feb", placements: 310, rate: 76.8 },
                                  { month: "Mar", placements: 342, rate: 77.5 },
                                  { month: "Apr", placements: 325, rate: 78.1 },
                                  { month: "May", placements: 368, rate: 79.3 },
                                  { month: "Jun", placements: 352, rate: 78.9 },
                                ]}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" orientation="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <RechartsTooltip />
                                <Legend />
                                <Line
                                  yAxisId="left"
                                  type="monotone"
                                  dataKey="placements"
                                  name="Placements"
                                  stroke="#8884d8"
                                />
                                <Line
                                  yAxisId="right"
                                  type="monotone"
                                  dataKey="rate"
                                  name="Success Rate %"
                                  stroke="#82ca9d"
                                />
                              </RechartLineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Placement by Sector</h4>
                          <div className="h-[300px] bg-white p-4 border rounded-lg">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartBarChart
                                data={[
                                  { sector: "Technology", placements: 1245 },
                                  { sector: "Healthcare", placements: 865 },
                                  { sector: "Finance", placements: 720 },
                                  { sector: "Education", placements: 495 },
                                  { sector: "Manufacturing", placements: 540 },
                                ]}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="sector" />
                                <YAxis />
                                <RechartsTooltip />
                                <Bar dataKey="placements" name="Placements" fill="#8884d8" />
                              </RechartBarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Top Performing Institutions</h4>
                        <div className="bg-white border rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Institution</TableHead>
                                <TableHead>Placements</TableHead>
                                <TableHead>Success Rate</TableHead>
                                <TableHead>Avg. Time</TableHead>
                                <TableHead>Top Sectors</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {[
                                {
                                  name: "Tech University",
                                  placements: 425,
                                  rate: 92,
                                  time: 35,
                                  sectors: ["Technology", "Finance"],
                                },
                                {
                                  name: "Business Academy",
                                  placements: 380,
                                  rate: 86,
                                  time: 42,
                                  sectors: ["Finance", "Consulting"],
                                },
                                {
                                  name: "Medical Institute",
                                  placements: 310,
                                  rate: 89,
                                  time: 38,
                                  sectors: ["Healthcare", "Research"],
                                },
                                {
                                  name: "Design College",
                                  placements: 265,
                                  rate: 82,
                                  time: 45,
                                  sectors: ["Media", "Technology"],
                                },
                                {
                                  name: "Engineering School",
                                  placements: 295,
                                  rate: 88,
                                  time: 40,
                                  sectors: ["Manufacturing", "Technology"],
                                },
                              ].map((institution, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{institution.name}</TableCell>
                                  <TableCell>{institution.placements}</TableCell>
                                  <TableCell>{institution.rate}%</TableCell>
                                  <TableCell>{institution.time} days</TableCell>
                                  <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                      {institution.sectors.map((sector, i) => (
                                        <Badge key={i} variant="outline" className="text-xs">
                                          {sector}
                                        </Badge>
                                      ))}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}

                  {savedReports.find((r) => r.id === selectedReport)?.category === "Job Seekers" && (
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-4">
                        {[
                          {
                            title: "Total Job Seekers",
                            value: "12,845",
                            change: "+1,245 this month",
                            changeType: "positive",
                          },
                          {
                            title: "Active Job Seekers",
                            value: "8,450",
                            change: "+625 this month",
                            changeType: "positive",
                          },
                          { title: "Avg. Profile Completion", value: "78%", change: "+3%", changeType: "positive" },
                          { title: "Avg. Applications", value: "4.2", change: "+0.5", changeType: "positive" },
                        ].map((metric, index) => (
                          <div key={index} className="p-4 bg-white border rounded-lg">
                            <div className="text-sm font-medium text-muted-foreground">{metric.title}</div>
                            <div className="text-2xl font-bold mt-1">{metric.value}</div>
                            <div
                              className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"} flex items-center gap-1 mt-1`}
                            >
                              {metric.changeType === "positive" ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              {metric.change}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Job Seeker Activity Trends</h4>
                          <div className="h-[300px] bg-white p-4 border rounded-lg">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartLineChart
                                data={[
                                  { month: "Jan", logins: 8500, applications: 3200, profileUpdates: 2100 },
                                  { month: "Feb", logins: 9200, applications: 3600, profileUpdates: 2300 },
                                  { month: "Mar", logins: 10100, applications: 4200, profileUpdates: 2800 },
                                  { month: "Apr", logins: 9800, applications: 3900, profileUpdates: 2500 },
                                  { month: "May", logins: 10500, applications: 4500, profileUpdates: 2900 },
                                  { month: "Jun", logins: 11200, applications: 4800, profileUpdates: 3100 },
                                ]}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <RechartsTooltip />
                                <Legend />
                                <Line type="monotone" dataKey="logins" name="Logins" stroke="#8884d8" />
                                <Line type="monotone" dataKey="applications" name="Applications" stroke="#82ca9d" />
                                <Line
                                  type="monotone"
                                  dataKey="profileUpdates"
                                  name="Profile Updates"
                                  stroke="#ffc658"
                                />
                              </RechartLineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Profile Completion Distribution</h4>
                          <div className="h-[300px] bg-white p-4 border rounded-lg">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartPieChart>
                                <Pie
                                  data={[
                                    { name: "90-100%", value: 3850 },
                                    { name: "70-89%", value: 4200 },
                                    { name: "50-69%", value: 2800 },
                                    { name: "30-49%", value: 1500 },
                                    { name: "0-29%", value: 495 },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={100}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {[...Array(5)].map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <RechartsTooltip />
                              </RechartPieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Top Skills Among Job Seekers</h4>
                        <div className="h-[300px] bg-white p-4 border rounded-lg">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartBarChart data={marketTrends.skillDemand} layout="vertical">
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" />
                              <YAxis dataKey="name" type="category" width={120} />
                              <RechartsTooltip />
                              <Bar dataKey="value" name="Skill Prevalence" fill="#8884d8" />
                            </RechartBarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add more report type previews as needed */}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" /> Edit Report
                </Button>
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download Report
                </Button>
              </CardFooter>
            </Card>
          )}

          {selectedTemplate === null && (
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Choose a template to quickly create a new report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {reportTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="flex flex-col p-4 bg-white border rounded-lg hover:border-primary cursor-pointer transition-colors"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <template.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="font-medium">{template.title}</div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">{template.description}</div>
                      <div className="mt-auto">
                        <div className="text-xs font-medium text-muted-foreground mb-1">Metrics included:</div>
                        <div className="flex flex-wrap gap-1">
                          {template.metrics.map((metric, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-col p-4 bg-white border border-dashed rounded-lg hover:border-primary cursor-pointer transition-colors">
                    <div className="flex items-center justify-center h-full">
                      <div className="flex flex-col items-center text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-2">
                          <Plus className="h-5 w-5 text-primary" />
                        </div>
                        <div className="font-medium">Custom Report</div>
                        <div className="text-sm text-muted-foreground mt-1">Create a report from scratch</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTemplate !== null && (
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>
                      Create New Report - {reportTemplates.find((t) => t.id === selectedTemplate)?.title}
                    </CardTitle>
                    <CardDescription>
                      {reportTemplates.find((t) => t.id === selectedTemplate)?.description}
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                    Cancel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-title">Report Title</Label>
                      <Input id="report-title" placeholder="Enter report title" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="report-description">Description</Label>
                      <Textarea
                        id="report-description"
                        placeholder="Enter report description"
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Time Period</Label>
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
                    </div>

                    <div className="space-y-2">
                      <Label>Data Filters</Label>
                      <div className="space-y-3 p-4 border rounded-md">
                        <div className="grid grid-cols-3 gap-4">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="category">Category</SelectItem>
                              <SelectItem value="region">Region</SelectItem>
                              <SelectItem value="institution">Institution</SelectItem>
                              <SelectItem value="employer">Employer</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="greater-than">Greater Than</SelectItem>
                              <SelectItem value="less-than">Less Than</SelectItem>
                            </SelectContent>
                          </Select>

                          <Input placeholder="Value" />
                        </div>

                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" /> Add Filter
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Metrics to Include</Label>
                      <div className="space-y-2 p-4 border rounded-md">
                        {reportTemplates
                          .find((t) => t.id === selectedTemplate)
                          ?.metrics.map((metric, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox id={`metric-${index}`} defaultChecked />
                              <Label htmlFor={`metric-${index}`}>{metric}</Label>
                            </div>
                          ))}
                        <div className="flex items-center space-x-2 mt-4">
                          <Checkbox id="custom-metric" />
                          <Label htmlFor="custom-metric">Add Custom Metric</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Visualization Types</Label>
                      <div className="space-y-2 p-4 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="viz-table" defaultChecked />
                          <Label htmlFor="viz-table">Data Tables</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="viz-bar" defaultChecked />
                          <Label htmlFor="viz-bar">Bar Charts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="viz-line" defaultChecked />
                          <Label htmlFor="viz-line">Line Charts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="viz-pie" defaultChecked />
                          <Label htmlFor="viz-pie">Pie Charts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="viz-kpi" defaultChecked />
                          <Label htmlFor="viz-kpi">KPI Cards</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Schedule Report</Label>
                      <div className="space-y-4 p-4 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="schedule-report" />
                          <Label htmlFor="schedule-report">Schedule this report</Label>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="frequency">Frequency</Label>
                            <Select disabled>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="recipients">Recipients</Label>
                            <Input id="recipients" placeholder="Enter email addresses" disabled />
                          </div>
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
                  <Button>Create Report</Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        {/* Trend Analysis Tab */}
        <TabsContent value="trend-analysis" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Top In-Demand Skill",
                value: "Programming",
                subtext: "+15% growth this quarter",
                icon: Zap,
                color: "blue",
              },
              {
                title: "Fastest Growing Sector",
                value: "Technology",
                subtext: "+18.5% year-over-year",
                icon: TrendingUp,
                color: "green",
              },
              {
                title: "Highest Demand Region",
                value: "North",
                subtext: "600 job-candidate gap",
                icon: MapPin,
                color: "purple",
              },
              {
                title: "Platform Growth",
                value: "+32%",
                subtext: "Year-over-year increase",
                icon: BarChart,
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skill Demand Trends</CardTitle>
                <CardDescription>Most in-demand skills and their growth rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={marketTrends.skillDemand} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" name="Demand Score" fill="#8884d8" />
                      <Bar dataKey="change" name="Growth %" fill="#82ca9d" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Growth Analysis</CardTitle>
                <CardDescription>Growth rates across different industry sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={marketTrends.sectorGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" name="Growth Rate %" fill="#8884d8" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Regional Job Market Analysis</CardTitle>
              <CardDescription>Job demand vs. candidate supply across different regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={marketTrends.regionalDemand}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="jobs" name="Job Openings" stackId="a" fill="#8884d8" />
                    <Bar dataKey="candidates" name="Available Candidates" stackId="a" fill="#82ca9d" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {marketTrends.regionalDemand.map((region) => (
                  <div key={region.name} className="p-4 bg-muted rounded-lg">
                    <div className="font-medium">{region.name} Region</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {region.jobs} jobs, {region.candidates} candidates
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Gap:</div>
                      <Badge variant={region.gap > 0 ? "destructive" : region.gap < 0 ? "success" : "secondary"}>
                        {region.gap > 0
                          ? `+${region.gap} (Shortage)`
                          : region.gap < 0
                            ? `${region.gap} (Surplus)`
                            : "Balanced"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Salary Trends by Sector</CardTitle>
                <CardDescription>Average salary ranges across different sectors and experience levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart data={marketTrends.salaryTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                      <Legend />
                      <Bar dataKey="entry" name="Entry Level" fill="#8884d8" />
                      <Bar dataKey="mid" name="Mid Level" fill="#82ca9d" />
                      <Bar dataKey="senior" name="Senior Level" fill="#ffc658" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Growth Metrics</CardTitle>
                <CardDescription>User growth trends across different user types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={marketTrends.platformGrowth}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="users"
                        name="Job Seekers"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                      <Area
                        type="monotone"
                        dataKey="employers"
                        name="Employers"
                        stackId="2"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                      <Area
                        type="monotone"
                        dataKey="institutions"
                        name="Institutions"
                        stackId="3"
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Skill-Sector Correlation Analysis</CardTitle>
              <CardDescription>Correlation between skills and industry sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
  width={600}
  height={400}
  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
>
  <CartesianGrid />
  <XAxis type="category" dataKey="skill" name="Skill" allowDuplicatedCategory={false} />
  <YAxis type="category" dataKey="sector" name="Sector" allowDuplicatedCategory={false} />
  <ZAxis type="number" dataKey="z" range={[50, 400]} />
  <RechartsTooltip cursor={{ strokeDasharray: "3 3" }} />
  <Legend />
  <Scatter
    name="Skill-Sector Demand"
    data={[
      { skill: "Programming", sector: "Technology", z: 300 },
      { skill: "Programming", sector: "Finance", z: 200 },
      { skill: "Programming", sector: "Education", z: 150 },
      { skill: "Data Analysis", sector: "Technology", z: 250 },
      { skill: "Data Analysis", sector: "Finance", z: 220 },
      { skill: "Data Analysis", sector: "Healthcare", z: 180 },
      { skill: "Project Management", sector: "Technology", z: 220 },
      { skill: "Project Management", sector: "Manufacturing", z: 190 },
      { skill: "Digital Marketing", sector: "Technology", z: 180 },
      { skill: "Digital Marketing", sector: "Education", z: 120 },
      { skill: "Healthcare", sector: "Healthcare", z: 300 },
      { skill: "Financial Analysis", sector: "Finance", z: 280 },
      { skill: "UI/UX Design", sector: "Technology", z: 240 },
      { skill: "Sales", sector: "Technology", z: 150 },
      { skill: "Sales", sector: "Finance", z: 130 },
      { skill: "Sales", sector: "Manufacturing", z: 160 },
    ]}
    fill="#8884d8"
  />
</ScatterChart>

                </ResponsiveContainer>
              </div>
              <div className="text-sm text-muted-foreground text-center mt-2">
                Note: Bubble size represents demand intensity
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Emerging Skills</CardTitle>
                <CardDescription>Rapidly growing skills to watch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "AI/Machine Learning", growth: 28, sector: "Technology" },
                    { skill: "Cybersecurity", growth: 25, sector: "Technology" },
                    { skill: "Remote Team Management", growth: 22, sector: "Various" },
                    { skill: "Data Visualization", growth: 20, sector: "Various" },
                    { skill: "Blockchain", growth: 18, sector: "Technology/Finance" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{item.skill}</div>
                        <div className="text-sm text-muted-foreground">{item.sector}</div>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="font-medium">{item.growth}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Declining Skills</CardTitle>
                <CardDescription>Skills with decreasing demand</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { skill: "Basic Data Entry", decline: 15, sector: "Various" },
                    { skill: "Traditional Marketing", decline: 12, sector: "Marketing" },
                    { skill: "Basic IT Support", decline: 10, sector: "Technology" },
                    { skill: "Manual Testing", decline: 8, sector: "Technology" },
                    { skill: "Basic Bookkeeping", decline: 7, sector: "Finance" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{item.skill}</div>
                        <div className="text-sm text-muted-foreground">{item.sector}</div>
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <ArrowDownRight className="h-4 w-4" />
                        <span className="font-medium">{item.decline}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiring Timeline Trends</CardTitle>
                <CardDescription>Average time-to-hire by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { sector: "Technology", days: 35, change: -3 },
                    { sector: "Healthcare", days: 42, change: -2 },
                    { sector: "Finance", days: 38, change: -4 },
                    { sector: "Education", days: 45, change: -1 },
                    { sector: "Manufacturing", days: 40, change: -3 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{item.sector}</div>
                        <div className="text-sm text-muted-foreground">{item.days} days average</div>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <span className="font-medium">{item.change} days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Exportable Data Tab */}
        <TabsContent value="exportable-data" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Available Reports",
                value: savedReports.length.toString(),
                subtext: "Ready for export",
                icon: FileText,
                color: "blue",
              },
              {
                title: "Export Formats",
                value: exportFormats.length.toString(),
                subtext: "PDF, Excel, CSV, JSON",
                icon: FileUp,
                color: "green",
              },
              {
                title: "Exports This Month",
                value: "87",
                subtext: "+12% from last month",
                icon: Download,
                color: "purple",
              },
              {
                title: "Scheduled Exports",
                value: "14",
                subtext: "Auto-delivered reports",
                icon: Calendar,
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
                  <CardTitle>Export Report</CardTitle>
                  <CardDescription>Select a report and export format</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Report</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a report" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedReports.map((report) => (
                          <SelectItem key={report.id} value={report.id.toString()}>
                            {report.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Period</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="export-start-date">Start Date</Label>
                        <Input id="export-start-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="export-end-date">End Date</Label>
                        <Input id="export-end-date" type="date" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Filters</Label>
                    <div className="space-y-3 p-4 border rounded-md">
                      <div className="grid grid-cols-3 gap-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="category">Category</SelectItem>
                            <SelectItem value="region">Region</SelectItem>
                            <SelectItem value="institution">Institution</SelectItem>
                            <SelectItem value="employer">Employer</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="greater-than">Greater Than</SelectItem>
                            <SelectItem value="less-than">Less Than</SelectItem>
                          </SelectContent>
                        </Select>

                        <Input placeholder="Value" />
                      </div>

                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Filter
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Include Sections</Label>
                    <div className="space-y-2 p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-summary" defaultChecked />
                        <Label htmlFor="include-summary">Executive Summary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-charts" defaultChecked />
                        <Label htmlFor="include-charts">Charts and Visualizations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-tables" defaultChecked />
                        <Label htmlFor="include-tables">Data Tables</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-trends" defaultChecked />
                        <Label htmlFor="include-trends">Trend Analysis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="include-recommendations" defaultChecked />
                        <Label htmlFor="include-recommendations">Recommendations</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Export Format</Label>
                    <RadioGroup defaultValue="pdf" className="space-y-4">
                      {exportFormats.map((format) => (
                        <div
                          key={format.id}
                          className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${selectedExportFormat === format.id ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                          onClick={() => setSelectedExportFormat(format.id)}
                        >
                          <RadioGroupItem value={format.id} id={format.id} />
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <format.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <Label htmlFor={format.id} className="font-medium cursor-pointer">
                                {format.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">{format.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Export Options</Label>
                    <div className="space-y-2 p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-compress" />
                        <Label htmlFor="option-compress">Compress Files</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-password" />
                        <Label htmlFor="option-password">Password Protect</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="option-metadata" defaultChecked />
                        <Label htmlFor="option-metadata">Include Metadata</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Delivery Method</Label>
                    <div className="space-y-2 p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delivery-download" defaultChecked />
                        <Label htmlFor="delivery-download">Direct Download</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="delivery-email" />
                        <Label htmlFor="delivery-email">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2 ml-6 mt-2">
                        <Input placeholder="Enter email addresses" disabled />
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="delivery-schedule" />
                        <Label htmlFor="delivery-schedule">Schedule Regular Export</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Save className="h-4 w-4" /> Save Settings
              </Button>
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Export Now
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Exports</CardTitle>
                <CardDescription>Recently exported reports and their details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Monthly Placement Success",
                      format: "PDF",
                      date: "2024-03-15T14:45:00",
                      user: "Admin User",
                      size: "2.4 MB",
                    },
                    {
                      title: "Job Seeker Activity Analysis",
                      format: "Excel",
                      date: "2024-03-14T10:15:00",
                      user: "Admin User",
                      size: "4.8 MB",
                    },
                    {
                      title: "Employer Engagement Metrics",
                      format: "PDF",
                      date: "2024-03-12T09:45:00",
                      user: "Admin User",
                      size: "3.2 MB",
                    },
                    {
                      title: "Skill Demand Trends",
                      format: "CSV",
                      date: "2024-03-10T11:30:00",
                      user: "Admin User",
                      size: "1.5 MB",
                    },
                    {
                      title: "Platform Growth Metrics",
                      format: "PDF",
                      date: "2024-03-10T10:30:00",
                      user: "Admin User",
                      size: "2.8 MB",
                    },
                  ].map((export_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{export_.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {export_.format} • {export_.size} • {new Date(export_.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Exports</CardTitle>
                <CardDescription>Automatically scheduled report exports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Monthly Placement Success",
                      frequency: "Monthly",
                      nextExport: "2024-04-01T09:00:00",
                      format: "PDF",
                      recipients: 3,
                    },
                    {
                      title: "Weekly Employer Engagement",
                      frequency: "Weekly",
                      nextExport: "2024-03-25T09:00:00",
                      format: "Excel",
                      recipients: 5,
                    },
                    {
                      title: "Quarterly Skill Demand Analysis",
                      frequency: "Quarterly",
                      nextExport: "2024-06-01T09:00:00",
                      format: "PDF",
                      recipients: 8,
                    },
                    {
                      title: "Monthly Platform Growth",
                      frequency: "Monthly",
                      nextExport: "2024-04-01T09:00:00",
                      format: "PDF",
                      recipients: 10,
                    },
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium">{schedule.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {schedule.frequency} • {schedule.format} • {schedule.recipients} recipients
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Next export:</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(schedule.nextExport).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
              <CardDescription>Configure default export settings and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Export Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="csv">CSV File</SelectItem>
                        <SelectItem value="json">JSON Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Retention</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="365">1 Year</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Export Permissions</Label>
                    <div className="space-y-2 p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="permission-admin" defaultChecked />
                        <Label htmlFor="permission-admin">Administrators</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="permission-managers" defaultChecked />
                        <Label htmlFor="permission-managers">Managers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="permission-analysts" />
                        <Label htmlFor="permission-analysts">Data Analysts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="permission-standard" />
                        <Label htmlFor="permission-standard">Standard Users</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Data Security</Label>
                    <div className="space-y-2 p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="security-password" defaultChecked />
                        <Label htmlFor="security-password">Require Password for Sensitive Data</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="security-watermark" defaultChecked />
                        <Label htmlFor="security-watermark">Add Watermark to Exports</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="security-expiry" />
                        <Label htmlFor="security-expiry">Set Export Link Expiry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="security-audit" defaultChecked />
                        <Label htmlFor="security-audit">Audit Export Activity</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Export Notifications</Label>
                    <div className="space-y-2 p-4 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-completion" defaultChecked />
                        <Label htmlFor="notify-completion">Export Completion</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-download" />
                        <Label htmlFor="notify-download">Export Download</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-scheduled" defaultChecked />
                        <Label htmlFor="notify-scheduled">Scheduled Export Reminders</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="notify-errors" defaultChecked />
                        <Label htmlFor="notify-errors">Export Errors</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

