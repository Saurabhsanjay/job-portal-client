import { ClipboardCheck, Search, SendHorizontal } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorks() {
    const steps = [
        {
            number: "1",
            icon: ClipboardCheck,
            title: "Prepare Your Resume",
            description: "Update your resume with relevant experience, skills, and achievements. Our AI tool helps optimize your resume for better visibility."
        },
        {
            number: "2",
            icon: Search,
            title: "Find Perfect Match",
            description: "Browse through carefully curated job listings matching your skills and experience. Use filters to find your ideal position."
        },
        {
            number: "3",
            icon: SendHorizontal,
            title: "Quick Apply",
            description: "Apply to multiple positions with just one click. Track your applications and get real-time status updates on your dashboard."
        }
    ]

    return (
        <section className="py-16 px-4 md:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#1a365d] mb-4">
                        Three Easy Steps to Your Next Job
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Start your job search journey with our streamlined application process. We&apos;ve made it simple to find and apply for your dream position.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <Card key={index} className="border-none shadow-none hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-start p-6">
                                    <div className="mb-6 bg-blue-50 p-4 rounded-full">
                                        <step.icon
                                            size={40}
                                            className="text-blue-600"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                       
                                        <h3 className="text-xl font-semibold text-[#1a365d] flex items-center justify-start gap-3">  <span className="text-lg font-medium text-blue-600 bg-blue-50 px-4 py-1 rounded-full">
                                            {step.number}
                                        </span>{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

