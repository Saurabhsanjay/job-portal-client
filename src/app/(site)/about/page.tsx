import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-primary text-primary-foreground flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-background.jpg"
            alt="Job seekers"
            fill
            style={{ objectFit: "cover" }}
            className="opacity-20"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Connecting Talent with Opportunity
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Your journey to the perfect career starts here
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-8">
            At JobConnect, we are on a mission to revolutionize the way people
            find and secure their dream jobs. We believe that everyone deserves
            a fulfilling career, and we are here to make that happen.
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
          <h2 className="text-3xl font-bold mb-12 text-center">
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
              <Card key={index} className="hover:shadow-lg transition-shadow">
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
          <h2 className="text-3xl font-bold mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Jane Doe",
                role: "CEO",
                image: "/images/team-member-1.jpg",
              },
              {
                name: "John Smith",
                role: "CTO",
                image: "/images/team-member-2.jpg",
              },
              {
                name: "Emily Brown",
                role: "Head of HR",
                image: "/images/team-member-3.jpg",
              },
              {
                name: "Michael Johnson",
                role: "Lead Developer",
                image: "/images/team-member-4.jpg",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
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
      <section className="bg-primary text-primary-foreground py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "1M+", label: "Job Seekers" },
              { number: "50K+", label: "Companies" },
              { number: "500K+", label: "Successful Placements" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-xl">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join JobConnect today and take the first step towards your dream
          career.
        </p>
        <Button size="lg" className="text-lg px-8">
          Sign Up Now
        </Button>
      </section>
    </div>
  );
}
