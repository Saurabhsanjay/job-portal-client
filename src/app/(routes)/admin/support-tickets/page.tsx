"use client"

import { useState } from "react"
import { Search, MessageSquare, Clock, AlertCircle, CheckCircle, Archive, RotateCcw, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

// Sample ticket data
const sampleTickets = [
  {
    id: "TKT-001",
    subject: "Unable to upload resume",
    userName: "John Doe",
    userType: "Job Seeker",
    priority: "High",
    status: "Open",
    assignee: "Sarah Johnson",
    createdDate: "2024-01-15",
    lastUpdate: "2024-01-15",
    messages: [
      {
        sender: "John Doe",
        message: "I'm having trouble uploading my resume. The file keeps getting rejected.",
        time: "10:30 AM",
        type: "user",
      },
      {
        sender: "Sarah Johnson",
        message: "Hi John, I'll help you with this. What file format are you trying to upload?",
        time: "11:15 AM",
        type: "admin",
      },
    ],
  },
  {
    id: "TKT-002",
    subject: "Job posting not appearing",
    userName: "ABC Corp",
    userType: "Employer",
    priority: "Medium",
    status: "In Progress",
    assignee: "Mike Wilson",
    createdDate: "2024-01-14",
    lastUpdate: "2024-01-15",
    messages: [
      {
        sender: "ABC Corp",
        message: "Our job posting for Software Engineer position is not showing up on the platform.",
        time: "2:30 PM",
        type: "user",
      },
      {
        sender: "Mike Wilson",
        message: "I'm looking into this issue. Can you provide the job posting ID?",
        time: "3:45 PM",
        type: "admin",
      },
    ],
  },
  {
    id: "TKT-003",
    subject: "Payment issue",
    userName: "Tech Solutions Ltd",
    userType: "Employer",
    priority: "High",
    status: "Open",
    assignee: "Lisa Chen",
    createdDate: "2024-01-13",
    lastUpdate: "2024-01-14",
    messages: [
      {
        sender: "Tech Solutions Ltd",
        message: "We were charged twice for our premium subscription.",
        time: "9:00 AM",
        type: "user",
      },
    ],
  },
  {
    id: "TKT-004",
    subject: "Profile verification",
    userName: "Jane Smith",
    userType: "Job Seeker",
    priority: "Low",
    status: "Closed",
    assignee: "John Smith",
    createdDate: "2024-01-12",
    lastUpdate: "2024-01-13",
    messages: [
      { sender: "Jane Smith", message: "How long does profile verification take?", time: "4:00 PM", type: "user" },
      {
        sender: "John Smith",
        message: "Profile verification typically takes 24-48 hours. Your profile has been verified.",
        time: "10:00 AM",
        type: "admin",
      },
    ],
  },
  {
    id: "TKT-005",
    subject: "Account access issue",
    userName: "Mark Johnson",
    userType: "Job Seeker",
    priority: "Medium",
    status: "Archived",
    assignee: "Sarah Johnson",
    createdDate: "2024-01-10",
    lastUpdate: "2024-01-11",
    messages: [
      {
        sender: "Mark Johnson",
        message: "I can't log into my account after password reset.",
        time: "11:30 AM",
        type: "user",
      },
      { sender: "Sarah Johnson", message: "Issue resolved. Account access restored.", time: "2:15 PM", type: "admin" },
    ],
  },
]

const teamMembers = ["John Smith", "Sarah Johnson", "Mike Wilson", "Lisa Chen"]

export default function SupportTickets() {
  const [tickets, setTickets] = useState(sampleTickets)
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])
  const [selectedTicket, setSelectedTicket] = useState<(typeof sampleTickets)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [userTypeFilter, setUserTypeFilter] = useState("All")
  const [replyMessage, setReplyMessage] = useState("")

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter
    const matchesUserType = userTypeFilter === "All" || ticket.userType === userTypeFilter
    return matchesSearch && matchesStatus && matchesUserType
  })

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTickets((prev) => (prev.includes(ticketId) ? prev.filter((id) => id !== ticketId) : [...prev, ticketId]))
  }

  const handleSelectAll = () => {
    setSelectedTickets(
      selectedTickets.length === filteredTickets.length ? [] : filteredTickets.map((ticket) => ticket.id),
    )
  }

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, lastUpdate: new Date().toISOString().split("T")[0] }
          : ticket,
      ),
    )
  }

  const handleBulkStatusChange = (newStatus: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        selectedTickets.includes(ticket.id)
          ? { ...ticket, status: newStatus, lastUpdate: new Date().toISOString().split("T")[0] }
          : ticket,
      ),
    )
    setSelectedTickets([])
  }

  const handleAssignTicket = (ticketId: string, assignee: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, assignee, lastUpdate: new Date().toISOString().split("T")[0] } : ticket,
      ),
    )
  }

  const handleBulkAssign = (assignee: string) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        selectedTickets.includes(ticket.id)
          ? { ...ticket, assignee, lastUpdate: new Date().toISOString().split("T")[0] }
          : ticket,
      ),
    )
    setSelectedTickets([])
  }

  const handleSendReply = () => {
    if (!selectedTicket || !replyMessage.trim()) return

    const newMessage = {
      sender: "Admin",
      message: replyMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "admin" as const,
    }

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              messages: [...ticket.messages, newMessage],
              lastUpdate: new Date().toISOString().split("T")[0],
            }
          : ticket,
      ),
    )

    setSelectedTicket((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMessage],
          }
        : null,
    )

    setReplyMessage("")
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Open":
        return "destructive"
      case "In Progress":
        return "default"
      case "Closed":
        return "secondary"
      case "Archived":
        return "outline"
      default:
        return "default"
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "default"
    }
  }

  const openTickets = tickets.filter((t) => t.status === "Open").length
  const inProgressTickets = tickets.filter((t) => t.status === "In Progress").length
  const avgResponseTime = "2.5 hours"
  const resolutionRate = "94%"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Support Ticket Management</h1>
        <p className="text-muted-foreground">Manage and respond to customer support tickets</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <div>
                <p className="text-sm font-medium">Open Tickets</p>
                <p className="text-2xl font-bold">{openTickets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold">{inProgressTickets}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Avg Response Time</p>
                <p className="text-2xl font-bold">{avgResponseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Resolution Rate</p>
                <p className="text-2xl font-bold">{resolutionRate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>

              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Users</SelectItem>
                    <SelectItem value="Job Seeker">Job Seeker</SelectItem>
                    <SelectItem value="Employer">Employer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bulk Actions */}
              {selectedTickets.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Select onValueChange={handleBulkStatusChange}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Mark as Open</SelectItem>
                      <SelectItem value="In Progress">Mark as In Progress</SelectItem>
                      <SelectItem value="Closed">Mark as Closed</SelectItem>
                      <SelectItem value="Archived">Mark as Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={handleBulkAssign}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Assign To" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={() => setSelectedTickets([])}>
                    Clear Selection
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedTickets.length === filteredTickets.length && filteredTickets.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className={selectedTicket?.id === ticket.id ? "bg-muted/50" : ""}>
                      <TableCell>
                        <Checkbox
                          checked={selectedTickets.includes(ticket.id)}
                          onCheckedChange={() => handleSelectTicket(ticket.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell
                        className="cursor-pointer hover:text-primary"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        {ticket.subject}
                      </TableCell>
                      <TableCell>{ticket.userName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{ticket.userType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityBadgeVariant(ticket.priority)}>{ticket.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(ticket.status)}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell>{ticket.assignee}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(ticket)}>
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          {ticket.status === "Open" && (
                            <Button variant="ghost" size="sm" onClick={() => handleStatusChange(ticket.id, "Closed")}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {ticket.status === "Closed" && (
                            <Button variant="ghost" size="sm" onClick={() => handleStatusChange(ticket.id, "Open")}>
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleStatusChange(ticket.id, "Archived")}>
                            <Archive className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-1">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Ticket Details
                {selectedTicket && (
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTicket ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{selectedTicket.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedTicket.id} • {selectedTicket.createdDate}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant={getStatusBadgeVariant(selectedTicket.status)}>{selectedTicket.status}</Badge>
                    <Badge variant={getPriorityBadgeVariant(selectedTicket.priority)}>{selectedTicket.priority}</Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium">User: {selectedTicket.userName}</p>
                    <p className="text-sm text-muted-foreground">Type: {selectedTicket.userType}</p>
                    <p className="text-sm text-muted-foreground">Assigned to: {selectedTicket.assignee}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Assign to:</label>
                    <Select onValueChange={(value) => handleAssignTicket(selectedTicket.id, value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={selectedTicket.assignee} />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member} value={member}>
                            {member}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Conversation</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedTicket.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            message.type === "admin" ? "bg-blue-50 ml-4" : "bg-gray-50 mr-4"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-sm font-medium">{message.sender}</span>
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Reply:</label>
                    <Textarea
                      placeholder="Type your response..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                    <Button onClick={handleSendReply} className="mt-2 w-full" disabled={!replyMessage.trim()}>
                      Send Reply
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    {selectedTicket.status !== "Closed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedTicket.id, "Closed")}
                        className="flex-1"
                      >
                        Close Ticket
                      </Button>
                    )}
                    {selectedTicket.status === "Closed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedTicket.id, "Open")}
                        className="flex-1"
                      >
                        Reopen Ticket
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(selectedTicket.id, "Archived")}
                      className="flex-1"
                    >
                      Archive
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a ticket to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
