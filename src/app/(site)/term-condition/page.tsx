import { PageHeader } from "@/app/components/JobSeekerDashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function TermCondition() {
  const sections = [
    {
      title: "1. Terms",
      content: `
        By accessing or using the Recruit-G platform, you (the “User”) agree to comply with and be legally bound by these Terms and Conditions (the “Terms”). 
        If you do not agree with any part of these Terms, you must refrain from using the platform.`,
    },
    {
      title: "2. User Accounts",
      content: `
        2.1 Registration: Users must create an account to access certain features of Recruit-G. During registration, you agree to provide accurate, complete, and current information.
        2.2 Account Security: You are responsible for maintaining the confidentiality of your account password and for any activities under your account. Notify Recruit-G immediately of any unauthorized use of your account or any other breach of security.
        2.3 Account Termination: Recruit-G reserves the right to suspend or terminate your account at any time, without prior notice, if we suspect any violation of these Terms or misuse of the platform.`,
    },
    {
      title: "3. User Obligations",
      content: `
        3.1 Profile Information: Users must provide truthful, accurate, and up-to-date information in their profiles and during the job application process. Any misleading information may result in account termination.
        3.2 Prohibited Conduct: Users agree not to engage in any of the following activities:
        - Posting job listings that are misleading, discriminatory, or unlawful.
        - Harassing, threatening, or defaming other users or Recruit-G staff.
        - Using the platform for any illegal activities, including but not limited to fraud or theft.
        - Attempting to interfere with the platform’s operation, security, or performance.
        3.3 Compliance with Laws: Users must comply with all applicable laws and regulations while using the platform.`,
    },
    {
      title: "4. Job Listings",
      content: `
        4.1 Content Responsibility: Employers are solely responsible for the content of job postings. Recruit-G does not endorse any employer or job listing and is not responsible for the accuracy or legality of any job information.
        4.2 Right to Remove Listings: Recruit-G reserves the right to review, edit, or remove any job listing at its discretion, especially if the listing violates these Terms or applicable laws.
        4.3 No Agency Relationship: Posting a job listing on Recruit-G does not create an agency relationship between the employer and Recruit-G.`,
    },
    {
      title: "5. Intellectual Property",
      content: `
        5.1 Ownership: All content, trademarks, and other intellectual property displayed on Recruit-G, including but not limited to logos, text, graphics, and software, are owned by Recruit-G or its licensors.
        5.2 Limited License: You are granted a limited, non-exclusive, non-transferable license to access and use the platform for personal, non-commercial purposes. Any other use is prohibited without express written consent from Recruit-G.
        5.3 User Content: By submitting content (e.g., resumes, cover letters) to Recruit-G, you grant Recruit-G a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content as part of the platform.`,
    },
  ];

  return (
    <div className="container mx-auto px-6 py-10 space-y-8">
      <PageHeader
        title="Terms & Conditions"
        description="Learn about your rights and responsibilities when using the Recruit-G platform."
      />
      <Card className="border-gray-200">
        <CardContent className="p-6 space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="space-y-4 text-left">
              <h2 className="text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
