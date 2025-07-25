"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme
    if (savedTheme) {
      setThemeState(savedTheme)
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setThemeState(systemPrefersDark ? "dark" : "light")
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-theme", theme)
      // Apply theme to document
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("light")
        document.body.className = "bg-gray-900 text-white transition-colors duration-300"
      } else {
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
        document.body.className = "bg-white text-gray-900 transition-colors duration-300"
      }
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"))
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  // Prevent hydration mismatch by showing a loading state
  if (!mounted) {
    return <div className="min-h-screen bg-gray-900 text-white">{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={theme === "dark" ? "dark" : "light"}>{children}</div>
    </ThemeContext.Provider>
  )
}
