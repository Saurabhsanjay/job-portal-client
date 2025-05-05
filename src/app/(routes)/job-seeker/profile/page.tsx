"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import Education from "./_components/Education";
import WorkExperience from "./_components/WorkExperience";
import AchievementsAndCertifications from "./_components/Achivements";
import * as z from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiGet, useApiPut } from "@/hooks/use-api-query";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/app/(providers)/AuthContext";
import axios from "axios";

export default function Profile() {
  // const { toast } = useToast();
  const { user } = useAuth();
  console.log("user", user);

  const frameworksList = [
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "ember", label: "Ember" },
  ];

  const skillsList = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "node", label: "Node.js" },
  ];

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  interface Education {
    id: number;
    degree: string;
    institution: string;
    qualification: string;
    startDate: string;
    endDate: string;
    description: string;
  }

  interface WorkExperience {
    id: number;
    companyName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    keyAchievements: string;
  }

  interface AchievementOrCertification {
    id: number;
    title: string;
    organization: string;
    date: string;
    description: string;
  }

  const [educations, setEducations] = useState<Education[]>([
    // {
    //     id: 1,
    //     degree: "Bachelors in Fine Arts",
    //     institution: "Modern College",
    //     startDate: "2012-09-01",
    //     endDate: "2014-06-30",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    // },
    // {
    //     id: 2,
    //     degree: "Computer Science",
    //     institution: "Harvard University",
    //     startDate: "2008-09-01",
    //     endDate: "2012-05-30",
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    // },
  ]);

  const [experiences, setExperiences] = useState<WorkExperience[]>([
    // {
    //     id: 1,
    //     companyName: "Meta",
    //     jobTitle: "Software Engineer",
    //     startDate: "2020-01-01",
    //     endDate: "2022-01-01",
    //     keyAchievements:
    //         "Designed and developed multiple features for the Facebook news feed, including a new ranking algorithm that improved user engagement by 10%.",
    // },
    // {
    //     id: 2,
    //     companyName: "Google",
    //     jobTitle: "Software Engineer",
    //     startDate: "2018-01-01",
    //     endDate: "2020-01-01",
    //     keyAchievements:
    //         "Worked on the Google Maps team, focusing on improving the accuracy of location-based services. Contributed to a 20% increase in location accuracy.",
    // },
    // {
    //     id: 3,
    //     companyName: "Amazon",
    //     jobTitle: "Software Engineer",
    //     startDate: "2015-01-01",
    //     endDate: "2018-01-01",
    //     keyAchievements:
    //         "Developed multiple features for the Amazon Alexa virtual assistant, including a new skill that integrated with the Amazon Echo smart speaker.",
    // },
  ]);

  const [achievements, setAchievements] = useState<
    AchievementOrCertification[]
  >([
    // {
    //     id: 1,
    //     title: "Certified Java Developer",
    //     organization: "Oracle",
    //     date: "2021-05-15",
    //     description: "Achieved certification in Java programming."
    // },
    // {
    //     id: 2,
    //     title: "AWS Certified Solutions Architect",
    //     organization: "Amazon",
    //     date: "2022-08-10",
    //     description: "Certification in architecting AWS solutions."
    // }
  ]);

  interface UserProfile {
    data: {
      personalDetails: {
        firstName: string;
        lastName: string;
        email: string;
        // dateOfBirth: string;
        phoneNumber: {
          countryCode: string;
          number: string;
        };
        profilePicture: string;
        gender: string;
        age: string;
        address: {
          street: string;
          city: string;
          state: string;
          country: string;
          zipCode: string;
        };
        bio: string;
        languages: string[];
      };
      jobSeekerDetails: {
        education: [
          {
            qualification: string;
            specialization: string;
            institutionName: string;
            yearOfGraduation: number;
            certifications: [
              {
                name: string;
                date: Date;
              }
            ];
          }
        ];
        achivements: [
          {
            title: string;
            organization: string;
            issuedDate: Date;
            description: string;
          }
        ];
        professionalExperience: [
          {
            companyName: string;
            jobTitle: string;
            startDate: Date;
            endDate: Date;
            keyAchievements: string;
          }
        ];
        professionalDetails: {
          currentJobTitle: string;
          // currentEmployer: string;
          // totalExperience: number;
          skills: string[];
          // resume: string;
          // keyAchievements: string;
          noticePeriod: string;
          currentCTC: number;
          expectedCTC: number;
          employmentType: string;
          website: string;
          linkedIn: string;
          facebook: string;
          portfolio: string;
          address: {
            street: string;
            city: { type: string };
            state: { type: string };
            country: { type: string };
            zipCode: { type: string };
          };
        };
      };
    };
  }

  // Form validation schema based on the API response structure
  const profileSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    currentJobTitle: z.string().min(1, "Job title is required"),
    email: z.string().email("Invalid email address"),
    currentCTC: z.number().optional(),
    expectedCTC: z.number().optional(),
    totalExperience: z.number().optional(),
    age: z.string().optional(),
    languages: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    companyWebsite: z.string().optional(),
    linkedin: z.string().optional(),
    facebook: z.string().optional(),
    portfolio: z.string().optional(),
    education: z.array(z.string()).optional(),
    phoneNumber: z.string().optional(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
    gender: z.string().optional(),
    employmentType: z.string().optional(),
    noticePeriod: z.string().optional(),
    jobSeekerDetails: z
      .object({
        professionalDetails: z.object({
          currentJobTitle: z.string().optional(),
          currentEmployer: z.string().optional(),
          totalExperience: z.number().optional(),
          skills: z.array(z.string()).optional(),
          resume: z.string().optional(),
          keyAchievements: z.string().optional(),
          noticePeriod: z.string().optional(),
          currentCTC: z.number().optional(),
          expectedCTC: z.number().optional(),
          employmentType: z.string().optional(),
        }),
      })
      .optional(),
  });

  type FormValues = z.infer<typeof profileSchema>;

  // Fetch profile data
  const {
    data: profileData,
    isLoading,
    error,
  } = useApiGet<UserProfile>(
    "users/get-profile",
    user?.id ? { userId: user.id } : null,
    [user?.id, "user-profile"] // Query key for caching
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      jobSeekerDetails: {
        professionalDetails: {
          currentJobTitle: "",
          currentEmployer: "",
          totalExperience: 0,
          skills: [],
          resume: "",
          keyAchievements: "",
          noticePeriod: "",
          currentCTC: 0,
          expectedCTC: 0,
          employmentType: "",
        },
      },
    },
  });

  console.log("errors", errors);

  const formValues = watch();
  console.log("form values", formValues);

  // Update form when profile data is loaded
  useEffect(() => {
    if (profileData) {
      const data = profileData?.data;
      console.log("Data in useEffect:", data);
      setEducations(data?.jobSeekerDetails?.education || []);
      setExperiences(data?.jobSeekerDetails?.professionalExperience || []);
      setAchievements(data?.jobSeekerDetails?.achivements || "");
      console.log("gender", data?.personalDetails?.gender);
      reset({
        firstName: data?.personalDetails?.firstName || "",
        lastName: data?.personalDetails?.lastName || "",
        currentJobTitle:
          data.jobSeekerDetails?.professionalDetails?.currentJobTitle || "",
        email: data?.personalDetails?.email || "",
        currentCTC: data.jobSeekerDetails?.professionalDetails?.currentCTC || 0,
        expectedCTC:
          data.jobSeekerDetails?.professionalDetails?.expectedCTC || 0,
        totalExperience:
          data.jobSeekerDetails?.professionalDetails?.totalExperience || 0,
        age: data?.personalDetails?.age || "",
        languages: data?.personalDetails?.languages || [],
        skills: data.jobSeekerDetails?.professionalDetails?.skills || [],
        companyWebsite:
          data.jobSeekerDetails?.professionalDetails?.website || "",
        linkedin: data.jobSeekerDetails?.professionalDetails?.linkedIn || "",
        facebook: data.jobSeekerDetails?.professionalDetails?.facebook || "",
        portfolio: data.jobSeekerDetails?.professionalDetails?.portfolio || "",
        // education: data?.jobSeekerDetails?.education || [],
        phoneNumber: data?.personalDetails?.phoneNumber?.number || "",
        photo: "",
        bio: data?.personalDetails?.bio || "",
        street: data?.personalDetails?.address?.street || "",
        city: data?.personalDetails?.address?.city || "",
        state: data?.personalDetails?.address?.state || "",
        country: data?.personalDetails?.address?.country || "",
        zipCode: data?.personalDetails?.address?.zipCode || "",
        employmentType:
          data?.jobSeekerDetails?.professionalDetails?.employmentType || "",
        noticePeriod:
          data.jobSeekerDetails?.professionalDetails?.noticePeriod?.toString() || "",
        gender: data?.personalDetails?.gender || "",
      });
      setProfileImage(data?.personalDetails?.profilePicture || null);
    }
  }, [profileData, reset]);

  const genderData = profileData?.data?.personalDetails?.gender || "";
  const employmentTypeData =
    profileData?.data?.jobSeekerDetails?.professionalDetails?.employmentType ||
    "";
  const ageData = profileData?.data?.personalDetails?.age || "";
  const countryData =
    profileData?.data?.personalDetails?.address?.country || "";

  const handleProfileImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setProfileImage(reader.result as string);
    //   };
    //   reader.readAsDataURL(file);
    // }

    const formData = new FormData();
    formData.append("file", file);

    // Axios configuration
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/users/upload-profile-picture?userId=${user?.id}`,
        formData,
        config
      );
      console.log("File uploaded successfully:", response.data);
      if(response?.data?.status==="SUCCESS"){
        toast.success("Profile image uploaded successfully");
      }
      setProfileImage(response.data?.data?.personalDetails?.profilePicture || null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  interface JobSeekerProfileResponse {
    id: string;
    profile: UserProfile;
    createdAt: string;
    updatedAt: string;
  }

  const profileMutation = useApiPut<JobSeekerProfileResponse, UserProfile>();

  // Helper function to remove _id from objects in an array
  const removeIdFromArray = (array) => {
    if (!array || !Array.isArray(array)) return [];
    return array.map(({ _id, id, ...rest }) => rest);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsSubmitting(true);
    console.log("Form submitted with data:", data);
    const payload = {
      id: user?.id,
      role: "JOBSEEKER",
      personalDetails: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: "",
        phoneNumber: {
          countryCode: data.phoneNumber?.countryCode || "+91",
          number: data.phoneNumber || "",
        },
        age: data.age || "",
        gender: data.gender || "",
        bio: data.bio || "",
        profilePicture: profileImage || "",
        address: {
          street: data.street || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          zipCode: data.zipCode || "",
        },
        languages: data.languages || [],
      },
      jobSeekerDetails: {
        education: removeIdFromArray(educations),
        professionalExperience: removeIdFromArray(experiences),
        achivements: removeIdFromArray(achievements),
        professionalDetails: {
          currentJobTitle: data.currentJobTitle || "",
          totalExperience: data.totalExperience || 0,
          skills: data.skills || [],
          // resume: data.resume || "",
          achivements: achievements || "",
          noticePeriod: data.noticePeriod?.toString() || "",
          currentCTC: data.currentCTC || 0,
          expectedCTC: data.expectedCTC || 0,
          employmentType: data.employmentType || "",
          website: data.companyWebsite || "",
          linkedIn: data.linkedin || "",
          facebook: data.facebook || "",
          portfolio: data.portfolio || "",
        },
        // jobPreferences: {
        //   preferredJobTitles: data.preferredJobTitles || [],
        //   preferredLocations: data.preferredLocations || [],
        //   preferredIndustries: data.preferredIndustries || [],
        //   workType: data.workType || "",
        //   expectedSalary: data.expectedSalary || 0,
        //   jobAlerts: data.jobAlerts ?? true,
        // },
      },
      activityDetails: {
        lastLogin: new Date(),
        accountStatus: "ACTIVE",
      },
    };
    console.log("payload", payload);
    profileMutation.mutate(
      {
        endpoint: "users/update-profile",
        payload: payload,
        invalidateQueries: [["user-profile"]],
      },
      {
        onSuccess: (response) => {
          setIsSubmitting(false);
          if (response.data) {
            // toast({
            //   title: "Success",
            //   description: "Job seeker profile updated successfully",
            // });
            toast.success("Profile updated successfully");
            // reset();
            // invalidateQueries([["user-profile"]]);
          } else if (response.error) {
            toast.error(response?.error?.message || "Something Went Wrong");
          }
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast.error(error?.message || "Something Went Wrong");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 flex-col">
        <p className="text-red-500">Error loading profile: {error.message}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="p-6">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                My Profile
              </h2>
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

            {/* Logo Upload */}
            {/* <div className="space-y-1">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <div className="mx-auto flex flex-col items-center">
                <div className="mb-4">
                  <Upload className="h-10 w-10 text-gray-400" />
                </div>
                <div className="text-sm">Browse Photo</div>
                <div className="mt-2 text-xs text-gray-500">
                  Max file size is 1MB, Minimum dimension: 330x300 And Suitable
                  files are .jpg & .png
                </div>
              </div>
            </div>
          </div> */}

            <div className="space-y-1">
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
                        width={24}
                        height={24}
                        priority
                        quality={100}
                        unoptimized
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
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg & .png
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
              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter First Name"
                  {...register("firstName")}
                  className={errors?.firstName ? "border-red-500" : ""}
                />
                {errors?.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter Last Name"
                  {...register("lastName")}
                  className={errors?.lastName ? "border-red-500" : ""}
                />
                {errors?.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-1">
                <Label htmlFor="gender">Gender</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={genderData}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender?.message}
                  </p>
                )}
              </div>

              {/* Job Title */}
              <div className="space-y-1">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter Job Title"
                  {...register("currentJobTitle")}
                  className={errors.currentJobTitle ? "border-red-500" : ""}
                />
                {errors?.currentJobTitle && (
                  <p className="text-red-500 text-sm">
                    {errors?.currentJobTitle.message}
                  </p>
                )}
              </div>

              {/* Employment Type */}
              <div className="space-y-1">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Controller
                  name="employmentType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={employmentTypeData}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Employment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FULL_TIME">Full Time</SelectItem>
                        <SelectItem value="PART_TIME">Part Time</SelectItem>
                        <SelectItem value="CONTRACT">Contract</SelectItem>
                        <SelectItem value="FREELANCE">Free Lance</SelectItem>
                        <SelectItem value="PERMANENT">Permanent</SelectItem>
                        <SelectItem value="FRESHER">Fresher</SelectItem>
                        <SelectItem value="INTERNSHIP">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.employmentType && (
                  <p className="text-red-500 text-sm">
                    {errors.employmentType?.message}
                  </p>
                )}
              </div>

              {/* Notice Period */}
              <div className="space-y-1">
                <Label htmlFor="noticePeriod">Notice Period(in days)</Label>
                <Input
                  min={0}
                  id="noticePeriod"
                  placeholder="EnterNotice Period"
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
                  {...register("noticePeriod")}
                  className={errors.noticePeriod ? "border-red-500" : ""}
                />
                {errors?.noticePeriod && (
                  <p className="text-red-500 text-sm">
                    {errors?.noticePeriod?.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <Label htmlFor="phoneNumber">Phone</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  {...register("phoneNumber")}
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
                  className={errors?.phoneNumber ? "border-red-500" : ""}
                />
                {errors?.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors?.phoneNumber?.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Current Salary */}
              <div className="space-y-1">
                <Label htmlFor="currentSalary">Current Salary (per annum)</Label>
                <Input
                  id="currentSalary"
                  type="number"
                  placeholder="Enter Current Salary"
                  {...register("currentCTC", { valueAsNumber: true })}
                />
              </div>

              {/* Expected Salary */}
              <div className="space-y-1">
                <Label htmlFor="expectedSalary">
                  Expected Salary (per anum)
                </Label>
                <Input
                  id="expectedSalary"
                  type="number"
                  placeholder="Enter Expected Salary"
                  {...register("expectedCTC", { valueAsNumber: true })}
                />
              </div>

              {/* Experience */}
              <div className="space-y-1">
                <Label htmlFor="experience">Experience (in years)</Label>
                <Input
                  type="number"
                  id="experience"
                  placeholder="Enter Total Experience"
                  {...register("totalExperience", {
                    valueAsNumber: true, // Ensures the value is stored as a number
                    min: { value: 0, message: "Experience must be at least 0" },
                  })}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Prevents non-numeric input
                  }}
                />
                {errors?.totalExperience && (
                  <p className="text-red-500 text-sm">
                    {errors.totalExperience?.message}
                  </p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-1">
                <Label htmlFor="age">Age</Label>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={ageData}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-22">18-22 Years</SelectItem>
                        <SelectItem value="23-27">23-27 Years</SelectItem>
                        <SelectItem value="28-32">28-32 Years</SelectItem>
                        <SelectItem value="33+">33+ Years</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors?.age && (
                  <p className="text-red-500 text-sm">{errors.age?.message}</p>
                )}
              </div>

              {/* Languages */}
              <div className="space-y-1">
                <Label htmlFor="languages">Languages</Label>
                <Controller
                  name="languages"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={frameworksList}
                      defaultValue={formValues?.languages || []}
                      onValueChange={(values) => {
                        setSelectedFrameworks(values);
                        field.onChange(values);
                      }}
                      value={selectedFrameworks}
                      placeholder="Select languages"
                      variant="inverted"
                      animation={0}
                      maxCount={3}
                    />
                  )}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="skills">Skills</Label>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={skillsList}
                      defaultValue={formValues?.skills || []}
                      onValueChange={(values) => {
                        setSelectedSkills(values);
                        field.onChange(values);
                      }}
                      value={selectedSkills}
                      placeholder="Select skills"
                      variant="inverted"
                      animation={0}
                      maxCount={3}
                    />
                  )}
                />
              </div>

              {/* Website URLs */}
              <div className="space-y-1">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="companyWebsite"
                  placeholder="Enter your website URL"
                  {...register("companyWebsite")}
                  className={errors.companyWebsite ? "border-red-500" : ""}
                />
                {errors.companyWebsite && (
                  <p className="text-red-500 text-sm">
                    {errors.companyWebsite.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="Enter your LinkedIn URL"
                  {...register("linkedin")}
                  className={errors.linkedin ? "border-red-500" : ""}
                />
                {errors.linkedin && (
                  <p className="text-red-500 text-sm">
                    {errors.linkedin.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  placeholder="Enter your Facebook URL"
                  {...register("facebook")}
                  className={errors.facebook ? "border-red-500" : ""}
                />
                {errors.facebook && (
                  <p className="text-red-500 text-sm">
                    {errors.facebook.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input
                  id="portfolio"
                  placeholder="Enter your portfolio URL"
                  {...register("portfolio")}
                  className={errors.portfolio ? "border-red-500" : ""}
                />
                {errors.portfolio && (
                  <p className="text-red-500 text-sm">
                    {errors.portfolio.message}
                  </p>
                )}
              </div>

              <div className="space-y-1 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself (max 300 chars)"
                  maxLength={300}
                  {...register("bio")}
                  className={errors.bio ? "border-red-500" : ""}
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm">{errors.bio.message}</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Address Details Card */}
        <Card className="p-6 mt-6">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Address Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="address.street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="Enter Street"
                  {...register("street")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  {...register("city")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="Enter State"
                  {...register("state")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="Enter Zipcode"
                  {...register("zipCode")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={countryData}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
      </form>

      <Education educations={educations} setEducations={setEducations} />
      <WorkExperience
        experiences={experiences}
        setExperiences={setExperiences}
      />
      <AchievementsAndCertifications
        achievements={achievements}
        setAchievements={setAchievements}
      />
    </div>
  );
}
