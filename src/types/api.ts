 
  export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
  }
  
  // Example comment type
  export interface Comment {
    id: number
    content: string
    postId: number
    userId: number
    createdAt: string
  }
  
  // Employer Profile types
  export interface Benefit {
    title: string
    description: string
  }
  
  export interface SocialMedia {
    facebook?: string
    twitter?: string
    linkedIn?: string
    instagram?: string
  }
  
  export interface EmployerProfile {
    name: string
    description: string
    email: string
    phone: string
    website: string
    establishedDate: string
    teamSize: string
    industry: string
    allowInSearch: boolean
    about: string
    benefits: Benefit[]
    country: string
    city: string
    state: string
    address: string
    socialMedia: SocialMedia
  }
  
  export interface EmployerProfileResponse {
    id: string
    profile: EmployerProfile
    createdAt: string
    updatedAt: string
  }
  
  