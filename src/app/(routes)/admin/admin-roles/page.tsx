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
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CheckCircle,
  ChevronDown,
  Edit,
  Eye,
  Filter,
  Lock,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  Trash,
  UserCog,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Sample data for admin users
const initialAdminUsers = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "Just now",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Content Manager",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Alex Kim",
    email: "alex.kim@example.com",
    role: "Support Admin",
    status: "Active",
    lastActive: "1 day ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Maria Perez",
    email: "maria.perez@example.com",
    role: "Analytics Admin",
    status: "Inactive",
    lastActive: "2 weeks ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Sample data for admin roles
const initialAdminRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all system features",
    icon: "Shield",
    permissions: ["User Management", "Content Management", "Analytics", "Security", "Admin Management"],
  },
  {
    id: 2,
    name: "Content Manager",
    description: "Manage blog posts, resources, and events",
    icon: "FileText",
    permissions: ["Content Management", "Event Promotion", "Blog Management"],
  },
  {
    id: 3,
    name: "Support Admin",
    description: "Handle user support and feedback",
    icon: "Users",
    permissions: ["User Management", "Feedback Management", "Support Tools"],
  },
  {
    id: 4,
    name: "Analytics Admin",
    description: "Access and generate analytics reports",
    icon: "BarChart",
    permissions: ["Analytics", "Reports", "Dashboard Access"],
  },
]

// Interface for admin user form
interface AdminUserFormData {
  id?: number
  name: string
  email: string
  role: string
  status: string
}

// Interface for admin role form
interface AdminRoleFormData {
  id?: number
  name: string
  description: string
  permissions: string[]
}

