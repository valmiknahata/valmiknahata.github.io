"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState } from "react"

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col md:flex-row">
      <div
        className={`w-full md:w-1/2 p-8 font-mono relative z-10 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      >
        {/* Theme toggle button in top right of left panel */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-8 right-8 p-2 rounded-full border transition-colors ${
            isDarkMode ? "border-white/20 hover:bg-white/10" : "border-black/20 hover:bg-black/10"
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            // Sun icon for light mode
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            // Moon icon for dark mode
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-lg font-normal mb-8">VALMIK NAHATA</h1>
          <div className="mb-8">
            <h2 className="text-lg font-normal">VALMIK NAHATA</h2>
            <h3 className="text-lg font-normal">DATA SCIENTIST & AI RESEARCHER</h3>
          </div>
        </div>

        {/* Occupations Section */}
        <div className="mb-12 space-y-1">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// OCCUPATIONS</div>
          <div className="flex">
            <span className="w-20">UC San Diego</span>
            <span className="mx-2">Data Science</span>
            <span className="mx-4">2024 → ....</span>
          </div>
          <div className="flex">
            <span className="w-20">Harvard & MGH</span>
            <span className="mx-2">Undergraduate Researcher</span>
            <span className="mx-4">2025 → ....</span>
          </div>
          <div className="flex">
            <span className="w-20">Dartmouth Hitchcock</span>
            <span className="mx-2">Intern</span>
            <span className="mx-4">Recent</span>
          </div>
          <div className="flex">
            <span className="w-20">Various</span>
            <span className="mx-2">Hackathon Winner</span>
            <span className="mx-4">Ongoing</span>
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-12">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// INTERESTS</div>
          <div className="text-sm leading-relaxed">
            SLMs/LLMs, multimodal models, AI agents, reasoning (e.g. chain-of-thought), AI alignment and ethics, efficient training/inference, AI applications in science (e.g., drug discovery, protein folding).
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// PROJECTS</div>
          <div className="text-sm leading-relaxed space-y-1">
            <strong>Active:</strong> Reasoning CoT improvements for LLMs in clinical usage (Harvard & MGH thesis), Labry (democratizing research opportunities).<br />
            <strong>Past:</strong> GeoCheater, 3D Carbon Timeline, Signly, IndustryBench, Blume, Economic Impacts of AI, Bucks Fan Models, POS QR Automation, Pathology Reports RAG, Crab Pulsar Analysis, Triangle Counting, Steam Scripts, Tree-Plenish, IoT Weather, Node2Node.
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-12">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// BIO</div>
          <div className="text-sm leading-relaxed">
            Jersey native, Californian resident, (Massachusetts employed), New Yorker at heart. Childhood in puzzles and violin. Interested in AI and pattern-matching.
          </div>
        </div>

        {/* Collaboration Section */}
        <div className="mb-12">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// COLLABORATION</div>
          <div className="text-sm leading-relaxed">
            Open to research collaborations. Send short message with context, constraints, outcome.
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="absolute bottom-8 left-8">
          <div className="flex space-x-4 text-lg font-mono">
            <a href="https://www.linkedin.com/in/valmiknahata" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            <a href="mailto:vnahata@ucsd.edu" className="hover:underline">Email</a>
            <a href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="hover:underline">Scholar</a>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative min-h-screen">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
          colorFront={isDarkMode ? "hsl(320, 100%, 70%)" : "hsl(220, 100%, 70%)"}
          shape="dots"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        />
      </div>
    </div>
  )
}
