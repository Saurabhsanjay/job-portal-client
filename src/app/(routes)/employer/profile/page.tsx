"use client"

import * as React from "react"
import { Building2, Facebook, Twitter, Linkedin, Instagram, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const industries = ["Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Other"]

export default function CompanyProfile() {
    const [logo, setLogo] = React.useState<string | null>(null)
    const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>([])

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogo(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }



    return (
        <div className="space-y-4 bg-gray-50 md:p-0  rounded-xl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Company Profile</h1>
                    <p className="text-muted-foreground mt-2">Manage your company information and visibility</p>
                </div>
                <Link href="/employer/profile/preview">
                    <Button variant="outline" className="text-sm">
                        Preview
                    </Button>
                </Link>
            </div>

            {/* Branding Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Company Branding</CardTitle>
                    <CardDescription>Upload your company logo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex flex-col">
                    <div className="space-y-4">
                        <Label>Company Logo</Label>
                        <div className="flex items-center gap-4">
                            <div className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative hover:border-gray-400 transition-colors">
                                {logo ? (
                                    <Image
                                        src={logo || "/placeholder.svg"}
                                        width={100}
                                        height={100}
                                        alt="Company logo"
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <Building2 className="h-10 w-10 text-gray-400" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleLogoUpload}
                                />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p>Upload your company logo</p>
                                <p>Max file size: 1MB. Formats: JPG, PNG</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Basic Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter your company&apos;s basic details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input placeholder="Enter company name" />
                        </div>
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="company@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input placeholder="https://example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>Established Date</Label>
                            <Input type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label>Team Size</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1-10">1-10 employees</SelectItem>
                                    <SelectItem value="11-50">11-50 employees</SelectItem>
                                    <SelectItem value="51-200">51-200 employees</SelectItem>
                                    <SelectItem value="201-500">201-500 employees</SelectItem>
                                    <SelectItem value="501+">501+ employees</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Industry</Label>
                        <div className="flex flex-wrap gap-2">
                            {industries.map((industry) => (
                                <Badge
                                    key={industry}
                                    variant={selectedIndustries.includes(industry) ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSelectedIndustries((prev) =>
                                            prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
                                        )
                                    }}
                                >
                                    {industry}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch id="allowSearch" />
                        <Label htmlFor="allowSearch">Allow in Search & Listing</Label>
                    </div>
                </CardContent>
            </Card>

            {/* About Card */}
            <Card>
                <CardHeader>
                    <CardTitle>About Company</CardTitle>
                    <CardDescription>Tell potential candidates about your company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        placeholder="Describe your company's mission, values, and culture..."
                        className="min-h-[200px] w-full"
                    />
                    <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center space-x-2">
                            <Sparkles className="h-4 w-4" />
                            <span>Generate with AI</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Benefits and Perks Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Benefits and Perks</CardTitle>
                    <CardDescription>Highlight the advantages of working at your company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select benefit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="health">Health Insurance</SelectItem>
                                        <SelectItem value="dental">Dental Coverage</SelectItem>
                                        <SelectItem value="vision">Vision Care</SelectItem>
                                        <SelectItem value="retirement">401(k) Plan</SelectItem>
                                        <SelectItem value="pto">Paid Time Off</SelectItem>
                                        <SelectItem value="remote">Remote Work</SelectItem>
                                        <SelectItem value="education">Education Assistance</SelectItem>
                                        <SelectItem value="gym">Gym Membership</SelectItem>
                                        <SelectItem value="custom">Custom Benefit</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input placeholder={`Describe benefit ${index}`} className="flex-grow" />
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <Label>Custom Benefits</Label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Input placeholder="Custom benefit name" className="w-[180px]" />
                                <Input placeholder="Describe custom benefit" className="flex-grow" />
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">
                            + Add Another Custom Benefit
                        </Button>
                    </div>
                    <div className="flex justify-between items-center">
                        <Button variant="outline" className="w-auto">
                            + Add Another Benefit
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center space-x-2">
                            <Sparkles className="h-4 w-4" />
                            <span>Generate Benefits with AI</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Add your company&apos;s location details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Country</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>City</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select city" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ny">New York</SelectItem>
                                    <SelectItem value="sf">San Francisco</SelectItem>
                                    <SelectItem value="la">Los Angeles</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Complete Address</Label>
                        <Textarea placeholder="Enter your company's full address" />
                    </div>
                </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                    <CardDescription>Connect your company&apos;s social media accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <Facebook className="h-5 w-5 text-blue-600" />
                            <Input placeholder="Facebook profile URL" className="" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Twitter className="h-5 w-5 text-blue-400" />
                            <Input placeholder="Twitter profile URL" className="" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Linkedin className="h-5 w-5 text-blue-800" />
                            <Input placeholder="LinkedIn profile URL" className="" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Instagram className="h-5 w-5 text-pink-500" />
                            <Input placeholder="Instagram profile URL" className="" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </div>
        </div>
    )
}

