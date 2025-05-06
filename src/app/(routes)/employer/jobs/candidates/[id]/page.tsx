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
  ArrowLeftCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  ExternalLink,
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
import { useApiGet, useApiPatch } from "@/hooks/use-api-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

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

export interface CandidateShortlistResponse {
  status: string;
  statusCode: number;
  message: string;
  formattedMessage: string;
  data: CandidateShortlistData;
}

export interface CandidateShortlistData {
  _id: string;
  jobId: string;
  candidateId: string;
  status: "SHORTLISTED";
  isShortlisted: boolean;
  isBookmarked: boolean;
  isDeleted: boolean;
  appliedDate: string;        // ISO Date string
  shortlistedDate: string;    // ISO Date string
  createdAt: string;          // ISO Date string
  updatedAt: string;          // ISO Date string
  __v: number;
}

interface CandidateShortlistPayload{
  isShortlisted: boolean;
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
  const [activeTab, setActiveTab] = React.useState("profile")

  const [selectedCandidate, setSelectedCandidate] =
    React.useState<JobApplication | null>(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] =
    React.useState(false);
  const [shortlistedCandidates, setShortlistedCandidates] = React.useState<
    Set<string>
  >(new Set());

  const {
    data: AppliedCandidatesData,
    isLoading,
    error,
    refetch: refetchAppliedCandidates,
  } = useApiGet<JobApplicationsResponse>(
    `applied-candidates/job/${jobId}`,
    {},
    ["jobs"]
  );
  console.log("AppliedCandidatesData", AppliedCandidatesData);

  const shortlistCandidateMutation = useApiPatch<CandidateShortlistResponse, CandidateShortlistPayload>();

  React.useEffect(() => {
    if (AppliedCandidatesData?.data?.applications) {
      setCandidates(AppliedCandidatesData?.data?.applications);
    }
  }, [AppliedCandidatesData]);

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
    return candidates.filter((candidate) => {
      console.log("candidate", candidate);
      const matchesSearch = appliedFilters.search
        ? candidate?.candidateId?.personalDetails?.firstName
            .toLowerCase()
            .includes(appliedFilters.search.toLowerCase()) ||
          candidate?.jobSeekerDetails?.professionalExperience[0]?.jobTitle
            .toLowerCase()
            .includes(appliedFilters.search.toLowerCase()) ||
          candidate.candidateId?.personalDetails?.address?.city
            .toLowerCase()
            .includes(appliedFilters.search.toLowerCase())
        : true;

      const matchesJobTitle =
        appliedFilters.jobTitle === "All titles" ||
        candidate?.jobSeekerDetails?.professionalExperience[0]?.jobTitle ===
          appliedFilters.jobTitle;
      const matchesLocation =
        appliedFilters.location === "All locations" ||
        candidate?.candidateId?.personalDetails?.address?.city ===
          appliedFilters.location;
      const matchesDate =
        !appliedFilters.date ||
        format(candidate.shortlistedDate, "PP") ===
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

  const handleViewDetails = (candidate: JobApplication) => {
    console.log("candidate------->", candidate);
    setSelectedCandidate(candidate);
    setIsUserDetailsModalOpen(true);
  };

  const handleToggleShortlist = (candidate: JobApplication) => {
    // setShortlistedCandidates((prev) => {
    //   const newSet = new Set(prev)
    //   if (newSet.has(candidateId)) {
    //     newSet.delete(candidateId)
    //   } else {
    //     newSet.add(candidateId)
    //   }
    //   return newSet
    // })

    shortlistCandidateMutation.mutate(
          {
            endpoint: `applied-candidates/shortlist/${candidate?._id}`,
            payload: {
              "isShortlisted":candidate?.isShortlisted ? false : true,
            },
            invalidateQueries: [["shortlist-candidate"]],
          },
          {
            onSuccess: (response) => {
              // setIsSubmitting(false);
              if (response.data) {
                toast.success("Candidate shortlisted successfully");
                refetchAppliedCandidates()
                setIsUserDetailsModalOpen(false);
              } else if (response.error) {
                toast.error(response?.error?.message || "Something Went Wrong");
              }
            },
            onError: (error) => {
              // setIsSubmitting(false);
              toast.error(error?.message || "Something Went Wrong");
            },
          }
        );
  }

  // const handleShortlistFromModal = () => {
  //   if (selectedCandidate) {
  //     handleToggleShortlist(selectedCandidate._id)
  //   }
  //   setIsUserDetailsModalOpen(false)
  // }

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "-"
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return error
    }
  }

