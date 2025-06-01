"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface AuthWarningDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthWarningDialog({ open, onOpenChange }: AuthWarningDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <DialogTitle className="text-xl">Account Required</DialogTitle>
          <DialogDescription className="text-center">
            You need to create an account or sign in to post a job. This helps us verify employers and protect job
            seekers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button className="w-full">Create Account</Button>
          <Button variant="outline" className="w-full">
            Sign In
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>
            Continue Editing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
