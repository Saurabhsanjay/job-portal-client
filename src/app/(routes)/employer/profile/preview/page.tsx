"use client"
import {
    Facebook,
    Instagram,
    MapPin,
    Globe,
    Phone,
    Mail,
    Users,
    Calendar,
    Building2,
    ChevronRight,
    CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const companyData = {
    name: "Recruit G",
    logo: "/placeholder.svg",
    email: "contact@recruitg.com",
    phone: "+62 21 1234 5678",
    website: "https://recruitg.com",
    establishedDate: "2020-01-01",
    teamSize: "1-50",
    industry: "Tech",
    workType: "On-Site",
    location: "Delhi Selatan, India",
    about:
        "Recruit G is India's largest job portal & mentoring platform. We help people easily find jobs to top Indonesian companies for internship and full-time roles. As you might have already heard about us, we are revolutionizing how Indonesian engage with employers. Many Indonesian students are talented, ambitious, but never found a better opportunity for themselves. Our team is driven by the vision to democratize information and knowledge, thus opportunities. We think what we build will allow Indonesian students to have a chance to self develop and have a better future.",
    stats: [
        { label: "Active Jobs", value: "500+" },
        { label: "Companies", value: "1000+" },
        { label: "Candidates Placed", value: "10,000+" },
        { label: "Success Rate", value: "95%" },
    ],
    benefits: [
        { icon: "💰", title: "Competitive Salary", description: "Above market compensation package" },
        { icon: "🍽️", title: "Free Food and Snack", description: "Daily meals and snacks provided" },
        { icon: "🌏", title: "International Exposure", description: "Work with global teams and clients" },
        { icon: "🏥", title: "Paid Sick Days", description: "Comprehensive health benefits" },
        { icon: "💸", title: "THR / Binus System", description: "Performance-based bonuses" },
        { icon: "👕", title: "Casual Dress Code", description: "Comfortable work environment" },
        { icon: "🍱", title: "Free Lunch", description: "Daily lunch allowance" },
        { icon: "📚", title: "Learning Budget", description: "Personal development allowance" },
    ],
    gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
    ],
    testimonials: [
        {
            name: "Sarah Chen",
            role: "Software Engineer",
            content:
                "Working at Recruit G has been an amazing journey. The culture is fantastic and the opportunities for growth are endless.",
            avatar: "/placeholder.svg",
        },
        {
            name: "Michael Rodriguez",
            role: "Product Manager",
            content: "The team at Recruit G is incredibly supportive and innovative. It's a great place to build your career.",
            avatar: "/placeholder.svg",
        },
    ],
    socialMedia: {
        website: "https://recruitg.com",
        facebook: "https://facebook.com/recruitg",
        instagram: "https://instagram.com/recruitg",
    },
    isVerified: true,
}

function VerifiedBadge() {
    return (
        <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
        </Badge>
    )
}

export default function CompanyProfilePreviewPage() {
    return (
        <div className="bg-slate-50 min-h-screen text-sm">
            {/* Company Info Section */}
            <div className="container mx-auto px-4  relative z-20">
                <div
                    
                >
                    <Card className="shadow-sm backdrop-blur-sm border-none">
                        <CardContent className="p-8">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-start">
                                <Avatar className="px-4 py-4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl">
                                    <AvatarImage src={companyData.logo} alt={companyData.name} />
                                    <AvatarFallback className="text-2xl">{companyData.name.substring(0, 1)}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <h2 className="text-2xl font-bold">{companyData.name}</h2>
                                        {companyData.isVerified && <VerifiedBadge />}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <div className="flex items-center text-muted-foreground">
                                            <Building2 className="w-5 h-5 mr-3 text-blue-600" />
                                            <span>{companyData.industry}</span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                                            <span>{companyData.location}</span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <Users className="w-5 h-5 mr-3 text-blue-600" />
                                            <span>{companyData.teamSize} employees</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {companyData.socialMedia.website && (
                                            <Button size={'sm'} className="bg-blue-600 hover:bg-blue-700" asChild>
                                                <a href={companyData.socialMedia.website} target="_blank" rel="noopener noreferrer">
                                                    <Globe className="w-4 h-4 mr-2" />
                                                    Visit Website
                                                </a>
                                            </Button>
                                        )}
                                        {companyData.socialMedia.facebook && (
                                            <Button variant="outline" size="icon" className="rounded-full" asChild>
                                                <a href={companyData.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                                    <Facebook className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                        {companyData.socialMedia.instagram && (
                                            <Button variant="outline" size="icon" className="rounded-full" asChild>
                                                <a href={companyData.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                                                    <Instagram className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-8">
                        <div
                           
                        >
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl">About {companyData.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{companyData.about}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div
                           
                        >
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl">Benefits & Perks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {companyData.benefits.map((benefit, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start p-4 rounded-xl border bg-white hover:shadow-md transition-shadow"
                                            >
                                                <span className="text-3xl mr-4">{benefit.icon}</span>
                                                <div>
                                                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Gallery Section
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Life at {companyData.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {companyData.gallery.map((image, index) => (
                                            <Image width={600} height={400}
                                                key={index}
                                                src={image || "/placeholder.svg"}
                                                alt={`Company culture ${index + 1}`}
                                                className="rounded-lg object-cover w-full h-48"
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div> */}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        <div
                            
                        >
                            <Card className="border-none shadow-sm">                                <CardHeader>
                                <CardTitle>Company Details</CardTitle>
                            </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center p-3 rounded-lg bg-slate-50">
                                        <Mail className="w-5 h-5 mr-3 text-blue-600" />
                                        <span>{companyData.email}</span>
                                    </div>
                                    <div className="flex items-center p-3 rounded-lg bg-slate-50">
                                        <Phone className="w-5 h-5 mr-3 text-blue-600" />
                                        <span>{companyData.phone}</span>
                                    </div>
                                    <div className="flex items-center p-3 rounded-lg bg-slate-50">
                                        <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                                        <span>Est. {new Date(companyData.establishedDate).getFullYear()}</span>
                                    </div>
                                    <div className="flex items-center p-3 rounded-lg bg-slate-50">
                                        <Building2 className="w-5 h-5 mr-3 text-blue-600" />
                                        <span>{companyData.workType}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Call to Action */}
                        <div
                          
                        >
                            <Card className="bg-gradient-to-br from-blue-600 to-pink-700 text-white">
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-lg font-semibold mb-2">Ready to Join Us?</h3>
                                    <p className="text-blue-100 mb-4">Explore current opportunities and be part of our journey</p>
                                    <Button variant="secondary" className="w-full">
                                        View Open Positions
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

