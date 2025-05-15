"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Send,
  ChevronLeft,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useAuth } from "@/app/(providers)/AuthContext";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: {
    id: number;
    name: string;
    avatar: string;
    isYou?: boolean;
  };
}

interface Conversation {
  id: number;
  user: {
    id: number;
    name: string;
    role: string;
    avatar: string;
    status: "active" | "offline" | "away";
  };
  lastMessage: string;
  unreadCount: number;
  timestamp: string;
  messages: Message[];
}

const WS_URL = "ws://localhost:8080/ws";

type MessageResponse = {
  _id: string;
  senderId: {
    _id: string;
    personalDetails: {
      firstName: string;
      lastName: string;
      profilePicture?: string;
    };
  };
  receiverId: {
    _id: string;
    personalDetails: {
      firstName: string;
      lastName: string;
      profilePicture?: string;
    };
  };
  content: string;
  createdAt: string;
};

const transformMessages = (
  messages: MessageResponse[],
  currentUser: string
) => {
  // Filter messages where currentUser is either sender or receiver
  const filteredMessages = messages?.filter(
    (msg) =>
      msg.senderId._id === currentUser || msg.receiverId._id === currentUser
  );

  // Group messages by conversation partner
  const conversationsMap = new Map<string, any>();

  filteredMessages.forEach((msg) => {
    const isSender = msg?.senderId?._id === currentUser;
    const otherUser = isSender ? msg?.receiverId : msg?.senderId;

    const otherUserId = otherUser?._id;
    const otherUserName = `${otherUser.personalDetails.firstName} ${otherUser.personalDetails.lastName}`;
    const otherUserAvatar =
      otherUser.personalDetails.profilePicture || "/default-avatar.png";

    if (!conversationsMap.has(otherUserId)) {
      conversationsMap.set(otherUserId, {
        id: otherUserId,
        user: {
          id: otherUserId,
          name: otherUserName,
          avatar: otherUserAvatar,
          status: "active", // Placeholder status
        },
        lastMessage: msg.content,
        unreadCount: 0,
        timestamp: new Date(msg.createdAt).toLocaleTimeString(),
        messages: [],
      });
    }

    const conversation = conversationsMap.get(otherUserId);
    conversation.messages.push({
      id: msg._id,
      content: msg.content,
      timestamp: new Date(msg.createdAt).toLocaleTimeString(),
      sender: {
        id: msg.senderId._id,
        name: isSender
          ? "You"
          : `${msg.senderId.personalDetails.firstName} ${msg.senderId.personalDetails.lastName}`,
        avatar:
          msg.senderId.personalDetails.profilePicture || "/default-avatar.png",
        isYou: isSender,
      },
    });

    // Update last message
    conversation.lastMessage = msg.content;
  });

  return Array.from(conversationsMap.values());
};

export default function MobileMessages() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showConversation, setShowConversation] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const currentUser = user?.id as string;
  const receiverUser = activeConversation?.user?.id;

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      try {
        const conversationData = await axios.get(
          `http://localhost:8080/api/messages/get-messages-by-roomid?joinedRoomId=${currentUser}`
        );

        const transformedData = transformMessages(
          conversationData?.data?.data?.data,
          currentUser
        );

        setConversations(transformedData);
        if (transformedData.length > 0) {
          setActiveConversation(transformedData[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [currentUser]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket Server");
      ws.send(JSON.stringify({ event: "joinUser", userId: currentUser }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "message") {
        const isSender = data?.senderId?._id === currentUser;

        const newMessageObj: Message = {
          id: data?.senderId?._id,
          content: data?.content,
          timestamp: new Date().toLocaleDateString(),
          sender: {
            id: data?.senderId?._id,
            name: isSender
              ? "You"
              : `${data?.senderId?.personalDetails?.firstName} ${data?.senderId?.personalDetails?.lastName}`,
            avatar:
              data?.senderId?.personalDetails?.profilePicture ||
              "/default-avatar.png",
            isYou: isSender,
          },
        };

        setActiveConversation((prev) =>
          prev
            ? {
                ...prev,
                messages: [...prev.messages, newMessageObj],
              }
            : null
        );
      }
    };

    ws.onclose = () => console.log("❌ WebSocket Disconnected");
    ws.onerror = (error) => console.error("❌ WebSocket Error:", error);

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [currentUser]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        event: "sendMessage",
        senderId: currentUser,
        receiverId: receiverUser,
        content: newMessage,
        joinedRoomId: currentUser,
      };
      socket.send(JSON.stringify(message));
    }

    setNewMessage("");
  };

  const handleConversationClick = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setShowConversation(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-2" />
        <span>Loading conversations...</span>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      {!showConversation ? (
        // Conversations List
        <div className="p-4 space-y-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>

          {conversations.length > 0 ? (
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="bg-white cursor-pointer hover:bg-gray-50"
                  onClick={() => handleConversationClick(conversation)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={conversation.user.avatar || "/placeholder.svg"}
                          alt={conversation.user.name}
                        />
                        <AvatarFallback>
                          {conversation.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-medium truncate">
                            {conversation.user.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="bg-blue-600 text-white text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium">No messages yet</h3>
              <p className="text-sm text-gray-500 mt-1">
                Start a conversation with a recruiter or wait for them to
                contact you
              </p>
            </div>
          )}
        </div>
      ) : (
        // Active Conversation
        <div className="flex flex-col h-full">
          {/* Conversation Header */}
          <div className="flex items-center p-3 border-b bg-white">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setShowConversation(false)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={activeConversation?.user.avatar || "/placeholder.svg"}
                alt={activeConversation?.user.name}
              />
              <AvatarFallback>
                {activeConversation?.user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h3 className="font-medium">{activeConversation?.user.name}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {activeConversation?.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender.isYou ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "flex max-w-[80%]",
                    message.sender.isYou ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar
                    className={cn(
                      "h-8 w-8",
                      message.sender.isYou ? "ml-2" : "mr-2"
                    )}
                  >
                    <AvatarImage
                      src={message.sender.avatar || "/placeholder.svg"}
                      alt={message.sender.name}
                    />
                    <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={cn(
                        "rounded-lg p-3",
                        message.sender.isYou
                          ? "bg-blue-500 text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none"
                      )}
                    >
                      {message.content}
                    </div>
                    <div
                      className={cn(
                        "text-xs text-gray-500 mt-1",
                        message.sender.isYou ? "text-right" : "text-left"
                      )}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
