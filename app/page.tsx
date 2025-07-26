'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Download,
  Terminal,
  Code2,
  Server,
  Lightbulb,
} from 'lucide-react';
import {
  heroContent,
  getFeaturedProjects,
  skills,
  personalInfo,
} from '@/lib/content';

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Background Elements */}
      <BackgroundElements />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-6xl mx-auto text-center">
          <div
            id="hero-title"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['hero-title']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 font-mono">
              <span className="text-white">{personalInfo.name}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                {' '}
                —{' '}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                {personalInfo.title}
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Terminal className="w-5 h-5 text-blue-400" />
              <p className="text-lg sm:text-xl text-gray-300 font-mono">
                {personalInfo.tagline}
              </p>
            </div>
          </div>

          <TerminalAnimation />

          {/* CTA Buttons */}
          <div
            id="hero-cta"
            data-animate
            className={`flex flex-col sm:flex-row gap-4 justify-center mt-12 transition-all duration-1000 delay-500 ${
              isVisible['hero-cta']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-mono font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              Let's Build Together
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/resume"
              className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg font-mono font-semibold hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Download className="w-5 h-5" />
              View Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Short Bio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            id="bio"
            data-animate
            className={`transition-all duration-1000 delay-200 ${
              isVisible['bio']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-violet-400" />
                <h2 className="text-2xl font-bold text-blue-400 font-mono">
                  About Me
                </h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed font-mono mb-6">
                {heroContent.philosophy}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400 font-mono">
                <span>🚀 Founder of DEC Tech</span>
                <span>⚡ Clean Energy Innovation</span>
                <span>🔧 Backend Architecture Expert</span>
              </div>
              <Link
                href="/about"
                className="text-blue-400 hover:text-blue-300 font-mono text-sm flex items-center gap-2 transition-colors duration-200 mt-4"
              >
                Read my full story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Skills */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            id="skills-title"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible['skills-title']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-12">
              <Code2 className="w-6 h-6 text-blue-400" />
              <h2 className="text-3xl font-bold text-white font-mono">
                Core Technologies
              </h2>
            </div>
          </div>

          <SkillsGrid isVisible={isVisible} />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            id="projects-title"
            data-animate
            className={`flex items-center justify-between mb-12 transition-all duration-1000 ${
              isVisible['projects-title']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3">
              <Server className="w-6 h-6 text-violet-400" />
              <h2 className="text-3xl font-bold text-white font-mono">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-blue-400 hover:text-blue-300 font-mono text-sm flex items-center gap-2 transition-colors duration-200"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <FeaturedProjects isVisible={isVisible} />
        </div>
      </section>
    </div>
  );
}

function BackgroundElements() {
  return (
    <>
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="w-full h-full tech-pattern-dark"></div>
      </div>

      {/* Tech Network Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-violet-400 rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-25"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-violet-300 rounded-full animate-ping opacity-20"></div>
      </div>
    </>
  );
}

function TerminalAnimation() {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = heroContent.terminalLines;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % lines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto border border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <div className="font-mono text-sm text-green-400">
        {lines[currentLine]}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
}

function SkillsGrid({ isVisible }: { isVisible: any }) {
  return (
    <div
      id="skills-grid"
      data-animate
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {skills.slice(0, 12).map((skill, index) => (
        <div
          key={skill.name}
          className={`transition-all duration-700 ${
            isVisible['skills-grid']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
            <skill.icon className="w-6 h-6 text-blue-400 mb-2" />
            <span className="text-sm font-mono text-gray-300">
              {skill.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedProjects({ isVisible }: { isVisible: any }) {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="space-y-8">
      {featuredProjects.map((project, index) => (
        <div
          key={project.id}
          id={project.id}
          data-animate
          className={`transition-all duration-1000 ${
            isVisible[project.id]
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-8'
          }`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >
          <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-lg border border-blue-500/20">
                <project.icon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white font-mono">
                    {project.title}
                  </h3>
                  {project.status === 'in-progress' && (
                    <span className="px-2 py-1 bg-yellow-600 text-yellow-100 text-xs font-mono rounded">
                      IN PROGRESS
                    </span>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {project.problem}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm font-mono border border-blue-700/30"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg font-mono font-semibold hover:from-blue-700 hover:to-violet-700 transition-all duration-300"
              >
                View Project
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-mono font-semibold hover:border-gray-500 hover:text-white transition-all duration-300"
              >
                Source Code
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
