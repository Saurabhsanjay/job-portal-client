/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Pencil, Trash2, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Education {
  _id: number
  highestQualification: string
  specialization: string
  universityInstitute: string
  yearOfPassing: string
  marksCGPA: string
  startDate: string
  endDate: string
  description: string
}

export default function Education({
  educations,
  setEducations,
}: {
  educations: Education[]
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>
}) {
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const qualificationOptions = [
    { value: "10TH", label: "10th" },
    { value: "12TH", label: "12th" },
    { value: "DIPLOMA", label: "Diploma" },
    { value: "BACHELOR", label: "Bachelor's Degree" },
    { value: "MASTER", label: "Master's Degree" },
    { value: "PHD", label: "PhD" },
    { value: "CERTIFICATE", label: "Certificate Course" },
    { value: "OTHER", label: "Other" },
  ]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newEducation = {
      _id: editingEducation?._id || Date.now(),
      highestQualification: formData.get("highestQualification") as string,
      specialization: formData.get("specialization") as string,
      universityInstitute: formData.get("universityInstitute") as string,
      yearOfPassing: formData.get("yearOfPassing") as string,
      marksCGPA: formData.get("marksCGPA") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      description: formData.get("description") as string,
    }

    if (editingEducation) {
      setEducations(educations.map((edu) => (edu._id === editingEducation._id ? newEducation : edu)))
    } else {
      setEducations([...educations, newEducation])
    }

    setIsFormOpen(false)
    setEditingEducation(null)
  }

  const handleDelete = (id: number) => {
    setEducations(educations.filter((edu) => edu._id !== id))
  }

  const handleEdit = (education: Education) => {
    setEditingEducation(education)
    setIsFormOpen(true)
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(educations)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setEducations(items)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const EducationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="space-y-2">
        <Label htmlFor="highestQualification">Highest Qualification *</Label>
        <Select name="highestQualification" defaultValue={editingEducation?.highestQualification || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Select Highest Qualification" />
          </SelectTrigger>
          <SelectContent>
            {qualificationOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialization">Specialization *</Label>
        <Input
          id="specialization"
          name="specialization"
          placeholder="Enter your specialization"
          defaultValue={editingEducation?.specialization}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="universityInstitute">University/Institute *</Label>
        <Input
          id="universityInstitute"
          name="universityInstitute"
          placeholder="Enter university or institute name"
          defaultValue={editingEducation?.universityInstitute}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearOfPassing">Year of Passing *</Label>
        <Input
          type="number"
          id="yearOfPassing"
          name="yearOfPassing"
          placeholder="Enter year of passing"
          min="1950"
          max="2030"
          defaultValue={editingEducation?.yearOfPassing}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="marksCGPA">Marks/CGPA (%) *</Label>
        <Input
          type="number"
          id="marksCGPA"
          name="marksCGPA"
          placeholder="Enter marks or CGPA percentage"
          step="0.01"
          min="0"
          max="100"
          defaultValue={editingEducation?.marksCGPA}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={
              editingEducation?.startDate ? new Date(editingEducation.startDate).toISOString().split("T")[0] : ""
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={
              editingEducation?.endDate ? new Date(editingEducation.endDate).toISOString().split("T")[0] : ""
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Additional details about your education"
          defaultValue={editingEducation?.description}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsFormOpen(false)
            setEditingEducation(null)
          }}
        >
          Cancel
        </Button>
        <Button type="submit">{editingEducation ? "Update" : "Add"} Education</Button>
      </div>
    </form>
  )

  return (
    <div className="space-y-6 mt-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Education Details</h2>

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Education
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingEducation ? "Edit" : "Add"} Education</DialogTitle>
              </DialogHeader>
              <EducationForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gray-200" />

          {/* Education entries */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="educations">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-8">
                  {educations.length > 0 ? (
                    educations.map((education, index) => (
                      <Draggable key={index} draggableId={education?._id?.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="relative flex gap-6 group"
                          >
                            {/* Drag handle */}
                            <div
                              {...provided.dragHandleProps}
                              className="absolute left-[-20px] top-1/3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                            >
                              <GripVertical className="h-4 w-4 text-gray-400" />
                            </div>

                            {/* Timeline dot */}
                            <div className="flex-none">
                              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                                {education.universityInstitute[0] || education.highestQualification[0]}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    {qualificationOptions.find((opt) => opt.value === education.highestQualification)
                                      ?.label || education.highestQualification}
                                  </h3>
                                  <p className="text-sm text-blue-500">{education.specialization}</p>
                                  <p className="text-sm text-red-500">{education.universityInstitute}</p>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                      {education.yearOfPassing}
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded-full">
                                      {education.marksCGPA}%
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  {education.startDate && education.endDate && (
                                    <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                                      {formatDate(education.startDate)} - {formatDate(education.endDate)}
                                    </span>
                                  )}
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEdit(education)}
                                      className="text-gray-500 hover:text-gray-700"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(education._id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {education.description && (
                                <p className="mt-2 text-sm text-gray-500">{education.description}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No Education to show</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Card>
    </div>
  )
}
