"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bell, Trash2, Plus, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for job alerts
const jobAlerts = [
  {
    id: 1,
    title: "UI/UX Designer",
    location: "London, UK",
    salary: "$50k - $70k",
    companies: ["Google", "Meta", "Apple"],
    frequency: "Daily",
    isActive: true,
  },
  {
    id: 2,
    title: "Frontend Developer",
    location: "Remote",
    salary: "$70k - $90k",
    companies: ["Amazon", "Microsoft", "Twitter"],
    frequency: "Weekly",
    isActive: true,
  },
  {
    id: 3,
    title: "Product Manager",
    location: "New York, US",
    salary: "$90k - $120k",
    companies: ["Stripe", "Square", "Shopify"],
    frequency: "Daily",
    isActive: false,
  },
  {
    id: 4,
    title: "UI/UX Designer",
    location: "London, UK",
    salary: "$50k - $70k",
    companies: ["Google", "Meta", "Apple"],
    frequency: "Daily",
    isActive: true,
  },
  {
    id: 5,
    title: "Frontend Developer",
    location: "Remote",
    salary: "$70k - $90k",
    companies: ["Amazon", "Microsoft", "Twitter"],
    frequency: "Weekly",
    isActive: true,
  },
  {
    id: 6,
    title: "Product Manager",
    location: "New York, US",
    salary: "$90k - $120k",
    companies: ["Stripe", "Square", "Shopify"],
    frequency: "Daily",
    isActive: false,
  },
  {
    id: 7,
    title: "UI/UX Designer",
    location: "London, UK",
    salary: "$50k - $70k",
    companies: ["Google", "Meta", "Apple"],
    frequency: "Daily",
    isActive: true,
  },
  {
    id: 8,
    title: "Frontend Developer",
    location: "Remote",
    salary: "$70k - $90k",
    companies: ["Amazon", "Microsoft", "Twitter"],
    frequency: "Weekly",
    isActive: true,
  },
  {
    id: 9,
    title: "Product Manager",
    location: "New York, US",
    salary: "$90k - $120k",
    companies: ["Stripe", "Square", "Shopify"],
    frequency: "Daily",
    isActive: false,
  },
]

export default function MobileAlerts() {
  const [alerts, setAlerts] = useState(jobAlerts)
  const [showInfo, setShowInfo] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Job Alerts</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Alert
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Job Alert</DialogTitle>
              <DialogDescription>Get notified when new jobs match your criteria</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="e.g. Frontend Developer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g. Remote, New York" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency">Alert Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Create Alert</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {showInfo && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            Job alerts help you stay updated with new opportunities matching your criteria.
          </AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-blue-700"
            onClick={() => setShowInfo(false)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      <div className="space-y-3 scroll-y max-h-[calc(100vh-200px)] overflow-y-auto">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <Card key={alert.id} className="bg-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{alert.location}</p>
                    <div className="flex items-center mt-2">
                      <Bell className="h-3 w-3 text-gray-400 mr-1" />
                      <Badge variant="outline" className="text-xs font-normal">
                        {alert.frequency}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Switch checked={alert.isActive} onCheckedChange={() => toggleAlert(alert.id)} />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 mt-2 text-red-500"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium">No job alerts</h3>
            <p className="text-sm text-gray-500 mt-1">
              Create your first job alert to get notified about new opportunities
            </p>
            <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
