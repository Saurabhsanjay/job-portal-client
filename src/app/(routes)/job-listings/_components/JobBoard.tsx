"use client";

import { useState, useEffect, useCallback } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { JobList } from "./JobList";
import type { IJob } from "../types/job.types";
import {
  JobEmploymentType,
  JobExperienceLevel,
  type JobFilters,
} from "../types/job.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useApiGet } from "@/hooks/use-api-query";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Search, SlidersHorizontal } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const locations = [
  { city: "New York", state: "NY", country: "USA" },
  { city: "Los Angeles", state: "CA", country: "USA" },
  { city: "London", state: "", country: "UK" },
  { city: "Paris", state: "", country: "France" },
  { city: "Tokyo", state: "", country: "Japan" },
  { divider: true }, // Divider to separate locations visually
  { city: "Berlin", state: "", country: "Germany" },
  { city: "Sydney", state: "", country: "Australia" },
  { city: "Toronto", state: "ON", country: "Canada" },
];

const salaryRanges = [
  { label: "$0 - $50,000", min: 0, max: 50000 },
  { label: "$50,000 - $100,000", min: 50000, max: 100000 },
  { label: "$100,000 - $150,000", min: 100000, max: 150000 },
  { label: "$150,000+", min: 150000, max: null },
];

const educationLevels = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
];

