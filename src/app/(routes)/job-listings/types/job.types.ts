export interface IJob {
  _id?: string
  id?: string
  title: string
  description: string
  category: string
  location: {
    city?: string
    state?: string
    country: string
    address?: string
  }
  employmentType: JobEmploymentType
  industry?: string
  skills: string[]
  experience: {
    level: JobExperienceLevel
    years: {
      min: number
      max: number
    }
  }
  education: string[]
  languages: string[]
  salary: {
    currency: string
    min?: number
    max?: number
  }
  numberOfOpenings: number
  postedAt: Date
  validTill: string
  remote: boolean
  benefits: string[]
  applicationLink: string
  status: string
  priority: JobPriority
  tags: string[]
  keyResponsibilities: string[]
  createdBy: {
    userId: string
  }
  createdByDetails?: {
    companyName: string
    logoUrl?: string
  }
  bookmarked?: boolean
  isBookmarked?: boolean
  isAppliedBookmarked?: boolean
}

export enum JobEmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
  VOLUNTEER = "VOLUNTEER",
}

export enum JobExperienceLevel {
  JUNIOR = "JUNIOR",
  MID_LEVEL = "MID_LEVEL",
  SENIOR = "SENIOR",
  LEAD = "LEAD",
}

export enum JobPriority {
  NORMAL = "NORMAL",
  FEATURED = "FEATURED",
  SPONSORED = "SPONSORED",
  URGENT = "URGENT",
}

export interface JobFilters {
  search: string
  location: {
    city: string
    state: string
    country: string
  }
  category?: string
  radius: number
  employmentType?: JobEmploymentType[]
  experienceLevel?: JobExperienceLevel[]
  datePosted?: string | null
  salaryRange?: {
    min: number
    max: number | null
  }
  education?: string[]
}
