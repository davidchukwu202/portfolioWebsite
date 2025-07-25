"use client"

import { useEffect, useRef, useState } from "react"
import { Download, Mail, Phone, MapPin, Github, ExternalLink } from "lucide-react"
import { personalInfo, experience, education, certifications } from "@/lib/content"

export default function Resume() {
  const [isVisible, setIsVisible] = useState({})
  const [resumeUrl, setResumeUrl] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Load resume from localStorage if available
    const savedResume = localStorage.getItem("portfolio-resume")
    if (savedResume) {
      setResumeUrl(savedResume)
    }

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

  const handleDownloadResume = () => {
    if (resumeUrl) {
      // Create a download link for the uploaded resume
      const link = document.createElement("a")
      link.href = resumeUrl
      link.download = `${personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`
      link.click()
    } else {
      // Fallback: generate a basic text resume
      const resumeText = `
${personalInfo.name}
${personalInfo.title}

Contact Information:
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Location: ${personalInfo.location}
GitHub: ${personalInfo.github}

Professional Summary:
${personalInfo.profileSummary}

Professional Experience:
${experience
  .map(
    (exp) => `
${exp.title} at ${exp.company} (${exp.period})
${exp.achievements.map((achievement) => `• ${achievement}`).join("\n")}
`,
  )
  .join("\n")}

Education:
${education.map((edu) => `${edu.degree} - ${edu.institution} (${edu.period})`).join("\n")}

Generated on: ${new Date().toLocaleDateString()}
      `

      const blob = new Blob([resumeText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${personalInfo.name.replace(/\s+/g, "_")}_Resume.txt`
      link.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Download */}
        <div
          id="resume-header"
          data-animate
          className={`flex flex-col sm:flex-row justify-between items-center mb-12 transition-all duration-1000 ${
            isVisible["resume-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2 font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Resume</span>
            </h1>
            <p className="text-gray-300 font-mono">AI + Backend Engineering Professional</p>
          </div>
          <button
            onClick={handleDownloadResume}
            className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-mono font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download {resumeUrl ? "PDF" : "Resume"}
          </button>
        </div>

        {/* Resume Upload Status */}
        {resumeUrl && (
          <div
            id="resume-status"
            data-animate
            className={`mb-8 p-4 bg-green-900/30 border border-green-500/50 rounded-lg transition-all duration-1000 delay-100 ${
              isVisible["resume-status"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-green-300 text-sm font-mono text-center">
              ✓ Click the download button 
            </p>
          </div>
        )}

        {/* Resume Content */}
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
          {/* Contact Info */}
          <div
            id="contact-info"
            data-animate
            className={`mb-8 transition-all duration-1000 delay-200 ${
              isVisible["contact-info"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold text-white font-mono mb-6">{personalInfo.name}</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-sm">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-sm">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-sm">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-sm">{personalInfo.github.replace("https://", "")}</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div
            id="summary"
            data-animate
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isVisible["summary"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-bold text-blue-400 font-mono mb-4">Professional Summary</h3>
            <p className="text-gray-300 leading-relaxed">{personalInfo.profileSummary}</p>
          </div>

          {/* Experience */}
          <div
            id="experience"
            data-animate
            className={`mb-8 transition-all duration-1000 delay-500 ${
              isVisible["experience"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-bold text-blue-400 font-mono mb-4">Professional Experience</h3>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className={`border-l-2 border-${job.borderColor}-400 pl-4`}>
                  <h4 className="text-lg font-bold text-white font-mono">{job.title}</h4>
                  <p className="text-violet-400 font-mono text-sm mb-2">
                    {job.company} • {job.period}
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div
            id="education"
            data-animate
            className={`mb-8 transition-all duration-1000 delay-600 ${
              isVisible["education"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-bold text-blue-400 font-mono mb-4">Education</h3>
            {education.map((edu, index) => (
              <div key={index} className={`border-l-2 border-${edu.borderColor}-400 pl-4`}>
                <h4 className="text-lg font-bold text-white font-mono">{edu.degree}</h4>
                <p className="text-violet-400 font-mono text-sm mb-2">
                  {edu.institution} • {edu.period}
                </p>
                <p className="text-gray-300 text-sm">{edu.location}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div
            id="certifications"
            data-animate
            className={`transition-all duration-1000 delay-700 ${
              isVisible["certifications"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-bold text-blue-400 font-mono mb-4">Certifications</h3>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-violet-400" />
                  <span className="text-gray-300 font-mono text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
