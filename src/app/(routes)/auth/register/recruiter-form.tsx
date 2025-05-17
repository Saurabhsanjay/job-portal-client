"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRegisterRecruiter } from "@/services/userService";
// import { useToast } from "@/hooks/use-toast";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";


const recruiterSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
  role:z.string().default("EMPLOYER"),
});

type RecruiterFormValues = z.infer<typeof recruiterSchema>;
export type UserType = "candidate" | "recruiter";

export default function RecruiterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const registerMutation = useRegisterRecruiter();
  const searchParams = useSearchParams();
  const userTypeParam = searchParams.get("userType") as UserType || "candidate";

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
      role:"EMPLOYER",
    },
  });

  // Handle successful registration
  useEffect(() => {
    if (registerMutation.isSuccess) {
      toast.success("Company account created successfully!");
      reset();
      router.push(`/auth/login?userType=${userTypeParam}`);
    }
  }, [registerMutation.isSuccess, router, reset]);

  const onSubmit = (data: RecruiterFormValues) => {
    const { terms, ...recruiterData } = data;
    const employerData = {
      ...recruiterData,
      employerDetails: {
        companyName: recruiterData.name,
        email: recruiterData.email,
      },
    };
    registerMutation.mutate(employerData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Company Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                placeholder="Enter your company name"
                className="bg-white focus:ring-2 focus:ring-blue-500/20"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
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
                placeholder="Enter your business email"
                className="bg-white focus:ring-2 focus:ring-blue-500/20"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm">{errors.password.message}</p>
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
            <a href="/privacy" className="text-blue-600 hover:text-blue-700">
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
            : "Create Company Account"}
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
      {registerMutation.isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          Error: {registerMutation.error.message}
        </div>
      )}
      {registerMutation.isSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          Company account created successfully! You can now log in.
        </div>
      )}
    </>
  );
}
