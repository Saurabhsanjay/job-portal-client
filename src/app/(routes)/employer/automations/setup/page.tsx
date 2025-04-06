"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  UserCheck,
  Mail,
  Calendar,
  Clock,
  Users,
  ArrowLeftCircle,
} from "lucide-react";
import Link from "next/link";
import { useApiGet } from "@/hooks/use-api-query";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/(providers)/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

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

interface Template {
  id: string;
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  isIncluded: boolean;
  defaultTemplate: string;
  variables: Array<{
    key: string;
    label: string;
    example: string;
  }>;
}

const templates: Template[] = [
  {
    id: "new-candidate",
    title: "Message new candidates",
    description:
      "Automatically send a message when someone applies to your job",
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
    description:
      "Send an automatic message when you add someone to your shortlist",
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
    description:
      "Send a no-reply email when a candidate's status changes to rejected",
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
    defaultTemplate:
      "Dear {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position.",
  },
  {
    id: "interview",
    title: "Schedule interview reminders",
    description:
      "Send reminders to candidates and interviewers before scheduled interviews",
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
    defaultTemplate:
      "Dear {{candidate_name}},\n\nPlease complete your skill assessment at: {{assessment_link}}",
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
];

export default function AutomationSetupPage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("id");

  const [template, setTemplate] = React.useState<Template | null>(null);
  const [isPreview, setIsPreview] = React.useState(false);
  const [messageTemplate, setMessageTemplate] = React.useState("");
  const [trigger, setTrigger] = React.useState("immediate");
  const [isActive, setIsActive] = React.useState(true);
  const [previewData, setPreviewData] = React.useState<Record<string, string>>(
    {}
  );
  const { user } = useAuth();

  const [selectedAutomationTemplates, setSelectedAutomationTemplates] =useState([]);


  const {
    data: automationsTemplatesData,
    isLoading,
    error,
  } = useApiGet<AutomationsResponse>("automations/automations-list", {}, [
    "automations-list",
  ]);

  useEffect(() => {
    if (automationsTemplatesData?.data) {
      const templates = [...automationsTemplatesData.data];
      templates[0].icon = MessageSquare;
      templates[1].icon = UserCheck;
      templates[2].icon = Mail;
      templates[0].variables = [
        {
          key: "{{candidate_name}}",
          label: "Candidate Name",
          example: "John Doe",
        },
        { key: "{{job_title}}", label: "Job Title", example: "Senior Developer" },
        { key: "{{company_name}}", label: "Company Name", example: "Acme Inc" },
      ];
      templates[1].variables = [
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
      ];
      templates[2].variables = [
        {
          key: "{{candidate_name}}",
          label: "Candidate Name",
          example: "John Doe",
        },
        { key: "{{job_title}}", label: "Job Title", example: "Senior Developer" },
      ];
      templates[0].defaultTemplate = "Dear {{candidate_name}},\n\nThank you for applying to the {{job_title}} position at {{company_name}}.";
      templates[1].defaultTemplate = "Dear {{candidate_name}},\n\nCongratulations! You've been shortlisted for the {{job_title}} position.";
      templates[2].defaultTemplate = "Dear {{candidate_name}},\n\nThank you for your interest in the {{job_title}} position.";
      setSelectedAutomationTemplates(templates);
    }
  }, [automationsTemplatesData]);

  console.log("Selected Automation Templates: ", selectedAutomationTemplates);

  React.useEffect(() => {
    if (templateId) {
      const foundTemplate = selectedAutomationTemplates?.find(
        (t) => t._id === templateId
      );
      if (foundTemplate) {
        setTemplate(foundTemplate);
        setMessageTemplate(foundTemplate?.defaultTemplate);
        const initialPreviewData: Record<string, string> = {};
        foundTemplate?.variables?.forEach((variable) => {
          initialPreviewData[variable?.key] = variable?.example;
        });
        setPreviewData(initialPreviewData);
      }
    }
  }, [templateId, selectedAutomationTemplates]);

  const handleInsertVariable = (variable: { key: string; label: string }) => {
    setMessageTemplate((prev) => prev + " " + variable.key);
  };

  const getPreviewContent = () => {
    let preview = messageTemplate;
    Object.entries(previewData).forEach(([key, value]) => {
      preview = preview.replace(key, value);
    });
    return preview;
  };

  const handleSave = async() => {
    console.log("employeeId: ", user?.id);
    console.log("automationId: ", template?._id);
    console.log("status: ", isActive ? "ACTIVE" : "INACTIVE");
    console.log("messageTemplate: ", messageTemplate);
    const payload={
      employeeId: user?.id,
      automationId: template?._id,
      status: isActive ? "ACTIVE" : "INACTIVE",
      message: messageTemplate,
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee-automation/create-employee-automation`, payload
    );
    console.log("Response: ", response);
    if(response?.data?.status==="SUCCESS"){
      toast.success(response?.data?.message||"Automation created successfully!");
    }else{
      toast.error("Error creating automation!");
    }
    // Here you would typically save to your backend
  };

  if (!template) {
    return <div>No template found</div>;
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
              {template.isIncluded && (
                <Badge variant="secondary">Included with Pro</Badge>
              )}
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
                  <div className="p-4 rounded-lg border bg-muted/50 whitespace-pre-wrap">
                    {getPreviewContent()}
                  </div>
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
                  <Label>Message Template</Label>
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
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
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
  );
}
