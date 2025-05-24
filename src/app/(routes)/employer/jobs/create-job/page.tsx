"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Plus, X, ArrowLeftCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
import { useApiPost } from "@/hooks/use-api-query"
import toast from "react-hot-toast"
import { useAuth } from "@/app/(providers)/AuthContext"

const employmentTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "VOLUNTEER"] as const

const experienceLevels = ["JUNIOR", "MID_LEVEL", "SENIOR", "LEAD"] as const

const industry = [
  "Telecommunications",
  "Textile / Apparel / Fashion",
  "Textiles",
  "Travel",
  "Travel & Tourism",
  "UI/UX Design",
  "Venture Capital / Private Equity",
  "Veterinary / Animal Care",
  "Web Design",
  "Wellness & Fitness",
] as const

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "INR",
  "JPY",
  "CNY",
  "AUD",
  "CAD",
  "CHF",
  "RUB",
  "SAR",
  "AED",
  "SGD",
  "KRW",
  "ZAR",
  "BRL",
  "MXN",
  "TRY",
  "THB",
  "MYR",
  "IDR",
  "PHP",
  "PKR",
  "BDT",
  "VND",
  "EGP",
  "NGN",
  "KES",
  "LKR",
  "NPR",
  "QAR",
  "KWD",
  "BHD",
  "OMR",
] as const

const jobPriorities = ["NORMAL", "FEATURED", "SPONSORED"] as const

const jobCategories = [
  "Accountant",
  "Administration",
  "Airlines",
  "Architect",
  "Audit",
  "Backoffice",
  "Broking",
  "CAD CAM",
  "Chef",
  "Civil Engineering",
  "Construction",
  "Consulting",
  "Content Writer",
  "CS",
  "Customer Service",
  "Data Entry",
  "Design Engineer",
  "Doctor",
  "Editing",
  "Education",
  "Equipment Operator",
  "Event Management",
  "Export",
  "Fashion",
  "Films",
  "Finance",
  "Fresh Graduate",
  "Front Desk",
  "Front Office",
  "Graphic Designer",
  "Guard",
  "Hardware",
  "Health Care",
  "Housekeeping",
  "HR",
  "Import",
  "Industrial",
  "Inspector",
  "Installation",
  "Insurance",
  "Interior Design Jobs",
  "IT Hardware Jobs",
  "IT Networking Jobs",
  "IT Software Jobs",
  "Journalism Jobs",
  "Lawyer Jobs",
  "Legal Advisor Jobs",
  "Legal Jobs",
  "Logistics Jobs",
  "Maintenance Jobs",
  "Management Jobs",
  "Manufacturing Jobs",
  "Marketing Jobs",
  "Medical Research Jobs",
  "MR Jobs",
  "Nurse Jobs",
  "Oil And Gas Jobs",
  "Operation Jobs",
  "Petroleum Jobs",
  "Pharma Jobs",
  "PR Jobs",
  "Production Jobs",
  "Projects Jobs",
  "Purchase Jobs",
  "Quality Jobs",
  "Real Estate Jobs",
  "Repair Jobs",
  "Research And Development Jobs",
  "Restaurant Jobs",
  "Retailing Jobs",
  "Sales Jobs",
  "Secretary Jobs",
  "Security Jobs",
  "Shipping Jobs",
  "Site Engineering Jobs",
  "Supply Chain Jobs",
  "Tax Jobs",
  "Teaching Jobs",
  "Telecalling Jobs",
  "Telecom Jobs",
  "Testing Jobs",
  "Textile Jobs",
  "Ticketing Jobs",
  "Traveling Jobs",
  "Visualizer Jobs",
  "Web Designer Jobs",
]

const countries = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "India"]

const states = ["California", "New York", "Texas", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "Other"]

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Other",
]

const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().min(1, "Country is required"),
  }),
  employmentType: z.enum(employmentTypes),
  industry: z.string(),
  experience: z.object({
    level: z.enum(experienceLevels),
    years: z.object({
      min: z.number().min(0),
      max: z.number().max(50),
    }),
  }),
  salary: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    currency: z.enum(currencies),
  }),
  numberOfOpenings: z.number().min(1),
  validTill: z.date(),
  remote: z.boolean(),
  applicationLink: z.string().url("Please enter a valid URL"),
  priority: z.enum(jobPriorities),
  skills: z.array(z.string()),
  education: z.array(z.string()),
  languages: z.array(z.string()),
  benefits: z.array(z.string()),
  tags: z.array(z.string()),
  keyResponsibilities: z.array(z.string().min(1, "Responsibility cannot be empty")),
})

type JobFormValues = z.infer<typeof jobFormSchema>

type JobResponse = {
  data?: any
  error?: {
    message: string
  }
}

