"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, DollarSign } from "lucide-react"
import type { JobFormData } from "./post-job-flow"

interface JobPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  jobData: JobFormData
}

export function JobPreviewDialog({ open, onOpenChange, jobData }: JobPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Job post preview</DialogTitle>
          <p className="text-sm text-muted-foreground">This is how your job posting will look to job seekers.</p>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{jobData.jobTitle || "Job Title"}</h1>
                  <p className="text-muted-foreground">Company Name</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {jobData.city || "Location"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {jobData.jobType?.join(", ") || "Job Type"}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />₹{jobData.minPay} - ₹{jobData.maxPay} per {jobData.payType}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">Apply now</Button>
                  <Button variant="outline">Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Job details</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-sm text-muted-foreground min-w-20">Pay:</span>
                  <span className="text-sm">
                    ₹{jobData.minPay} - ₹{jobData.maxPay} per {jobData.payType}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm text-muted-foreground min-w-20">Job type:</span>
                  <div className="flex gap-1">
                    {jobData.jobType?.map((type) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm text-muted-foreground min-w-20">Schedule:</span>
                  <div className="flex gap-1">
                    {jobData.schedule?.map((sched) => (
                      <Badge key={sched} variant="secondary">
                        {sched}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm">
                {jobData.city}, {jobData.area}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Benefits</h3>
              <div className="flex flex-wrap gap-1">
                {jobData.benefits?.map((benefit) => (
                  <Badge key={benefit} variant="outline">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Full job description</h3>
              <div className="text-sm whitespace-pre-wrap">
                {jobData.jobDescription || "Job description will appear here..."}
              </div>
            </div>

            {jobData.qualifications && jobData.qualifications.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Qualifications</h3>
                <ul className="space-y-1">
                  {jobData.qualifications.map((qual, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      {qual.skill} ({qual.level}){qual.experience && ` - ${qual.experience} years experience`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
