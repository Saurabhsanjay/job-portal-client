"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { JobBasicsStep } from "./components/job-basics-step"
import { JobDescriptionStep } from "./components/job-description-step"
import { PayBenefitsStep } from "./components/pay-benefits-step"
import { JobDetailsStep } from "./components/job-details-step"
import { PreScreenStep } from "./components/pre-screen-step"
import { QualificationsStep } from "./components/qualifications-step"
import { PreferencesStep } from "./components/preferences-step"
import { ReviewStep } from "./components/review-step"
import { AuthWarningDialog } from "./auth-warning-dialog"

export interface JobFormData {
  // Job Basics
  jobTitle: string
  location: string
  city: string
  area: string
  pincode: string
  streetAddress: string
  language: string

  // Job Description
  jobDescription: string

  // Pay & Benefits
  payType: "hourly" | "monthly" | "yearly"
  minPay: string
  maxPay: string
  currency: string
  supplementalPay: string[]
  benefits: string[]

  // Job Details
  jobType: string[]
  schedule: string[]
  hiringMultiple: boolean
  numberOfOpenings: string
  urgentHiring: boolean

  // Pre-screen
  screeningQuestions: Array<{
    question: string
    type: "text" | "yes_no"
    required: boolean
  }>
  applicationLanguage: string

  // Qualifications
  qualifications: Array<{
    skill: string
    level: "preferred" | "required"
    experience: string
  }>
  additionalRequirements: string

  // Preferences
  communicationEmail: string
  emailNotifications: boolean
  applicationDeadline: boolean
  deadlineDate: string
}

const steps = [
  { id: "basics", title: "Job Basics", component: JobBasicsStep },
  { id: "description", title: "Job Description", component: JobDescriptionStep },
  { id: "pay", title: "Pay & Benefits", component: PayBenefitsStep },
  { id: "details", title: "Job Details", component: JobDetailsStep },
  { id: "prescreen", title: "Pre-screen", component: PreScreenStep },
  { id: "qualifications", title: "Qualifications", component: QualificationsStep },
  { id: "preferences", title: "Preferences", component: PreferencesStep },
  { id: "review", title: "Review", component: ReviewStep },
]

interface PostJobFlowProps {
  isAuthenticated?: boolean
  onJobPost?: (data: JobFormData) => void
  className?: string
}

export function PostJobFlow({ isAuthenticated = false, onJobPost, className = "" }: PostJobFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showAuthWarning, setShowAuthWarning] = useState(false)

  const methods = useForm<JobFormData>({
    defaultValues: {
      jobTitle: "",
      location: "",
      city: "",
      area: "",
      pincode: "",
      streetAddress: "",
      language: "English",
      jobDescription: "",
      payType: "monthly",
      minPay: "",
      maxPay: "",
      currency: "INR",
      supplementalPay: [],
      benefits: [],
      jobType: [],
      schedule: [],
      hiringMultiple: false,
      numberOfOpenings: "1",
      urgentHiring: false,
      screeningQuestions: [],
      applicationLanguage: "English",
      qualifications: [],
      additionalRequirements: "",
      communicationEmail: "",
      emailNotifications: true,
      applicationDeadline: false,
      deadlineDate: "",
    },
  })

  const { handleSubmit, trigger, watch } = methods
  const currentStepData = watch()

  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  const validateCurrentStep = async () => {
    const stepFields = getStepFields(currentStep)
    return await trigger(stepFields)
  }

  const getStepFields = (stepIndex: number): (keyof JobFormData)[] => {
    switch (stepIndex) {
      case 0:
        return ["jobTitle", "location", "city"]
      case 1:
        return ["jobDescription"]
      case 2:
        return ["payType", "minPay", "maxPay"]
      case 3:
        return ["jobType", "schedule"]
      case 4:
        return []
      case 5:
        return []
      case 6:
        return ["communicationEmail"]
      case 7:
        return []
      default:
        return []
    }
  }

  const canContinue = () => {
    const stepFields = getStepFields(currentStep)
    if (stepFields.length === 0) return true

    return stepFields.every((field) => {
      const value = currentStepData[field]
      if (Array.isArray(value)) return value.length > 0
      return value && value.toString().trim() !== ""
    })
  }

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      const isValid = await validateCurrentStep()
      if (isValid) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const onSubmit = (data: JobFormData) => {
    if (!isAuthenticated) {
      setShowAuthWarning(true)
      return
    }

    onJobPost?.(data)
  }

  const CurrentStepComponent = steps[currentStep].component

  const hasSkipOption = [4, 5, 6].includes(currentStep) // Pre-screen, Qualifications, Preferences

  return (
    <div className={`w-full ${className}`}>
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl md:text-2xl">Post a Job</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>

        <CardContent className="space-y-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <CurrentStepComponent />

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <Button type="button" variant="outline" onClick={handleBack} className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  )}
                </div>

                <div className="flex gap-3 sm:ml-auto">
                  {hasSkipOption && !isLastStep && (
                    <Button type="button" variant="ghost" onClick={handleSkip}>
                      Skip
                    </Button>
                  )}

                  {!isLastStep ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!canContinue()}
                      className="flex items-center gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Publish Job
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>

      <AuthWarningDialog open={showAuthWarning} onOpenChange={setShowAuthWarning} />
    </div>
  )
}
