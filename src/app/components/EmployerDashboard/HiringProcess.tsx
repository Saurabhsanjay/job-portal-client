import { Rocket, Target, Handshake, Trophy } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export default function HiringProcess() {
    return (
        <div className="container mx-auto px-6 sm:px-16 py-16 bg-gradient-to-b from-slate-50 to-white">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    Transform Your Hiring Journey
                </h1>

                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Streamline your recruitment process with our powerful platform designed for modern businesses
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500 max-w-sm mx-auto">
                    <CardContent className="space-y-4 pt-4">
                        <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Rocket className="h-7 w-7 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Launch Your Search</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Create compelling job listings that attract top talent. Reach thousands of qualified candidates through our smart distribution network.
                        </p>
                    </CardContent>
                </Card>

                <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-green-500 max-w-sm mx-auto">
                    <CardContent className="space-y-4 pt-4">
                        <div className="h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Target className="h-7 w-7 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Smart Matching</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our AI-powered matching system identifies the perfect candidates based on skills, experience, and cultural fit for your organization.
                        </p>
                    </CardContent>
                </Card>

                <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500 max-w-sm mx-auto">
                    <CardContent className="space-y-4 pt-4">
                        <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Handshake className="h-7 w-7 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Seamless Collaboration</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Collaborate with your team in real-time. Schedule interviews, share feedback, and make decisions faster with our intuitive platform.
                        </p>
                    </CardContent>
                </Card>

                <Card className="group p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-amber-500 max-w-sm mx-auto">
                    <CardContent className="space-y-4 pt-4">
                        <div className="h-14 w-14 rounded-xl bg-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Trophy className="h-7 w-7 text-amber-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Hire Champions</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Make confident hiring decisions with comprehensive assessment tools, background checks, and data-driven insights.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
