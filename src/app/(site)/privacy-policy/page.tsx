import { PageHeader } from "@/app/components/JobSeekerDashboard/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Privacy Policy for Recruit-G",
      content: `
        Recruit-G (“Us”, “We” or “Our”) is dedicated to safeguarding user’s privacy (“You” & “Your”). When you use our website and services, we collect, use, disclose, and protect your information as described in this Privacy Policy. You accept the policies and procedures outlined in this document by using or accessing Recruit-G.`,
    },
    {
      title: "1. Data we gather",
      content: `
        1.1 Individualized Data: We may obtain personal information from you when you use our services, apply for jobs, or create an account. This information may include, but is not limited to:
        - Name, phone number, email address, and physical address
        - Age, gender, nationality, and other demographic data
        - Employment Details: Work experience, job descriptions, competencies, and expert referrals
        - Educational Background: Schools you attended, degrees achieved, and enrollment dates
        - Application Materials: Cover letters, resumes, and other files sent in for consideration
        
        1.2 Non-individual Data: When you visit our website, we could automatically collect non-personal information like:
        - Usage Data: Details on how you use our website, such as the pages you view, how long you spend there, and the URLs that you are referred to.
        - Device Information: IP address, operating system, browser type, and device type
        - Cookies and Tracking Technologies: Information gathered by cookies and related technologies to improve your visit to our website.`,
    },
    {
      title: "2. How Your Information is processed by Us",
      content: `
        Recruit-G uses the data it gathers for a number of objectives, such as:
        - Account Management: Establishing, preserving, and overseeing your user account.
        - Job Search Facilitation: Handling your applications, connecting you with job vacancies and interviews, and matching you with opportunities.
        - Customer Support: To offer help and address questions or issues.
        - Service Improvement: Evaluating user behavior and preferences to improve services and user experience.
        - Marketing Communications: If you have given permission, to send you job notifications, newsletters, and promotional materials.
        - Compliance: To uphold our terms and conditions and honor our legal commitments.`,
    },
    {
      title: "3. Information Sharing",
      content: `
        3.1 Independent Contractors: Your personal information might be disclosed to outside service providers who help us run our platform, handle business, or offer you with services, including:
        - Payment processors
        - Hosting providers
        - Analytics and marketing services
        - Customer service platforms
        
        These third parties may only use your information for the purposes for which it was supplied, and they are contractually required to protect it.
        
        3.2 Employers: Employers may receive access to your application details and profile when you apply for a job through Recruit-G. They may use this data to assess your credentials and contact you about open positions.
        
        3.3 Legal Conditions: If compelled by law or in response to a legitimate legal request, we may be obliged to reveal your information.`,
    },
    {
      title: "4. Security of Data",
      content: `
        We put in place appropriate security measures to guard against unauthorized access, use, or disclosure of your personal data. Among these actions are:
        - Data encryption
        - Secure firewalls and servers
        - Authentication measures and access controls
        
        However, we cannot guarantee 100% secure transmission over the internet or electronic storage. It is recommended that you use caution when accessing the internet.`,
    },
    {
      title: "5. Your Legal Position",
      content: `
        5.1 Accuracy and Access: You have the right to see, update, or remove your personal data at any point. You can change the details associated with your account by contacting us directly or through your profile settings.
        
        5.2 Withdrawal: You may withdraw consent for processing of your personal data at any time, subject to legal requirements.
        
        5.3 Cookies: Cookies and other tracking technologies are used to improve your experience on our website. You can control your cookie preferences via your browser settings.
        
        5.4 Data Portability: You may request a copy of your personal information in a structured, commonly used, and machine-readable format, where applicable.`,
    },
    {
      title: "6. Links to Other Websites",
      content: `
        Our platform may contain links to other websites or services. The content and privacy policies of those websites are not under our control. We advise you to read their privacy policies before sharing any personal data.`,
    },
    {
      title: "7. Children’s Privacy",
      content: `
        Recruit-G does not intentionally gather personal data from children under the age of thirteen. If we become aware of having collected personal data from a child under 13, we will take steps to remove such data. Please contact us if you believe we may have collected such data.`,
    },
  ];

  return (
    <div className="container mx-auto px-6 py-10 space-y-8">
      <PageHeader
        title="Privacy & Policy"
        description="Learn how Recruit-G protects and handles your personal information."
      />
      <Card className="shadow-lg border border-gray-200">
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
