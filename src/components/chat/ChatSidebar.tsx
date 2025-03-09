'use client'

import * as React from 'react'
import { Bell, Search, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NotificationDrawer } from './NotificationDrawer'

interface Status {
    id: string
    name: string
    image: string
}

interface ChatMessage {
    id: string
    name: string
    message: string
    time: string
    image: string
    typing?: boolean
    online?: boolean
}

const statuses: Status[] = [
    { id: '1', name: 'My Status', image: '/placeholder.svg?height=40&width=40' },
    { id: '2', name: 'Jesus', image: '/placeholder.svg?height=40&width=40' },
    { id: '3', name: 'Mari', image: '/placeholder.svg?height=40&width=40' },
    { id: '4', name: 'Kristin', image: '/placeholder.svg?height=40&width=40' },
    { id: '5', name: 'Lea', image: '/placeholder.svg?height=40&width=40' },
]

const messages: ChatMessage[] = [
    {
        id: '1',
        name: 'Josephin water',
        message: 'Typing...',
        time: '22/10/24',
        image: '/placeholder.svg?height=40&width=40',
        typing: true
    },
    {
        id: '2',
        name: 'Mari',
        message: 'This is nice, I love it ❤️',
        time: 'JUST NOW',
        image: '/placeholder.svg?height=40&width=40',
        online: true
    },
    {
        id: '3',
        name: 'Lea',
        message: 'What are you doing...',
        time: '22/10/24',
        image: '/placeholder.svg?height=40&width=40',
        online: true
    },
]

interface ChatSidebarProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ChatSidebar({ open, onOpenChange }: ChatSidebarProps) {
    const [notificationOpen, setNotificationOpen] = React.useState(false)

    return (
        <>
            <div className={` bg-white border-r transition-all duration-300 ${open ? 'translate-x-0 w-96' : '-translate-x-full w-0'} md:translate-x-0`}>
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between gap-2 border-b p-4">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                                <AvatarFallback>RS</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-sm font-semibold">Rohini Sharma</h2>
                                <p className="text-xs text-muted-foreground">Busy</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setNotificationOpen(true)}
                                className="relative"
                            >
                                <Bell className="h-5 w-5" />
                                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                                    3
                                </span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => onOpenChange(false)}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="border-b p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search messages..."
                                className="pl-9"
                            />
                        </div>
                    </div>

                    {/* <div className="p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold">Status</h3>
                            <Button variant="link" className="text-xs text-emerald-600 hover:text-emerald-700">
                                View All
                            </Button>
                        </div>
                        <div className="mt-2 whitespace-nowrap">
                            <div className="flex gap-2 justify-evenly">
                                {statuses.map((status) => (
                                    <button
                                        key={status.id}
                                        className="flex flex-col items-center gap-1"
                                    >
                                        <Avatar className="h-12 w-12 ring-2 ring-emerald-500 ring-offset-2">
                                            <AvatarImage src={status.image} alt={status.name} />
                                            <AvatarFallback>{status.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs">{status.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div> */}

                    <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold">Message (10)</h3>
                        </div>

                        <Tabs defaultValue="direct" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="direct">Direct</TabsTrigger>
                                <TabsTrigger value="group">Group</TabsTrigger>
                            </TabsList>
                            <TabsContent value="direct" className="mt-4">
                                <ScrollArea className="h-[calc(100vh-380px)]">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent cursor-pointer"
                                        >
                                            <div className="relative">
                                                <Avatar>
                                                    <AvatarImage src={message.image} alt={message.name} />
                                                    <AvatarFallback>{message.name[0]}</AvatarFallback>
                                                </Avatar>
                                                {message.online && (
                                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-sm font-semibold">{message.name}</h4>
                                                    <span className="text-xs text-muted-foreground">
                                                        {message.time}
                                                    </span>
                                                </div>
                                                <p className={`text-xs ${message.typing ? 'text-emerald-600 italic' : 'text-muted-foreground'}`}>
                                                    {message.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="group" className="mt-4">
                                <div className="text-center text-sm text-muted-foreground">
                                    No group chats yet
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            <NotificationDrawer
                open={notificationOpen}
                onOpenChange={setNotificationOpen}
            />
        </>
    )
}