type JobPayload = {
  title: string
  description: string
  category: string
  location: {
    city?: string
    state?: string
    country: string
    address?: string
  }
  employmentType: string
  industry?: string
  skills: string[]
  experience: {
    level: string
    years: {
      min: number
      max: number
    }
  }
  education: string[]
  languages: string[]
  salary: {
    currency: string
    min?: number
    max?: number
  }
  numberOfOpenings: number
  postedAt: number
  validTill: string
  remote: boolean
  benefits: string[]
  applicationLink: string
  status: string
  priority: string
  tags: string[]
  keyResponsibilities: string[]
  createdBy: {
    userId: string
  }
}

export default function JobPostingForm() {
  const [newSkill, setNewSkill] = React.useState("")
  const [newBenefit, setNewBenefit] = React.useState("")
  const [newLanguage, setNewLanguage] = React.useState("")
  const [newEducation, setNewEducation] = React.useState("")
  const [newTag, setNewTag] = React.useState("")
  const [newResponsibility, setNewResponsibility] = React.useState("")

  const { user } = useAuth()

  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      remote: false,
      numberOfOpenings: 1,
      salary: {
        currency: "USD",
      },
      priority: "NORMAL",
      industry: "",
      skills: [],
      education: [],
      languages: [],
      benefits: [],
      tags: [],
      keyResponsibilities: [],
    },
  })

  // Use the API post hook for creating jobs
  const jobMutation = useApiPost<JobResponse, JobPayload>()

  const addItem = (
    type: "skills" | "benefits" | "languages" | "education" | "tags" | "keyResponsibilities",
    item: string,
  ) => {
    if (!item.trim()) return

    const currentItems = watch(type) || []
    setValue(type, [...currentItems, item])

    // Clear the input field
    switch (type) {
      case "skills":
        setNewSkill("")
        break
      case "benefits":
        setNewBenefit("")
        break
      case "languages":
        setNewLanguage("")
        break
      case "education":
        setNewEducation("")
        break
      case "tags":
        setNewTag("")
        break
      case "keyResponsibilities":
        setNewResponsibility("")
        break
    }

    // Show a subtle toast notification
    toast.success(
      `Added new ${type
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()
        .slice(0, -1)}`,
      {
        duration: 1500,
        style: {
          background: "#f3f4f6",
          color: "#1f2937",
          border: "1px solid #e5e7eb",
        },
        icon: "✓",
      },
    )
  }

  const removeItem = (
    type: "skills" | "benefits" | "languages" | "education" | "tags" | "keyResponsibilities",
    index: number,
  ) => {
    const currentItems = watch(type) || []
    setValue(
      type,
      currentItems.filter((_, i) => i !== index),
    )
  }

  const onSubmit: SubmitHandler<JobFormValues> = (data) => {
    const payload: JobPayload = {
      title: data.title,
      description: data.description,
      category: data.category,
      location: {
        city: data.location.city || "",
        state: data.location.state || "",
        country: data.location.country,
      },
      employmentType: data.employmentType,
      industry: data.industry,
      skills: data.skills,
      experience: {
        level: data.experience.level,
        years: {
          min: data.experience.years.min,
          max: data.experience.years.max,
        },
      },
      education: data.education,
      languages: data.languages,
      salary: {
        currency: data.salary.currency,
        min: data.salary.min,
        max: data.salary.max,
      },
      numberOfOpenings: data.numberOfOpenings,
      postedAt: Date.now(),
      validTill: data.validTill.toISOString().split("T")[0],
      remote: data.remote,
      benefits: data.benefits,
      applicationLink: data.applicationLink,
      status: "ACTIVE",
      priority: data.priority,
      tags: data.tags,
      keyResponsibilities: data.keyResponsibilities,
      createdBy: {
        userId: user?.id || "",
      },
    }

    console.log("Job Payload:", payload)

    // Create new job
    jobMutation.mutate(
      {
        endpoint: "jobs/create-job",
        payload: payload,
        invalidateQueries: [["jobs"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Job posting created successfully")
            reset()
            // Navigate back to jobs list
            router.push("/employer/jobs")
          } else if (response.error) {
            toast.error("Failed to create job posting")
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create job posting")
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-start items-center">
        <Link href="/employer/jobs">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeftCircle className="h-8 w-8" />
          </Button>
        </Link>
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
              <Input id="title" placeholder="e.g. Senior Software Engineer" {...register("title")} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the role and responsibilities"
              className="min-h-[150px]"
              {...register("description")}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Key Responsibilities */}
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>Key Responsibilities</CardTitle>
          <CardDescription>List the key responsibilities for this position</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Responsibilities</Label>
            <Controller
              name="keyResponsibilities"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
                    {field.value.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic p-1">No responsibilities added yet</p>
                    ) : (
                      field.value.map((responsibility, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                          {responsibility}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeItem("keyResponsibilities", index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a responsibility and press Enter or Add"
                        value={newResponsibility}
                        onChange={(e) => setNewResponsibility(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addItem("keyResponsibilities", newResponsibility)
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={() => addItem("keyResponsibilities", newResponsibility)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Press Enter or click Add to add each responsibility
                    </p>
                  </div>
                </div>
              )}
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
            <Controller
              name="remote"
              control={control}
              render={({ field }) => <Switch id="remote" checked={field.value} onCheckedChange={field.onChange} />}
            />
            <Label htmlFor="remote">This is a remote position</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Controller
                name="location.country"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location?.country && <p className="text-sm text-red-500">{errors.location.country.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Controller
                name="location.state"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Controller
                name="location.city"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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
              <Controller
                name="employmentType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger id="employmentType">
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
                )}
              />
              {errors.employmentType && <p className="text-sm text-red-500">{errors.employmentType.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Controller
                name="experience.level"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger id="experienceLevel">
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
                )}
              />
              {errors.experience?.level && <p className="text-sm text-red-500">{errors.experience.level.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industry.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Required Skills</Label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
                    {field.value.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic p-1">No skills added yet</p>
                    ) : (
                      field.value.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                          {skill}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeItem("skills", index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a skill and press Enter or Add"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addItem("skills", newSkill)
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={() => addItem("skills", newSkill)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Press Enter or click Add to add each skill</p>
                  </div>
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minExperience">Minimum Experience (years)</Label>
              <Input
                id="minExperience"
                type="number"
                min="0"
                {...register("experience.years.min", { valueAsNumber: true })}
              />
              {errors.experience?.years?.min && (
                <p className="text-sm text-red-500">{errors.experience.years.min.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxExperience">Maximum Experience (years)</Label>
              <Input
                id="maxExperience"
                type="number"
                max="50"
                {...register("experience.years.max", { valueAsNumber: true })}
              />
              {errors.experience?.years?.max && (
                <p className="text-sm text-red-500">{errors.experience.years.max.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Education</Label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
                    {field.value.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic p-1">No education requirements added yet</p>
                    ) : (
                      field.value.map((edu, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                          {edu}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeItem("education", index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type education requirement and press Enter or Add"
                        value={newEducation}
                        onChange={(e) => setNewEducation(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addItem("education", newEducation)
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={() => addItem("education", newEducation)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Press Enter or click Add to add each education requirement
                    </p>
                  </div>
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Languages</Label>
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
                    {field.value.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic p-1">No languages added yet</p>
                    ) : (
                      field.value.map((lang, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                          {lang}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeItem("languages", index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a language and press Enter or Add"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addItem("languages", newLanguage)
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={() => addItem("languages", newLanguage)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Press Enter or click Add to add each language</p>
                  </div>
                </div>
              )}
            />
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
              <Input id="minSalary" type="number" {...register("salary.min", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSalary">Maximum Salary</Label>
              <Input id="maxSalary" type="number" {...register("salary.max", { valueAsNumber: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Controller
                name="salary.currency"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <SelectTrigger id="currency">
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
                )}
              />
              {errors.salary?.currency && <p className="text-sm text-red-500">{errors.salary.currency.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Benefits</Label>
            <Controller
              name="benefits"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
                    {field.value.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic p-1">No benefits added yet</p>
                    ) : (
                      field.value.map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                          {benefit}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeItem("benefits", index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a benefit and press Enter or Add"
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addItem("benefits", newBenefit)
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={() => addItem("benefits", newBenefit)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Press Enter or click Add to add each benefit</p>
                  </div>
                </div>
              )}
            />
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
                {...register("numberOfOpenings", { valueAsNumber: true })}
              />
              {errors.numberOfOpenings && <p className="text-sm text-red-500">{errors.numberOfOpenings.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="validTill">Valid Till</Label>
              <Controller
                name="validTill"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.validTill && <p className="text-sm text-red-500">{errors.validTill.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationLink">Application Link</Label>
            <Input id="applicationLink" placeholder="https://example.com/apply" {...register("applicationLink")} />
            {errors.applicationLink && <p className="text-sm text-red-500">{errors.applicationLink.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <SelectTrigger id="priority">
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
              )}
            />
            {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md bg-gray-50">
                    {field.value.length === 0 ? (
                      <p className="text-muted-foreground text-sm italic p-1">No tags added yet</p>
                    ) : (
                      field.value.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5 px-3">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeItem("tags", index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a tag and press Enter or Add"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addItem("tags", newTag)
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={() => addItem("tags", newTag)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Press Enter or click Add to add each tag</p>
                  </div>
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Link href="/employer/jobs">
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </Link>
        <Button type="submit" disabled={jobMutation.isPending}>
          {jobMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Create Job Posting"
          )}
        </Button>
      </div>
    </form>
  )
}
