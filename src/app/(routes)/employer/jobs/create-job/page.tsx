"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus, X, ArrowLeftCircle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useApiPost, useApiGet, useApiPut } from "@/hooks/use-api-query";

const employmentTypes = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "TEMPORARY",
  "INTERNSHIP",
  "VOLUNTEER",
] as const;

const experienceLevels = [
  "ENTRY_LEVEL",
  "MID_LEVEL",
  "SENIOR_LEVEL",
  "DIRECTOR",
  "EXECUTIVE",
] as const;

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "INR"] as const;

const jobPriorities = ["LOW", "NORMAL", "HIGH", "URGENT"] as const;

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
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
];

const states = [
  "California",
  "New York",
  "Texas",
  "Florida",
  "Illinois",
  "Pennsylvania",
  "Ohio",
  "Georgia",
  "Other",
];

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
];

// Simplified schema based on the form fields present in the UI
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
});

type JobFormValues = z.infer<typeof jobFormSchema>;

type JobResponse = {
  data?: any;
  error?: {
    message: string;
  };
};

type JobPayload = {
  title: string;
  description: string;
  company: {
    name: string;
    website: string;
  };
  category: string;
  location: {
    city?: string;
    state?: string;
    country: string;
    address?: string;
  };
  employmentType: string;
  industry?: string;
  skills: string[];
  experience: {
    level: string;
    years: {
      min: number;
      max: number;
    };
  };
  education: string[];
  languages: string[];
  salary: {
    currency: string;
    min?: number;
    max?: number;
    unit: string;
  };
  numberOfOpenings: number;
  postedAt: string;
  validTill: string;
  remote: boolean;
  benefits: string[];
  applicationLink: string;
  status: string;
  priority: string;
  tags: string[];
  createdBy: {
    userId: string;
  };
};

