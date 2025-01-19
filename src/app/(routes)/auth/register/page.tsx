"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import logo from "../../../../../public/dummy-logo-5b.png";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

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
            <Image src={logo} alt="Recruit G Logo" className="w-40" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              placeholder="Enter your full name"
              required
              className="bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              required
              className="bg-white focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="bg-white focus:ring-2 focus:ring-blue-500/20"
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
          </div>
          <div className="flex items-center space-x-4 py-2">
            <Checkbox id="terms" required />
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
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            type="submit"
          >
            Create Account
          </Button>
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
    </div>
  );
}