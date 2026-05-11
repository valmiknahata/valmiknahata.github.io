"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
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
              <span>{leftPart}</span>
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
            <span><span>{leftPart}</span>{rightPart ? ` | ${rightPart}` : ""}</span>
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
            src={`https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720&waitFor=2000&waitUntil=networkidle2`}
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

function LinkWithPreview({ href, children, isDarkMode, className }: { href: string, children: React.ReactNode, isDarkMode: boolean, className?: string }) {
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

  const previewUrl = href.startsWith('http') ? href : `https://valmiknahata.github.io${href}`;

  return (
    <div
      ref={containerRef}
      className={`relative inline group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Link
        href={href}
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
        {children}
      </Link>

      {showPreview && (
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
            src={`https://api.microlink.io/?url=${encodeURIComponent(previewUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720&waitFor=2000&waitUntil=networkidle2`}
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
  const isDarkMode = false;


  // Preload all link preview images
  useEffect(() => {
    const allUrls = [
      "https://indico.cern.ch/event/1624615/",
      "https://apartresearch.com/sprints/economics-of-transformative-ai-research-sprint-2025-04-25-to-2025-04-27",
      "https://www.nba.com/bucks/hackathon",
      "https://iopscience.iop.org/article/10.3847/1538-4357/ad6304",
      "https://www.mdpi.com/1999-4893/18/11/685",
      "https://www.linkedin.com/company/labry-research",
      "https://valmiknahata.github.io/books",
      "https://valmiknahata.github.io/papers",
    ];

    allUrls.forEach(url => {
      const img = new Image();
      img.src = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720&waitFor=2000&waitUntil=networkidle2`;
    });
  }, []);



  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col bg-white dark:bg-black transition-colors duration-300 font-serif text-[16px]">
      <div
        className={`w-full p-6 md:p-16 relative z-10 min-h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-white text-[#141414]"}`}
      >
        <div className="max-w-2xl mx-auto">

          {/* Bio Section */}
          <div className="mb-6 leading-snug text-justify text-[16px]">
            <div>
              I'm Valmik Nahata, an undergraduate at UC San Diego. Since last year, I've been working on building AI systems that are both powerful and aligned, particularly around scaling, robustness (adversarial training, safety checks, etc.), and ethical considerations (bias mitigation, transparency, etc.), with the goal of accelerating scientific discovery. Most of my research involves large language models, multimodal AI, and autonomous agents, particularly around reasoning (chain-of-thought, tree search, etc.), alignment (RLHF, debate, etc.), and making inference more efficient (quantization, etc.).
              <br /><br />
              I grew up in Jersey and now live in California, but I'll always be a New Yorker at heart. When I'm not working on AI, you'll find me speedsolving Rubik's cubes (everything from 2x2 through 7x7, plus pyraminx, megaminx, and mirror cubes). I also spent years playing violin, working through Paganini's Caprices and Bach's Partitas, though my favorite piece will always be Mendelssohn's Violin Concerto in E Minor. And for whatever reason, I've developed a thing for collecting old coins, anything from the 1800s and prior.
              <br /><br />
              On the more formal side, I'm an undergraduate researcher at Harvard Medical School & Massachusetts General Hospital, a student researcher at MIT AI Alignment, and a Poseidon Fellow at UC San Diego, with previous experience at Dartmouth Health. I've been fortunate to receive recognition from <LinkWithPreview href="https://apartresearch.com/sprints/economics-of-transformative-ai-research-sprint-2025-04-25-to-2025-04-27" isDarkMode={isDarkMode}>Apart Research & BlueDot Impact</LinkWithPreview>, <LinkWithPreview href="https://indico.cern.ch/event/1624615/" isDarkMode={isDarkMode}>UC San Diego & NSF</LinkWithPreview>, the <LinkWithPreview href="https://www.nba.com/bucks/hackathon" isDarkMode={isDarkMode}>Milwaukee Bucks</LinkWithPreview>, and various other organizations. My recent research includes publications like <LinkWithPreview href="https://iopscience.iop.org/article/10.3847/1538-4357/ad6304" isDarkMode={isDarkMode}>A Statistical Analysis of Crab Pulsar Giant Pulse Rates</LinkWithPreview> and <LinkWithPreview href="https://www.mdpi.com/1999-4893/18/11/685" isDarkMode={isDarkMode}>Cover Edge-Based Triangle Counting</LinkWithPreview>, manuscripts such as <LinkWithPreview href="https://apartresearch.com/project/the-early-economic-impacts-of-transformative-ai-a-focus-on-temporal-coherence-ipql" isDarkMode={isDarkMode}>The Early Economic Impacts of Transformative AI: A Focus on Temporal Coherence</LinkWithPreview> and StitchGuard: Compounding Memory for Trajectory-Aware Multi Stage Sabotage Detection, and posters including Retrieval Augmented Generation for Pathology Reports.
              <br />
              <div className="flex flex-col items-center relative my-4">
                <RotatingEarth width={380} height={380} isDarkMode={isDarkMode} />
              </div>
              <br />
              <br /><br />
              I'm also inspired by the work of Richard Feynman, Christopher Paolini, Dan Brown, and J.R.R. Tolkien. I've always related to Bilbo Baggins' poem in The Fellowship of the Ring:
              <br />
              <span className="block my-2 leading-snug text-[16px]">
                "All that is gold does not glitter,<br />
                Not all those who wander are lost;<br />
                The old that is strong does not wither,<br />
                Deep roots are not reached by the frost.<br />
                From the ashes a fire shall be woken,<br />
                A light from the shadows shall spring;<br />
                Renewed shall be blade that was broken,<br />
                The crownless again shall be king."
              </span>
              Research is much the same: progress stays hidden before it's valued, perhaps.
              <br /><br />
              <div className="flex gap-4 mb-6">
                <a href="https://www.linkedin.com/in/valmiknahata" target="_blank" className="underline hover:opacity-70 transition-opacity decoration-1 underline-offset-2">LinkedIn</a>
                <a href="mailto:vnahata@ucsd.edu" className="underline hover:opacity-70 transition-opacity decoration-1 underline-offset-2">Email</a>
                <a href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" target="_blank" className="underline hover:opacity-70 transition-opacity decoration-1 underline-offset-2">Google Scholar</a>
              </div>
              <LinkWithPreview href="/books" isDarkMode={isDarkMode}>
                Click here to see my favorite books list
              </LinkWithPreview>
              <br />
              <LinkWithPreview href="/papers" isDarkMode={isDarkMode}>
                Click here to see my read papers list
              </LinkWithPreview>
            </div>
          </div>


          {/* ...existing code... */}
          <div className="h-12"></div>
        </div>
      </div>
    </div>
  )
}
