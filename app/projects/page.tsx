"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, Eye, Code2 } from "lucide-react"
import { projects } from "@/lib/content"
import Image from "next/image"

export default function Projects() {
  const [isVisible, setIsVisible] = useState({})
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          id="projects-header"
          data-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible["projects-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              My Projects
            </span>
          </h1>
          <p className="text-xl text-gray-300 font-mono max-w-3xl mx-auto">
            A collection of full-stack applications showcasing modern web development with React, Node.js, and
            cutting-edge technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={project.id}
              data-animate
              className={`transition-all duration-1000 ${
                isVisible[project.id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300 overflow-hidden">
                {/* Project Preview Image */}
                <div className="relative h-64 md:h-80 bg-gray-700/50 overflow-hidden">
                  <Image
                    src={project.preview || "/placeholder.svg?height=400&width=600&query=web application screenshot"}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

                  {/* Project Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono ${
                        project.featured ? "bg-yellow-600 text-yellow-100" : "bg-green-600 text-green-100"
                      }`}
                    >
                      {project.featured ? "FEATURED" : "COMPLETED"}
                    </span>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                      title="View Live Demo"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                      title="View Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Project Year */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-gray-900/80 text-gray-300 rounded text-sm font-mono">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg border border-blue-500/20">
                      <project.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 font-mono">{project.title}</h3>
                      <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-mono text-blue-400 mb-3">Technology Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm font-mono border border-blue-700/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-mono text-violet-400 mb-3">Key Features:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-violet-400 rounded-full flex-shrink-0"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Tech Stack (if available) */}
                  {project.technologies && (
                    <div className="mb-6">
                      <button
                        onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                        className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors"
                      >
                        <Code2 className="w-4 h-4" />
                        {selectedProject === project.id ? "Hide" : "Show"} Technical Details
                      </button>

                      {selectedProject === project.id && (
                        <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            {Object.entries(project.technologies).map(([category, techs]) => (
                              <div key={category}>
                                <h5 className="font-mono text-blue-400 mb-2 capitalize">{category}:</h5>
                                <ul className="space-y-1">
                                  {(techs as string[]).map((tech, idx) => (
                                    <li key={idx} className="text-gray-300">
                                      • {tech}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-mono font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-mono font-semibold hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-violet-900/30 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-bold font-mono text-white mb-4">Interested in Working Together?</h2>
            <p className="text-gray-300 mb-6">
              I'm always open to discussing new projects and opportunities. Let's build something amazing together!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-mono font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300"
            >
              Get In Touch
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
