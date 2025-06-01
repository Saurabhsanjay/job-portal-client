"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Briefcase,
  Users,
  CheckCircle2,
  Building,
  GraduationCap,
  Star,
  X,
} from "lucide-react"
import type { JobFormData } from "./post-job-flow"

interface JobPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  jobData: JobFormData
}

export function JobPreviewDialog({ open, onOpenChange, jobData }: JobPreviewDialogProps) {
  // Format currency with commas
  const formatCurrency = (value: string) => {
    if (!value) return "0"
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-0">
        {/* Header with close button */}
        <div className="sticky top-0 z-10 bg-white p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Job Preview</h2>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Company header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              {jobData.jobTitle?.charAt(0) || "C"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{jobData.jobTitle || "Job Title"}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building className="w-4 h-4" />
                <span>Your Company Name</span>
                {jobData.urgentHiring && (
                  <Badge className="bg-red-500 hover:bg-red-600 text-white ml-2">Urgent Hiring</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Hero section with key details */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-purple-500" /> Location
                </span>
                <span className="font-medium">
                  {jobData.city || "City"}
                  {jobData.area ? `, ${jobData.area}` : ""}
                </span>
                <span className="text-sm mt-1">{jobData.location || "On-site"}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1 text-green-500" /> Compensation
                </span>
                <span className="font-medium">
                  ₹{formatCurrency(jobData.minPay)} - ₹{formatCurrency(jobData.maxPay)}
                </span>
                <span className="text-sm mt-1">per {jobData.payType}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1 flex items-center">
                  <Briefcase className="w-4 h-4 mr-1 text-blue-500" /> Employment Type
                </span>
                <span className="font-medium">{jobData.jobType?.join(", ") || "Full-time"}</span>
                <span className="text-sm mt-1">
                  {jobData.numberOfOpenings || "1"}{" "}
                  {Number.parseInt(jobData.numberOfOpenings || "1") > 1 ? "positions" : "position"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">Apply Now</Button>
              <Button variant="outline" className="border-purple-200 text-purple-700">
                Save Job
              </Button>
            </div>
          </div>

          {/* Job description */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-amber-500" />
                About This Role
              </h2>
              <div className="prose prose-slate max-w-none">
                {jobData.jobDescription ? (
                  <div className="whitespace-pre-wrap">{jobData.jobDescription}</div>
                ) : (
                  <p className="text-muted-foreground italic">Job description will appear here...</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Schedule */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Schedule
              </h2>
              <div className="flex flex-wrap gap-2">
                {jobData.schedule && jobData.schedule.length > 0 ? (
                  jobData.schedule.map((sched) => (
                    <Badge
                      key={sched}
                      variant="secondary"
                      className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {sched}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground italic">No schedule specified</span>
                )}
              </div>
            </div>

            <Separator />

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Benefits & Perks
              </h2>
              {jobData.benefits && jobData.benefits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {jobData.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground italic">No benefits specified</span>
              )}

              {jobData.supplementalPay && jobData.supplementalPay.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Supplemental Pay</h3>
                  <div className="flex flex-wrap gap-2">
                    {jobData.supplementalPay.map((pay) => (
                      <Badge key={pay} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {pay}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Qualifications */}
            {jobData.qualifications && jobData.qualifications.length > 0 && (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-purple-500" />
                    Qualifications
                  </h2>
                  <div className="space-y-3">
                    {jobData.qualifications.map((qual, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${qual.level === "required" ? "bg-purple-600" : "bg-purple-400"}`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{qual.skill}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Badge
                              variant={qual.level === "required" ? "default" : "outline"}
                              className={
                                qual.level === "required" ? "bg-purple-100 text-purple-800 border-purple-200" : ""
                              }
                            >
                              {qual.level === "required" ? "Required" : "Preferred"}
                            </Badge>
                            {qual.experience && <span>{qual.experience} years experience</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Additional information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                  Job Posted
                </h3>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-slate-500" />
                  Hiring Team
                </h3>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Job ID: JOB-{Math.floor(Math.random() * 10000)}</div>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
