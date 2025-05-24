"use client"

import { AuthContext } from "@/app/(providers)/AuthContext";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

    const EmployerHero = () => {
          const { user,loading } = useContext(AuthContext)!;
        
    const handlePostJobClick = () => {
        if (user) {
          // User is logged in, redirect to protected employer create job page
          return "/employer/create-job"
        } else {
          // User is not logged in, redirect to public post job page
          return "/post-job"
        }
      }
    return (
        <div className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />

            {/* Gradient orbs */}
            <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
            <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />

            {/* Main content */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="mb-6 sm:mb-8 inline-block rounded-full bg-blue-50 px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-medium text-blue-700 animate-fade-in">
                        Trusted by 10,000+ companies worldwide
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl md:text-7xl animate-slide-in">
                        Hire the Best
                        <span className="block text-blue-600 animate-zoom-in">Talent Today</span>
                    </h1>

                    {/* Description with fade-in animation */}
                    <p className="mt-4 sm:mt-6 text-base sm:text-xl text-gray-600 animate-fade-in">
                        Connect with exceptional candidates and build your dream team.
                        Post jobs and find the perfect match for your company.
                    </p>

                    <div className="mt-8 sm:mt-12 animate-bounce">
                    <Link  href={handlePostJobClick()} className="flex-shrink-0">
                        <Button
                            size="lg"
                            className="bg-blue-600 px-6 sm:px-8 text-sm sm:text-lg rounded-xl font-semibold text-white hover:bg-blue-700 transition-all hover:scale-105"
                        >
                            <BriefcaseBusiness size={18} className="mr-2" /> Post a Job
                        </Button>
                    </Link>
                    </div>

                    <div className="mt-12 sm:mt-20 grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-4">
                        {[
                            { label: "Active Jobs", value: "97,216", icon: "📋" },
                            { label: "Companies", value: "6,329", icon: "🏢" },
                            { label: "Candidates", value: "4,782", icon: "👥" },
                            { label: "Success Rate", value: "95%", icon: "📈" },
                        ].map((stat, index) => (
                            <div
                                key={stat.label}
                                className="group mx-auto animate-fade-in"
                                style={{ animationDelay: `${index * 200}ms` }} // Staggered delay
                            >
                                <div className="text-xl sm:text-2xl mb-2">{stat.icon}</div>
                                <div className="text-xl sm:text-3xl font-bold text-gray-900 transition-transform duration-200 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-xs sm:text-sm font-medium text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployerHero
