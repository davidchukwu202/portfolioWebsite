"use client"

import { useState, useEffect } from "react"
import { Save, Eye, Edit3 } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { AdminHeader } from "@/components/admin-header"
import { ContentEditor } from "@/components/content-editor"
import { ContentPreview } from "@/components/content-preview"
import { AuthManager } from "@/lib/auth"
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  skills as defaultSkills,
  skillCategories as defaultSkillCategories,
  experience as defaultExperience,
  education as defaultEducation,
  aboutContent as defaultAboutContent,
  availability as defaultAvailability,
} from "@/lib/content"

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loginError, setLoginError] = useState("")
  const [activeTab, setActiveTab] = useState("personal")
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Content state
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo)
  const [projects, setProjects] = useState(defaultProjects)
  const [skills, setSkills] = useState(defaultSkills)
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories)
  const [experience, setExperience] = useState(defaultExperience)
  const [education, setEducation] = useState(defaultEducation)
  const [aboutContent, setAboutContent] = useState(defaultAboutContent)
  const [availability, setAvailability] = useState(defaultAvailability)

  const authManager = AuthManager.getInstance()

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authManager.isAuthenticated()
      setIsAuthenticated(authenticated)
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleLogin = (username: string, password: string) => {
    setLoginError("")
    setIsLoading(true)

    setTimeout(() => {
      const result = authManager.login(username, password)
      if (result.success) {
        setIsAuthenticated(true)
        setLoginError("")
      } else {
        setLoginError(result.error || "Login failed")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleLogout = () => {
    authManager.logout()
    setIsAuthenticated(false)
    setHasChanges(false)
    setActiveTab("personal")
    setIsPreviewMode(false)
  }

  const saveContent = () => {
    const content = {
      personalInfo,
      projects,
      skills,
      skillCategories,
      experience,
      education,
      aboutContent,
      availability,
      lastUpdated: new Date().toISOString(),
    }

    localStorage.setItem("portfolio-content", JSON.stringify(content))
    setHasChanges(false)

    // Show success message
    const button = document.querySelector("[data-save-button]") as HTMLButtonElement
    if (button) {
      const originalText = button.textContent
      button.textContent = "Saved!"
      button.classList.add("bg-green-700")
      setTimeout(() => {
        button.textContent = originalText
        button.classList.remove("bg-green-700")
      }, 2000)
    }
  }

  if (isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400 font-mono">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={loginError} isLoading={isLoading} />
  }

  const tabs = [
    { id: "personal", label: "Personal Info", count: 1 },
    { id: "experience", label: "Experience", count: experience.length },
    { id: "projects", label: "Projects", count: projects.length },
    { id: "education", label: "Education", count: education.length },
    { id: "skills", label: "Skills", count: Object.keys(skillCategories).length },
    { id: "about", label: "About", count: 1 },
    { id: "availability", label: "Availability", count: 1 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <AdminHeader onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 sticky top-24 border border-gray-700/50">
              <h3 className="text-lg font-bold font-mono mb-4 text-white">Content Sections</h3>

              <nav className="space-y-2 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-colors flex items-center justify-between ${
                      activeTab === tab.id ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">{tab.count}</span>
                  </button>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="space-y-3">
                {hasChanges && (
                  <div className="p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
                    <p className="text-yellow-300 text-xs font-mono text-center">Unsaved changes</p>
                  </div>
                )}

                <button
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-mono text-sm flex items-center gap-2 transition-colors justify-center text-white"
                >
                  {isPreviewMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isPreviewMode ? "Edit" : "Preview"}
                </button>

                <button
                  onClick={saveContent}
                  data-save-button
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-mono font-semibold flex items-center gap-2 transition-colors justify-center text-white"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {isPreviewMode ? (
              <ContentPreview
                activeTab={activeTab}
                personalInfo={personalInfo}
                projects={projects}
                skills={skills}
                skillCategories={skillCategories}
                experience={experience}
                education={education}
                aboutContent={aboutContent}
                availability={availability}
              />
            ) : (
              <ContentEditor
                activeTab={activeTab}
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
                projects={projects}
                setProjects={setProjects}
                skills={skills}
                setSkills={setSkills}
                skillCategories={skillCategories}
                setSkillCategories={setSkillCategories}
                experience={experience}
                setExperience={setExperience}
                education={education}
                setEducation={setEducation}
                aboutContent={aboutContent}
                setAboutContent={setAboutContent}
                availability={availability}
                setAvailability={setAvailability}
                onContentChange={() => setHasChanges(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
