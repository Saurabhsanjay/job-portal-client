"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
    MessageSquare,
    Mail,
    UserCheck,
    Play,
    Pause,
    Calendar,
    Clock,
    Users,
    GraduationCap,
} from "lucide-react"
import Link from "next/link"

const activeAutomations = [
    {
        id: 1,
        name: "Welcome Message",
        trigger: "New Application",
        status: "Active",
        lastRun: "2 hours ago",
        totalRuns: 156,
    },
    {
        id: 2,
        name: "Interview Follow-up",
        trigger: "Status Change to Interviewed",
        status: "Paused",
        lastRun: "1 day ago",
        totalRuns: 89,
    },
    {
        id: 3,
        name: "Rejection Notice",
        trigger: "Status Change to Rejected",
        status: "Active",
        lastRun: "30 minutes ago",
        totalRuns: 234,
    },
]

// Expanded automation templates
const automationTemplates = [
    {
        id: "new-candidate",
        title: "Message new candidates",
        description: "Automatically send a message when someone applies to your job",
        icon: MessageSquare,
        included: true,
    },
    {
        id: "shortlisted",
        title: "Message shortlisted candidates",
        description: "Send an automatic message when you add someone to your shortlist",
        icon: UserCheck,
        included: true,
    },
    {
        id: "rejected",
        title: "Email rejected candidates",
        description: "Send a no-reply email when a candidate's status changes to rejected",
        icon: Mail,
        included: false,
    },
    {
        id: "interview",
        title: "Schedule interview reminders",
        description: "Send reminders to candidates and interviewers before scheduled interviews",
        icon: Calendar,
        included: true,
    },
    {
        id: "deadline",
        title: "Application deadline reminder",
        description: "Notify candidates about approaching application deadlines",
        icon: Clock,
        included: false,
    },
 
   
    {
        id: "assessment",
        title: "Candidate skill assessment",
        description: "Send automated skill assessments to qualified candidates",
        icon: Users,
        included: false,
    },
  
    {
        id: "onboarding",
        title: "Onboarding checklist",
        description: "Create and send onboarding checklists to new hires",
        icon: GraduationCap,
        included: false,
    },
]

export default function AutomationsPage() {
    return (
        <div className="container mx-auto py-4 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
                    <p className="text-muted-foreground mt-1">Manage your recruitment workflow automations</p>
                </div>
            </div>

            {/* Active Automations Section */}
            <Card className="mb-8">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Active Automations</CardTitle>
                            <CardDescription>Your currently running automation workflows</CardDescription>
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All automations</SelectItem>
                                <SelectItem value="active">Active only</SelectItem>
                                <SelectItem value="paused">Paused only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Name</TableHead>
                                <TableHead className="w-[300px]">Trigger</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Run</TableHead>
                                <TableHead className="text-right">Total Runs</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeAutomations.map((automation) => (
                                <TableRow key={automation.id}>
                                    <TableCell className="font-medium">{automation.name}</TableCell>
                                    <TableCell>{automation.trigger}</TableCell>
                                    <TableCell>
                                        <Badge variant={automation.status === "Active" ? "success" : "secondary"}>
                                            {automation.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{automation.lastRun}</TableCell>
                                    <TableCell className="text-right">{automation.totalRuns}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            {automation.status === "Active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Automation Templates Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Automation Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {automationTemplates.map((template) => (
                        <Card key={template.id} className="relative">
                            {template.included && (
                                <Badge variant="secondary" className="absolute top-4 right-4">
                                    Included with Pro
                                </Badge>
                            )}
                            <CardHeader>
                                <template.icon className="h-8 w-8 mb-2 text-primary" />
                                <CardTitle className="text-lg">{template.title}</CardTitle>
                                <CardDescription>{template.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link 
                                    href={`/employer/automations/setup?id=${template.id}`}
                                >
                                <Button className="w-full" variant="outline">
                                    Set up
                                    </Button></Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

