"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Backpack,
  BriefcaseBusiness,
  EyeIcon,
  EyeOffIcon,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import Image from "next/image";
// import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/app/(providers)/AuthContext";
// import { useToast } from "@/hooks/use-toast";
import toast from "react-hot-toast";

// Define the user types
export type UserType = "candidate" | "recruiter";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("candidate");
  const [loginError, setLoginError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  // const { toast } = useToast();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  const { login } = useAuth();

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
  });

  // Show error toast if there's an error in the URL
  // useEffect(() => {
  //   if (error) {
  //     setLoginError("Authentication failed. Please try again.");
  //     toast({
  //       title: "Error",
  //       description: "Authentication failed. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // }, [error, toast]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);

    // try {
    //   const result = await signIn("credentials", {
    //     email: data.email,
    //     password: data.password,
    //     isRecruiter: userType === "recruiter" ? "true" : "false",
    //     redirect: false,
    //   });

    //   if (result?.error) {
    //     setLoginError(result.error);
    //     toast({
    //       title: "Login Failed",
    //       description: result.error,
    //       variant: "destructive",
    //     });
    //   } else if (result?.ok) {
    //     toast({
    //       title: "Success",
    //       description: "You have been logged in successfully!",
    //     });
    //     // router.push(callbackUrl);
    //     router.refresh(); // Refresh to update auth state
    //   }
    // } catch (error: any) {
    //   const errorMessage =
    //     error.message || "An unexpected error occurred. Please try again.";
    //   setLoginError(errorMessage);
    //   toast({
    //     title: "Error",
    //     description: errorMessage,
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
    await login(data?.email, data?.password);
    // console.log("response------->", response)
    // if(response?.status==="SUCCESS"){
    //   console.log("came inside if")
    //   toast.success("Login Successful")
    // }else if(response?.status==="error"){
    //   console.log("came inside else")
    //   toast.error(response?.message||"Something Went Wrong")
    // }
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-fit md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px] opacity-70" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />

      <Card className="relative w-full max-w-[420px] shadow-lg border border-gray-100 bg-white/95 backdrop-blur-sm transition-all duration-300 animate-fadeIn">
        <CardHeader className="space-y-4 pb-2">
          <div className="flex items-center justify-center py-2">
            <Image src="/logo.jpeg" alt="Recruit-G" width={140} height={70} className="h-10 object-contain" />
          </div>

          <div className="flex items-center justify-center gap-3 p-1 bg-gray-50 rounded-lg">
            <Button
              className={`flex-1 transition-all duration-200 ${
                userType === "candidate"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setUserType("candidate")}
              type="button"
            >
              <BriefcaseBusiness size={18} className="mr-2" /> Candidate
            </Button>
            <Button
              className={`flex-1 transition-all duration-200 ${
                userType === "recruiter"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setUserType("recruiter")}
              type="button"
            >
              <Backpack size={18} className="mr-2" /> Recruiter
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 pt-4">
          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm animate-pulse">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 pl-3 h-11 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 pl-3 h-11 transition-all duration-200"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-between items-center">
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
                      className="text-blue-600 border-gray-300 rounded focus:ring-blue-500/20"
                    />
                  )}
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 mt-6"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-500 font-medium">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            disabled={isLoading}
          >
            <svg
              className="mr-2 h-5 w-5 text-red-500"
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

        <CardFooter className="flex justify-center pt-2 pb-6">
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
            >
              Register
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
