
'use client'

import * as React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Notification {
    id: string
    title: string
    message: string
    time: string
    image: string
    read: boolean
}

const notifications: Notification[] = [
    {
        id: '1',
        title: 'New Message',
        message: 'Mari sent you a message',
        time: '2 min ago',
        image: '/placeholder.svg?height=40&width=40',
        read: false
    },
    {
        id: '2',
        title: 'Status Update',
        message: 'Lea added a new status',
        time: '5 min ago',
        image: '/placeholder.svg?height=40&width=40',
        read: false
    },
    // Add more notifications as needed
]

interface NotificationDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function NotificationDrawer({ open, onOpenChange }: NotificationDrawerProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-[320px] p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Notifications</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-80px)]">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 border-b hover:bg-accent transition-colors ${!notification.read ? 'bg-accent/50' : ''
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <Avatar>
                                    <AvatarImage src={notification.image} alt={notification.title} />
                                    <AvatarFallback>{notification.title[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold">{notification.title}</h4>
                                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

