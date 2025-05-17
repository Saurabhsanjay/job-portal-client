"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Trash2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
// import { useApiGet } from "@/hooks/use-api-query"
import axios from "axios";
// import { useSession } from "next-auth/react";
import { useAuth } from "@/app/(providers)/AuthContext";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""
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
const WS_URL = `${API_BASE_URL}/ws`;

// const userIds = [
//   "677a5abca1c88d37c860cd0d",
//   "678fd4d814992b689bd1d9a5",
//   "67cc7aa1939517655936c74f",
// ];

// Select a random user from the list
// const currentUser = userIds[Math.floor(Math.random() * userIds.length)];

// Select a receiver user that is NOT the current user
// const receiverUser = userIds.find((user) => user !== currentUser) as string;

// console.log("Current User ID:", currentUser);

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
  console.log("messages", messages);
  // Step 1: Filter messages where currentUser is either sender or receiver
  const filteredMessages = messages?.filter(
    (msg) =>
      msg.senderId._id === currentUser || msg.receiverId._id === currentUser
  );

  // Step 2: Group messages by conversation partner
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

export default function Messages() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [conversations, setConversations] = useState<Conversation[]>([
    // {
    //   id: 1,
    //   user: {
    //     id: 1,
    //     name: "Arlene McCoy",
    //     role: "Head of Development",
    //     avatar: "/placeholder.svg",
    //     status: "active",
    //   },
    //   lastMessage: "How likely are you to recommend our company?",
    //   unreadCount: 0,
    //   timestamp: "35 mins",
    //   messages: [
    //     {
    //       id: 1,
    //       content: "How likely are you to recommend our company to your friends and family?",
    //       timestamp: "35 mins",
    //       sender: {
    //         id: 1,
    //         name: "Albert Flores",
    //         avatar: "/placeholder.svg",
    //       },
    //     },
    //     {
    //       id: 2,
    //       content:
    //         "Hey there, we're just writing to let you know that you've been subscribed to a repository on GitHub.",
    //       timestamp: "35 mins",
    //       sender: {
    //         id: 2,
    //         name: "You",
    //         avatar: "/placeholder.svg",
    //         isYou: true,
    //       },
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   user: {
    //     id: 2,
    //     name: "Cameron Williamson",
    //     role: "Head of Development",
    //     avatar: "/placeholder.svg",
    //     status: "offline",
    //   },
    //   lastMessage: "Ok, Understood!",
    //   unreadCount: 0,
    //   timestamp: "35 mins",
    //   messages: [
    //     {
    //       id: 1,
    //       content: "Ok, Understood!",
    //       timestamp: "35 mins",
    //       sender: {
    //         id: 2,
    //         name: "Cameron Williamson",
    //         avatar: "/placeholder.svg",
    //       },
    //     },
    //   ],
    // },
  ]);

  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showConversation, setShowConversation] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const {user}=useAuth()
  // console.log("user",user)

  const currentUser = user?.id as string;
  console.log("currentUser", currentUser);

  // Select a receiver user that is NOT the current user
  console.log("activeConversation", activeConversation);
  const receiverUser = activeConversation?.user?.id;
  console.log("receiverUser", receiverUser);

  // const sessionData=useSession()
  // console.log("session data---->",sessionData)


  // Fetch Conversations data
  // const {
  //   data: conversationsData,
  //   isConversionLoading,
  //   error,
  // } = useApiGet<MessagesResponse>(
  //   "messages/get-messages-by-roomid",
  //   { userId: "677a5abca1c88d37c860cd0d" },
  //   ["user-profile"] // Query key for caching
  // );

  useEffect(() => {
    const fetchConversations = async () => {
      if(!currentUser) return;
      const conversationData = await axios.get(
        `${API_BASE_URL}/api/messages/get-messages-by-roomid?joinedRoomId=${currentUser}`,
      );
      console.log("Conversation Data:", conversationData?.data?.data);

      const transformedData = transformMessages(
        conversationData?.data?.data?.data,
        currentUser
      );
      console.log(transformedData);
      setConversations(transformedData);
      setActiveConversation(transformedData[0]);
    };
    fetchConversations();
  }, [currentUser]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket Server");
      ws.send(JSON.stringify({ event: "joinUser", userId: currentUser })); // Replace with dynamic userId
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("📩 Message received from socket:", data);

      if (data.event === "message") {
        console.log("📩 Message received from socket:", data);

        console.log("data", data);
        console.log("currentUser", currentUser);
        const isSender = data?.senderId?._id === currentUser;
        console.log("isSender", isSender);
    // const otherUser = isSender ? msg?.receiverId : msg?.senderId;

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

    // const newMessageObj: Message = {
    //   id: Date.now(),
    //   content: newMessage,
    //   timestamp: "Just now",
    //   sender: {
    //     id: 0,
    //     name: "You",
    //     avatar: "/placeholder.svg",
    //     isYou: true,
    //   },
    // }

    // setActiveConversation((prev) => ({
    //   ...prev,
    //   messages: [...prev.messages, newMessageObj],
    // }))

    if (socket) {
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

  return (
    <div className="space-y-6">
      <p>current user is:{currentUser}</p>
      <Card className="h-[calc(100vh-12rem)]">
        <div className="grid h-full lg:grid-cols-[300px_1fr]">
          {/* Left sidebar */}
          <div
            className={cn(
              "border-r",
              "lg:block",
              showConversation ? "hidden" : "block"
            )}
          >
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search" className="pl-9" />
              </div>
            </div>
            <div className="overflow-auto h-[calc(100%-5rem)]">
              {!conversations.length ? (
                <p className="p-4 text-center text-sm text-gray-500">
                  No conversations to show
                </p>
              ) : (
                conversations?.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationClick(conversation)}
                    className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 ${
                      activeConversation?.id === conversation?.id
                        ? "bg-gray-50"
                        : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation?.user?.avatar} />
                      <AvatarFallback>
                        {conversation?.user?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="truncate">
                          <div className="font-medium text-sm">
                            {conversation?.user?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {conversation?.user?.role}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {conversation?.timestamp}
                        </div>
                      </div>
                      <div className="mt-1 text-sm text-gray-600 truncate">
                        {conversation?.lastMessage}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right panel */}
          <div
            className={cn(
              "flex flex-col",
              "lg:block",
              showConversation ? "block" : "hidden"
            )}
          >
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
                  <AvatarImage src={activeConversation?.user?.avatar} />
                  <AvatarFallback>
                    {activeConversation?.user?.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {activeConversation?.user?.name}
                  </div>
                  {/* <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${activeConversation?.user?.status === "active" ? "bg-green-500" : "bg-gray-300"
                        }`}
                    />
                    {activeConversation?.user?.status === "active" ? "Active" : "Offline"}
                  </div> */}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[354px]">
              {activeConversation?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message?.sender?.isYou ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message?.sender?.avatar} />
                    <AvatarFallback>
                      {message?.sender?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex flex-col ${
                      message?.sender?.isYou ? "items-end" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {message?.sender?.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message?.timestamp}
                      </span>
                    </div>
                    <div
                      className={`mt-1 rounded-lg p-3 max-w-[75%] break-words ${
                        message?.sender?.isYou
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message?.content}
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
                      e.preventDefault();
                      handleSendMessage();
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
  );
}
