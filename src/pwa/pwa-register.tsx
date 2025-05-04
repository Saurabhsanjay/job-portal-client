"use client"

import { useEffect } from "react"

export default function PWARegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && window.location.hostname !== "localhost") {
      window.addEventListener("load", () => {
        const swUrl = "/sw.js"
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log("Service Worker registered: ", registration)
          })
          .catch((registrationError) => {
            console.log("Service Worker registration failed: ", registrationError)
          })
      })
    }
  }, [])

  return null
}
