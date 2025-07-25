"use client"

import type React from "react"

import { Plus, Trash2, Upload, Download, ExternalLink } from "lucide-react"

interface ContentEditorProps {
  activeTab: string
  personalInfo: any
  setPersonalInfo: (info: any) => void
  projects: any[]
  setProjects: (projects: any[]) => void
  skills: any[]
  setSkills: (skills: any[]) => void
  skillCategories: any
  setSkillCategories: (categories: any) => void
  experience: any[]
  setExperience: (experience: any[]) => void
  education: any[]
  setEducation: (education: any[]) => void
  aboutContent: any
  setAboutContent: (content: any) => void
  availability: any
  setAvailability: (availability: any) => void
  onContentChange: () => void
}

export function ContentEditor({
  activeTab,
  personalInfo,
  setPersonalInfo,
  projects,
  setProjects,
  skills,
  setSkills,
  skillCategories,
  setSkillCategories,
  experience,
  setExperience,
  education,
  setEducation,
  aboutContent,
  setAboutContent,
  availability,
  setAvailability,
  onContentChange,
}: ContentEditorProps) {
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file)
      setPersonalInfo({
        ...personalInfo,
        resumeFile: file,
        resumeUrl: fileUrl,
      })
      onContentChange()

      // Store file in localStorage as base64 for persistence
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        localStorage.setItem("portfolio-resume", base64)
      }
      reader.readAsDataURL(file)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const addNewExperience = () => {
    const newExp = {
      title: "New Position",
      company: "Company Name",
      period: "Month Year – Month Year",
      achievements: ["Achievement 1", "Achievement 2"],
      borderColor: "blue",
    }
    setExperience([...experience, newExp])
    onContentChange()
  }

  const removeExperience = (index: number) => {
    if (confirm("Are you sure you want to remove this experience?")) {
      const updated = experience.filter((_, i) => i !== index)
      setExperience(updated)
      onContentChange()
    }
  }

  const addNewProject = () => {
    const newProject = {
      id: `project-${Date.now()}`,
      title: "New Project",
      description: "Project description here",
      problem: "Problem this project solves",
      features: ["Feature 1", "Feature 2"],
      stack: ["Technology 1", "Technology 2"],
      github: "https://github.com/davidchukwu202",
      demo: [],
      preview: "/placeholder.svg?height=400&width=600",
      icon: "Code2",
      featured: false,
      status: "completed",
      year: new Date().getFullYear().toString(),
    }
    setProjects([...projects, newProject])
    onContentChange()
  }

  const removeProject = (index: number) => {
    if (confirm("Are you sure you want to remove this project?")) {
      const updated = projects.filter((_, i) => i !== index)
      setProjects(updated)
      onContentChange()
    }
  }

  const addNewEducation = () => {
    const newEdu = {
      degree: "New Degree",
      institution: "Institution Name",
      period: "Start Year – End Year",
      location: "Location",
      borderColor: "blue",
    }
    setEducation([...education, newEdu])
    onContentChange()
  }

  const removeEducation = (index: number) => {
    if (confirm("Are you sure you want to remove this education entry?")) {
      const updated = education.filter((_, i) => i !== index)
      setEducation(updated)
      onContentChange()
    }
  }

  const addNewSkillCategory = () => {
    const categoryName = prompt("Enter new skill category name:")
    if (categoryName && !skillCategories[categoryName]) {
      setSkillCategories({
        ...skillCategories,
        [categoryName]: ["Skill 1", "Skill 2"],
      })
      onContentChange()
    }
  }

  const removeSkillCategory = (categoryName: string) => {
    if (confirm(`Are you sure you want to remove the "${categoryName}" category?`)) {
      const updated = { ...skillCategories }
      delete updated[categoryName]
      setSkillCategories(updated)
      onContentChange()
    }
  }

  const renderPersonalInfoEditor = () => (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-bold font-mono text-blue-400 mb-6">Personal Information</h2>

      <div className="space-y-6">
        {/* Resume Upload Section */}
        <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
          <h3 className="text-lg font-mono text-violet-400 mb-4">Resume Management</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Upload Resume (PDF)</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-mono text-sm cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  Choose PDF File
                  <input type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" />
                </label>

                {personalInfo.resumeUrl && (
                  <a
                    href={personalInfo.resumeUrl}
                    download="resume.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-mono text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Current
                  </a>
                )}
              </div>
              {personalInfo.resumeFile && (
                <p className="text-green-400 text-sm font-mono mt-2">
                  ✓ Resume uploaded: {personalInfo.resumeFile.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-mono text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, name: e.target.value })
                onContentChange()
              }}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={personalInfo.title}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, title: e.target.value })
                onContentChange()
              }}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, email: e.target.value })
                onContentChange()
              }}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-300 mb-2">Phone</label>
            <input
              type="text"
              value={personalInfo.phone}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, phone: e.target.value })
                onContentChange()
              }}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, location: e.target.value })
                onContentChange()
              }}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-300 mb-2">GitHub URL</label>
            <input
              type="url"
              value={personalInfo.github}
              onChange={(e) => {
                setPersonalInfo({ ...personalInfo, github: e.target.value })
                onContentChange()
              }}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-mono text-gray-300 mb-2">Profile Summary</label>
          <textarea
            value={personalInfo.profileSummary}
            onChange={(e) => {
              setPersonalInfo({ ...personalInfo, profileSummary: e.target.value })
              onContentChange()
            }}
            rows={6}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderExperienceEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-mono text-blue-400">Professional Experience</h2>
        <button
          onClick={addNewExperience}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-mono text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Experience
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={index} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-mono text-violet-400">Experience #{index + 1}</h3>
            <button
              onClick={() => removeExperience(index)}
              className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-mono transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Remove
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Job Title</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => {
                  const updated = [...experience]
                  updated[index] = { ...updated[index], title: e.target.value }
                  setExperience(updated)
                  onContentChange()
                }}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => {
                  const updated = [...experience]
                  updated[index] = { ...updated[index], company: e.target.value }
                  setExperience(updated)
                  onContentChange()
                }}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-mono text-gray-300 mb-2">Period</label>
            <input
              type="text"
              value={exp.period}
              onChange={(e) => {
                const updated = [...experience]
                updated[index] = { ...updated[index], period: e.target.value }
                setExperience(updated)
                onContentChange()
              }}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-300 mb-2">Achievements (one per line)</label>
            <textarea
              value={exp.achievements.join("\n")}
              onChange={(e) => {
                const updated = [...experience]
                updated[index] = { ...updated[index], achievements: e.target.value.split("\n").filter(Boolean) }
                setExperience(updated)
                onContentChange()
              }}
              rows={6}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  )

  const renderProjectsEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-mono text-blue-400">Projects</h2>
        <button
          onClick={addNewProject}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-mono text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={project.id} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-mono text-violet-400">Project #{index + 1}</h3>
            <button
              onClick={() => removeProject(index)}
              className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-mono transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Remove
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-mono text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => {
                const updated = [...projects]
                updated[index] = { ...updated[index], title: e.target.value }
                setProjects(updated)
                onContentChange()
              }}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-mono text-gray-300 mb-2">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => {
                const updated = [...projects]
                updated[index] = { ...updated[index], description: e.target.value }
                setProjects(updated)
                onContentChange()
              }}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-mono text-gray-300 mb-2">Features (one per line)</label>
            <textarea
              value={project.features.join("\n")}
              onChange={(e) => {
                const updated = [...projects]
                updated[index] = { ...updated[index], features: e.target.value.split("\n").filter(Boolean) }
                setProjects(updated)
                onContentChange()
              }}
              rows={5}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-mono text-gray-300 mb-2">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={project.stack.join(", ")}
              onChange={(e) => {
                const updated = [...projects]
                updated[index] = {
                  ...updated[index],
                  stack: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                }
                setProjects(updated)
                onContentChange()
              }}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">GitHub URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={project.github}
                  onChange={(e) => {
                    const updated = [...projects]
                    updated[index] = { ...updated[index], github: e.target.value }
                    setProjects(updated)
                    onContentChange()
                  }}
                  className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                />
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                  title="Open GitHub"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Demo URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={project.demo}
                  onChange={(e) => {
                    const updated = [...projects]
                    updated[index] = { ...updated[index], demo: e.target.value }
                    setProjects(updated)
                    onContentChange()
                  }}
                  className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                />
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 hover:bg-blue-500 rounded transition-colors"
                  title="Open Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Featured</label>
              <select
                value={project.featured ? "true" : "false"}
                onChange={(e) => {
                  const updated = [...projects]
                  updated[index] = { ...updated[index], featured: e.target.value === "true" }
                  setProjects(updated)
                  onContentChange()
                }}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Year</label>
              <input
                type="text"
                value={project.year}
                onChange={(e) => {
                  const updated = [...projects]
                  updated[index] = { ...updated[index], year: e.target.value }
                  setProjects(updated)
                  onContentChange()
                }}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderEducationEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-mono text-blue-400">Education</h2>
        <button
          onClick={addNewEducation}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-mono text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-mono text-violet-400">Education #{index + 1}</h3>
            <button
              onClick={() => removeEducation(index)}
              className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-mono transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Remove
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => {
                  const updated = [...education]
                  updated[index] = { ...updated[index], degree: e.target.value }
                  setEducation(updated)
                  onContentChange()
                }}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => {
                  const updated = [...education]
                  updated[index] = { ...updated[index], institution: e.target.value }
                  setEducation(updated)
                  onContentChange()
                }}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Period</label>
              <input
                type="text"
                value={edu.period}
                onChange={(e) => {
                  const updated = [...education]
                  updated[index] = { ...updated[index], period: e.target.value }
                  setEducation(updated)
                  onContentChange()
                }}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-gray-300 mb-2">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => {
                  const updated = [...education]
                  updated[index] = { ...updated[index], location: e.target.value }
                  setEducation(updated)
                  onContentChange()
                }}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderSkillsEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-mono text-blue-400">Skills by Category</h2>
        <button
          onClick={addNewSkillCategory}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-mono text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Category
        </button>
      </div>

      {Object.entries(skillCategories).map(([category, skillList]) => (
        <div key={category} className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold font-mono text-violet-400">{category}</h3>
            <button
              onClick={() => removeSkillCategory(category)}
              className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm font-mono transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Remove Category
            </button>
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-300 mb-2">Skills (one per line)</label>
            <textarea
              value={(skillList as string[]).join("\n")}
              onChange={(e) => {
                const updated = { ...skillCategories }
                updated[category] = e.target.value.split("\n").filter(Boolean)
                setSkillCategories(updated)
                onContentChange()
              }}
              rows={6}
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  )

  const renderAboutEditor = () => (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-bold font-mono text-blue-400 mb-6">About Content</h2>

      <div>
        <label className="block text-sm font-mono text-gray-300 mb-2">Story</label>
        <textarea
          value={aboutContent.story.join("\n\n")}
          onChange={(e) => {
            setAboutContent({ ...aboutContent, story: e.target.value.split("\n\n").filter(Boolean) })
            onContentChange()
          }}
          rows={8}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
    </div>
  )

  const renderAvailabilityEditor = () => (
    <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
      <h2 className="text-2xl font-bold font-mono text-blue-400 mb-6">Availability</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-mono text-gray-300 mb-2">Status</label>
          <select
            value={availability.status}
            onChange={(e) => {
              setAvailability({ ...availability, status: e.target.value })
              onContentChange()
            }}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-mono text-gray-300 mb-2">Services (one per line)</label>
          <textarea
            value={availability.services.join("\n")}
            onChange={(e) => {
              setAvailability({ ...availability, services: e.target.value.split("\n").filter(Boolean) })
              onContentChange()
            }}
            rows={6}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInfoEditor()
      case "experience":
        return renderExperienceEditor()
      case "projects":
        return renderProjectsEditor()
      case "education":
        return renderEducationEditor()
      case "skills":
        return renderSkillsEditor()
      case "about":
        return renderAboutEditor()
      case "availability":
        return renderAvailabilityEditor()
      default:
        return renderPersonalInfoEditor()
    }
  }

  return <div>{renderContent()}</div>
}
