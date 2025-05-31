"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Cell,
  LabelList,
} from "recharts"
import { Download, FileText, Calendar, TrendingUp, Users, Briefcase } from "lucide-react"

export default function ApplicationInsights() {
  const [selectedPeriod, setSelectedPeriod] = useState("30")

  // Most Applied Jobs Data
  const mostAppliedJobs = [
    { job: "Software Engineer", company: "TechCorp", applications: 245, conversion: "12%" },
    { job: "Data Analyst", company: "DataFlow", applications: 198, conversion: "15%" },
    { job: "Product Manager", company: "InnovateLab", applications: 176, conversion: "8%" },
    { job: "UX Designer", company: "DesignStudio", applications: 154, conversion: "18%" },
    { job: "Marketing Manager", company: "BrandCo", applications: 132, conversion: "10%" },
    { job: "DevOps Engineer", company: "CloudTech", applications: 118, conversion: "14%" },
    { job: "Business Analyst", company: "ConsultPro", applications: 95, conversion: "16%" },
    { job: "Frontend Developer", company: "WebSolutions", applications: 87, conversion: "11%" },
  ]

  const chartData = mostAppliedJobs.map((job) => ({
    name: job.job,
    applications: job.applications,
    company: job.company,
  }))

  // Conversion Funnel Data
  const funnelData = [
    { name: "Applications", value: 1250, fill: "#22c55e" },
    { name: "Shortlisted", value: 875, fill: "#3b82f6" },
    { name: "Interviewed", value: 425, fill: "#f59e0b" },
    { name: "Offered", value: 185, fill: "#ef4444" },
    { name: "Hired", value: 142, fill: "#8b5cf6" },
  ]

  // Employer Performance Data
  const employerPerformance = [
    {
      company: "TechCorp",
      jobs: 15,
      applications: 450,
      hires: 28,
      timeToHire: "18 days",
      responseRate: "95%",
      status: "Active",
    },
    {
      company: "DataFlow",
      jobs: 8,
      applications: 298,
      hires: 22,
      timeToHire: "22 days",
      responseRate: "88%",
      status: "Active",
    },
    {
      company: "InnovateLab",
      jobs: 12,
      applications: 376,
      hires: 18,
      timeToHire: "25 days",
      responseRate: "92%",
      status: "Active",
    },
    {
      company: "DesignStudio",
      jobs: 6,
      applications: 234,
      hires: 15,
      timeToHire: "15 days",
      responseRate: "97%",
      status: "Active",
    },
    {
      company: "BrandCo",
      jobs: 10,
      applications: 312,
      hires: 12,
      timeToHire: "28 days",
      responseRate: "85%",
      status: "Inactive",
    },
    {
      company: "CloudTech",
      jobs: 7,
      applications: 189,
      hires: 14,
      timeToHire: "20 days",
      responseRate: "90%",
      status: "Active",
    },
  ]

  const handleExport = (type: string, format: string) => {
    console.log(`Exporting ${type} as ${format}`)
    // Export functionality would be implemented here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card className="bg-green-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
        <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold text-green-600">1,250</div>
        <p className="text-xs text-green-500">+12% from last period</p>
        </CardContent>
      </Card>
      <Card className="bg-blue-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
        <FileText className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold text-blue-600">875</div>
        <p className="text-xs text-blue-500">70% conversion rate</p>
        </CardContent>
      </Card>
      <Card className="bg-yellow-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Interviewed</CardTitle>
        <Calendar className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold text-yellow-600">425</div>
        <p className="text-xs text-yellow-500">48.6% conversion rate</p>
        </CardContent>
      </Card>
      <Card className="bg-orange-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Offers Made</CardTitle>
        <TrendingUp className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold text-orange-600">185</div>
        <p className="text-xs text-orange-500">43.5% conversion rate</p>
        </CardContent>
      </Card>
      <Card className="bg-purple-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Hired</CardTitle>
        <Briefcase className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold text-purple-600">142</div>
        <p className="text-xs text-purple-500">76.8% acceptance rate</p>
        </CardContent>
      </Card>
    </div>

      <Tabs defaultValue="most-applied" className="space-y-4">
        <TabsList>
          <TabsTrigger value="most-applied">Most Applied Jobs</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="employer-performance">Employer Performance</TabsTrigger>
        </TabsList>

        {/* Most Applied Jobs Tab */}
        <TabsContent value="most-applied" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Most Applied Jobs</CardTitle>
                <CardDescription>Top performing job listings by application volume</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("most-applied", "excel")}>
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("most-applied", "pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Chart */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mostAppliedJobs.map((job, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{job.job}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{job.conversion}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversion Funnel Tab */}
        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Application Conversion Funnel</CardTitle>
                <CardDescription>Track application progress through hiring stages</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("funnel", "excel")}>
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("funnel", "pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Funnel Visualization */}
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <FunnelChart>
                      <Tooltip />
                      <Funnel dataKey="value" data={funnelData} isAnimationActive>
                        <LabelList position="center" fill="#fff" stroke="none" />
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </div>

                {/* Conversion Rates */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">70%</div>
                        <div className="text-sm text-muted-foreground">Application → Shortlist</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">48.6%</div>
                        <div className="text-sm text-muted-foreground">Shortlist → Interview</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">43.5%</div>
                        <div className="text-sm text-muted-foreground">Interview → Offer</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">76.8%</div>
                        <div className="text-sm text-muted-foreground">Offer → Hire</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employer Performance Tab */}
        <TabsContent value="employer-performance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Employer Performance Reports</CardTitle>
                <CardDescription>Comprehensive employer analytics and metrics</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("employer-performance", "excel")}>
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("employer-performance", "pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Jobs Posted</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Hires</TableHead>
                    <TableHead>Avg. Time to Hire</TableHead>
                    <TableHead>Response Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employerPerformance.map((employer, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{employer.company}</TableCell>
                      <TableCell>{employer.jobs}</TableCell>
                      <TableCell>{employer.applications}</TableCell>
                      <TableCell>{employer.hires}</TableCell>
                      <TableCell>{employer.timeToHire}</TableCell>
                      <TableCell>{employer.responseRate}</TableCell>
                      <TableCell>
                        <Badge variant={employer.status === "Active" ? "default" : "secondary"}>
                          {employer.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
