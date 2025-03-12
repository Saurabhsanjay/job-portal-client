import React from 'react';
import { User, Search, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HowItWorks() {
    return (
        <div className="py-24 min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                        How It Works?
                    </h2>
                    <p className="text-xl text-gray-600">
                        Find your perfect candidate in three simple steps
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
                    {/* Step 1 */}
                    <div className="text-center group">
                        <div className="bg-blue-50 w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg shadow-blue-100 transition-transform duration-300 group-hover:scale-105">
                            <User className="w-14 h-14 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                            Register an Account
                        </h3>
                        <p className="text-lg text-gray-600">
                            Create your employer profile to start hiring
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center group">
                        <div className="bg-blue-50 w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg shadow-blue-100 transition-transform duration-300 group-hover:scale-105">
                            <Search className="w-14 h-14 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                            Explore Resumes
                        </h3>
                        <p className="text-lg text-gray-600">
                            Browse thousands of qualified candidates
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center group">
                        <div className="bg-blue-50 w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg shadow-blue-100 transition-transform duration-300 group-hover:scale-105">
                            <ClipboardCheck className="w-14 h-14 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                            Find Perfect Match
                        </h3>
                        <p className="text-lg text-gray-600">
                            Hire the most suitable talent for your team
                        </p>
                    </div>
                </div>

                {/* Optional CTA */}
                <div className="text-center mt-16">
                <Link href="/auth/register" className="flex-shrink-0">
                <Button size="lg"
 className="bg-blue-600 animate-bounce text-white text-lg font-semibold px-6 py-2 rounded-xl hover:bg-blue-700 transition-all hover:scale-105">
                        Start Hiring Now 
                        <Search className="w-4 h-4 ml-2" />
                    </Button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}