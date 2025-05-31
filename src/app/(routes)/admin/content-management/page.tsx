import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  FileText,
  BarChart3,
  Tag,
  Calendar,
  Clock,
  Filter,
} from "lucide-react"

// Sample blog post data
const blogPosts = [
  {
    id: "1",
    title: "Top 10 Interview Tips for Software Engineers",
    slug: "top-10-interview-tips",
    excerpt: "Prepare for your next tech interview with these essential tips.",
    category: "Interview Tips",
    author: "Jane Smith",
    date: "2023-05-15",
    status: "Published",
    readingTime: 8,
    views: 1245,
  },
  {
    id: "2",
    title: "How to Negotiate Your Salary in 2023",
    slug: "salary-negotiation-guide",
    excerpt: "Learn effective strategies to maximize your compensation package.",
    category: "Career Advice",
    author: "John Doe",
    date: "2023-06-02",
    status: "Published",
    readingTime: 12,
    views: 2340,
  },
  {
    id: "3",
    title: "The Future of Remote Work in Tech",
    slug: "future-remote-work-tech",
    excerpt: "Exploring how remote work is reshaping the technology industry.",
    category: "Industry Insights",
    author: "Alex Johnson",
    date: "2023-06-10",
    status: "Draft",
    readingTime: 10,
    views: 0,
  },
  {
    id: "4",
    title: "Building Your Personal Brand on LinkedIn",
    slug: "linkedin-personal-branding",
    excerpt: "Step-by-step guide to establish your professional presence online.",
    category: "Career Advice",
    author: "Sarah Williams",
    date: "2023-06-18",
    status: "Scheduled",
    readingTime: 7,
    views: 0,
  },
  {
    id: "5",
    title: "Transitioning from Developer to Manager",
    slug: "developer-to-manager",
    excerpt: "Key insights for developers looking to move into management roles.",
    category: "Career Advice",
    author: "Michael Chen",
    date: "2023-05-28",
    status: "Published",
    readingTime: 15,
    views: 1876,
  },
]

// Sample categories
const categories = [
  { name: "Career Advice", count: 15 },
  { name: "Interview Tips", count: 8 },
  { name: "Industry Insights", count: 12 },
  { name: "Job Search", count: 10 },
  { name: "Workplace Culture", count: 7 },
  { name: "Remote Work", count: 9 },
]

// Sample analytics data
const analyticsData = {
  totalViews: 24680,
  totalPosts: 52,
  avgReadTime: 8.5,
  topCategories: ["Career Advice", "Interview Tips", "Remote Work"],
  popularPosts: [
    {
      title: "How to Negotiate Your Salary in 2023",
      views: 2340,
      engagement: "High",
    },
    {
      title: "Transitioning from Developer to Manager",
      views: 1876,
      engagement: "Medium",
    },
    {
      title: "Top 10 Interview Tips for Software Engineers",
      views: 1245,
      engagement: "High",
    },
  ],
}

export default function BlogManagement() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create, edit and manage your blog content</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
          Fill in the details for your new blog post. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter post title" />
              </div>
              <div className="grid gap-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" placeholder="Brief summary of the post" />
              </div>
              <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
            <SelectItem key={category.name} value={category.name}>
              {category.name}
            </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
              </div>
              <div className="grid gap-2">
          <Label htmlFor="keywords">Keywords (comma separated)</Label>
          <Input id="keywords" placeholder="e.g. career, interview, resume" />
              </div>
              <div className="grid gap-2">
          <Label>Featured Image</Label>
          <div className="flex items-center gap-4">
            <div className="h-24 w-40 rounded-md border border-dashed bg-muted"></div>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
          </div>
              </div>
              <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" placeholder="Write your blog post content here..." className="min-h-[200px]" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="posts">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="posts">
            <FileText className="mr-2 h-4 w-4" /> Posts
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Tag className="mr-2 h-4 w-4" /> Categories
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            <Calendar className="mr-2 h-4 w-4" /> Scheduled
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="mr-2 h-4 w-4" /> Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle>All Blog Posts</CardTitle>
                  <CardDescription>Manage your existing blog posts</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search posts..." className="w-full pl-9 md:w-[300px]" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                      <DropdownMenuItem>All Posts</DropdownMenuItem>
                      <DropdownMenuItem>Published</DropdownMenuItem>
                      <DropdownMenuItem>Draft</DropdownMenuItem>
                      <DropdownMenuItem>Scheduled</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.name}>{category.name}</DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="hidden md:table-cell">Author</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{post.title}</p>
                            <p className="hidden text-sm text-muted-foreground sm:block">
                              {post.excerpt.substring(0, 60)}...
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{post.category}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                        <TableCell className="hidden md:table-cell">{post.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              post.status === "Published"
                                ? "default"
                                : post.status === "Draft"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {post.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" /> Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>5</strong> of <strong>52</strong> posts
                </div>
                <div className="flex items-center space-x-2">
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
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage your blog post categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Posts</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.name}>
                          <TableCell>{category.name}</TableCell>
                          <TableCell>{category.count}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Category</CardTitle>
                <CardDescription>Create a new blog category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Category Name</Label>
                    <Input id="name" placeholder="Enter category name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of this category" />
                  </div>
                  <Button>Add Category</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>Manage your upcoming blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div>
                          <p className="font-medium">Building Your Personal Brand on LinkedIn</p>
                          <p className="text-sm text-muted-foreground">
                            Step-by-step guide to establish your professional presence online.
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Career Advice</Badge>
                      </TableCell>
                      <TableCell>Sarah Williams</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          2023-06-18
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>Publish Now</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalPosts}</div>
                <p className="text-xs text-muted-foreground">+4 posts this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Reading Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.avgReadTime} min</div>
                <p className="text-xs text-muted-foreground">-0.5 min from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Categories</CardTitle>
                <Tag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {analyticsData.topCategories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Posts</CardTitle>
                <CardDescription>Your most viewed blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Post Title</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                        <TableHead className="text-right">Engagement</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analyticsData.popularPosts.map((post, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={
                                post.engagement === "High"
                                  ? "default"
                                  : post.engagement === "Medium"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {post.engagement}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
