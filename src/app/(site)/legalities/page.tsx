import { PageHeader } from "@/app/(containers)/JobSeekerHome/PageHeader"
import { Card, CardContent } from "@/components/ui/card"

export default function Legalities() {
  const sections = [
    {
      title: "1. Employment Law Compliance",
      content: `
        Anti-Discrimination Laws: Recruit-G ensures adherence to laws such as the Equal Employment Opportunity Commission (EEOC) regulations in the U.S. and similar laws in other jurisdictions. This includes prohibiting discrimination based on race, gender, age, disability, and other protected characteristics.
        
        Fair Labor Standards Act (FLSA): We understand regulations regarding minimum wage, overtime, and child labour, particularly when recruiting for various job types. All job postings must comply with applicable labor standards.`,
    },
    {
      title: "2. Data Privacy and Protection",
      content: `
        GDPR Compliance: When operating in the EU or dealing with EU citizens, Recruit-G ensures compliance with the General Data Protection Regulation. This includes obtaining consent for data collection, ensuring data security, and allowing candidates to exercise their rights regarding personal data.
        
        CCPA: For California-based operations, we comply with the California Consumer Privacy Act, which includes transparency around data collection and user rights.
        
        Data Security: We implement robust data protection measures to secure personal information of candidates and employers from breaches. All data is encrypted and stored securely using industry-standard protocols.`,
    },
    {
      title: "3. Contracts and Agreements",
      content: `
        Terms of Service: We clearly define the terms under which users access and use the platform. This includes disclaimers, limitations of liability, and dispute resolution mechanisms.
        
        Service Level Agreements (SLAs): For businesses using the platform, we outline the expected service standards, including response times and availability guarantees. Our platform maintains 99.9% uptime with 24/7 monitoring.`,
    },
    {
      title: "4. Intellectual Property",
      content: `
        Trademarks: The Recruit-G brand name and logo are protected trademarks. We ensure that no existing trademarks are infringed upon in our operations.
        
        Copyrights: We safeguard original content on the platform, such as job descriptions, articles, and user-generated content. All content is protected under applicable copyright laws.
        
        User Content: Users retain ownership of their submitted content while granting Recruit-G necessary licenses to operate the platform effectively.`,
    },
    {
      title: "5. Licensing and Permits",
      content: `
        Business Licenses: Recruit-G maintains all necessary local, state, and federal licenses and permits for operating a recruitment business across our operational jurisdictions.
        
        Recruitment Agency Licenses: Depending on the jurisdiction, we obtain specific licenses required to operate as a recruitment agency. We maintain compliance with all regulatory requirements in each market we serve.`,
    },
    {
      title: "6. Employment Practices and Policies",
      content: `
        Background Checks: When conducting background checks, we comply with the Fair Credit Reporting Act (FCRA) and other applicable laws, including obtaining proper consent from candidates.
        
        Job Posting Compliance: We ensure that job advertisements comply with legal standards, avoiding misleading statements and ensuring transparency about job conditions. All postings are reviewed for compliance.
        
        Equal Opportunity: We promote equal employment opportunities and do not tolerate discriminatory practices in job postings or recruitment processes.`,
    },
    {
      title: "7. Dispute Resolution",
      content: `
        Arbitration Clauses: Our contracts include arbitration clauses to manage disputes outside of court, which can save time and costs for all parties involved.
        
        Legal Jurisdiction: We specify which state or country's laws govern the terms of service and contracts, providing clarity for all users.
        
        Mediation Services: We offer mediation services for disputes between employers and candidates to resolve conflicts amicably.`,
    },
    {
      title: "8. User Agreement and Liability",
      content: `
        Liability Limitations: We clearly outline the platform's liability in relation to the accuracy of job postings, candidate qualifications, and employer practices. Users acknowledge these limitations when using our services.
        
        Indemnification Clauses: Our agreements include clauses that protect the platform from legal claims arising from the actions of users, while ensuring fair treatment for all parties.
        
        User Responsibilities: Users are responsible for the accuracy of their information and compliance with applicable laws in their use of the platform.`,
    },
    {
      title: "9. Monitoring and Reporting Obligations",
      content: `
        Mandatory Reporting: We are familiar with legal obligations to report data breaches or other issues to authorities and affected individuals within required timeframes.
        
        Compliance Monitoring: We continuously monitor our platform for compliance with applicable laws and regulations, implementing updates as needed.
        
        Incident Response: We maintain comprehensive incident response procedures to address any legal or security issues promptly and effectively.`,
    },
    {
      title: "10. International Considerations",
      content: `
        Global Compliance: When operating in multiple countries, we understand and comply with local employment laws, data protection regulations, and business practices to ensure global compliance.
        
        Cross-Border Data Transfers: We implement appropriate safeguards for international data transfers, including Standard Contractual Clauses and adequacy decisions where applicable.
        
        Local Partnerships: We work with local legal experts in each jurisdiction to ensure ongoing compliance with regional requirements.`,
    },
    {
      title: "11. Legal Consultation and Updates",
      content: `
        Professional Legal Advice: Recruit-G consults with legal professionals specializing in employment law, data privacy, and technology to ensure comprehensive compliance and protection.
        
        Regular Updates: We regularly review and update our legal practices to reflect changes in applicable laws and regulations.
        
        User Communication: We communicate any significant legal changes to our users through appropriate channels and provide reasonable notice of updates to our terms and policies.
        
        Risk Mitigation: Our legal framework is designed to mitigate risks and build trust with users, ultimately contributing to the platform's success and reliability.`,
    },
  ]

  return (
    <div className="container mx-auto px-6 py-10 space-y-8">
      <PageHeader
        title="Legal Considerations"
        description="Understanding the legal framework and compliance measures that govern the Recruit-G platform."
      />
      <Card className="border-gray-200 border-none shadow-sm">
        <CardContent className="p-6 space-y-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Important Notice:</strong> This document outlines the legal considerations and compliance
                  measures implemented by Recruit-G. For specific legal advice regarding your use of the platform,
                  please consult with qualified legal professionals.
                </p>
              </div>
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="space-y-4 text-left border-b border-gray-100 pb-6 last:border-b-0">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <div className="ml-11">
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Legal Department:</strong> legal@recruit-g.com
              </p>
              <p>
                <strong>Data Protection Officer:</strong> dpo@recruit-g.com
              </p>
              <p>
                <strong>Compliance Inquiries:</strong> compliance@recruit-g.com
              </p>
              <p>
                <strong>Address:</strong> FIRST FLOOR, WZ-73, B1 Rd, Nangli Jalib, Janakpuri, New Delhi, Delhi, 110058
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-100">
            <p>
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="mt-2">
              This document is subject to periodic updates. Users will be notified of significant changes through the
              platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
