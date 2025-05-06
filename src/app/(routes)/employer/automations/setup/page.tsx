"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, UserCheck, Mail, Calendar, Clock, Users, ArrowLeftCircle, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { useApiGet } from "@/hooks/use-api-query"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/(providers)/AuthContext"
import toast from "react-hot-toast"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export interface AutomationsResponse {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: Automation[]
}

export interface Automation {
  _id: string
  title: string
  description: string
  includedWith: string
  status: "ACTIVE" | "INACTIVE" // assuming status could have multiple values
  createdAt: string
  updatedAt: string
  __v: number
}

interface Template {
  id: string
  title: string
  description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  isIncluded: boolean
  defaultTemplate: string
  variables: Array<{
    key: string
    label: string
    example: string
  }>
}

const templates: Template[] = [
  {
    id: "new-candidate",
    title: "Message new candidates",
    description: "Automatically send a message when someone applies to your job",
    icon: MessageSquare,
    isIncluded: true,
    variables: [
      {
        key: "{{candidate_name}}",
        label: "Candidate Name",
        example: "John Doe",
      },
      { key: "{{job_title}}", label: "Job Title", example: "Senior Developer" },
      { key: "{{company_name}}", label: "Company Name", example: "Acme Inc" },
    ],
    defaultTemplate:
      "Dear {{candidate_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}.",
  },
  {
    id: "shortlisted",
    title: "Message shortlisted candidates",
    description: "Send an automatic message when you add someone to your shortlist",
    icon: UserCheck,
    isIncluded: true,
    variables: [
      {
        key: "{{candidate_name}}",
        label: "Candidate Name",
        example: "John Doe",
      },
      { key: "{{job_title}}", label: "Job Title", example: "Senior Developer" },
      {
        key: "{{interview_date}}",
        label: "Interview Date",
        example: "Monday, Jan 1, 2024",
      },
    ],
    defaultTemplate:
      "Dear {{candidate_name}},\n\nCongratulations! You've been shortlisted for the {{job_title}} position.",
  },
  {
    id: "rejected",
    title: "Email rejected candidates",
    description: "Send a no-reply email when a candidate's status changes to rejected",
    icon: Mail,
    isIncluded: false,
    variables: [
      {
        key: "{{candidate_name}}",
        label: "Candidate Name",
        example: "John Doe",
      },
      { key: "{{job_title}}", label: "Job Title", example: "Senior Developer" },
    ],
    defaultTemplate: "Dear {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position.",
  },
  {
    id: "interview",
    title: "Schedule interview reminders",
    description: "Send reminders to candidates and interviewers before scheduled interviews",
    icon: Calendar,
    isIncluded: true,
    variables: [
      {
        key: "{{candidate_name}}",
        label: "Candidate Name",
        example: "John Doe",
      },
      {
        key: "{{interview_date}}",
        label: "Interview Date",
        example: "Monday, Jan 1, 2024",
      },
      {
        key: "{{interview_time}}",
        label: "Interview Time",
        example: "2:00 PM",
      },
    ],
    defaultTemplate:
      "Dear {{candidate_name}},\n\nThis is a reminder for your interview on {{interview_date}} at {{interview_time}}.",
  },
  {
    id: "deadline",
    title: "Application deadline reminder",
    description: "Notify candidates about approaching application deadlines",
    icon: Clock,
    isIncluded: false,
    variables: [
      {
        key: "{{candidate_name}}",
        label: "Candidate Name",
        example: "John Doe",
      },
      {
        key: "{{deadline_date}}",
        label: "Deadline Date",
        example: "January 15, 2024",
      },
      { key: "{{days_remaining}}", label: "Days Remaining", example: "5" },
    ],
    defaultTemplate:
      "Dear {{candidate_name}},\n\nThis is a reminder that the application deadline is {{deadline_date}} ({{days_remaining}} days remaining).",
  },
  {
    id: "assessment",
    title: "Candidate skill assessment",
    description: "Send automated skill assessments to qualified candidates",
    icon: Users,
    isIncluded: false,
    variables: [
      {
        key: "{{candidate_name}}",
        label: "Candidate Name",
        example: "John Doe",
      },
      {
        key: "{{assessment_link}}",
        label: "Assessment Link",
        example: "https://assessment.com/test",
      },
    ],
    defaultTemplate: "Dear {{candidate_name}},\n\nPlease complete your skill assessment at: {{assessment_link}}",
  },
  {
    id: "onboarding",
    title: "Onboarding Checklist",
    description: "Send automated onboarding checklists to hired candidates",
    icon: Users,
    isIncluded: false,
    variables: [
      {
        key: "{{candidate_name}}",
        label: "Candidate Name",
        example: "John Doe",
      },
      {
        key: "{{documents_list}}",
        label: "Documents List",
        example: "Passport, ID, Proof of Address",
      },
    ],
    defaultTemplate:
      "Dear {{candidate_name}},\n\nPlease complete the onboarding checklist by sending the following documents:\n\n{{documents_list}}",
  },
]

