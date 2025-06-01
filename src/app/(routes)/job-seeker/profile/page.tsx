"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Upload } from 'lucide-react'
import { useEffect, useState } from "react"
import Education from "./_components/Education"
import WorkExperience from "./_components/WorkExperience"
import * as z from "zod"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApiGet, useApiPut } from "@/hooks/use-api-query"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import toast from "react-hot-toast"
import { useAuth } from "@/app/(providers)/AuthContext"
import axios from "axios"

export default function Profile() {
  const { user } = useAuth()

  // Options for dropdowns
  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
  ]

  const maritalStatusOptions = [
    { value: "SINGLE", label: "Single" },
    { value: "MARRIED", label: "Married" },
    { value: "DIVORCED", label: "Divorced" },
    { value: "WIDOWED", label: "Widowed" },
  ]

  const physicalDisabilityOptions = [
    { value: "YES", label: "Yes" },
    { value: "NO", label: "No" },
  ]

  const visaStatusOptions = [
    { value: "CITIZEN", label: "Citizen" },
    { value: "PERMANENT_RESIDENT", label: "Permanent Resident" },
    { value: "WORK_VISA", label: "Work Visa" },
    { value: "STUDENT_VISA", label: "Student Visa" },
    { value: "OTHER", label: "Other" },
  ]

  const nationalityOptions = [
    { value: "INDIAN", label: "Indian" },
    { value: "AMERICAN", label: "American" },
    { value: "BRITISH", label: "British" },
    { value: "CANADIAN", label: "Canadian" },
    { value: "AUSTRALIAN", label: "Australian" },
    { value: "KUWAITI", label: "Kuwaiti" },
    { value: "OMANI", label: "Omani" },
    { value: "QATARI", label: "Qatari" },
    { value: "SAUDI_ARABIAN", label: "Saudi Arabian" },
    { value: "EMIRATI", label: "Emirati (UAE)" },
    { value: "AFGHAN", label: "Afghan" },
    { value: "ALBANIAN", label: "Albanian" },
    { value: "ANDORRAN", label: "Andorran" },
    { value: "ANGOLAN", label: "Angolan" },
    { value: "ARGENTINE", label: "Argentine" },
    { value: "ARMENIAN", label: "Armenian" },
    { value: "OTHER", label: "Other" },
  ]

  const employmentTypeOptions = [
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "CONTRACT", label: "Contract" },
    { value: "FREELANCE", label: "Freelance" },
    { value: "PERMANENT", label: "Permanent" },
    { value: "FRESHER", label: "Fresher" },
    { value: "INTERNSHIP", label: "Internship" },
  ]

  const industryOptions = [
    { value: "IT", label: "Information Technology" },
    { value: "FINANCE", label: "Finance" },
    { value: "HEALTHCARE", label: "Healthcare" },
    { value: "EDUCATION", label: "Education" },
    { value: "MANUFACTURING", label: "Manufacturing" },
    { value: "RETAIL", label: "Retail" },
    { value: "CONSULTING", label: "Consulting" },
  ]

  const jobTypeOptions = [
    { value: "PERMANENT", label: "Permanent" },
    { value: "CONTRACT", label: "Contract" },
    { value: "TEMPORARY", label: "Temporary" },
    { value: "INTERNSHIP", label: "Internship" },
  ]

  const shiftPreferenceOptions = [
    { value: "DAY", label: "Day Shift" },
    { value: "NIGHT", label: "Night Shift" },
    { value: "FLEXIBLE", label: "Flexible" },
    { value: "ROTATIONAL", label: "Rotational" },
  ]

  const jobLevelOptions = [
    { value: "ENTRY", label: "Entry Level" },
    { value: "JUNIOR", label: "Junior Level" },
    { value: "MID", label: "Mid Level" },
    { value: "SENIOR", label: "Senior Level" },
    { value: "LEAD", label: "Lead" },
    { value: "MANAGER", label: "Manager" },
    { value: "DIRECTOR", label: "Director" },
  ]

  const languageOptions = [
    { value: "ENGLISH", label: "English" },
    { value: "HINDI", label: "Hindi" },
    { value: "SPANISH", label: "Spanish" },
    { value: "FRENCH", label: "French" },
    { value: "GERMAN", label: "German" },
    { value: "CHINESE", label: "Chinese" },
    { value: "JAPANESE", label: "Japanese" },
  ]

  const proficiencyOptions = [
    { value: "BASIC", label: "Basic" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
    { value: "NATIVE", label: "Native" },
  ]

  const skillsList = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
  ]

  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [hasWorkExperience, setHasWorkExperience] = useState<boolean>(false)
  const [willingToRelocate, setWillingToRelocate] = useState<boolean>(false)

  // State for dynamic sections
  const [educations, setEducations] = useState([])
  const [experiences, setExperiences] = useState([])
  const [languagesProficiency, setLanguagesProficiency] = useState([{ language: "", proficiency: "" }])
  const [uploadResume, setUploadResume] = useState<string | null>(null)
  const [uploadPhoto, setUploadPhoto] = useState<string | null>(null)
  const [uploadCertificates, setUploadCertificates] = useState<string | null>(null)

  // Enhanced form validation schema
  const profileSchema = z.object({
    // Basic Information - Mandatory fields
    fullName: z.string().min(1, "Full name is required"),
    mobileNo: z.string().min(10, "Valid mobile number is required"),
    alternateMobileNo: z.string().optional(),
    email: z.string().email("Valid email address is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    maritalStatus: z.string().min(1, "Marital status is required"),
    physicalDisability: z.string().min(1, "Physical disability status is required"),
    visaStatus: z.string().min(1, "Visa status is required"),
    nationality: z.string().min(1, "Nationality is required"),

    // Location Details - Mandatory fields
    currentLocation: z.string().min(1, "Current location is required"),
    preferredJobLocations: z.array(z.string()).min(1, "At least one preferred location is required"),

    // Professional Summary
    profileHeadline: z.string().optional(),
    professionalSummary: z.string().optional(),

    // Work Experience
    hasWorkExperience: z.boolean(),

    // Education Details - Mandatory fields
    highestQualification: z.string().min(1, "Highest qualification is required"),
    specialization: z.string().min(1, "Specialization is required"),
    universityInstitute: z.string().min(1, "University/Institute is required"),
    yearOfPassing: z.string().min(1, "Year of passing is required"),
    marksCGPA: z.string().min(1, "Marks/CGPA is required"),

    // Key Skills - Mandatory
    skills: z.array(z.string()).min(1, "At least one skill is required"),

    // Desired Job Preferences - Mandatory fields
    preferredIndustry: z.array(z.string()).min(1, "Preferred industry is required"),
    preferredJobRole: z.string().min(1, "Preferred job role is required"),
    expectedSalary: z.number().min(1, "Expected salary is required"),
    preferredJobType: z.string().min(1, "Preferred job type is required"),
    shiftPreference: z.string().min(1, "Shift preference is required"),
    jobLevel: z.string().min(1, "Job level is required"),

    // Languages Known - Mandatory
    languagesKnown: z
      .array(
        z.object({
          language: z.string().min(1, "Language is required"),
          proficiency: z.string().min(1, "Proficiency is required"),
        }),
      )
      .min(1, "At least one language is required"),

    // Resume & Documentation - Update these fields
    uploadResume: z.string().nullable().optional(),
    uploadPhoto: z.string().nullable().optional(),
    uploadCertificates: z.string().nullable().optional(),

    // Social & Portfolio Links
    linkedinProfile: z.string().optional(),
    portfolio: z.string().optional(),
    personalWebsite: z.string().optional(),

    // Address fields
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
  })

  type FormValues = z.infer<typeof profileSchema>

  // Fetch profile data
  const {
    data: profileData,
    isLoading,
    error,
  } = useApiGet("users/get-profile", user?.id ? { userId: user.id } : null, [user?.id, "user-profile"])

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    defaultValues: {
      hasWorkExperience: false,
      languagesKnown: [{ language: "", proficiency: "" }],
      preferredJobLocations: [],
      skills: [],
      preferredIndustry: [],
      uploadResume: "",
      uploadPhoto: "",
      uploadCertificates: "",
    },
  })

  const formValues = watch()

  // Update form when profile data is loaded
  useEffect(() => {
    if (profileData) {
      const data = profileData?.data
      setEducations(data?.jobSeekerDetails?.education || [])
      setExperiences(data?.jobSeekerDetails?.professionalExperience || [])
      // Reset form with existing data
      reset({
        fullName: `${data?.personalDetails?.firstName || ""} ${data?.personalDetails?.lastName || ""}`.trim(),
        email: data?.personalDetails?.email || "",
        mobileNo: data?.personalDetails?.phoneNumber?.number || "",
        dateOfBirth: data?.personalDetails?.dateOfBirth || "",
        gender: data?.personalDetails?.gender || "",
        maritalStatus: data?.personalDetails?.maritalStatus || "",
        physicalDisability: data?.personalDetails?.physicalDisability || "",
        visaStatus: data?.personalDetails?.visaStatus || "",
        nationality: data?.personalDetails?.nationality || "",
        currentLocation: data?.jobSeekerDetails?.locationDetails?.currentLocation || "",
        preferredJobLocations: data?.jobSeekerDetails?.locationDetails?.preferredJobLocations || [],
        profileHeadline: data?.jobSeekerDetails?.professionalSummary?.profileHeadline || "",
        professionalSummary: data?.jobSeekerDetails?.professionalSummary?.professionalSummary || "",
        skills: data?.jobSeekerDetails?.keySkills || [],
        preferredIndustry: data?.jobSeekerDetails?.jobPreferences?.preferredIndustry || [],
        preferredJobRole: data?.jobSeekerDetails?.jobPreferences?.preferredJobRole || "",
        expectedSalary: data?.jobSeekerDetails?.jobPreferences?.expectedSalary || 0,
        preferredJobType: data?.jobSeekerDetails?.jobPreferences?.preferredJobType || "",
        shiftPreference: data?.jobSeekerDetails?.jobPreferences?.shiftPreference || "",
        jobLevel: data?.jobSeekerDetails?.jobPreferences?.jobLevel || "",
        languagesKnown: data?.jobSeekerDetails?.languagesKnown || [{ language: "", proficiency: "" }],
        linkedinProfile: data?.jobSeekerDetails?.socialPortfolioLinks?.linkedinProfile || "",
        portfolio: data?.jobSeekerDetails?.socialPortfolioLinks?.portfolio || "",
        personalWebsite: data?.jobSeekerDetails?.socialPortfolioLinks?.personalWebsite || "",
      })

      setProfileImage(data?.personalDetails?.profilePicture || null)
      setUploadResume(data?.jobSeekerDetails?.resumeDocumentation?.uploadResume || null)
      setUploadPhoto(data?.jobSeekerDetails?.resumeDocumentation?.uploadPhoto || null)
      setUploadCertificates(data?.jobSeekerDetails?.resumeDocumentation?.uploadCertificates || null)
    }
  }, [profileData, reset])

  const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/upload-profile-picture?userId=${user?.id}`,
        formData,
        config,
      )

      if (response?.data?.status === "SUCCESS") {
        toast.success("Profile image uploaded successfully")
        setProfileImage(response.data?.data?.personalDetails?.profilePicture || null)
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      toast.error("Failed to upload image")
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "uploadResume" | "uploadPhoto" | "uploadCertificates",
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  
    try {
      // Fix the API endpoint URL construction
      let endpoint = "";
      switch(type) {
        case "uploadResume":
          endpoint = "upload-resume";
          break;
        case "uploadPhoto":
          endpoint = "upload-photo";
          break;
        case "uploadCertificates":
          endpoint = "upload-certificates";
          break;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${endpoint}?userId=${user?.id}`,
        formData,
        config,
      );
  
      if (response?.data?.status === "SUCCESS") {
        toast.success(`${type.replace("upload", "")} uploaded successfully`);
        const fileUrl = response.data?.data?.fileUrl || response.data?.data?.[type] || file.name;

        // Store response value in different states based on type
        if (type === "uploadResume") {
          setUploadResume(fileUrl);
        } else if (type === "uploadPhoto") {
          setUploadPhoto(fileUrl);
        } else if (type === "uploadCertificates") {
          setUploadCertificates(fileUrl);
        }
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type.replace("upload", "")}`);
    }
  };
  

  const profileMutation = useApiPut()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted with data:", data)
    setIsSubmitting(true)

    // Split full name into first and last name
    const nameParts = data.fullName.split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || ""

    const payload = {
      id: user?.id,
      role: "JOBSEEKER",
      personalDetails: {
        firstName,
        lastName,
        email: data.email,
        phoneNumber: {
          countryCode: "+91",
          number: data.mobileNo,
        },
        alternateMobileNo: data.alternateMobileNo || "",
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        physicalDisability: data.physicalDisability,
        visaStatus: data.visaStatus,
        nationality: data.nationality,
        profilePicture: profileImage || "",
        address: {
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          zipCode: data.zipCode || "",
        },
      },
      jobSeekerDetails: {
        locationDetails: {
          currentLocation: data.currentLocation,
          preferredJobLocations: data.preferredJobLocations,
          willingToRelocate,
        },
        professionalSummary: {
          profileHeadline: data.profileHeadline || "",
          professionalSummary: data.professionalSummary || "",
        },
        education: educations,
        professionalExperience: experiences,
        keySkills: data.skills,
        jobPreferences: {
          preferredIndustry: data.preferredIndustry,
          preferredJobRole: data.preferredJobRole,
          expectedSalary: data.expectedSalary,
          preferredJobType: data.preferredJobType,
          shiftPreference: data.shiftPreference,
          jobLevel: data.jobLevel,
        },
        languagesKnown: data.languagesKnown,
        resumeDocumentation: {
          uploadResume: uploadResume || "",
          uploadPhoto: uploadPhoto || "",
          uploadCertificates: uploadCertificates || "",
        },
        socialPortfolioLinks: {
          linkedinProfile: data.linkedinProfile || "",
          portfolio: data.portfolio || "",
          personalWebsite: data.personalWebsite || "",
        },
      },
      activityDetails: {
        lastLogin: new Date(),
        accountStatus: "ACTIVE",
      },
    }

    console.log("Payload being sent:", payload); // Add this for debugging

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
          } else if (response.error) {
            toast.error(response?.error?.message || "Something went wrong")
          }
        },
        onError: (error) => {
          setIsSubmitting(false)
          console.error("Form submission error:", error); // Add this for debugging
          toast.error(error?.message || "Something went wrong")
        },
      },
    )
  }

  const addLanguage = () => {
    setLanguagesProficiency([...languagesProficiency, { language: "", proficiency: "" }])
  }

  const removeLanguage = (index: number) => {
    const updated = languagesProficiency.filter((_, i) => i !== index)
    setLanguagesProficiency(updated)
    setValue("languagesKnown", updated)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 flex-col">
        <p className="text-red-500">Error loading profile: {error.message}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Information */}
        <Card className="p-6">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>
              <Button type="submit" disabled={isSubmitting}>
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

            {/* Profile Image Upload */}
            <div className="space-y-1">
              <Label>Profile Photo</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <div
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="mx-auto flex flex-col items-center cursor-pointer"
                >
                  {profileImage ? (
                    <div className="mb-4 h-24 w-24 rounded-full overflow-hidden">
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <Upload className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                  <div className="text-sm">Browse Photo</div>
                  <div className="mt-2 text-xs text-gray-500">
                    Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg & .png
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageUpload}
                  />
                </div>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter Full Name"
                  {...register("fullName")}
                  className={errors?.fullName ? "border-red-500" : ""}
                />
                {errors?.fullName && <p className="text-red-500 text-sm">{errors.fullName?.message}</p>}
              </div>

              {/* Mobile No - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="mobileNo">Mobile No. (OTP Verified) *</Label>
                <Input
                  id="mobileNo"
                  type="tel"
                  placeholder="Enter Mobile Number"
                  {...register("mobileNo")}
                  className={errors?.mobileNo ? "border-red-500" : ""}
                />
                {errors?.mobileNo && <p className="text-red-500 text-sm">{errors.mobileNo?.message}</p>}
              </div>

              {/* Alternate Mobile No */}
              <div className="space-y-1">
                <Label htmlFor="alternateMobileNo">Alternate Mobile No.</Label>
                <Input
                  id="alternateMobileNo"
                  type="tel"
                  placeholder="Enter Alternate Mobile Number"
                  {...register("alternateMobileNo")}
                />
              </div>

              {/* Email Address - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  {...register("email")}
                  className={errors?.email ? "border-red-500" : ""}
                />
                {errors?.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
              </div>

              {/* Date of Birth - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className={errors?.dateOfBirth ? "border-red-500" : ""}
                />
                {errors?.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth?.message}</p>}
              </div>

              {/* Gender - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="gender">Gender *</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors?.gender ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.gender && <p className="text-red-500 text-sm">{errors.gender?.message}</p>}
              </div>

              {/* Marital Status - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="maritalStatus">Marital Status *</Label>
                <Controller
                  name="maritalStatus"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors?.maritalStatus ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Marital Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {maritalStatusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus?.message}</p>}
              </div>

              {/* Physical Disability - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="physicalDisability">Physical Disability *</Label>
                <Controller
                  name="physicalDisability"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors?.physicalDisability ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Physical Disability Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {physicalDisabilityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.physicalDisability && (
                  <p className="text-red-500 text-sm">{errors.physicalDisability?.message}</p>
                )}
              </div>

              {/* Visa Status - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="visaStatus">Visa Status (for Current Location) *</Label>
                <Controller
                  name="visaStatus"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors?.visaStatus ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Visa Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {visaStatusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.visaStatus && <p className="text-red-500 text-sm">{errors.visaStatus?.message}</p>}
              </div>

              {/* Nationality - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="nationality">Nationality *</Label>
                <Controller
                  name="nationality"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors?.nationality ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {nationalityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.nationality && <p className="text-red-500 text-sm">{errors.nationality?.message}</p>}
              </div>
            </div>
          </div>
        </Card>

        {/* Location Details */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Location Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Location - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="currentLocation">Current Location *</Label>
                <Input
                  id="currentLocation"
                  placeholder="Enter Current Location"
                  {...register("currentLocation")}
                  className={errors?.currentLocation ? "border-red-500" : ""}
                />
                {errors?.currentLocation && <p className="text-red-500 text-sm">{errors.currentLocation?.message}</p>}
              </div>

              {/* Preferred Job Locations - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="preferredJobLocations">Preferred Job Locations *</Label>
                <Controller
                  name="preferredJobLocations"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={[
                        { value: "mumbai", label: "Mumbai" },
                        { value: "delhi", label: "Delhi" },
                        { value: "bangalore", label: "Bangalore" },
                        { value: "hyderabad", label: "Hyderabad" },
                        { value: "pune", label: "Pune" },
                        { value: "chennai", label: "Chennai" },
                      ]}
                      onValueChange={field.onChange}
                      value={field.value || []}
                      placeholder="Select preferred locations"
                      variant="inverted"
                      animation={0}
                      maxCount={3}
                    />
                  )}
                />
                {errors?.preferredJobLocations && (
                  <p className="text-red-500 text-sm">{errors.preferredJobLocations?.message}</p>
                )}
              </div>

              {/* Willing to Relocate */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Checkbox id="willingToRelocate" checked={willingToRelocate} onCheckedChange={setWillingToRelocate} />
                  <Label htmlFor="willingToRelocate">Willing to Relocate?</Label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Professional Summary */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
            <div className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="profileHeadline">Profile Headline</Label>
                <Input
                  id="profileHeadline"
                  placeholder="Enter a brief profile headline"
                  {...register("profileHeadline")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="professionalSummary">Professional Summary</Label>
                <Textarea
                  id="professionalSummary"
                  placeholder="Write a brief professional summary"
                  rows={4}
                  {...register("professionalSummary")}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Work Experience */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
            <div className="space-y-1">
              <Label>Do you have any Experience? *</Label>
              <Controller
                name="hasWorkExperience"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => {
                      const hasExp = value === "yes"
                      setHasWorkExperience(hasExp)
                      field.onChange(hasExp)
                    }}
                    value={field.value ? "yes" : "no"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Experience Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
      {hasWorkExperience && <WorkExperience experiences={experiences} setExperiences={setExperiences} />}
        </Card>


      <Education educations={educations} setEducations={setEducations} />

        {/* Key Skills */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Key Skills</h2>
            <div className="space-y-1">
              <Label htmlFor="skills">Skills *</Label>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={skillsList}
                    onValueChange={(values) => {
                      setSelectedSkills(values)
                      field.onChange(values)
                    }}
                    value={selectedSkills}
                    placeholder="Select skills by suggestion based"
                    variant="inverted"
                    animation={0}
                    maxCount={5}
                  />
                )}
              />
              {errors?.skills && <p className="text-red-500 text-sm">{errors.skills?.message}</p>}
            </div>
          </div>
        </Card>

        {/* Desired Job Preferences */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Desired Job Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preferred Industry - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="preferredIndustry">Preferred Industry *</Label>
                <Controller
                  name="preferredIndustry"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={industryOptions}
                      onValueChange={(values) => {
                        setSelectedIndustries(values)
                        field.onChange(values)
                      }}
                      value={selectedIndustries}
                      placeholder="Select preferred industries"
                      variant="inverted"
                      animation={0}
                      maxCount={3}
                    />
                  )}
                />
                {errors?.preferredIndustry && (
                  <p className="text-red-500 text-sm">{errors.preferredIndustry?.message}</p>
                )}
              </div>

              {/* Preferred Job Role - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="preferredJobRole">Preferred Job Role *</Label>
                <Input
                  id="preferredJobRole"
                  placeholder="Enter Preferred Job Role"
                  {...register("preferredJobRole")}
                  className={errors?.preferredJobRole ? "border-red-500" : ""}
                />
                {errors?.preferredJobRole && <p className="text-red-500 text-sm">{errors.preferredJobRole?.message}</p>}
              </div>

              {/* Expected Salary - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="expectedSalary">Expected Salary *</Label>
                <Input
                  id="expectedSalary"
                  type="number"
                  placeholder="Enter Expected Salary"
                  {...register("expectedSalary", { valueAsNumber: true })}
                  className={errors?.expectedSalary ? "border-red-500" : ""}
                />
                {errors?.expectedSalary && <p className="text-red-500 text-sm">{errors.expectedSalary?.message}</p>}
              </div>

              {/* Preferred Job Type - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="preferredJobType">Preferred Job Type *</Label>
                <Controller
                  name="preferredJobType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors?.preferredJobType ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.preferredJobType && <p className="text-red-500 text-sm">{errors.preferredJobType?.message}</p>}
              </div>

              {/* Shift Preference - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="shiftPreference">Shift Preference *</Label>
                <Controller
                  name="shiftPreference"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors?.shiftPreference ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Shift Preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {shiftPreferenceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.shiftPreference && <p className="text-red-500 text-sm">{errors.shiftPreference?.message}</p>}
              </div>

              {/* Job Level - Mandatory */}
              <div className="space-y-1">
                <Label htmlFor="jobLevel">Job Level *</Label>
                <Controller
                  name="jobLevel"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className={errors?.jobLevel ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select Job Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobLevelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.jobLevel && <p className="text-red-500 text-sm">{errors.jobLevel?.message}</p>}
              </div>
            </div>
          </div>
        </Card>

        {/* Languages Known */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Languages Known</h2>
              <Button type="button" variant="outline" onClick={addLanguage}>
                Add Language
              </Button>
            </div>
            <div className="space-y-4">
              {languagesProficiency.map((lang, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-1">
                    <Label>Language *</Label>
                    <Select
                      onValueChange={(value) => {
                        const updated = [...languagesProficiency]
                        updated[index].language = value
                        setLanguagesProficiency(updated)
                        setValue("languagesKnown", updated)
                      }}
                      value={lang.language}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Proficiency *</Label>
                    <Select
                      onValueChange={(value) => {
                        const updated = [...languagesProficiency]
                        updated[index].proficiency = value
                        setLanguagesProficiency(updated)
                        setValue("languagesKnown", updated)
                      }}
                      value={lang.proficiency}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    {languagesProficiency.length > 1 && (
                      <Button type="button" variant="destructive" onClick={() => removeLanguage(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {errors?.languagesKnown && <p className="text-red-500 text-sm">{errors.languagesKnown?.message}</p>}
            </div>
          </div>
        </Card>

        {/* Resume & Documentation */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Resume & Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Upload Resume - Mandatory */}
              <div className="space-y-1">
          <Label htmlFor="uploadResume">Upload Resume</Label>
          <Input
            id="uploadResume"
            type="file"
            accept=".pdf"
            onChange={(event) => handleFileUpload(event, "uploadResume")}
          />
              </div>

              {/* Upload Photo */}
              <div className="space-y-1">
          <Label htmlFor="uploadPhoto">Upload Photo</Label>
          <Input
            id="uploadPhoto"
            type="file"
            accept="image/*"
            onChange={(event) => handleFileUpload(event, "uploadPhoto")}
          />
              </div>

              {/* Upload Certificates */}
              <div className="space-y-1">
          <Label htmlFor="uploadCertificates">Upload Certificates</Label>
          <Input
            id="uploadCertificates"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={(event) => handleFileUpload(event, "uploadCertificates")}
          />
              </div>
            </div>
          </div>
        </Card>

        {/* Social & Portfolio Links */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Social & Portfolio Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                <Input id="linkedinProfile" placeholder="Enter LinkedIn URL" {...register("linkedinProfile")} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input id="portfolio" placeholder="Enter Portfolio URL" {...register("portfolio")} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="personalWebsite">Personal Website</Label>
                <Input id="personalWebsite" placeholder="Enter Website URL" {...register("personalWebsite")} />
              </div>
            </div>
          </div>
        </Card>
      </form>


    </div>
  )
}