"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  FileText,
  Search,
  CalendarIcon,
  Loader,
  Loader2,
  ArrowLeftCircle,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApiGet } from "@/hooks/use-api-query";
import { useParams } from "next/navigation";
import Link from "next/link";

const jobTitles = [
  "All titles",
  "Software Engineer",
  "Product Designer",
  "UI/UX Designer",
  "Frontend Developer",
];

const locations = [
  "All locations",
  "London, UK",
  "New York, US",
  "Berlin, DE",
  "Paris, FR",
];

export interface JobApplicationsResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: {
    applications: JobApplication[];
    pagination: Pagination;
  };
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface JobApplication {
  _id: string;
  jobId: {
    _id: string;
    title: string;
  };
  candidateId: Candidate;
  status: string;
  isShortlisted: boolean;
  appliedDate: string;
  shortlistedDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isBookmarked: boolean;
  isDeleted: boolean;
}

export interface Candidate {
  _id: string;
  role: string;
  personalDetails: PersonalDetails;
  jobSeekerDetails: JobSeekerDetails;
  createdAt: string;
  updatedAt: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  age: string;
  bio: string;
  address: Address;
  phoneNumber: PhoneNumber;
  profilePicture: string;
  gender: string;
  email: string;
  password: string;
  languages: string[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface PhoneNumber {
  number: string;
  countryCode: string;
}

export interface JobSeekerDetails {
  education: Education[];
  professionalExperience: ProfessionalExperience[];
  achivements: Achievement[];
  professionalDetails: ProfessionalDetails;
  applicationsHistory: any[]; // can be refined later if structure known
  jobPreferences: JobPreferences;
}

export interface Education {
  qualification: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
  grade: string;
  _id: string;
}

export interface ProfessionalExperience {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  keyAchievements: string;
  _id: string;
}

export interface Achievement {
  title: string;
  organization: string;
  issuedDate: string;
  description: string;
  _id: string;
}

export interface ProfessionalDetails {
  currentJobTitle: string;
  totalExperience: number;
  skills: string[];
  noticePeriod: string;
  currentCTC: number;
  expectedCTC: number;
  website: string;
  linkedIn: string;
  facebook: string;
  portfolio: string;
  resume: Resume;
}

export interface Resume {
  url: string;
  isVerified: boolean;
  isPublic: boolean;
  _id: string;
}

export interface JobPreferences {
  jobAlerts: boolean;
  preferredIndustries: string[];
  preferredJobTitles: string[];
  preferredLocations: string[];
}

// Mock data generator
const generateMockData = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, index) => ({
    id: start + index,
    name: ["John Doe", "Jane Smith", "Mike Johnson", "Emily Brown"][
      Math.floor(Math.random() * 4)
    ],
    jobTitle: [
      "Software Engineer",
      "Product Designer",
      "UI/UX Designer",
      "Frontend Developer",
    ][Math.floor(Math.random() * 4)],
    company: ["TechCorp", "DesignHub", "InnovateLabs", "WebFlow"][
      Math.floor(Math.random() * 4)
    ],
    location: ["London, UK", "New York, US", "Berlin, DE", "Paris, FR"][
      Math.floor(Math.random() * 4)
    ],
    appliedDate: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
    shortlistedDate: new Date(2024, 1, Math.floor(Math.random() * 28) + 1),
    resumeUrl: `/resumes/resume_${start + index}.pdf`,
    avatar: `/placeholder.svg?text=${Math.floor(Math.random() * 100)}`,
  }));
};

