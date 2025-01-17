'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Mail } from 'lucide-react'
import Image from 'next/image'
import logo from '../../../../../public/dummy-logo-5b.png'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

// Define the validation schema with Zod
const schema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
})

// Define the types for the form data
type FormData = {
    email: string
}

export default function ForgotPasswordForm() {
    const [isEmailSent, setIsEmailSent] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    // Submit handler with type safety
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Forgot password submitted with email:', data.email)
        setIsEmailSent(true)
    }

    if (isEmailSent) {
        return (
            <div className="flex items-center justify-center min-h-screen md:bg-gray-100">
                <Card className="mx-auto max-w-[500px] shadow-none border-none md:shadow-lg pb-4">
                    <CardHeader>
                        <div className="flex items-center justify-center">
                            <Image src={logo || "/placeholder.svg"} alt="Company Logo" className="w-40" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50">
                                <Mail className="w-8 h-8 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-center">Check your mail.</h2>
                            <p className="text-center text-muted-foreground">
                                The password reset link has been sent to your email.
                            </p>
                            <Button
                                className="w-full"
                                onClick={() => window.location.href = '/auth/login'}
                            >
                                Go back to login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen md:bg-gray-100">
            <Card className="mx-auto max-w-[500px] shadow-none border-none md:shadow-lg pb-4">
                <CardHeader>
                    <div className="flex items-center justify-center">
                        <Image src={logo || "/placeholder.svg"} alt="Company Logo" className="w-40" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl font-bold">Forgot Password?</h2>
                        <p className="text-[0.9rem] text-muted-foreground">No worries, we&apos;ll send you a reset link.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                                className={`${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        <Button className="w-full" type="submit">
                            Request Reset Link
                        </Button>
                    </form>
                </CardContent>
                <p className="text-center text-sm text-muted-foreground p-4">
                    Remember your password?{" "}
                    <a href="/auth/login" className="text-primary underline">
                        Login
                    </a>
                </p>
            </Card>
        </div>
    )
}

