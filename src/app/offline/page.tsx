import Link from "next/link"
import { WifiOff } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <WifiOff className="w-16 h-16 mb-6 text-indigo-600" />
      <h1 className="text-3xl font-bold mb-4">You're offline</h1>
      <p className="text-lg mb-6 max-w-md">
        It seems you're not connected to the internet. Please check your connection and try again.
      </p>
      <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
        Try again
      </Link>
    </div>
  )
}