export default function AppliedCandidates() {
  const params = useParams();
  const jobId = params?.id as string;
  const [candidates, setCandidates] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [filters, setFilters] = React.useState({
    search: "",
    jobTitle: "All titles",
    location: "All locations",
    date: undefined as Date | undefined,
  });
  const [appliedFilters, setAppliedFilters] = React.useState(filters);

  const { data: ShortlistedCandidatesData, isLoading } =
    useApiGet<JobApplicationsResponse>(
      `applied-candidates/shortlisted-candidates-data/${jobId}`,
      {},
      ["jobs"]
    );
  console.log("ShortlistedCandidatesData", ShortlistedCandidatesData);

  React.useEffect(() => {
    if (ShortlistedCandidatesData?.data) {
      setCandidates(ShortlistedCandidatesData?.data);
    }
  }, [ShortlistedCandidatesData]);

  const observer = React.useRef<IntersectionObserver>(null);
  const lastCandidateElementRef = React.useRef<HTMLDivElement>(null);

  const loadMoreCandidates = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newCandidates = generateMockData(
        candidates.length,
        candidates.length + 10
      );
      setCandidates((prev) => [...prev, ...newCandidates]);
      setLoading(false);
      if (candidates.length >= 50) setHasMore(false); // Limit for demo
    }, 500);
  }, [candidates.length]);

  React.useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        // loadMoreCandidates();
      }
    });

    if (lastCandidateElementRef.current) {
      observer.current.observe(lastCandidateElementRef.current);
    }
  }, [loading, hasMore, loadMoreCandidates]);

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const filteredCandidates = React.useMemo(() => {
    return candidates?.filter((candidate) => {
      console.log("candidate", candidate);
      const matchesSearch = appliedFilters?.search
        ? candidate?.candidateId?.firstName
            .toLowerCase()
            .includes(appliedFilters?.search?.toLowerCase()) ||
          candidate?.candidateId?.professionalDetails?.currentJobTitle
            .toLowerCase()
            .includes(appliedFilters?.search?.toLowerCase()) ||
          candidate?.jobId?.location?.city
            .toLowerCase()
            .includes(appliedFilters?.search?.toLowerCase())
        : true;

      const matchesJobTitle =
        appliedFilters.jobTitle === "All titles" ||
        candidate?.candidateId?.professionalDetails?.currentJobTitle ===
          appliedFilters?.jobTitle;
      const matchesLocation =
        appliedFilters.location === "All locations" ||
        candidate?.jobId?.location?.city === appliedFilters?.location;
      const matchesDate =
        !appliedFilters.date ||
        format(candidate?.shortlistedDate, "PP") ===
          format(appliedFilters.date, "PP");

      return matchesSearch && matchesJobTitle && matchesLocation && matchesDate;
    });
  }, [candidates, appliedFilters]);

  const handleReset = () => {
    setFilters({
      search: "",
      jobTitle: "All titles",
      location: "All locations",
      date: undefined,
    });
    setAppliedFilters({
      search: "",
      jobTitle: "All titles",
      location: "All locations",
      date: undefined,
    });
  };

  return (
    <Card className="p-6 shadow-sm border-none">
      <Link href="/employer/jobs">
        <ArrowLeftCircle className="h-5 w-5 mb-2" />
      </Link>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Shortlisted Candidates
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Global Search Input */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search candidate name, company, or location..."
                value={appliedFilters.search}
                onChange={(e) =>
                  setAppliedFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                className="pl-8"
              />
            </div>

            {/* Date Picker (Date Posted) */}
            <div className="w-full md:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !filters.date && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.date ? format(filters.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0"  align="start">
                  <Calendar
                    mode="single"   
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    selected={appliedFilters.date}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onSelect={(date: Date) =>
                      setAppliedFilters((prev) => ({
                        ...prev,
                        date: date ? date : undefined,
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
            <Button className="hidden" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Table/Cards Section */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Candidate</TableHead>
                <TableHead className="w-[200px]">Job Title</TableHead>
                <TableHead className="w-[150px]">Location</TableHead>
                <TableHead className="w-[150px]">Applied Date</TableHead>
                <TableHead className="w-[150px]">Shortlisted Date</TableHead>
                <TableHead className="w-[100px]">Resume</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center font-medium text-md"
                  >
                    No Candidates To Show
                  </TableCell>
                </TableRow>
              ) : isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  </TableCell>
                </TableRow>
              ) : (
                filteredCandidates?.map((candidate, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              candidate?.avatar ||
                              candidate?.candidateId?.personalDetails
                                ?.profilePicture
                            }
                            alt={candidate?.candidateId?.firstName || "Avatar"}
                          />
                          <AvatarFallback>
                            {candidate?.candidateId?.firstName?.[0] || "P"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {candidate?.candidateId?.firstName || "No name"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {candidate?.candidateId?.email || "No email"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {candidate?.candidateId?.professionalDetails
                        ?.currentJobTitle || "No Title"}
                    </TableCell>
                    <TableCell>
                      {candidate?.jobId?.location?.city || "-"}
                    </TableCell>
                    <TableCell>
                      {format(candidate?.appliedDate, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(candidate?.shortlistedDate, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a
                          href={
                            candidate?.candidateId?.professionalDetails?.resume
                              ?.url || ""
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredCandidates.map((candidate, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      candidate?.avatar ||
                      candidate?.candidateId?.personalDetails?.profilePicture
                    }
                    alt={candidate?.candidateId?.firstName || "Avatar"}
                  />
                  <AvatarFallback>
                    {candidate?.candidateId?.firstName?.[0] || "P"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">
                    {candidate?.candidateId?.firstName || "No name"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {candidate?.candidateId?.email || "No email"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {candidate?.candidateId?.professionalDetails
                      ?.currentJobTitle || "No Title"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {candidate?.jobId?.location?.city || "-"}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Applied: {format(candidate?.appliedDate, "MMM d, yyyy")}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Shortlisted:{" "}
                    {format(candidate?.shortlistedDate, "MMM d, yyyy")}
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={
                          candidate?.candidateId?.professionalDetails?.resume
                            ?.url || ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Resume
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Loading and Intersection Observer Reference */}
        <div ref={lastCandidateElementRef} className="py-4 text-center">
          {loading && (
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
