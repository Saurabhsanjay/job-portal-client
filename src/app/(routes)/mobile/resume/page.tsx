"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Eye, Trash2, AlertCircle, Loader2 } from "lucide-react"
import { useAuth } from "@/app/(providers)/AuthContext"
import { useApiGet } from "@/hooks/use-api-query"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios from "axios"
import toast from "react-hot-toast"

interface UserProfile {
  data: {
    jobSeekerDetails: {
      professionalDetails: {
        resume: {
          url: string | File | null
          isVerified: boolean
          isPublic: boolean
        }
      }
    }
  }
}

export default function MobileResume() {
  const { user } = useAuth()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [savedResumeUrl, setSavedResumeUrl] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const { data: profileData, refetch } = useApiGet<UserProfile>(
    user?.id ? "users/get-profile" : "",
    user?.id ? { userId: user.id } : undefined,
    user?.id ? ["user-profile", user.id] : [],
  )

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
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

    if (!uploadedFile) {
      toast.error("Please select a file to upload")
      setLoading(false)
      return
    }

    // Create FormData object
    const formData = new FormData()
    formData.append("file", uploadedFile)
    formData.append("isVerified", isVerified.toString())
    formData.append("isPublic", isPublic.toString())

    // Make the Axios request
    axios
      .post(
        `http://localhost:8080/api/users/upload-resume?userId=${user?.id}&isVerified=${isVerified}&isPublic=${isPublic}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        toast.success("Resume uploaded successfully!")
      })
      .catch((error) => {
        toast.error("Failed to upload resume. Please try again.")
      })
      .finally(() => {
        setLoading(false)
        refetch() // Refetch profile data to get the updated resume URL
      })
  }

  const handleRemoveResume = () => {
    // Here you would typically call an API to remove the resume
    setSavedResumeUrl(null)
    toast.success("Resume removed successfully")
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">My Resume</h1>

      {/* Resume Upload */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedResumeUrl ? (
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-md">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium">My Resume.pdf</p>
                  <p className="text-xs text-gray-500">Uploaded resume</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={() => window.open(savedResumeUrl, "_blank")}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={handleRemoveResume}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center"
              onClick={() => document.getElementById("resume-upload")?.click()}
            >
              {uploadedFile ? (
                <div>
                  <div className="p-3 bg-blue-50 rounded-full inline-flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={(e) => {
                      e.stopPropagation()
                      setUploadedFile(null)
                    }}
                  >
                    Select Different File
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="p-3 bg-gray-100 rounded-full inline-flex items-center justify-center mb-3">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="font-medium">Upload Resume</p>
                  <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                </div>
              )}
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          )}

          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="searchable" checked={isVerified} onCheckedChange={(checked) => setIsVerified(!!checked)} />
              <Label htmlFor="searchable">Make my resume searchable for employers</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="public" checked={isPublic} onCheckedChange={(checked) => setIsPublic(!!checked)} />
              <Label htmlFor="public">Allow my resume to be visible in public search results</Label>
            </div>
          </div>

          {uploadedFile && (
            <Button className="w-full" onClick={handleSaveChanges} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Save Resume"
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Resume Tips */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Resume Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start">
            <div className="bg-blue-50 p-1 rounded-full mr-3">
              <span className="text-blue-600 font-medium text-sm">1</span>
            </div>
            <p className="text-sm">Keep your resume concise and focused on relevant experience.</p>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-50 p-1 rounded-full mr-3">
              <span className="text-blue-600 font-medium text-sm">2</span>
            </div>
            <p className="text-sm">Quantify your achievements with numbers and metrics when possible.</p>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-50 p-1 rounded-full mr-3">
              <span className="text-blue-600 font-medium text-sm">3</span>
            </div>
            <p className="text-sm">Tailor your resume for each job application to highlight relevant skills.</p>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-50 p-1 rounded-full mr-3">
              <span className="text-blue-600 font-medium text-sm">4</span>
            </div>
            <p className="text-sm">Use keywords from the job description to pass through ATS systems.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
