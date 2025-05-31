"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bell,
  Mail,
  Phone,
  Send,
  Settings,
  LayoutTemplateIcon as Template,
  Clock,
  Edit,
  Trash2,
  Copy,
  Eye,
} from "lucide-react"

export default function NotificationsManagement() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    inApp: true,
    jobAlerts: true,
    interviewReminders: true,
    statusUpdates: true,
  })

  const notificationTemplates = [
    {
      id: 1,
      name: "Application Approved",
      type: "Approval",
      channel: "Email",
      subject: "Congratulations! Your application has been approved",
      lastModified: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Application Rejected",
      type: "Rejection",
      channel: "Email",
      subject: "Update on your job application",
      lastModified: "2024-01-14",
      status: "Active",
    },
    {
      id: 3,
      name: "Interview Reminder",
      type: "Reminder",
      channel: "SMS",
      subject: "Interview reminder for {job_title} at {company_name}",
      lastModified: "2024-01-13",
      status: "Active",
    },
    {
      id: 4,
      name: "New Job Alert",
      type: "Job Alert",
      channel: "In-App",
      subject: "New job opportunity: {job_title}",
      lastModified: "2024-01-12",
      status: "Draft",
    },
  ]

  const automatedReminders = [
    {
      id: 1,
      type: "Interview Reminder",
      timing: "24 hours before",
      channel: "Email + SMS",
      status: "Active",
      recipients: "Students",
    },
    {
      id: 2,
      type: "Interview Reminder",
      timing: "2 hours before",
      channel: "SMS",
      status: "Active",
      recipients: "Students",
    },
    {
      id: 3,
      type: "Application Deadline",
      timing: "3 days before",
      channel: "Email",
      status: "Active",
      recipients: "Students",
    },
    {
      id: 4,
      type: "Status Update",
      timing: "Immediate",
      channel: "In-App",
      status: "Active",
      recipients: "Students",
    },
  ]

  const notificationHistory = [
    {
      id: 1,
      title: "New Software Engineer Position",
      type: "Job Alert",
      recipients: 245,
      sent: "2024-01-15 10:30",
      delivered: 243,
      opened: 156,
      status: "Delivered",
    },
    {
      id: 2,
      title: "Interview Reminder - TechCorp",
      type: "Reminder",
      recipients: 12,
      sent: "2024-01-15 08:00",
      delivered: 12,
      opened: 11,
      status: "Delivered",
    },
    {
      id: 3,
      title: "Application Status Update",
      type: "Status Update",
      recipients: 89,
      sent: "2024-01-14 16:45",
      delivered: 87,
      opened: 72,
      status: "Delivered",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Global Settings
        </Button>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Notifications</TabsTrigger>
          <TabsTrigger value="reminders">Automated Reminders</TabsTrigger>
          <TabsTrigger value="templates">Template Management</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Notification Channels
                </CardTitle>
                <CardDescription>Configure which notification channels are enabled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label>Email Notifications</Label>
                  </div>
                  <Switch
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <Label>SMS Notifications</Label>
                  </div>
                  <Switch
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label>In-App Notifications</Label>
                  </div>
                  <Switch
                    checked={notificationSettings.inApp}
                    onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, inApp: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>Enable or disable specific notification types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Job Alerts</Label>
                  <Switch
                    checked={notificationSettings.jobAlerts}
                    onCheckedChange={(checked) => setNotificationSettings((prev) => ({ ...prev, jobAlerts: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Interview Reminders</Label>
                  <Switch
                    checked={notificationSettings.interviewReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, interviewReminders: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Status Updates</Label>
                  <Switch
                    checked={notificationSettings.statusUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, statusUpdates: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>Recent notifications sent to users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Opened</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notificationHistory.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{notification.type}</Badge>
                      </TableCell>
                      <TableCell>{notification.recipients}</TableCell>
                      <TableCell>{notification.sent}</TableCell>
                      <TableCell>{notification.delivered}</TableCell>
                      <TableCell>{notification.opened}</TableCell>
                      <TableCell>
                        <Badge variant="default">{notification.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Bulk Notification
              </CardTitle>
              <CardDescription>Send notifications to multiple users at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Notification Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="job-alert">Job Alert</SelectItem>
                      <SelectItem value="campaign">Campaign</SelectItem>
                      <SelectItem value="system-update">System Update</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students Only</SelectItem>
                      <SelectItem value="employers">Employers Only</SelectItem>
                      <SelectItem value="active">Active Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Enter notification title" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Enter your message here..." rows={4} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Channel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="in-app">In-App</SelectItem>
                      <SelectItem value="all">All Channels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Schedule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Send now or schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="schedule">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
                <Button variant="outline">Preview</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Automated Reminders
              </CardTitle>
              <CardDescription>Configure automatic reminders and status updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Timing</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {automatedReminders.map((reminder) => (
                    <TableRow key={reminder.id}>
                      <TableCell className="font-medium">{reminder.type}</TableCell>
                      <TableCell>{reminder.timing}</TableCell>
                      <TableCell>{reminder.channel}</TableCell>
                      <TableCell>{reminder.recipients}</TableCell>
                      <TableCell>
                        <Badge variant={reminder.status === "Active" ? "default" : "secondary"}>
                          {reminder.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button>
                  <Clock className="h-4 w-4 mr-2" />
                  Add New Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Template className="h-5 w-5" />
                Notification Templates
              </CardTitle>
              <CardDescription>Create and manage notification templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button>
                  <Template className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notificationTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.type}</Badge>
                      </TableCell>
                      <TableCell>{template.channel}</TableCell>
                      <TableCell className="max-w-xs truncate">{template.subject}</TableCell>
                      <TableCell>{template.lastModified}</TableCell>
                      <TableCell>
                        <Badge variant={template.status === "Active" ? "default" : "secondary"}>
                          {template.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
