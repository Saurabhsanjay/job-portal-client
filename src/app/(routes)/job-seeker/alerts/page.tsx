"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"


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
]

export default function JobAlerts() {
    const [alerts, setAlerts] = useState(jobAlerts)

    const toggleAlert = (id: number) => {
        setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
    }

    return (
        <div className="space-y-6">
            <Card className="p-6 shadow-sm border-none">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-semibold text-gray-900">Job Alerts</h2>
                        <p className="text-sm text-gray-500 mt-1">Get notified when new jobs match your preferences</p>
                    </div>
                    <Button>
                        <Bell className="mr-2 h-4 w-4" />
                        Create New Alert
                    </Button>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Job Alert</TableHead>
                                <TableHead className="w-[300px]">Frequency</TableHead>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {alerts.map((alert) => (
                                <TableRow key={alert.id}>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-medium">{alert.title}</div>


                                        </div>
                                    </TableCell>
                                    <TableCell> <Badge variant="secondary" >
                                        {alert.frequency}
                                    </Badge></TableCell>
                                    <TableCell>
                                        <Switch checked={alert.isActive} onCheckedChange={() => toggleAlert(alert.id)} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">

                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                    {alerts.map((alert) => (
                        <Card key={alert.id} className="p-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <div className="font-medium">{alert.title}</div>
                                    <Switch checked={alert.isActive} onCheckedChange={() => toggleAlert(alert.id)} />
                                </div>
                                <div className="space-y-1 text-sm text-gray-500">

                                    <div className="flex items-center gap-1">
                                        <Bell className="h-3 w-3" />
                                        {alert.frequency}
                                    </div>
                                    <div className="flex items-center justify-end mt-1 pt-1">

                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    )
}

