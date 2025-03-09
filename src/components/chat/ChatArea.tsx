'use client'

import React, { useEffect } from 'react'
import { Camera, MapPin, Mic, MoreVertical, Phone, PlusCircle, Send, Share2, Video, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MediaOptions } from './MediaOptions'
import io from 'socket.io-client'

interface Message {
    id: string
    content: string
    sender: 'user' | 'other'
    time: string
    attachment?: {
        type: 'pdf'
        name: string
        size: string
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

export function ChatArea({ toggleSidebar }: { toggleSidebar: () => void }) {
    const socket = io('http://localhost:8320')
    const [message, setMessage] = React.useState('')
    useEffect(()=>{
        socket.on("connnect", () => {
            console.log("Socket connected", socket.id)
        })

    
    },[socket])

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Scoket connected", socket.id); // x8WIv7-mJelg7on_ALbx
        });

        socket.on("message", (msg) =>{
            console.log(msg)
        })
    })

    return (
        <div className="flex h-full flex-col bg-[#F8FAFF] z-20 relative">
            <div className="flex items-center justify-between border-b bg-white p-4 ">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Lea" />
                        <AvatarFallback>L</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-sm font-semibold">Lea</h2>
                        <p className="text-xs text-emerald-600">Online</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                    </Button>
                    {/* <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Share2 className="h-5 w-5" />
                    </Button> */}
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
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white'
                                    }`}
                            >
                                {msg.content && <p className="text-sm">{msg.content}</p>}
                                {msg.attachment && (
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
                                        ? 'text-white/80'
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

            <div className="border-t bg-white p-4">
                <div className="flex gap-2 rounded-lg bg-[#F8FAFF] p-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <PlusCircle className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-80 p-0"
                            align="start"
                            side="top"
                        >
                            <MediaOptions />
                        </PopoverContent>
                    </Popover>
                    <Input
                        className="flex-1 border-0 bg-transparent"
                        placeholder="Write your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="flex gap-1">
                        {/* <Button variant="ghost" size="icon">
                            <MapPin className="h-5 w-5" />
                        </Button> */}
                        {/* <Button variant="ghost" size="icon">
                            <Camera className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Mic className="h-5 w-5" />
                        </Button> */}
                        <Button variant="ghost" size="icon">
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

