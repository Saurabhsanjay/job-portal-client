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
import { useApiGet } from "@/hooks/use-api-query"
import { useState,useEffect, use } from "react"
import { useAuth } from "@/app/(providers)/AuthContext"

export interface AutomationsResponse {
    status: string;
    statusCode: number;
    message: string;
    formattedMessage: string;
    data: Automation[];
  }
  
  export interface Automation {
    _id: string;
    title: string;
    description: string;
    includedWith: string;
    status: "ACTIVE" | "INACTIVE"; // assuming status could have multiple values
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface EmployeeAutomationsResponse {
    status: string;
    statusCode: number;
    message: string;
    formattedMessage: string;
    data: EmployeeAutomation[];
  }
  
  export interface EmployeeAutomation {
    _id: string;
    employeeId: string;
    automationId: string;
    message: string;
    status: "ACTIVE" | "INACTIVE"; // assuming these are the only two possible values
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  

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
    const { user } = useAuth()
    console.log("User: ", user)
    const [selectedAutomationTemplates, setSelectedAutomationTemplates] = useState([])
    const [automations,setAutomations]=useState([])
    const [status, setStatus] = useState("ALL")
    console.log("status: ", status)

    const { data: automationsTemplatesData, isLoading, error } = useApiGet<AutomationsResponse>("automations/automations-list", {}, ["automations-list"])

    useEffect(() => {
        if (automationsTemplatesData?.data) {
            const templates = [...automationsTemplatesData.data]
            templates[0].icon = MessageSquare
            templates[1].icon = UserCheck
            templates[2].icon = Mail
            setSelectedAutomationTemplates(templates)
        }
    }, [automationsTemplatesData])

    const { data: automationsListData, refetch } = useApiGet<EmployeeAutomationsResponse>(
        `employee-automation/employee-automation-list?employeeId=${user?.id || ""}${status === "ACTIVE" || status === "INACTIVE" ? `&status=${status}` : ""}`,
        {},
        ["automations-list-data"]
    )

    useEffect(() => {
        refetch()
    }, [status, refetch])
    console.log("Automations List Data: ", automationsListData)

    useEffect(() => {
        if (automationsListData?.data) {
            setAutomations(automationsListData?.data)
        }
    }, [automationsListData])

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
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All automations</SelectItem>
                                <SelectItem value="ACTIVE">Active only</SelectItem>
                                <SelectItem value="INACTIVE">Paused only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Name</TableHead>
                                {/* <TableHead className="w-[300px]">Trigger</TableHead> */}
                                <TableHead>Status</TableHead>
                                <TableHead>Message</TableHead>
                                {/* <TableHead>Last Run</TableHead> */}
                                {/* <TableHead className="text-right">Total Runs</TableHead> */}
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {automations?.map((automation,index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{automation.name||"Automation Name"}</TableCell>
                                    {/* <TableCell>{automation.trigger}</TableCell> */}
                                    <TableCell>
                                        <Badge variant={automation.status === "ACTIVE" ? "success" : "secondary"}>
                                            {automation.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{automation?.message||"No message"}</TableCell>
                                    {/* <TableCell>{automation.lastRun}</TableCell> */}
                                    {/* <TableCell className="text-right">{automation.totalRuns}</TableCell> */}
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            {automation.status === "ACTIVE" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
                    {selectedAutomationTemplates?.map((template,index) => (
                        <Card key={index} className="relative">
                            {/* {template.included && (
                                <Badge variant="secondary" className="absolute top-4 right-4">
                                    Included with Pro
                                </Badge>
                            )} */}
                            <CardHeader>
                                <template.icon className="h-8 w-8 mb-2 text-primary" />
                                <CardTitle className="text-lg">{template?.title}</CardTitle>
                                <CardDescription>{template?.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link 
                                    href={`/employer/automations/setup?id=${template?._id}`}
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

