import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import searchjob from "../../../../public/searchjob.jpg";
import Link from "next/link";

export default function BrowseJobs() {
  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 md:py-6">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-8 items-center gap-12">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
            Browse Hundreds of Jobs
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            To start searching for jobs, you can attend job fairs online or in
            person, use job boards and career websites or reach out directly to
            recruiters in a targeted company to broaden your network.
          </p>

          <ul className="space-y-4">
            {[
              "Discover new opportunities on job boards and career websites",
              "Network with recruiters to expand your professional connections",
              "Stay informed about industry trends and job market insights",
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-600">
                <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <Link href="/job-listings">
            <Button className="bg-[#1e2b58] hover:bg-[#2a3b6e] text-white px-8 py-5 rounded-xl text-lg">
              Discover More
            </Button>
          </Link>
        </div>

        <div className="relative w-full h-64 md:h-[400px] lg:h-[600px]">
          <Image
            src={searchjob}
            alt="Job search illustration showing people connecting online"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
