"use client"

import * as React from "react"
import { Check, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
    id: string
    title: string
    description: string
    timestamp: Date
    read?: boolean
}

interface NotificationsProps {
    notifications: Notification[]
    trigger: React.ReactNode
    onMarkAsRead?: (id: string) => void
    onSeeAll?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Notifications({ notifications, trigger, onMarkAsRead, onSeeAll }: NotificationsProps) {
 

    const NotificationsList = () => (
        <ScrollArea className="h-[450px]">
            <div className="flex flex-col gap-2 p-2">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={cn(
                            "flex items-start gap-4 rounded-lg p-3 transition-colors",
                            notification.read ? "bg-background" : "bg-muted/50",
                        )}
                    >
                        <div className="rounded-full bg-green-100 p-2">
                            <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm font-medium">{notification.title}</p>
                                <p className="text-xs text-muted-foreground whitespace-nowrap">
                                    {format(notification.timestamp, "MM/dd/yyyy")}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )

  

    return (
        <Popover>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent align="end" alignOffset={-14} className="w-[380px] p-0" forceMount>
                <div className="flex items-center justify-between border-b px-4 py-2">
                    <h2 className="font-semibold font-sm">Notifications</h2>
                    <Button variant="ghost" className="text-muted-foreground text-sm" onClick={onSeeAll}>
                        See all
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <NotificationsList />
            </PopoverContent>
        </Popover>
    )
}

