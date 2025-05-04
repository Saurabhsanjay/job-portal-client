"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Mail,
  Lock,
  LogOut,
  Trash2,
  ChevronRight,
  Edit,
  Upload,
  Briefcase,
  MapPin,
  Phone,
  Calendar,
  Award,
  School,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/app/(providers)/AuthContext"
import { useApiGet } from "@/hooks/use-api-query"
import { Separator } from "@/components/ui/separator"

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
      education: any[]
      professionalExperience: any[]
      achivements: any[]
      professionalDetails: {
        currentJobTitle: string
        skills: string[]
        noticePeriod: string
        currentCTC: number
        expectedCTC: number
        employmentType: string
        website: string
        linkedIn: string
        facebook: string
        portfolio: string
      }
    }
  }
}

export default function MobileProfile() {
  const router = useRouter()
  const { user } = useAuth()
  const [profileCompleteness, setProfileCompleteness] = useState(75)

  const { data: profileData, isLoading } = useApiGet<UserProfile>(
    "users/get-profile",
    user?.id ? { userId: user.id } : null,
    [user?.id, "user-profile"],
  )

  const personalDetails = profileData?.data?.personalDetails
  const jobSeekerDetails = profileData?.data?.jobSeekerDetails

  const navigateTo = (path: string) => {
    router.push(`/mobile/${path}`)
  }

  const menuItems = [
    {
      name: "Edit Profile",
      icon: Edit,
      action: () => navigateTo("update-profile"),
      color: "text-blue-600",
    },
    {
      name: "My Resume",
      icon: FileText,
      action: () => navigateTo("resume"),
      color: "text-green-600",
    },
    {
      name: "Change Password",
      icon: Lock,
      action: () => navigateTo("change-password"),
      color: "text-orange-600",
    },
    {
      name: "Logout",
      icon: LogOut,
      action: () => navigateTo("logout"),
      color: "text-gray-600",
    },
    {
      name: "Delete Account",
      icon: Trash2,
      action: () => navigateTo("delete-account"),
      color: "text-red-600",
    },
  ]

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse">
          <div className="h-24 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 scroll-y max-h-[calc(100vh-200px)] overflow-y-auto">
      {/* Profile Header */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage
                  src={personalDetails?.profilePicture || "/placeholder.svg"}
                  alt={`${personalDetails?.firstName} ${personalDetails?.lastName}`}
                />
                <AvatarFallback>
                  {personalDetails?.firstName?.[0]}
                  {personalDetails?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md"
                onClick={() => navigateTo("profile/edit")}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>

            <h1 className="text-xl font-bold mt-4">
              {personalDetails?.firstName} {personalDetails?.lastName}
            </h1>

            <p className="text-gray-600 mt-1">
              {jobSeekerDetails?.professionalDetails?.currentJobTitle || "Job Title Not Set"}
            </p>

            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">
                {personalDetails?.address?.city || "Location Not Set"},{personalDetails?.address?.country || ""}
              </span>
            </div>

            <div className="w-full mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Profile Completeness</span>
                <span>{profileCompleteness}%</span>
              </div>
              <Progress value={profileCompleteness} className="h-2" />
            </div>

            <Button className="w-full mt-4" onClick={() => navigateTo("profile/edit")}>
              Complete Your Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Professional Info */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Professional Info</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start">
            <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Current Position</h3>
              <p className="text-sm text-gray-600">
                {jobSeekerDetails?.professionalDetails?.currentJobTitle || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Experience</h3>
              <p className="text-sm text-gray-600">{jobSeekerDetails?.professionalExperience?.length || 0} years</p>
            </div>
          </div>

          <div className="flex items-start">
            <Award className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Skills</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {jobSeekerDetails?.professionalDetails?.skills?.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                )) || "No skills added"}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <School className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Education</h3>
              <p className="text-sm text-gray-600">
                {jobSeekerDetails?.education?.length
                  ? `${jobSeekerDetails.education.length} education entries`
                  : "No education added"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Contact Info</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-gray-600">{personalDetails?.email || "Not specified"}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-sm text-gray-600">
                {personalDetails?.phoneNumber?.number
                  ? `${personalDetails.phoneNumber.countryCode || "+"} ${personalDetails.phoneNumber.number}`
                  : "Not specified"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card className="bg-white">
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <div key={index}>
              {index > 0 && <Separator />}
              <button
                className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50"
                onClick={item.action}
              >
                <div className="flex items-center">
                  <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                  <span className={item.name === "Delete Account" ? "text-red-600" : ""}>{item.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
