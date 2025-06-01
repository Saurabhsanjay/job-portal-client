"use client"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"]

const scheduleOptions = [
  "Day shift",
  "Night shift",
  "Morning shift",
  "Evening shift",
  "Monday to Friday",
  "Weekends",
  "Holidays",
  "On call",
]

export function JobDetailsStep() {
  const { register, setValue, watch } = useFormContext()
  const jobType = watch("jobType") || []
  const schedule = watch("schedule") || []
  const hiringMultiple = watch("hiringMultiple")
  const urgentHiring = watch("urgentHiring")

  const handleJobTypeChange = (option: string, checked: boolean) => {
    const current = jobType || []
    if (checked) {
      setValue("jobType", [...current, option])
    } else {
      setValue(
        "jobType",
        current.filter((item: string) => item !== option),
      )
    }
  }

  const handleScheduleChange = (option: string, checked: boolean) => {
    const current = schedule || []
    if (checked) {
      setValue("schedule", [...current, option])
    } else {
      setValue(
        "schedule",
        current.filter((item: string) => item !== option),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-pink-50 rounded-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Add job details</h2>
          <p className="text-sm text-muted-foreground">Specify the type of role and working arrangements.</p>
        </div>
        <div className="w-32 h-24 relative">
          <Image
            src="/placeholder.svg?height=96&width=128"
            alt="Job details illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Job type *</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {jobTypeOptions.map((option) => (
              <Badge
                key={option}
                variant={jobType.includes(option) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleJobTypeChange(option, !jobType.includes(option))}
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Schedule</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {scheduleOptions.map((option) => (
              <Badge
                key={option}
                variant={schedule.includes(option) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleScheduleChange(option, !schedule.includes(option))}
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Do you want to hire multiple people for this job?</Label>
          <RadioGroup
            value={hiringMultiple ? "yes" : "no"}
            onValueChange={(value) => setValue("hiringMultiple", value === "yes")}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {hiringMultiple && (
          <div>
            <Label htmlFor="numberOfOpenings" className="text-sm font-medium">
              Number of people to hire for this job *
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Input id="numberOfOpenings" {...register("numberOfOpenings")} type="number" min="1" className="w-20" />
              <span className="text-sm text-muted-foreground">people</span>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="urgentHiring" className="text-sm font-medium">
            Urgent hiring for this job? *
          </Label>
          <Select onValueChange={(value) => setValue("urgentHiring", value === "yes")}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes, urgent hiring</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
