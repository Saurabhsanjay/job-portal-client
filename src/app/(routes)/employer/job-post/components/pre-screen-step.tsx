"use client"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus } from "lucide-react"
import Image from "next/image"

export function PreScreenStep() {
  const { setValue, watch } = useFormContext()
  const screeningQuestions = watch("screeningQuestions") || []
  const applicationLanguage = watch("applicationLanguage")

  const addScreeningQuestion = () => {
    const newQuestion = {
      question: "",
      type: "text" as const,
      required: false,
    }
    setValue("screeningQuestions", [...screeningQuestions, newQuestion])
  }

  const removeScreeningQuestion = (index: number) => {
    const updated = screeningQuestions.filter((_: any, i: number) => i !== index)
    setValue("screeningQuestions", updated)
  }

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...screeningQuestions]
    updated[index] = { ...updated[index], [field]: value }
    setValue("screeningQuestions", updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-green-50 rounded-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Pre-screen applicants</h2>
          <p className="text-sm text-muted-foreground">Add questions to help filter candidates before they apply.</p>
        </div>
        <div className="w-32 h-24 relative">
          <Image
            src="/placeholder.svg?height=96&width=128"
            alt="Pre-screen illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              !
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-purple-900">How to filter? Make a good decision</h3>
              <p className="text-sm text-purple-700 mt-1">
                Use screening questions to filter candidates based on your requirements. This helps you focus on the
                most qualified applicants.
              </p>
            </div>
          </div>
        </Card>

        <div>
          <Label className="text-sm font-medium">Screening questions (Max 5)</Label>
          <p className="text-xs text-muted-foreground mb-3">Add questions that help you identify the best candidates</p>

          <div className="space-y-3">
            {screeningQuestions.map((question: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Enter your screening question"
                      value={question.question}
                      onChange={(e) => updateQuestion(index, "question", e.target.value)}
                    />

                    <div className="flex items-center gap-4">
                      <Select value={question.type} onValueChange={(value) => updateQuestion(index, "type", value)}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text answer</SelectItem>
                          <SelectItem value="yes_no">Yes/No</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`required-${index}`}
                          checked={question.required}
                          onCheckedChange={(checked) => updateQuestion(index, "required", checked)}
                        />
                        <Label htmlFor={`required-${index}`} className="text-sm">
                          Required
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button type="button" variant="ghost" size="sm" onClick={() => removeScreeningQuestion(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}

            {screeningQuestions.length < 5 && (
              <Button type="button" variant="outline" onClick={addScreeningQuestion} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add screening question
              </Button>
            )}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Application language</Label>
          <Select value={applicationLanguage} onValueChange={(value) => setValue("applicationLanguage", value)}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="Tamil">Tamil</SelectItem>
              <SelectItem value="Telugu">Telugu</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
