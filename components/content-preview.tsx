"use client"

interface ContentPreviewProps {
  activeTab: string
  personalInfo: any
  projects: any[]
  skills: any[]
  skillCategories: any
  experience: any[]
  education: any[]
  aboutContent: any
  availability: any
}

export function ContentPreview({
  activeTab,
  personalInfo,
  projects,
  skills,
  skillCategories,
  experience,
  education,
  aboutContent,
  availability,
}: ContentPreviewProps) {
  const renderPersonalPreview = () => (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-bold font-mono text-blue-400 mb-6">Personal Information Preview</h2>

      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-mono text-white mb-2">{personalInfo.name}</h1>
          <p className="text-xl text-blue-400 font-mono mb-4">{personalInfo.title}</p>
          <p className="text-gray-300 leading-relaxed">{personalInfo.profileSummary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h3 className="font-mono text-blue-400 mb-2">Contact Info</h3>
            <p className="text-sm text-gray-300">Email: {personalInfo.email}</p>
            <p className="text-sm text-gray-300">Phone: {personalInfo.phone}</p>
            <p className="text-sm text-gray-300">Location: {personalInfo.location}</p>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h3 className="font-mono text-blue-400 mb-2">Links</h3>
            <p className="text-sm text-gray-300">GitHub: {personalInfo.github}</p>
            <p className="text-sm text-gray-300">LinkedIn: {personalInfo.linkedin}</p>
            <p className="text-sm text-gray-300">Twitter: {personalInfo.twitter}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderExperiencePreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-mono text-blue-400">Professional Experience Preview</h2>

      {experience.map((exp, index) => (
        <div key={index} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold font-mono text-white">{exp.title}</h3>
          <p className="text-violet-400 font-mono mb-4">
            {exp.company} • {exp.period}
          </p>

          <ul className="space-y-2">
            {exp.achievements.map((achievement: string, idx: number) => (
              <li key={idx} className="text-gray-300 text-sm">
                • {achievement}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )

  const renderProjectsPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-mono text-blue-400">Projects Preview</h2>

      {projects.map((project, index) => (
        <div key={project.id} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold font-mono text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>

          <div className="mb-4">
            <h4 className="font-mono text-blue-400 mb-2">Features:</h4>
            <ul className="space-y-1">
              {project.features.map((feature: string, idx: number) => (
                <li key={idx} className="text-gray-300 text-sm">
                  • {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((tech: string) => (
              <span key={tech} className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs font-mono">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 text-sm">
            <p className="text-gray-300">Demo: {project.demo}</p>
            <p className="text-gray-300">GitHub: {project.github}</p>
          </div>
        </div>
      ))}
    </div>
  )

  const renderEducationPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-mono text-blue-400">Education Preview</h2>

      {education.map((edu, index) => (
        <div key={index} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold font-mono text-white">{edu.degree}</h3>
          <p className="text-violet-400 font-mono">{edu.institution}</p>
          <p className="text-gray-300 text-sm">
            {edu.period} • {edu.location}
          </p>
        </div>
      ))}
    </div>
  )

  const renderSkillsPreview = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-mono text-blue-400">Skills Preview</h2>

      {Object.entries(skillCategories).map(([category, skillList]) => (
        <div key={category} className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-bold font-mono text-violet-400 mb-4">{category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(skillList as string[]).map((skill, index) => (
              <div key={index} className="bg-gray-700/30 rounded-lg p-3 text-center">
                <span className="text-sm font-mono text-gray-300">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderAboutPreview = () => (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-bold font-mono text-blue-400 mb-6">About Preview</h2>
      <div className="space-y-4">
        {aboutContent.story.map((paragraph: string, index: number) => (
          <p key={index} className="text-gray-300 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )

  const renderAvailabilityPreview = () => (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-bold font-mono text-blue-400 mb-6">Availability Preview</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-mono text-white mb-2">Current Status</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-mono ${
              availability.status === "available"
                ? "bg-green-600 text-green-100"
                : availability.status === "busy"
                  ? "bg-yellow-600 text-yellow-100"
                  : "bg-red-600 text-red-100"
            }`}
          >
            {availability.status.charAt(0).toUpperCase() + availability.status.slice(1)}
          </span>
        </div>

        <div>
          <h3 className="font-mono text-white mb-2">Services Offered</h3>
          <ul className="space-y-2">
            {availability.services.map((service: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalPreview()
      case "experience":
        return renderExperiencePreview()
      case "projects":
        return renderProjectsPreview()
      case "education":
        return renderEducationPreview()
      case "skills":
        return renderSkillsPreview()
      case "about":
        return renderAboutPreview()
      case "availability":
        return renderAvailabilityPreview()
      default:
        return renderPersonalPreview()
    }
  }

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <p className="text-blue-300 text-sm font-mono">
          📋 Preview Mode: This shows how your content will appear on the live site
        </p>
      </div>
      {renderContent()}
    </div>
  )
}
