/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, Eye, X, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { useApiGet } from "@/hooks/use-api-query";
import { useAuth } from "@/app/(providers)/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

interface UserProfile {
  data: {
    jobSeekerDetails: {
      professionalDetails: {
        resume: {
          url: string | File | null;
          isVerified: boolean;
          isPublic: boolean;
        };
      };
    };
  };
}

//   type UploadResumePayload = FormData;

export default function Resume() {
  const [lastUpdated] = useState(new Date()); // Simulates a backend date
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // Stores the uploaded file
  const [savedResumeUrl, setSavedResumeUrl] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Stores validation error
  const { user } = useAuth();

  const { data: profileData, refetch } = useApiGet<UserProfile>(
    user?.id ? "users/get-profile" : "",
    user?.id ? { userId: user.id } : undefined,
    user?.id ? ["user-profile", user.id] : []
  );

  useEffect(() => {
    if (profileData?.data?.jobSeekerDetails?.professionalDetails?.resume) {
      const resume = profileData?.data?.jobSeekerDetails?.professionalDetails?.resume
      setIsVerified(resume?.isVerified)
      setIsPublic(resume?.isPublic)

      // If resume URL is a string, it's from the API
      if (typeof resume?.url === "string") {
        setSavedResumeUrl(resume.url)
        setUploadedFile(null) // Clear any locally uploaded file
      }
    }
  }, [profileData])

  // const uploadResumeMutation = useApiPost<ApiResponse, UploadResumePayload>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0]
    if (!file) return

    const allowedFormats = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    const maxSize = 5 * 1024 * 1024 // 5MB

    // Validate file format
    if (!allowedFormats.includes(file.type)) {
      setErrorMessage("Unsupported file format. Only PDF, DOC, and DOCX are allowed.")
      setUploadedFile(null)
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      setErrorMessage("File size exceeds the 5MB limit.")
      setUploadedFile(null)
      return
    }

    // If valid, update the state
    setUploadedFile(file)
    setErrorMessage("")
  }


   const handleSaveChanges = () => {
    setLoading(true)
    console.log("Uploaded file:", uploadedFile)

    if (!uploadedFile) {
      console.error("No file selected")
      setLoading(false)
      return
    }

    // Create FormData object
    const formData = new FormData()
    formData.append("file", uploadedFile)
    formData.append("isVerified", isVerified.toString())

    // Debugging FormData contents
    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }

    // Axios configuration
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

    // Make the Axios request
    axios
      .post(
        `http://localhost:8080/api/users/upload-resume?userId=${user?.id}&isVerified=${isVerified}&isPublic=${isPublic}`,
        formData,
        config,
      )
      .then((response) => {
        console.log("Upload successful:", response.data)
        toast.success("Resume uploaded successfully!")
        // After successful upload, refetch to get the updated URL
      })
      .catch((error) => {
        console.error("Upload failed:", error)
        toast.error("Failed to upload resume. Please try again.")
        // setErrorMessage("Failed to upload resume. Please try again.")
        // Handle error case here
      })
      .finally(() => {
        setLoading(false)
        refetch() // Refetch profile data to get the updated resume URL
      })
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
  }

  const handleRemoveSavedResume = () => {
    // Here you would typically call an API to remove the resume
    // For now, we'll just clear the state
    setSavedResumeUrl(null)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                My Resume
              </h2>
              {/* <p className="text-sm text-gray-500 mt-1">
                Last updated: {format(lastUpdated, "MMM d, yyyy 'at' h:mm a")}
              </p> */}
            </div>
            <div className="flex gap-3">
              {/* <Button variant="outline">Cancel</Button> */}
              {/* <Button onClick={handleSaveChanges}>Save Changes</Button> */}
            </div>
          </div>


          {/* Resume Upload Section */}
          <div className="space-y-4">
            <Label>Upload Resume</Label>

            {/* Show saved resume from API if it exists */}
            {savedResumeUrl ? (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-md">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Resume.pdf</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(savedResumeUrl, "_blank")}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={handleRemoveSavedResume}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Show upload interface when no saved resume exists
              <div className="border-2 border-dashed border-gray-200 rounded-lg">
                <div className="p-8">
                  <div className="mx-auto flex flex-col items-center">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                      onChange={handleFileUpload}
                    />

                    {/* Show selected file in a small box if one is selected */}
                    {uploadedFile ? (
                      <div className="w-full mb-4">
                        <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700 ">{uploadedFile.name}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleRemoveFile}>
                            <X className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <label htmlFor="resume-upload" className="flex flex-col items-center cursor-pointer">
                        <div className="mb-4">
                          <Upload className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          Drop your resume here or click to browse
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Supported formats: PDF, DOC, DOCX (Max file size: 5MB)
                        </div>
                      </label>
                    )}

                    {/* Always show the label for uploading/changing file */}
                    {uploadedFile && (
                      <label
                        htmlFor="resume-upload"
                        className="text-xs text-primary hover:underline cursor-pointer mt-2"
                      >
                        Choose a different file
                      </label>
                    )}
                  </div>
                  {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Resume Privacy */}
          <div className="space-y-4">
            <Label>Resume Privacy</Label>
            <Alert variant="destructive" className="flex items-start ">
              <AlertCircle className="h-4 w-4 self-start" />
              <AlertDescription className="mt-1">
                Your resume will be visible to employers when you apply for
                jobs. You can control additional visibility settings below.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="searchable"
                  className="rounded border-gray-300"
                  checked={isVerified}
                  onCheckedChange={(checked) => setIsVerified(!!checked)}
                />
                <Label htmlFor="searchable" className="text-sm font-normal">
                  Make my resume searchable for employers
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="public"
                  className="rounded border-gray-300"
                  checked={isPublic}
                  onCheckedChange={(checked) => setIsPublic(!!checked)}
                />
                <Label htmlFor="public" className="text-sm font-normal">
                  Allow my resume to be visible in public search results
                </Label>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            {/* <Button variant="outline">Cancel</Button> */}
            <Button disabled={loading} onClick={handleSaveChanges}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