export function JobBoard() {
  console.log("job board rereendered------------->");
  const searchParams = useSearchParams();
  const query = searchParams.get("title");
  const router = useRouter();

  const [jobs, setJobs] = useState<IJob[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    search: query || "",
    location: {
      city: "",
      state: "",
      country: "",
    },
    radius: 100,
    employmentType: [],
    datePosted: null,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  const [isOpen, setIsOpen] = useState(false);
  const [openCombobox, setOpenCombobox] = useState<string | null>(null);

  // Memoized callback functions to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilters: JobFilters) => {
    setFilters(newFilters);
  }, []);

  const handleRadiusChange = useCallback(
    (value: number[]) => {
      handleFilterChange({ ...filters, radius: value[0] });
    },
    [filters, handleFilterChange]
  );

  const handleEmploymentTypeChange = useCallback(
    (type: JobEmploymentType) => {
      const currentTypes = filters.employmentType || [];
      const updatedTypes = currentTypes.includes(type)
        ? currentTypes.filter((t) => t !== type)
        : [...currentTypes, type];
      handleFilterChange({ ...filters, employmentType: updatedTypes });
    },
    [filters, handleFilterChange]
  );

  const Combobox = useCallback(
    ({
      options,
      value,
      onChange,
      placeholder,
      label,
    }: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: any[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: (value: any) => void;
      placeholder: string;
      label: string;
    }) => (
      <Popover
        open={openCombobox === label}
        onOpenChange={(isOpen) => setOpenCombobox(isOpen ? label : null)}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox === label}
            className="w-full justify-between text-sm md:text-base"
          >
            {value
              ? typeof value === "string"
                ? value
                : `${value.city}, ${value.state ? value.state + ", " : ""}${
                    value.country
                  }`
              : placeholder}
            <SlidersHorizontal className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className="text-sm md:text-base"
            />
            <CommandList>
              <CommandEmpty className="text-sm md:text-base">
                No {label.toLowerCase()} found.
              </CommandEmpty>
              <CommandGroup>
                {options?.map((option, index) =>
                  option.divider ? (
                    <div
                      key={`divider-${index}`}
                      className="border-t my-2"
                    ></div>
                  ) :option?.label?(
                    <CommandItem
                      key={
                        option?.label
                          ? `${option?.label}`
                          : `option-${index}`
                      }
                      onSelect={() => {
                        onChange(option);
                        setOpenCombobox(null);
                      }}
                      className="text-sm md:text-base"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          (
                            typeof value === "string"
                              ? value === option
                              : value?.label === option?.label
                          )
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {typeof option === "string"
                        ? option
                        : `${option?.label}`}
                    </CommandItem>
                  ): (
                    <CommandItem
                      key={
                        option.city
                          ? `${option.city}-${option.state}-${option.country}`
                          : `option-${index}`
                      }
                      onSelect={() => {
                        onChange(option);
                        setOpenCombobox(null);
                      }}
                      className="text-sm md:text-base"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          (
                            typeof value === "string"
                              ? value === option
                              : value?.city === option.city
                          )
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {typeof option === "string"
                        ? option
                        : `${option.city}, ${
                            option.state ? option.state + ", " : ""
                          }${option.country}`}
                    </CommandItem>
                  )
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    ),
    [openCombobox]
  );

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  console.log("filters--------->",filters)

  // Build query parameters based on current filters
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("keywords", filters.search);

    if (filters.location.city) params.set("city", filters.location.city);
    if (filters.location.state) params.set("state", filters.location.state);
    if (filters.location.country)
      params.set("country", filters.location.country);

    if (filters.radius !== 100) params.set("radius", filters.radius.toString());

    if (filters.employmentType && filters.employmentType.length > 0)
      params.set("jobType", filters.employmentType.join(","));

    if (filters.experienceLevel && filters.experienceLevel.length > 0)
      params.set("experienceLevel", filters.experienceLevel.join(","));

    if (filters.datePosted) {
      let datePostedValue = "";
      switch (filters.datePosted) {
        case "24h":
          datePostedValue = "Last 24 hours";
          break;
        case "7d":
          datePostedValue = "Last 7 days";
          break;
        case "14d":
          datePostedValue = "Last 14 days";
          break;
        case "30d":
          datePostedValue = "Last 30 days";
          break;
      }
      if (datePostedValue) params.set("datePosted", datePostedValue);
    }

    if(filters.salaryRange){
      params.set("salaryRange", JSON.stringify(filters.salaryRange))
    }

    if(filters.education){
      params.set("educationLevel", filters.education)
    }

    if (sortBy !== "relevance") params.set("sortBy", sortBy);
    

    return params.toString();
  }, [filters, sortBy]);

  const queryString = buildQueryParams();

  const {
    data: jobList,
    isLoading,
    error,
  } = useApiGet<IJob[]>(
    `jobs/get-jobs${queryString ? `?${queryString}` : ""}`,
    {},
    ["jobs", queryString]
  );

  console.log("job list---->",jobList)

  useEffect(() => {
    // Update jobs when jobList changes
    console.log("job list changes")
    if (jobList?.data) {
      setJobs(jobList.data);
    }
  }, [jobList?.data]);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const handleSaveJob = useCallback((jobId: string) => {
    console.log("Save job:", jobId);
  }, []);

  const handleApplyJob = useCallback(
    (jobId: string) => {
      router.push(`/jobs/${jobId}`);
    },
    [router]
  );

  const FilterContent = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">
          Search by Keywords
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Job title, keywords, or company"
            value={filters.search}
            onChange={(e) =>
              handleFilterChange({ ...filters, search: e.target.value })
            }
            className="pl-9 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Location */}
      {/* <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Location</h3>
        <Combobox
          options={locations}
          value={filters.location.city}
          onChange={(location) => handleFilterChange({ ...filters, location })}
          placeholder="Select location"
          label="Location"
        />

        <div className="space-y-2 md:space-y-4">
          <Label className="text-sm md:text-base">
            Radius around selected destination
          </Label>
          <Slider
            defaultValue={[filters.radius]}
            max={200}
            step={10}
            onValueChange={handleRadiusChange}
          />
          <div className="text-sm text-gray-500">{filters.radius}km</div>
        </div>
      </div> */}

      {/* Salary */}
      {/* <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Salary Range</h3>
        <Combobox
          options={salaryRanges}
          value={
            filters.salary
              ? `$${filters.salary.min?.toLocaleString()} - ${
                  filters.salary.max
                    ? "$" + filters.salary.max.toLocaleString()
                    : ""
                }`
              : undefined
          }
          onChange={(salary) =>
            handleFilterChange({
              ...filters,
              salary: { min: salary.min, max: salary.max },
            })
          }
          placeholder="Select salary range"
          label="Salary"
        />
      </div> */}

      {/* Education */}
      {/* <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Education Level</h3>
        <Combobox
          options={educationLevels}
          value={filters.education?.[0]}
          onChange={(education) =>
            handleFilterChange({ ...filters, education: [education] })
          }
          placeholder="Select education level"
          label="Education"
        />
      </div> */}

      {/* Job Type */}
      {/* <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Job Type</h3>
        <div className="space-y-2">
          {Object.values(JobEmploymentType).map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.employmentType?.includes(type)}
                onCheckedChange={() => handleEmploymentTypeChange(type)}
                className="text-sm md:text-base"
              />
              <label
                htmlFor={type}
                className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type.charAt(0) + type.slice(1).toLowerCase().replace("_", " ")}
              </label>
            </div>
          ))}
        </div>
      </div> */}

      {/* Experience Level */}
      {/* <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Experience Level</h3>
        <RadioGroup
          value={filters.experienceLevel?.[0]}
          onValueChange={(value) =>
            handleFilterChange({
              ...filters,
              experienceLevel: [value as JobExperienceLevel],
            })
          }
        >
          {Object.values(JobExperienceLevel).map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem
                value={level}
                id={level}
                className="text-sm md:text-base"
              />
              <Label htmlFor={level} className="text-sm md:text-base">
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div> */}

      {/* Date Posted */}
      {/* <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Date Posted</h3>
        <RadioGroup
          value={filters.datePosted}
          onValueChange={(value) =>
            handleFilterChange({ ...filters, datePosted: value })
          }
        >
          {["24h", "7d", "14d", "30d"].map((period) => (
            <div key={period} className="flex items-center space-x-2">
              <RadioGroupItem
                value={period}
                id={period}
                className="text-sm md:text-base"
              />
              <Label htmlFor={period} className="text-sm md:text-base">
                Last{" "}
                {period.endsWith("h")
                  ? period.replace("h", " hours")
                  : period.replace("d", " days")}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div> */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 md:px-20">
      <div className="container mx-auto">
        {/* <Input
          placeholder="Job title, keywords, or company"
          value={filters.search}
          onChange={(e) =>
            handleFilterChange({ ...filters, search: e.target.value })
          }
          className="pl-9 text-sm md:text-base"
        /> */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Filters Sidebar - Memoized to prevent re-renders */}
          {/* <FilterSidebar filters={filters} onFilterChange={handleFilterChange} isMobile={isMobile} /> */}
          <div
            className="hidden lg:block w-80 space-y-6 p-4 md:p-6 bg-white rounded-lg shadow-sm border-none overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 40px)" }}
          >
            {/* <FilterContent /> */}
            {isMobile?(
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden text-sm md:text-base">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-4">
                <FilterContent />
              </SheetContent>
            </Sheet>
            ):(
              <div className="space-y-4 md:space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-semibold">
                  Search by Keywords
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange({ ...filters, search: e.target.value })
                    }
                    className="pl-9 text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-semibold">Location</h3>
                <Combobox
                  options={locations}
                  value={filters.location.city}
                  onChange={(location) =>
                    handleFilterChange({ ...filters, location })
                  }
                  placeholder="Select location"
                  label="Location"
                />

                <div className="space-y-2 md:space-y-4">
                  <Label className="text-sm md:text-base">
                    Radius around selected destination
                  </Label>
                  <Slider
                    defaultValue={[filters.radius]}
                    max={200}
                    step={10}
                    onValueChange={handleRadiusChange}
                  />
                  <div className="text-sm text-gray-500">
                    {filters.radius}km
                  </div>
                </div>
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-semibold">
                  Salary Range
                </h3>
                <Combobox
                  options={salaryRanges}
                  value={
                    filters?.salaryRange
                      ? `$${filters?.salaryRange?.min?.toLocaleString()} - ${
                          filters?.salaryRange?.max
                            ? "$" + filters?.salaryRange?.max?.toLocaleString()
                            : ""
                        }`
                      : undefined
                  }
                  onChange={(salary) =>{
                    console.log("salary",salary)
                    handleFilterChange({ ...filters, salaryRange: { min: salary.min, max: salary.max } })
                  }
                  }
                  // onChange={(salary) =>
                  //   handleFilterChange({
                  //     ...filters,
                  //     salary: { min: salary.min, max: salary.max },
                  //   })
                  // }
                  placeholder="Select salary range"
                  label="Salary"
                />
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-semibold">
                  Education Level
                </h3>
                <Combobox
                  options={educationLevels}
                  value={filters.education?.[0]}
                  onChange={(education) =>
                    handleFilterChange({ ...filters, education: [education] })
                  }
                  placeholder="Select education level"
                  label="Education"
                />
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-semibold">Job Type</h3>
                <div className="space-y-2">
                  {Object.values(JobEmploymentType).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={filters.employmentType?.includes(type)}
                        onCheckedChange={() => handleEmploymentTypeChange(type)}
                        className="text-sm md:text-base"
                      />
                      <label
                        htmlFor={type}
                        className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type.charAt(0) +
                          type.slice(1).toLowerCase().replace("_", " ")}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-semibold">
                  Experience Level
                </h3>
                <RadioGroup
                  value={filters.experienceLevel?.[0]}
                  onValueChange={(value) =>{
                    console.log("value------>",value)
                    // const newValue=value+"_LEVEL"
                    handleFilterChange({
                      ...filters,
                      experienceLevel: [value as JobExperienceLevel],
                    })
                  }
                }
                >
                  {Object.values(JobExperienceLevel).map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={level}
                        id={level}
                        className="text-sm md:text-base"
                      />
                      <Label htmlFor={level} className="text-sm md:text-base">
                        {level.charAt(0) + level.slice(1).toLowerCase()}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Date Posted */}
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-semibold">
                  Date Posted
                </h3>
                <RadioGroup
                  value={filters.datePosted}
                  onValueChange={(value) =>
                    handleFilterChange({ ...filters, datePosted: value })
                  }
                >
                  {["24h", "7d", "14d", "30d"].map((period) => (
                    <div key={period} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={period}
                        id={period}
                        className="text-sm md:text-base"
                      />
                      <Label htmlFor={period} className="text-sm md:text-base">
                        Last{" "}
                        {period.endsWith("h")
                          ? period.replace("h", " hours")
                          : period.replace("d", " days")}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            )}
            
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2 md:gap-4">
              <div className="text-sm md:text-base text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-900">{jobs.length}</span>{" "}
                jobs
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                {isMobile && (
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    isMobile={isMobile}
                  />
                )}
                <Select defaultValue={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[140px] md:w-[180px] text-sm md:text-base">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="relevance"
                      className="text-sm md:text-base"
                    >
                      Most Relevant
                    </SelectItem>
                    <SelectItem value="recent" className="text-sm md:text-base">
                      Most Recent
                    </SelectItem>
                    <SelectItem
                      value="salary-high"
                      className="text-sm md:text-base"
                    >
                      Highest Salary
                    </SelectItem>
                    <SelectItem
                      value="salary-low"
                      className="text-sm md:text-base"
                    >
                      Lowest Salary
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job List - Memoized to prevent re-renders */}
            <JobList
              jobs={jobs}
              isLoading={isLoading}
              error={error}
              onSaveJob={handleSaveJob}
              onApplyJob={handleApplyJob}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
