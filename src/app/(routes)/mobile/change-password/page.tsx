"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/app/(providers)/AuthContext";
import { useApiPost } from "@/hooks/use-api-query";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const changePasswordSchema = z
  .object({
    email: z.string(),
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New Password and Confirm Password should match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof changePasswordSchema>;

interface ChangePasswordResponse {
  status: "SUCCESS" | "FAILURE";
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: null;
}

interface ChangePasswordInput {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export default function MobileChangePassword() {
  const router = useRouter();
  const { user } = useAuth();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: user?.email || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changePasswordMutation = useApiPost<
    ChangePasswordResponse,
    ChangePasswordInput
  >();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsSubmitting(true);

    changePasswordMutation.mutate(
      {
        endpoint: "users/change-password",
        payload: {
          email: user?.email || "",
          oldPassword: data?.oldPassword,
          newPassword: data?.newPassword,
        },
      },
      {
        onSuccess: (response) => {
          setIsSubmitting(false);
          if (response.data) {
            reset();
            toast.success("Password changed successfully");
            setTimeout(() => router.push("/mobile/profile"), 1500);
          } else if (response.error) {
            toast.error(response?.error?.message || "Something went wrong");
          }
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast.error(error?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={() => router.push("/mobile/profile")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Change Password</h1>
      </div>

      <Card className="bg-white">
        <CardContent className="p-4 pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  {...register("oldPassword")}
                  className={errors.oldPassword ? "border-red-500" : ""}
                />
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
              {errors.oldPassword && (
                <p className="text-sm text-red-500">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword")}
                  className={errors.newPassword ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showNewPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
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
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Password Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Use at least 8 characters</p>
          <p>• Include uppercase and lowercase letters</p>
          <p>• Add numbers and special characters</p>
          <p>• Avoid using personal information</p>
          <p>• Don't reuse passwords from other sites</p>
        </CardContent>
      </Card>
    </div>
  );
}
