"use client"

import * as React from "react"
import { Building2, Facebook, Twitter, Linkedin, Instagram, Sparkles, Loader2, Upload } from 'lucide-react'
import toast from "react-hot-toast"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import * as z from "zod"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApiPut, useApiGet } from "@/hooks/use-api-query"
import type { EmployerProfile, EmployerProfileResponse } from "@/types/api"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/app/(providers)/AuthContext"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""


// Validation schema using zod
const benefitSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
})

const phoneNumberSchema = z.object({
  number: z.string().min(1, "Phone number is required"),
})

const socialLinksSchema = z.object({
  linkedIn: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  facebook: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  instagram: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

const contactInfoSchema = z.object({
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  completeAddress: z.string().min(1, "Complete address is required"),
})

const employerProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: phoneNumberSchema,
  website: z.string().url("Please enter a valid URL").min(1, "Website URL is required"),
  logoUrl: z.string().min(1, "Company logo is required"),
  establishedYear: z.string().min(1, "Established year is required"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.string().min(1, "Industry is required"),
  allowInSearch: z.boolean().default(true),
  companyDescription: z.string().min(1, "Company description is required"),
  benefitsAndPerks: z.array(benefitSchema),
  socialLinks: socialLinksSchema,
  contactInfo: contactInfoSchema,
})

type FormValues = z.infer<typeof employerProfileSchema>

// Define the UserProfile type
interface UserProfile {
  data: {
    employerDetails: EmployerProfile
  }
}

export default function CompanyProfile() {
  const [logo, setLogo] = React.useState<string | null>(null)
  const [industry, setIndustry] = React.useState<string>("")
  const [country, setCountry] = React.useState<string>("")
  const [state, setState] = React.useState<string>("")
  const [city, setCity] = React.useState<string>("")
  const { user } = useAuth()
  const [isFormInitialized, setIsFormInitialized] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(employerProfileSchema),
    defaultValues: {
      companyName: "",
      email: "",
      phoneNumber: {
        countryCode: "+91",
        number: "",
      },
      website: "",
      logoUrl: "",
      establishedYear: "",
      companySize: "",
      industry: "",
      allowInSearch: false,
      companyDescription: "",
      benefitsAndPerks: [{ title: "", description: "" }],
      socialLinks: {
        linkedIn: "",
        facebook: "",
        twitter: "",
        instagram: "",
      },
      contactInfo: {
        country: "",
        state: "",
        city: "",
        completeAddress: "",
      },
    },
  })

  console.log("Form values:")
  console.log("Form errors:", errors)

  // Store form data in localStorage when it changes
  React.useEffect(() => {
    const subscription = watch((value) => {
      if (isFormInitialized && value) {
        localStorage.setItem("employerProfileForm", JSON.stringify(value))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, isFormInitialized])

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)

      // Show preview immediately
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setLogo(result)
      }
      reader.readAsDataURL(file)

      try {
        // Create form data for upload
        const formData = new FormData()
        formData.append("file", file)

        // Send to server
        const response = await axios.post(
          `${API_BASE_URL}/api/users/upload-profile-picture?userId=${user?.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )

        if (response.data && response.data.logoUrl) {
          // Update the form value with the returned URL
          setValue("logoUrl", response.data.logoUrl)
          toast.success("Logo uploaded successfully")
        } else {
          toast.error("Failed to upload logo")
        }
      } catch (error) {
        console.error("Error uploading logo:", error)
        toast.error("Error uploading logo")
      } finally {
        setIsUploading(false)
      }
    }
  }

  const {
    data: profileData,
    isLoading,
    refetch,
    error,
  } = useApiGet<UserProfile>(
    "users/get-profile",
    user?.id ? { userId: user.id } : null,
    [user?.id, "user-profile"], // Query key for caching
  )

  // Load data from API or localStorage
  React.useEffect(() => {
    // First try to load from localStorage
    const savedForm = localStorage.getItem("employerProfileForm")
    if (savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm)

        // Set the form values from localStorage
        Object.entries(parsedForm).forEach(([key, value]) => {
          if (
            key !== "contactInfo" &&
            key !== "socialLinks" &&
            key !== "phoneNumber" &&
            key !== "benefitsAndPerks"           ) {
            setValue(key as any, value as any)
          }
        })

        // Set nested values
        if (parsedForm.contactInfo) {
          setValue("contactInfo", parsedForm.contactInfo)
          setCountry(parsedForm.contactInfo.country || "")
          setState(parsedForm.contactInfo.state || "")
          setCity(parsedForm.contactInfo.city || "")
        }

        if (parsedForm.socialLinks) {
          setValue("socialLinks", parsedForm.socialLinks)
        }

        if (parsedForm.phoneNumber) {
          setValue("phoneNumber", {
            number: parsedForm.phoneNumber.number || "",
          })
        }

        if (parsedForm.benefitsAndPerks) {
          setValue("benefitsAndPerks", parsedForm.benefitsAndPerks)
        }

      

        if (parsedForm.industry) {
          setIndustry(parsedForm.industry)
        }

        if (parsedForm.logoUrl) {
          setLogo(parsedForm.logoUrl)
        }
      } catch (e) {
        console.error("Error parsing saved form data:", e)
      }
    }

    // Then load from API if available
    if (profileData?.data && !isLoading) {
      const { employerDetails } = profileData.data

      // Set form values from the API response
      setValue("companyName", employerDetails.companyName || "")
      setValue("email", employerDetails.email || "")
      setValue("phoneNumber", {
        countryCode: "+91",
        number: employerDetails.phoneNumber?.number || "",
      })
      setValue("website", employerDetails.website || "")
      setValue("logoUrl", employerDetails.logoUrl || "")
      setLogo(employerDetails.logoUrl || null) // Also update the logo state
      setValue(
        "establishedYear",
        employerDetails.establishedYear ? new Date(employerDetails.establishedYear).toISOString().split("T")[0] : "",
      )
      setValue("companySize", employerDetails.companySize || "")

      // Set industry with both form and local state
      setValue("industry", employerDetails.industry || "")
      setIndustry(employerDetails.industry || "")

      setValue("allowInSearch", employerDetails.allowInSearch || false)
      setValue("companyDescription", employerDetails.companyDescription || "")

      // Set benefits and perks
      if (employerDetails.benefitsAndPerks && employerDetails.benefitsAndPerks.length > 0) {
        setValue("benefitsAndPerks", employerDetails.benefitsAndPerks)
      }

      // Set key responsibilities
     

      // Set social links
      setValue("socialLinks", {
        linkedIn: employerDetails.socialLinks?.linkedIn || "",
        facebook: employerDetails.socialLinks?.facebook || "",
        twitter: employerDetails.socialLinks?.twitter || "",
        instagram: employerDetails.socialLinks?.instagram || "",
      })

      // Set contact info with both form and local state
      setValue("contactInfo", {
        country: employerDetails.contactInfo?.country || "",
        state: employerDetails.contactInfo?.state || "",
        city: employerDetails.contactInfo?.city || "",
        completeAddress: employerDetails.contactInfo?.completeAddress || "",
      })

      setCountry(employerDetails.contactInfo?.country || "")
      setState(employerDetails.contactInfo?.state || "")
      setCity(employerDetails.contactInfo?.city || "")

      // Save to localStorage
      localStorage.setItem(
        "employerProfileForm",
        JSON.stringify({
          ...employerDetails,
          contactInfo: employerDetails.contactInfo || {},
          socialLinks: employerDetails.socialLinks || {},
          phoneNumber: { number: employerDetails.phoneNumber?.number || "" },
          benefitsAndPerks: employerDetails.benefitsAndPerks || [{ title: "", description: "" }],
        }),
      )

      setIsFormInitialized(true)
    }
  }, [profileData, isLoading, setValue])

  // Use the API post hook
  const profileMutation = useApiPut<EmployerProfileResponse, EmployerProfile>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted with data:", data)
    const formattedData = {
      employerDetails: {
        ...data,
      },
      role: "EMPLOYER",
      id: user?.id,
    }

    // Save to localStorage immediately
    localStorage.setItem("employerProfileForm", JSON.stringify(data))

    profileMutation.mutate(
      {
        endpoint: "users/update-profile",
        payload: formattedData,
        invalidateQueries: [["user-profile"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast.success("Profile updated successfully")
            refetch()
          } else if (response.error) {
            toast.error(response.error.message)
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update profile")
        },
      },
    )
  }

  // Handle select changes to update both form and local state
  const handleIndustryChange = (value: string) => {
    setValue("industry", value)
    setIndustry(value)
  }

  const handleCountryChange = (value: string) => {
    setValue("contactInfo.country", value)
    setCountry(value)
  }

  const handleStateChange = (value: string) => {
    setValue("contactInfo.state", value)
    setState(value)
  }

  const handleCityChange = (value: string) => {
    setValue("contactInfo.city", value)
    setCity(value)
  }

  return (
    <div className="space-y-4 bg-gray-50 md:p-0 rounded-xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Company Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your company information and visibility</p>
        </div>
        <Link href="/employer/profile/preview">
          <Button variant="outline" className="text-sm">
            Preview
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Branding Card */}
        <Card>
          <CardHeader>
            <CardTitle>Company Branding</CardTitle>
            <CardDescription>Upload your company logo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex flex-col">
            <div className="space-y-4">
              <Label>
                Company Logo <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative hover:border-gray-400 transition-colors">
                  {logo ? (
                    <Image
                      src={logo || "/placeholder.svg"}
                      width={100}
                      height={100}
                      alt="Company logo"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <Building2 className="h-10 w-10 text-gray-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleLogoUpload}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Upload your company logo</p>
                  <p>Max file size: 1MB. Formats: JPG, PNG</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    disabled={isUploading}
                    onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </>
                    )}
                  </Button>
                </div>
              </div>
              {errors.logoUrl && <p className="text-sm text-red-500">{errors.logoUrl.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Basic Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter your company&apos;s basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input id="companyName" {...register("companyName")} />
                {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone</Label>
                <div className="flex space-x-2">
                  {/* <Input id="countryCode" className="w-24" placeholder="+1" {...register("phoneNumber.countryCode")} /> */}
                  <Input
                    id="phoneNumber"
                    className="flex-1"
                    placeholder="Phone number"
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                        "Home",
                        "End",
                      ];
                      if (
                        !/^[0-9]$/.test(e.key) &&
                        !allowedKeys.includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    {...register("phoneNumber.number")}
                  />
                </div>
                {(errors.phoneNumber?.countryCode || errors.phoneNumber?.number) && (
                  <p className="text-sm text-red-500">Please enter a valid phone number</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">
                  Website <span className="text-red-500">*</span>
                </Label>
                <Input id="website" {...register("website")} placeholder="https://" />
                {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="establishedYear">
                  Established Year <span className="text-red-500">*</span>
                </Label>
                <Input id="establishedYear" type="date" {...register("establishedYear")} placeholder="YYYY-MM-DD" />
                {errors.establishedYear && <p className="text-sm text-red-500">{errors.establishedYear.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">
                  Company Size <span className="text-red-500">*</span>
                </Label>
                <select
                  id="companySize"
                  {...register("companySize")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </select>
                {errors.companySize && <p className="text-sm text-red-500">{errors.companySize.message}</p>}
              </div>
            </div>

            <div className="space-y-2 w-1/2">
              <Label htmlFor="industry">
                Industry <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={handleIndustryChange}
                    value={industry || field.value || ""}
                    defaultValue={industry || field.value || ""}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue>{industry || "Select industry"}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Controller
                name="allowInSearch"
                control={control}
                render={({ field }) => (
                  <Checkbox id="allowInSearch" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
              <Label htmlFor="allowInSearch">Allow in search results</Label>
            </div>
          </CardContent>
        </Card>

        {/* About Card */}
        <Card>
          <CardHeader>
            <CardTitle>About Company</CardTitle>
            <CardDescription>Tell potential candidates about your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="companyDescription">
              Company Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="companyDescription"
              {...register("companyDescription")}
              className="min-h-[200px] w-full"
              placeholder="Describe your company's mission, values, and culture..."
            />
            {errors.companyDescription && <p className="text-sm text-red-500">{errors.companyDescription.message}</p>}

            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Generate with AI</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Benefits and Perks Card */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits and Perks</CardTitle>
            <CardDescription>Highlight the advantages of working at your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>
                Benefits <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="benefitsAndPerks"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4">
                    {field.value.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder="Benefit title"
                          className="w-[180px]"
                          value={benefit.title}
                          onChange={(e) => {
                            const newBenefits = [...field.value]
                            newBenefits[index].title = e.target.value
                            field.onChange(newBenefits)
                          }}
                        />
                        <Input
                          placeholder="Describe benefit"
                          className="flex-grow"
                          value={benefit.description}
                          onChange={(e) => {
                            const newBenefits = [...field.value]
                            newBenefits[index].description = e.target.value
                            field.onChange(newBenefits)
                          }}
                        />
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newBenefits = field.value.filter((_, i) => i !== index)
                              field.onChange(newBenefits)
                            }}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        field.onChange([...field.value, { title: "", description: "" }])
                      }}
                    >
                      + Add Another Benefit
                    </Button>
                  </div>
                )}
              />
              {errors.benefitsAndPerks && (
                <p className="text-sm text-red-500">{errors.benefitsAndPerks.message || "Benefits are required"}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Add your company's location details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactInfo.country">
                  Country <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="contactInfo.country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={handleCountryChange}
                      value={country || field.value || ""}
                      defaultValue={country || field.value || ""}
                    >
                      <SelectTrigger id="contactInfo.country">
                        <SelectValue>{country || "Select country"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Japan">Japan</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.contactInfo?.country && (
                  <p className="text-sm text-red-500">{errors.contactInfo.country.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactInfo.state">
                  State/Province <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="contactInfo.state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={handleStateChange}
                      value={state || field.value || ""}
                      defaultValue={state || field.value || ""}
                    >
                      <SelectTrigger id="contactInfo.state">
                        <SelectValue>{state || "Select state"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="California">California</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Texas">Texas</SelectItem>
                        <SelectItem value="Florida">Florida</SelectItem>
                        <SelectItem value="Illinois">Illinois</SelectItem>
                        <SelectItem value="Pennsylvania">Pennsylvania</SelectItem>
                        <SelectItem value="Ohio">Ohio</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.contactInfo?.state && (
                  <p className="text-sm text-red-500">{errors.contactInfo.state.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactInfo.city">
                  City <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="contactInfo.city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={handleCityChange}
                      value={city || field.value || ""}
                      defaultValue={city || field.value || ""}
                    >
                      <SelectTrigger id="contactInfo.city">
                        <SelectValue>{city || "Select city"}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        <SelectItem value="Chicago">Chicago</SelectItem>
                        <SelectItem value="Houston">Houston</SelectItem>
                        <SelectItem value="Phoenix">Phoenix</SelectItem>
                        <SelectItem value="Philadelphia">Philadelphia</SelectItem>
                        <SelectItem value="San Antonio">San Antonio</SelectItem>
                        <SelectItem value="San Diego">San Diego</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.contactInfo?.city && <p className="text-sm text-red-500">{errors.contactInfo.city.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactInfo.completeAddress">
                  Complete Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="contactInfo.completeAddress"
                  {...register("contactInfo.completeAddress")}
                  placeholder="Enter your company's full address"
                />
                {errors.contactInfo?.completeAddress && (
                  <p className="text-sm text-red-500">{errors.contactInfo.completeAddress.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Card */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>Connect your company&apos;s social media accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Facebook className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <Label htmlFor="socialLinks.facebook">Facebook</Label>
                  <Input
                    id="socialLinks.facebook"
                    {...register("socialLinks.facebook")}
                    placeholder="Facebook profile URL"
                  />
                  {errors.socialLinks?.facebook && (
                    <p className="text-sm text-red-500">{errors.socialLinks.facebook.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Twitter className="h-5 w-5 text-blue-400" />
                <div className="flex-1">
                  <Label htmlFor="socialLinks.twitter">Twitter</Label>
                  <Input
                    id="socialLinks.twitter"
                    {...register("socialLinks.twitter")}
                    placeholder="https://twitter.com/yourcompany"
                  />
                  {errors.socialLinks?.twitter && (
                    <p className="text-sm text-red-500">{errors.socialLinks.twitter.message}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin className="h-5 w-5 text-blue-800" />
                <div className="flex-1">
                  <Label htmlFor="socialLinks.linkedIn">LinkedIn</Label>
                  <Input
                    id="socialLinks.linkedIn"
                    {...register("socialLinks.linkedIn")}
                    placeholder="https://www.linkedin.com/company/yourcompany"
                  />
                  {errors.socialLinks?.linkedIn && (
                    <p className="text-sm text-red-500">{errors.socialLinks.linkedIn.message}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Instagram className="h-5 w-5 text-pink-500" />
                <div className="flex-1">
                  <Label htmlFor="socialLinks.instagram">Instagram</Label>
                  <Input
                    id="socialLinks.instagram"
                    {...register("socialLinks.instagram")}
                    placeholder="https://www.instagram.com/yourcompany"
                  />
                  {errors.socialLinks?.instagram && (
                    <p className="text-sm text-red-500">{errors.socialLinks.instagram.message}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={profileMutation.isPending || isUploading}>
            {profileMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
