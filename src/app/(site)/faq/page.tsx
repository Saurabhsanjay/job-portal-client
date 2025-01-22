import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/app/(containers)/JobSeekerHome/PageHeader";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Recruit-G?",
      answer:
        "Recruit-G is a recruitment platform designed to connect employers with job seekers, streamlining the hiring process through advanced technology and user-friendly features.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, visit our website and click on the “Register” button. You’ll need to provide your email address, create a password, and fill out some basic information.",
    },
    {
      question: "Is there a fee to use Recruit-G?",
      answer:
        "Registering with Recruit-G and creating a profile is absolutely free. There is no charge for creating your profile or for applying for jobs. Once you register with Recruit-G, you are automatically added to the Recruit-G CV database and can apply to unlimited jobs.",
    },
    {
      question: "How can I search for jobs?",
      answer:
        "You can search for jobs using keywords, location, and job categories. You can also set up alerts to be notified of new job postings that match your preferences.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "Once you find a job you’re interested in, click the “Apply” button. You may be prompted to upload your resume or you can apply using your Recruit-G profile.",
    },
    {
      question: "How do I create a standout profile?",
      answer:
        "To create a standout profile, include a professional photo, a compelling summary, detailed work experience, and relevant skills. Tailor your profile to highlight your achievements.",
    },
    {
      question: "Can I edit my profile after creating it?",
      answer:
        "Yes! You can edit your profile at any time by logging in and navigating to your profile dashboard.",
    },
    {
      question: "How does Recruit-G protect my data?",
      answer:
        "We prioritize user privacy and data security. All personal information is encrypted, and we comply with data protection regulations.",
    },
    {
      question: "How can employers find suitable candidates?",
      answer:
        "Employers can post job listings, search our database of candidates, and use filters to find applicants that meet their criteria.",
    },
    {
      question: "What support is available if I have issues?",
      answer:
        "If you encounter any issues, you can contact our support team via email or use the live chat feature on our website for immediate assistance.",
    },
    {
      question: "How can I give feedback about my experience?",
      answer:
        "We welcome your feedback! You can submit your comments through our feedback form available on the website or contact support directly.",
    },
  ];

  return (
    <div className="space-y-6 py-12 px-4 md:px-8 lg:px-16">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about Recruit-G. If you have additional queries, feel free to contact us."
      />
      <Card className="shadow-xl border-none border-gray-200">
        <CardContent className="p-6 space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg shadow-sm my-2"
              >
                <AccordionTrigger className="text-md font-medium text-gray-800 hover:text-blue-600 px-4 py-3 rounded-lg flex items-center justify-between transition-all">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-700 bg-gray-50">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
