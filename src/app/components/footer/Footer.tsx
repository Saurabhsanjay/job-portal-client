'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Briefcase, Send, Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react'
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Company Info */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
                            <div className="bg-blue-600 text-white p-2 rounded-lg transform group-hover:rotate-12 transition-transform">
                                <Briefcase className="h-6 w-6" />
                            </div>
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                Recruit-G
                            </span>
                        </Link>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Phone className="h-5 w-5 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-medium text-gray-900">Call us</h3>
                                    <p className="text-lg font-semibold text-blue-600">123 456 7890</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                                <p className="text-gray-600">
                                    329 Queensberry Street, North Melbourne VIC 3051, Australia.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-5 w-5 text-blue-600 mt-1" />
                                <p className="text-gray-600">support@recruit-g.com</p>
                            </div>
                        </div>
                    </div>

                    {/* For Candidates */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">For Candidates</h3>
                        <ul className="space-y-4">
                            {['Browse Jobs', 'Browse Categories', 'Candidate Dashboard', 'Job Alerts', 'My Bookmarks'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Employers */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-6">For Employers</h3>
                        <ul className="space-y-4">
                            {['Browse Candidates', 'Employer Dashboard', 'Add Job', 'Job Packages'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">About Us</h3>
                        <ul className="space-y-4">
                            {['Job Page', 'Job Page Alternative', 'Resume Page', 'Blog', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
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
                                { icon: Facebook, href: '#', color: 'hover:bg-[#1877F2]' },
                                { icon: Twitter, href: '#', color: 'hover:bg-[#1DA1F2]' },
                                { icon: Instagram, href: '#', color: 'hover:bg-[#E4405F]' },
                                { icon: Linkedin, href: '#', color: 'hover:bg-[#0A66C2]' }
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
                            {['Privacy Policy', 'Terms & Conditions', 'Support'].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
