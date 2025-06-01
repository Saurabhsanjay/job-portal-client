"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Eye } from "lucide-react"
import { JobPreviewDialog } from "../job-preview-dialog"
import Image from "next/image"

export function ReviewStep() {
  const { watch } = useFormContext()
  const formData = watch()
  const [showPreview, setShowPreview] = useState(false)

  const reviewSections = [
    {
      title: "Job details",
      items: [
        { label: "Job title", value: formData.jobTitle },
        { label: "Company location", value: formData.city },
        { label: "Number of openings", value: formData.numberOfOpenings || "1" },
        { label: "Country and language", value: `India • ${formData.language}` },
      ],
    },
    {
      title: "Application location",
      items: [
        { label: "Location", value: formData.location },
        { label: "Job type", value: formData.jobType?.join(", ") },
      ],
    },
    {
      title: "Schedule",
      items: [
        { label: "Pay", value: `₹${formData.minPay} - ₹${formData.maxPay} per ${formData.payType}` },
        { label: "Supplemental Pay", value: formData.supplementalPay?.join(", ") || "None" },
        { label: "Benefits", value: formData.benefits?.join(", ") || "None" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-green-50 rounded-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Review</h2>
          <p className="text-sm text-muted-foreground">
            Review your job posting before publishing. You can edit any section if needed.
          </p>
        </div>
        <div className="w-32 h-24 relative">
          <Image src="/placeholder.svg?height=96&width=128" alt="Review illustration" fill className="object-contain" />
        </div>
      </div>

      <div className="space-y-4">
        {reviewSections.map((section, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">{section.title}</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value || "Not specified"}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="text-center space-y-2">
              <h3 className="font-medium">Job post preview</h3>
              <p className="text-sm text-muted-foreground">See how your job posting will look to job seekers</p>
              <Button variant="outline" onClick={() => setShowPreview(true)} className="mt-4">
                <Eye className="w-4 h-4 mr-2" />
                Close preview
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>By clicking Confirm,</strong> you agree that this job will be posted and applications will be
            processed in accordance with our Terms, Cookies and Privacy Policy. You also agree that we may contact you
            via phone or SMS.
          </p>
        </div>
      </div>

      <JobPreviewDialog open={showPreview} onOpenChange={setShowPreview} jobData={formData} />
    </div>
  )
}
