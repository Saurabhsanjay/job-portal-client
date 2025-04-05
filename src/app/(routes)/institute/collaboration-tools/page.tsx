"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  FilterIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  UsersIcon,
  MessageSquareIcon,
  BellIcon,
  MailIcon,
  PhoneIcon,
  ClockIcon,
  CheckIcon,
} from "lucide-react"

const CollaborationTools = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        {/* <div>
          <h1 className="text-3xl font-bold tracking-tight">Collaboration Tools</h1>
          <p className="text-muted-foreground">
            Connect with industry partners, communicate with stakeholders, and manage events
          </p>
        </div> */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BellIcon className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            New Connection
          </Button>
        </div>
      </div>

      <Tabs defaultValue="industry-partnerships" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-3xl">
          <TabsTrigger value="industry-partnerships">Industry Partnerships</TabsTrigger>
          <TabsTrigger value="communication-channels">Communication Channels</TabsTrigger>
          <TabsTrigger value="event-management">Event Management</TabsTrigger>
        </TabsList>

        {/* Industry Partnerships Tab */}
        <TabsContent value="industry-partnerships" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Internship Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78</div>
                <p className="text-xs text-muted-foreground">+12 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">+5% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Joint Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 this quarter</p>
              </CardContent>
            </Card>
          </div>

          {/* Partner Directory */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Partner Companies</CardTitle>
                  <CardDescription>Manage your industry partnerships and collaborations</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search partners..." className="pl-8 w-[250px]" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FilterIcon className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="p-2">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="active" />
                            <Label htmlFor="active">Active partners</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="internships" />
                            <Label htmlFor="internships">Offering internships</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="placements" />
                            <Label htmlFor="placements">Offering placements</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="programs" />
                            <Label htmlFor="programs">Joint programs</Label>
                          </div>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="p-2">
                        <Button size="sm" className="w-full">
                          Apply Filters
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Partner
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Add New Industry Partner</DialogTitle>
                        <DialogDescription>
                          Enter the details of the new industry partner to add them to your network.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="company-name" className="text-right">
                            Company Name
                          </Label>
                          <Input id="company-name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="industry" className="text-right">
                            Industry
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="contact-person" className="text-right">
                            Contact Person
                          </Label>
                          <Input id="contact-person" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" type="email" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input id="phone" type="tel" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="partnership-type" className="text-right">
                            Partnership Type
                          </Label>
                          <div className="col-span-3 flex flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="internship-type" />
                              <Label htmlFor="internship-type">Internships</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="placement-type" />
                              <Label htmlFor="placement-type">Placements</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="skill-dev-type" />
                              <Label htmlFor="skill-dev-type">Skill Development</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="research-type" />
                              <Label htmlFor="research-type">Research</Label>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="notes" className="text-right pt-2">
                            Notes
                          </Label>
                          <Textarea id="notes" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Partner</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Company</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Industry</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Partnership Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "TechCorp Solutions",
                          industry: "Technology",
                          type: ["Internships", "Placements"],
                          status: "Active",
                          contact: "Sarah Johnson",
                          logo: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Global Finance Inc.",
                          industry: "Finance",
                          type: ["Placements"],
                          status: "Active",
                          contact: "Michael Chen",
                          logo: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "HealthPlus Systems",
                          industry: "Healthcare",
                          type: ["Internships", "Skill Development"],
                          status: "Active",
                          contact: "David Wilson",
                          logo: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "EduTech Innovations",
                          industry: "Education",
                          type: ["Research", "Skill Development"],
                          status: "Pending",
                          contact: "Lisa Rodriguez",
                          logo: "/placeholder.svg?height=40&width=40",
                        },
                        {
                          name: "Manufacturing Pro",
                          industry: "Manufacturing",
                          type: ["Internships", "Placements"],
                          status: "Active",
                          contact: "Robert Kim",
                          logo: "/placeholder.svg?height=40&width=40",
                        },
                      ].map((partner, i) => (
                        <tr
                          key={i}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={partner.logo} alt={partner.name} />
                                <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{partner.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{partner.industry}</td>
                          <td className="p-4 align-middle">
                            <div className="flex flex-wrap gap-1">
                              {partner.type.map((type, j) => (
                                <Badge key={j} variant="outline">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge variant={partner.status === "Active" ? "default" : "secondary"}>
                              {partner.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">{partner.contact}</td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Partnership</DropdownMenuItem>
                                <DropdownMenuItem>Contact Partner</DropdownMenuItem>
                                <DropdownMenuItem>View Opportunities</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">End Partnership</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opportunity Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Internship & Placement Opportunities</CardTitle>
                <CardDescription>Current opportunities from your industry partners</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Software Development Intern",
                        company: "TechCorp Solutions",
                        type: "Internship",
                        deadline: "May 15, 2025",
                        positions: 5,
                      },
                      {
                        title: "Financial Analyst",
                        company: "Global Finance Inc.",
                        type: "Placement",
                        deadline: "April 30, 2025",
                        positions: 3,
                      },
                      {
                        title: "Healthcare Data Scientist",
                        company: "HealthPlus Systems",
                        type: "Internship",
                        deadline: "May 20, 2025",
                        positions: 2,
                      },
                      {
                        title: "Manufacturing Engineer",
                        company: "Manufacturing Pro",
                        type: "Placement",
                        deadline: "June 5, 2025",
                        positions: 4,
                      },
                      {
                        title: "UX/UI Design Intern",
                        company: "TechCorp Solutions",
                        type: "Internship",
                        deadline: "May 10, 2025",
                        positions: 2,
                      },
                    ].map((opportunity, i) => (
                      <div key={i} className="flex items-start justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{opportunity.title}</div>
                          <div className="text-sm text-muted-foreground">{opportunity.company}</div>
                          <div className="flex items-center mt-2 gap-2">
                            <Badge variant={opportunity.type === "Internship" ? "outline" : "default"}>
                              {opportunity.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Deadline: {opportunity.deadline}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{opportunity.positions} positions</div>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 flex justify-center">
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New Opportunity
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Joint Skill Development Programs</CardTitle>
                <CardDescription>Collaborative programs with industry partners</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Cloud Computing Certification",
                        partner: "TechCorp Solutions",
                        status: "Active",
                        students: 45,
                        duration: "3 months",
                      },
                      {
                        title: "Financial Modeling Workshop",
                        partner: "Global Finance Inc.",
                        status: "Upcoming",
                        students: 30,
                        duration: "2 weeks",
                      },
                      {
                        title: "Healthcare Data Analytics",
                        partner: "HealthPlus Systems",
                        status: "Active",
                        students: 25,
                        duration: "2 months",
                      },
                      {
                        title: "Advanced Manufacturing Techniques",
                        partner: "Manufacturing Pro",
                        status: "Planning",
                        students: 0,
                        duration: "1 month",
                      },
                    ].map((program, i) => (
                      <div key={i} className="flex items-start justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{program.title}</div>
                          <div className="text-sm text-muted-foreground">Partner: {program.partner}</div>
                          <div className="flex items-center mt-2 gap-2">
                            <Badge
                              variant={
                                program.status === "Active"
                                  ? "default"
                                  : program.status === "Upcoming"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {program.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Duration: {program.duration}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{program.students} students</div>
                          <Button variant="outline" size="sm" className="mt-2">
                            Manage Program
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 flex justify-center">
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create New Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Communication Channels Tab */}
        <TabsContent value="communication-channels" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+3 new today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">From 3 conversations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4h</div>
                <p className="text-xs text-muted-foreground">-0.5h from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Messaging Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations</CardTitle>
                  <Button variant="outline" size="sm">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>
                <div className="relative mt-2">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search conversations..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-2">
                    {[
                      {
                        name: "Sarah Johnson",
                        role: "Recruiter, TechCorp",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message: "When can we schedule the next campus visit?",
                        time: "10:30 AM",
                        unread: true,
                      },
                      {
                        name: "Student Council",
                        role: "Group",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message: "Updated the job fair volunteer schedule",
                        time: "Yesterday",
                        unread: true,
                      },
                      {
                        name: "Michael Chen",
                        role: "Recruiter, Global Finance",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message: "Thank you for organizing the workshop",
                        time: "Yesterday",
                        unread: false,
                      },
                      {
                        name: "Faculty Coordination",
                        role: "Group",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message: "Meeting minutes from yesterday's session",
                        time: "2 days ago",
                        unread: false,
                      },
                      {
                        name: "David Wilson",
                        role: "HR, HealthPlus Systems",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message: "Can we discuss the internship program?",
                        time: "3 days ago",
                        unread: false,
                      },
                      {
                        name: "Career Services Team",
                        role: "Group",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message: "Updated placement statistics for Q1",
                        time: "1 week ago",
                        unread: false,
                      },
                    ].map((conversation, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${
                          i === 0 ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} alt={conversation.name} />
                          <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate">{conversation.name}</div>
                            <div className="text-xs text-muted-foreground">{conversation.time}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{conversation.role}</div>
                          <div className="text-sm truncate mt-1">
                            {conversation.unread ? (
                              <span className="font-medium">{conversation.message}</span>
                            ) : (
                              conversation.message
                            )}
                          </div>
                        </div>
                        {conversation.unread && <div className="w-2 h-2 rounded-full bg-blue-500 mt-1"></div>}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Johnson" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Sarah Johnson</CardTitle>
                      <CardDescription>Recruiter, TechCorp Solutions</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <PhoneIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MailIcon className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Contact Info</DropdownMenuItem>
                        <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                        <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Block Contact</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="p-4 space-y-4">
                    {[
                      {
                        sender: "Sarah Johnson",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message:
                          "Hi there! I wanted to discuss the upcoming campus recruitment drive for TechCorp. We're looking to hire software engineering interns and full-time positions.",
                        time: "10:05 AM",
                        isSelf: false,
                      },
                      {
                        sender: "You",
                        message:
                          "Hello Sarah! Great to hear from you. We'd be happy to organize the campus recruitment drive. When are you planning to conduct it?",
                        time: "10:12 AM",
                        isSelf: true,
                      },
                      {
                        sender: "Sarah Johnson",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message:
                          "We're looking at the last week of May. Would that work for your institution? We'd need about 2 days for the entire process.",
                        time: "10:18 AM",
                        isSelf: false,
                      },
                      {
                        sender: "You",
                        message:
                          "The last week of May should work well. Our students will have completed their exams by then. Let me check the availability of our auditorium and interview rooms.",
                        time: "10:22 AM",
                        isSelf: true,
                      },
                      {
                        sender: "Sarah Johnson",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message:
                          "Perfect! Also, we'd like to conduct a pre-placement talk a week before the actual interviews. Would that be possible?",
                        time: "10:25 AM",
                        isSelf: false,
                      },
                      {
                        sender: "You",
                        message:
                          "Yes, we can arrange for a pre-placement talk. It would give students a better understanding of the opportunities at TechCorp. We can schedule it for the third week of May.",
                        time: "10:28 AM",
                        isSelf: true,
                      },
                      {
                        sender: "Sarah Johnson",
                        avatar: "/placeholder.svg?height=40&width=40",
                        message:
                          "When can we schedule the next campus visit? I'd like to see the facilities and discuss the logistics in person.",
                        time: "10:30 AM",
                        isSelf: false,
                      },
                    ].map((message, i) => (
                      <div key={i} className={`flex ${message.isSelf ? "justify-end" : "justify-start"}`}>
                        <div className={`flex gap-3 max-w-[80%] ${message.isSelf ? "flex-row-reverse" : ""}`}>
                          {!message.isSelf && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.avatar} alt={message.sender} />
                              <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div
                              className={`rounded-lg p-3 ${
                                message.isSelf ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              {message.message}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              {message.time}
                              {message.isSelf && <CheckIcon className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex items-end gap-2">
                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8 shrink-0">
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <Textarea placeholder="Type a message..." className="min-h-10 flex-1 resize-none" rows={1} />
                    <Button size="icon" className="rounded-full h-8 w-8 shrink-0">
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Communication Groups */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Communication Groups</CardTitle>
                  <CardDescription>
                    Manage group communications between students, faculty, and recruiters
                  </CardDescription>
                </div>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "Placement Coordinators",
                    members: 12,
                    type: "Faculty & Staff",
                    lastActive: "Today",
                    unread: 3,
                  },
                  {
                    name: "Student Council",
                    members: 25,
                    type: "Students",
                    lastActive: "Today",
                    unread: 5,
                  },
                  {
                    name: "Industry Partners",
                    members: 18,
                    type: "Recruiters & Faculty",
                    lastActive: "Yesterday",
                    unread: 0,
                  },
                  {
                    name: "Career Services Team",
                    members: 8,
                    type: "Faculty & Staff",
                    lastActive: "2 days ago",
                    unread: 0,
                  },
                  {
                    name: "Job Fair Volunteers",
                    members: 32,
                    type: "Students",
                    lastActive: "3 days ago",
                    unread: 0,
                  },
                  {
                    name: "Skill Development Program",
                    members: 45,
                    type: "Students & Faculty",
                    lastActive: "1 week ago",
                    unread: 0,
                  },
                ].map((group, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{group.name}</CardTitle>
                        {group.unread > 0 && <Badge>{group.unread}</Badge>}
                      </div>
                      <CardDescription>{group.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, j) => (
                            <Avatar key={j} className="h-7 w-7 border-2 border-background">
                              <AvatarImage src={`/placeholder.svg?height=28&width=28`} />
                              <AvatarFallback>U{j + 1}</AvatarFallback>
                            </Avatar>
                          ))}
                          {group.members > 3 && (
                            <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                              +{group.members - 3}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">Active: {group.lastActive}</div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          <MessageSquareIcon className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="ghost" size="sm">
                          <UsersIcon className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Event Management Tab */}
        <TabsContent value="event-management" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Next 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">+58 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5% from last quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Feedback Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7/5</div>
                <p className="text-xs text-muted-foreground">Based on 156 responses</p>
              </CardContent>
            </Card>
          </div>

          {/* Event Calendar */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Event Calendar</CardTitle>
                  <CardDescription>Schedule and manage upcoming events</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-7 gap-px bg-muted rounded-md overflow-hidden">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="bg-background p-2 text-center text-sm font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - 3 // Adjust to start month on correct day
                    const isCurrentMonth = day >= 0 && day < 30
                    const isToday = day === 14 // Example: 15th is today

                    // Example events
                    const hasEvent = [3, 8, 15, 22, 27].includes(day)
                    const eventType =
                      day === 3
                        ? "Job Fair"
                        : day === 8
                          ? "Workshop"
                          : day === 15
                            ? "Webinar"
                            : day === 22
                              ? "Recruitment Drive"
                              : "Info Session"

                    return (
                      <div
                        key={i}
                        className={`bg-background p-2 min-h-[100px] ${isToday ? "ring-2 ring-primary" : ""}`}
                      >
                        <div className="flex justify-between items-start">
                          <span
                            className={`text-sm font-medium ${
                              !isCurrentMonth ? "text-muted-foreground" : isToday ? "text-primary" : ""
                            }`}
                          >
                            {isCurrentMonth ? day + 1 : day < 0 ? 30 + day + 1 : day - 29}
                          </span>
                          {isToday && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                        </div>

                        {hasEvent && isCurrentMonth && (
                          <div
                            className={`mt-2 p-1 text-xs rounded ${
                              eventType === "Job Fair"
                                ? "bg-blue-100 text-blue-800"
                                : eventType === "Workshop"
                                  ? "bg-green-100 text-green-800"
                                  : eventType === "Webinar"
                                    ? "bg-purple-100 text-purple-800"
                                    : eventType === "Recruitment Drive"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {eventType}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Manage and track your scheduled events</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search events..." className="pl-8 w-[250px]" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FilterIcon className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="p-2">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="job-fair" />
                            <Label htmlFor="job-fair">Job Fairs</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="webinar" />
                            <Label htmlFor="webinar">Webinars</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="workshop" />
                            <Label htmlFor="workshop">Workshops</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="recruitment" />
                            <Label htmlFor="recruitment">Recruitment Drives</Label>
                          </div>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <div className="p-2">
                        <Button size="sm" className="w-full">
                          Apply Filters
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Event Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Registrations</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Spring Job Fair 2025",
                          type: "Job Fair",
                          date: "May 3, 2025",
                          time: "10:00 AM - 4:00 PM",
                          location: "Main Campus Auditorium",
                          registrations: 120,
                          capacity: 200,
                          status: "Upcoming",
                        },
                        {
                          name: "Resume Building Workshop",
                          type: "Workshop",
                          date: "April 8, 2025",
                          time: "2:00 PM - 4:00 PM",
                          location: "Virtual (Zoom)",
                          registrations: 85,
                          capacity: 100,
                          status: "Upcoming",
                        },
                        {
                          name: "TechCorp Recruitment Drive",
                          type: "Recruitment",
                          date: "May 15, 2025",
                          time: "9:00 AM - 5:00 PM",
                          location: "Engineering Block",
                          registrations: 65,
                          capacity: 80,
                          status: "Upcoming",
                        },
                        {
                          name: "Career in Data Science",
                          type: "Webinar",
                          date: "April 15, 2025",
                          time: "3:00 PM - 4:30 PM",
                          location: "Virtual (Teams)",
                          registrations: 112,
                          capacity: 150,
                          status: "Upcoming",
                        },
                        {
                          name: "Healthcare Industry Insights",
                          type: "Info Session",
                          date: "April 22, 2025",
                          time: "1:00 PM - 3:00 PM",
                          location: "Life Sciences Building",
                          registrations: 45,
                          capacity: 60,
                          status: "Upcoming",
                        },
                      ].map((event, i) => (
                        <tr
                          key={i}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">{event.name}</td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline">{event.type}</Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div>{event.date}</div>
                            <div className="text-xs text-muted-foreground">{event.time}</div>
                          </td>
                          <td className="p-4 align-middle">{event.location}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <div>
                                {event.registrations}/{event.capacity}
                              </div>
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${(event.registrations / event.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              variant={
                                event.status === "Upcoming"
                                  ? "default"
                                  : event.status === "In Progress"
                                    ? "secondary"
                                    : event.status === "Completed"
                                      ? "outline"
                                      : "destructive"
                              }
                            >
                              {event.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                <DropdownMenuItem>Manage Registrations</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Creation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
              <CardDescription>Schedule a new event, workshop, job fair, or webinar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-name">Event Name</Label>
                    <Input id="event-name" placeholder="Enter event name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Event Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job-fair">Job Fair</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="recruitment">Recruitment Drive</SelectItem>
                        <SelectItem value="info-session">Info Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Event Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={`${i}:00`}>
                              {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={`${i}:00`}>
                              {i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-location">Location</Label>
                    <Input id="event-location" placeholder="Enter location" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-capacity">Capacity</Label>
                    <Input id="event-capacity" type="number" placeholder="Maximum attendees" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea id="event-description" placeholder="Enter event description" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label>Event Visibility</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="students" defaultChecked />
                      <Label htmlFor="students">Students</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="faculty" defaultChecked />
                      <Label htmlFor="faculty">Faculty</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="industry-partners" defaultChecked />
                      <Label htmlFor="industry-partners">Industry Partners</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Create Event</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CollaborationTools

