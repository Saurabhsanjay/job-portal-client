"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreHorizontal, Calendar, Users, Edit, Copy, Trash, Plus, Briefcase, Building, Code, CheckCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import toast, { Toaster } from "react-hot-toast"
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
import { useApiGet, useApiPost, useApiPut, useApiDelete } from "@/hooks/use-api-query"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""


// Types
interface EmailCampaign {
  _id: string
  campaignName: string
  emailSubject: string
  audience: string
  message: string
  createdAt: string
  updatedAt: string
}

interface EmailCampaignResponse {
  campaigns: EmailCampaign[]
  total: number
}

interface EmailCampaignDetailResponse {
  campaign: EmailCampaign
}

interface CreateCampaignPayload {
  campaignName: string
  emailSubject: string
  audience: string
  message: string
}

export default function EmailCampaigns() {
  // State
  const [searchCampaigns, setSearchCampaigns] = useState("")
  const [selectedAudience, setSelectedAudience] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")
  const [currentCampaign, setCurrentCampaign] = useState<CreateCampaignPayload>({
    campaignName: "",
    emailSubject: "",
    audience: "job-seekers",
    message: "",
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null)

  // API Hooks
  const { data: campaignsData, refetch: refetchCampaigns } = useApiGet<EmailCampaignResponse>(
    "email_campaign/email_campaign-list",
    { audience: selectedAudience !== "all" ? selectedAudience : undefined },
    ["email-campaigns", { audience: selectedAudience }]
  )

  const createCampaignMutation = useApiPost<EmailCampaignDetailResponse, CreateCampaignPayload>()
  const updateCampaignMutation = useApiPut<EmailCampaignDetailResponse, CreateCampaignPayload>()
  const deleteCampaignMutation = useApiDelete<EmailCampaignDetailResponse>()

  // Derived state
  const campaigns = campaignsData?.data || []

  // Filter campaigns based on search
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.campaignName.toLowerCase().includes(searchCampaigns.toLowerCase()) ||
      campaign.emailSubject.toLowerCase().includes(searchCampaigns.toLowerCase())
  )

  // Handlers
  const handleCreateCampaign = () => {
    setCurrentCampaign({
      campaignName: "",
      emailSubject: "",
      audience: "job-seekers",
      message: "",
    })
    setFormMode("create")
    setIsFormOpen(true)
  }

  const handleEditCampaign = async (campaignId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/email_campaign/get-email_campaign/${campaignId}`)
      const data = await response.json()
      if (data.status === "SUCCESS") {
        setCurrentCampaign({
          campaignName: data.data.campaignName,
          emailSubject: data.data.emailSubject,
          audience: data.data.audience,
          message: data.data.message,
        })
        setFormMode("edit")
        setIsFormOpen(true)
        setCampaignToDelete(campaignId) // Store the ID for update operation
      } else {
        toast.error("Failed to fetch campaign details")
      }
    } catch (error) {
      toast.error("Failed to fetch campaign details")
    }
  }

  const handleSaveCampaign = async () => {
    try {
      if (formMode === "create") {
        const loadingToast = toast.loading("Creating campaign...")

        await createCampaignMutation.mutateAsync({
          endpoint: "email_campaign/create-email_campaign",
          payload: currentCampaign,
          invalidateQueries: [["email-campaigns", { audience: selectedAudience }]],
        })

        toast.dismiss(loadingToast)
        toast.success("Campaign created successfully")
      } else {
        const loadingToast = toast.loading("Updating campaign...")

        // For edit mode, we need the campaign ID
        await updateCampaignMutation.mutateAsync({
          endpoint: `email_campaign/update-email_campaign/${campaignToDelete}`,
          payload: currentCampaign,
          invalidateQueries: [["email-campaigns", { audience: selectedAudience }]],
        })

        toast.dismiss(loadingToast)
        toast.success("Campaign updated successfully")
      }

      setIsFormOpen(false)
      refetchCampaigns()
    } catch (error) {
      toast.error("Failed to save campaign")
    }
  }

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaignToDelete(campaignId)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteCampaign = async () => {
    if (!campaignToDelete) return

    try {
      const loadingToast = toast.loading("Deleting campaign...")

      await deleteCampaignMutation.mutateAsync({
        endpoint: `email_campaign/delete-email_campaign/${campaignToDelete}`,
        invalidateQueries: [["email-campaigns", { audience: selectedAudience }]],
      })

      toast.dismiss(loadingToast)
      toast.success("Campaign deleted successfully")

      setDeleteDialogOpen(false)
      refetchCampaigns()
    } catch (error) {
      toast.error("Failed to delete campaign")
    }
  }

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case "job-seekers":
        return <Users className="h-4 w-4 text-blue-500" />
      case "employers":
        return <Briefcase className="h-4 w-4 text-green-500" />
      case "institutions":
        return <Building className="h-4 w-4 text-purple-500" />
      case "tech-job-seekers":
        return <Code className="h-4 w-4 text-cyan-500" />
      case "active-employers":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "all-users":
        return <Users className="h-4 w-4 text-gray-500" />
      default:
        return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case "job-seekers":
        return "All Job Seekers"
      case "employers":
        return "All Employers"
      case "institutions":
        return "All Institutions"
      case "tech-job-seekers":
        return "Tech Job Seekers"
      case "active-employers":
        return "Active Employers"
      case "all-users":
        return "All Users"
      default:
        return audience
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
     
  
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Email Campaigns</CardTitle>
              <CardDescription>Create and send email campaigns to different audience segments</CardDescription>
            </div>
            <Button className="flex items-center gap-2" onClick={handleCreateCampaign}>
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
              <Select value={selectedAudience} onValueChange={(value) => {
                setSelectedAudience(value)
                // This will trigger a refetch with the new audience filter
              }}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Filter by audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Audiences</SelectItem>
                  <SelectItem value="job-seekers">All Job Seekers</SelectItem>
                  <SelectItem value="employers">All Employers</SelectItem>
                  <SelectItem value="institutions">All Institutions</SelectItem>
                  <SelectItem value="tech-job-seekers">Tech Job Seekers</SelectItem>
                  <SelectItem value="active-employers">Active Employers</SelectItem>
                  <SelectItem value="all-users">All Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Campaign Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign._id}>
                      <TableCell>
                        <div className="font-medium">{campaign.campaignName}</div>
                      </TableCell>
                      <TableCell>{campaign.emailSubject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getAudienceIcon(campaign.audience)}
                          <span>{getAudienceLabel(campaign.audience)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(campaign.createdAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(campaign.updatedAt)}</TableCell>
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
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => handleEditCampaign(campaign._id)}
                            >
                              <Edit className="h-4 w-4" /> Edit Campaign
                            </DropdownMenuItem>
                         
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-destructive"
                              onClick={() => handleDeleteCampaign(campaign._id)}
                            >
                              <Trash className="h-4 w-4" /> Delete Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      {campaigns.length === 0 ? (
                        <div className="flex flex-col items-center gap-2">
                          <p>No campaigns found</p>
                          <Button variant="outline" size="sm" onClick={handleCreateCampaign}>
                            <Plus className="h-4 w-4 mr-2" /> Create your first campaign
                          </Button>
                        </div>
                      ) : (
                        <p>No campaigns match your search criteria</p>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredCampaigns.length}</strong> of <strong>{campaigns.length}</strong> campaigns
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{formMode === "create" ? "Create Campaign" : "Edit Campaign"}</DialogTitle>
            <DialogDescription>
              {formMode === "create"
                ? "Create a new email campaign to send to your audience."
                : "Make changes to your existing campaign."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                placeholder="Enter campaign name"
                value={currentCampaign.campaignName}
                onChange={(e) => setCurrentCampaign({ ...currentCampaign, campaignName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-subject">Email Subject</Label>
              <Input
                id="campaign-subject"
                placeholder="Enter email subject"
                value={currentCampaign.emailSubject}
                onChange={(e) => setCurrentCampaign({ ...currentCampaign, emailSubject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-audience">Select Audience</Label>
              <Select
                value={currentCampaign.audience}
                onValueChange={(value) => setCurrentCampaign({ ...currentCampaign, audience: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job-seekers">All Job Seekers</SelectItem>
                  <SelectItem value="employers">All Employers</SelectItem>
                  <SelectItem value="institutions">All Institutions</SelectItem>
                  <SelectItem value="tech-job-seekers">Tech Job Seekers</SelectItem>
                  <SelectItem value="active-employers">Active Employers</SelectItem>
                  <SelectItem value="all-users">All Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-message">Message</Label>
              <Textarea
                id="campaign-message"
                placeholder="Enter your message"
                className="min-h-[200px]"
                value={currentCampaign.message}
                onChange={(e) => setCurrentCampaign({ ...currentCampaign, message: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCampaign}>
              {formMode === "create" ? "Create Campaign" : "Update Campaign"}
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
              This action cannot be undone. This will permanently delete the email campaign.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteCampaign} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
