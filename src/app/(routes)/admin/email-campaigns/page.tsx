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
  Mail,
  Calendar,
  Clock,
  Users,
  BarChart,
  LineChart,
  Edit,
  Copy,
  Trash,
  Play,
  Pause,
  Plus,
  FileText,
  UserPlus,
  Briefcase,
  GraduationCap,
  ChevronRight,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
} from "recharts"

// Sample data for email campaigns
const campaigns = [
  {
    id: 1,
    name: "March Job Fair Invitation",
    status: "Active",
    audience: "Job Seekers",
    recipients: 3450,
    openRate: 42.5,
    clickRate: 18.2,
    sentDate: "2024-03-10T09:00:00",
    scheduledDate: null,
    type: "Event Promotion",
  },
  {
    id: 2,
    name: "New Platform Features",
    status: "Scheduled",
    audience: "All Users",
    recipients: 12800,
    openRate: null,
    clickRate: null,
    sentDate: null,
    scheduledDate: "2024-03-25T10:00:00",
    type: "Feature Announcement",
  },
  {
    id: 3,
    name: "Employer Recruitment Tips",
    status: "Draft",
    audience: "Employers",
    recipients: 850,
    openRate: null,
    clickRate: null,
    sentDate: null,
    scheduledDate: null,
    type: "Educational",
  },
  {
    id: 4,
    name: "February Placement Report",
    status: "Completed",
    audience: "Institutions",
    recipients: 120,
    openRate: 68.3,
    clickRate: 32.5,
    sentDate: "2024-02-15T08:30:00",
    scheduledDate: null,
    type: "Report",
  },
  {
    id: 5,
    name: "Tech Industry Job Opportunities",
    status: "Active",
    audience: "Job Seekers (Tech)",
    recipients: 1850,
    openRate: 38.7,
    clickRate: 22.1,
    sentDate: "2024-03-12T11:00:00",
    scheduledDate: null,
    type: "Job Alert",
  },
  {
    id: 6,
    name: "Skill Development Workshop",
    status: "Scheduled",
    audience: "Job Seekers (Entry Level)",
    recipients: 2200,
    openRate: null,
    clickRate: null,
    sentDate: null,
    scheduledDate: "2024-03-28T14:00:00",
    type: "Event Promotion",
  },
]

// Sample data for campaign performance
const performanceData = [
  { name: "Jan", openRate: 38.2, clickRate: 12.5, conversionRate: 4.2 },
  { name: "Feb", openRate: 42.5, clickRate: 15.8, conversionRate: 5.1 },
  { name: "Mar", openRate: 45.3, clickRate: 18.2, conversionRate: 6.3 },
  { name: "Apr", openRate: 40.1, clickRate: 16.5, conversionRate: 5.8 },
  { name: "May", openRate: 43.7, clickRate: 17.9, conversionRate: 6.0 },
  { name: "Jun", openRate: 47.2, clickRate: 20.3, conversionRate: 7.2 },
]

// Sample data for audience distribution
const audienceDistribution = [
  { name: "Job Seekers", value: 65 },
  { name: "Employers", value: 20 },
  { name: "Institutions", value: 15 },
]

