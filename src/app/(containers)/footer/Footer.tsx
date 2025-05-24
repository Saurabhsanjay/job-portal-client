"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Youtube, MessageCircle, UtilityPole } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()

  if (
    pathname === "/" ||
    pathname === "/jobseeker" ||
    pathname === "/recruiter" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/blog" ||
    pathname === "/faq" ||
    pathname === "/privacy-policy" ||
    pathname === "/terms_conditions"
  )
    return (
      <footer className="bg-[#2563eb] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center">
                <Image
                  src="/recruitg.png"
                  alt="Recruit-G"
                  width={100}
                  height={10}
                />
              </Link>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-blue-100">Call us</h4>
                    <p className="text-base font-semibold">+91 99108158430</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">
                    FIRST FLOOR, WZ-73, B1 Rd, Nangli Jalib, Janakpuri, New Delhi, Delhi, 110058
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">info@recruit-g.com</p>
                </div>
              </div>
            </div>

            {/* For Candidates */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-100">For Candidates</h3>
              <ul className="space-y-3">
                {[
                  { label: "Search Jobs", link: "/job-listings" },
                  { label: "Create Account", link: "/auth/register?userType=candidate" },
                  { label: "Login", link: "/auth/login?userType=candidate" },
                  { label: "Candidate Dashboard", link: "/job-seeker/dashboard" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="hover:text-blue-200 transition-colors duration-200 flex items-center gap-2 group text-sm"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-100">For Employers</h3>
              <ul className="space-y-3">
                {[
                  { label: "Login", link: "/auth/login?userType=recruiter" },
                  { label: "Create Account", link: "/auth/register?userType=recruiter" },
                  { label: "Post a Job", link: "/post-job" },
                  { label: "Employer Dashboard", link: "/employer/dashboard" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="hover:text-blue-200 transition-colors duration-200 flex items-center gap-2 group text-sm"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-100">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: "About us", link: "/about" },
                  { label: "Contact us", link: "/contact" },
                  { label: "Blog", link: "/blog" },
                  { label: "FAQ", link: "/faq" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className="hover:text-blue-200 transition-colors duration-200 flex items-center gap-2 group text-sm"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-100">Join Us On</h3>
              <p className="mb-6 text-sm text-blue-100">We don&apos;t send spam so don&apos;t worry.</p>
              <div className="flex gap-2 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 text-white border-white/20 placeholder:text-blue-200 focus:border-white focus:bg-white/20 transition-all duration-200"
                />
                <Button
                  size="icon"
                  className="bg-white text-[#2563eb] hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200 flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-3 flex-wrap">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61562808842020", color: "hover:bg-[#1877F2]" },
                  { icon: Twitter, href: "https://x.com/recruitgdotcom", color: "hover:bg-[#1DA1F2]" },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/recruitgdotcom/",
                    color: "hover:bg-[#E4405F]",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/company/recruit-g-global-solutions/",
                    color: "hover:bg-[#0A66C2]",
                  },
                  { icon: Youtube, href: "https://youtube.com/@recruit-g?si=-xU5YNKtqejvrlGN", color: "hover:bg-[#FF0000]" },
                  
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white ${social.color} hover:text-white transition-all duration-200 hover:shadow-lg group border border-white/20 hover:border-transparent`}
                  >
                    <social.icon className="h-4 w-4 transform group-hover:scale-110 transition-transform duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/aarogya.png"
                  alt="Aarogya Techzone"
                  width={120}
                  height={32}
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-sm text-blue-100 text-center lg:text-left max-w-md">
                © {new Date().getFullYear()} All trademarks are properties of their respective owners. All rights
                reserved. Aarogya Techzone Pvt Ltd.
              </p>
              <div className="flex flex-wrap gap-4 lg:gap-6 justify-center lg:justify-end">
                {[
                  { label: "Privacy Policy", link: "/privacy-policy" },
                  { label: "Terms & Conditions", link: "/terms_conditions" },
                  { label: "Support", link: "/contact" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="hover:text-blue-200 transition-colors duration-200 text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}
