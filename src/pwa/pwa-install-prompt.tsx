"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if the app is already installed
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches)

    // Check if the device is iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream)

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Store the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show the install button
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  // Don't show the prompt if the app is already installed
  if (isStandalone) {
    return null
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    await deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt")
    } else {
      console.log("User dismissed the install prompt")
    }

    // Clear the saved prompt since it can't be used again
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
  }

  if (!showPrompt && !isIOS) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium">Install Recruit-G App</h3>
          {isIOS ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              To install this app on your iOS device, tap the share button
              <span className="mx-1">⎋</span>
              and then "Add to Home Screen"
              <span className="mx-1">+</span>
            </p>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">Install our app for a better experience</p>
          )}
        </div>
        {!isIOS && (
          <Button onClick={handleInstallClick} className="mr-2">
            <Download className="w-4 h-4 mr-2" />
            Install
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={dismissPrompt}>
          <X className="w-4 h-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  )
}