// Sample data for segments
const segments = [
  {
    id: 1,
    name: "Tech Job Seekers",
    description: "Job seekers interested in technology roles",
    count: 3250,
    criteria: "Interests: Technology, Software, IT",
    lastUpdated: "2024-03-10T09:00:00",
  },
  {
    id: 2,
    name: "Active Employers",
    description: "Employers with active job postings",
    count: 450,
    criteria: "Status: Active, Job Postings > 0",
    lastUpdated: "2024-03-12T14:30:00",
  },
  {
    id: 3,
    name: "New Graduates",
    description: "Recent graduates looking for entry-level positions",
    count: 1850,
    criteria: "Graduation Date: Last 6 months",
    lastUpdated: "2024-03-08T11:15:00",
  },
  {
    id: 4,
    name: "Healthcare Institutions",
    description: "Educational institutions with healthcare programs",
    count: 75,
    criteria: "Institution Type: Healthcare, Medical",
    lastUpdated: "2024-03-05T16:45:00",
  },
  {
    id: 5,
    name: "Inactive Job Seekers",
    description: "Job seekers with no activity in the last 30 days",
    count: 4200,
    criteria: "Last Activity: > 30 days ago",
    lastUpdated: "2024-03-14T10:20:00",
  },
]

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function EmailCampaigns() {
  const [searchCampaigns, setSearchCampaigns] = useState("")
  const [searchSegments, setSearchSegments] = useState("")
  const [selectedCampaignType, setSelectedCampaignType] = useState("all")
  const [selectedSegmentType, setSelectedSegmentType] = useState("all")

  // Filter campaigns based on search and type
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      (campaign.name.toLowerCase().includes(searchCampaigns.toLowerCase()) ||
        campaign.audience.toLowerCase().includes(searchCampaigns.toLowerCase())) &&
      (selectedCampaignType === "all" || campaign.status.toLowerCase() === selectedCampaignType.toLowerCase()),
  )

  // Filter segments based on search and type
  const filteredSegments = segments.filter(
    (segment) =>
      segment.name.toLowerCase().includes(searchSegments.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchSegments.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800"
        case "Scheduled":
            return "bg-blue-100 text-blue-800"
        case "Draft":
            return "bg-purple-100 text-purple-800"
        case "Rejected":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold tracking-tight">Email Campaign Management</h1>
        <p className="text-muted-foreground">
          Create, manage, and analyze email campaigns for different user segments.
        </p>
      </div> */}

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Automated Campaigns
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Performance Analytics
          </TabsTrigger>
          <TabsTrigger value="segments" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Segmentation Tools
          </TabsTrigger>
        </TabsList>

        {/* Automated Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Email Campaigns</CardTitle>
                  <CardDescription>
                    Schedule and send email campaigns to job seekers, employers, or institutions.
                  </CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Create Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="pl-8"
                    value={searchCampaigns}
                    onChange={(e) => setSearchCampaigns(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedCampaignType} onValueChange={setSelectedCampaignType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Campaign Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">{campaign.type}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                                 {campaign.status}
                              </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {campaign.audience.includes("Job Seekers") && (
                              <UserPlus className="h-4 w-4 text-blue-500" />
                            )}
                            {campaign.audience.includes("Employers") && (
                              <Briefcase className="h-4 w-4 text-green-500" />
                            )}
                            {campaign.audience.includes("Institutions") && (
                              <GraduationCap className="h-4 w-4 text-purple-500" />
                            )}
                            {campaign.audience.includes("All") && <Users className="h-4 w-4 text-gray-500" />}
                            <span>{campaign.audience}</span>
                          </div>
                        </TableCell>
                        <TableCell>{campaign.recipients.toLocaleString()}</TableCell>
                        <TableCell>
                          {campaign.openRate !== null ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Open Rate: {campaign.openRate}%</span>
                              </div>
                              <Progress value={campaign.openRate} className="h-1" />
                              <span className="text-xs text-muted-foreground">Click Rate: {campaign.clickRate}%</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not sent yet</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {campaign.sentDate ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Sent: {new Date(campaign.sentDate).toLocaleDateString()}</span>
                            </div>
                          ) : campaign.scheduledDate ? (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Scheduled: {new Date(campaign.scheduledDate).toLocaleDateString()}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not scheduled</span>
                          )}
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
                                <Edit className="h-4 w-4" /> Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Copy className="h-4 w-4" /> Duplicate
                              </DropdownMenuItem>
                              {campaign.status === "Active" ? (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Pause className="h-4 w-4" /> Pause Campaign
                                </DropdownMenuItem>
                              ) : campaign.status === "Draft" || campaign.status === "Scheduled" ? (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Play className="h-4 w-4" /> Start Campaign
                                </DropdownMenuItem>
                              ) : null}
                              {campaign.status !== "Draft" && (
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <BarChart className="h-4 w-4" /> View Analytics
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete Campaign
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
                  Showing <strong>{filteredCampaigns.length}</strong> of <strong>{campaigns.length}</strong> campaigns
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
                <CardTitle>Campaign Templates</CardTitle>
                <CardDescription>Pre-designed templates for quick campaign creation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Job Alert", description: "Notify job seekers about new opportunities", icon: Briefcase },
                    { name: "Event Invitation", description: "Invite users to upcoming events", icon: Calendar },
                    { name: "Welcome Series", description: "Onboard new users to the platform", icon: UserPlus },
                    { name: "Monthly Newsletter", description: "Regular updates and platform news", icon: FileText },
                  ].map((template, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <template.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">{template.description}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Templates
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Campaign</CardTitle>
                <CardDescription>Create and send a simple campaign quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Campaign Name</Label>
                    <Input id="campaign-name" placeholder="Enter campaign name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign-subject">Email Subject</Label>
                    <Input id="campaign-subject" placeholder="Enter email subject" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign-audience">Select Audience</Label>
                    <Select defaultValue="job-seekers">
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job-seekers">All Job Seekers</SelectItem>
                        <SelectItem value="employers">All Employers</SelectItem>
                        <SelectItem value="institutions">All Institutions</SelectItem>
                        <SelectItem value="tech-job-seekers">Tech Job Seekers</SelectItem>
                        <SelectItem value="active-employers">Active Employers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign-message">Message</Label>
                    <Textarea id="campaign-message" placeholder="Enter your message" className="min-h-[100px]" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="schedule" />
                    <Label htmlFor="schedule">Schedule for later</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Draft</Button>
                <Button>Send Campaign</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Average Open Rate", value: "43.2%", change: "+2.8%", icon: Mail, color: "blue" },
              { title: "Average Click Rate", value: "18.7%", change: "+1.5%", icon: BarChart, color: "green" },
              { title: "Conversion Rate", value: "6.3%", change: "+0.9%", icon: LineChart, color: "purple" },
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
                  <p className="text-xs text-green-600">{stat.change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Campaign Performance Trends</CardTitle>
                  <CardDescription>
                    Track email open rates, click-through rates, and campaign success over time.
                  </CardDescription>
                </div>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time period" />
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
                  <RechartLineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="openRate" name="Open Rate %" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="clickRate" name="Click Rate %" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="conversionRate" name="Conversion Rate %" stroke="#ffc658" />
                  </RechartLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
                <CardDescription>Campaigns with the highest engagement rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns
                    .filter((c) => c.openRate !== null)
                    .sort((a, b) => b.openRate! - a.openRate!)
                    .slice(0, 3)
                    .map((campaign, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">{campaign.audience}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{campaign.openRate}% Open Rate</div>
                          <div className="text-sm text-muted-foreground">{campaign.clickRate}% Click Rate</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Distribution</CardTitle>
                <CardDescription>Distribution of campaign recipients by user type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={audienceDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {audienceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {audienceDistribution.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Comparison</CardTitle>
              <CardDescription>Compare performance metrics across different campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={campaigns
                      .filter((c) => c.openRate !== null)
                      .map((c) => ({
                        name: c.name.length > 20 ? c.name.substring(0, 20) + "..." : c.name,
                        openRate: c.openRate,
                        clickRate: c.clickRate,
                      }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="openRate" name="Open Rate %" fill="#8884d8" />
                    <Bar dataKey="clickRate" name="Click Rate %" fill="#82ca9d" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Segmentation Tools Tab */}
        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Audience Segments</CardTitle>
                  <CardDescription>Segment audiences based on activity, interests, or demographics.</CardDescription>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Create Segment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search segments..."
                    className="pl-8"
                    value={searchSegments}
                    onChange={(e) => setSearchSegments(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Segment Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Audience Count</TableHead>
                      <TableHead>Criteria</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSegments.map((segment) => (
                      <TableRow key={segment.id}>
                        <TableCell>
                          <div className="font-medium">{segment.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{segment.description}</div>
                        </TableCell>
                        <TableCell>{segment.count.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="text-sm">{segment.criteria}</div>
                        </TableCell>
                        <TableCell>{new Date(segment.lastUpdated).toLocaleDateString()}</TableCell>
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
                                <Edit className="h-4 w-4" /> Edit Segment
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Copy className="h-4 w-4" /> Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Create Campaign
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                <Trash className="h-4 w-4" /> Delete Segment
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
                  Showing <strong>{filteredSegments.length}</strong> of <strong>{segments.length}</strong> segments
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
                <CardTitle>Create New Segment</CardTitle>
                <CardDescription>Define criteria to create a targeted audience segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="segment-name">Segment Name</Label>
                    <Input id="segment-name" placeholder="Enter segment name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="segment-description">Description</Label>
                    <Textarea id="segment-description" placeholder="Enter segment description" />
                  </div>

                  <div className="space-y-2">
                    <Label>User Type</Label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="user-type-job-seekers" />
                        <Label htmlFor="user-type-job-seekers">Job Seekers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="user-type-employers" />
                        <Label htmlFor="user-type-employers">Employers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="user-type-institutions" />
                        <Label htmlFor="user-type-institutions">Institutions</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Filter Criteria</Label>
                    <div className="space-y-4 p-4 border rounded-md">
                      <div className="grid grid-cols-3 gap-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="skills">Skills</SelectItem>
                            <SelectItem value="location">Location</SelectItem>
                            <SelectItem value="activity">Last Activity</SelectItem>
                            <SelectItem value="profile">Profile Completion</SelectItem>
                          </SelectContent>
                        </Select>

                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="greater-than">Greater Than</SelectItem>
                            <SelectItem value="less-than">Less Than</SelectItem>
                          </SelectContent>
                        </Select>

                        <Input placeholder="Value" />
                      </div>

                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" /> Add Condition
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Create Segment</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segment Analytics</CardTitle>
                <CardDescription>Insights about your audience segments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">Tech Job Seekers</div>
                      <div className="text-sm text-muted-foreground">3,250 users</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">45.2%</div>
                      <div className="text-sm text-green-600">+12% growth</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">Active Employers</div>
                      <div className="text-sm text-muted-foreground">450 users</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">38.7%</div>
                      <div className="text-sm text-green-600">+8% growth</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">New Graduates</div>
                      <div className="text-sm text-muted-foreground">1,850 users</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">52.3%</div>
                      <div className="text-sm text-green-600">+15% growth</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">Inactive Job Seekers</div>
                      <div className="text-sm text-muted-foreground">4,200 users</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">28.1%</div>
                      <div className="text-sm text-red-600">-5% decline</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Analytics
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Segment Performance</CardTitle>
              <CardDescription>Compare campaign performance across different segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={[
                      { name: "Tech Job Seekers", openRate: 48.5, clickRate: 22.3 },
                      { name: "Active Employers", openRate: 52.7, clickRate: 28.4 },
                      { name: "New Graduates", openRate: 45.2, clickRate: 19.8 },
                      { name: "Healthcare Institutions", openRate: 58.3, clickRate: 32.1 },
                      { name: "Inactive Job Seekers", openRate: 32.6, clickRate: 12.5 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="openRate" name="Open Rate %" fill="#8884d8" />
                    <Bar dataKey="clickRate" name="Click Rate %" fill="#82ca9d" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

