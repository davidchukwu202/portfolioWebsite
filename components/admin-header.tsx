"use client"

import { useState, useEffect } from "react"
import { LogOut, Clock, User } from "lucide-react"
import { AuthManager } from "@/lib/auth"

interface AdminHeaderProps {
  onLogout: () => void
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const [remainingTime, setRemainingTime] = useState("")
  const authManager = AuthManager.getInstance()

  useEffect(() => {
    const updateRemainingTime = () => {
      const remaining = authManager.getRemainingTime()
      if (remaining > 0) {
        const hours = Math.floor(remaining / (1000 * 60 * 60))
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
        setRemainingTime(`${hours}h ${minutes}m`)
      } else {
        setRemainingTime("Expired")
      }
    }

    updateRemainingTime()
    const interval = setInterval(updateRemainingTime, 60000)
    return () => clearInterval(interval)
  }, [authManager])

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      onLogout()
    }
  }

  const extendSession = () => {
    authManager.extendSession()
    const remaining = authManager.getRemainingTime()
    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    setRemainingTime(`${hours}h ${minutes}m`)
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-mono text-blue-400">Portfolio Admin</h1>
            <p className="text-gray-400 text-sm">Edit your portfolio content</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="w-4 h-4" />
                <span className="font-mono">Admin</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{remainingTime}</span>
                <button
                  onClick={extendSession}
                  className="text-blue-400 hover:text-blue-300 text-xs underline"
                  title="Extend session by 24 hours"
                >
                  extend
                </button>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-mono text-sm flex items-center gap-2 transition-colors text-white"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
