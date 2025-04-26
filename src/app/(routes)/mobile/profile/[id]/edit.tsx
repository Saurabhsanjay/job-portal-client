"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2, Upload, User, Phone, Mail, MapPin, Briefcase, Calendar } from "lucide-react"
import { useAuth } from "@/app/(providers)/AuthContext"
import { useApiGet, useApiPut } from "@/hooks/use-api-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import toast from "react-hot-toast"

interface UserProfile {
  data: {
    personalDetails: {
      firstName: string
      lastName: string
      email: string
      phoneNumber: {
        countryCode: string
        number: string
      }
      profilePicture: string
      gender: string
      age: string
      address: {
        street: string
        city: string
        state: string
        country: string
        zipCode: string
      }
      bio: string
      languages: string[]
    }
    jobSeekerDetails: {
      professionalDetails: {
        currentJobTitle: string
        skills: string[]
        noticePeriod: string
        currentCTC: number
        expectedCTC: number
        employmentType: string
      }
    }
  }
}

export default function MobileEditProfile() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    // Personal details
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    age: "",
    bio: "",

    // Address
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",

    // Professional details
    currentJobTitle: "",
    employmentType: "",
    noticePeriod: "",
    currentCTC: 0,
    expectedCTC: 0,
  })

  const { data: profileData, isLoading } = useApiGet<UserProfile>(
    "users/get-profile",
    user?.id ? { userId: user.id } : null,
    [user?.id, "user-profile"],
  )

  useEffect(() => {
    if (profileData) {
      const data = profileData?.data

      setFormData({
        firstName: data?.personalDetails?.firstName || "",
        lastName: data?.personalDetails?.lastName || "",
        email: data?.personalDetails?.email || "",
        phoneNumber: data?.personalDetails?.phoneNumber?.number || "",
        gender: data?.personalDetails?.gender || "",
        age: data?.personalDetails?.age || "",
        bio: data?.personalDetails?.bio || "",

        street: data?.personalDetails?.address?.street || "",
        city: data?.personalDetails?.address?.city || "",
        state: data?.personalDetails?.address?.state || "",
        country: data?.personalDetails?.address?.country || "",
        zipCode: data?.personalDetails?.address?.zipCode || "",

        currentJobTitle: data?.jobSeekerDetails?.professionalDetails?.currentJobTitle || "",
        employmentType: data?.jobSeekerDetails?.professionalDetails?.employmentType || "",
        noticePeriod: data?.jobSeekerDetails?.professionalDetails?.noticePeriod || "",
        currentCTC: data?.jobSeekerDetails?.professionalDetails?.currentCTC || 0,
        expectedCTC: data?.jobSeekerDetails?.professionalDetails?.expectedCTC || 0,
      })

      if (data?.personalDetails?.profilePicture) {
        setProfileImage(data.personalDetails.profilePicture)
      }
    }
  }, [profileData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const profileMutation = useApiPut<any, any>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = {
      id: user?.id,
      personalDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: "",
        phoneNumber: {
          countryCode: "+91",
          number: formData.phoneNumber,
        },
        age: formData.age,
        gender: formData.gender,
        bio: formData.bio,
        profilePicture: profileImage || "",
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zipCode,
        },
        languages: [],
      },
      jobSeekerDetails: {
        professionalDetails: {
          currentJobTitle: formData.currentJobTitle,
          noticePeriod: formData.noticePeriod,
          currentCTC: formData.currentCTC,
          expectedCTC: formData.expectedCTC,
          employmentType: formData.employmentType,
        },
      },
    }

    profileMutation.mutate(
      {
        endpoint: "users/update-profile",
        payload: payload,
        invalidateQueries: [["user-profile"]],
      },
      {
        onSuccess: (response) => {
          setIsSubmitting(false)
          if (response.data) {
            toast.success("Profile updated successfully")
            setTimeout(() => router.push("/mobile/profile"), 1500)
          } else if (response.error) {
            toast.error(response?.error?.message || "Something went wrong")
          }
        },
        onError: (error) => {
          setIsSubmitting(false)
          toast.error(error?.message || "Something went wrong")
        },
      },
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
        <span>Loading profile data...</span>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/mobile/profile")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Image */}
        <Card className="bg-white mb-4">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback>
                  {formData.firstName?.[0]}
                  {formData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer"
              >
                <Upload className="h-4 w-4" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageUpload}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Tap to upload a new photo</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
          </TabsList>

          {/* Personal Details Tab */}
          <TabsContent value="personal">
            <Card className="bg-white">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <Label htmlFor="firstName">First Name</Label>
                  </div>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-2" />
                    <Label htmlFor="lastName">Last Name</Label>
                  </div>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                  </div>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age Group</Label>
                  <Select value={formData.age} onValueChange={(value) => handleSelectChange("age", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-22">18-22 Years</SelectItem>
                      <SelectItem value="23-27">23-27 Years</SelectItem>
                      <SelectItem value="28-32">28-32 Years</SelectItem>
                      <SelectItem value="33+">33+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value="address">
            <Card className="bg-white">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <Label htmlFor="street">Street Address</Label>
                  </div>
                  <Input
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Enter street address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter zip code"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Tab */}
          <TabsContent value="professional">
            <Card className="bg-white">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
                    <Label htmlFor="currentJobTitle">Current Job Title</Label>
                  </div>
                  <Input
                    id="currentJobTitle"
                    name="currentJobTitle"
                    value={formData.currentJobTitle}
                    onChange={handleInputChange}
                    placeholder="Enter job title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select
                    value={formData.employmentType}
                    onValueChange={(value) => handleSelectChange("employmentType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                      <SelectItem value="FREELANCE">Freelance</SelectItem>
                      <SelectItem value="PERMANENT">Permanent</SelectItem>
                      <SelectItem value="FRESHER">Fresher</SelectItem>
                      <SelectItem value="INTERNSHIP">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <Label htmlFor="noticePeriod">Notice Period</Label>
                  </div>
                  <Input
                    id="noticePeriod"
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                    placeholder="Enter notice period"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentCTC">Current CTC (per annum)</Label>
                  <Input
                    id="currentCTC"
                    name="currentCTC"
                    type="number"
                    value={formData.currentCTC.toString()}
                    onChange={handleInputChange}
                    placeholder="Enter current CTC"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedCTC">Expected CTC (per annum)</Label>
                  <Input
                    id="expectedCTC"
                    name="expectedCTC"
                    type="number"
                    value={formData.expectedCTC.toString()}
                    onChange={handleInputChange}
                    placeholder="Enter expected CTC"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/mobile/profile")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
