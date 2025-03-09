'use client'

import { ChatArea } from "@/components/chat/ChatArea";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  console.log("sidebarOpen", sidebarOpen)
  return (
    <>
      <main>
        <div className="flex h-screen overflow-hidden">
          <div className={`flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-96' : 'w-0 '}`}>
            <ChatSidebar
              open={sidebarOpen}
              onOpenChange={setSidebarOpen}
            />
          </div>
          <div className="flex-grow overflow-hidden">
            <ChatArea toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </main>
    </>
  );
}
