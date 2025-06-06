"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { initiateGoogleAuth } from "@/lib/auth"
import { Loader2 } from "lucide-react"

interface GoogleAuthButtonProps {
  role: "JOBSEEKER" | "EMPLOYER"
  disabled?: boolean
}

export default function GoogleAuthButton({ role, disabled }: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true)
      initiateGoogleAuth(role)
    } catch (error) {
      console.error("Google auth error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full text-sm h-9"
      type="button"
      onClick={handleGoogleAuth}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 488 512">
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          Continue with Google
        </>
      )}
    </Button>
  )
}
