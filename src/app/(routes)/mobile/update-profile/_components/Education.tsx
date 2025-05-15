/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Pencil, Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Education {
  _id: number;
  //   degree: string;
  institution: string;
  qualification: string;
  startDate: string;
  endDate: string;
  description: string;
  grade?: string;
}

export default function Education({
  educations,
  setEducations,
}: {
  educations: Education[];
  setEducations: React.Dispatch<React.SetStateAction<Education[]>>;
}) {
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  console.log("editingEducation------->", editingEducation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEducation = {
      _id: editingEducation?._id || Date.now(),
      //   degree: formData.get("degree") as string,
      institution: formData.get("institution") as string,
      qualification: formData.get("qualification") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      description: formData.get("description") as string,
      grade: formData.get("grade") as string,
    };

    if (editingEducation) {
      setEducations(
        educations.map((edu) =>
          edu._id === editingEducation._id ? newEducation : edu
        )
      );
    } else {
      setEducations([...educations, newEducation]);
    }

    setIsFormOpen(false);
    setEditingEducation(null);
  };

  const handleDelete = (id: number) => {
    setEducations(educations.filter((edu) => edu._id !== id));
  };

  const handleEdit = (education: Education) => {
    setEditingEducation(education);
    setIsFormOpen(true);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(educations);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEducations(items);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const EducationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="degree">Qualification</Label>
        <Input
          id="qualification"
          name="qualification"
          defaultValue={editingEducation?.qualification}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="grade">Grade</Label>
        <Input
          type="number"
          id="grade"
          name="grade"
          defaultValue={editingEducation?.grade}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="institution">Institution</Label>
        <Input
          id="institution"
          name="institution"
          defaultValue={editingEducation?.institution}
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
              editingEducation?.startDate
                ? new Date(editingEducation.startDate)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={
              editingEducation?.endDate
                ? new Date(editingEducation.endDate).toISOString().split("T")[0]
                : ""
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={editingEducation?.description}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setIsFormOpen(false);
            setEditingEducation(null);
          }}
        >
          Cancel
        </Button>
        <Button type="submit">
          {editingEducation ? "Update" : "Add"} Education
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Education
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingEducation ? "Edit" : "Add"} Education
                </DialogTitle>
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
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-8"
                >
                  {educations.length > 0 ? (
                    educations.map((education, index) => (
                      <Draggable
                        key={index}
                        draggableId={education?._id?.toString()}
                        index={index}
                      >
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
                                {education.institution[0]}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    {education.qualification}
                                  </h3>
                                  <p className="text-sm text-red-500">
                                    {education.institution}
                                  </p>
                                  <p className="font-normal text-gray-800">
                                    Grade :{" "}
                                    <span className="font-medium">
                                      {education?.grade}
                                    </span>
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="px-3 py-1 text-sm bg-gray-100 rounded-full">
                                    {formatDate(education.startDate)} -{" "}
                                    {formatDate(education.endDate)}
                                  </span>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleEdit(education)}
                                      className="text-gray-500 hover:text-gray-700"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDelete(education._id)
                                      }
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-gray-500">
                                {education.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No Education to show
                    </p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Card>
    </div>
  );
}
