'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Briefcase, Send, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Youtube } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Footer() {
   const pathname=usePathname();

   if(pathname==='/' || pathname==='/jobseeker' || pathname === '/recruiter' || pathname === '/about' || pathname === '/contact' || pathname === '/blog'
     || pathname === '/faq' || pathname === '/privacy-policy' || pathname === '/terms_conditions')
        
    return (
        <footer className="bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Company Info */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
              <Image
                src="/logo.jpeg"
                alt="Recruit-G"
                width={120}
                height={60}
                className="h-8"
              />
                        </Link>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Phone className="h-5 w-5 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-900">Call us</h3>
                                    <p className="text-lg font-semibold text-blue-600">+91 99108158430</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                                <p className="text-gray-600">
                                FIRST FLOOR, WZ-73, B1 Rd, Nangli Jalib, Janakpuri, New Delhi, Delhi, 110058
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-5 w-5 text-blue-600 mt-1" />
                                <p className="text-gray-600">info@recruit-g.com</p>
                            </div>
                        </div>
                    </div>

                    {/* For Candidates */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">For Candidates</h3>
                        <ul className="space-y-4">
                        {[{label :'Login', link : 'Search Jobs'}, {label :'Create Account', link : '/auth/register'}, {label :'Login', link : '/auth/register'}, {label :'Candidate Dashboard', link : '/job-seeker/dashboard'}].map((item, index) => (
                                    <li key={index}>
                                    <Link
                                     href={item.link}
                                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Employers */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6">For Employers</h3>
                        <ul className="space-y-4">
                                 {[{label :'Login', link : '/auth/login'}, {label :'Create Account', link : '/auth/register'}, {label :'Post a Job', link : '/recruiter'}, {label :'Employer Dashboard', link : '/employer/dashboard'}].map((item, index) => (
                                    <li key={index}>
                                    <Link
                                     href={item.link}
                                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {[{label :'About us', link : 'about'}, {label :'Contact us', link : 'contact'}, {label :'Blog', link : 'blog'}, {label :'FAQ', link : 'faq'}].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.link}
                                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Join Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Join Us On</h3>
                        <p className="text-gray-600 mb-6">We don&lsquo;t send spam so don&lsquo;t worry.</p>
                        <div className="flex gap-2 mb-8">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white border-gray-200 focus:border-blue-500"
                            />
                            <Button
                                size="icon"
                                className="bg-blue-600 px-4 hover:bg-blue-700 shadow-lg rounded-md hover:shadow-blue-200 transition-all"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
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
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600">
                            {`  ${new Date().getFullYear()} Recruit-G. All Right Reserved.`}
                        </p>
                        <div className="flex gap-6">
                        {[{label :'Privacy Policy', link : 'privacy-policy'}, {label :'Terms & Conditions', link : 'terms_conditions'}, {label :'Support', link : '#'}].map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
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
