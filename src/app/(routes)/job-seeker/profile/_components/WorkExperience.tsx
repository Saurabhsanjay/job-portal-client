"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Pencil, Trash2, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface WorkExperience {
    id: number
    companyName: string
    jobTitle: string
    startDate: string
    endDate: string
    keyAchievements: string
}

export default function WorkExperience() {
    const [experiences, setExperiences] = useState<WorkExperience[]>([
        {
            id: 1,
            companyName: "Meta",
            jobTitle: "Software Engineer",
            startDate: "2020-01-01",
            endDate: "2022-01-01",
            keyAchievements:
                "Designed and developed multiple features for the Facebook news feed, including a new ranking algorithm that improved user engagement by 10%.",
        },
        {
            id: 2,
            companyName: "Google",
            jobTitle: "Software Engineer",
            startDate: "2018-01-01",
            endDate: "2020-01-01",
            keyAchievements:
                "Worked on the Google Maps team, focusing on improving the accuracy of location-based services. Contributed to a 20% increase in location accuracy.",
        },
        {
            id: 3,
            companyName: "Amazon",
            jobTitle: "Software Engineer",
            startDate: "2015-01-01",
            endDate: "2018-01-01",
            keyAchievements:
                "Developed multiple features for the Amazon Alexa virtual assistant, including a new skill that integrated with the Amazon Echo smart speaker.",
        },
    ])
    const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newExperience = {
            id: editingExperience?.id || Date.now(),
            companyName: formData.get("companyName") as string,
            jobTitle: formData.get("jobTitle") as string,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            keyAchievements: formData.get("keyAchievements") as string,
        }

        if (editingExperience) {
            setExperiences(experiences.map((exp) => (exp.id === editingExperience.id ? newExperience : exp)))
        } else {
            setExperiences([...experiences, newExperience])
        }

        setIsFormOpen(false)
        setEditingExperience(null)
    }

    const handleDelete = (id: number) => {
        setExperiences(experiences.filter((exp) => exp.id !== id))
    }

    const handleEdit = (experience: WorkExperience) => {
        setEditingExperience(experience)
        setIsFormOpen(true)
    }

    const onDragEnd = (result: any) => {
        if (!result.destination) return

        const items = Array.from(experiences)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setExperiences(items)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.getFullYear()
    }

    const ExperienceForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" defaultValue={editingExperience?.companyName} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" name="jobTitle" defaultValue={editingExperience?.jobTitle} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input type="date" id="startDate" name="startDate" defaultValue={editingExperience?.startDate} required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input type="date" id="endDate" name="endDate" defaultValue={editingExperience?.endDate} required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="keyAchievements">Key Achievements</Label>
                <Textarea id="keyAchievements" name="keyAchievements" defaultValue={editingExperience?.keyAchievements} required />
            </div>

            <div className="flex justify-end space-x-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setIsFormOpen(false)
                        setEditingExperience(null)
                    }}
                >
                    Cancel
                </Button>
                <Button type="submit">{editingExperience ? "Update" : "Add"} Experience</Button>
            </div>
        </form>
    )

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Professional Experience</h2>
                    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <PlusCircle className="h-4 w-4" />
                                Add Experience
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingExperience ? "Edit" : "Add"} Experience</DialogTitle>
                            </DialogHeader>
                            <ExperienceForm />
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gray-200" />

                    {/* Experience entries */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="experiences">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-8">
                                    {experiences.map((experience, index) => (
                                        <Draggable key={experience.id} draggableId={experience.id.toString()} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} className="relative flex gap-6 group">
                                                    {/* Drag handle */}
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className="absolute left-[-20px] top-1/3 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                                                    >
                                                        <GripVertical className="h-4 w-4 text-gray-400" />
                                                    </div>

                                                    {/* Timeline dot */}
                                                    <div className="flex-none">
                                                        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-semibold">
                                                            {experience.companyName[0]}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 pt-1">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h3 className="font-medium text-gray-900">{experience.jobTitle}</h3>
                                                                <p className="text-sm text-blue-500">{experience.companyName}</p>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                                                                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                                                                </span>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => handleEdit(experience)}
                                                                        className="text-gray-500 hover:text-gray-700"
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(experience.id)}
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mt-2 text-sm text-gray-500">{experience.keyAchievements}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
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
