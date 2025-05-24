"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import CandidateForm from "./candidate-form"
import RecruiterForm from "./recruiter-form"
import { useSearchParams } from "next/navigation"
import { Users, Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export type UserType = "candidate" | "recruiter"

export default function RegisterForm() {
  const searchParams = useSearchParams()
  const userTypeParam = (searchParams.get("userType") as UserType) || "candidate"

  const isCandidate = userTypeParam === "candidate"
  const pageTitle = isCandidate ? "Job-Seeker" : "Employer"
  const pageDescription = isCandidate
    ? "Find your dream job with top companies"
    : "Hire the best talent for your company"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-slate-100/30 rounded-full blur-2xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <div className="mb-4">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800 p-0 h-auto text-xs">
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* Logo */}
            <div className="flex justify-center mb-3">
              <div className="bg-blue-600 rounded-lg p-2">
              <Image
                src="/recruitg.png"
                alt="Recruit-G"
                width={140}
                  height={40}
                  className="h-6 w-auto transition-transform duration-200 group-hover:scale-105"
              />
              </div>
            </div>

            {/* Page Type Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                {isCandidate ? (
                  <Users className="h-4 w-4 text-blue-600" />
                ) : (
                  <Building2 className="h-4 w-4 text-emerald-600" />
                )}
                <Badge
                  variant="secondary"
                  className={`px-2 py-1 text-xs font-medium ${
                    isCandidate
                      ? "bg-blue-100 text-blue-700 border-blue-200"
                      : "bg-emerald-100 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {pageTitle} Registration
                </Badge>
              </div>

              <div className="space-y-1">
                <h1 className="text-lg font-bold text-gray-900">Create Your {pageTitle} Account</h1>
                <p className="text-xs text-gray-600">{pageDescription}</p>
              </div>
            </div>

            {/* User Type Toggle */}
            <div className="flex items-center justify-center gap-1 mt-3 p-1 bg-gray-100 rounded-lg">
              <Link
                href="/auth/register?userType=candidate"
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  isCandidate ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Users className="h-3 w-3 mx-auto mb-0.5" />
                Job-Seeker
              </Link>
              <Link
                href="/auth/register?userType=recruiter"
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  !isCandidate ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Building2 className="h-3 w-3 mx-auto mb-0.5" />
                Employer
              </Link>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {/* Form Content */}
            {isCandidate ? <CandidateForm /> : <RecruiterForm />}

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-600">
                Already have an account?{" "}
                <Link
                  href={`/auth/login?userType=${userTypeParam}`}
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
