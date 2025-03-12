"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { toast } from "@/components/ui/use-toast"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);

      form.reset();
      setIsSubmitting(false);
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className=" bg-gradient-to-br from-blue-100 via-white to-purple-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl">
            We are here to help you with any questions or concerns
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-none  md:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Send us a message</CardTitle>
              <CardDescription className="text-base md:text-md">
                Fill out the form below and we will get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Message subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-4 bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-105 rounded-xl md:rounded-l-none md:rounded-r-2xl shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-none  md:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Contact Information</CardTitle>
                <CardDescription className="text-base md:text-md">
                  Reach out to us through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="text-primary" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>FIRST FLOOR, WZ-73, B1 Rd, Nangli Jalib, Janakpuri, New Delhi, Delhi, 110058</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-primary" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>+91 9910815843</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-primary" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>info@recruit-g.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none  md:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
              </CardContent>
            </Card>

            <Card className="border-none  md:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-4">
              <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: 'https://www.facebook.com/people/Recruit-G', color: 'hover:bg-[#1877F2]' },
                                { icon: Twitter, href: 'https://x.com/bhumikarecruitg', color: 'hover:bg-[#1DA1F2]' },
                                { icon: Instagram, href: 'https://www.instagram.com/recruit_g_global_solution', color: 'hover:bg-[#E4405F]' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/company/recruit-g-global-solutions', color: 'hover:bg-[#0A66C2]' },
                                { icon: Youtube, href: 'https://www.youtube.com/@Recruit-G', color: 'hover:bg-[#E4405F]' },

                            ].map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 ${social.color} hover:text-white transition-all hover:shadow-lg group`}
                                >
                                    <social.icon className="h-5 w-5 transform group-hover:scale-110 transition-transform" />
                                </Link>
                            ))}
                        </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-secondary py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-start mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-start">
              What Our Users Say
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground text-start">
              Discover jobs that align with your passion and skills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Developer",
                company: "Tech Innovators Inc.",
                image: "https://picsum.photos/400",
                quote:
                  "JobConnect helped me find my dream job in just two weeks! The AI-powered matching is incredibly accurate.",
              },
              {
                name: "Michael Chen",
                role: "HR Manager",
                company: "Global Solutions Ltd.",
                image: "https://picsum.photos/400",
                quote:
                  "As an employer, I've found top talent quickly and efficiently. The quality of candidates is outstanding.",
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Specialist",
                company: "Creative Minds Agency",
                image: "https://picsum.photos/400",
                quote:
                  "The career resources provided by JobConnect gave me the edge I needed in my job search. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-full object-cover"
                      width={50}
                      height={50}
                    />
                    <div>
                      <CardTitle className="text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                      <CardDescription>{testimonial.company}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <blockquote className="italic text-muted-foreground">
                    &quot;{testimonial.quote}&ldquo;
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
