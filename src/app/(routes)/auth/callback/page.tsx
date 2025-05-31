"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { handleOAuthCallback } from "@/lib/auth"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const processCallback = async () => {
      try {
        const result = await handleOAuthCallback()

        if (result.success) {
          setStatus("success")
          setMessage("Authentication successful! Redirecting...")

          // Redirect based on user role or to dashboard
          const userType = result.user?.role === "JOBSEEKER" ? "candidate" : "recruiter"
          setTimeout(() => {
            router.push(`/dashboard?userType=${userType}`)
          }, 2000)
        } else {
          setStatus("error")
          setMessage(result.message || "Authentication failed")
        }
      } catch (error) {
        setStatus("error")
        setMessage("An unexpected error occurred")
      }
    }

    processCallback()
  }, [router])

  const handleRetry = () => {
    router.push("/auth/register")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">
            {status === "loading" && "Processing Authentication..."}
            {status === "success" && "Welcome!"}
            {status === "error" && "Authentication Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-gray-600">Please wait while we complete your authentication...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center space-y-4">
              <XCircle className="h-8 w-8 text-red-600" />
              <p className="text-sm text-gray-600">{message}</p>
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
