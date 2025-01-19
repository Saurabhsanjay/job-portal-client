'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import logo from '../../../../../public/dummy-logo-5b.png'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const passwordSchema = z.object({
    newPassword: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

type FormData = z.infer<typeof passwordSchema>;

export default function ResetPasswordForm() {
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(passwordSchema)
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log('Password reset submitted', data)
    }

    return (
        <div className="relative min-h-fit md:min-h-screen flex items-center justify-center overflow-hidden ">
            {/* Professional gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />

            {/* Subtle grid pattern */}
            <div className="absolute hidden md:block inset-0 bg-[linear-gradient(to_right,#8881_1px,transparent_1px),linear-gradient(to_bottom,#8881_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Clean, professional decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 hidden md:block" />
            <div className="absolute top-0 right-0 w-1/3 h-32 bg-blue-50/40 blur-3xl hidden md:block" />
            <div className="absolute bottom-0 left-0 w-1/3 h-32 bg-slate-50/40 blur-3xl hidden md:block" />

            <Card className="relative mx-4 w-full max-w-[400px] shadow-none md:shadow-md border-none border-gray-200 bg-white">
                <CardHeader>
                    <div className="flex items-center justify-center">
                        <Image src={logo || "/placeholder.svg"} alt="Company Logo" className="w-40" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 text-center">
                        <h2 className="text-2xl font-bold">Reset password</h2>
                        <p className="text-[0.9rem] text-muted-foreground">Please enter the new password</p>
                    </div>

                    <Alert variant="default" className="bg-blue-50 border-blue-200">
                        <InfoIcon className="h-4 w-4 text-blue-500" />
                        <AlertDescription className="text-sm text-blue-700">
                            Password must contain:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>At least 8 characters</li>
                                <li>One uppercase letter</li>
                                <li>One lowercase letter</li>
                                <li>One number</li>
                                <li>One special character</li>
                            </ul>
                        </AlertDescription>
                    </Alert>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    {...register('newPassword')}
                                    className={errors.newPassword ? 'border-red-500' : ''}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? (
                                        <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showNewPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    {...register('confirmPassword')}
                                    className={errors.confirmPassword ? 'border-red-500' : ''}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showConfirmPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type='submit'>
                            Confirm
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

