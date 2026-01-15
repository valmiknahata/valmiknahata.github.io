"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState, useEffect, useRef } from "react"
import RotatingEarth from "./wireframe-dotted-globe"
import { PromptInputBox } from "./valgpt-input"
import { streamMessageToGemini } from "@/lib/gemini"

function TooltipItem({ name, description, href, isDarkMode, className }: { name: string, description?: string, href?: string, isDarkMode: boolean, className?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center group cursor-default w-fit ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {href ? (
        <a href={href} target="_blank" className="underline hover:opacity-70 transition-opacity decoration-1 underline-offset-2">
          {name}
        </a>
      ) : (
        <span>{name}</span>
      )}

      {description && isHovered && (
        <div className={`absolute z-50 left-0 bottom-full mb-2 px-3 py-1.5 text-[14px] whitespace-nowrap border shadow-xl transition-all animate-in fade-in zoom-in slide-in-from-bottom-1 duration-200 pointer-events-none font-serif tracking-wide ${isDarkMode ? "bg-zinc-900 border-zinc-700 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"
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
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [currentResponse, setCurrentResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const pdtString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(pdtString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = async (message: string, files?: File[]) => {
    try {
      setIsLoading(true)
      setCurrentQuestion(message)
      setCurrentResponse("")

      // Portfolio context for the AI
      const portfolioContext = `You are Valmik Nahata. Answer questions as if you are Valmik Nahata. Answer concisely and to the point.

ABOUT VALMIK:
Valmik Nahata is an undergraduate at UC San Diego. Since last year, he's been working on building AI systems that are both powerful and aligned, particularly around scaling, robustness (adversarial training, safety checks, etc.), and ethical considerations (bias mitigation, transparency, etc.), with the goal of accelerating scientific discovery. Most of his research involves large language models, multimodal AI, and autonomous agents, particularly around reasoning (chain-of-thought, tree search, etc.), alignment (RLHF, debate, etc.), and making inference more efficient (quantization, etc.).

He grew up in Jersey and now lives in California, but he'll always be a New Yorker at heart. When he's not working on AI, you'll find him speedsolving Rubik's cubes (everything from 2x2 through 7x7, plus pyraminx, megaminx, and mirror cubes). He also spent years playing violin, working through Paganini's Caprices and Bach's Partitas, though his favorite piece will always be Mendelssohn's Violin Concerto in E Minor. And for whatever reason, he's developed a thing for collecting old coins, anything from the 1800s onward really.

OCCUPATIONS:
- University of California, San Diego (Halıcıoğlu Data Science Institute) - Undergraduate, 2024—Present
- Harvard Medical School & Massachusetts General Hospital - Research Assistant, 2025—Present
- Dartmouth Hitchcock Medical Center - Research Intern, 2024—2025

ACTIVE PROJECTS:
- LLMs Chain-of-Thought in Clinical Usage (Harvard & MGH Thesis), 2025—Present
- Labry (Democratizing Research), 2025—Present

SELECTED PAST WORKS:
- GeoCheater (AI Guessing for WorldGuessr), 2026
- 3D Carbon Timeline (Astronomy of Climate Change Final Project), 2025
- Signly (ASL Finger-spelling Recognition), 2025
- IndustryBench (Industry Vertical AI Evaluations with Georgia Tech's DuckAI group), 2025
- Blume (Conversational AI for Departed Relatives), 2025
- The Early Economic Impacts of Transformative AI: A Focus on Temporal Coherence (1st at Apart Research & BlueDot Impact's Economics of Transformative AI Sprint), 2025
- Milwaukee Bucks Engagement Models (3rd at Milwaukee Bucks & Modine Manufacturing's Business Analytics Hackathon), 2025
- POS QR Automation (Built for startup, Kaboo), 2024
- Retrieval Augmented Generation for Pathology Reports (Co-authored Conference Poster & Manuscript), 2024
- A Statistical Analysis of Crab Pulsar Giant Pulse Rates (Co-authored ApJ Publication), 2024
- Cover Edge-Based Triangle Counting (Co-authored MDPI Publication), 2024
- Steam Trading Automations ($6K Profit from TF2 & CS:GO Assets), 2023
- Tree-Plenish Data Pipeline (Financial Automation), 2023
- IoT Weather System (1st at TCNJ's Hack-Io-Thon), 2023
- Node2Node (Gamified Pathfinding Algorithms), 2022

CONTACT:
- LinkedIn: https://www.linkedin.com/in/valmiknahata
- Email: vnahata@ucsd.edu
- Google Scholar: https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en

Answer questions naturally and conversationally based on this information. If asked about something not covered here, you can provide general helpful responses but clarify when you're going beyond Valmik's specific background.`;

      const fullPrompt = `${portfolioContext}\n\nUser question: ${message}`;

      // Stream response from Gemini with context
      await streamMessageToGemini(
        fullPrompt,
        [], // Empty history for single Q&A
        (chunk) => {
          setCurrentResponse((prev) => prev + chunk)
        }
      )
    } catch (error) {
      console.error("Error sending message:", error)
      setCurrentResponse("Sorry, I encountered an error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col md:flex-row bg-[#f7f5f3] dark:bg-black transition-colors duration-300 font-serif text-[14px]">
      <div
        className={`w-full md:w-1/2 p-6 md:p-16 relative z-10 h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-[#f7f5f3] text-[#141414]"}`}
      >
        {/* Unified Top Header Line - Full Width */}
        <div className="flex flex-row justify-between items-center mb-12 text-[11px] font-medium leading-none w-full">
          {/* Left: Name */}
          <div className="opacity-40 uppercase tracking-widest hidden min-[400px]:block">Valmik Nahata</div>

          {/* Center: PST Time */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="opacity-40 uppercase tracking-widest pointer-events-none whitespace-nowrap">
              PST {currentTime}
            </div>
          </div>

          {/* Right: Theme Toggle */}
          <div
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex opacity-40 hover:opacity-100 transition-opacity items-center gap-2 cursor-pointer group uppercase tracking-widest shrink-0"
          >
            <span className="hidden min-[400px]:block">
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>
            <button
              className="group-active:scale-95 transition-transform flex items-center justify-center -mt-[1px]"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">

            {/* Unified Top Header Line */}


            <div className="flex flex-col items-center relative">
              <RotatingEarth width={380} height={380} className="opacity-80" isDarkMode={isDarkMode} />
              <div className={`flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-md z-20 -mt-5 ${isDarkMode
                ? "bg-neutral-900 text-neutral-400 border border-neutral-800"
                : "bg-white text-neutral-600 border border-neutral-200 shadow-sm"
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDarkMode ? "bg-[hsl(320,100%,70%)]" : "bg-[hsl(220,100%,70%)]"}`} />
                Live Location
              </div>
            </div>
          </div>

          {/* ValGPT Section */}
          <div className="mb-12">
            <div className="mt-4">
              <PromptInputBox
                isDarkMode={isDarkMode}
                placeholder="Ask ValGPT (Beta) anything..."
                onSend={handleSendMessage}
                isLoading={isLoading}
              />
            </div>

            {/* Current Question & Answer Display */}
            {currentQuestion && (
              <div className="mt-6 space-y-3">
                <div className="opacity-40 uppercase tracking-widest text-[11px] font-medium text-center">
                  {currentQuestion}
                </div>
                {currentResponse && (
                  <div className="leading-7 opacity-80 text-center">
                    {currentResponse}
                    {isLoading && <span className="inline-block w-1 h-3.5 bg-current animate-pulse ml-0.5 align-middle" />}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bio Section */}
          <div className="mb-14 leading-7 opacity-85 text-justify">
            <p>
              I'm Valmik Nahata, an undergraduate at UC San Diego. Since last year, I've been working on building AI systems that are both powerful and aligned, particularly around scaling, robustness (adversarial training, safety checks, etc.), and ethical considerations (bias mitigation, transparency, etc.), with the goal of accelerating scientific discovery. Most of my research involves large language models, multimodal AI, and autonomous agents, particularly around reasoning (chain-of-thought, tree search, etc.), alignment (RLHF, debate, etc.), and making inference more efficient (quantization, etc.).
              <br /><br />
              I grew up in Jersey and now live in California, but I'll always be a New Yorker at heart. When I'm not working on AI, you'll find me speedsolving Rubik's cubes (everything from 2x2 through 7x7, plus pyraminx, megaminx, and mirror cubes). I also spent years playing violin, working through Paganini's Caprices and Bach's Partitas, though my favorite piece will always be Mendelssohn's Violin Concerto in E Minor. And for whatever reason, I've developed a thing for collecting old coins, anything from the 1800s onward really.
            </p>
          </div>

          {/* Occupations Section */}
          <div className="mb-12">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[11px] font-medium">Occupations</div>
            <div className="space-y-2 opacity-80">
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="University of California, San Diego"
                  description="Halıcıoğlu Data Science Institute"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="hidden sm:inline opacity-70">Undergraduate</span>
                  <span className="opacity-50 tabular-nums">2024—Present</span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Harvard Medical School & Massachusetts General Hospital"
                  description="Harvard Medical School & Massachusetts General Hospital"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="hidden sm:inline opacity-70">Research Assistant</span>
                  <span className="opacity-50 tabular-nums">2025—Present</span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Dartmouth Hitchcock Medical Center"
                  description="Dartmouth Hitchcock Medical Center"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="hidden sm:inline opacity-70">Research Intern</span>
                  <span className="opacity-50 tabular-nums">2024—2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-12">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[11px] font-medium">Projects</div>
            <div className="space-y-1.5 opacity-80">
              {[
                { name: "LLMs Chain-of-Thought in Clinical Usage", desc: "Harvard & MGH Thesis", date: "2025—Present" },
                { name: "Labry", desc: "Democratizing Research", href: "https://www.linkedin.com/company/labry-research", date: "2025—Present" },
                { name: "GeoCheater", desc: "AI Guessing for WorldGuessr", date: "2026" },
                { name: "3D Carbon Timeline", desc: "Astronomy of Climate Change Final Project", date: "2025" },
                { name: "Signly", desc: "ASL Finger-spelling Recognition", date: "2025" },
                { name: "IndustryBench", desc: "Industry Vertical AI Evaluations with Georgia Tech's DuckAI group", date: "2025" },
                { name: "Blume", desc: "Conversational AI for Departed Relatives", date: "2025" },
                { name: "The Early Economic Impacts of Transformative AI: A Focus on Temporal Coherence", desc: "1st at Apart Research & BlueDot Impact's Economics of Transformative AI Sprint", href: "https://apartresearch.com/project/the-early-economic-impacts-of-transformative-ai-a-focus-on-temporal-coherence-ipql", date: "2025" },
                { name: "Milwaukee Bucks Engagement Models", desc: "3rd at Milwaukee Bucks & Modine Manufacturing's Business Analytics Hackathon", href: "https://www.nba.com/bucks/hackathon#:~:text=3rd%20Place%3A%20UC%20San%20Diego", date: "2025" },
                { name: "POS QR Automation", desc: "Built for startup, Kaboo", date: "2024" },
                { name: "Retrieval Augmented Generation for Pathology Reports", desc: "Co-authored Conference Poster & Manuscript", date: "2024" },
                { name: "A Statistical Analysis of Crab Pulsar Giant Pulse Rates", desc: "Co-authored ApJ Publication", href: "https://iopscience.iop.org/article/10.3847/1538-4357/ad6304", date: "2024" },
                { name: "Cover Edge-Based Triangle Counting", desc: "Co-authored MDPI Publication", href: "https://www.mdpi.com/1999-4893/18/11/685", date: "2024" },
                { name: "Steam Trading Automations", desc: "$6K Profit from TF2 & CS:GO Assets", date: "2023" },
                { name: "Tree-Plenish Data Pipeline", desc: "Financial Automation", date: "2023" },
                { name: "IoT Weather System", desc: "1st at TCNJ's Hack-Io-Thon", date: "2023" },
                { name: "Node2Node", desc: "Gamified Pathfinding Algorithms", date: "2022" },
              ].map((project) => (
                <div key={project.name} className="flex flex-row justify-between items-baseline gap-4">
                  <TooltipItem
                    name={project.name}
                    description={project.desc}
                    href={project.href}
                    isDarkMode={isDarkMode}
                    className="font-medium shrink"
                  />
                  <span className="opacity-50 tabular-nums shrink-0 text-right">{project.date}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Contact Section */}
          <div className="mb-12">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[11px] font-medium">Contact</div>
            <div className="flex gap-4 opacity-60">
              <a href="https://www.linkedin.com/in/valmiknahata" target="_blank" className="hover:opacity-100 transition-opacity">LinkedIn</a>
              <a href="mailto:vnahata@ucsd.edu" className="hover:opacity-100 transition-opacity">Email</a>
              <a href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" target="_blank" className="hover:opacity-100 transition-opacity">Google Scholar</a>
            </div>
          </div>

          <div className="h-12"></div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 relative bg-white dark:bg-[#0a0a0a]">
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
