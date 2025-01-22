"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ChangePassword() {
    return (
        <div className="space-y-6">
            <Card className="p-6 shadow-sm border-none">
                <div className="max-w-full">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-gray-900">Change Password!</h2>
                        <p className="text-sm text-gray-500">Enter your old password and new password to change your password.</p>
                    </div>

                    <form className="mt-6 space-y-6 max-w-2xl">
                        <div className="space-y-1">
                            <Label htmlFor="oldPassword">Old Password</Label>
                            <Input id="oldPassword" type="password" required />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" required />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" required />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button type="button" className="rounded-xl" variant="outline">Cancel</Button>
                            <Button className="rounded-xl" type="submit">Update</Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}

