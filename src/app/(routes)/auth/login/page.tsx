"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { EyeIcon, EyeOffIcon, Loader2, Users, Building2, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/app/(providers)/AuthContext"
import { useIsMobile } from "@/hooks/use-mobile"

export type UserType = "candidate" | "recruiter"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  rememberMe: z.boolean().default(false).optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const userTypeParam = (searchParams.get("userType") as UserType) || "candidate"
  const { login } = useAuth()
  const router = useRouter()
  const isMobile = useIsMobile()

  const isCandidate = userTypeParam === "candidate"
  const pageTitle = isCandidate ? "Job-Seeker" : "Employer"
  const pageDescription = isCandidate ? "Access your job search dashboard" : "Manage your hiring process"

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setLoginError(null)
    try {
      await login(data?.email, data?.password)
      if (isMobile) {
        router.push("/mobile/dashboard")
      } else if (userTypeParam === "candidate") {
        router.push("/job-seeker/dashboard")
      } else {
        router.push("/employer/dashboard")
      }
    } catch (error) {
      setLoginError("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
              <div className="space-y-1">
                <h1 className="text-lg font-bold text-gray-900">Welcome Back</h1>
                <p className="text-xs text-gray-600">{pageDescription}</p>
              </div>
            </div>

            {/* User Type Toggle */}
            <div className="flex items-center justify-center gap-1 mt-3 p-1 bg-gray-100 rounded-lg">
              <Link
                href="/auth/login?userType=candidate"
                className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  isCandidate ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Users className="h-3 w-3 mx-auto mb-0.5" />
                Job-Seeker
              </Link>
              <Link
                href="/auth/login?userType=recruiter"
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
            {/* Error Message */}
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`bg-gray-50 border-gray-200 text-sm h-9 transition-all duration-200 ${
                    isCandidate
                      ? "focus:border-blue-300 focus:ring-blue-500/20"
                      : "focus:border-emerald-300 focus:ring-emerald-500/20"
                  }`}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label htmlFor="password" className="text-xs font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={`bg-gray-50 border-gray-200 text-sm h-9 pr-10 transition-all duration-200 ${
                      isCandidate
                        ? "focus:border-blue-300 focus:ring-blue-500/20"
                        : "focus:border-emerald-300 focus:ring-emerald-500/20"
                    }`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOffIcon className="h-3 w-3" /> : <EyeIcon className="h-3 w-3" />}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        className="h-3 w-3"
                      />
                    )}
                  />
                  <label htmlFor="rememberMe" className="text-xs text-gray-600 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                className={`w-full text-sm h-9 font-medium shadow-md hover:shadow-lg transition-all duration-200 ${
                  isCandidate
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              variant="outline"
              className="w-full h-9 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm"
              type="button"
              onClick={() => signIn("google")}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4 text-red-500" viewBox="0 0 488 512">
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href={`/auth/register?userType=${userTypeParam}`}
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
