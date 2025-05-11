"use client"
import {
  Facebook,
  Instagram,
  MapPin,
  Globe,
  Phone,
  Mail,
  Users,
  Calendar,
  Linkedin,
  Twitter,
  Briefcase,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useApiGet } from "@/hooks/use-api-query"
import { useAuth } from "@/app/(providers)/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

interface UserProfile {
  status: string
  statusCode: number
  message: string
  formattedMessage: string
  data: {
    personalDetails: {
      lastName: string
      email: string
      password: string
      languages: any[]
    }
    employerDetails: {
      phoneNumber: {
        countryCode: string
        number: string
      }
      socialLinks: {
        linkedIn: string
        facebook: string
        twitter: string
        instagram: string
      }
      contactInfo: {
        country: string
        state: string
        city: string
        completeAddress: string
      }
      companyName: string
      email: string
      website: string
      logoUrl: string
      establishedYear: string
      companySize: string
      industry: string
      allowInSearch: boolean
      companyDescription: string
      benefitsAndPerks: Array<{
        title: string
        description: string
        _id: string
      }>
    }
    activityDetails: {
      accountStatus: string
      lastLogin: string
      accountCreationDate: string
    }
    _id: string
    role: string
    socialLogins: any[]
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export default function CompanyProfilePreviewPage() {
  const { user } = useAuth()
  const {
    data: profileData,
    isLoading,
    error,
  } = useApiGet<UserProfile>(
    "users/get-profile",
    user?.id ? { userId: user.id } : null,
    [user?.id, "user-profile"], // Query key for caching
  )

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-48 w-full rounded-xl mb-6" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-48 w-full rounded-xl mb-6" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !profileData) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto border-none shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 mb-6 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-3">Error Loading Profile</h2>
            <p className="text-muted-foreground mb-6">
              {error instanceof Error ? error.message : "Unable to load company profile data. Please try again later."}
            </p>
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const employer = profileData.data.employerDetails

  // Format phone number
  const formattedPhone = employer.phoneNumber
    ? `${employer.phoneNumber.countryCode ?? ""} ${employer.phoneNumber.number}`
    : "Not provided"

  // Format established year
  const establishedYear = employer.establishedYear ? new Date(employer.establishedYear).getFullYear() : "Not specified"

  // Format location
  const location = employer.contactInfo
    ? `${employer.contactInfo.city}, ${employer.contactInfo.country}`
    : "Location not specified"

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      {/* <div className="w-full bg-gradient-to-r from-blue-600 to-blue-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold mb-2">{employer.companyName}</h1>
            <p className="text-blue-100">{employer.industry || "Company Profile"}</p>
          </div>
        </div>
      </div> */}

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Company Card */}
        <Card className="mb-8 border shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Company Logo Section */}
              <div className="w-full md:w-1/3 bg-blue-50 p-6 flex flex-col items-center justify-center">
                <Avatar className="w-32 h-32 rounded-xl border-4 border-white shadow-md bg-white">
                  <AvatarImage src={employer.logoUrl || "/placeholder.svg"} alt={employer.companyName} />
                  <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                    {employer.companyName?.substring(0, 1) || "C"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mt-4 text-center">{employer.companyName}</h2>
                <Badge className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                  {employer.industry || "Industry not specified"}
                </Badge>

                <div className="flex gap-2 mt-6">
                  {employer.website && (
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <a href={employer.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {employer.socialLinks?.linkedIn && (
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <a href={employer.socialLinks.linkedIn} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {employer.socialLinks?.facebook && (
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <a href={employer.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                        <Facebook className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {employer.socialLinks?.twitter && (
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <a href={employer.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {employer.socialLinks?.instagram && (
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <a href={employer.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Company Info Section */}
              <div className="w-full md:w-2/3 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <p>{location}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Company Size</p>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      <p>{employer.companySize || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-600" />
                      <p>{employer.email || profileData.data.personalDetails.email}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-600" />
                      <p>{formattedPhone}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Established</p>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <p>{establishedYear}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                      <p>
                        {new Date(profileData.data.activityDetails.accountCreationDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {employer.contactInfo?.completeAddress && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p>{employer.contactInfo.completeAddress}</p>
                  </div>
                )}

                {employer.website && (
                  <div className="mt-6">
                    <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                      <a href={employer.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="border shadow-md overflow-hidden">
              <CardHeader className="bg-blue-50 border-b py-4">
                <CardTitle className="text-xl font-semibold text-blue-800">About {employer.companyName}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {employer.companyDescription || "No company description provided."}
                </p>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            {employer.benefitsAndPerks && employer.benefitsAndPerks.length > 0 && (
              <Card className="border shadow-md overflow-hidden">
                <CardHeader className="bg-blue-50 border-b py-4">
                  <CardTitle className="text-xl font-semibold text-blue-800">Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {employer.benefitsAndPerks.map((benefit, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border bg-white hover:border-blue-200 transition-colors"
                      >
                        <h3 className="font-medium text-blue-700 mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Company Stats */}
            <Card className="border shadow-md overflow-hidden">
              <CardHeader className="bg-blue-50 border-b py-4">
                <CardTitle className="text-xl font-semibold text-blue-800">Company Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="flex justify-between items-center p-4">
                    <span className="text-muted-foreground">Industry</span>
                    <span className="font-medium">{employer.industry || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <span className="text-muted-foreground">Company Size</span>
                    <span className="font-medium">{employer.companySize || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <span className="text-muted-foreground">Established</span>
                    <span className="font-medium">{establishedYear}</span>
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">
                      {new Date(profileData.data.activityDetails.accountCreationDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border shadow-md overflow-hidden">
              <CardHeader className="bg-blue-50 border-b py-4">
                <CardTitle className="text-xl font-semibold text-blue-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{employer.email || profileData.data.personalDetails.email}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{formattedPhone}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                    <span>{employer.contactInfo?.completeAddress || "Address not provided"}</span>
                  </div>
                  {employer.website && (
                    <>
                      <Separator />
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 mr-3 text-blue-600" />
                        <a
                          href={employer.website}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {employer.website.replace(/(^\w+:|^)\/\//, "")}
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

