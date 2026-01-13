"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState } from "react"

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-row bg-[#f7f5f3] dark:bg-black transition-colors duration-300">
      <div
        className={`w-1/2 p-4 md:p-12 font-mono relative z-10 h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-[#f7f5f3] text-[#141414]"}`}
      >
        {/* Theme toggle button */}
        <div className="absolute top-4 right-4 md:top-12 md:right-12 z-50">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1 rounded-full transition-colors ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Header */}
        <div className="mb-16 text-[15px] space-y-8">
          <div>VALNAHATA.ME</div>
          <div>
            <div>VALMIK NAHATA</div>
            <div className="opacity-50 uppercase">Data Scientist & AI Researcher</div>
          </div>
        </div>

        {/* Occupations Section */}
        <div className="mb-12 text-[15px]">
          <div className="opacity-40 mb-4">// OCCUPATIONS</div>
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row md:gap-4">
              <span className="md:w-32 opacity-50 shrink-0">UC SAN DIEGO</span>
              <span className="md:w-32 shrink-0">STUDENT</span>
              <span className="opacity-30">2024 → ....</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4">
              <span className="md:w-32 opacity-50 shrink-0">HARVARD & MGH</span>
              <span className="md:w-32 shrink-0">RESEARCHER</span>
              <span className="opacity-30">2025 → ....</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4">
              <span className="md:w-32 opacity-50 shrink-0">DARTMOUTH</span>
              <span className="md:w-32 shrink-0">INTERN</span>
              <span className="opacity-30">2024 → 2024</span>
            </div>
          </div>
          <p className="mt-4 opacity-50 leading-relaxed max-w-md">
            Previously winner of hackathons by Apart Research, BlueDot, Milwaukee Bucks, Modine, etc.
          </p>
        </div>

        {/* Interests Section */}
        <div className="mb-12 text-[15px]">
          <div className="opacity-40 mb-4">// INTERESTS</div>
          <div className="opacity-70 leading-relaxed max-w-md italic">
            SLMs/LLMs, multimodal models, AI agents, reasoning (CoT), alignment/ethics, efficient inference, and AI for science.
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-12 text-[15px]">
          <div className="opacity-40 mb-4">// PROJECTS</div>
          <div className="space-y-6">
            <div>
              <div className="opacity-30 text-[13px] mb-2">ACTIVE</div>
              <div className="space-y-2">
                <div>Reasoning CoT for Clinical Usage (Harvard & MGH)</div>
                <div><a href="https://www.linkedin.com/company/labry-research" target="_blank" className="hover:underline">Labry (Democratizing Research)</a></div>
              </div>
            </div>
            <div>
              <div className="opacity-30 text-[13px] mb-2">PAST</div>
              <div className="space-y-2 opacity-70">
                <div>GeoCheater (AI Guessing for WorldGuessr)</div>
                <div>3D Carbon Timeline (Astronomy Project)</div>
                <div>Signly (ASL Finger-spelling Recognition)</div>
                <div>IndustryBench (DuckAI Evaluation Suite)</div>
                <div>Blume (Conversational AI)</div>
                <div><a href="https://apartresearch.com/project/the-early-economic-impacts-of-transformative-ai-a-focus-on-temporal-coherence-ipql" target="_blank" className="hover:underline">Economic Impacts of Transformative AI</a></div>
                <div><a href="https://www.nba.com/bucks/hackathon#:~:text=3rd%20Place%3A%20UC%20San%20Diego" target="_blank" className="hover:underline">Milwaukee Bucks Engagement Models</a></div>
                <div>POS QR Automation (Kaboo)</div>
                <div>Pathology Reports RAG (Co-authored MS)</div>
                <div><a href="https://iopscience.iop.org/article/10.3847/1538-4357/ad6304" target="_blank" className="hover:underline">Crab Pulsar Statistical Analysis</a></div>
                <div><a href="https://www.mdpi.com/1999-4893/18/11/685" target="_blank" className="hover:underline">Edge-Based Triangle Counting</a></div>
                <div>Steam Trading Automations ($6K Profit)</div>
                <div>Tree-Plenish Data Pipeline</div>
                <div>IoT Weather System</div>
                <div>Node2Node (Pathfinding Gamification)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-12 text-[15px]">
          <div className="opacity-40 mb-4">// BIOGRAPHICAL</div>
          <p className="opacity-70 leading-relaxed max-w-md">
            Jersey native, Californian resident, New Yorker at heart. Childhood in WCA puzzles and violin (Paganini/Bach). Interested in pattern-matching and linear algebra.
          </p>
        </div>

        {/* Collaboration Section */}
        <div className="mb-12 text-[15px]">
          <div className="opacity-40 mb-4">// COLLABORATION</div>
          <p className="opacity-70 leading-relaxed max-w-md">
            Open to research collaborations. Send a message with context, constraints, and target outcomes.
          </p>
        </div>

        {/* Links Section */}
        <div className="mb-12 text-[15px]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="https://www.linkedin.com/in/valmiknahata" target="_blank" className="hover:underline">LINKEDIN</a>
            <a href="mailto:vnahata@ucsd.edu" className="hover:underline">EMAIL</a>
            <a href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" target="_blank" className="hover:underline">GOOGLE SCHOLAR</a>
          </div>
        </div>

        <div className="h-24"></div>
      </div>

      <div className="w-1/2 relative bg-white dark:bg-[#0a0a0a] border-l border-black/5 dark:border-white/5">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 95%)"}
          colorFront={isDarkMode ? "hsl(320, 100%, 70%)" : "hsl(220, 100%, 70%)"}
          shape={"cat" as any}
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
