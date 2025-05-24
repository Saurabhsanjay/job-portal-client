import { PageHeader } from "@/app/(containers)/JobSeekerHome/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DataProtection() {
  const sections = [
    {
      title: "1. Introduction",
      content: `
        The Recruit-G Data Protection and Privacy (DPDP) Act outlines our commitment to safeguarding personal data and ensuring compliance with data protection regulations. This Act sets forth the policies and procedures Recruit-G adheres to in the collection, use, processing, and protection of personal data.
        
        Our comprehensive approach ensures that all personal data is handled with the utmost care and in accordance with applicable laws including GDPR, CCPA, and other relevant data protection regulations.`,
    },
    {
      title: "2. Data Subject Rights Policy",
      content: `
        Recruit-G acknowledges and respects the rights of individuals with respect to their personal data. This policy outlines the rights of data subjects and how they can exercise these rights.`,
      subsections: [
        {
          title: "2.1. Right to Access",
          content: `Description: Data subjects have the right to request access to their personal data held by Recruit-G.
Procedure: Requests must be submitted in writing to the Data Protection Officer (DPO). Recruit-G will respond within 30 days of receiving the request.`,
        },
        {
          title: "2.2. Right to Rectification",
          content: `Description: Data subjects can request correction of inaccurate or incomplete personal data.
Procedure: Requests must be directed to the DPO. DPO will make necessary corrections and notify the data subject of the updates.`,
        },
        {
          title: "2.3. Right to Erasure",
          content: `Description: Data subjects can request the deletion of personal data under certain conditions.
Procedure: Requests must be submitted to the DPO. DPO will evaluate the request and, if appropriate, erase the data and notify the data subject.`,
        },
        {
          title: "2.4. Right to Restrict Processing",
          content: `Description: Data subjects can request the restriction of processing their personal data in specific circumstances.
Procedure: Requests must be made to the DPO. Recruit-G will implement the restriction and inform the data subject.`,
        },
        {
          title: "2.5. Right to Data Portability",
          content: `Description: Data subjects can request their data in a structured, commonly used format or request direct transmission to another controller.
Procedure: Requests should be submitted to the DPO. Recruit-G will comply with the request where feasible.`,
        },
        {
          title: "2.6. Right to Object",
          content: `Description: Data subjects can object to the processing of their personal data based on legitimate interests or direct marketing.
Procedure: Objections should be made to the DPO. Recruit-G will cease processing unless there are compelling legitimate grounds.`,
        },
      ],
    },
    {
      title: "3. Data Privacy Policy",
      content: `
        Recruit-G is committed to protecting the privacy of personal data and ensuring its security.`,
      subsections: [
        {
          title: "3.1. Data Collection",
          content: `Scope: Recruit-G collects personal data necessary for business operations, including contact details, identification information, and transactional data.
Purpose: Data is collected to provide and improve services, communicate effectively, and comply with legal obligations.`,
        },
        {
          title: "3.2. Data Use",
          content: `Scope: Personal data is used for its intended purposes and not for any incompatible purposes.
Limitations: Data is processed in accordance with the principle of data minimization.`,
        },
        {
          title: "3.3. Data Sharing",
          content: `Scope: Data may be shared with third parties for operational reasons or with consent.
Third-Party Compliance: Third parties are required to adhere to data protection standards similar to those upheld by Recruit-G.`,
        },
        {
          title: "3.4. Data Security",
          content: `Measures: Recruit-G implements technical and organizational measures to protect personal data from unauthorized access, alteration, or loss.
Review: Security measures are regularly reviewed and updated.`,
        },
        {
          title: "3.5. Data Breach Notification",
          content: `Scope: In the event of a data breach, Recruit-G will notify affected individuals and relevant authorities within 24 hours of discovery.
Procedure: Breach notifications will include details of the breach, potential consequences, and mitigation measures.`,
        },
      ],
    },
    {
      title: "4. Evidence of Data Protection Officer (DPO)",
      content: `
        Recruit-G has appointed a Data Protection Officer to oversee data protection practices.`,
      subsections: [
        {
          title: "4.1. DPO Details",
          content: `Name: Anil Kumar
Email: anil.k@recruit-g.com`,
        },
        {
          title: "4.2. Responsibilities",
          content: `Oversight: Monitor compliance with data protection laws.
Advice: Provide guidance on data protection impact assessments and policies.
Liaison: Serve as the contact point for data subjects and regulatory authorities.`,
        },
      ],
    },
    {
      title: "5. Record of Processing Activities",
      content: `
        Recruit-G maintains a comprehensive record of processing activities to ensure transparency and accountability.`,
      subsections: [
        {
          title: "5.1. Record Contents",
          content: `Details: Includes the purposes of processing, categories of personal data, categories of data subjects, and retention periods.
Review: The record is reviewed regularly and updated as necessary.`,
        },
        {
          title: "5.2. Documentation",
          content: `Access: The record is available for inspection by relevant authorities as required.`,
        },
      ],
    },
    {
      title: "6. Data Transfer Policy",
      content: `
        Recruit-G ensures that international transfers of personal data comply with applicable data protection laws.`,
      subsections: [
        {
          title: "6.1. Transfer Mechanisms",
          content: `Compliance: Transfers outside the European Economic Area (EEA) are conducted using mechanisms such as Standard Contractual Clauses (SCCs) or ensuring adequate data protection standards in the receiving country.`,
        },
        {
          title: "6.2. Safeguards",
          content: `Measures: Adequate safeguards are implemented to protect personal data during international transfers.`,
        },
      ],
    },
    {
      title: "7. Data Processor Agreement",
      content: `
        Recruit-G enters into agreements with data processors to ensure compliance with data protection standards.`,
      subsections: [
        {
          title: "7.1. Agreement Content",
          content: `Clauses: Agreements include obligations related to data protection, confidentiality, and security measures.
Compliance: Processors are required to comply with applicable data protection laws and standards.`,
        },
        {
          title: "7.2. Processor Responsibilities",
          content: `Security: Implement technical and organizational measures to protect personal data.
Notification: Inform Recruit-G of any data breaches involving personal data.`,
        },
      ],
    },
    {
      title: "8. Data Retention Policy",
      content: `
        Recruit-G establishes a data retention policy to ensure that personal data is kept only as long as necessary.`,
      subsections: [
        {
          title: "8.1. Retention Periods",
          content: `Criteria: Personal data is retained based on legal, regulatory, and operational requirements.
Review: Retention periods are regularly reviewed to ensure compliance with data protection laws.`,
        },
        {
          title: "8.2. Data Disposal",
          content: `Procedure: When data is no longer needed, it is securely disposed of to prevent unauthorized access or use.`,
        },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-6 py-10 space-y-8">
      <PageHeader
        title="Data Protection & Privacy Act"
        description="Our comprehensive framework for protecting personal data and ensuring compliance with data protection regulations."
      />
      <Card className="border-gray-200 border-none shadow-sm">
        <CardContent className="p-6 space-y-8">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>GDPR & CCPA Compliant:</strong> This document outlines Recruit-G's commitment to data
                  protection and privacy in accordance with international standards including GDPR, CCPA, and other
                  applicable data protection regulations.
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
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed mb-4">{section.content}</p>

                {/* Render subsections if they exist */}
                {section.subsections && (
                  <div className="space-y-4">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="bg-gray-50 border-l-2 border-gray-300 pl-4 py-3 rounded-r">
                        <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                          <Badge variant="outline" className="mr-2 text-xs">
                            {subsection.title.split(".")[0]}
                          </Badge>
                          {subsection.title}
                        </h3>
                        <p className="text-gray-600 whitespace-pre-wrap leading-relaxed text-sm">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                9
              </span>
              Contact Us
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about this Policy or our data protection practices, please contact
              us at:
            </p>

            <div className="bg-white border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Badge className="bg-blue-100 text-blue-800 mr-2">DPO</Badge>
                Data Protection Officer
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Name:</strong> Anil Kumar
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:anil.k@recruit-g.com" className="text-blue-600 hover:text-blue-800 underline">
                    anil.k@recruit-g.com
                  </a>
                </p>
                <p>
                  <strong>Response Time:</strong> Within 30 days of receiving your request
                </p>
                <p>
                  <strong>Available:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Emergency Data Breach Contact</h4>
              <p className="text-sm text-yellow-700">
                For urgent data protection matters or suspected data breaches, contact our 24/7 emergency line:
              </p>
              <p className="text-sm font-medium text-yellow-800 mt-1">
                Email: emergency@recruit-g.com | Phone: +91 99108158430
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Your Rights Summary</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Access your personal data</li>
                <li>• Correct inaccurate information</li>
                <li>• Request data deletion</li>
                <li>• Restrict data processing</li>
                <li>• Data portability</li>
                <li>• Object to processing</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Compliance Standards</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-100 text-purple-800">GDPR</Badge>
                <Badge className="bg-purple-100 text-purple-800">CCPA</Badge>
                <Badge className="bg-purple-100 text-purple-800">ISO 27001</Badge>
                <Badge className="bg-purple-100 text-purple-800">SOC 2</Badge>
              </div>
              <p className="text-sm text-purple-700 mt-2">
                We maintain compliance with international data protection standards.
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-100">
            <p>
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="mt-2">
              This document is subject to periodic updates. Users will be notified of significant changes through the
              platform and email notifications.
            </p>
            <p className="mt-1 text-xs">
              Document Version: 2.1 | Next Review Date:{" "}
              {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
