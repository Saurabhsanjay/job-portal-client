"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterRecruiter } from "@/services/userService";
// import { useToast } from "@/hooks/use-toast";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const industries = [
  "Software Development",
  "Data Science",
  "Design",
  "Marketing",
  "Sales",
  "Customer Service",
  "Finance",
  "Human Resources",
  "Engineering",
  "Product Management",
  "Operations",
  "Education",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Legal",
  "Media",
  "Telecommunications",
  "Other",
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
  "China",
  "Brazil",
  "Mexico",
  "Spain",
  "Italy",
  "Netherlands",
  "Singapore",
  "Other",
];

const states = [
  "California",
  "New York",
  "Texas",
  "Florida",
  "Illinois",
  "Pennsylvania",
  "Ohio",
  "Georgia",
  "Michigan",
  "North Carolina",
  "New Jersey",
  "Virginia",
  "Washington",
  "Massachusetts",
  "Other",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "San Francisco",
  "Seattle",
  "Denver",
  "Other",
];

const recruiterSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(6, "Phone number is required"),
  website: z.string().url("Please enter a valid website URL"),
  establishedDate: z.string(),
  teamSize: z.string(),
  industry: z.string().min(2, "Industry is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  address: z.string().min(5, "Address is required"),
  //   about: z.string().min(10, "About section must be at least 10 characters"),
  allowInSearch: z.boolean().default(true),
  terms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
});

type RecruiterFormValues = z.infer<typeof recruiterSchema>;

export default function RecruiterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  // const { toast } = useToast();
  const registerMutation = useRegisterRecruiter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecruiterFormValues>({
    resolver: zodResolver(recruiterSchema),
    defaultValues: {
      name: "",
      description: "",
      email: "",
      password: "",
      phone: "",
      website: "",
      establishedDate: "",
      teamSize: "",
      industry: "",
      country: "",
      city: "",
      state: "",
      address: "",
      //   about: "",
      allowInSearch: true,
      terms: false,
    },
  });

  // Handle successful registration
  useEffect(() => {
    if (registerMutation.isSuccess) {
      // toast({
      //   title: "Success",
      //   description: "Company account created successfully!",
      // });
      toast.success("Company account created successfully!");
      reset();
        router.push("/auth/login");
    }
  }, [registerMutation.isSuccess, router, reset]);

  const onSubmit = (data: RecruiterFormValues) => {
    const { terms, ...recruiterData } = data;
    registerMutation.mutate(recruiterData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Company Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                placeholder="Enter your company name"
                className="bg-white focus:ring-2 focus:ring-blue-500/20"
              />
            )}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Company Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="description"
                placeholder="Brief description of your company"
                className="bg-white focus:ring-2 focus:ring-blue-500/20"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="Enter your business email"
                className="bg-white focus:ring-2 focus:ring-blue-500/20"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="phone">Phone</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phone"
                  placeholder="Phone number"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="website">Website</Label>
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="website"
                  placeholder="https://example.com"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              )}
            />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="establishedDate">Established Date</Label>
            <Controller
              name="establishedDate"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="establishedDate"
                  type="date"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              )}
            />
            {errors.establishedDate && (
              <p className="text-red-500 text-sm">
                {errors.establishedDate.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="teamSize">Team Size</Label>
            <Controller
              name="teamSize"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    id="teamSize"
                    className="bg-white focus:ring-2 focus:ring-blue-500/20"
                  >
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1001-5000">
                      1001-5000 employees
                    </SelectItem>
                    <SelectItem value="5001+">5001+ employees</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.teamSize && (
              <p className="text-red-500 text-sm">{errors.teamSize.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="industry">Industry</Label>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  id="industry"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20"
                >
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry && (
            <p className="text-red-500 text-sm">{errors.industry.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="country">Country</Label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    id="country"
                    className="bg-white focus:ring-2 focus:ring-blue-500/20"
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="city">City</Label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    id="city"
                    className="bg-white focus:ring-2 focus:ring-blue-500/20"
                  >
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="state">State/Province</Label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    id="state"
                    className="bg-white focus:ring-2 focus:ring-blue-500/20"
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="address">Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="address"
                  placeholder="Street address"
                  className="bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              )}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* <div className="space-y-1">
          <Label htmlFor="about">About Company</Label>
          <Controller
            name="about"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="about"
                placeholder="Tell us about your company"
                className="bg-white focus:ring-2 focus:ring-blue-500/20 min-h-[100px]"
              />
            )}
          />
          {errors.about && (
            <p className="text-red-500 text-sm">{errors.about.message}</p>
          )}
        </div> */}

        <div className="flex items-center space-x-4 py-2">
          <Controller
            name="allowInSearch"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="allowInSearch"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label
            htmlFor="allowInSearch"
            className="text-sm leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Allow company to appear in search results
          </label>
        </div>

        <div className="flex items-center space-x-4 py-2">
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <label
            htmlFor="terms"
            className="text-sm leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <a href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          type="submit"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending
            ? "Creating Account..."
            : "Create Company Account"}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" className="w-full" type="button">
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Continue with Google
      </Button>
      {registerMutation.isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          Error: {registerMutation.error.message}
        </div>
      )}
      {registerMutation.isSuccess && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          Company account created successfully! You can now log in.
        </div>
      )}
    </>
  );
}
