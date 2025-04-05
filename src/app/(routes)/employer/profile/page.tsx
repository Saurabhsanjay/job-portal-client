"use client"

import * as React from "react"
import { Building2, Facebook, Twitter, Linkedin, Instagram, Sparkles, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApiPut, useApiGet } from "@/hooks/use-api-query"
import type { EmployerProfile, EmployerProfileResponse } from "@/types/api"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/app/(providers)/AuthContext"

// Validation schema using zod
const benefitSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const phoneNumberSchema = z.object({
  countryCode: z.string(),
  number: z.string(),
})

const socialLinksSchema = z.object({
  linkedIn: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  facebook: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  instagram: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
})

const contactInfoSchema = z.object({
  country: z.string(),
  state: z.string(),
  city: z.string(),
  completeAddress: z.string(),
})

const employerProfileSchema = z.object({
  companyName: z.string(),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: phoneNumberSchema,
  website: z.string().url("Please enter a valid URL"),
  logoUrl: z.string().optional(),
  establishedYear: z.string(), // We'll handle the Date conversion in the form submission
  companySize: z.string(),
  industry: z.string(),
  allowInSearch: z.boolean().default(true),
  companyDescription: z.string(),
  benefitsAndPerks: z.array(benefitSchema),
  socialLinks: socialLinksSchema,
  contactInfo: contactInfoSchema,
})

type FormValues = z.infer<typeof employerProfileSchema>

export default function CompanyProfile() {
  const [logo, setLogo] = React.useState<string | null>(null)
  const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>([])
  const { toast } = useToast()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(employerProfileSchema),
    defaultValues: {
      companyName: "",
      email: "",
      phoneNumber: {
        countryCode: "",
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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setLogo(result)
        // Update the form value for logoUrl
        setValue("logoUrl", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const {
    data: profileData,
    isLoading,
    error,
  } = useApiGet<UserProfile>(
    "users/get-profile",
    user?.id ? { userId: user.id } : null,
    [user?.id, "user-profile"], // Query key for caching
  )

  React.useEffect(() => {
    if (profileData?.data && !isLoading) {
      const { employerDetails } = profileData.data

      // Set form values from the API response
      setValue("companyName", employerDetails.companyName || "")
      setValue("email", employerDetails.email || "")
      setValue("phoneNumber", {
        countryCode: employerDetails.phoneNumber?.countryCode || "+1",
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
      setValue("industry", employerDetails.industry || "")
      setValue("allowInSearch", employerDetails.allowInSearch || false)
      setValue("companyDescription", employerDetails.companyDescription || "")

      // Set benefits and perks
      if (employerDetails.benefitsAndPerks && employerDetails.benefitsAndPerks.length > 0) {
        setValue("benefitsAndPerks", employerDetails.benefitsAndPerks)
      }

      // Set social links
      setValue("socialLinks", {
        linkedIn: employerDetails.socialLinks?.linkedIn || "",
        facebook: employerDetails.socialLinks?.facebook || "",
        twitter: employerDetails.socialLinks?.twitter || "",
        instagram: employerDetails.socialLinks?.instagram || "",
      })

      // Set contact info
      setValue("contactInfo", {
        country: employerDetails.contactInfo?.country || "",
        state: employerDetails.contactInfo?.state || "",
        city: employerDetails.contactInfo?.city || "",
        completeAddress: employerDetails.contactInfo?.completeAddress || "",
      })
    }
  }, [profileData, isLoading, setValue])

  console.log(errors, "EROR")

  // Use the API post hook
  const profileMutation = useApiPut<EmployerProfileResponse, EmployerProfile>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted with data:", data)
    const formattedData = {
      employerDetails: data,
      role: "EMPLOYER",
      id: user?.id,
    }
    profileMutation.mutate(
      {
        endpoint: "users/update-profile",
        payload: formattedData,
        invalidateQueries: [["employer-profile"]],
      },
      {
        onSuccess: (response) => {
          if (response.data) {
            toast({
              title: "Success",
              description: "Employer profile created successfully",
            })
            reset()
          } else if (response.error) {
            toast({
              title: "Error",
              description: response.error.message,
              variant: "destructive",
            })
          }
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to create employer profile",
            variant: "destructive",
          })
        },
      },
    )
  }

  return (
    <div className="space-y-4 bg-gray-50 md:p-0  rounded-xl">
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
              <Label>Company Logo</Label>
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
                </div>
              </div>
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
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" {...register("companyName")} />
                {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone</Label>
                <div className="flex space-x-2">
                  <Input id="countryCode" className="w-24" placeholder="+1" {...register("phoneNumber.countryCode")} />
                  <Input
                    id="phoneNumber"
                    className="flex-1"
                    placeholder="Phone number"
                    {...register("phoneNumber.number")}
                  />
                </div>
                {(errors.phoneNumber?.countryCode || errors.phoneNumber?.number) && (
                  <p className="text-sm text-red-500">Please enter a valid phone number</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" {...register("website")} placeholder="https://" />
                {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input id="establishedYear" type="date" {...register("establishedYear")} placeholder="YYYY-MM-DD" />
                {errors.establishedYear && <p className="text-sm text-red-500">{errors.establishedYear.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
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

            <div className="space-y-2">
              <Label htmlFor="industry">Industy</Label>
              <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
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
              {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
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
                <Label htmlFor="contactInfo.country">Country</Label>
                <Controller
                  name="contactInfo.country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="contactInfo.country">
                        <SelectValue placeholder="Select country" />
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
                <Label htmlFor="contactInfo.state">State/Province</Label>
                <Controller
                  name="contactInfo.state"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="contactInfo.state">
                        <SelectValue placeholder="Select state" />
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
                <Label htmlFor="contactInfo.city">City</Label>
                <Controller
                  name="contactInfo.city"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="contactInfo.city">
                        <SelectValue placeholder="Select city" />
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
                <Label htmlFor="contactInfo.completeAddress">Complete Address</Label>
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
                <Input
                  id="socialLinks.facebook"
                  {...register("socialLinks.facebook")}
                  placeholder="Facebook profile URL"
                />
                {errors.socialLinks?.facebook && (
                  <p className="text-sm text-red-500">{errors.socialLinks.facebook.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <Twitter className="h-5 w-5 text-blue-400" />
                <Input
                  id="socialLinks.twitter"
                  {...register("socialLinks.twitter")}
                  placeholder="https://twitter.com/yourcompany"
                />
                {errors.socialLinks?.twitter && (
                  <p className="text-sm text-red-500">{errors.socialLinks.twitter.message}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin className="h-5 w-5 text-blue-800" />
                <Input
                  id="socialLinks.linkedIn"
                  {...register("socialLinks.linkedIn")}
                  placeholder="https://www.linkedin.com/company/yourcompany"
                />
                {errors.socialLinks?.linkedIn && (
                  <p className="text-sm text-red-500">{errors.socialLinks.linkedIn.message}</p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <Instagram className="h-5 w-5 text-pink-500" />
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
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={profileMutation.isPending}>
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

