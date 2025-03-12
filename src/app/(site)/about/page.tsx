import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-primary text-primary-foreground flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://picsum.photos/400"
            alt="Job seekers"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-20"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">
            Connecting Talent with Opportunity
          </h1>
          <p className="text-xl md:text-2xl">
            Your journey to the perfect career starts here
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">About Recruit-G Global Solutions</h2>
          <p className="text-lg mb-8">
          An advanced platform called Recruit-G was created to make hiring easier for both companies and candidates. Since its launch in early 2016, it has grown to become one of the Gulf’s most popular job sites, drawing thousands of visitors each day from nations such the UAE, Saudi Arabia, Bahrain, Kuwait, Oman, and Qatar.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              Innovation
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              Integrity
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              Empowerment
            </Badge>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-secondary py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Why Choose JobConnect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Matching",
                description:
                  "Our advanced algorithms ensure you find the perfect fit.",
              },
              {
                title: "Extensive Network",
                description:
                  "Connect with top employers across various industries.",
              },
              {
                title: "Career Resources",
                description:
                  "Access a wealth of tools to boost your professional growth.",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg shadow-none transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-start mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-start">
              Meet Our Team
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground text-start">
              Meet the talented team driving our success with passion and
              expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Jane Doe",
                role: "CEO",
                image: "https://picsum.photos/400",
              },
              {
                name: "John Smith",
                role: "CTO",
                image: "https://picsum.photos/400",
              },
              {
                name: "Emily Brown",
                role: "Head of HR",
                image: "https://picsum.photos/400",
              },
              {
                name: "Michael Johnson",
                role: "Lead Developer",
                image: "https://picsum.photos/400",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden shadow-none">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials/Stats */}
      <section className="bg-gradient-to-br from-blue-100 via-white to-purple-100 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "1M+", label: "Job Seekers" },
              { number: "50K+", label: "Companies" },
              { number: "500K+", label: "Successful Placements" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-semibold mb-2">{stat.number}</p>
                <p className="text-xl">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join JobConnect today and take the first step towards your dream
          career.
        </p>
        <Link href="/auth/register" className="flex-shrink-0">
        <Button
          size="lg"
          className="w-full md:w-auto px-4 bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 rounded-md md:rounded-l-none md:rounded-md shadow-lg hover:shadow-xl"
        >
          Sign Up Now
        </Button>
        </Link>
        
      </section>
    </div>
  );
}
