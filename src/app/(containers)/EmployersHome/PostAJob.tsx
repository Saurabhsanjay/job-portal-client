import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import Image from "next/image"
import toptalent from "../../../../public/top-talent.png"
import Link from "next/link"
export default function PostAJob() {
    return (
        <div className="container mx-auto px-12 py-12 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[600px] w-full rounded-3xl overflow-hidden ">
                    <Image
                        src={toptalent}
                        alt="Recruitment Platform Interface"
                        width={600}
                        height={600}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-[40px]">
                            Get applications from the world best talents.
                        </h1>
                        <p className="text-xl text-gray-500 max-w-xl">
                            Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            "Bring to the table win-win survival strategies",
                            "Capitalize on low hanging fruit to identify opportunities",
                            "Streamlined hiring process with built-in assessment tools"
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-blue-600" />
                                </div>
                                <p className="text-gray-700">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-4 ">
                <Link href="/post-job" className="flex-shrink-0">
                        <Button
                            size="lg"
                            className="bg-blue-600  hover:bg-blue-700 text-white px-8 rounded-md"
                        >
                            Post a Job
                        </Button>
                </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-gray-700 border-gray-200 hover:bg-gray-50 rounded-md"
                        >
                            Learn More
                        </Button>
                    </div>

                    <div className="flex items-center gap-8 pt-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">2M+</p>
                            <p className="text-sm text-gray-600">Active Users</p>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">150k</p>
                            <p className="text-sm text-gray-600">Companies</p>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">98%</p>
                            <p className="text-sm text-gray-600">Success Rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

