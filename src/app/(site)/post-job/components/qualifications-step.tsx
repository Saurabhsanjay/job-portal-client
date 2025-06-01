"use client"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import Image from "next/image"

const commonSkills = [
  "Communication",
  "Leadership",
  "Problem solving",
  "Time management",
  "Teamwork",
  "Customer service",
  "Sales",
  "Marketing",
  "Project management",
  "Data analysis",
  "Programming",
  "Design",
  "Writing",
  "Research",
]

export function QualificationsStep() {
  const { setValue, watch, register } = useFormContext()
  const qualifications = watch("qualifications") || []

  const addQualification = (skill?: string) => {
    const newQualification = {
      skill: skill || "",
      level: "preferred" as const,
      experience: "",
    }
    setValue("qualifications", [...qualifications, newQualification])
  }

  const removeQualification = (index: number) => {
    const updated = qualifications.filter((_: any, i: number) => i !== index)
    setValue("qualifications", updated)
  }

  const updateQualification = (index: number, field: string, value: any) => {
    const updated = [...qualifications]
    updated[index] = { ...updated[index], [field]: value }
    setValue("qualifications", updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Qualifications for your job</h2>
          <p className="text-sm text-muted-foreground">
            Add the skills and qualifications that are important for this role.
          </p>
        </div>
        <div className="w-32 h-24 relative">
          <Image
            src="/placeholder.svg?height=96&width=128"
            alt="Qualifications illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Based on your job description</strong>, we've identified qualifications commonly requested for your
            job. Review and select which ones are important for your role.
          </p>
        </Card>

        <div>
          <Label className="text-sm font-medium">Common skills for this role</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {commonSkills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => addQualification(skill)}
              >
                <Plus className="w-3 h-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Selected qualifications</Label>
          <div className="space-y-3 mt-2">
            {qualifications.map((qualification: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Enter skill or qualification"
                      value={qualification.skill}
                      onChange={(e) => updateQualification(index, "skill", e.target.value)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Select
                        value={qualification.level}
                        onValueChange={(value) => updateQualification(index, "level", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preferred">Preferred</SelectItem>
                          <SelectItem value="required">Required</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Years of experience"
                        value={qualification.experience}
                        onChange={(e) => updateQualification(index, "experience", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="button" variant="ghost" size="sm" onClick={() => removeQualification(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}

            <Button type="button" variant="outline" onClick={() => addQualification()} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add qualification
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="additionalRequirements" className="text-sm font-medium">
            What else are you looking for in a candidate?
          </Label>
          <Textarea
            id="additionalRequirements"
            {...register("additionalRequirements")}
            placeholder="Describe any additional requirements, soft skills, or preferences..."
            className="mt-2"
            rows={4}
          />
        </div>
      </div>
    </div>
  )
}
