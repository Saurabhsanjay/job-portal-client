"use client"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function JobBasicsStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const language = watch("language")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Add job basics</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>This job post will be in</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {language} • India
            </Badge>
          </div>
        </div>
        <div className="w-32 h-24 relative">
          <Image
            src="/placeholder.svg?height=96&width=128"
            alt="Job posting illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="jobTitle" className="text-sm font-medium">
            Job title *
          </Label>
          <Input
            id="jobTitle"
            {...register("jobTitle", { required: "Job title is required" })}
            placeholder="e.g. Software Engineer"
            className="mt-1"
          />
          {errors.jobTitle && <p className="text-sm text-red-600 mt-1">{errors.jobTitle.message as string}</p>}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Job posting location</h3>

          <div>
            <Label htmlFor="location" className="text-sm font-medium">
              Which option best describes this job's location? *
            </Label>
            <Select onValueChange={(value) => setValue("location", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="On-site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on-site">On-site</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="city" className="text-sm font-medium">
              City *
            </Label>
            <Select onValueChange={(value) => setValue("city", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="area" className="text-sm font-medium">
                Area
              </Label>
              <Select onValueChange={(value) => setValue("area", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="andheri">Andheri</SelectItem>
                  <SelectItem value="bandra">Bandra</SelectItem>
                  <SelectItem value="powai">Powai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="pincode" className="text-sm font-medium">
                Pincode
              </Label>
              <Input id="pincode" {...register("pincode")} placeholder="400001" className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="streetAddress" className="text-sm font-medium">
              Street address
            </Label>
            <Input
              id="streetAddress"
              {...register("streetAddress")}
              placeholder="Enter street address"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
