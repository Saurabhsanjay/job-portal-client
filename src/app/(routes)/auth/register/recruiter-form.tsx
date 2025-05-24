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
import { useRegisterRecruiter } from "@/services/userService"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"

const recruiterSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
  role: z.string().default("EMPLOYER"),
})

type RecruiterFormValues = z.infer<typeof recruiterSchema>
export type UserType = "candidate" | "recruiter"

export default function RecruiterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const registerMutation = useRegisterRecruiter()
  const searchParams = useSearchParams()
  const userTypeParam = (searchParams.get("userType") as UserType) || "candidate"

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecruiterFormValues>({
    resolver: zodResolver(recruiterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
      role: "EMPLOYER",
    },
  })

  useEffect(() => {
    if (registerMutation.isSuccess) {
      toast.success("Company account created successfully!")
      reset()
      router.push(`/auth/login?userType=${userTypeParam}`)
    }
  }, [registerMutation.isSuccess, router, reset, userTypeParam])

  const onSubmit = (data: RecruiterFormValues) => {
    const { terms, ...recruiterData } = data
    const employerData = {
      ...recruiterData,
      employerDetails: {
        companyName: recruiterData.name,
        email: recruiterData.email,
      },
    }
    registerMutation.mutate(employerData)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Company Name */}
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs">
            Company Name
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                placeholder="Acme Corporation"
                className="bg-white focus:ring-2 focus:ring-emerald-500/20 text-sm h-9"
              />
            )}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs">
            Business Email
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="john.doe@company.com"
                className="bg-white focus:ring-2 focus:ring-emerald-500/20 text-sm h-9"
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
                  className="bg-white focus:ring-2 focus:ring-emerald-500/20 text-sm h-9 pr-10"
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
          <label htmlFor="terms" className="text-xs leading-4">
            I agree to the{" "}
            <a href="/terms_conditions" className="text-emerald-600 hover:text-emerald-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-emerald-600 hover:text-emerald-700">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}

        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm h-9"
          type="submit"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Creating Account..." : "Create Employer Account"}
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

      {/* Error Messages */}
      {registerMutation.isError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-xs">Error: {registerMutation.error.message}</div>
      )}
    </div>
  )
}
