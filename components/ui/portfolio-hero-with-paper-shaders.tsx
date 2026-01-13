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

        {/* Topbar-like info */}
        <div className="mb-8 text-sm">
          Desktop Friendly // Last updated: Jan 1, 2026
        </div>

        {/* Occupations Section */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// OCCUPATIONS</div>
          <div className="text-sm leading-relaxed mb-4">
            <strong>Active</strong><br />
            Data Science @ UC San Diego (2024 - Present)<br />
            Undergraduate Researcher @ Harvard Medical School & MGH (2025 - Present)<br />
            <br />
            I most recently interned at Dartmouth Hitchcock Medical Center, and previously at other institutions, some of which I co-authored publications at. I've won hackathons hosted by Apart Research & BlueDot Impact, Milwaukee Bucks & Modine Manufacturing, and many more.
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// INTERESTS</div>
          <div className="text-sm leading-relaxed">
            SLMs/LLMs, multimodal models, AI agents, reasoning (e.g. chain-of-thought), AI alignment and ethics, efficient training/inference, and AI applications in science (e.g., drug discovery, protein folding).<br />
            Subject to evolve. Actively exploring.
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// PROJECTS</div>
          <div className="text-sm leading-relaxed">
            <strong>Active</strong><br />
            Reasoning CoT improvements for LLMs in clinical usage (Harvard & MGH thesis)<br />
            Labry (democratizing research opportunities, non-profit enroute)<br />
            <br />
            <strong>Past</strong> recency relevance (still updating...)<br />
            GeoCheater (chrome extension with AI's best guess for WorldGuessr maps)<br />
            3D Carbon Timeline ("The Astronomy of Climate Change"'s final project)<br />
            Signly (ASL conversationalist with live fingerspelling recognition)<br />
            IndustryBench (LLMs evaluations across industry verticals with DuckAI group)<br />
            Blume (talk with your departed relatives)<br />
            The Early Economic Impacts of Transformative AI (co-authored manuscript)<br />
            Milwaukee Bucks Fan Engagement Models (presented to franchise executives)<br />
            POS QR Automation (scanned discounts pipeline for startup, Kaboo)<br />
            Retrieval Augmented Generation for Pathology Reports (co-authored manuscript)<br />
            A Statistical Analysis of Crab Pulsar Giant Pulse Rates (co-authored paper)<br />
            Cover Edge-Based Triangle Counting (co-authored paper)<br />
            Steam Trading Scripts (TF2 & CS:GO trading automations that made $6K)<br />
            Tree-Plenish Data Pipeline (nonprofit's financial tracking automation)<br />
            IoT Weather System (hardware and software interface)<br />
            Node2Node (gamified pathfinding algorithms)
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// BIOGRAPHICAL_OVERVIEW</div>
          <div className="text-sm leading-relaxed">
            I'm Valmik (Val) Nahata.<br />
            <br />
            Jersey native, Californian resident, (Massachusetts employed), New Yorker at heart.<br />
            <br />
            I spent my childhood years solving WCA-regulated puzzles (2x2 through 7x7, mirror cubes, Pyraminx, etc.) and got decent at recognizing algorithmic patterns. Played violin for eleven years too, mostly Bach partitas and Paganini caprices.<br />
            <br />
            If you need me, I'm either: (a) speed-walking through empty streets at unholy hours, (b) turning caffeine into code, or (c) standing in a Chipotle line wondering if my addiction says more about my personality than my Myers-Briggs ever could.<br />
            <br />
            Interested in pattern-matching through expensive linear algebra, or AI.
          </div>
        </div>

        {/* Collaboration Section */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// COLLABORATION</div>
          <div className="text-sm leading-relaxed">
            I'm open to research collaborations and joint work. If you want to move quickly, send a short message with context, constraints, and what a good outcome looks like.
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-8">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">// CONTACT</div>
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
          shape="wave"
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
