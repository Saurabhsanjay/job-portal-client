"use client"

import { useState } from "react"
import {
  BarChart3,
  Users,
  ShieldCheck,
  AlertTriangle,
  Search,
  Download,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Eye,
  User,
  Building,
  Shield,
  Database,
  History,
  UserCheck,
  FileQuestion,
  Settings,
  Bell,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

export default function SecurityCompliancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTab, setCurrentTab] = useState("verification")

  return (
    <div className="w-full h-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security and Compliance</h1>
          <p className="text-muted-foreground">
            Manage platform security, user verification, and regulatory compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="default" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      <Tabs defaultValue="verification" className="space-y-4" onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verification">User Verification</TabsTrigger>
          <TabsTrigger value="gdpr">GDPR Compliance</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        {/* USER VERIFICATION TAB */}
        <TabsContent value="verification" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+5 since yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Time to Verify</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.4 days</div>
                <p className="text-xs text-muted-foreground">-0.3 days from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Verification Queue</CardTitle>
                <CardDescription>Manage verification requests from users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center pb-4 justify-between">
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="User Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="jobseekers">Job Seekers</SelectItem>
                        <SelectItem value="employers">Employers</SelectItem>
                        <SelectItem value="institutions">Institutions</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="pending">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="additional">Needs Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name or ID..."
                      className="pl-8 w-[250px]"
                      value={searchQuery}
                      onChange={(e:any) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Sarah Johnson</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Job Seeker</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge variant="secondary">ID</Badge>
                          <Badge variant="secondary">Resume</Badge>
                        </div>
                      </TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3 mr-1" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Verification Review - Sarah Johnson</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-2">ID Document</h3>
                                  <div className="bg-muted/50 rounded-md aspect-video flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-muted-foreground/80" />
                                    <span className="ml-2 text-sm text-muted-foreground">[ID Document Preview]</span>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-2">Resume</h3>
                                  <div className="bg-muted/50 rounded-md aspect-video flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-muted-foreground/80" />
                                    <span className="ml-2 text-sm text-muted-foreground">[Resume Preview]</span>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <h3 className="font-semibold mb-2">User Profile</h3>
                                  <div className="bg-muted/50 p-4 rounded-md">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div>
                                        <span className="text-muted-foreground">Name:</span> Sarah Johnson
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Email:</span> sarah.j@example.com
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Phone:</span> +1 555-123-4567
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Location:</span> Boston, MA
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Skills:</span> Project Management,
                                        Marketing
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Joined:</span> June 15, 2023
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between mt-4">
                                <Button variant="destructive" size="sm">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                                <Button variant="outline" size="sm">
                                  <FileQuestion className="h-4 w-4 mr-2" />
                                  Request More Info
                                </Button>
                                <Button size="sm">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Select>
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approve">Approve</SelectItem>
                              <SelectItem value="reject">Reject</SelectItem>
                              <SelectItem value="request">Request Info</SelectItem>
                              <SelectItem value="flag">Flag Account</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <span>TechWorks Inc.</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Employer</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge variant="secondary">Business License</Badge>
                          <Badge variant="secondary">Tax ID</Badge>
                        </div>
                      </TableCell>
                      <TableCell>1 day ago</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                          <Select>
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approve">Approve</SelectItem>
                              <SelectItem value="reject">Reject</SelectItem>
                              <SelectItem value="request">Request Info</SelectItem>
                              <SelectItem value="flag">Flag Account</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <span>State University</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Institution</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge variant="secondary">Accreditation</Badge>
                          <Badge variant="secondary">Registration</Badge>
                        </div>
                      </TableCell>
                      <TableCell>3 days ago</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>Robert Chen</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Job Seeker</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge variant="secondary">ID</Badge>
                          <Badge variant="secondary">Degree</Badge>
                        </div>
                      </TableCell>
                      <TableCell>4 days ago</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="flex items-center justify-end space-x-2 py-4">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Verification Settings</CardTitle>
                <CardDescription>Customize verification requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Required Documents</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="jobseeker-id" checked />
                        <label htmlFor="jobseeker-id" className="text-sm">
                          Job Seeker - ID Verification
                        </label>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="employer-license" checked />
                        <label htmlFor="employer-license" className="text-sm">
                          Employer - Business License
                        </label>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="employer-tax" checked />
                        <label htmlFor="employer-tax" className="text-sm">
                          Employer - Tax ID
                        </label>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="institution-accred" checked />
                        <label htmlFor="institution-accred" className="text-sm">
                          Institution - Accreditation
                        </label>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Verification Process</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-verification for basic profiles</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Multi-step verification for employers</span>
                      <Switch checked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email domain verification</span>
                      <Switch checked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phone verification required</span>
                      <Switch checked />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Verification Team</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>5 team members assigned</p>
                    <p>Avg. response time: 6.2 hours</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Verification Analytics</CardTitle>
                <CardDescription>Verification trends and statistics</CardDescription>
              </CardHeader>
              <CardContent className="h-[240px] flex flex-col justify-center items-center text-center p-6">
                <BarChart3 className="h-10 w-10 mb-4 text-muted-foreground/60" />
                <div className="text-sm text-muted-foreground">
                  [Verification analytics chart showing approval rates, processing times, and verification volume over
                  time]
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Eye className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Actions</CardTitle>
                <CardDescription>Latest verification activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">State University verified</p>
                      <p className="text-xs text-muted-foreground">Institutional accreditation approved by admin</p>
                      <p className="text-xs text-muted-foreground">Today at 9:42 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <FileQuestion className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Additional info requested from TechWorks Inc.</p>
                      <p className="text-xs text-muted-foreground">Business license requires clarification</p>
                      <p className="text-xs text-muted-foreground">Today at 8:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Robert Chen verification rejected</p>
                      <p className="text-xs text-muted-foreground">ID document appears to be altered</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 4:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Settings className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Verification settings updated</p>
                      <p className="text-xs text-muted-foreground">Added new requirements for employers</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* GDPR COMPLIANCE TAB */}
        <TabsContent value="gdpr" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Data Requests</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 pending, 5 processed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Consent Opt-outs</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5 in the last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Privacy Alerts</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Requires immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-muted-foreground">+2% from last assessment</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Data Subject Requests</CardTitle>
                <CardDescription>Manage user data access, erasure, and portability requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center pb-4 justify-between">
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Request Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Requests</SelectItem>
                        <SelectItem value="access">Access Requests</SelectItem>
                        <SelectItem value="erasure">Erasure Requests</SelectItem>
                        <SelectItem value="portability">Data Portability</SelectItem>
                        <SelectItem value="correction">Data Correction</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="pending">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by user or ID..."
                      className="pl-8 w-[250px]"
                      value={searchQuery}
                      onChange={(e:any) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">DSR-2023-042</TableCell>
                      <TableCell>Elena Martinez</TableCell>
                      <TableCell>
                        <Badge variant="outline">Data Access</Badge>
                      </TableCell>
                      <TableCell>Jun 14, 2023</TableCell>
                      <TableCell>Jul 14, 2023</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Select>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="process">Process</SelectItem>
                              <SelectItem value="reject">Reject</SelectItem>
                              <SelectItem value="export">Export Data</SelectItem>
                              <SelectItem value="escalate">Escalate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DSR-2023-041</TableCell>
                      <TableCell>Michael Thompson</TableCell>
                      <TableCell>
                        <Badge variant="outline">Data Erasure</Badge>
                      </TableCell>
                      <TableCell>Jun 12, 2023</TableCell>
                      <TableCell>Jul 12, 2023</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Select>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="complete">Complete</SelectItem>
                              <SelectItem value="reject">Reject</SelectItem>
                              <SelectItem value="pause">Pause</SelectItem>
                              <SelectItem value="escalate">Escalate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DSR-2023-039</TableCell>
                      <TableCell>James Wilson</TableCell>
                      <TableCell>
                        <Badge variant="outline">Data Portability</Badge>
                      </TableCell>
                      <TableCell>Jun 10, 2023</TableCell>
                      <TableCell>Jul 10, 2023</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Log
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">DSR-2023-038</TableCell>
                      <TableCell>Sophia Lee</TableCell>
                      <TableCell>
                        <Badge variant="outline">Data Correction</Badge>
                      </TableCell>
                      <TableCell>Jun 8, 2023</TableCell>
                      <TableCell>Jul 8, 2023</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="flex items-center justify-end space-x-2 py-4">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Tools</CardTitle>
                <CardDescription>Key GDPR compliance management tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Consent Management</h3>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Consent Tracking</span>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tracks user consent for marketing, analytics, and data processing
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <Settings className="h-3 w-3 mr-2" />
                      Manage Consent Settings
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Data Retention</h3>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Retention Policies</span>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Controls data lifecycle and automatic deletion schedules
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <Settings className="h-3 w-3 mr-2" />
                      Manage Retention Settings
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Data Processing Register</h3>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Processing Activities</span>
                      <span className="text-xs text-amber-600 font-medium">Needs Review</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Registry of all data processing activities and purposes
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      <Eye className="h-3 w-3 mr-2" />
                      View Processing Register
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Privacy Documents</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Privacy Policy</span>
                      </div>
                      <Badge variant="outline">Updated</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Terms of Service</span>
                      </div>
                      <Badge variant="outline">Updated</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Cookie Policy</span>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">Review Needed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Protection Impact Assessment</CardTitle>
                <CardDescription>Track and manage DPIAs for high-risk processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Automated Job Matching DPIA</h3>
                      <p className="text-xs text-muted-foreground">Assessment of AI-powered job matching algorithm</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Employer Background Check DPIA</h3>
                      <p className="text-xs text-muted-foreground">Assessment of employer verification process</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Skill Assessment DPIA</h3>
                      <p className="text-xs text-muted-foreground">Assessment of candidate skill evaluation process</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Not Started</Badge>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    New Assessment
                  </Button>
                </div>

                <div className="h-[160px] flex flex-col justify-center items-center text-center p-6 mt-4 border rounded-md">
                  <BarChart3 className="h-8 w-8 mb-2 text-muted-foreground/60" />
                  <div className="text-sm text-muted-foreground">
                    [DPIA risk assessment chart showing risk levels across different data processing activities]
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Breach Management</CardTitle>
                <CardDescription>Protocols and tools for handling data breaches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Breach Response Team</h3>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm">Response team fully staffed and trained</p>
                      <p className="text-xs text-muted-foreground mt-1">Last drill: May 15, 2023</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Users className="h-3 w-3 mr-2" />
                          Team Members
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bell className="h-3 w-3 mr-2" />
                          Alert Team
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Breach Response Protocol</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">72-hour notification procedure</span>
                        <Badge variant="outline" className="text-green-600">
                          Ready
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Impact assessment templates</span>
                        <Badge variant="outline" className="text-green-600">
                          Ready
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">User notification templates</span>
                        <Badge variant="outline" className="text-green-600">
                          Ready
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Regulatory reporting forms</span>
                        <Badge variant="outline" className="text-green-600">
                          Ready
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Breach History</h3>
                    <div className="text-sm text-center p-4 bg-muted/30 rounded-md">
                      <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground/60" />
                      <p>No data breaches reported</p>
                      <p className="text-xs text-muted-foreground mt-1">Platform secure since launch</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AUDIT LOGS TAB */}
        <TabsContent value="audit" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
                <History className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34,892</div>
                <p className="text-xs text-muted-foreground">+243 in the last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Admin Actions</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">542</div>
                <p className="text-xs text-muted-foreground">+18 in the last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">System Changes</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+3 in the last 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Security Events</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+2 in the last 24 hours</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Audit Log Explorer</CardTitle>
                  <CardDescription>View and search all system activities and changes</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center pb-4 justify-between flex-wrap gap-4">
                <div className="flex gap-2 flex-wrap">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Log Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Logs</SelectItem>
                      <SelectItem value="admin">Admin Actions</SelectItem>
                      <SelectItem value="system">System Changes</SelectItem>
                      <SelectItem value="security">Security Events</SelectItem>
                      <SelectItem value="user">User Actions</SelectItem>
                      <SelectItem value="data">Data Changes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="24h">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="h-10">
                    <Filter className="h-3 w-3 mr-2" />
                    More Filters
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="pl-8 w-[300px]"
                    value={searchQuery}
                    onChange={(e:any) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Timestamp</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>User/System</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-xs">
                      2023-06-15
                      <br />
                      10:42:15
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">User verification approved</div>
                      <div className="text-xs text-muted-foreground">
                        Institutional verification for State University
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>admin.jones</span>
                      </div>
                    </TableCell>
                    <TableCell>192.168.1.54</TableCell>
                    <TableCell>
                      <Badge variant="outline">Admin Action</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Success</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">
                      2023-06-15
                      <br />
                      10:38:42
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">System update deployed</div>
                      <div className="text-xs text-muted-foreground">Platform version 2.4.5 deployed to production</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Settings className="h-3 w-3" />
                        <span>system</span>
                      </div>
                    </TableCell>
                    <TableCell>Internal</TableCell>
                    <TableCell>
                      <Badge variant="outline">System Change</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Success</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">
                      2023-06-15
                      <br />
                      09:15:33
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">Multiple failed login attempts</div>
                      <div className="text-xs text-muted-foreground">
                        5 failed login attempts for account user.smith
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3" />
                        <span>security</span>
                      </div>
                    </TableCell>
                    <TableCell>203.45.67.89</TableCell>
                    <TableCell>
                      <Badge variant="outline">Security Event</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">
                      2023-06-15
                      <br />
                      08:42:11
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">GDPR data request processed</div>
                      <div className="text-xs text-muted-foreground">
                        Data export completed for user Michael Thompson
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>admin.roberts</span>
                      </div>
                    </TableCell>
                    <TableCell>192.168.1.23</TableCell>
                    <TableCell>
                      <Badge variant="outline">Admin Action</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Success</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">
                      2023-06-15
                      <br />
                      07:36:28
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">New admin user created</div>
                      <div className="text-xs text-muted-foreground">Admin account created for security.team</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>admin.super</span>
                      </div>
                    </TableCell>
                    <TableCell>192.168.1.54</TableCell>
                    <TableCell>
                      <Badge variant="outline">System Change</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Success</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-xs">
                      2023-06-14
                      <br />
                      23:12:45
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">Suspicious login activity detected</div>
                      <div className="text-xs text-muted-foreground">
                        Login from unrecognized location for admin.jones
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3" />
                        <span>security</span>
                      </div>
                    </TableCell>
                    <TableCell>45.67.89.123</TableCell>
                    <TableCell>
                      <Badge variant="outline">Security Event</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800">Alert</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">1-10</span> of <span className="font-medium">237</span> results
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Log Retention Policy</CardTitle>
                <CardDescription>Configure how long different types of logs are stored</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Admin Action Logs</h3>
                      <p className="text-xs text-muted-foreground">All administrator activities</p>
                    </div>
                    <Select defaultValue="365">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="730">2 years</SelectItem>
                        <SelectItem value="1825">5 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Security Event Logs</h3>
                      <p className="text-xs text-muted-foreground">Security alerts and incidents</p>
                    </div>
                    <Select defaultValue="730">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="730">2 years</SelectItem>
                        <SelectItem value="1825">5 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">System Change Logs</h3>
                      <p className="text-xs text-muted-foreground">Platform updates and configuration changes</p>
                    </div>
                    <Select defaultValue="365">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="730">2 years</SelectItem>
                        <SelectItem value="1825">5 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">User Action Logs</h3>
                      <p className="text-xs text-muted-foreground">Standard user activities</p>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Data Access Logs</h3>
                      <p className="text-xs text-muted-foreground">Records of sensitive data access</p>
                    </div>
                    <Select defaultValue="730">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="730">2 years</SelectItem>
                        <SelectItem value="1825">5 years</SelectItem>
                        <SelectItem value="3650">10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Update Retention Policies
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Log Analysis</CardTitle>
                <CardDescription>Insights and patterns from audit logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] flex flex-col justify-center items-center text-center p-6 mb-4 border rounded-md">
                  <BarChart3 className="h-8 w-8 mb-2 text-muted-foreground/60" />
                  <div className="text-sm text-muted-foreground">
                    [Audit log activity chart showing volume by category over time]
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Top Admin Actions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>User verification reviews</span>
                        <span className="font-medium">43%</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "43%" }} />
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Content moderation</span>
                        <span className="font-medium">27%</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "27%" }} />
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>System configuration</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "18%" }} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Security Incidents</h3>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-sm">Failed login attempts</span>
                      </div>
                      <Badge>5 today</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md mt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="text-sm">Unusual access patterns</span>
                      </div>
                      <Badge>2 today</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md mt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm">Permission changes</span>
                      </div>
                      <Badge>1 today</Badge>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="mt-4 w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

