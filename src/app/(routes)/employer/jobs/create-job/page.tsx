"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Plus, X, ChevronsUpDown, ArrowLeftCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const employmentTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERNSHIP", "VOLUNTEER"] as const

const experienceLevels = ["ENTRY_LEVEL", "MID_LEVEL", "SENIOR_LEVEL", "DIRECTOR", "EXECUTIVE"] as const

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "INR"] as const

const jobPriorities = ["LOW", "NORMAL", "HIGH", "URGENT"] as const

const jobCategories = [
    "Software Development",
    "Data Science",
    "Design",
    "Marketing",
    "Sales",
    "Customer Service",
    "Finance",
    "Human Resources",
    "Engineering",
    "Product Management",
    "Operations",
]

const jobFormSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    description: z.string().min(50, "Description must be at least 50 characters"),
    company: z.object({
        name: z.string().min(1, "Company name is required"),
        logoUrl: z.string().url().optional(),
        website: z.string().url().optional(),
    }),
    category: z
        .string()
        .min(1, "Category is required")
        .refine((value) => jobCategories.includes(value) || value.length > 0, {
            message: "Please select a category or enter a custom one",
        }),
    location: z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().min(1, "Country is required"),
        zipCode: z.string().optional(),
        streetAddress: z.string().optional(),
        coordinates: z
            .object({
                latitude: z.number().optional(),
                longitude: z.number().optional(),
            })
            .optional(),
        remoteRestriction: z.string().optional(),
    }),
    employmentType: z.enum(employmentTypes),
    industry: z.string().min(1, "Industry is required"),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    experience: z.object({
        level: z.enum(experienceLevels),
        years: z.object({
            min: z.number().min(0),
            max: z.number().max(50),
        }),
    }),
    education: z.array(z.string()),
    languages: z.array(z.string()),
    salary: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
        currency: z.enum(currencies),
    }),
    numberOfOpenings: z.number().min(1),
    validTill: z.date(),
    remote: z.boolean(),
    benefits: z.array(z.string()),
    applicationLink: z.string().url("Please enter a valid URL"),
    priority: z.enum(jobPriorities),
    tags: z.array(z.string()),
})

type JobFormValues = z.infer<typeof jobFormSchema>

