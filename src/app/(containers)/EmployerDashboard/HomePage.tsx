import { Button } from "@/components/ui/button"
import { BriefcaseBusiness } from "lucide-react"

export default function EmployerHero() {
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
                    <div className="mb-8 inline-block rounded-full bg-blue-50 px-6 py-2 text-sm font-medium text-blue-700">
                        Trusted by 10,000+ companies worldwide
                    </div>

                    <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
                        Hire the Best
                        <span className="block text-blue-600">Talent Today</span>
                    </h1>

                    <p className="mt-8 text-xl text-gray-600">
                        Connect with exceptional candidates and build your dream team.
                        Post jobs and find the perfect match for your company.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-12">
                        <Button
                            size="lg"
                            className="bg-blue-600 px-8 text-lg rounded-lg font-semibold text-white hover:bg-blue-700 transition-all hover:scale-105"
                        >
                            <BriefcaseBusiness size={20} />  Post a Job
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            { label: "Active Jobs", value: "97,216", icon: "📋" },
                            { label: "Companies", value: "6,329", icon: "🏢" },
                            { label: "Candidates", value: "4,782", icon: "👥" },
                            { label: "Success Rate", value: "95%", icon: "📈" },
                        ].map((stat) => (
                            <div key={stat.label} className="group mx-auto">
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-3xl font-bold text-gray-900 transition-transform duration-200 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-sm font-medium text-gray-600">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