  return (
    <Card className="p-6 shadow-sm border-none">
      <Link href="/employer/jobs">
        <ArrowLeftCircle className="h-5 w-5 mb-2" />
      </Link>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Applied Candidates
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
                <PopoverContent className="w-auto p-0" align="start">
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
                <TableHead className="w-[100px] text-nowrap">
                  Shortlist
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">
                    No Applied Candidates To Show
                  </TableCell>
                </TableRow>
              ) : (
                filteredCandidates.map((candidate, index) => (
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
                            alt={
                              candidate?.name ||
                              candidate?.candidateId?.personalDetails?.firstName
                            }
                          />
                          <AvatarFallback>
                            {candidate?.name?.[0] ||
                              candidate?.candidateId?.personalDetails
                                ?.firstName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {candidate?.name ||
                              candidate?.candidateId?.personalDetails
                                ?.firstName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {candidate?.candidateId?.personalDetails?.email ||
                              "No email"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {candidate?.jobTitle ||
                        candidate?.candidateId?.jobSeekerDetails
                          ?.professionalDetails?.currentJobTitle}
                    </TableCell>
                    <TableCell>
                      {candidate?.candidateId?.personalDetails?.address?.city ||
                        "-"}
                    </TableCell>
                    <TableCell>
                      {format(candidate?.appliedDate, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {candidate?.shortlistedDate
                        ? format(candidate?.shortlistedDate, "MMM d, yyyy")
                        : "-"}
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
                            candidate?.candidateId?.jobSeekerDetails
                              ?.professionalDetails?.resume?.url || ""
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewDetails(candidate)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant={
                          shortlistedCandidates.has(candidate._id)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => handleToggleShortlist(candidate)}
                      >
                        {candidate?.isShortlisted
                          ? "Shortlisted"
                          : "Shortlist"}
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
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>{candidate?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{candidate.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {candidate.company}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {candidate.jobTitle}
                  </div>
                  <div className="text-sm text-gray-500">
                    {candidate.location}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Applied: {format(candidate.appliedDate, "MMM d, yyyy")}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Shortlisted:{" "}
                    {candidate.shortlistedDate
                      ? format(candidate.shortlistedDate, "MMM d, yyyy")
                      : "-"}
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={candidate.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Resume
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(candidate)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant={
                        shortlistedCandidates.has(candidate._id)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handleToggleShortlist(candidate)}
                    >
                      {candidate?.isShortlisted
                        ? "Shortlisted"
                        : "Shortlist"}
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

        <Dialog open={isUserDetailsModalOpen} onOpenChange={setIsUserDetailsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
            <DialogHeader>
              <DialogTitle>Candidate Details</DialogTitle>
              <DialogDescription>Full details of the selected candidate</DialogDescription>
            </DialogHeader>

            {selectedCandidate && (
              <div className="grid gap-6">
                {/* Header with basic info */}
                <div className="bg-muted/30 p-3 md:p-6 rounded-lg">
                  <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
                    <Avatar className="h-20 w-20 md:h-24 md:w-24">
                      <AvatarImage
                        src={selectedCandidate?.candidateId?.personalDetails?.profilePicture || "/placeholder.svg"}
                        alt={selectedCandidate?.candidateId?.personalDetails?.firstName || "Candidate"}
                      />
                      <AvatarFallback className="text-lg">
                        <User className="h-6 w-6 md:h-8 md:w-8" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-center md:text-left flex-1 space-y-2">
                      <h3 className="text-xl md:text-2xl font-medium">
                        {selectedCandidate?.candidateId?.personalDetails?.firstName || ""}{" "}
                        {selectedCandidate?.candidateId?.personalDetails?.lastName || ""}
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg">
                        {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.currentJobTitle || "-"}
                      </p>

                      <div className="flex flex-col gap-2 mt-2">
                        {selectedCandidate?.candidateId?.personalDetails?.email && (
                          <div className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
                            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">{selectedCandidate.candidateId.personalDetails.email}</span>
                          </div>
                        )}

                        {selectedCandidate?.candidateId?.personalDetails?.phoneNumber && (
                          <div className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span>
                              {selectedCandidate.candidateId.personalDetails.phoneNumber.countryCode}{" "}
                              {selectedCandidate.candidateId.personalDetails.phoneNumber.number}
                            </span>
                          </div>
                        )}

                        {selectedCandidate?.candidateId?.personalDetails?.address?.city && (
                          <div className="flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="truncate">
                              {selectedCandidate.candidateId.personalDetails.address.city}
                              {selectedCandidate.candidateId.personalDetails.address.state
                                ? `, ${selectedCandidate.candidateId.personalDetails.address.state}`
                                : ""}
                              {selectedCandidate.candidateId.personalDetails.address.country
                                ? `, ${selectedCandidate.candidateId.personalDetails.address.country}`
                                : ""}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-center gap-4 md:gap-2 mt-2 md:mt-0 w-full md:w-auto">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Applied:</span>{" "}
                        <span className="font-medium">{formatDate(selectedCandidate.appliedDate)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Status:</span>{" "}
                        <Badge variant="outline" className="ml-1">
                          {selectedCandidate.status || "Applied"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs for different sections */}
                <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-4 w-full">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4">
                    {/* Professional Details */}
                    <div className="grid gap-4">
                      <h4 className="text-lg font-medium">Professional Details</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-3 md:p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <h5 className="font-medium">Work Information</h5>
                          </div>
                          <div className="grid gap-2 text-sm">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <span className="text-muted-foreground">Current Job:</span>
                              <span className="sm:text-right">
                                {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails
                                  ?.currentJobTitle || "-"}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <span className="text-muted-foreground">Experience:</span>
                              <span className="sm:text-right">
                                {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails
                                  ?.totalExperience || "-"}{" "}
                                years
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <span className="text-muted-foreground">Notice Period:</span>
                              <span className="sm:text-right">
                                {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.noticePeriod ||
                                  "-"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-3 md:p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <h5 className="font-medium">Compensation</h5>
                          </div>
                          <div className="grid gap-2 text-sm">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <span className="text-muted-foreground">Current CTC:</span>
                              <span className="sm:text-right">
                                $
                                {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.currentCTC ||
                                  "-"}
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <span className="text-muted-foreground">Expected CTC:</span>
                              <span className="sm:text-right">
                                $
                                {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.expectedCTC ||
                                  "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="border rounded-lg p-3 md:p-4">
                        <h5 className="font-medium mb-3">Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.skills?.map(
                            (skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ),
                          ) || <p className="text-muted-foreground text-sm">No skills listed</p>}
                        </div>
                      </div>

                      {/* Bio */}
                      {selectedCandidate?.candidateId?.personalDetails?.bio && (
                        <div className="border rounded-lg p-3 md:p-4">
                          <h5 className="font-medium mb-2">Bio</h5>
                          <p className="text-sm">{selectedCandidate.candidateId.personalDetails.bio}</p>
                        </div>
                      )}

                      {/* External Links */}
                      <div className="border rounded-lg p-3 md:p-4">
                        <h5 className="font-medium mb-3">Links & Documents</h5>
                        <div className="flex flex-wrap gap-4">
                          {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.linkedIn && (
                            <a
                              href={selectedCandidate.candidateId.jobSeekerDetails.professionalDetails.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline text-sm"
                            >
                              <ExternalLink className="h-4 w-4 flex-shrink-0" />
                              LinkedIn
                            </a>
                          )}

                          {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.portfolio && (
                            <a
                              href={selectedCandidate.candidateId.jobSeekerDetails.professionalDetails.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline text-sm"
                            >
                              <ExternalLink className="h-4 w-4 flex-shrink-0" />
                              Portfolio
                            </a>
                          )}

                          {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.resume?.url && (
                            <a
                              href={selectedCandidate.candidateId.jobSeekerDetails.professionalDetails.resume.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline text-sm"
                            >
                              <FileText className="h-4 w-4 flex-shrink-0" />
                              Resume
                            </a>
                          )}

                          {!selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.linkedIn &&
                            !selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.portfolio &&
                            !selectedCandidate?.candidateId?.jobSeekerDetails?.professionalDetails?.resume?.url && (
                              <p className="text-muted-foreground text-sm">No links available</p>
                            )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4">
                    <h4 className="text-lg font-medium">Work Experience</h4>
                    {selectedCandidate?.candidateId?.jobSeekerDetails?.professionalExperience?.length > 0 ? (
                      <div className="space-y-4">
                        {selectedCandidate.candidateId.jobSeekerDetails.professionalExperience.map((exp, index) => (
                          <div key={index} className="border rounded-lg p-3 md:p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                              <div>
                                <h5 className="font-medium">{exp.jobTitle}</h5>
                                <p className="text-muted-foreground">{exp.companyName}</p>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                              </div>
                            </div>
                            {exp.keyAchievements && (
                              <div className="mt-2">
                                <p className="text-sm mt-2">{exp.keyAchievements}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 md:py-8 border rounded-lg">
                        <p className="text-muted-foreground">No work experience listed</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4">
                    <h4 className="text-lg font-medium">Education</h4>
                    {selectedCandidate?.candidateId?.jobSeekerDetails?.education?.length > 0 ? (
                      <div className="space-y-4">
                        {selectedCandidate.candidateId.jobSeekerDetails.education.map((edu, index) => (
                          <div key={index} className="border rounded-lg p-3 md:p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                              <div>
                                <h5 className="font-medium">{edu.qualification}</h5>
                                <p className="text-muted-foreground">{edu.institution}</p>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                              </div>
                            </div>
                            {edu.grade && (
                              <div className="mt-1 text-sm">
                                <span className="text-muted-foreground">Grade: </span>
                                {edu.grade}
                              </div>
                            )}
                            {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 md:py-8 border rounded-lg">
                        <p className="text-muted-foreground">No education details listed</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            <DialogFooter className="mt-4 md:mt-6 flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsUserDetailsModalOpen(false)} className="w-full sm:w-auto">
                Close
              </Button>
              <Button onClick={()=>{handleToggleShortlist(selectedCandidate)}} className="w-full sm:w-auto">
                {selectedCandidate?.isShortlisted
                  ? "Remove from Shortlist"
                  : "Shortlist Candidate"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
