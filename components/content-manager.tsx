"use client"

import { useState } from "react"
import { projects, skills, experience } from "@/lib/content"

// This component can be used to dynamically manage content
// You can expand this to include forms for editing content
export function ContentManager() {
  const [activeTab, setActiveTab] = useState("projects")

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Content Manager</h3>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-4 py-2 rounded ${activeTab === "projects" ? "bg-blue-600" : "bg-gray-600"}`}
        >
          Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 rounded ${activeTab === "skills" ? "bg-blue-600" : "bg-gray-600"}`}
        >
          Skills ({skills.length})
        </button>
        <button
          onClick={() => setActiveTab("experience")}
          className={`px-4 py-2 rounded ${activeTab === "experience" ? "bg-blue-600" : "bg-gray-600"}`}
        >
          Experience ({experience.length})
        </button>
      </div>

      <div className="text-sm text-gray-300">
        {activeTab === "projects" && (
          <div>
            <p className="mb-2">Current projects: {projects.length}</p>
            <p>Featured projects: {projects.filter((p) => p.featured).length}</p>
          </div>
        )}
        {activeTab === "skills" && (
          <div>
            <p className="mb-2">Total skills: {skills.length}</p>
            <p>Backend: {skills.filter((s) => s.category === "backend").length}</p>
            <p>AI: {skills.filter((s) => s.category === "ai").length}</p>
          </div>
        )}
        {activeTab === "experience" && (
          <div>
            <p>Total positions: {experience.length}</p>
          </div>
        )}
      </div>
    </div>
  )
}
