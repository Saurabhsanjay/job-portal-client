import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import img from '../../../../public/dream-job.jpg'

export default function DreamJob() {
    return (
        <div className="relative min-h-[600px] flex items-center justify-center text-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={img}
                    alt="Dream Job Background"
                    fill objectFit="cover"
                    priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/50" />
            </div>

            {/* Content */}
            <div className="relative max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-6">
                    Find Your Dream Job Today!
                </h1>
                <p className="text-base sm:text-lg text-blue-100 mb-8">
                    Join thousands of job seekers who found their perfect career match.
                    Create an account and start applying to top companies!
                </p>
                <Link href="/auth/register">
                    <Button
                        size="lg"
                        className="bg-white text-blue-900 rounded-xl hover:bg-blue-50 font-semibold text-lg px-8 py-6"
                    >
                        Create an Account
                    </Button>
                </Link>
            </div>
        </div>
    )
}
