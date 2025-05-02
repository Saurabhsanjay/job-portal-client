"use client"

import { useState, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { JobEmploymentType, JobExperienceLevel, type JobFilters } from "../types/job.types"
import { Search, SlidersHorizontal } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
  filters: JobFilters
  onFilterChange: (filters: JobFilters) => void
  isMobile: boolean
}

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
]

const salaryRanges = [
  { label: "$0 - $50,000", min: 0, max: 50000 },
  { label: "$50,000 - $100,000", min: 50000, max: 100000 },
  { label: "$100,000 - $150,000", min: 100000, max: 150000 },
  { label: "$150,000+", min: 150000, max: null },
]

const educationLevels = ["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctorate"]

export function FilterSidebar({ filters, onFilterChange, isMobile }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openCombobox, setOpenCombobox] = useState<string | null>(null)

  const handleRadiusChange = (value: number[]) => {
    onFilterChange({ ...filters, radius: value[0] })
  }

  const handleEmploymentTypeChange = (type: JobEmploymentType) => {
    const currentTypes = filters.employmentType || []
    const updatedTypes = currentTypes.includes(type) ? currentTypes.filter((t) => t !== type) : [...currentTypes, type]
    onFilterChange({ ...filters, employmentType: updatedTypes })
  }

  const Combobox = useCallback(
    ({
      options,
      value,
      onChange,
      placeholder,
      label,
    }: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: any[]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange: (value: any) => void
      placeholder: string
      label: string
    }) => (
      <Popover open={openCombobox === label} onOpenChange={(isOpen) => setOpenCombobox(isOpen ? label : null)}>
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
                : `${value.city}, ${value.state ? value.state + ", " : ""}${value.country}`
              : placeholder}
            <SlidersHorizontal className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} className="text-sm md:text-base" />
            <CommandList>
              <CommandEmpty className="text-sm md:text-base">No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
  {options.map((option, index) =>
    option.divider ? (
      <div key={`divider-${index}`} className="border-t my-2"></div>
    ) : (
      <CommandItem
        key={option.city ? `${option.city}-${option.state}-${option.country}` : `option-${index}`}
        onSelect={() => {
          onChange(option);
          setOpenCombobox(null);
        }}
        className="text-sm md:text-base"
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            (typeof value === "string" ? value === option : value?.city === option.city)
              ? "opacity-100"
              : "opacity-0"
          )}
        />
        {typeof option === "string"
          ? option
          : `${option.city}, ${option.state ? option.state + ", " : ""}${option.country}`}
      </CommandItem>
    )
  )}
</CommandGroup>

            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    ),
    [openCombobox],
  )

  const FilterContent = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Search by Keywords</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Job title, keywords, or company"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pl-9 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Location</h3>
        <Combobox
          options={locations}
          value={filters.location}
          onChange={(location) => onFilterChange({ ...filters, location })}
          placeholder="Select location"
          label="Location"
        />

        <div className="space-y-2 md:space-y-4">
          <Label className="text-sm md:text-base">Radius around selected destination</Label>
          <Slider defaultValue={[filters.radius]} max={200} step={10} onValueChange={handleRadiusChange} />
          <div className="text-sm text-gray-500">{filters.radius}km</div>
        </div>
      </div>

      {/* Salary */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Salary Range</h3>
        <Combobox
          options={salaryRanges}
          value={
            filters.salary
              ? `$${filters.salary.min?.toLocaleString()} - ${filters.salary.max ? "$" + filters.salary.max.toLocaleString() : ""}`
              : undefined
          }
          onChange={(salary) => onFilterChange({ ...filters, salary: { min: salary.min, max: salary.max } })}
          placeholder="Select salary range"
          label="Salary"
        />
      </div>

      {/* Education */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Education Level</h3>
        <Combobox
          options={educationLevels}
          value={filters.education?.[0]}
          onChange={(education) => onFilterChange({ ...filters, education: [education] })}
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
                {type.charAt(0) + type.slice(1).toLowerCase().replace("_", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Experience Level</h3>
        <RadioGroup
          value={filters.experienceLevel?.[0]}
          onValueChange={(value) => onFilterChange({ ...filters, experienceLevel: [value as JobExperienceLevel] })}
        >
          {Object.values(JobExperienceLevel).map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={level} className="text-sm md:text-base" />
              <Label htmlFor={level} className="text-sm md:text-base">
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Date Posted */}
      <div className="space-y-2">
        <h3 className="text-base md:text-lg font-semibold">Date Posted</h3>
        <RadioGroup
          value={filters.datePosted}
          onValueChange={(value) => onFilterChange({ ...filters, datePosted: value })}
        >
          {["24h", "7d", "14d", "30d"].map((period) => (
            <div key={period} className="flex items-center space-x-2">
              <RadioGroupItem value={period} id={period} className="text-sm md:text-base" />
              <Label htmlFor={period} className="text-sm md:text-base">
                Last {period.endsWith("h") ? period.replace("h", " hours") : period.replace("d", " days")}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )

  if (isMobile) {
    return (
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
    )
  }

  return (
    <div className="hidden lg:block w-80 space-y-6 p-4 md:p-6 bg-white rounded-lg shadow-sm border-none overflow-y-auto" style={{ maxHeight: "calc(100vh - 40px)" }}>
      <FilterContent />
    </div>
  )
}

