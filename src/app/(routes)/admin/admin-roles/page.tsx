"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  CheckCircle,
  ChevronDown,
  Clock,
  Edit,
  Eye,
  FileText,
  Filter,
  Lock,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  ShieldAlert,
  Trash,
  UserCog,
  UserPlus,
  Users,
  XCircle,
  MessageSquare,
  CheckSquare,
  Calendar,
  AlertCircle,
  Bell,
} from "lucide-react"

export default function AdminRoles() {
  const [searchRoles, setSearchRoles] = useState("")
  const [searchLogs, setSearchLogs] = useState("")
  const [searchTasks, setSearchTasks] = useState("")

  return (
    <div className="space-y-6">
      {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Multi-Administrator Roles</h1>
          <p className="text-muted-foreground">Manage admin roles, track activities, and collaborate with your team</p>
        </div>
      </div> */}

      <Tabs defaultValue="role-based-access" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="role-based-access">Role-Based Access</TabsTrigger>
          <TabsTrigger value="activity-logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="team-collaboration">Team Collaboration</TabsTrigger>
        </TabsList>

        {/* Role-Based Access Tab */}
        <TabsContent value="role-based-access" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Administrators</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Roles</CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">Super Admin, Content, Support, etc.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Currently logged in admins</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Permission Sets</CardTitle>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Customizable permission groups</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            {/* Admin Users Table */}
            <Card className="md:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Administrator Users</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Admin
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Add New Administrator</DialogTitle>
                        <DialogDescription>
                          Create a new administrator account with specific role and permissions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" placeholder="John Doe" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" placeholder="john.doe@example.com" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="super-admin">Super Admin</SelectItem>
                              <SelectItem value="content-manager">Content Manager</SelectItem>
                              <SelectItem value="support-admin">Support Admin</SelectItem>
                              <SelectItem value="analytics-admin">Analytics Admin</SelectItem>
                              <SelectItem value="verification-admin">Verification Admin</SelectItem>
                              <SelectItem value="read-only">Read Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Status</Label>
                          <div className="flex items-center space-x-2 col-span-3">
                            <Switch id="active-status" defaultChecked />
                            <Label htmlFor="active-status">Active</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create Administrator</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Manage administrator accounts and their assigned roles</CardDescription>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search administrators..."
                    value={searchRoles}
                    onChange={(e) => setSearchRoles(e.target.value)}
                    className="h-8 w-[200px] lg:w-[300px]"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-auto h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filter</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Checkbox id="super-admin" className="mr-2" />
                        <label htmlFor="super-admin">Super Admin</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="content-manager" className="mr-2" />
                        <label htmlFor="content-manager">Content Manager</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="support-admin" className="mr-2" />
                        <label htmlFor="support-admin">Support Admin</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="analytics-admin" className="mr-2" />
                        <label htmlFor="analytics-admin">Analytics Admin</label>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Checkbox id="active" className="mr-2" />
                        <label htmlFor="active">Active</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="inactive" className="mr-2" />
                        <label htmlFor="inactive">Inactive</label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Administrator</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Jane Doe</div>
                            <div className="text-xs text-muted-foreground">jane.doe@recruit-g.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                          Super Admin
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>Just now</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">John Smith</div>
                            <div className="text-xs text-muted-foreground">john.smith@recruit-g.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                          Content Manager
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>AK</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Alex Kim</div>
                            <div className="text-xs text-muted-foreground">alex.kim@recruit-g.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                          Support Admin
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>1 day ago</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>MP</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Maria Perez</div>
                            <div className="text-xs text-muted-foreground">maria.perez@recruit-g.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-cyan-50 text-cyan-700 hover:bg-cyan-50">
                          Analytics Admin
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                          Inactive
                        </Badge>
                      </TableCell>
                      <TableCell>2 weeks ago</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Lock className="mr-2 h-4 w-4" />
                              Manage Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Role Management */}
            <Card className="md:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Role Management</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Role
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Create New Role</DialogTitle>
                        <DialogDescription>
                          Define a new administrator role with specific permissions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role-name" className="text-right">
                            Role Name
                          </Label>
                          <Input id="role-name" placeholder="e.g. Event Manager" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role-description" className="text-right">
                            Description
                          </Label>
                          <Input
                            id="role-description"
                            placeholder="Brief description of role responsibilities"
                            className="col-span-3"
                          />
                        </div>
                        <Separator />
                        <h3 className="font-medium">Permission Groups</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="user-management" />
                              <Label htmlFor="user-management">User Management</Label>
                            </div>
                            <Select defaultValue="read">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Access Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Access</SelectItem>
                                <SelectItem value="read">Read Only</SelectItem>
                                <SelectItem value="write">Read/Write</SelectItem>
                                <SelectItem value="full">Full Access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="content-management" />
                              <Label htmlFor="content-management">Content Management</Label>
                            </div>
                            <Select defaultValue="read">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Access Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Access</SelectItem>
                                <SelectItem value="read">Read Only</SelectItem>
                                <SelectItem value="write">Read/Write</SelectItem>
                                <SelectItem value="full">Full Access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="analytics" />
                              <Label htmlFor="analytics">Analytics & Reports</Label>
                            </div>
                            <Select defaultValue="read">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Access Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Access</SelectItem>
                                <SelectItem value="read">Read Only</SelectItem>
                                <SelectItem value="write">Read/Write</SelectItem>
                                <SelectItem value="full">Full Access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="security" />
                              <Label htmlFor="security">Security & Compliance</Label>
                            </div>
                            <Select defaultValue="none">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Access Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Access</SelectItem>
                                <SelectItem value="read">Read Only</SelectItem>
                                <SelectItem value="write">Read/Write</SelectItem>
                                <SelectItem value="full">Full Access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="admin-management" />
                              <Label htmlFor="admin-management">Admin Management</Label>
                            </div>
                            <Select defaultValue="none">
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Access Level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">No Access</SelectItem>
                                <SelectItem value="read">Read Only</SelectItem>
                                <SelectItem value="write">Read/Write</SelectItem>
                                <SelectItem value="full">Full Access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create Role</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Define and manage administrator roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <div>
                          <h3 className="font-medium">Super Admin</h3>
                          <p className="text-xs text-muted-foreground">Full access to all system features</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            View Assigned Users
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        User Management
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Content Management
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Analytics
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Security
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Admin Management
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-purple-600" />
                        <div>
                          <h3 className="font-medium">Content Manager</h3>
                          <p className="text-xs text-muted-foreground">Manage blog posts, resources, and events</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            View Assigned Users
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        Content Management
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Event Promotion
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Blog Management
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-amber-600" />
                        <div>
                          <h3 className="font-medium">Support Admin</h3>
                          <p className="text-xs text-muted-foreground">Handle user support and feedback</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            View Assigned Users
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        User Management
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Feedback Management
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Support Tools
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="activity-logs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+124 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Admins Today</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Out of 24 total administrators</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Events</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Changes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">In the last 24 hours</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Administrator Activity Log</CardTitle>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
              </div>
              <CardDescription>Track and monitor administrator activities across the platform</CardDescription>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchLogs}
                  onChange={(e) => setSearchLogs(e.target.value)}
                  className="h-8 w-[200px] lg:w-[300px]"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Checkbox id="user-actions" className="mr-2" />
                      <label htmlFor="user-actions">User Management</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="content-actions" className="mr-2" />
                      <label htmlFor="content-actions">Content Changes</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="security-actions" className="mr-2" />
                      <label htmlFor="security-actions">Security Actions</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="system-actions" className="mr-2" />
                      <label htmlFor="system-actions">System Changes</label>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Admin</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Checkbox id="super-admins" className="mr-2" />
                      <label htmlFor="super-admins">Super Admins</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="content-managers" className="mr-2" />
                      <label htmlFor="content-managers">Content Managers</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="support-admins" className="mr-2" />
                      <label htmlFor="support-admins">Support Admins</label>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Administrator</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Jane Doe</div>
                      </div>
                    </TableCell>
                    <TableCell>Created new admin user</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        Admin Management
                      </Badge>
                    </TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>Just now</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">John Smith</div>
                      </div>
                    </TableCell>
                    <TableCell>Published new blog post</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                        Content Management
                      </Badge>
                    </TableCell>
                    <TableCell>192.168.1.107</TableCell>
                    <TableCell>1 hour ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AK</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Alex Kim</div>
                      </div>
                    </TableCell>
                    <TableCell>Responded to user feedback</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                        Support
                      </Badge>
                    </TableCell>
                    <TableCell>192.168.1.112</TableCell>
                    <TableCell>2 hours ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Jane Doe</div>
                      </div>
                    </TableCell>
                    <TableCell>Modified security settings</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                        Security
                      </Badge>
                    </TableCell>
                    <TableCell>192.168.1.105</TableCell>
                    <TableCell>3 hours ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">Maria Perez</div>
                      </div>
                    </TableCell>
                    <TableCell>Generated analytics report</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-cyan-50 text-cyan-700 hover:bg-cyan-50">
                        Analytics
                      </Badge>
                    </TableCell>
                    <TableCell>192.168.1.118</TableCell>
                    <TableCell>Yesterday</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Recent security-related activities that may require attention</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 rounded-lg border p-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <div className="font-medium">Multiple failed login attempts</div>
                        <div className="text-sm text-muted-foreground">
                          5 failed attempts for admin account "john.smith"
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">2 hours ago</div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          Investigate
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 rounded-lg border p-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                      <div>
                        <div className="font-medium">Permission changes detected</div>
                        <div className="text-sm text-muted-foreground">
                          Admin role "Content Manager" permissions modified
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">Yesterday</div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          Review Changes
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 rounded-lg border p-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <div className="font-medium">Unusual login location</div>
                        <div className="text-sm text-muted-foreground">
                          Admin "maria.perez" logged in from new location
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">2 days ago</div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          Verify
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Notifications</CardTitle>
                <CardDescription>Configure how you want to be notified about admin activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-admin">New Administrator Created</Label>
                      <p className="text-xs text-muted-foreground">When a new administrator account is created</p>
                    </div>
                    <Switch id="new-admin" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="permission-changes">Permission Changes</Label>
                      <p className="text-xs text-muted-foreground">When admin roles or permissions are modified</p>
                    </div>
                    <Switch id="permission-changes" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security-events">Security Events</Label>
                      <p className="text-xs text-muted-foreground">Failed logins, unusual locations, etc.</p>
                    </div>
                    <Switch id="security-events" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="content-changes">Content Changes</Label>
                      <p className="text-xs text-muted-foreground">When content is published or modified</p>
                    </div>
                    <Switch id="content-changes" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="daily-summary">Daily Activity Summary</Label>
                      <p className="text-xs text-muted-foreground">Receive a daily summary of all admin activities</p>
                    </div>
                    <Switch id="daily-summary" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Collaboration Tab */}
        <TabsContent value="team-collaboration" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">5 due today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">8 unread messages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Next: Team Sync (1 hour)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">8 currently online</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            {/* Task Management */}
            <Card className="md:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Task Management</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>Assign a new task to team members</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="task-title" className="text-right">
                            Title
                          </Label>
                          <Input id="task-title" placeholder="Task title" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="task-description" className="text-right">
                            Description
                          </Label>
                          <Input id="task-description" placeholder="Task description" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="task-assignee" className="text-right">
                            Assignee
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select team member" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jane-doe">Jane Doe</SelectItem>
                              <SelectItem value="john-smith">John Smith</SelectItem>
                              <SelectItem value="alex-kim">Alex Kim</SelectItem>
                              <SelectItem value="maria-perez">Maria Perez</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="task-priority" className="text-right">
                            Priority
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="task-due-date" className="text-right">
                            Due Date
                          </Label>
                          <Input id="task-due-date" type="date" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create Task</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription>Manage and assign tasks to team members</CardDescription>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTasks}
                    onChange={(e) => setSearchTasks(e.target.value)}
                    className="h-8 w-[200px] lg:w-[300px]"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-auto h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filter</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Checkbox id="todo" className="mr-2" />
                        <label htmlFor="todo">To Do</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="in-progress" className="mr-2" />
                        <label htmlFor="in-progress">In Progress</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="review" className="mr-2" />
                        <label htmlFor="review">In Review</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="completed" className="mr-2" />
                        <label htmlFor="completed">Completed</label>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Checkbox id="high" className="mr-2" />
                        <label htmlFor="high">High</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="medium" className="mr-2" />
                        <label htmlFor="medium">Medium</label>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Checkbox id="low" className="mr-2" />
                        <label htmlFor="low">Low</label>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Update user verification process</div>
                        <div className="text-xs text-muted-foreground">Improve security checks</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>Jane Doe</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                          In Progress
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                          High
                        </Badge>
                      </TableCell>
                      <TableCell>Tomorrow</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Add Comment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Create monthly analytics report</div>
                        <div className="text-xs text-muted-foreground">For executive team review</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>MP</AvatarFallback>
                          </Avatar>
                          <div>Maria Perez</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                          To Do
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                          Medium
                        </Badge>
                      </TableCell>
                      <TableCell>Next week</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Add Comment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Review content moderation queue</div>
                        <div className="text-xs text-muted-foreground">Clear backlog of pending items</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <div>John Smith</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
                          In Review
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                          Low
                        </Badge>
                      </TableCell>
                      <TableCell>Today</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Add Comment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Team Communication */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Team Communication</CardTitle>
                <CardDescription>Internal messaging and collaboration tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Team Chat</div>
                      <Badge>8 unread</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Real-time messaging for quick team communication
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Open Chat
                    </Button>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Team Calendar</div>
                      <Badge>3 upcoming</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Schedule and manage team meetings and events</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      View Calendar
                    </Button>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Document Collaboration</div>
                      <Badge>5 shared</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Shared documents and collaborative editing</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="mr-2 h-4 w-4" />
                      Open Documents
                    </Button>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Announcements</div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        New
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Important team-wide announcements and updates</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Bell className="mr-2 h-4 w-4" />
                      View Announcements
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>View and manage your admin team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jane Doe</div>
                        <div className="text-sm text-muted-foreground">Super Admin</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">John Smith</div>
                        <div className="text-sm text-muted-foreground">Content Manager</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AK</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Alex Kim</div>
                        <div className="text-sm text-muted-foreground">Support Admin</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>MP</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Maria Perez</div>
                        <div className="text-sm text-muted-foreground">Analytics Admin</div>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Offline</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Message</CardTitle>
                <CardDescription>Send a message to team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Recipients</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Team Members</SelectItem>
                        <SelectItem value="super-admins">Super Admins</SelectItem>
                        <SelectItem value="content-managers">Content Managers</SelectItem>
                        <SelectItem value="support-admins">Support Admins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Message subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      placeholder="Type your message here..."
                      className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="urgent" />
                    <Label htmlFor="urgent">Mark as urgent</Label>
                  </div>
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

