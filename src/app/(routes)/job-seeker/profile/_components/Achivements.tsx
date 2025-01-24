/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface AchievementOrCertification {
    id: number
    title: string
    organization: string
    date: string
    description: string
}

export default function AchievementsAndCertifications() {
    const [items, setItems] = useState<AchievementOrCertification[]>([
        {
            id: 1,
            title: "Certified Java Developer",
            organization: "Oracle",
            date: "2021-05-15",
            description: "Achieved certification in Java programming."
        },
        {
            id: 2,
            title: "AWS Certified Solutions Architect",
            organization: "Amazon",
            date: "2022-08-10",
            description: "Certification in architecting AWS solutions."
        }
    ])
    const [editingItem, setEditingItem] = useState<AchievementOrCertification | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newItem = {
            id: editingItem?.id || Date.now(),
            title: formData.get("title") as string,
            organization: formData.get("organization") as string,
            date: formData.get("date") as string,
            description: formData.get("description") as string,
        }

        if (editingItem) {
            setItems(items.map((item) => (item.id === editingItem.id ? newItem : item)))
        } else {
            setItems([...items, newItem])
        }

        setIsFormOpen(false)
        setEditingItem(null)
    }

    const handleDelete = (id: number) => {
        setItems(items.filter((item) => item.id !== id))
    }

    const handleEdit = (item: AchievementOrCertification) => {
        setEditingItem(item)
        setIsFormOpen(true)
    }

    const onDragEnd = (result: any) => {
        if (!result.destination) return

        const reorderedItems = Array.from(items)
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1)
        reorderedItems.splice(result.destination.index, 0, reorderedItem)

        setItems(reorderedItems)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    const ItemForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingItem?.title} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" name="organization" defaultValue={editingItem?.organization} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" name="date" defaultValue={editingItem?.date} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingItem?.description} required />
            </div>

            <div className="flex justify-end space-x-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setIsFormOpen(false)
                        setEditingItem(null)
                    }}
                >
                    Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update" : "Add"} Item</Button>
            </div>
        </form>
    )

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Achievements & Certifications</h2>
                    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <PlusCircle className="h-4 w-4" />
                                Add Item
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingItem ? "Edit" : "Add"} Item</DialogTitle>
                            </DialogHeader>
                            <ItemForm />
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gray-200" />

                    {/* Items list */}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="items">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-8">
                                    {items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} className="relative flex gap-6 group">
                                                    {/* Drag handle */}
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className="absolute left-[-30px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move"
                                                    >
                                                        <GripVertical className="h-4 w-4 text-gray-400" />
                                                    </div>

                                                    {/* Timeline dot */}
                                                    <div className="flex-none">
                                                        <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-semibold">
                                                            {item.title[0]}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 pt-1">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h3 className="font-medium text-gray-900">{item.title}</h3>
                                                                <p className="text-sm text-blue-500">{item.organization}</p>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                                                                    {formatDate(item.date)}
                                                                </span>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => handleEdit(item)}
                                                                        className="text-gray-500 hover:text-gray-700"
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(item.id)}
                                                                        className="text-red-500 hover:text-red-700"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mt-2 text-sm text-gray-500">{item.description}</p>
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
