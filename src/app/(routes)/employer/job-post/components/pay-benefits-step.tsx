"use client"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

const supplementalPayOptions = [
  "Performance bonus",
  "Yearly bonus",
  "Commission pay",
  "Overtime pay",
  "Signing bonus",
  "Tips",
  "Other",
]

const benefitsOptions = [
  "Health insurance",
  "Provident Fund",
  "Paid time off",
  "Flexible schedule",
  "Food provided",
  "Commuter assistance",
  "Professional development",
  "Work from home",
  "Life insurance",
  "Dental insurance",
  "Vision insurance",
  "Retirement plan",
]

export function PayBenefitsStep() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const payType = watch("payType")
  const supplementalPay = watch("supplementalPay") || []
  const benefits = watch("benefits") || []

  const handleSupplementalPayChange = (option: string, checked: boolean) => {
    const current = supplementalPay || []
    if (checked) {
      setValue("supplementalPay", [...current, option])
    } else {
      setValue(
        "supplementalPay",
        current.filter((item: string) => item !== option),
      )
    }
  }

  const handleBenefitsChange = (option: string, checked: boolean) => {
    const current = benefits || []
    if (checked) {
      setValue("benefits", [...current, option])
    } else {
      setValue(
        "benefits",
        current.filter((item: string) => item !== option),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-purple-50 rounded-lg">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Add pay and benefits</h2>
          <p className="text-sm text-muted-foreground">
            Help candidates understand the compensation and benefits for this role.
          </p>
        </div>
        <div className="w-32 h-24 relative">
          <Image
            src="/placeholder.svg?height=96&width=128"
            alt="Pay and benefits illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Pay</Label>
          <p className="text-xs text-muted-foreground mb-3">
            Showing pay range helps get you qualified candidates. Check if you are competitive.
          </p>

          <RadioGroup value={payType} onValueChange={(value) => setValue("payType", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hourly" id="hourly" />
              <Label htmlFor="hourly">Per hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">Per month</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="yearly" />
              <Label htmlFor="yearly">Per year</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="currency" className="text-sm font-medium">
              Currency
            </Label>
            <Select defaultValue="INR" onValueChange={(value) => setValue("currency", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">₹ INR</SelectItem>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="EUR">€ EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="minPay" className="text-sm font-medium">
              Minimum
            </Label>
            <Input
              id="minPay"
              {...register("minPay", { required: "Minimum pay is required" })}
              placeholder="25,000"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="maxPay" className="text-sm font-medium">
              Maximum
            </Label>
            <Input
              id="maxPay"
              {...register("maxPay", { required: "Maximum pay is required" })}
              placeholder="50,000"
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Supplemental pay</Label>
          <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {supplementalPayOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={supplementalPay.includes(option)}
                  onCheckedChange={(checked) => handleSupplementalPayChange(option, checked as boolean)}
                />
                <Label htmlFor={option} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Benefits</Label>
          <p className="text-xs text-muted-foreground mb-3">Select all that apply</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benefitsOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={benefits.includes(option)}
                  onCheckedChange={(checked) => handleBenefitsChange(option, checked as boolean)}
                />
                <Label htmlFor={option} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