export default function AutomationSetupPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("id")

  const [template, setTemplate] = React.useState<Template | null>(null)
  const [isPreview, setIsPreview] = React.useState(false)
  const [messageTemplate, setMessageTemplate] = React.useState("")
  const [trigger, setTrigger] = React.useState("immediate")
  const [isActive, setIsActive] = React.useState(true)
  const [previewData, setPreviewData] = React.useState<Record<string, string>>({})
  const [validationError, setValidationError] = React.useState<string | null>(null)
  const { user } = useAuth()

  const [selectedAutomationTemplates, setSelectedAutomationTemplates] = useState([])
   const router = useRouter()
  const {
    data: automationsTemplatesData,
    isLoading,
    error,
  } = useApiGet<AutomationsResponse>("automations/automations-list", {}, ["automations-list"])

  useEffect(() => {
    if (automationsTemplatesData?.data) {
      const templates = [...automationsTemplatesData.data]

      // Map icons and variables safely
      const templatesWithProps = templates.map((template, index) => {
        const enrichedTemplate = { ...template }

        // Assign icons based on index
        if (index === 0) enrichedTemplate.icon = MessageSquare
        else if (index === 1) enrichedTemplate.icon = UserCheck
        else if (index === 2) enrichedTemplate.icon = Mail
        else enrichedTemplate.icon = MessageSquare // Default

        // Assign variables based on index
        if (index === 0) {
          enrichedTemplate.variables = [
            { key: "{{candidate_name}}", label: "Candidate Name", example: "John Doe" },
            { key: "{{job_title}}", label: "Job Title", example: "Senior Developer" },
            { key: "{{company_name}}", label: "Company Name", example: "Acme Inc" },
          ]
          enrichedTemplate.defaultTemplate =
            "Dear {{candidate_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}."
        } else if (index === 1) {
          enrichedTemplate.variables = [
            { key: "{{candidate_name}}", label: "Candidate Name", example: "John Doe" },
            { key: "{{job_title}}", label: "Job Title", example: "Senior Developer" },
            { key: "{{interview_date}}", label: "Interview Date", example: "Monday, Jan 1, 2024" },
          ]
          enrichedTemplate.defaultTemplate =
            "Dear {{candidate_name}},\n\nCongratulations! You've been shortlisted for the {{job_title}} position."
        } else if (index === 2) {
          enrichedTemplate.variables = [
            { key: "{{candidate_name}}", label: "Candidate Name", example: "John Doe" },
            { key: "{{job_title}}", label: "Job Title", example: "Senior Developer" },
          ]
          enrichedTemplate.defaultTemplate =
            "Dear {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position."
        }

        return enrichedTemplate
      })

      setSelectedAutomationTemplates(templatesWithProps)
    }
  }, [automationsTemplatesData])

  console.log("Selected Automation Templates: ", selectedAutomationTemplates)

  React.useEffect(() => {
    if (templateId) {
      const foundTemplate = selectedAutomationTemplates?.find((t) => t._id === templateId)
      if (foundTemplate) {
        setTemplate(foundTemplate)
        setMessageTemplate(foundTemplate?.defaultTemplate)
        const initialPreviewData: Record<string, string> = {}
        foundTemplate?.variables?.forEach((variable) => {
          initialPreviewData[variable?.key] = variable?.example
        })
        setPreviewData(initialPreviewData)
      }
    }
  }, [templateId, selectedAutomationTemplates])

  const handleInsertVariable = (variable: { key: string; label: string }) => {
    // Get the textarea element
    const textarea = document.querySelector("textarea")
    if (!textarea) return

    // Get cursor position
    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // Get text before and after cursor
    const textBefore = messageTemplate.substring(0, start)
    const textAfter = messageTemplate.substring(end)

    // Insert variable at cursor position
    const newText = textBefore + variable.key + textAfter
    setMessageTemplate(newText)

    // Clear any validation errors when user adds a variable
    setValidationError(null)

    // Set focus back to textarea and place cursor after inserted variable
    setTimeout(() => {
      textarea.focus()
      const newCursorPosition = start + variable.key.length
      textarea.setSelectionRange(newCursorPosition, newCursorPosition)
    }, 0)
  }

  const getPreviewContent = () => {
    let preview = messageTemplate
    Object.entries(previewData).forEach(([key, value]) => {
      preview = preview.replace(key, value)
    })
    return preview
  }

  // Check if the message template contains at least one variable
  const containsRequiredVariables = () => {
    if (!template?.variables || template.variables.length === 0) return true

    return template.variables.some(variable => messageTemplate.includes(variable.key))
  }

  const handleSave = async () => {
    try {
      // Validate that at least one variable is used
      if (!containsRequiredVariables()) {
        setValidationError("You must use at least one variable in your message template.")
        toast.error("Please include at least one variable in your message.")
        return
      }

      // Clear any previous validation errors
      setValidationError(null)

      console.log("employeeId: ", user?.id)
      console.log("automationId: ", template?._id)
      console.log("status: ", isActive ? "ACTIVE" : "INACTIVE")
      console.log("messageTemplate: ", messageTemplate)

      const payload = {
        employeeId: user?.id,
        automationId: template?._id,
        status: isActive ? "ACTIVE" : "INACTIVE",
        message: messageTemplate,
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee-automation/create-employee-automation`,
        payload,
      )

      console.log("Response: ", response)

      if (response?.data?.status === "SUCCESS") {
        toast.success(response?.data?.message || "Automation created successfully!")
        router.push("/employer/automations")
      } else {
        toast.error(response?.data?.message || "Error creating automation!")
      }
    } catch (error) {
      console.error("Error saving automation:", error)

      // Check if it's an axios error with response data
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error cases
        if (error.response.status === 409) {
          toast.error("This automation already exists for this employee. Please edit the existing one.")
        } else {
          toast.error(error.response.data?.message || "Failed to create automation. Please try again.")
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.")
      }
    }
  }

  if (!template) {
    return <div>No template found</div>
  }

  return (
    <div className="container mx-auto py-4 max-w-7xl">
      <div className="flex justify-start items-center mb-6">
        <Link href="/employer/automations">
          <p className="text-black hover:text-blue-800 flex items-center">
            <ArrowLeftCircle className="h-5 w-5 mr-2" />
          </p>
        </Link>
        <h1 className="text-2xl font-bold">Setup Automation</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </div>
              {template.isIncluded && <Badge variant="secondary">Included with Pro</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            {isPreview ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {template.variables.map((variable) => (
                    <div key={variable.key} className="space-y-2">
                      <Label>{variable.label}</Label>
                      <Input
                        value={previewData[variable.key] || ""}
                        onChange={(e) =>
                          setPreviewData((prev) => ({
                            ...prev,
                            [variable.key]: e.target.value,
                          }))
                        }
                        placeholder={variable.example}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="p-4 rounded-lg border bg-muted/50 whitespace-pre-wrap">{getPreviewContent()}</div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => setIsPreview(false)}>
                    Back to Edit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* <div className="space-y-2">
                  <Label>Trigger</Label>
                  <Select value={trigger} onValueChange={setTrigger}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select when to send" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediately</SelectItem>
                      <SelectItem value="1hour">After 1 hour</SelectItem>
                      <SelectItem value="1day">After 1 day</SelectItem>
                      <SelectItem value="custom">Custom delay</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Message Template</Label>
                    <Badge variant="outline" className="text-amber-600 border-amber-600">
                      Variables Required
                    </Badge>
                  </div>

                  {validationError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex flex-wrap gap-2 mb-2">
                    {template?.variables?.map((variable) => (
                      <Button
                        key={variable.key}
                        variant="outline"
                        size="sm"
                        onClick={() => handleInsertVariable(variable)}
                      >
                        {variable.label}
                      </Button>
                    ))}
                  </div>
                  <Textarea
                    value={messageTemplate}
                    onChange={(e) => {
                      setMessageTemplate(e.target.value)
                      // Clear validation error when user types
                      if (validationError) setValidationError(null)
                    }}
                    className="min-h-[200px] font-mono"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
                  <Label htmlFor="active">Activate this automation</Label>
                </div>

                <div className="flex justify-end space-x-4">
                  {/* <Button variant="outline" onClick={() => setIsPreview(true)}>
                    Preview
                  </Button> */}
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
