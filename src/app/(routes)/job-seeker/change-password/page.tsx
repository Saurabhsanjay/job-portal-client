"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useApiPost } from "@/hooks/use-api-query"
// import Email from "next-auth/providers/email"
import { useAuth } from "@/app/(providers)/AuthContext"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

export default function ChangePassword() {
  const { user } = useAuth()
  console.log("user------->", user)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
    
  const changePasswordSchema = z
    .object({
      email:z.string(),
      oldPassword: z.string().min(8, "Password must be at least 8 characters long"),
      newPassword: z.string().min(8, "Password must be at least 8 characters long"),
      confirmPassword: z.string().min(8, "Password must be at least 8 characters long").optional(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "New Password and Confirm Password should match",
      path: ["confirmPassword"],
    })

  type FormValues = z.infer<typeof changePasswordSchema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email:user?.email||"",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })


  console.log("errors------>", errors)

  interface ChangePasswordResponse {
    status: "SUCCESS" | "FAILURE"; // Assuming other statuses might exist
    statusCode: number;
    message: string;
    formattedMessage: string;
    data: null;
  }

  interface ChangePasswordInput{
    email:string
    oldPassword: string,
    newPassword: string,
  }

  const changePasswordMutation = useApiPost<ChangePasswordResponse, ChangePasswordInput>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("data------->", data)
    console.log("user email------->", user?.email)

    changePasswordMutation.mutate(
        {
          endpoint: "users/change-password",
          payload: {
            "email":user?.email||"",
            "oldPassword":data?.oldPassword,
            "newPassword":data?.newPassword
          },
        // payload: data,
        //   invalidateQueries: [["user-profile"]],
        },
        {
          onSuccess: (response) => {
            if (response.data) {
                reset();
                toast.success("Password changed successfully");
            } else if (response.error) {
              toast.error(response?.error?.message||"Something Went Wrong");
            }
          },
          onError: (error) => {
            toast.error(error?.message||"Something Went Wrong");
          },
        }
      );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-sm border-none">
        <div className="max-w-full">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Change Password!</h2>
            <p className="text-sm text-gray-500">Enter your old password and new password to change your password.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6 max-w-2xl">
            <div className="space-y-1">
              <Label htmlFor="oldPassword">Old Password</Label>
              <div className="relative">
              <Input id="oldPassword" type={showOldPassword ? "text" : "password"} {...register("oldPassword")} />
              <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showOldPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
              </div>
              {errors.oldPassword && <p className="text-sm text-red-500">{errors.oldPassword.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
              <Input id="newPassword" type={showPassword ? "text" : "password"} {...register("newPassword")} />
              <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
              </div>
              {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
              <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} />
              <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showConfirmPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" className="rounded-xl hidden" variant="outline">
                Cancel
              </Button>
              <Button className="rounded-xl" type="submit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

