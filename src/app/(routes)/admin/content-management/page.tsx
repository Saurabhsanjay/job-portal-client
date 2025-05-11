"use client"

import { useState } from "react"
import {
  CheckCircle,
  ChevronDown,
  Edit,
  Eye,
  FileText,
  Link,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Video,
  BookOpen,
  FileQuestion,
  BarChart2,
  Check,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { toast } from "react-hot-toast"
import { useApiGet, useApiPost, useApiPut, useApiDelete } from "@/hooks/use-api-query"

// Types
interface ContentItem {
  _id: string
  title: string
  contentType: string
  description: string
  category: string
  imageUrl?: string
  tags: string[]
  status: string
  views: number
  createdAt: string
  updatedAt: string
  __v?: number
}

interface StatusCount {
  status: string
  count: number
}

// Sort options
type SortOption = {
  label: string
  key: keyof ContentItem
  direction: "asc" | "desc"
}

// Content type icons mapping
const getContentTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "article":
      return <FileText className="h-4 w-4 text-blue-500" />
    case "video":
      return <Video className="h-4 w-4 text-red-500" />
    case "tutorial":
      return <BookOpen className="h-4 w-4 text-green-500" />
    case "infographic":
      return <BarChart2 className="h-4 w-4 text-purple-500" />
    default:
      return <FileQuestion className="h-4 w-4 text-gray-500" />
  }
}

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const BlogManagement = () => {
  const [searchContent, setSearchContent] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [currentContent, setCurrentContent] = useState<Partial<ContentItem>>({
    title: "",
    contentType: "article",
    description: "",
    category: "Programming",
    imageUrl: "",
    tags: [],
    status: "draft",
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [contentToDelete, setContentToDelete] = useState<string | null>(null)

  // Sorting state
  const [sortOption, setSortOption] = useState<SortOption>({
    label: "Newest First",
    key: "createdAt",
    direction: "desc",
  })

  // Define sort options
  const sortOptions: SortOption[] = [
    { label: "Newest First", key: "createdAt", direction: "desc" },
    { label: "Oldest First", key: "createdAt", direction: "asc" },
    { label: "Most Popular", key: "views", direction: "desc" },
    { label: "Title A-Z", key: "title", direction: "asc" },
    { label: "Title Z-A", key: "title", direction: "desc" },
    { label: "Recently Updated", key: "updatedAt", direction: "desc" },
  ]

  // Fetch top five contents
  const { data: topContentsData, refetch: refetchTopContents } = useApiGet<ContentItem[]>(
    "content-management/get-topfive-contents",
    {},
    ["topContents"],
  )

  // Fetch status counts
  const { data: statusCountData, refetch: refetchStatusCount } = useApiGet<StatusCount[]>(
    "content-management/content_management-status-count",
    {},
    ["statusCount"],
  )

  // Fetch all content
  const { data: contentListData, refetch: refetchContentList } = useApiGet<ContentItem[]>(
    "content-management/content_management-list",
    {},
    ["contentList"],
  )

  const contentList = contentListData?.data || []

  // Create content mutation
  const createContentMutation = useApiPost<any, Partial<ContentItem>>()

  // Update content mutation
  const updateContentMutation = useApiPut<any, Partial<ContentItem>>()

  // Delete content mutation
  const deleteContentMutation = useApiDelete<any>()

  // Get status counts
  const getStatusCount = (status: string): number => {
    if (!statusCountData?.data) return 0
    const statusItem = statusCountData?.data.find((item) => item.status === status)
    return statusItem?.count || 0
  }

  // Filter and sort content
  const filteredAndSortedContent = (() => {
    // First filter the content
    const filtered = contentList
      ? contentList.filter(
        (content) =>
          content.title.toLowerCase().includes(searchContent.toLowerCase()) ||
          content.category.toLowerCase().includes(searchContent.toLowerCase()) ||
          content.contentType.toLowerCase().includes(searchContent.toLowerCase()),
      )
      : []

    // Then sort the filtered content
    return [...filtered].sort((a, b) => {
      const key = sortOption.key

      // Handle special cases for date fields
      if (key === "createdAt" || key === "updatedAt") {
        const dateA = new Date(a[key]).getTime()
        const dateB = new Date(b[key]).getTime()
        return sortOption.direction === "asc" ? dateA - dateB : dateB - dateA
      }

      // Handle string fields
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        return sortOption.direction === "asc"
          ? (a[key] as string).localeCompare(b[key] as string)
          : (b[key] as string).localeCompare(a[key] as string)
      }

      // Handle number fields
      if (typeof a[key] === "number" && typeof b[key] === "number") {
        return sortOption.direction === "asc"
          ? (a[key] as number) - (b[key] as number)
          : (b[key] as number) - (a[key] as number)
      }

      return 0
    })
  })()

  // Handle creating new content
  const handleCreateContent = () => {
    setCurrentContent({
      title: "",
      contentType: "article",
      description: "",
      category: "Programming",
      imageUrl: "",
      tags: [],
      status: "draft",
    })
    setFormMode("create")
    setIsFormOpen(true)
  }

  // Handle editing content
  const handleEditContent = (content: ContentItem) => {
    setCurrentContent({
      ...content,
      tags: content.tags || [],
    })
    setFormMode("edit")
    setIsFormOpen(true)
  }

  // Handle saving content
  const handleSaveContent = async () => {
    // Prepare tags if they're a string
    const formattedContent = {
      ...currentContent,
      tags: Array.isArray(currentContent.tags)
        ? currentContent.tags
        : typeof currentContent.tags === "string"
          ? currentContent.tags.split(",").map((tag) => tag.trim())
          : [],
    }

    const loadingToast = toast.loading(formMode === "create" ? "Creating content..." : "Updating content...")

    try {
      if (formMode === "create") {
        await createContentMutation.mutateAsync({
          endpoint: "content-management/create-content_management",
          payload: formattedContent,
          invalidateQueries: [["contentList"], ["topContents"], ["statusCount"]],
        })
        toast.dismiss(loadingToast)
        toast.success("Content created successfully")
      } else {
        await updateContentMutation.mutateAsync({
          endpoint: `content-management/update-content_management/${currentContent._id}`,
          payload: formattedContent,
          invalidateQueries: [["contentList"], ["topContents"], ["statusCount"]],
        })
        toast.dismiss(loadingToast)
        toast.success("Content updated successfully")
      }

      setIsFormOpen(false)
      refetchContentList()
      refetchTopContents()
      refetchStatusCount()
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error(formMode === "create" ? "Failed to create content" : "Failed to update content")
      console.error("Content operation error:", error)
    }
  }

  // Handle deleting content
  const handleDeleteContent = (id: string) => {
    setContentToDelete(id)
    setDeleteDialogOpen(true)
  }

  // Confirm delete content
  const confirmDeleteContent = async () => {
    if (!contentToDelete) return

    const loadingToast = toast.loading("Deleting content...")

    try {
      await deleteContentMutation.mutateAsync({
        endpoint: `content-management/delete-content_management/${contentToDelete}`,
        invalidateQueries: [["contentList"], ["topContents"], ["statusCount"]],
      })

      toast.dismiss(loadingToast)
      toast.success("Content deleted successfully")
      setDeleteDialogOpen(false)
      refetchContentList()
      refetchTopContents()
      refetchStatusCount()
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error("Failed to delete content")
      console.error("Delete content error:", error)
    }
  }

  // Handle status change
  const handleStatusChange = async (content: ContentItem, newStatus: string) => {
    const loadingToast = toast.loading("Updating status...")

    try {
      await updateContentMutation.mutateAsync({
        endpoint: `content-management/update-content_management/${content._id}`,
        payload: {
          ...content,
          status: newStatus,
        },
        invalidateQueries: [["contentList"], ["topContents"], ["statusCount"]],
      })

      toast.dismiss(loadingToast)
      toast.success("Status updated successfully")
      refetchContentList()
      refetchTopContents()
      refetchStatusCount()
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error("Failed to update status")
      console.error("Update status error:", error)
    }
  }

  // Handle sort option change
  const handleSortChange = (option: SortOption) => {
    setSortOption(option)
  }

  return (
    <div className="space-y-6">
      {/* React Hot Toast container */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Resource Management</h1>
          <p className="text-muted-foreground">Manage blog posts and resources for your platform</p>
        </div>
        <Button onClick={handleCreateContent}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Content
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("total")}</div>
            <p className="text-xs text-muted-foreground">All content items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("published")}</div>
            <p className="text-xs text-muted-foreground">
              {getStatusCount("total") > 0
                ? Math.round((getStatusCount("published") / getStatusCount("total")) * 100)
                : 0}
              % of total content
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("draft")}</div>
            <p className="text-xs text-muted-foreground">
              {getStatusCount("total") > 0 ? Math.round((getStatusCount("draft") / getStatusCount("total")) * 100) : 0}%
              of total content
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusCount("totalViews").toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all content</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Content by Views</CardTitle>
            <CardDescription>Most viewed content items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContentsData?.data && topContentsData?.data.length > 0 ? (
                topContentsData?.data.map((content) => (
                  <div key={content._id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50">
                        {getContentTypeIcon(content.contentType)}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{content.title}</h4>
                        <p className="text-xs text-muted-foreground">{content.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{content.views.toLocaleString()} views</div>
                      <div className="text-xs text-muted-foreground">{formatDate(content.createdAt)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">No content available</div>
              )}
              {topContentsData && topContentsData.length > 0 && (
                <Button variant="outline" className="w-full text-xs">
                  View All Content
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Content Library</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="w-[250px] pl-8"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort by: {sortOption.label} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={`${option.key}-${option.direction}`}
                  onClick={() => handleSortChange(option)}
                  className="flex items-center justify-between"
                >
                  {option.label}
                  {sortOption.label === option.label && <Check className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleCreateContent}>
            <Plus className="mr-2 h-4 w-4" />
            New Content
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <div className="h-[calc(100vh-22rem)] overflow-y-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Created</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Views</th>
                  <th className="h-12 px-4 text-left align-middle font-medium w-[80px]">Actions</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {filteredAndSortedContent.length > 0 ? (
                  filteredAndSortedContent.map((content) => (
                    <tr
                      key={content._id}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">{content.title}</td>
                      <td className="p-4 align-middle">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getContentTypeIcon(content.contentType)}
                          <span className="capitalize">{content.contentType}</span>
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{content.category}</td>
                      <td className="p-4 align-middle">
                        <Badge
                          variant={
                            content.status === "published"
                              ? "default"
                              : content.status === "draft"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          <span className="capitalize">{content.status}</span>
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{formatDate(content.createdAt)}</td>
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
                            <DropdownMenuItem onClick={() => handleEditContent(content)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {content.status !== "published" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(content, "published")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Publish
                              </DropdownMenuItem>
                            )}
                            {content.status === "published" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(content, "draft")}>
                                <Edit className="mr-2 h-4 w-4" />
                                Unpublish
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Link className="mr-2 h-4 w-4" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteContent(content._id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      No content found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Content Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>{formMode === "create" ? "Create New Content" : "Edit Content"}</DialogTitle>
            <DialogDescription>
              {formMode === "create"
                ? "Add a new blog post, guide, or resource to your platform."
                : "Update the details of your existing content."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content-title" className="text-right">
                Title
              </Label>
              <Input
                id="content-title"
                placeholder="Enter content title"
                className="col-span-3"
                value={currentContent.title || ""}
                onChange={(e) => setCurrentContent({ ...currentContent, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content-type" className="text-right">
                Content Type
              </Label>
              <Select
                value={currentContent.contentType || "article"}
                onValueChange={(value) => setCurrentContent({ ...currentContent, contentType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                  <SelectItem value="infographic">Infographic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content-category" className="text-right">
                Category
              </Label>
              <Select
                value={currentContent.category || "Programming"}
                onValueChange={(value) => setCurrentContent({ ...currentContent, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="API Development">API Development</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
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
                value={currentContent.description || ""}
                onChange={(e) => setCurrentContent({ ...currentContent, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content-image" className="text-right">
                Image URL
              </Label>
              <Input
                id="content-image"
                placeholder="Enter image URL"
                className="col-span-3"
                value={currentContent.imageUrl || ""}
                onChange={(e) => setCurrentContent({ ...currentContent, imageUrl: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content-tags" className="text-right">
                Tags
              </Label>
              <Input
                id="content-tags"
                placeholder="Enter tags separated by commas"
                className="col-span-3"
                value={Array.isArray(currentContent.tags) ? currentContent.tags.join(", ") : ""}
                onChange={(e) =>
                  setCurrentContent({
                    ...currentContent,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content-status" className="text-right">
                Status
              </Label>
              <Select
                value={currentContent.status || "draft"}
                onValueChange={(value) => setCurrentContent({ ...currentContent, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="unpublished">Unpublished</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveContent}
              disabled={createContentMutation.isPending || updateContentMutation.isPending}
            >
              {createContentMutation.isPending || updateContentMutation.isPending
                ? "Saving..."
                : formMode === "create"
                  ? "Create Content"
                  : "Update Content"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this content from your platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteContent} className="bg-destructive text-destructive-foreground">
              {deleteContentMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default BlogManagement