export default function AdminManagement() {
  // State for admin users
  const [adminUsers, setAdminUsers] = useState(initialAdminUsers)
  const [searchUsers, setSearchUsers] = useState("")
  const [isUserFormOpen, setIsUserFormOpen] = useState(false)
  const [userFormMode, setUserFormMode] = useState<"create" | "edit">("create")
  const [currentUser, setCurrentUser] = useState<AdminUserFormData>({
    name: "",
    email: "",
    role: "",
    status: "Active",
  })
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)

  // State for admin roles
  const [adminRoles, setAdminRoles] = useState(initialAdminRoles)
  const [searchRoles, setSearchRoles] = useState("")
  const [isRoleFormOpen, setIsRoleFormOpen] = useState(false)
  const [roleFormMode, setRoleFormMode] = useState<"create" | "edit">("create")
  const [currentRole, setCurrentRole] = useState<AdminRoleFormData>({
    name: "",
    description: "",
    permissions: [],
  })
  const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null)

  // Filter admin users based on search
  const filteredUsers = adminUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.role.toLowerCase().includes(searchUsers.toLowerCase()),
  )

  // Filter admin roles based on search
  const filteredRoles = adminRoles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchRoles.toLowerCase()) ||
      role.description.toLowerCase().includes(searchRoles.toLowerCase()),
  )

  // Handle creating a new admin user
  const handleCreateUser = () => {
    setCurrentUser({
      name: "",
      email: "",
      role: "",
      status: "Active",
    })
    setUserFormMode("create")
    setIsUserFormOpen(true)
  }

  // Handle editing an admin user
  const handleEditUser = (user: any) => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setUserFormMode("edit")
    setIsUserFormOpen(true)
  }

  // Handle saving an admin user
  const handleSaveUser = () => {
    if (userFormMode === "create") {
      // Create new user
      const newUser = {
        id: adminUsers.length > 0 ? Math.max(...adminUsers.map((user) => user.id)) + 1 : 1,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        status: currentUser.status,
        lastActive: "Never",
        avatar: "/placeholder.svg?height=32&width=32",
      }
      setAdminUsers([...adminUsers, newUser])
    } else {
      // Update existing user
      setAdminUsers(
        adminUsers.map((user) =>
          user.id === currentUser.id
            ? {
              ...user,
              name: currentUser.name,
              email: currentUser.email,
              role: currentUser.role,
              status: currentUser.status,
            }
            : user,
        ),
      )
    }
    setIsUserFormOpen(false)
  }

  // Handle deleting an admin user
  const handleDeleteUser = (userId: number) => {
    setUserToDelete(userId)
    setDeleteUserDialogOpen(true)
  }

  // Confirm delete admin user
  const confirmDeleteUser = () => {
    if (userToDelete) {
      setAdminUsers(adminUsers.filter((user) => user.id !== userToDelete))
      setDeleteUserDialogOpen(false)
      setUserToDelete(null)
    }
  }

  // Handle creating a new admin role
  const handleCreateRole = () => {
    setCurrentRole({
      name: "",
      description: "",
      permissions: [],
    })
    setRoleFormMode("create")
    setIsRoleFormOpen(true)
  }

  // Handle editing an admin role
  const handleEditRole = (role: any) => {
    setCurrentRole({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })
    setRoleFormMode("edit")
    setIsRoleFormOpen(true)
  }

  // Handle saving an admin role
  const handleSaveRole = () => {
    if (roleFormMode === "create") {
      // Create new role
      const newRole = {
        id: adminRoles.length > 0 ? Math.max(...adminRoles.map((role) => role.id)) + 1 : 1,
        name: currentRole.name,
        description: currentRole.description,
        icon: "Shield",
        permissions: currentRole.permissions,
      }
      setAdminRoles([...adminRoles, newRole])
    } else {
      // Update existing role
      setAdminRoles(
        adminRoles.map((role) =>
          role.id === currentRole.id
            ? {
              ...role,
              name: currentRole.name,
              description: currentRole.description,
              permissions: currentRole.permissions,
            }
            : role,
        ),
      )
    }
    setIsRoleFormOpen(false)
  }

  // Handle deleting an admin role
  const handleDeleteRole = (roleId: number) => {
    setRoleToDelete(roleId)
    setDeleteRoleDialogOpen(true)
  }

  // Confirm delete admin role
  const confirmDeleteRole = () => {
    if (roleToDelete) {
      setAdminRoles(adminRoles.filter((role) => role.id !== roleToDelete))
      setDeleteRoleDialogOpen(false)
      setRoleToDelete(null)
    }
  }

  // Toggle permission in role form
  const togglePermission = (permission: string) => {
    if (currentRole.permissions.includes(permission)) {
      setCurrentRole({
        ...currentRole,
        permissions: currentRole.permissions.filter((p) => p !== permission),
      })
    } else {
      setCurrentRole({
        ...currentRole,
        permissions: [...currentRole.permissions, permission],
      })
    }
  }

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50"
      case "Content Manager":
        return "bg-purple-50 text-purple-700 hover:bg-purple-50"
      case "Support Admin":
        return "bg-amber-50 text-amber-700 hover:bg-amber-50"
      case "Analytics Admin":
        return "bg-cyan-50 text-cyan-700 hover:bg-cyan-50"
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-50"
    }
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    return status === "Active"
      ? "bg-green-50 text-green-700 hover:bg-green-50"
      : "bg-red-50 text-red-700 hover:bg-red-50"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Management</h1>
          <p className="text-muted-foreground">Manage administrator roles and users</p>
        </div>
      </div>

      <Tabs defaultValue="admin-users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="admin-users">Admin Users</TabsTrigger>
          <TabsTrigger value="admin-roles">Admin Roles</TabsTrigger>
        </TabsList>

        {/* Admin Users Tab */}
        <TabsContent value="admin-users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Administrators</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminUsers.length}</div>
                <p className="text-xs text-muted-foreground">Manage your admin team</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Admins</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminUsers.filter((user) => user.status === "Active").length}</div>
                <p className="text-xs text-muted-foreground">Currently active administrators</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inactive Admins</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {adminUsers.filter((user) => user.status === "Inactive").length}
                </div>
                <p className="text-xs text-muted-foreground">Deactivated administrator accounts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admin Roles</CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminRoles.length}</div>
                <p className="text-xs text-muted-foreground">Available administrator roles</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Administrator Users</CardTitle>
                <Button onClick={handleCreateUser}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Admin
                </Button>
              </div>
              <CardDescription>Manage administrator accounts and their assigned roles</CardDescription>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search administrators..."
                  value={searchUsers}
                  onChange={(e) => setSearchUsers(e.target.value)}
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
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name.charAt(0)}
                                {user.name.split(" ")[1]?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
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
                              {user.status === "Active" ? (
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No administrators found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Admin User Form Dialog */}
          <Dialog open={isUserFormOpen} onOpenChange={setIsUserFormOpen}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{userFormMode === "create" ? "Add New Administrator" : "Edit Administrator"}</DialogTitle>
                <DialogDescription>
                  {userFormMode === "create"
                    ? "Create a new administrator account with specific role and permissions."
                    : "Update administrator account details and permissions."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="col-span-3"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    className="col-span-3"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select
                    value={currentUser.role}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, role: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {adminRoles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch
                      id="active-status"
                      checked={currentUser.status === "Active"}
                      onCheckedChange={(checked) =>
                        setCurrentUser({ ...currentUser, status: checked ? "Active" : "Inactive" })
                      }
                    />
                    <Label htmlFor="active-status">Active</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUserFormOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveUser}>
                  {userFormMode === "create" ? "Create Administrator" : "Update Administrator"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete User Confirmation Dialog */}
          <AlertDialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the administrator account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        {/* Admin Roles Tab */}
        <TabsContent value="admin-roles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminRoles.length}</div>
                <p className="text-xs text-muted-foreground">Defined administrator roles</p>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {adminUsers.filter((user) => user.role === "Super Admin" && user.status === "Active").length}
                </div>
                <p className="text-xs text-muted-foreground">Users with full system access</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    adminRoles.filter(
                      (role) =>
                        !["Super Admin", "Content Manager", "Support Admin", "Analytics Admin"].includes(role.name),
                    ).length
                  }
                </div>
                <p className="text-xs text-muted-foreground">User-defined admin roles</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Role Management</CardTitle>
                <Button onClick={handleCreateRole}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Role
                </Button>
              </div>
              <CardDescription>Define and manage administrator roles and permissions</CardDescription>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search roles..."
                  value={searchRoles}
                  onChange={(e) => setSearchRoles(e.target.value)}
                  className="h-8 w-[200px] lg:w-[300px]"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <div key={role.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <div>
                            <h3 className="font-medium">{role.name}</h3>
                            <p className="text-xs text-muted-foreground">{role.description}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditRole(role)}>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteRole(role.id)}>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Role
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {role.permissions.map((permission, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">No roles found</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Admin Role Form Dialog */}
          <Dialog open={isRoleFormOpen} onOpenChange={setIsRoleFormOpen}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>{roleFormMode === "create" ? "Create New Role" : "Edit Role"}</DialogTitle>
                <DialogDescription>
                  {roleFormMode === "create"
                    ? "Define a new administrator role with specific permissions."
                    : "Update role details and permissions."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role-name" className="text-right">
                    Role Name
                  </Label>
                  <Input
                    id="role-name"
                    placeholder="e.g. Event Manager"
                    className="col-span-3"
                    value={currentRole.name}
                    onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role-description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="role-description"
                    placeholder="Brief description of role responsibilities"
                    className="col-span-3"
                    value={currentRole.description}
                    onChange={(e) => setCurrentRole({ ...currentRole, description: e.target.value })}
                  />
                </div>
                <Separator />
                <h3 className="font-medium">Permission Groups</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="user-management"
                      checked={currentRole.permissions.includes("User Management")}
                      onCheckedChange={() => togglePermission("User Management")}
                    />
                    <Label htmlFor="user-management">User Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="content-management"
                      checked={currentRole.permissions.includes("Content Management")}
                      onCheckedChange={() => togglePermission("Content Management")}
                    />
                    <Label htmlFor="content-management">Content Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="analytics"
                      checked={currentRole.permissions.includes("Analytics")}
                      onCheckedChange={() => togglePermission("Analytics")}
                    />
                    <Label htmlFor="analytics">Analytics & Reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="security"
                      checked={currentRole.permissions.includes("Security")}
                      onCheckedChange={() => togglePermission("Security")}
                    />
                    <Label htmlFor="security">Security & Compliance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="admin-management"
                      checked={currentRole.permissions.includes("Admin Management")}
                      onCheckedChange={() => togglePermission("Admin Management")}
                    />
                    <Label htmlFor="admin-management">Admin Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="event-promotion"
                      checked={currentRole.permissions.includes("Event Promotion")}
                      onCheckedChange={() => togglePermission("Event Promotion")}
                    />
                    <Label htmlFor="event-promotion">Event Promotion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="blog-management"
                      checked={currentRole.permissions.includes("Blog Management")}
                      onCheckedChange={() => togglePermission("Blog Management")}
                    />
                    <Label htmlFor="blog-management">Blog Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="feedback-management"
                      checked={currentRole.permissions.includes("Feedback Management")}
                      onCheckedChange={() => togglePermission("Feedback Management")}
                    />
                    <Label htmlFor="feedback-management">Feedback Management</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="support-tools"
                      checked={currentRole.permissions.includes("Support Tools")}
                      onCheckedChange={() => togglePermission("Support Tools")}
                    />
                    <Label htmlFor="support-tools">Support Tools</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRoleFormOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRole}>{roleFormMode === "create" ? "Create Role" : "Update Role"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Role Confirmation Dialog */}
          <AlertDialog open={deleteRoleDialogOpen} onOpenChange={setDeleteRoleDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this role and may affect users assigned to
                  it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeleteRole} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>
      </Tabs>
    </div>
  )
}
