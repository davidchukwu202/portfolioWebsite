"use client"

import { useEffect, useRef, useState } from "react"
import { Brain, Target, Download, MapPin, Mail } from "lucide-react"
import { aboutContent, personalInfo } from "@/lib/content"
import Image from "next/image"

export default function About() {
  const [isVisible, setIsVisible] = useState({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          id="about-header"
          data-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible["about-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">About Me</span>
          </h1>
          <p className="text-xl text-gray-300 font-mono">The journey of building innovative solutions that matter</p>
        </div>

        {/* Profile Section with Picture */}
        <div
          id="profile-section"
          data-animate
          className={`mb-16 transition-all duration-1000 delay-200 ${
            isVisible["profile-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Profile Picture */}
              <div className="lg:col-span-1 flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-blue-400 bg-gradient-to-r from-blue-400 to-violet-400 p-1">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-gray-800">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Chukwuebuka David - AI and Software Engineer"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-violet-400 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="lg:col-span-2">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-white font-mono mb-2">{personalInfo.name}</h2>
                  <p className="text-xl text-blue-400 font-mono mb-4">{personalInfo.title}</p>
                  <p className="text-gray-300 font-mono mb-6">{personalInfo.tagline}</p>

                  {/* Quick Contact Info */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300 font-mono">{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-300 font-mono">{personalInfo.email}</span>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400 font-mono">2+</div>
                      <div className="text-sm text-gray-400 font-mono">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                      <div className="text-2xl font-bold text-violet-400 font-mono">15+</div>
                      <div className="text-sm text-gray-400 font-mono">Projects Completed</div>
                    </div>
                    <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-400 font-mono">100%</div>
                      <div className="text-sm text-gray-400 font-mono">Client Satisfaction</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="/contact"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-mono font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300 text-center"
                    >
                      Get In Touch
                    </a>
                    <a
                      href="/resume"
                      className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-mono font-semibold hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2 justify-center"
                    >
                      <Download className="w-4 h-4" />
                      Download Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Story */}
        <div
          id="story"
          data-animate
          className={`mb-16 transition-all duration-1000 delay-400 ${
            isVisible["story"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-violet-400" />
              <h2 className="text-2xl font-bold text-blue-400 font-mono">My Story</h2>
            </div>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              {aboutContent.story.map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Values & Approach */}
        <div
          id="values"
          data-animate
          className={`mb-16 transition-all duration-1000 delay-600 ${
            isVisible["values"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold text-white font-mono">Values & Approach</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {aboutContent.values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg border border-blue-500/20">
                    <value.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">{value.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div
          id="journey"
          data-animate
          className={`mb-16 transition-all duration-1000 delay-800 ${
            isVisible["journey"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-6 h-6 text-violet-400" />
            <h2 className="text-3xl font-bold text-white font-mono">My Journey</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-violet-400 to-blue-400"></div>

            <div className="space-y-8">
              {aboutContent.journey.map((item, index) => (
                <div key={index} className="flex gap-6 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full border-4 border-gray-900 z-10 ${
                        item.color === "blue" ? "bg-blue-400" : "bg-violet-400"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
                      <h3 className="text-lg font-bold text-white font-mono mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Highlight */}
        <div
          id="skills-highlight"
          data-animate
          className={`transition-all duration-1000 delay-1000 ${
            isVisible["skills-highlight"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-violet-900/30 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold font-mono text-white mb-4">Core Technologies</h2>
              <p className="text-gray-300 mb-6">The tools and technologies I use to bring ideas to life</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["React", "Node.js", "Next.js", "TypeScript", "Prisma", "Tailwind CSS", "PostgreSQL", "Express"].map(
                  (tech) => (
                    <div key={tech} className="p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
                      <span className="text-sm font-mono text-gray-300">{tech}</span>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-8">
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-mono font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300"
                >
                  View My Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
