"use client"

import { useState } from "react"
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Edit,
  Eye,
  FileText,
  Filter,
  Flag,
  Link,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash,
  Upload,
  Users,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"


const blogPerformanceData = [
  { name: "Career Tips", views: 4500, engagement: 320 },
  { name: "Interview Guide", views: 3800, engagement: 290 },
  { name: "Resume Writing", views: 5200, engagement: 410 },
  { name: "Job Market", views: 2900, engagement: 180 },
  { name: "Skill Development", views: 3600, engagement: 260 },
  { name: "Employer Guide", views: 2400, engagement: 150 },
]

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("blog-resources")

  return (
   <div>
    <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage blog posts, resources, events, and user-generated content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Content Calendar
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Content
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blog-resources">Blog & Resource Management</TabsTrigger>
          <TabsTrigger value="event-promotion">Event Promotion</TabsTrigger>
          <TabsTrigger value="content-moderation">Content Moderation</TabsTrigger>
        </TabsList>

        {/* Blog & Resource Management Tab */}
        <TabsContent value="blog-resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+12 added this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Published</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">186</div>
                <p className="text-xs text-muted-foreground">75% of total content</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">17% of total content</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">268</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Views and engagement for top content pieces</CardDescription>
              </CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={blogPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      {/* <Tooltip content={<CustomTooltip />} /> */}
                      <Bar dataKey="views" fill="#8884d8" name="Views" />
                      <Bar dataKey="engagement" fill="#82ca9d" name="Engagement" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Content Categories</CardTitle>
                <CardDescription>Distribution by content type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Career Guides</span>
                      </div>
                      <span className="text-sm text-muted-foreground">32%</span>
                    </div>
                    <Progress value={32} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Interview Tips</span>
                      </div>
                      <span className="text-sm text-muted-foreground">24%</span>
                    </div>
                    <Progress value={24} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Employer Resources</span>
                      </div>
                      <span className="text-sm text-muted-foreground">18%</span>
                    </div>
                    <Progress value={18} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Industry Insights</span>
                      </div>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <Progress value={15} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Other</span>
                      </div>
                      <span className="text-sm text-muted-foreground">11%</span>
                    </div>
                    <Progress value={11} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Content Library</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search content..." className="w-[250px] pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sort by <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Newest First</DropdownMenuItem>
                  <DropdownMenuItem>Oldest First</DropdownMenuItem>
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem>Recently Updated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px]">
                  <DialogHeader>
                    <DialogTitle>Create New Content</DialogTitle>
                    <DialogDescription>Add a new blog post, guide, or resource to your platform.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content-title" className="text-right">
                        Title
                      </Label>
                      <Input id="content-title" placeholder="Enter content title" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content-type" className="text-right">
                        Content Type
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog">Blog Post</SelectItem>
                          <SelectItem value="guide">Career Guide</SelectItem>
                          <SelectItem value="resource">Resource</SelectItem>
                          <SelectItem value="case-study">Case Study</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content-category" className="text-right">
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="career">Career Development</SelectItem>
                          <SelectItem value="interview">Interview Preparation</SelectItem>
                          <SelectItem value="resume">Resume Building</SelectItem>
                          <SelectItem value="employer">Employer Resources</SelectItem>
                          <SelectItem value="industry">Industry Insights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="content-description" className="text-right pt-2">
                        Description
                      </Label>
                      <Textarea
                        id="content-description"
                        placeholder="Enter a brief description"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Featured Image</Label>
                      <div className="col-span-3">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content-tags" className="text-right">
                        Tags
                      </Label>
                      <Input id="content-tags" placeholder="Enter tags separated by commas" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content-status" className="text-right">
                        Status
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="review">Ready for Review</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Create Content</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Author</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Published</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Views</th>
                    <th className="h-12 px-4 text-left align-middle font-medium w-[80px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {[
                    {
                      title: "10 Tips for Acing Your Technical Interview",
                      type: "Blog Post",
                      category: "Interview Preparation",
                      author: "Sarah Johnson",
                      status: "Published",
                      published: "Mar 15, 2023",
                      views: 4582,
                    },
                    {
                      title: "The Complete Guide to Resume Building",
                      type: "Guide",
                      category: "Resume Building",
                      author: "Michael Chen",
                      status: "Published",
                      published: "Feb 28, 2023",
                      views: 6241,
                    },
                    {
                      title: "How to Attract Top Talent in a Competitive Market",
                      type: "Resource",
                      category: "Employer Resources",
                      author: "Emily Rodriguez",
                      status: "Published",
                      published: "Apr 10, 2023",
                      views: 3127,
                    },
                    {
                      title: "Emerging Tech Skills in High Demand",
                      type: "Blog Post",
                      category: "Industry Insights",
                      author: "David Kim",
                      status: "Draft",
                      published: "-",
                      views: 0,
                    },
                    {
                      title: "Networking Strategies for Career Growth",
                      type: "Guide",
                      category: "Career Development",
                      author: "Jessica Taylor",
                      status: "Review",
                      published: "-",
                      views: 0,
                    },
                  ].map((content, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{content.title}</td>
                      <td className="p-4 align-middle">
                        <Badge variant="outline">{content.type}</Badge>
                      </td>
                      <td className="p-4 align-middle">{content.category}</td>
                      <td className="p-4 align-middle">{content.author}</td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant={
                            content.status === "Published"
                              ? "default"
                              : content.status === "Draft"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {content.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{content.published}</td>
                      <td className="p-4 align-middle">{content.views.toLocaleString()}</td>
                      <td className="p-4 align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link className="mr-2 h-4 w-4" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Event Promotion Tab */}
        <TabsContent value="event-promotion" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">+5 added this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Next event in 3 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Events</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Displayed on homepage</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Featured Events</CardTitle>
                <CardDescription>Events currently highlighted on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Tech Career Fair 2023",
                      date: "June 15, 2023",
                      type: "Job Fair",
                      location: "Virtual",
                      registrations: 245,
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      title: "Resume Building Workshop",
                      date: "June 22, 2023",
                      type: "Workshop",
                      location: "Virtual",
                      registrations: 178,
                      image: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      title: "Industry Insights: AI & Machine Learning",
                      date: "July 5, 2023",
                      type: "Webinar",
                      location: "Virtual",
                      registrations: 312,
                      image: "/placeholder.svg?height=100&width=100",
                    },
                  ].map((event, i) => (
                    <div key={i} className="flex items-start space-x-4 rounded-md border p-4">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{event.title}</h4>
                          <Badge>{event.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {event.date} • {event.location}
                          </div>
                          <div className="flex items-center mt-1">
                            <Users className="mr-1 h-3 w-3" />
                            {event.registrations} registrations
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Star className="h-4 w-4 text-yellow-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Featured Events
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Event Promotion Settings</CardTitle>
                <CardDescription>Configure how events are promoted on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="homepage-carousel">Homepage Carousel</Label>
                    <Switch id="homepage-carousel" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="related-events">Related Events</Label>
                    <Switch id="related-events" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="auto-feature">Auto-Feature New Events</Label>
                    <Switch id="auto-feature" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="max-featured">Maximum Featured Events</Label>
                    <Select defaultValue="5">
                      <SelectTrigger id="max-featured">
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Events</SelectItem>
                        <SelectItem value="5">5 Events</SelectItem>
                        <SelectItem value="8">8 Events</SelectItem>
                        <SelectItem value="10">10 Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Settings</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Event Management</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search events..." className="w-[250px] pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sort by <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Newest First</DropdownMenuItem>
                  <DropdownMenuItem>Oldest First</DropdownMenuItem>
                  <DropdownMenuItem>Most Registrations</DropdownMenuItem>
                  <DropdownMenuItem>Upcoming Events</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[725px]">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>Add a new event to promote on your platform.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-title" className="text-right">
                        Event Title
                      </Label>
                      <Input id="event-title" placeholder="Enter event title" className="col-span-3" />
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
                          <SelectItem value="conference">Conference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-date" className="text-right">
                        Date & Time
                      </Label>
                      <div className="col-span-3 grid grid-cols-2 gap-2">
                        <Input id="event-date" type="date" />
                        <Input id="event-time" type="time" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-location" className="text-right">
                        Location
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select location type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="virtual">Virtual</SelectItem>
                          <SelectItem value="in-person">In-Person</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="event-description" className="text-right pt-2">
                        Description
                      </Label>
                      <Textarea id="event-description" placeholder="Enter event description" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Event Image</Label>
                      <div className="col-span-3">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="event-image"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                            </div>
                            <input id="event-image" type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-featured" className="text-right">
                        Featured Event
                      </Label>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Switch id="event-featured" />
                        <Label htmlFor="event-featured">Highlight on homepage</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Create Event</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Event Title</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Registrations</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Featured</th>
                    <th className="h-12 px-4 text-left align-middle font-medium w-[80px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {[
                    {
                      title: "Tech Career Fair 2023",
                      type: "Job Fair",
                      date: "Jun 15, 2023",
                      location: "Virtual",
                      registrations: 245,
                      status: "Upcoming",
                      featured: true,
                    },
                    {
                      title: "Resume Building Workshop",
                      type: "Workshop",
                      date: "Jun 22, 2023",
                      location: "Virtual",
                      registrations: 178,
                      status: "Upcoming",
                      featured: true,
                    },
                    {
                      title: "Industry Insights: AI & Machine Learning",
                      type: "Webinar",
                      date: "Jul 5, 2023",
                      location: "Virtual",
                      registrations: 312,
                      status: "Upcoming",
                      featured: true,
                    },
                    {
                      title: "Networking Event for IT Professionals",
                      type: "Networking",
                      date: "Jul 12, 2023",
                      location: "In-Person",
                      registrations: 98,
                      status: "Upcoming",
                      featured: false,
                    },
                    {
                      title: "Interview Skills Masterclass",
                      type: "Workshop",
                      date: "Jul 18, 2023",
                      location: "Virtual",
                      registrations: 156,
                      status: "Upcoming",
                      featured: false,
                    },
                  ].map((event, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">{event.title}</td>
                      <td className="p-4 align-middle">
                        <Badge variant="outline">{event.type}</Badge>
                      </td>
                      <td className="p-4 align-middle">{event.date}</td>
                      <td className="p-4 align-middle">{event.location}</td>
                      <td className="p-4 align-middle">{event.registrations}</td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant={
                            event.status === "Upcoming" ? "default" : event.status === "Past" ? "secondary" : "outline"
                          }
                        >
                          {event.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        {event.featured ? (
                          <Star className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <Star className="h-4 w-4 text-muted-foreground" />
                        )}
                      </td>
                      <td className="p-4 align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              {event.featured ? "Unfeature" : "Feature"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Content Moderation Tab */}
        <TabsContent value="content-moderation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+8 since yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">75% approval rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected Today</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">25% rejection rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
                <Flag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Requires immediate review</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Moderation Queue</CardTitle>
                <CardDescription>User-generated content awaiting review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Review",
                      content:
                        "The career counseling service was extremely helpful. The advisor provided practical advice that helped me land my dream job within weeks!",
                      user: "Alex Thompson",
                      submitted: "2 hours ago",
                      flagged: false,
                    },
                    {
                      type: "Testimonial",
                      content:
                        "After completing the web development course, I received three job offers. The skills I learned were exactly what employers were looking for.",
                      user: "Maria Garcia",
                      submitted: "5 hours ago",
                      flagged: false,
                    },
                    {
                      type: "Review",
                      content:
                        "This platform is terrible. I've been trying to contact support for days with no response. Complete waste of time and money.",
                      user: "James Wilson",
                      submitted: "1 day ago",
                      flagged: true,
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-md border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.type}</Badge>
                            {item.flagged && <Badge variant="destructive">Flagged</Badge>}
                          </div>
                          <p className="mt-2 text-sm">{item.content}</p>
                          <div className="mt-2 flex items-center text-xs text-muted-foreground">
                            <Avatar className="mr-1 h-4 w-4">
                              <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {item.user} • {item.submitted}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm" className="h-8">
                            <XCircle className="mr-1 h-3 w-3" />
                            Reject
                          </Button>
                          <Button size="sm" className="h-8">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Pending Content
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Moderation Settings</CardTitle>
                <CardDescription>Configure content moderation rules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="auto-moderation">Auto-Moderation</Label>
                    <Switch id="auto-moderation" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="profanity-filter">Profanity Filter</Label>
                    <Switch id="profanity-filter" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="spam-detection">Spam Detection</Label>
                    <Switch id="spam-detection" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="sentiment-analysis">Sentiment Analysis</Label>
                    <Switch id="sentiment-analysis" defaultChecked />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="moderation-level">Moderation Strictness</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="moderation-level">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="very-high">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auto-approve">Auto-Approve Content From</Label>
                    <Select defaultValue="verified">
                      <SelectTrigger id="auto-approve">
                        <SelectValue placeholder="Select user types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Auto-Approval</SelectItem>
                        <SelectItem value="verified">Verified Users</SelectItem>
                        <SelectItem value="premium">Premium Users</SelectItem>
                        <SelectItem value="all">All Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Settings</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Content Moderation History</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search content..." className="w-[250px] pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Filter by <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Content</DropdownMenuItem>
                  <DropdownMenuItem>Reviews</DropdownMenuItem>
                  <DropdownMenuItem>Testimonials</DropdownMenuItem>
                  <DropdownMenuItem>Comments</DropdownMenuItem>
                  <DropdownMenuItem>Forum Posts</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Content Type</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Content Preview</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Submitted By</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Moderator</th>
                    <th className="h-12 px-4 text-left align-middle font-medium w-[80px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {[
                    {
                      type: "Review",
                      content: "The resume review service was excellent and helped me improve my...",
                      user: "John Smith",
                      date: "May 28, 2023",
                      status: "Approved",
                      moderator: "Admin",
                    },
                    {
                      type: "Testimonial",
                      content: "I found my dream job through this platform within just two weeks...",
                      user: "Sarah Johnson",
                      date: "May 27, 2023",
                      status: "Approved",
                      moderator: "Admin",
                    },
                    {
                      type: "Comment",
                      content: "This article doesn't provide any useful information. Waste of time...",
                      user: "Michael Brown",
                      date: "May 26, 2023",
                      status: "Rejected",
                      moderator: "System",
                    },
                    {
                      type: "Forum Post",
                      content: "Has anyone had experience with the technical interview at Google?...",
                      user: "Emily Davis",
                      date: "May 25, 2023",
                      status: "Approved",
                      moderator: "Moderator",
                    },
                    {
                      type: "Review",
                      content: "The career counseling was a complete waste of money. The advisor...",
                      user: "Robert Wilson",
                      date: "May 24, 2023",
                      status: "Rejected",
                      moderator: "Admin",
                    },
                  ].map((item, i) => (
                    <tr key={i} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">
                        <Badge variant="outline">{item.type}</Badge>
                      </td>
                      <td className="p-4 align-middle max-w-[200px] truncate">{item.content}</td>
                      <td className="p-4 align-middle">{item.user}</td>
                      <td className="p-4 align-middle">{item.date}</td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant={
                            item.status === "Approved"
                              ? "default"
                              : item.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{item.moderator}</td>
                      <td className="p-4 align-middle">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Change Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
   </div>
  )
}


export default ContentManagement

