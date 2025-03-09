
import { Camera, Headphones, Image, MapPin, Phone, Video } from 'lucide-react'
import { cn } from "@/lib/utils"

interface MediaOption {
    icon: React.ReactNode
    label: string
    color: string
}

const mediaOptions: MediaOption[] = [
    // {
    //     icon: <MapPin className="h-6 w-6" />,
    //     label: "Location",
    //     color: "bg-emerald-500 text-white"
    // },
    // {
    //     icon: <Camera className="h-6 w-6" />,
    //     label: "Camera",
    //     color: "bg-blue-500 text-white"
    // },
    // {
    //     icon: <Headphones className="h-6 w-6" />,
    //     label: "Audio",
    //     color: "bg-purple-500 text-white"
    // },
    {
        icon: <Image className="h-6 w-6" />,
        label: "Gallery",
        color: "bg-pink-500 text-white"
    },
    {
        icon: <Video className="h-6 w-6" />,
        label: "Video",
        color: "bg-orange-500 text-white"
    },
    // {
    //     icon: <Phone className="h-6 w-6" />,
    //     label: "Contact",
    //     color: "bg-blue-600 text-white"
    // }
]

export function MediaOptions() {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {mediaOptions.map((option, index) => (
                <button
                    key={index}
                    className="flex flex-col items-center gap-2"
                >
                    <div className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full",
                        option.color
                    )}>
                        {option.icon}
                    </div>
                    <span className="text-xs font-medium">{option.label}</span>
                </button>
            ))}
        </div>
    )
}

