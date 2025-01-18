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
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

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
                    <p>123 Job Portal Street, Career City, 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-primary" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-primary" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>contact@jobportal.com</p>
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
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </CardContent>
            </Card>

            <Card className="border-none  md:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Button>
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
