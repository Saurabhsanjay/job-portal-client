import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bookmark, Building2, MapPin, Clock, DollarSign } from "lucide-react"
import { type IJob, JobPriority } from "../types/job.types"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface JobCardProps {
    job: IJob
    onSave?: (jobId: string) => void
    onApply?: (jobId: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function JobCard({ job, onSave, onApply }: JobCardProps) {
    const formatSalary = (min?: number, max?: number, currency = "USD") => {
        if (!min && !max) return "Competitive"
        if (!max) return `${currency} ${min?.toLocaleString()}+`
        if (!min) return `Up to ${currency} ${max.toLocaleString()}`
        return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`
    }

    const getTimeAgo = (date: Date) => {
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60))
        if (diffInHours < 24) return `${diffInHours}h ago`
        const diffInDays = Math.floor(diffInHours / 24)
        return `${diffInDays}d ago`
    }

    return (
        <Card className="p-4 sm:p-6 hover:shadow-lg shadow-sm border-none transition-shadow duration-200">
            <div className="flex flex-col gap-3">
                {/* Company Logo and Job Title */}
                <div className="flex items-start gap-4">
                    <div className="shrink-0">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                            {job.company.logoUrl ? (
                                <Image
                                    width={48}
                                    height={48}
                                    src={"https://t3.ftcdn.net/jpg/00/78/02/82/360_F_78028284_z1fcX5yeVr6RKZtTbv4EkkZrbnIINGgD.jpg"}
                                    alt={job.company.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Building2 className="h-6 w-6 text-gray-400" />
                            )}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate md:text-xl">
                                {job.title}
                            </h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                                onClick={() => onSave?.(job._id)}
                            >
                                <Bookmark
                                    className={cn(
                                        "h-5 w-5 md:h-6 md:w-6",
                                        job.savedCount < 0 && "fill-current text-blue-500"
                                    )}
                                />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500 md:text-base">{job.company.name}</p>
                    </div>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 md:text-base">
                    <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                        {job.location.city}, {job.location.country}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 md:h-5 md:w-5" />
                        {getTimeAgo(job.postedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
                        {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                    </span>
                </div>

                {/* Description Preview */}
                <p className="text-sm text-gray-600 line-clamp-2 md:text-base">{job.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-xs md:text-sm">
                        {job.employmentType.replace("_", " ")}
                    </Badge>
                    {job.remote && (
                        <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs md:text-sm">
                            Remote
                        </Badge>
                    )}
                    {job.priority === JobPriority.URGENT && (
                        <Badge variant="secondary" className="bg-orange-50 text-orange-700 text-xs md:text-sm">
                            Urgent
                        </Badge>
                    )}
                    <Badge variant="secondary" className="bg-purple-50 text-purple-700 text-xs md:text-sm">
                        {job.experience.level}
                    </Badge>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill) => (
                        <Badge
                            key={skill}
                            variant="outline"
                            className="bg-gray-50 text-xs md:text-sm"
                        >
                            {skill}
                        </Badge>
                    ))}
                    {job.skills.length > 3 && (
                        <Badge variant="outline" className="bg-gray-50 text-xs md:text-sm">
                            +{job.skills.length - 3} more
                        </Badge>
                    )}
                </div>

                {/* Apply Button
                <Button
                    className="w-full mt-2 text-sm md:text-base py-2 md:py-3"
                    onClick={() => onApply?.(job._id)}
                >
                    Apply Now
                </Button> */}
            </div>
        </Card>
    )
}
