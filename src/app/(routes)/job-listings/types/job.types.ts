export enum JobEmploymentType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  FREELANCE = "FREELANCE",
  TEMPORARY = "TEMPORARY",
}

export enum JobExperienceLevel {
  ENTRY = "ENTRY",
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
  LEAD = "LEAD",
}

export enum JobStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

export enum JobPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum JobModerationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export interface IJob {
  _id: string;
  title: string;
  description: string;
  company: {
    name: string;
    logoUrl?: string;
    website?: string;
  };
  location: {
    city?: string;
    state?: string;
    country: string;
    zipCode?: string;
    remote?: boolean;
    streetAddress?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    remoteRestriction?: string;
  };
  employmentType: JobEmploymentType;
  industry: string;
  skills: string[];
  experience: {
    level: JobExperienceLevel;
    years: number;
  };
  education: string[];
  languages: string[];
  salary: {
    min?: number;
    max?: number;
    currency: Currency;
  };
  numberOfOpenings: number;
  postedAt: Date;
  validTill: Date;
  remote: boolean;
  benefits: string[];
  applicationLink: string;
  status: JobStatus;
  priority: JobPriority;
  tags: string[];
  views: number;
  applicationsCount: number;
  savedCount: number;
  moderationStatus: JobModerationStatus;
}

export interface JobFilters {
  search: string;
  location: {
    city?: string;
    state?: string;
    country?: string;
  };
  radius: number;
  employmentType?: JobEmploymentType[];
  experienceLevel?: JobExperienceLevel[];
  datePosted?: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  education?: string[];
}