'use client'

import { useState } from 'react'
import { Camera, MapPin, Mic, MoreVertical, Phone, PlusCircle, Send, Share2, Video } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
    id: string
    content: string
    sender: 'user' | 'other'
    time: string
    attachment?: {
        type: 'pdf' | 'image'
        name?: string
        size?: string
        url?: string
    }
}

const messages: Message[] = [
    {
        id: '1',
        content: 'I have vacation plan in Ladakh for next week.',
        sender: 'other',
        time: '01:40 AM'
    },
    {
        id: '2',
        content: 'You understand',
        sender: 'other',
        time: '01:45 AM'
    },
    {
        id: '3',
        content: "Let's go, but what's the plan ?",
        sender: 'user',
        time: '01:46 AM'
    },
    {
        id: '4',
        sender: 'other',
        content: '',
        time: '01:46 AM',
        attachment: {
            type: 'pdf',
            name: 'Smitten Shah 01.pdf',
            size: '1.250 kb'
        }
    }
]

export function Chat() {
    const [message, setMessage] = useState('')

    return (
        <div className="flex h-screen flex-col">
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Lea" />
                        <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-sm font-semibold">Lea</h2>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <div
                                className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                    }`}
                            >
                                {msg.content && <p className="text-sm">{msg.content}</p>}
                                {msg.attachment && msg.attachment.type === 'pdf' && (
                                    <Card className="mt-2 p-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">
                                                    {msg.attachment.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {msg.attachment.size}
                                                </p>
                                            </div>
                                            <Button size="sm" variant="secondary">
                                                Download
                                            </Button>
                                        </div>
                                    </Card>
                                )}
                                <p
                                    className={`mt-1 text-right text-xs ${msg.sender === 'user'
                                            ? 'text-primary-foreground/80'
                                            : 'text-muted-foreground'
                                        }`}
                                >
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="border-t p-4">
                <div className="flex gap-2 rounded-lg bg-muted p-2">
                    <Button variant="ghost" size="icon">
                        <PlusCircle className="h-5 w-5" />
                    </Button>
                    <Input
                        className="flex-1 border-0 bg-transparent"
                        placeholder="Write your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                            <MapPin className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Camera className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Mic className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

