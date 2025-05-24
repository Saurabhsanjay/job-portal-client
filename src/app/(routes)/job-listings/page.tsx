"use client";

import { Bell, Briefcase } from "lucide-react";
import { JobBoard } from "./_components/JobBoard";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/app/(providers)/AuthContext";
import { useApiGet } from "@/hooks/use-api-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function JobsPage() {
  const [count, setCount] = useState(99);
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    setCount(0);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <JobBoard />
    </div>
  );
}
