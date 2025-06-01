"use client"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function PreferencesStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const emailNotifications = watch("emailNotifications")
  const applicationDeadline = watch("applicationDeadline")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-purple-50 rounded-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Set preferences</h2>
          <p className="text-sm text-muted-foreground">
            Configure how you want to receive applications and communicate with candidates.
          </p>
        </div>
        <div className="w-32 h-24 relative">
          <Image
            src="/placeholder.svg?height=96&width=128"
            alt="Preferences illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Communication preferences</h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="communicationEmail" className="text-sm font-medium">
                Send daily updates to *
              </Label>
              <Input
                id="communicationEmail"
                {...register("communicationEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="your.email@company.com"
                className="mt-1"
              />
              {errors.communicationEmail && (
                <p className="text-sm text-red-600 mt-1">{errors.communicationEmail.message as string}</p>
              )}
              <Button type="button" variant="link" className="p-0 h-auto text-sm">
                + Add email
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="emailNotifications"
                checked={emailNotifications}
                onCheckedChange={(checked) => setValue("emailNotifications", checked)}
              />
              <Label htmlFor="emailNotifications" className="text-sm">
                Also send an individual email each time someone applies
              </Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Application preferences</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="applicationDeadline"
                checked={applicationDeadline}
                onCheckedChange={(checked) => setValue("applicationDeadline", checked)}
              />
              <Label htmlFor="applicationDeadline" className="text-sm">
                Receive applications until
              </Label>
            </div>

            {applicationDeadline && (
              <div className="ml-6">
                <Label htmlFor="deadlineDate" className="text-sm font-medium">
                  Application deadline
                </Label>
                <Input id="deadlineDate" {...register("deadlineDate")} type="date" className="mt-1 w-auto" />
              </div>
            )}

            <div>
              <Label className="text-sm font-medium">Is there an application deadline?</Label>
              <RadioGroup
                value={applicationDeadline ? "yes" : "no"}
                onValueChange={(value) => setValue("applicationDeadline", value === "yes")}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="deadline-yes" />
                  <Label htmlFor="deadline-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="deadline-no" />
                  <Label htmlFor="deadline-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