export default function JobPostingForm() {
    const [skills, setSkills] = React.useState<string[]>([])
    const [benefits, setBenefits] = React.useState<string[]>([])
    const [languages, setLanguages] = React.useState<string[]>([])
    const [education, setEducation] = React.useState<string[]>([])
    const [tags, setTags] = React.useState<string[]>([])
    const [newItem, setNewItem] = React.useState("")

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobFormSchema),
        defaultValues: {
            remote: false,
            numberOfOpenings: 1,
            salary: {
                currency: "USD",
            },
            priority: "NORMAL",
        },
    })

    const addItem = (type: "skills" | "benefits" | "languages" | "education" | "tags", item: string) => {
        if (!item.trim()) return
        switch (type) {
            case "skills":
                setSkills((prev) => [...prev, item])
                break
            case "benefits":
                setBenefits((prev) => [...prev, item])
                break
            case "languages":
                setLanguages((prev) => [...prev, item])
                break
            case "education":
                setEducation((prev) => [...prev, item])
                break
            case "tags":
                setTags((prev) => [...prev, item])
                break
        }
        setNewItem("")
    }

    const removeItem = (type: "skills" | "benefits" | "languages" | "education" | "tags", item: string) => {
        switch (type) {
            case "skills":
                setSkills((prev) => prev.filter((i) => i !== item))
                break
            case "benefits":
                setBenefits((prev) => prev.filter((i) => i !== item))
                break
            case "languages":
                setLanguages((prev) => prev.filter((i) => i !== item))
                break
            case "education":
                setEducation((prev) => prev.filter((i) => i !== item))
                break
            case "tags":
                setTags((prev) => prev.filter((i) => i !== item))
                break
        }
    }

    function onSubmit(data: JobFormValues) {
        console.log(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-start items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => {}}>
                    <ArrowLeftCircle className="h-8 w-8" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Create Job</h1>
                    <p className="text-muted-foreground mt-1">Enter the details of the job you want to post</p>
                </div>
            </div>
            {/* Basic Information */}
            <Card className="shadow-sm border-none">
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Provide the basic details about the job posting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input id="title" placeholder="e.g. Senior Software Engineer" {...form.register("title")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.watch("category") || "Select category"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                {/* <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search category..." />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {jobCategories.map((category) => (
                                                    <CommandItem
                                                        key={category}
                                                        onSelect={() => {
                                                            form.setValue("category", category)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                form.watch("category") === category ? "opacity-100" : "opacity-0",
                                                            )}
                                                        />
                                                        {category}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent> */}
                            </Popover>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe the role and responsibilities"
                            className="min-h-[150px]"
                            {...form.register("description")}
                        />
                    </div>
                </CardContent>
            </Card>



            {/* Location Information */}
            <Card className="shadow-sm border-none">
                <CardHeader>
                    <CardTitle>Location Details</CardTitle>
                    <CardDescription>Specify the job location and remote work options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="remote" {...form.register("remote")} />
                        <Label htmlFor="remote">This is a remote position</Label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" placeholder="Enter country" {...form.register("location.country")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input id="state" placeholder="Enter state" {...form.register("location.state")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="Enter city" {...form.register("location.city")} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Job Requirements */}
            <Card className="shadow-sm border-none">
                <CardHeader>
                    <CardTitle>Job Requirements</CardTitle>
                    <CardDescription>Define the requirements and qualifications for the position</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="employmentType">Employment Type</Label>
                            <Select
                                onValueChange={(value) => form.setValue("employmentType", value as JobFormValues["employmentType"])}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select employment type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {employmentTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type.replace("_", " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experienceLevel">Experience Level</Label>
                            <Select
                                onValueChange={(value) =>
                                    form.setValue("experience.level", value as JobFormValues["experience"]["level"])
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {experienceLevels.map((level) => (
                                        <SelectItem key={level} value={level}>
                                            {level.replace("_", " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Required Skills</Label>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                                    {skill}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                        onClick={() => removeItem("skills", skill)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a skill"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addItem("skills", newItem)
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => addItem("skills", newItem)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="minExperience">Minimum Experience (years)</Label>
                            <Input
                                id="minExperience"
                                type="number"
                                min="0"
                                {...form.register("experience.years.min", { valueAsNumber: true })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maxExperience">Maximum Experience (years)</Label>
                            <Input
                                id="maxExperience"
                                type="number"
                                max="50"
                                {...form.register("experience.years.max", { valueAsNumber: true })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Education</Label>
                        <div className="flex flex-wrap gap-2">
                            {education.map((edu) => (
                                <Badge key={edu} variant="secondary" className="flex items-center gap-1">
                                    {edu}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                        onClick={() => removeItem("education", edu)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add education requirement"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addItem("education", newItem)
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => addItem("education", newItem)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Languages</Label>
                        <div className="flex flex-wrap gap-2">
                            {languages.map((lang) => (
                                <Badge key={lang} variant="secondary" className="flex items-center gap-1">
                                    {lang}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                        onClick={() => removeItem("languages", lang)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add language requirement"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addItem("languages", newItem)
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => addItem("languages", newItem)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Compensation & Benefits */}
            <Card className="shadow-sm border-none">
                <CardHeader>
                    <CardTitle>Compensation & Benefits</CardTitle>
                    <CardDescription>Specify the salary range and additional benefits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="minSalary">Minimum Salary</Label>
                            <Input id="minSalary" type="number" {...form.register("salary.min", { valueAsNumber: true })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maxSalary">Maximum Salary</Label>
                            <Input id="maxSalary" type="number" {...form.register("salary.max", { valueAsNumber: true })} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select
                                onValueChange={(value) =>
                                    form.setValue("salary.currency", value as JobFormValues["salary"]["currency"])
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency} value={currency}>
                                            {currency}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Benefits</Label>
                        <div className="flex flex-wrap gap-2">
                            {benefits.map((benefit) => (
                                <Badge key={benefit} variant="secondary" className="flex items-center gap-1">
                                    {benefit}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                        onClick={() => removeItem("benefits", benefit)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a benefit"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addItem("benefits", newItem)
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => addItem("benefits", newItem)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Additional Details */}
            <Card className="shadow-sm border-none">
                <CardHeader>
                    <CardTitle>Additional Details</CardTitle>
                    <CardDescription>Provide any additional information about the position</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="numberOfOpenings">Number of Openings</Label>
                            <Input
                                id="numberOfOpenings"
                                type="number"
                                min="1"
                                {...form.register("numberOfOpenings", { valueAsNumber: true })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="validTill">Valid Till</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !form.watch("validTill") && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {form.watch("validTill") ? format(form.watch("validTill"), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={form.watch("validTill")}
                                        onSelect={(date) => form.setValue("validTill", date as Date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="applicationLink">Application Link</Label>
                        <Input id="applicationLink" placeholder="https://example.com/apply" {...form.register("applicationLink")} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select onValueChange={(value) => form.setValue("priority", value as JobFormValues["priority"])}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {jobPriorities.map((priority) => (
                                    <SelectItem key={priority} value={priority}>
                                        {priority}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                    {tag}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                        onClick={() => removeItem("tags", tag)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a tag"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addItem("tags", newItem)
                                    }
                                }}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => addItem("tags", newItem)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                    Cancel
                </Button>
                <Button type="submit">Create Job Posting</Button>
            </div>
        </form>
    )
}

