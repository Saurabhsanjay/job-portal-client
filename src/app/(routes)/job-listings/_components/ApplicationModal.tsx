"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useApiPost } from "@/hooks/use-api-query"
// import { toast } from "@/components/ui/use-toast"
import toast from "react-hot-toast"
import { useParams } from "next/navigation"
import { useAuth } from "@/app/(providers)/AuthContext"

const applicationFormSchema = z.object({
  candidateName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  candidateJobTitle: z.string().min(2, { message: "Job title is required." }),
  coverLetter: z.string().min(10, { message: "Cover letter must be at least 10 characters." }),
  experience: z.coerce.number().min(0, { message: "Experience must be a positive number." }),
})

type ApplicationFormValues = z.infer<typeof applicationFormSchema>

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  job?: Object
}

export interface JobApplicationResponse {
    status: string;
    statusCode: number;
    message: string;
    formattedMessage: string;
    data: JobApplication;
  }
  
  export interface JobApplication {
    jobId: string;
    candidateId: string;
    status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | string;
    isShortlisted: boolean;
    isBookmarked: boolean;
    isDeleted: boolean;
    _id: string;
    appliedDate: string;      // ISO date string
    shortlistedDate: string;  // ISO date string
    createdAt: string;        // ISO date string
    updatedAt: string;        // ISO date string
    __v: number;
  }
  

export function ApplicationModal({ isOpen, onClose, job }: ApplicationModalProps) {
    
    console.log("job----->",job)

    const params = useParams()
    console.log("params----->",params)

    const {user}= useAuth()
    console.log("user----->",user)

  // Use the API post hook
  const applicationMutation = useApiPost<JobApplicationResponse, ApplicationFormValues>()

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      candidateName: "",
      candidateJobTitle: job?.title|| "",
      coverLetter: "",
      experience: 0,
    },
  })

  const onSubmit = (data: ApplicationFormValues) => {
    // Format the data to match your required payload structure
    const payload = {
      jobId: params?.id||job?._id||"",
      candidateId: user?.id,
      candidateName: data.candidateName,
      candidateJobTitle: data.candidateJobTitle,
      coverLetter: data.coverLetter,
      experience: data.experience,
    }

    console.log("Application payload:", payload)

    // Here you would typically send this data to your API
    // For now, we'll just show a success message
    // toast.success("Application submitted successfully!")

    applicationMutation.mutate(
          {
            endpoint: "applied-candidates/apply",
            payload: payload,
            invalidateQueries: [["job-apply"]],
          },
          {
            onSuccess: (response) => {
              if (response.data) {
                toast.success("Job application submitted successfully")
                // refetch()
              } else if (response.error) {
                toast.error(response.error.message)
              }
            },
            onError: (error) => {
              toast.error(error.message || "Failed to submit application")
            },
          },
        )

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {job?.title || "this position"}</DialogTitle>
          <DialogDescription>Please fill out the form below to submit your application.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="candidateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="candidateJobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="candidateEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="candidatePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}

              {/* <div className="space-y-2">
                <h3 className="text-sm font-medium">Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="USA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div> */}

              {/* <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/resume/johndoe.pdf" {...field} />
                    </FormControl>
                    <FormDescription>Link to your resume (Google Drive, Dropbox, etc.)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

<div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Input placeholder="Bachelor's in Computer Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>

              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I am excited to apply for this position..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="JavaScript, Node.js, React" {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated list of your skills</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
