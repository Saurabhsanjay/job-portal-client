import React from 'react'
import { JobBoard } from './_components/JobBoard'
import { Currency, JobEmploymentType, JobExperienceLevel, JobModerationStatus, JobPriority, JobStatus } from './types/job.types';
 const mockJobs = [
    {
        _id: "1",
        title: "Senior Frontend Developer",
        description: "We are seeking an experienced Frontend Developer to join our dynamic team. The ideal candidate will have strong expertise in React, TypeScript, and modern web technologies. You'll be responsible for building scalable user interfaces and contributing to our design system.",
        company: {
            name: "TechCorp Solutions",
            logoUrl: "/placeholder.svg?text=TC",
            website: "https://techcorp.com"
        },
        location: {
            city: "San Francisco",
            state: "CA",
            country: "USA",
            zipCode: "94105",
            remote: true
        },
        employmentType: JobEmploymentType.FULL_TIME,
        industry: "Technology",
        skills: ["React", "TypeScript", "Next.js", "CSS", "GraphQL", "Jest"],
        experience: {
            level: JobExperienceLevel.SENIOR,
            years: 5
        },
        education: ["Bachelor's Degree", "Master's Degree (Preferred)"],
        languages: ["English"],
        salary: {
            min: 120000,
            max: 180000,
            currency: Currency.USD
        },
        numberOfOpenings: 2,
        postedAt: new Date("2024-01-20"),
        validTill: new Date("2024-03-20"),
        remote: true,
        benefits: [
            "Health Insurance",
            "401(k) Matching",
            "Unlimited PTO",
            "Remote Work"
        ],
        applicationLink: "https://techcorp.com/careers",
        status: JobStatus.ACTIVE,
        priority: JobPriority.HIGH,
        tags: ["React", "Frontend", "Remote"],
        views: 450,
        applicationsCount: 35,
        savedCount: 89,
        moderationStatus: JobModerationStatus.APPROVED
    },
    {
        _id: "2",
        title: "UX/UI Designer",
        description: "Join our creative team as a UX/UI Designer. You'll be responsible for creating beautiful, intuitive interfaces for our products. Work closely with product managers and developers to bring designs to life.",
        company: {
            name: "DesignHub",
            logoUrl: "/placeholder.svg?text=DH",
            website: "https://designhub.io"
        },
        location: {
            city: "London",
            country: "UK",
            zipCode: "EC1V",
        },
        employmentType: JobEmploymentType.FULL_TIME,
        industry: "Design",
        skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
        experience: {
            level: JobExperienceLevel.MID,
            years: 3
        },
        education: ["Bachelor's in Design or related field"],
        languages: ["English"],
        salary: {
            min: 45000,
            max: 65000,
            currency: Currency.GBP
        },
        numberOfOpenings: 1,
        postedAt: new Date("2024-01-25"),
        validTill: new Date("2024-02-25"),
        remote: false,
        benefits: [
            "Health Insurance",
            "Annual Bonus",
            "Learning Budget"
        ],
        applicationLink: "https://designhub.io/careers",
        status: JobStatus.ACTIVE,
        priority: JobPriority.NORMAL,
        tags: ["Design", "UX", "UI"],
        views: 280,
        applicationsCount: 42,
        savedCount: 65,
        moderationStatus: JobModerationStatus.APPROVED
    },
    {
        _id: "3",
        title: "DevOps Engineer",
        description: "Looking for a skilled DevOps Engineer to help us build and maintain our cloud infrastructure. Experience with AWS, Docker, and Kubernetes is required. You'll be responsible for improving our deployment processes and maintaining high availability.",
        company: {
            name: "CloudScale",
            logoUrl: "/placeholder.svg?text=CS",
            website: "https://cloudscale.tech"
        },
        location: {
            city: "Berlin",
            country: "Germany",
            remote: true
        },
        employmentType: JobEmploymentType.CONTRACT,
        industry: "Cloud Computing",
        skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Python"],
        experience: {
            level: JobExperienceLevel.SENIOR,
            years: 5
        },
        education: ["Bachelor's in Computer Science or equivalent"],
        languages: ["English", "German"],
        salary: {
            min: 70000,
            max: 90000,
            currency: Currency.EUR
        },
        numberOfOpenings: 3,
        postedAt: new Date("2024-01-15"),
        validTill: new Date("2024-03-15"),
        remote: true,
        benefits: [
            "Flexible Hours",
            "Remote Work",
            "Conference Budget"
        ],
        applicationLink: "https://cloudscale.tech/jobs",
        status: JobStatus.ACTIVE,
        priority: JobPriority.URGENT,
        tags: ["DevOps", "Cloud", "Remote"],
        views: 320,
        applicationsCount: 28,
        savedCount: 45,
        moderationStatus: JobModerationStatus.APPROVED
    },
    {
        _id: "4",
        title: "Data Scientist",
        description: "We're seeking a Data Scientist to join our analytics team. You'll work on challenging problems in machine learning and help derive insights from our vast dataset. Strong background in statistics and Python required.",
        company: {
            name: "DataMind AI",
            logoUrl: "/placeholder.svg?text=DM",
            website: "https://datamind.ai"
        },
        location: {
            city: "Toronto",
            country: "Canada",
            zipCode: "M5V",
        },
        employmentType: JobEmploymentType.FULL_TIME,
        industry: "Artificial Intelligence",
        skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "PyTorch", "Statistics"],
        experience: {
            level: JobExperienceLevel.MID,
            years: 3
        },
        education: ["Master's Degree in Data Science, Statistics, or related field"],
        languages: ["English"],
        salary: {
            min: 90000,
            max: 130000,
            currency: Currency.USD
        },
        numberOfOpenings: 1,
        postedAt: new Date("2024-01-22"),
        validTill: new Date("2024-02-22"),
        remote: true,
        benefits: [
            "Health & Dental",
            "Stock Options",
            "Flexible Hours",
            "Remote Work"
        ],
        applicationLink: "https://datamind.ai/careers",
        status: JobStatus.ACTIVE,
        priority: JobPriority.HIGH,
        tags: ["Data Science", "AI", "Machine Learning"],
        views: 245,
        applicationsCount: 52,
        savedCount: 78,
        moderationStatus: JobModerationStatus.APPROVED
    },
    {
        _id: "5",
        title: "Product Marketing Manager",
        description: "Join our marketing team to help launch and grow our products. You'll be responsible for go-to-market strategies, product messaging, and working closely with product and sales teams.",
        company: {
            name: "GrowthLabs",
            logoUrl: "/placeholder.svg?text=GL",
            website: "https://growthlabs.co"
        },
        location: {
            city: "New York",
            state: "NY",
            country: "USA",
            zipCode: "10012",
        },
        employmentType: JobEmploymentType.FULL_TIME,
        industry: "Marketing",
        skills: ["Product Marketing", "Market Research", "Content Strategy", "Analytics", "Campaign Management"],
        experience: {
            level: JobExperienceLevel.SENIOR,
            years: 6
        },
        education: ["Bachelor's in Marketing or Business"],
        languages: ["English"],
        salary: {
            min: 100000,
            max: 140000,
            currency: Currency.USD
        },
        numberOfOpenings: 1,
        postedAt: new Date("2024-01-24"),
        validTill: new Date("2024-02-24"),
        remote: false,
        benefits: [
            "Health Insurance",
            "401(k)",
            "Gym Membership",
            "Annual Bonus"
        ],
        applicationLink: "https://growthlabs.co/careers",
        status: JobStatus.ACTIVE,
        priority: JobPriority.NORMAL,
        tags: ["Marketing", "Product", "Strategy"],
        views: 180,
        applicationsCount: 25,
        savedCount: 34,
        moderationStatus: JobModerationStatus.APPROVED
    }
];
export default function page() {
    return (
        <JobBoard initialJobs={mockJobs} />
    )
}

