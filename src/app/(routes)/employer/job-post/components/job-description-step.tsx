"use client"
import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export function JobDescriptionStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-orange-50 rounded-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Describe the job</h2>
          <p className="text-sm text-muted-foreground">
            Provide a detailed description of the role, responsibilities, and requirements.
          </p>
        </div>
        <div className="w-32 h-24 relative">
          <Image
            src="/placeholder.svg?height=96&width=128"
            alt="Job description illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="jobDescription" className="text-sm font-medium">
            Job description *
          </Label>
          <Card className="mt-2 p-3">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b">
              <button type="button" className="p-1 hover:bg-gray-100 rounded">
                <strong>B</strong>
              </button>
              <button type="button" className="p-1 hover:bg-gray-100 rounded">
                <em>I</em>
              </button>
              <button type="button" className="p-1 hover:bg-gray-100 rounded">
                <span className="underline">U</span>
              </button>
              <div className="w-px h-4 bg-gray-300 mx-1" />
              <button type="button" className="p-1 hover:bg-gray-100 rounded text-sm">
                • List
              </button>
            </div>
            <Textarea
              id="jobDescription"
              {...register("jobDescription", { required: "Job description is required" })}
              placeholder="Describe the responsibilities, requirements, and what makes this role exciting..."
              className="min-h-[200px] border-0 resize-none focus-visible:ring-0 p-0"
            />
          </Card>
          {errors.jobDescription && (
            <p className="text-sm text-red-600 mt-1">{errors.jobDescription.message as string}</p>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Add details like:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Key responsibilities and daily tasks</li>
            <li>Required skills and qualifications</li>
            <li>Company culture and benefits</li>
            <li>Growth opportunities</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
