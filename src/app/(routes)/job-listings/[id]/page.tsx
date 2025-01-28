import { JobDescriptionPage } from "../_components/JobDescriptionPage"

const mockJob = {
    title: "Senior Frontend Developer",
    company: {
        name: "TechCorp",
        logo: "https://png.pngtree.com/template/20190524/ourmid/pngtree-nipplebabydummypacifierkids-purple-business-logo-templat-image_203963.jpg",
    },
    location: {
        city: "London",
        state: "",
        country: "UK",
    },
    salary: "$120k - $150k",
    type: "Full Time",
    posted: new Date("2024-01-25"),
    expires: new Date("2024-02-25"),
    description: `We are seeking a talented Senior Frontend Developer to join our growing team. You will work on cutting-edge web applications using modern technologies and best practices.
The ideal candidate will have strong experience with React, TypeScript, and modern frontend development practices.`,
    responsibilities: [
        "Lead the development of complex frontend applications",
        "Mentor junior developers and conduct code reviews",
        "Work closely with designers to implement pixel-perfect UIs",
        "Optimize application performance and implement best practices",
        "Contribute to technical architecture decisions",
    ],
    requirements: [
        "5+ years of experience with React and modern JavaScript",
        "Strong understanding of TypeScript and state management",
        "Experience with responsive design and cross-browser compatibility",
        "Knowledge of testing frameworks and CI/CD practices",
        "Excellent problem-solving and communication skills",
    ],
    benefits: [
        "Competitive salary and equity package",
        "Remote work flexibility",
        "Health, dental, and vision insurance",
        "Professional development budget",
        "Regular team events and retreats",
    ],
    isPrivate: true,
    isUrgent: true,
}

export default function JobPage() {
    return <JobDescriptionPage job={mockJob} />
}

