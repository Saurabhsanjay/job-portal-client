"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Backpack, BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import CandidateForm from "./candidate-form";
import RecruiterForm from "./recruiter-form";
import { useIsMobile } from "@/hooks/use-mobile";

export type UserType = "candidate" | "recruiter";

export default function RegisterForm() {
  const [userType, setUserType] = useState<UserType>("candidate");
  const isMobile = useIsMobile();

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
            {!isMobile && (
              <Button
                className={`${
                  userType === "candidate"
                    ? "bg-green-600"
                    : "bg-gray-200 text-gray-700"
                } text-white hover:bg-blue-700`}
                onClick={() => setUserType("candidate")}
              >
                <BriefcaseBusiness size={18} className="mr-2" /> Candidate
              </Button>
            )}
            {!isMobile && (
              <Button
                className={`${
                  userType === "recruiter"
                    ? "bg-blue-600"
                    : "bg-gray-200 text-gray-700"
                } text-white hover:bg-green-700`}
                onClick={() => setUserType("recruiter")}
              >
                <Backpack size={18} className="mr-2" /> Recruiter
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {userType === "candidate" ? <CandidateForm /> : <RecruiterForm />}
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
