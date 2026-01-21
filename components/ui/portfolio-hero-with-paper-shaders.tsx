"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState, useEffect, useRef } from "react"
import RotatingEarth from "./wireframe-dotted-globe"
import { Sparkles } from "lucide-react"

function TooltipItem({ name, description, href, isDarkMode, className }: { name: string, description?: string, href?: string, isDarkMode: boolean, className?: string }) {
  const [showPreview, setShowPreview] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [startedLoading, setStartedLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center group cursor-default w-fit ${className}`}
      onMouseMove={handleMouseMove}
    >
      {(() => {
        const [left, ...right] = name.split("|");
        const leftPart = left?.trim();
        const rightPart = right.length > 0 ? right.join("|").trim() : null;
        if (href && rightPart) {
          return (
            <span>
              <span className="font-bold">{leftPart}</span>
              {" | "}
              <a 
                href={href} 
                target="_blank" 
                className="underline hover:opacity-70 transition-opacity decoration-1 underline-offset-2"
                onMouseEnter={() => {
                  setShowPreview(true);
                  setStartedLoading(true);
                }}
                onMouseLeave={() => {
                  setShowPreview(false);
                  setImageLoaded(false);
                  setStartedLoading(false);
                }}
              >
                {rightPart}
              </a>
            </span>
          );
        } else {
          return (
            <span><span className="font-bold">{leftPart}</span>{rightPart ? ` | ${rightPart}` : ""}</span>
          );
        }
      })()}

      {href && showPreview && (
        <div 
          className={`fixed z-[60] border shadow-2xl transition-opacity pointer-events-none overflow-hidden rounded-lg ${imageLoaded ? 'opacity-100 duration-200' : 'opacity-0'} ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`}
          style={{ 
            width: '280px', 
            height: '157px',
            left: `${mousePos.x + (containerRef.current?.getBoundingClientRect().left || 0) - 140}px`,
            top: `${mousePos.y + (containerRef.current?.getBoundingClientRect().top || 0) - 177}px`,
          }}
        >
          {startedLoading && !imageLoaded && (
            <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
          <img 
            src={`https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720`}
            alt="Link preview"
            className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className={`absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 -translate-y-1 rotate-45 border-r border-b ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
            }`} />
        </div>
      )}
    </div>
  );
}

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>("")

  // Preload all link preview images
  useEffect(() => {
    const allUrls = [
      "https://indico.cern.ch/event/1624615/",
      "https://apartresearch.com/sprints/economics-of-transformative-ai-research-sprint-2025-04-25-to-2025-04-27",
      "https://www.nba.com/bucks/hackathon",
      "https://iopscience.iop.org/article/10.3847/1538-4357/ad6304",
      "https://www.mdpi.com/1999-4893/18/11/685",
      "https://www.linkedin.com/company/labry-research",
    ];

    allUrls.forEach(url => {
      const img = new Image();
      img.src = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720`;
    });
  }, []);

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

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col bg-[#f7f5f3] dark:bg-black transition-colors duration-300 font-serif text-[18px]">
      <div
        className={`w-full p-6 md:p-16 relative z-10 min-h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-[#f7f5f3] text-[#141414]"}`}
      >
        <div className="max-w-3xl mx-auto">
          {/* Unified Top Header Line */}
          <div className="flex flex-row justify-between items-center mb-12 text-[13px] min-[400px]:text-[15px] font-medium leading-none w-full relative">
            {/* Left: Name */}
            <div className={`${isDarkMode ? "text-white" : "text-black"} uppercase tracking-[0.1em] min-[400px]:tracking-widest z-10`}>Valmik Nahata</div>

            {/* Center: PST Time */}
            <div className="absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
              <div className={`${isDarkMode ? "text-white" : "text-black"} uppercase tracking-[0.1em] min-[400px]:tracking-widest whitespace-nowrap`}>PST {currentTime}</div>
            </div>

            {/* Right: Theme Toggle */}
            <div
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-1 min-[400px]:gap-2 group cursor-pointer z-10"
            >
              <span className={`${isDarkMode ? "text-white" : "text-black"} uppercase tracking-[0.1em] min-[400px]:tracking-widest`}>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
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

          {/* Header Section */}
          <div className="mb-6">

            {/* Unified Top Header Line */}


            <div className="flex flex-col items-center relative">
              <RotatingEarth width={380} height={380} className="opacity-80" isDarkMode={isDarkMode} />
              <div className={`flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-md z-20 -mt-5 ${isDarkMode
                ? "bg-neutral-900 text-neutral-400 border border-neutral-800"
                : "bg-white text-neutral-600 border border-neutral-200 shadow-sm"
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDarkMode ? "bg-[hsl(320,100%,70%)]" : "bg-[hsl(220,100%,70%)]"}`} />
                Live Location
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-14 leading-7 opacity-85 text-justify">
            <p className="mt-[1.5cm]">
              I'm <strong>Valmik Nahata</strong>, an undergraduate at <strong>UC San Diego</strong>. Since last year, I've been working on building <strong>AI systems</strong> that are both powerful and aligned, particularly around <strong>scaling</strong>, <strong>robustness</strong> (adversarial training, safety checks, etc.), and <strong>ethical considerations</strong> (bias mitigation, transparency, etc.), with the goal of <strong>accelerating scientific discovery</strong>. Most of my research involves <strong>large language models</strong>, <strong>multimodal AI</strong>, and <strong>autonomous agents</strong>, particularly around <strong>reasoning</strong> (chain-of-thought, tree search, etc.), <strong>alignment</strong> (RLHF, debate, etc.), and making <strong>inference more efficient</strong> (quantization, etc.).
              <br /><br />
              I grew up in Jersey and now live in California, but I'll always be a New Yorker at heart. When I'm not working on AI, you'll find me speedsolving Rubik's cubes (everything from 2x2 through 7x7, plus pyraminx, megaminx, and mirror cubes). I also spent years playing violin, working through Paganini's Caprices and Bach's Partitas, though my favorite piece will always be Mendelssohn's Violin Concerto in E Minor. And for whatever reason, I've developed a thing for collecting old coins, anything from the 1800s onward really.
            </p>
          </div>


          {/* Education Section */}
          <div className="mb-6">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[15px] font-medium">Education</div>
            <div className="space-y-2 opacity-80">
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Undergraduate Student | University of California, San Diego"
                  description="Halıcıoğlu Data Science Institute"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="opacity-50 tabular-nums">2024—Present</span>
                </div>
              </div>
            </div>
          </div>

          {/* Occupations Section */}
          <div className="mb-6">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[15px] font-medium">Occupations</div>
            <div className="space-y-2 opacity-80">
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Undergraduate Researcher | Harvard Medical School & Massachusetts General Hospital"
                  description="Harvard Medical School & Massachusetts General Hospital"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="opacity-50 tabular-nums">2025—Present</span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Research Intern | Dartmouth Hitchcock Medical Center"
                  description="Dartmouth Hitchcock Medical Center"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="opacity-50 tabular-nums">2024—2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accolades Section */}
          <div className="mb-6">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[15px] font-medium">Accolades</div>
            <div className="space-y-1.5 opacity-80">
              {[
                { name: "1st Place | National Science Foundation HDR & UC San Diego SMASH Hackathon", desc: "NSF HDR & UCSD SMASH", href: "https://indico.cern.ch/event/1624615/", date: "2026" },
                { name: "1st Place | Apart Research & BlueDot Impact Economics of Transformative AI Sprint", desc: "Apart Research & BlueDot Impact", href: "https://apartresearch.com/sprints/economics-of-transformative-ai-research-sprint-2025-04-25-to-2025-04-27", date: "2025" },
                { name: "3rd Place | Milwaukee Bucks & Modine Manufacturing Hackathon", desc: "Milwaukee Bucks & Modine Manufacturing", href: "https://www.nba.com/bucks/hackathon", date: "2025" },
                { name: "Various | The College of New Jersey, Kean University, and more", desc: "Additional Academic Achievements", date: "2024" },
              ].map((accolade) => (
                <div key={accolade.name} className="flex flex-row justify-between items-baseline gap-4">
                  <TooltipItem
                    name={accolade.name}
                    description={accolade.desc}
                    href={accolade.href || undefined}
                    isDarkMode={isDarkMode}
                    className="font-medium shrink"
                  />
                  <span className="opacity-50 tabular-nums shrink-0 text-right">{accolade.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Research Section */}
          <div className="mb-6">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[15px] font-medium">Research (publications, manuscripts, & posters)</div>
            <div className="space-y-1.5 opacity-80">
              {[
                { name: "Upcoming | Chain-of-Thought Reasoning in Large Language Models for Clinical Applications", desc: "Harvard Medical School & MGH Thesis", date: "2025—Present" },
                { name: "Manuscript | The Early Economic Impacts of Transformative AI: A Focus on Temporal Coherence", desc: "Co-authored Publication", href: "https://apartresearch.com/project/the-early-economic-impacts-of-transformative-ai-a-focus-on-temporal-coherence-ipql", date: "2025" },
                { name: "Manuscript & Poster | Retrieval Augmented Generation for Pathology Reports", desc: "Co-authored Conference Poster & Manuscript", date: "2024" },
                { name: "Publication | A Statistical Analysis of Crab Pulsar Giant Pulse Rates", desc: "Co-authored ApJ Publication", href: "https://iopscience.iop.org/article/10.3847/1538-4357/ad6304", date: "2024" },
                { name: "Publication | Cover Edge-Based Triangle Counting", desc: "Co-authored MDPI Publication", href: "https://www.mdpi.com/1999-4893/18/11/685", date: "2024" },
              ].map((publication) => (
                <div key={publication.name} className="flex flex-row justify-between items-baseline gap-4">
                  <TooltipItem
                    name={publication.name}
                    description={publication.desc}
                    href={publication.href}
                    isDarkMode={isDarkMode}
                    className="font-medium shrink"
                  />
                  <span className="opacity-50 tabular-nums shrink-0 text-right">{publication.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-6">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[15px] font-medium">Projects (Independent & collaborative)</div>
            <div className="space-y-1.5 opacity-80">
              {[
                { name: "Democratizing Research | Labry", desc: "", href: "https://www.linkedin.com/company/109509095", date: "2025—Present" },
                { name: "WorldGuessr Cheats | GeoCheater", desc: "", date: "2026" },
                { name: "3D Carbon Simulation | CarbonTime", desc: "", date: "2025" },
                { name: "American Sign Language Conversationalist | Signly", desc: "", date: "2025" },
                { name: "Industry Language Model Benchmarking | Georgia Tech's DuckAI", desc: "", date: "2025" },
                { name: "Departed Relatives Conversationalist | Blume", desc: "", date: "2025" },
                { name: "Point of Sale QR Automation | Kaboo", desc: "", date: "2024" },
                { name: "Trading Automations | Steam's TF2 & CS:GO", desc: "", date: "2023" },
                { name: "Financial Data Pipeline | Tree-Plenish", desc: "", date: "2023" },
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
          <div className="mb-14">
            <div className="opacity-40 mb-3 uppercase tracking-widest text-[15px] font-medium">Contact</div>
            <div className="flex gap-4 opacity-60">
              <a href="https://www.linkedin.com/in/valmiknahata" target="_blank" className="hover:opacity-100 transition-opacity">LinkedIn</a>
              <a href="mailto:vnahata@ucsd.edu" className="hover:opacity-100 transition-opacity">Email</a>
              <a href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" target="_blank" className="hover:opacity-100 transition-opacity">Google Scholar</a>
            </div>
          </div>

          {/* ...existing code... */}
          <div className="h-12"></div>
        </div>
      </div>
    </div>
  )
}
