"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Trash2, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  content: string
  timestamp: string
  sender: {
    id: number
    name: string
    avatar: string
    isYou?: boolean
  }
}

interface Conversation {
  id: number
  user: {
    id: number
    name: string
    role: string
    avatar: string
    status: "active" | "offline" | "away"
  }
  lastMessage: string
  unreadCount: number
  timestamp: string
  messages: Message[]
}

export default function Messages() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      user: {
        id: 1,
        name: "Arlene McCoy",
        role: "Head of Development",
        avatar: "/placeholder.svg",
        status: "active",
      },
      lastMessage: "How likely are you to recommend our company?",
      unreadCount: 0,
      timestamp: "35 mins",
      messages: [
        {
          id: 1,
          content: "How likely are you to recommend our company to your friends and family?",
          timestamp: "35 mins",
          sender: {
            id: 1,
            name: "Albert Flores",
            avatar: "/placeholder.svg",
          },
        },
        {
          id: 2,
          content:
            "Hey there, we're just writing to let you know that you've been subscribed to a repository on GitHub.",
          timestamp: "35 mins",
          sender: {
            id: 2,
            name: "You",
            avatar: "/placeholder.svg",
            isYou: true,
          },
        },
      ],
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Cameron Williamson",
        role: "Head of Development",
        avatar: "/placeholder.svg",
        status: "offline",
      },
      lastMessage: "Ok, Understood!",
      unreadCount: 0,
      timestamp: "35 mins",
      messages: [
        {
          id: 1,
          content: "Ok, Understood!",
          timestamp: "35 mins",
          sender: {
            id: 2,
            name: "Cameron Williamson",
            avatar: "/placeholder.svg",
          },
        },
      ],
    },
  ])

  const [activeConversation, setActiveConversation] = useState<Conversation>(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [showConversation, setShowConversation] = useState(false)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMessageObj: Message = {
      id: Date.now(),
      content: newMessage,
      timestamp: "Just now",
      sender: {
        id: 0,
        name: "You",
        avatar: "/placeholder.svg",
        isYou: true,
      },
    }

    setActiveConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessageObj],
    }))

    setNewMessage("")
  }

  const handleConversationClick = (conversation: Conversation) => {
    setActiveConversation(conversation)
    setShowConversation(true)
  }

  return (
    <div className="space-y-6">
      <Card className="h-[calc(100vh-12rem)]">
        <div className="grid h-full lg:grid-cols-[300px_1fr]">
          {/* Left sidebar */}
          <div className={cn("border-r", "lg:block", showConversation ? "hidden" : "block")}>
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search" className="pl-9" />
              </div>
            </div>
            <div className="overflow-auto h-[calc(100%-5rem)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                  className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 ${activeConversation.id === conversation.id ? "bg-gray-50" : ""
                    }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.user.avatar} />
                    <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate">
                        <div className="font-medium text-sm">{conversation.user.name}</div>
                        <div className="text-xs text-gray-500">{conversation.user.role}</div>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.timestamp}</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 truncate">{conversation.lastMessage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className={cn("flex flex-col", "lg:block", showConversation ? "block" : "hidden")}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden mr-2"
                  onClick={() => setShowConversation(false)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeConversation.user.avatar} />
                  <AvatarFallback>{activeConversation.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{activeConversation.user.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${activeConversation.user.status === "active" ? "bg-green-500" : "bg-gray-300"
                        }`}
                    />
                    {activeConversation.user.status === "active" ? "Active" : "Offline"}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.sender.isYou ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${message.sender.isYou ? "items-end" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{message.sender.name}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <div
                      className={`mt-1 rounded-lg p-3 max-w-[75%] break-words ${message.sender.isYou ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

