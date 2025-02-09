"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import {
    Building2,
    MapPin,
    Globe,
    Calendar,
    Users,
    Briefcase,
    GraduationCap,
    Languages,
    DollarSign,
    Clock,
    Tags,
    Edit,
    UserRound,
    ArrowLeft,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { use } from "react"

interface JobDetailsProps {
    job: {
        title: string
        description: string
        company: {
            name: string
            logoUrl?: string
            website?: string
        }
        category: string
        location: {
            city?: string
            state?: string
            country: string
            zipCode?: string
            streetAddress?: string
            coordinates?: {
                latitude?: number
                longitude?: number
            }
        }
        employmentType: string
        industry: string
        skills: string[]
        experience: {
            level: string
            years: {
                min: number
                max: number
            }
        }
        education: string[]
        languages: string[]
        salary: {
            min?: number
            max?: number
            currency: string
        }
        numberOfOpenings: number
        validTill: Date
        remote: boolean
        benefits: string[]
        applicationLink: string
        priority: string
        tags: string[]
    }
    onEdit: () => void
    onViewCandidates: () => void
    onBack: () => void
}




// This is example data - replace with your actual data fetching logic
const exampleJob = {
    title: "Senior Software Engineer",
    description:
        "We are looking for a Senior Software Engineer to join our team. You will be responsible for developing and maintaining our core products, mentoring junior developers, and contributing to technical decisions.\n\nYou will work closely with product managers and designers to implement new features and improve existing ones.",
    company: {
        name: "TechCorp",
        logoUrl: "/placeholder.svg",
        website: "https://example.com",
    },
    category: "Software Development",
    location: {
        city: "San Francisco",
        state: "CA",
        country: "USA",
        zipCode: "94105",
    },
    employmentType: "FULL_TIME",
    industry: "Technology",
    skills: ["React", "TypeScript", "Node.js", "AWS", "System Design"],
    experience: {
        level: "SENIOR_LEVEL",
        years: {
            min: 5,
            max: 8,
        },
    },
    education: ["Bachelor's Degree", "Master's Degree (Preferred)"],
    languages: ["English", "Spanish (Optional)"],
    salary: {
        min: 120000,
        max: 180000,
        currency: "USD",
    },
    numberOfOpenings: 2,
    validTill: new Date(2024, 2, 30),
    remote: true,
    benefits: ["Health Insurance", "401(k) Match", "Unlimited PTO", "Remote Work", "Professional Development"],
    applicationLink: "https://example.com/careers/apply",
    priority: "HIGH",
    tags: ["Senior", "Engineering", "Full-stack", "Remote"],
}

export default function JobPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const router = useRouter()

    return (
        <JobDetails
            job={exampleJob}
            onEdit={() => router.push(`/jobs/${id}/edit`)}
            onViewCandidates={() => router.push(`/employer/jobs/candidates`)}
            onBack={() => router.back()}
        />
    )
}



 function JobDetails({ job, onEdit, onViewCandidates, onBack }: JobDetailsProps) {
    const formatSalary = (min?: number, max?: number, currency?: string) => {
        if (!min && !max) return "Not specified"
        if (min && max) return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
        if (min) return `${currency} ${min.toLocaleString()}+`
        return `Up to ${currency} ${max!.toLocaleString()}`
    }

    const getLocationString = () => {
        const parts = [job.location.city, job.location.state, job.location.country].filter(Boolean).join(", ")
        return job.remote ? `${parts} (Remote)` : parts
    }

    return (
        <div className="px-1 sm:px-6 md:px-8 shadow-sm border-none">
            <div className="mb-6">
                <Button variant="ghost" size="sm" className="mb-4" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Jobs
                </Button>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={job.company.logoUrl} alt={job.company.name} />
                            <AvatarFallback className="text-lg">{job.company.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{job.title}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span>{job.company.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onEdit}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Job
                        </Button>
                        <Button onClick={onViewCandidates}>
                            <UserRound className="mr-2 h-4 w-4" />
                            View Candidates
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Overview Card */}
                <Card className="shadow-sm border-none">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{getLocationString()}</span>
                            </div>
                            {job.company.website && (
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    <a
                                        href={job.company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        Company Website
                                    </a>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Valid till {format(job.validTill, "PPP")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>
                                    {job.numberOfOpenings} {job.numberOfOpenings === 1 ? "Opening" : "Openings"}
                                </span>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Requirements Card */}
                <Card className="shadow-sm border-none">
                    <CardHeader>
                        <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-4">
                            <div className="flex items-start gap-2">
                                <Briefcase className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <h4 className="font-medium">Experience</h4>
                                    <p className="text-muted-foreground">
                                        {job.experience.level.replace("_", " ")} · {job.experience.years.min}-{job.experience.years.max}{" "}
                                        years
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <GraduationCap className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <h4 className="font-medium">Education</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {job.education.map((edu) => (
                                            <Badge key={edu} variant="secondary">
                                                {edu}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Languages className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <h4 className="font-medium">Languages</h4>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {job.languages.map((lang) => (
                                            <Badge key={lang} variant="secondary">
                                                {lang}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-medium mb-2">Required Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Details Card */}
                <Card className="shadow-sm border-none">
                    <CardHeader>
                        <CardTitle>Additional Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-2">
                                <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <h4 className="font-medium">Salary Range</h4>
                                    <p className="text-muted-foreground">
                                        {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                                <div>
                                    <h4 className="font-medium">Employment Type</h4>
                                    <p className="text-muted-foreground">{job.employmentType.replace("_", " ")}</p>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-medium mb-2">Benefits</h4>
                            <div className="flex flex-wrap gap-2">
                                {job.benefits.map((benefit) => (
                                    <Badge key={benefit} variant="secondary">
                                        {benefit}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-medium mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {job.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                        <Tags className="mr-1 h-3 w-3" />
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Apply Button
                <div className="flex justify-center mt-4">
                    <Button size="lg" asChild>
                        <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
                            Apply for this position
                        </a>
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

