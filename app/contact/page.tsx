"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Send, MapPin, Clock, Mail } from "lucide-react"
import { personalInfo, socialLinksData as socialLinks, availability } from "@/lib/content"

export default function Contact() {
  const [isVisible, setIsVisible] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })



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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=davidebuka202@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.open(gmailLink, "_blank")
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          id="contact-header"
          data-animate
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible["contact-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Let's Build Together
            </span>
          </h1>
          <p className="text-xl text-gray-300 font-mono max-w-3xl mx-auto">
            Ready to architect the future? Whether you're a founder with a vision, a startup looking to scale, or an
            engineer seeking collaboration, let's create something extraordinary.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            id="contact-form"
            data-animate
            className={`transition-all duration-1000 delay-200 ${
              isVisible["contact-form"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-blue-400 font-mono mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-mono text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-mono text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-mono text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition-colors duration-200"
                    placeholder="Project collaboration, job opportunity, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>



                

                <button

                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-mono font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div
            id="contact-info"
            data-animate
            className={`space-y-8 transition-all duration-1000 delay-400 ${
              isVisible["contact-info"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {/* Quick Contact */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-bold text-violet-400 font-mono mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="font-mono text-gray-300">{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="font-mono text-gray-300">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="font-mono text-gray-300">{personalInfo.timezone}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-bold text-violet-400 font-mono mb-6">Connect With Me</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    <div>
                      <span className="font-mono text-white block">{social.name}</span>
                      <span className="font-mono text-gray-400 text-sm">{social.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-r from-blue-900/30 to-violet-900/30 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-xl font-bold text-blue-400 font-mono mb-4">Current Availability</h3>
              <p className="text-gray-300 font-mono text-sm mb-4">
                I'm currently open to new opportunities and collaborations. Whether you need:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                {availability.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
