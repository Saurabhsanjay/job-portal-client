"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Backpack, BriefcaseBusiness, EyeIcon, EyeOffIcon, School } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useRegister } from "@/hooks/useAuth";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  dateOfBirth: z.string().refine((dob) => {
    const date = new Date(dob);
    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
  }, "You must be at least 18 years old"),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
      terms: false,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms, ...userData } = data;
    registerMutation.mutate(userData);
  };

  return (
    <div className="relative min-h-fit md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Professional gradient background */}
      
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Clean, professional decorative elements - hidden on mobile */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 hidden md:block" />
      <div className="absolute top-0 right-0 w-1/3 h-32 bg-blue-50/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-32 bg-slate-50/40 blur-3xl" />

      <Card className="relative mx-0 md:mx-4 w-full md:max-w-[450px] shadow-none md:shadow-md border-0 md:border md:border-gray-200 bg-white">
        <CardHeader>
          <div className="flex items-center justify-center">
            <Image
               src="/logo.jpeg"
               alt="Recruit-G"
               width={120}
               height={60}
               className="h-8"
            />
          </div>
          <div className="flex items-center space-x-2 py-2 justify-around">
          <Button className="bg-green-600 text-white hover:bg-blue-700">
              <BriefcaseBusiness size={18} className="mr-2" /> Candidate
           </Button>
           <Button className="bg-blue-600 text-white hover:bg-green-700">
              <Backpack size={18} className="mr-2" /> Recruiter
           </Button>
           {/* <Button className="bg-blue-600 text-white hover:bg-green-700">
              <School size={18} className="mr-2" /> Institute
           </Button> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="firstName"
                    placeholder="Enter your first name"
                    className="bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Enter your last name"
                    className="bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="dateOfBirth"
                    type="date"
                    className="bg-white focus:ring-2 focus:ring-blue-500/20"
                  />
                )}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
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
                      className="bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  )}
                />
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
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4 py-2">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label
                htmlFor="terms"
                className="text-sm leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              type="submit"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" type="button">
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Continue with Google
          </Button>
        </CardContent>
        <p className="text-center text-sm text-muted-foreground p-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:text-blue-700">
            Sign in
          </a>
        </p>
      </Card>
      {registerMutation.isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          Error: {registerMutation.error.message}
        </div>
      )}
      {registerMutation.isSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          Account created successfully! You can now log in.
        </div>
      )}
    </div>
  );
}
