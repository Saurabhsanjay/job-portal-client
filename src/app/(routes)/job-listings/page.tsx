"use client"
import { JobBoard } from "./_components/JobBoard"
import { useState } from "react"
import { useAuth } from "@/app/(providers)/AuthContext"
import { useRouter } from "next/navigation"

export default function JobsPage() {
  const [count, setCount] = useState(99)
  const { user } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    setCount(0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <JobBoard />
    </div>
  )
}
