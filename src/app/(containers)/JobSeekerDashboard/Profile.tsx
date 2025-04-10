"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import { useState } from "react"
import Education from "./Education"
import WorkExperience from "./Experience"
import AchievementsAndCertifications from "./Achivements"

export default function Profile() {
    const frameworksList = [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
        { value: "ember", label: "Ember" },
    ]

    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react", "angular"])

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">My Profile</h2>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-1">
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                            <div className="mx-auto flex flex-col items-center">
                                <div className="mb-4">
                                    <Upload className="h-10 w-10 text-gray-400" />
                                </div>
                                <div className="text-sm">Browse Photo</div>
                                <div className="mt-2 text-xs text-gray-500">
                                    Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg & .png
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-1">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" placeholder="Saurabh ubale" className="" />
                        </div>

                        {/* Job Title */}
                        <div className="space-y-1">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input id="jobTitle" placeholder="UI Designer" className="" />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="0 123 456 7890" className="" />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" type="email" placeholder="creativelayers@gmail.com" className="" />
                        </div>

                        

                        {/* Current Salary */}
                        <div className="space-y-1">
                            <Label htmlFor="currentSalary">Current Salary (per anum)</Label>
                            <Input id="currentSalary" type="number" placeholder="450000" className="" />
                        </div>

                        {/* Expected Salary */}
                        <div className="space-y-1">
                            <Label htmlFor="expectedSalary">Expected Salary (per anum)</Label>
                            <Input id="expectedSalary" type="number" placeholder="2000000" className="" />
                        </div>

                        {/* Experience */}
                        <div className="space-y-1">
                            <Label htmlFor="experience">Experience (in years)</Label>
                            <Input id="experience" placeholder="5" className="" />
                        </div>

                        {/* Age */}
                        <div className="space-y-1">
                            <Label htmlFor="age">Age</Label>
                            <Select>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="23 - 27 Years" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="18-22">18-22 Years</SelectItem>
                                    <SelectItem value="23-27">23-27 Years</SelectItem>
                                    <SelectItem value="28-32">28-32 Years</SelectItem>
                                    <SelectItem value="33+">33+ Years</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="languages">Languages</Label>
                            <MultiSelect
                                options={frameworksList}
                                onValueChange={setSelectedFrameworks}
                                defaultValue={selectedFrameworks}
                                placeholder="Select frameworks"
                                variant="inverted"
                                animation={0}
                                maxCount={3}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="languages">Skills</Label>
                            <MultiSelect
                                options={frameworksList}
                                onValueChange={setSelectedFrameworks}
                                defaultValue={selectedFrameworks}
                                placeholder="Select frameworks"
                                variant="inverted"
                                animation={0}
                                maxCount={3}
                            />
                        </div>
                        {/* Website URLs */}
                        <div className="space-y-1">
                            <Label htmlFor="website">Website</Label>
                            <Input id="website" placeholder="www.jerome.com" className="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input id="linkedin" placeholder="www.linkedin.com/in/jerome" className="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input id="facebook" placeholder="www.facebook.com/jerome" className="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="portfolio">Portfolio</Label>
                            <Input id="portfolio" placeholder="www.jeromeportfolio.com" className="" />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" placeholder="Tell us about yourself (max 300 chars)" maxLength={200} className="" />
                        </div>

                    </div>
                </div>
            </Card>

            {/* Address Details Card */}
            <Card className="p-6">
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Address Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <Label htmlFor="streetAddress">Street Address</Label>
                            <Input id="streetAddress" placeholder="123 Main St" className="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="New York" className="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" placeholder="NY" className="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input id="zipCode" placeholder="10001" className="" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="country">Country</Label>
                            <Select>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                    {/* Add more countries as needed */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </Card>
            <Education/>
            <WorkExperience/>
            <AchievementsAndCertifications/>
        </div>
    )
}

