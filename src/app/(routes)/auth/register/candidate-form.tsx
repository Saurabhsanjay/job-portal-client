"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRegisterCandidate } from "@/services/userService"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"

const candidateSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
  role: z.string().default("JOBSEEKER"),
})

type CandidateFormValues = z.infer<typeof candidateSchema>
export type UserType = "candidate" | "recruiter"

export default function CandidateForm() {
  const [showPassword, setShowPassword] = useState(false)
  const registerMutation = useRegisterCandidate()
  const router = useRouter()
  const searchParams = useSearchParams()
  const userTypeParam = (searchParams.get("userType") as UserType) || "candidate"

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CandidateFormValues>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
      role: "JOBSEEKER",
    },
  })

  useEffect(() => {
    if (registerMutation.isSuccess) {
      toast.success("Account created successfully!")
      reset()
      router.push(`/auth/login?userType=${userTypeParam}`)
    }
  }, [registerMutation.isSuccess, router, reset, userTypeParam])

  const onSubmit = (data: CandidateFormValues) => {
    const { terms, ...userData } = data
    registerMutation.mutate(userData)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="firstName" className="text-xs">
              First Name
            </Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="firstName"
                  placeholder="John"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20 text-sm h-9"
                />
              )}
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName" className="text-xs">
              Last Name
            </Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="lastName"
                  placeholder="Doe"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20 text-sm h-9"
                />
              )}
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs">
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                className="bg-white focus:ring-2 focus:ring-blue-500/20 text-sm h-9"
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs">
            Password
          </Label>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20 text-sm h-9 pr-10"
                />
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className="h-3 w-3" /> : <EyeIcon className="h-3 w-3" />}
            </Button>
          </div>
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        {/* Terms */}
        <div className="flex items-start space-x-2 py-2">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} className="mt-0.5" />
            )}
          />
          <label htmlFor="terms_conditions" className="text-xs leading-4">
            I agree to the{" "}
            <a href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-9"
          type="submit"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Creating Account..." : "Create Job-Seeker Account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Google Button */}
      <Button variant="outline" className="w-full text-sm h-9" type="button">
        <svg className="mr-2 h-4 w-4" viewBox="0 0 488 512">
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          />
        </svg>
        Continue with Google
      </Button>

      {/* Error/Success Messages */}
      {registerMutation.isError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-xs">Error: {registerMutation.error.message}</div>
      )}
    </div>
  )
}