export default function JobPostingForm() {
  const [newSkill, setNewSkill] = React.useState("");
  const [newBenefit, setNewBenefit] = React.useState("");
  const [newLanguage, setNewLanguage] = React.useState("");
  const [newEducation, setNewEducation] = React.useState("");
  const [newTag, setNewTag] = React.useState("");
  const [isUpdateMode, setIsUpdateMode] = React.useState(false);

  const params = useParams();
  const jobId = params?.id as string;

  const { toast } = useToast();

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
    },
  });

  // Fetch job data if in update mode
  // const { data: jobData, isLoading } = useApiGet<any>(
  //   jobId ? `jobs/${jobId}` : "",
  //   {},
  //   jobId ? ["job", { id: jobId }] : undefined,
  // )
  let jobData: any;

  // Add a useEffect to handle the data loading and form population
  React.useEffect(() => {
    if (jobData && jobId) {
      setIsUpdateMode(true);
      // Populate form with job data
      setValue("title", jobData.title);
      setValue("description", jobData.description);
      setValue("category", jobData.category);
      setValue("location.country", jobData.location?.country || "");
      setValue("location.state", jobData.location?.state || "");
      setValue("location.city", jobData.location?.city || "");
      if (
        jobData.employmentType &&
        employmentTypes.includes(jobData.employmentType as any)
      ) {
        setValue("employmentType", jobData.employmentType as any);
      }
      setValue("industry", jobData.industry || "");
      if (
        jobData.experience?.level &&
        experienceLevels.includes(jobData.experience?.level as any)
      ) {
        setValue("experience.level", jobData.experience.level as any);
      }
      setValue("experience.years.min", jobData.experience?.years?.min || 0);
      setValue("experience.years.max", jobData.experience?.years?.max || 0);
      setValue("salary.min", jobData.salary?.min);
      setValue("salary.max", jobData.salary?.max);
      if (
        jobData.salary?.currency &&
        currencies.includes(jobData.salary?.currency as any)
      ) {
        setValue("salary.currency", jobData.salary?.currency as any);
      }
      setValue("numberOfOpenings", jobData.numberOfOpenings || 1);
      setValue(
        "validTill",
        jobData.validTill ? new Date(jobData.validTill) : new Date()
      );
      setValue("remote", jobData.remote || false);
      setValue("applicationLink", jobData.applicationLink || "");
      if (jobData.priority && jobPriorities.includes(jobData.priority as any)) {
        setValue("priority", jobData.priority as any);
      }
      setValue("skills", jobData.skills || []);
      setValue("education", jobData.education || []);
      setValue("languages", jobData.languages || []);
      setValue("benefits", jobData.benefits || []);
      setValue("tags", jobData.tags || []);
    }
  }, [jobData, jobId, setValue]);

  console.log(errors, "ERRORS====");

  // Use the API post hook for creating jobs
  const jobMutation = useApiPost<JobResponse, JobPayload>();

  // Use the API put hook for updating jobs
  const jobUpdateMutation = useApiPut<JobResponse, JobPayload>();

  const addItem = (
    type: "skills" | "benefits" | "languages" | "education" | "tags",
    item: string
  ) => {
    if (!item.trim()) return;

    const currentItems = watch(type) || [];
    setValue(type, [...currentItems, item]);

    // Clear the input field
    switch (type) {
      case "skills":
        setNewSkill("");
        break;
      case "benefits":
        setNewBenefit("");
        break;
      case "languages":
        setNewLanguage("");
        break;
      case "education":
        setNewEducation("");
        break;
      case "tags":
        setNewTag("");
        break;
    }
  };

  const removeItem = (
    type: "skills" | "benefits" | "languages" | "education" | "tags",
    index: number
  ) => {
    const currentItems = watch(type) || [];
    setValue(
      type,
      currentItems.filter((_, i) => i !== index)
    );
  };

  const onSubmit: SubmitHandler<JobFormValues> = (data) => {
    console.log("Form submitted with data:", data);

    // Prepare the payload with only the fields that are present in the form
    const payload: JobPayload = {
      title: data.title,
      description: data.description,
      company: {
        name: "Tech Corp",
        website: "https://techcorp.com",
      },
      category: data.category,
      location: {
        city: data.location.city || "",
        state: data.location.state || "",
        country: data.location.country,
      },
      employmentType: data.employmentType,
      industry: data.industry || "",
      skills: data.skills,
      experience: {
        level: "MID_LEVEL",
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
        unit: "yearly",
      },
      numberOfOpenings: data.numberOfOpenings,
      postedAt: "Mon Dec 24 2018 00:00:00 GMT+0530 (India Standard Time)",
      validTill: data.validTill.toISOString().split("T")[0],
      remote: data.remote,
      benefits: data.benefits,
      applicationLink: data.applicationLink,
      status: "ACTIVE",
      priority: data.priority,
      tags: data.tags,
      createdBy: {
        userId: "65ff4a2b8c9d4e001c3a7b89",
      },
    };

    if (isUpdateMode) {
      // Update existing job
      jobUpdateMutation.mutate(
        {
          endpoint: `jobs/update-job/${jobId}`,
          payload: payload,
          invalidateQueries: [["jobs"], ["job", { id: jobId }]],
        },
        {
          onSuccess: (response) => {
            if (response.data) {
              toast({
                title: "Success",
                description: "Job posting updated successfully",
              });
            } else if (response.error) {
              toast({
                title: "Error",
                description: response.error.message,
                variant: "destructive",
              });
            }
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.message || "Failed to update job posting",
              variant: "destructive",
            });
          },
        }
      );
    } else {
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
              toast({
                title: "Success",
                description: "Job posting created successfully",
              });
              reset();
            } else if (response.error) {
              toast({
                title: "Error",
                description: response.error.message,
                variant: "destructive",
              });
            }
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.message || "Failed to create job posting",
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-start items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => {}}>
          <ArrowLeftCircle className="h-8 w-8" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {isUpdateMode ? "Update Job" : "Create Job"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isUpdateMode
              ? "Update the details of the job posting"
              : "Enter the details of the job you want to post"}
          </p>
        </div>
      </div>
      {/* Basic Information */}
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide the basic details about the job posting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Software Engineer"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
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
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>
            Specify the job location and remote work options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="remote"
              control={control}
              render={({ field }) => (
                <Switch
                  id="remote"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                <p className="text-sm text-red-500">
                  {errors.location.country.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Controller
                name="location.state"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
          <CardDescription>
            Define the requirements and qualifications for the position
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              <Controller
                name="employmentType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              {errors.employmentType && (
                <p className="text-sm text-red-500">
                  {errors.employmentType.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Controller
                name="experience.level"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                <p className="text-sm text-red-500">
                  {errors.experience.level.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Required Skills</Label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
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
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("skills", newSkill);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => addItem("skills", newSkill)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </>
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
                <p className="text-sm text-red-500">
                  {errors.experience.years.min.message}
                </p>
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
                <p className="text-sm text-red-500">
                  {errors.experience.years.max.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Education</Label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((edu, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
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
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add education requirement"
                      value={newEducation}
                      onChange={(e) => setNewEducation(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("education", newEducation);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => addItem("education", newEducation)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Languages</Label>
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((lang, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
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
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add language requirement"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("languages", newLanguage);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => addItem("languages", newLanguage)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Compensation & Benefits */}
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>Compensation & Benefits</CardTitle>
          <CardDescription>
            Specify the salary range and additional benefits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSalary">Minimum Salary</Label>
              <Input
                id="minSalary"
                type="number"
                {...register("salary.min", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSalary">Maximum Salary</Label>
              <Input
                id="maxSalary"
                type="number"
                {...register("salary.max", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Controller
                name="salary.currency"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              {errors.salary?.currency && (
                <p className="text-sm text-red-500">
                  {errors.salary.currency.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Benefits</Label>
            <Controller
              name="benefits"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((benefit, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
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
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a benefit"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("benefits", newBenefit);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => addItem("benefits", newBenefit)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card className="shadow-sm border-none">
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
          <CardDescription>
            Provide any additional information about the position
          </CardDescription>
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
              {errors.numberOfOpenings && (
                <p className="text-sm text-red-500">
                  {errors.numberOfOpenings.message}
                </p>
              )}
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
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.validTill && (
                <p className="text-sm text-red-500">
                  {errors.validTill.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationLink">Application Link</Label>
            <Input
              id="applicationLink"
              placeholder="https://example.com/apply"
              {...register("applicationLink")}
            />
            {errors.applicationLink && (
              <p className="text-sm text-red-500">
                {errors.applicationLink.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            {errors.priority && (
              <p className="text-sm text-red-500">{errors.priority.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
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
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addItem("tags", newTag);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => addItem("tags", newTag)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={jobMutation.isPending || jobUpdateMutation.isPending}
        >
          {jobMutation.isPending || jobUpdateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isUpdateMode ? (
            "Update Job Posting"
          ) : (
            "Create Job Posting"
          )}
        </Button>
      </div>
    </form>
  );
}
