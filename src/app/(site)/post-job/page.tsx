"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Plus, X, ArrowLeftCircle, Briefcase } from "lucide-react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

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
const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD", "CHF", "RUB", "SAR", "AED"] as const
const jobPriorities = ["NORMAL", "FEATURED", "SPONSORED"] as const
const jobCategories = [
  "Accountant",
  "Administration",
  "Airlines",
  "Architect",
  "Audit",
  "IT Software Jobs",
  "Marketing Jobs",
  "Sales Jobs",
  "HR",
  "Finance",
  "Engineering",
  "Healthcare",
  "Education",
  "Design",
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

export default function PublicJobForm() {
  const [newSkill, setNewSkill] = React.useState("")
  const [newBenefit, setNewBenefit] = React.useState("")
  const [newLanguage, setNewLanguage] = React.useState("")
  const [newEducation, setNewEducation] = React.useState("")
  const [newTag, setNewTag] = React.useState("")
  const [newResponsibility, setNewResponsibility] = React.useState("")
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
    // Instead of submitting, show login prompt
    setShowLoginPrompt(true)
  }

  const handleLoginRedirect = () => {
    // Store form data in localStorage for potential recovery
    const formData = watch()
    localStorage.setItem("draft-job-posting", JSON.stringify(formData))

    // Redirect to login with employer type
    router.push("/auth/login?userType=recruiter&redirect=create-job")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                <ArrowLeftCircle className="h-6 w-6" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Post a Job</h1>
                <p className="text-gray-600">Create your job posting and reach top talent</p>
              </div>
            </div>
          </div>

          {/* Info Alert */}
          <Alert className="border-blue-200 bg-blue-50">
            <Briefcase className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Preview Mode:</strong> Fill out the form to see how easy it is to post jobs on our platform.
              You'll need to create an account to publish your job posting.
            </AlertDescription>
          </Alert>
        </div>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Ready to Post Your Job?</CardTitle>
                <CardDescription>
                  Create your employer account to publish this job posting and start receiving applications from
                  qualified candidates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">What happens next:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Create your employer account</li>
                    <li>• Your job details will be saved</li>
                    <li>• Publish and start receiving applications</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowLoginPrompt(false)} className="flex-1">
                    Continue Editing
                  </Button>
                  <Button onClick={handleLoginRedirect} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Create Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>Provide the basic details about the job posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Job Title
                  </Label>
                  <Input id="title" placeholder="e.g. Senior Software Engineer" {...register("title")} />
                  {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Job Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role and responsibilities"
                  className="min-h-[120px]"
                  {...register("description")}
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Key Responsibilities */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Key Responsibilities</CardTitle>
              <CardDescription>List the key responsibilities for this position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Responsibilities</Label>
                <Controller
                  name="keyResponsibilities"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-md bg-gray-50">
                        {field.value.length === 0 ? (
                          <p className="text-gray-500 text-sm italic">No responsibilities added yet</p>
                        ) : (
                          field.value.map((responsibility, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
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
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Location Details</CardTitle>
              <CardDescription>Specify the job location and remote work options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Controller
                  name="remote"
                  control={control}
                  render={({ field }) => <Switch id="remote" checked={field.value} onCheckedChange={field.onChange} />}
                />
                <Label htmlFor="remote" className="text-sm">
                  This is a remote position
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium">
                    Country
                  </Label>
                  <Controller
                    name="location.country"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  {errors.location?.country && (
                    <p className="text-xs text-red-500">{errors.location.country.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    State/Province
                  </Label>
                  <Controller
                    name="location.state"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  <Label htmlFor="city" className="text-sm font-medium">
                    City
                  </Label>
                  <Controller
                    name="location.city"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
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
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Job Requirements</CardTitle>
              <CardDescription>Define the requirements and qualifications for the position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentType" className="text-sm font-medium">
                    Employment Type
                  </Label>
                  <Controller
                    name="employmentType"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  {errors.employmentType && <p className="text-xs text-red-500">{errors.employmentType.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel" className="text-sm font-medium">
                    Experience Level
                  </Label>
                  <Controller
                    name="experience.level"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  {errors.experience?.level && (
                    <p className="text-xs text-red-500">{errors.experience.level.message}</p>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Required Skills</Label>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-md bg-gray-50">
                        {field.value.length === 0 ? (
                          <p className="text-gray-500 text-sm italic">No skills added yet</p>
                        ) : (
                          field.value.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
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
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minExperience" className="text-sm font-medium">
                    Minimum Experience (years)
                  </Label>
                  <Input
                    id="minExperience"
                    type="number"
                    min="0"
                    {...register("experience.years.min", { valueAsNumber: true })}
                  />
                  {errors.experience?.years?.min && (
                    <p className="text-xs text-red-500">{errors.experience.years.min.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxExperience" className="text-sm font-medium">
                    Maximum Experience (years)
                  </Label>
                  <Input
                    id="maxExperience"
                    type="number"
                    max="50"
                    {...register("experience.years.max", { valueAsNumber: true })}
                  />
                  {errors.experience?.years?.max && (
                    <p className="text-xs text-red-500">{errors.experience.years.max.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compensation & Benefits */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Compensation & Benefits</CardTitle>
              <CardDescription>Specify the salary range and additional benefits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minSalary" className="text-sm font-medium">
                    Minimum Salary
                  </Label>
                  <Input id="minSalary" type="number" {...register("salary.min", { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSalary" className="text-sm font-medium">
                    Maximum Salary
                  </Label>
                  <Input id="maxSalary" type="number" {...register("salary.max", { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-sm font-medium">
                    Currency
                  </Label>
                  <Controller
                    name="salary.currency"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  {errors.salary?.currency && <p className="text-xs text-red-500">{errors.salary.currency.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Additional Details</CardTitle>
              <CardDescription>Provide any additional information about the position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numberOfOpenings" className="text-sm font-medium">
                    Number of Openings
                  </Label>
                  <Input
                    id="numberOfOpenings"
                    type="number"
                    min="1"
                    {...register("numberOfOpenings", { valueAsNumber: true })}
                  />
                  {errors.numberOfOpenings && <p className="text-xs text-red-500">{errors.numberOfOpenings.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validTill" className="text-sm font-medium">
                    Valid Till
                  </Label>
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
                  {errors.validTill && <p className="text-xs text-red-500">{errors.validTill.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationLink" className="text-sm font-medium">
                  Application Link
                </Label>
                <Input id="applicationLink" placeholder="https://example.com/apply" {...register("applicationLink")} />
                {errors.applicationLink && <p className="text-xs text-red-500">{errors.applicationLink.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Submit Section */}
          <div className="flex justify-end gap-4 pt-6">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-8">
              <Briefcase className="mr-2 h-4 w-4" />
              Publish
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
