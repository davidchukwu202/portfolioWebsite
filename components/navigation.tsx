"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Terminal, Settings } from "lucide-react"
import { personalInfo } from "@/lib/content"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ]

  // Add admin link if not on admin page
  if (!pathname.startsWith("/admin")) {
    navItems.push({ href: "/admin", label: "Admin" })
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-mono font-bold text-xl">
            <Terminal className="w-6 h-6 text-blue-400" />
            <span className="text-white">{personalInfo.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-sm transition-colors duration-200 flex items-center gap-2 ${
                  pathname === item.href ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label === "Admin" && <Settings className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-lg rounded-lg mt-2 p-4 border border-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 font-mono text-sm transition-colors duration-200 flex items-center gap-2 ${
                  pathname === item.href ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label === "Admin" && <Settings className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
