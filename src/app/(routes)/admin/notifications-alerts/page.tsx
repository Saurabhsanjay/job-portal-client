"use client"

import { useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Filter,
  Flag,
  HelpCircle,
  Info,
  MessageCircle,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Star,
  ThumbsUp,
  Trash,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function NotificationsAlertsPage() {
  const [activeTab, setActiveTab] = useState("system-alerts")
  const [showResolved, setShowResolved] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedFeedbackType, setSelectedFeedbackType] = useState("all")
  const [selectedEventType, setSelectedEventType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications & Alerts</h1>
          <p className="text-muted-foreground">Manage system alerts, user feedback, and upcoming events</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-1">
            <Settings size={16} />
            <span>Notification Settings</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="system-alerts" className="gap-2">
              <AlertTriangle size={16} />
              <span>System Alerts</span>
              <Badge variant="destructive" className="ml-1">
                12
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="user-feedback" className="gap-2">
              <MessageCircle size={16} />
              <span>User Feedback</span>
              <Badge className="ml-1">28</Badge>
            </TabsTrigger>
            <TabsTrigger value="upcoming-events" className="gap-2">
              <Calendar size={16} />
              <span>Upcoming Events</span>
              <Badge variant="outline" className="ml-1">
                8
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* System Alerts Tab */}
        <TabsContent value="system-alerts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Critical Alerts</CardTitle>
                <CardDescription>Requires immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">3</div>
                <Progress value={30} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Warning Alerts</CardTitle>
                <CardDescription>Potential issues detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-500">7</div>
                <Progress value={70} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Info Alerts</CardTitle>
                <CardDescription>System notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">14</div>
                <Progress value={45} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search alerts..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="show-resolved"
                  checked={showResolved}
                  onCheckedChange={(checked) => setShowResolved(!!checked)}
                />
                <Label htmlFor="show-resolved">Show Resolved</Label>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Bell size={16} />
              <span>Alert Settings</span>
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>System Alert Log</CardTitle>
              <CardDescription>Recent system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Priority</TableHead>
                    <TableHead>Alert</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="w-[150px]">Time</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle size={12} />
                        Critical
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Database connection failure detected</TableCell>
                    <TableCell>System Monitor</TableCell>
                    <TableCell>10 minutes ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Open in Monitoring</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Mute Alerts</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle size={12} />
                        Critical
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Unusual traffic spike detected - possible DDoS</TableCell>
                    <TableCell>Security Monitor</TableCell>
                    <TableCell>25 minutes ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Open in Monitoring</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Mute Alerts</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                      >
                        <AlertTriangle size={12} />
                        Warning
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Server CPU usage exceeding 85% threshold</TableCell>
                    <TableCell>Performance Monitor</TableCell>
                    <TableCell>45 minutes ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Open in Monitoring</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Mute Alerts</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                      >
                        <AlertTriangle size={12} />
                        Warning
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Multiple failed login attempts detected</TableCell>
                    <TableCell>Security Monitor</TableCell>
                    <TableCell>1 hour ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Open in Monitoring</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Mute Alerts</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary" className="gap-1">
                        <Info size={12} />
                        Info
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Scheduled maintenance completed successfully</TableCell>
                    <TableCell>System Updates</TableCell>
                    <TableCell>2 hours ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Resolved
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            <span>Reopen Alert</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            <span>Open in Monitoring</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Export Log</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary" className="gap-1">
                        <Flag size={12} />
                        Info
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Content flagged for review - possible violation</TableCell>
                    <TableCell>Content Monitor</TableCell>
                    <TableCell>3 hours ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        In Review
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Content</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Approve Content</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <X className="mr-2 h-4 w-4" />
                            <span>Remove Content</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Mute Similar Alerts</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 6 of 24 alerts</div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Response Protocols</CardTitle>
                <CardDescription>Standard procedures for different alert types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle size={12} />
                        Critical
                      </Badge>
                      <span className="font-medium">System Outage Protocol</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                      >
                        <AlertTriangle size={12} />
                        Warning
                      </Badge>
                      <span className="font-medium">Security Incident Response</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Flag size={12} />
                        Info
                      </Badge>
                      <span className="font-medium">Content Moderation Guidelines</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Info size={12} />
                        Info
                      </Badge>
                      <span className="font-medium">Maintenance Notification Protocol</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <Progress value={100} className="h-1" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <Plus size={16} />
                  <span>Create New Protocol</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Notification Settings</CardTitle>
                <CardDescription>Configure how you receive alert notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive alerts via email</div>
                  </div>
                  <Switch checked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive critical alerts via SMS</div>
                  </div>
                  <Switch checked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive alerts on your mobile device</div>
                  </div>
                  <Switch checked={false} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Slack Integration</div>
                    <div className="text-sm text-muted-foreground">Send alerts to Slack channels</div>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <Settings size={16} />
                  <span>Advanced Settings</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* User Feedback Tab */}
        <TabsContent value="user-feedback" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">New Feedback</CardTitle>
                <CardDescription>Unreviewed feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18</div>
                <Progress value={60} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">In Progress</CardTitle>
                <CardDescription>Being addressed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
                <Progress value={25} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Resolved</CardTitle>
                <CardDescription>Completed this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">42</div>
                <Progress value={80} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Satisfaction</CardTitle>
                <CardDescription>Average rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <div className="text-3xl font-bold">4.2</div>
                  <div className="text-muted-foreground">/5</div>
                  <Star className="h-5 w-5 text-amber-500 ml-1" fill="currentColor" />
                </div>
                <Progress value={84} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search feedback..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedFeedbackType} onValueChange={setSelectedFeedbackType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="bug">Bug Reports</SelectItem>
                  <SelectItem value="feature">Feature Requests</SelectItem>
                  <SelectItem value="complaint">Complaints</SelectItem>
                  <SelectItem value="praise">Praise</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Download size={16} />
              <span>Export Feedback</span>
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Feedback Management</CardTitle>
              <CardDescription>Review and respond to user-reported issues and suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead className="w-[150px]">User</TableHead>
                    <TableHead className="w-[120px]">Submitted</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle size={12} />
                        Bug
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      Job application form crashes when uploading PDF resumes
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                      </div>
                    </TableCell>
                    <TableCell>2 hours ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        New
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Respond</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as In Progress</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Assign to Team</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                        <HelpCircle size={12} />
                        Feature
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Request for dark mode option across the platform</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <span>Alex Smith</span>
                      </div>
                    </TableCell>
                    <TableCell>1 day ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        In Progress
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Respond</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Reassign</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
                        <X size={12} />
                        Complaint
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Employer not responding to applications after 3 weeks</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <span>Maria Johnson</span>
                      </div>
                    </TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        In Progress
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Respond</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Resolved</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Contact Employer</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                        <ThumbsUp size={12} />
                        Praise
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      The new skill matching algorithm helped me find the perfect job
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>RP</AvatarFallback>
                        </Avatar>
                        <span>Robert Park</span>
                      </div>
                    </TableCell>
                    <TableCell>3 days ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Resolved
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Send Thanks</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            <span>Reopen</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Export</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                        <HelpCircle size={12} />
                        Feature
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Request for integration with LinkedIn profiles</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>SL</AvatarFallback>
                        </Avatar>
                        <span>Sarah Lee</span>
                      </div>
                    </TableCell>
                    <TableCell>5 days ago</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        New
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Respond</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as In Progress</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Assign to Team</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 28 feedback items</div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Response Templates</CardTitle>
                <CardDescription>Pre-written responses for common feedback types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive" className="gap-1">
                        <AlertCircle size={12} />
                        Bug
                      </Badge>
                      <span className="font-medium">Bug Report Acknowledgment</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    Thank you for reporting this issue. Our technical team is investigating...
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="gap-1 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                        <HelpCircle size={12} />
                        Feature
                      </Badge>
                      <span className="font-medium">Feature Request Response</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    We appreciate your suggestion! We're always looking to improve...
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="gap-1 bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
                        <X size={12} />
                        Complaint
                      </Badge>
                      <span className="font-medium">Complaint Resolution</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    We're sorry to hear about your experience. We take your concerns seriously...
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="gap-1 bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                        <ThumbsUp size={12} />
                        Praise
                      </Badge>
                      <span className="font-medium">Positive Feedback Thanks</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    Thank you for your kind words! We're delighted to hear that our platform...
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <Plus size={16} />
                  <span>Create New Template</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Analytics</CardTitle>
                <CardDescription>Insights from user feedback trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">Feedback by Type</div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col items-center p-2 rounded-md bg-red-50">
                      <div className="text-xl font-bold text-red-700">32%</div>
                      <div className="text-xs text-muted-foreground">Bugs</div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-md bg-blue-50">
                      <div className="text-xl font-bold text-blue-700">28%</div>
                      <div className="text-xs text-muted-foreground">Features</div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-md bg-amber-50">
                      <div className="text-xl font-bold text-amber-700">24%</div>
                      <div className="text-xs text-muted-foreground">Complaints</div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-md bg-green-50">
                      <div className="text-xl font-bold text-green-700">16%</div>
                      <div className="text-xs text-muted-foreground">Praise</div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium">Response Time</div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">
                      8.4 <span className="text-sm font-normal text-muted-foreground">hours</span>
                    </div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <ChevronDown className="h-4 w-4 rotate-180" />
                      <span>12% faster than last month</span>
                    </div>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium">Common Topics</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">User Interface (24)</Badge>
                    <Badge variant="secondary">Application Process (18)</Badge>
                    <Badge variant="secondary">Profile Creation (15)</Badge>
                    <Badge variant="secondary">Search Functionality (12)</Badge>
                    <Badge variant="secondary">Mobile Experience (10)</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <ExternalLink size={16} />
                  <span>View Detailed Analytics</span>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Upcoming Events Tab */}
        <TabsContent value="upcoming-events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
                <CardDescription>Next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <Progress value={40} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Job Fairs</CardTitle>
                <CardDescription>Scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <Progress value={30} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Webinars</CardTitle>
                <CardDescription>Upcoming</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4</div>
                <Progress value={50} className="h-2 mt-2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Workshops</CardTitle>
                <CardDescription>Skill development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1</div>
                <Progress value={10} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="job-fair">Job Fairs</SelectItem>
                  <SelectItem value="webinar">Webinars</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <Plus size={16} />
                  <span>Create Event</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>Add details for the new event. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-name" className="text-right">
                      Event Name
                    </Label>
                    <Input id="event-name" className="col-span-3" placeholder="Enter event name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-type" className="text-right">
                      Event Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job-fair">Job Fair</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="networking">Networking Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-date" className="text-right">
                      Date & Time
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      <Input id="event-date" type="date" className="flex-1" />
                      <Input type="time" className="w-[120px]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-location" className="text-right">
                      Location
                    </Label>
                    <Input id="event-location" className="col-span-3" placeholder="Virtual or physical location" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="event-description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea id="event-description" className="col-span-3" placeholder="Enter event description" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-capacity" className="text-right">
                      Capacity
                    </Label>
                    <Input
                      id="event-capacity"
                      type="number"
                      className="col-span-3"
                      placeholder="Maximum number of participants"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateEventOpen(false)}>Save Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Events Calendar</CardTitle>
              <CardDescription>Scheduled job fairs, webinars, and skill development sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead className="w-[150px]">Date & Time</TableHead>
                    <TableHead className="w-[120px]">Location</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100">
                        <Users size={12} />
                        Job Fair
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Spring Tech Career Expo 2023</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>Apr 15, 2023</span>
                        <span className="text-xs text-muted-foreground">10:00 AM - 4:00 PM</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>Convention Center</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Upcoming
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Send Notification</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>View Registrations</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Cancel Event</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                        <MessageCircle size={12} />
                        Webinar
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Resume Building Masterclass for Tech Professionals</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>Apr 18, 2023</span>
                        <span className="text-xs text-muted-foreground">2:00 PM - 3:30 PM</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>Virtual (Zoom)</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Upcoming
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Send Notification</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>View Registrations</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Cancel Event</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                        <MessageCircle size={12} />
                        Webinar
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Navigating the Job Market in 2023</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>Apr 22, 2023</span>
                        <span className="text-xs text-muted-foreground">1:00 PM - 2:00 PM</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>Virtual (Teams)</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Upcoming
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Send Notification</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>View Registrations</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Cancel Event</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                        <HelpCircle size={12} />
                        Workshop
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Advanced Interview Skills Workshop</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>Apr 25, 2023</span>
                        <span className="text-xs text-muted-foreground">9:00 AM - 12:00 PM</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>Innovation Hub</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Upcoming
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Send Notification</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>View Registrations</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Cancel Event</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge className="gap-1 bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100">
                        <Users size={12} />
                        Job Fair
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">Healthcare Industry Recruitment Day</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>May 5, 2023</span>
                        <span className="text-xs text-muted-foreground">10:00 AM - 3:00 PM</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>Medical Center</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Upcoming
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            <span>Send Notification</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <span>View Registrations</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Cancel Event</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 5 of 8 upcoming events</div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Attendance Analytics</CardTitle>
                <CardDescription>Insights from past events and registrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">Average Attendance Rate</div>
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold">78%</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <ChevronDown className="h-4 w-4 rotate-180" />
                      <span>5% higher than last quarter</span>
                    </div>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium">Attendance by Event Type</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center p-2 rounded-md bg-purple-50">
                      <div className="text-xl font-bold text-purple-700">85%</div>
                      <div className="text-xs text-muted-foreground">Job Fairs</div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-md bg-blue-50">
                      <div className="text-xl font-bold text-blue-700">72%</div>
                      <div className="text-xs text-muted-foreground">Webinars</div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-md bg-green-50">
                      <div className="text-xl font-bold text-green-700">81%</div>
                      <div className="text-xs text-muted-foreground">Workshops</div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="font-medium">Most Popular Events</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tech Career Expo</span>
                      <span className="text-sm font-medium">342 attendees</span>
                    </div>
                    <Progress value={95} className="h-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Resume Workshop</span>
                      <span className="text-sm font-medium">287 attendees</span>
                    </div>
                    <Progress value={80} className="h-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Interview Skills</span>
                      <span className="text-sm font-medium">253 attendees</span>
                    </div>
                    <Progress value={70} className="h-1" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-1">
                  <ExternalLink size={16} />
                  <span>View Full Analytics</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Management Tools</CardTitle>
                <CardDescription>Quick access to event management functions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">Event Scheduler</div>
                        <div className="text-sm text-muted-foreground">Plan and schedule new events</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">Registration Manager</div>
                        <div className="text-sm text-muted-foreground">Track and manage event registrations</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">Notification System</div>
                        <div className="text-sm text-muted-foreground">Send reminders and updates to attendees</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">Check-in System</div>
                        <div className="text-sm text-muted-foreground">Manage attendee check-ins at events</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Filter className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">Feedback Collector</div>
                        <div className="text-sm text-muted-foreground">Gather and analyze event feedback</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full gap-1">
                      <Settings size={16} />
                      <span>Configure Event Settings</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Event Settings</h4>
                        <p className="text-sm text-muted-foreground">Configure default settings for events</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-reminders">Automatic Reminders</Label>
                          <Switch id="auto-reminders" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="public-listing">Public Event Listing</Label>
                          <Switch id="public-listing" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="feedback-collection">Feedback Collection</Label>
                          <Switch id="feedback-collection" />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

