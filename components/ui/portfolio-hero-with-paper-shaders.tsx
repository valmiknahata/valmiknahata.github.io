"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState } from "react"
import RotatingEarth from "./wireframe-dotted-globe"

function TooltipItem({ name, description, href, isDarkMode, className }: { name: string, description?: string, href?: string, isDarkMode: boolean, className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center group cursor-default w-fit ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {href ? (
        <a href={href} target="_blank" className="underline hover:opacity-70 transition-opacity">
          {name}
        </a>
      ) : (
        <span>{name}</span>
      )}

      {description && isHovered && (
        <div className={`absolute z-50 left-0 bottom-full mb-2 px-3 py-1.5 text-[12px] whitespace-nowrap border shadow-xl transition-all animate-in fade-in zoom-in slide-in-from-bottom-1 duration-200 pointer-events-none ${isDarkMode ? "bg-zinc-900 border-zinc-700 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"
          }`}>
          {description}
          <div className={`absolute left-4 top-full w-2 h-2 -translate-y-1 rotate-45 border-r border-b ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
            }`} />
        </div>
      )}
    </div>
  );
}

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col md:flex-row bg-[#f7f5f3] dark:bg-black transition-colors duration-300">
      <div
        className={`w-full md:w-1/2 p-4 md:p-12 font-mono relative z-10 h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-[#f7f5f3] text-[#141414]"}`}
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

        {/* Bio Section */}
        <div className="mb-12 text-[15px]">
          <div className="opacity-40 mb-4">// BIOGRAPHICAL</div>
          <p className="opacity-70 leading-relaxed max-w-md">
            Jersey native, Californian resident, New Yorker at heart. Childhood in WCA puzzles and violin (Paganini/Bach).
          </p>
        </div>

        {/* Occupations Section */}
        <div className="mb-12 text-[15px]">
          <div className="opacity-40 mb-4">// OCCUPATIONS</div>
          <div className="space-y-1">
            <div className="flex flex-col md:flex-row md:gap-4">
              <TooltipItem
                name="UNIVERSITY OF CALIFORNIA, SAN DIEGO"
                description="Halıcıoğlu Data Science Institute"
                isDarkMode={isDarkMode}
                className="md:w-32 opacity-50 shrink-0"
              />
              <span className="md:w-32 shrink-0">STUDENT</span>
              <span className="opacity-30">2024 → ....</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4">
              <TooltipItem
                name="HARVARD"
                description="Harvard Medical School & Massachusetts General Hospital"
                isDarkMode={isDarkMode}
                className="md:w-32 opacity-50 shrink-0"
              />
              <span className="md:w-32 shrink-0">RESEARCHER</span>
              <span className="opacity-30">2025 → ....</span>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4">
              <TooltipItem
                name="DARTMOUTH"
                description="Dartmouth Hitchcock Medical Center"
                isDarkMode={isDarkMode}
                className="md:w-32 opacity-50 shrink-0"
              />
              <span className="md:w-32 shrink-0">INTERN</span>
              <span className="opacity-30">2024 → 2024</span>
            </div>
          </div>
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
              <div className="opacity-30 mb-2">ACTIVE</div>
              <div className="space-y-2">
                <div>
                  <TooltipItem
                    name="LLMs Chain-of-Thought in Clinical Usage"
                    description="Harvard & MGH Thesis"
                    isDarkMode={isDarkMode}
                  />
                </div>
                <div>
                  <TooltipItem
                    name="Labry"
                    description="Democratizing Research"
                    href="https://www.linkedin.com/company/labry-research"
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="opacity-30 mb-2">PAST</div>
              <div className="space-y-2 opacity-70">
                <div><TooltipItem name="GeoCheater" description="AI Guessing for WorldGuessr" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="3D Carbon Timeline" description="Astronomy of Climate Change Final Project" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Signly" description="ASL Finger-spelling Recognition" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="IndustryBench" description="Industry Vertical AI Evaluations with Georgia Tech's DuckAI group" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Blume" description="Conversational AI for Departed Relatives" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Economic Impacts of Transformative AI" href="https://apartresearch.com/project/the-early-economic-impacts-of-transformative-ai-a-focus-on-temporal-coherence-ipql" description="1st at Apart Research & BlueDot Impact's Economics of Transformative AI Sprint" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Milwaukee Bucks Engagement Models" href="https://www.nba.com/bucks/hackathon#:~:text=3rd%20Place%3A%20UC%20San%20Diego" description="3rd at Milwaukee Bucks & Modine Manufacturing's Business Analytics Hackathon" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="POS QR Automation" description="Built for startup, Kaboo" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Retrieval Augmented Generation for Pathology Reports" description="Co-authored Conference Poster & Manuscript" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="A Statistical Analysis of Crab Pulsar Giant Pulse Rates" href="https://iopscience.iop.org/article/10.3847/1538-4357/ad6304" description="Co-authored ApJ Publication" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Cover Edge-Based Triangle Counting" href="https://www.mdpi.com/1999-4893/18/11/685" description="Co-authored MDPI Publication" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Steam Trading Automations" description="$6K Profit from TF2 & CS:GO Assets" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Tree-Plenish Data Pipeline" description="Financial Automation" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="IoT Weather System" description="1st at TCNJ's Hack-Io-Thon" isDarkMode={isDarkMode} /></div>
                <div><TooltipItem name="Node2Node" description="Gamified Pathfinding Algorithms" isDarkMode={isDarkMode} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Location Section */}
        <div className="mb-12 text-[15px]">
          <div className="opacity-40 mb-4">// CURRENT LOCATION</div>
          <div className="max-w-sm">
            <RotatingEarth width={400} height={400} className="opacity-80" isDarkMode={isDarkMode} />
          </div>
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
            <a href="https://www.linkedin.com/in/valmiknahata" target="_blank" className="underline hover:opacity-70 transition-opacity">LINKEDIN</a>
            <a href="mailto:vnahata@ucsd.edu" className="underline hover:opacity-70 transition-opacity">EMAIL</a>
            <a href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" target="_blank" className="underline hover:opacity-70 transition-opacity">GOOGLE SCHOLAR</a>
          </div>
        </div>

        <div className="h-24"></div>
      </div>

      <div className="hidden md:block md:w-1/2 relative bg-white dark:bg-[#0a0a0a] border-l border-black/5 dark:border-white/5">
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
