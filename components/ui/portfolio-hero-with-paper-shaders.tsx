"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import RotatingEarth from "./wireframe-dotted-globe"
import { Sparkles } from "lucide-react"

// Global state to track the currently active tooltip
let activeTooltipId: string | null = null;

function TooltipItem({ name, description, href, isDarkMode, className, descriptionHref, images }: { name: string, description?: string, href?: string, isDarkMode: boolean, className?: string, descriptionHref?: string, images?: string[] }) {
  const [showPreview, setShowPreview] = useState(false);
  const [isMouseOverTrigger, setIsMouseOverTrigger] = useState(false);
  const [isMouseOverPreview, setIsMouseOverPreview] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [startedLoading, setStartedLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoverSource, setHoverSource] = useState<'title' | 'description' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const tooltipId = useRef<string>(Math.random().toString(36));

  // Track specific image loading for the gallery
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeHref = hoverSource === 'description' ? (descriptionHref || href) : (href || descriptionHref);
  const isPptx = activeHref?.toLowerCase().endsWith('.pptx');

  const previewUrl = activeHref
    ? (activeHref.startsWith('http') ? activeHref : `https://valmiknahata.github.io${activeHref}`)
    : '';

  const hasImages = images && images.length > 0;
  // Show as soon as the first image is ready if it's a gallery
  const isReady = hasImages ? loadedImages[0] : (isPptx ? true : imageLoaded);

  useEffect(() => {
    if (isMouseOverTrigger || isMouseOverPreview) {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      activeTooltipId = tooltipId.current;
      setShowPreview(true);
      setStartedLoading(true);
    } else {
      closeTimeoutRef.current = setTimeout(() => {
        if (activeTooltipId === tooltipId.current) {
          activeTooltipId = null;
        }
        setShowPreview(false);
        setImageLoaded(false);
        setLoadedImages({});
        setStartedLoading(false);
        setCurrentSlide(0);
      }, 100);
    }
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    }
  }, [isMouseOverTrigger, isMouseOverPreview]);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (showPreview) {
        setIsMouseOverTrigger(false);
        setIsMouseOverPreview(false);
        setShowPreview(false);
      }
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [showPreview]);

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current && images) {
      const newIndex = Math.max(0, Math.min(index, images.length - 1));
      setCurrentSlide(newIndex);
      scrollContainerRef.current.scrollTo({
        left: newIndex * scrollContainerRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const index = Math.round(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.clientWidth);
      setCurrentSlide(index);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showPreview) return;
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
      className={`relative flex flex-col justify-center group cursor-default w-fit max-w-full ${className}`}
      onMouseMove={handleMouseMove}
    >
      {(() => {
        const [left, ...right] = name.split("|");
        const leftPart = left?.trim();
        const rightPart = right.length > 0 ? right.join("|").trim() : null;
        if ((href || hasImages) && rightPart) {
          return (
            <span>
              <span className="font-bold">{leftPart}</span>
              {" | "}
              <span
                className={`transition-all hover:opacity-70 cursor-pointer ${isDarkMode ? "text-[hsl(320,100%,75%)]" : "text-[hsl(348,90%,30%)]"}`}
                onMouseEnter={() => { setIsMouseOverTrigger(true); setHoverSource('title'); }}
                onMouseLeave={() => { setIsMouseOverTrigger(false); setHoverSource(null); }}
                onClick={() => href && window.open(href, '_blank')}
              >
                {rightPart}
              </span>
            </span>
          );
        } else {
          return (
            <span>
              <span className="font-bold">{leftPart}</span>{rightPart ? ` | ${rightPart}` : ""}
            </span>
          );
        }
      })()}

      {description && (
        <div className="flex flex-col ml-2">
          {description.split('\n').map((line, i) => (
            <span key={i} className="text-[13px] opacity-70 font-normal leading-tight mt-0.5 whitespace-pre-wrap sm:whitespace-pre font-mono">
              {"└─> "}{(() => {
                const triggerText1 = "LPL Financial's University Hackathon Presentation";
                const triggerText2 = "Fan Engagement & Churn Propensity Models Presentation";
                const triggerText3 = "The Early Economic Impacts of Transformative AI: A Focus on Temporal Coherence";

                const triggerText = line.includes(triggerText1) ? triggerText1 : (line.includes(triggerText2) ? triggerText2 : (line.includes(triggerText3) ? triggerText3 : null));

                if ((descriptionHref || hasImages) && triggerText) {
                  const parts = line.split(triggerText);
                  return (
                    <>
                      {parts[0]}
                      {descriptionHref ? (
                        <a
                          href={descriptionHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`cursor-pointer transition-all hover:opacity-70 ${isDarkMode ? "text-[hsl(320,100%,75%)]" : "text-[hsl(348,90%,30%)]"}`}
                          onMouseEnter={() => { setIsMouseOverTrigger(true); setHoverSource('description'); }}
                          onMouseLeave={() => { setIsMouseOverTrigger(false); setHoverSource(null); }}
                        >
                          {triggerText}
                        </a>
                      ) : (
                        <span
                          className={`cursor-pointer transition-all hover:opacity-70 ${isDarkMode ? "text-[hsl(320,100%,75%)]" : "text-[hsl(348,90%,30%)]"}`}
                          onMouseEnter={() => { setIsMouseOverTrigger(true); setHoverSource('description'); }}
                          onMouseLeave={() => { setIsMouseOverTrigger(false); setHoverSource(null); }}
                        >
                          {triggerText}
                        </span>
                      )}
                      {parts[1]}
                    </>
                  );
                }
                return line;
              })()}
            </span>
          ))}
        </div>
      )}

      {(activeHref || hasImages) && showPreview && activeTooltipId === tooltipId.current && (
        <div
          className={`fixed z-[60] border shadow-2xl transition-opacity overflow-hidden rounded-lg ${showPreview ? 'opacity-100 duration-200' : 'opacity-0'} ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`}
          onMouseEnter={() => setIsMouseOverPreview(true)}
          onMouseLeave={() => setIsMouseOverPreview(false)}
          style={isMobile ? {
            width: 'min(90vw, 320px)',
            height: 'auto',
            aspectRatio: '16/9',
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
            top: 'auto',
            pointerEvents: showPreview ? 'auto' : 'none'
          } : {
            width: '280px',
            height: '157px',
            left: `${mousePos.x + (containerRef.current?.getBoundingClientRect().left || 0) - 140}px`,
            top: `${mousePos.y + (containerRef.current?.getBoundingClientRect().top || 0) - 177}px`,
            pointerEvents: showPreview ? 'auto' : 'none'
          }}
        >
          {startedLoading && !isReady && (
            <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {hasImages ? (
            <div className="w-full h-full relative group/gallery">
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="w-full h-full overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory pointer-events-auto hide-scrollbar"
              >
                {images.map((img, idx) => (
                  <div key={idx} className="min-w-full h-full snap-center relative flex-shrink-0">
                    <img
                      src={img}
                      alt={`Preview slide ${idx + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-200 ${loadedImages[idx] ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setLoadedImages(prev => ({ ...prev, [idx]: true }))}
                      onError={() => setLoadedImages(prev => ({ ...prev, [idx]: true }))}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); scrollToSlide(currentSlide - 1); }}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200 border ${isDarkMode
                      ? 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                      : 'bg-white/80 border-zinc-200 text-zinc-500 hover:text-black hover:bg-zinc-50'
                      } ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/gallery:opacity-100'}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); scrollToSlide(currentSlide + 1); }}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-200 border ${isDarkMode
                      ? 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                      : 'bg-white/80 border-zinc-200 text-zinc-500 hover:text-black hover:bg-zinc-50'
                      } ${currentSlide === images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-hover/gallery:opacity-100'}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 px-2 pointer-events-none">
                    {images.map((_, dotIdx) => (
                      <div key={dotIdx} className={`w-1 h-1 rounded-full transition-all duration-300 ${dotIdx === currentSlide
                        ? (isDarkMode ? 'bg-white scale-110' : 'bg-black scale-110')
                        : (isDarkMode ? 'bg-white/20' : 'bg-black/20')
                        }`} />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : isPptx ? (
            <div className="w-full h-full bg-white">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(previewUrl)}&embedded=true`}
                className="w-full h-full border-none"
                title="PPTX Preview"
              />
            </div>
          ) : (
            <img
              src={`https://api.microlink.io/?url=${encodeURIComponent(previewUrl)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720&waitFor=2000&waitUntil=networkidle2`}
              alt="Link preview"
              className={`w-full h-full object-cover transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          )}
          {!isMobile && (
            <div className={`absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 -translate-y-1 rotate-45 border-r border-b ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
              }`} />
          )}
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
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (showPreview) {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); // Clear any pending close timeout
        setShowPreview(false);
        setImageLoaded(false);
        setStartedLoading(false);
      }
    };

    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [showPreview]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showPreview) return;
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
      className={`relative inline-block group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Link
        href={href}
        className={`transition-all hover:opacity-70 italic ${isDarkMode ? "text-[hsl(320,100%,75%)]" : "text-[hsl(348,90%,30%)]"}`}
        onMouseEnter={() => {
          if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          setShowPreview(true);
          setStartedLoading(true);
        }}
        onMouseLeave={() => {
          closeTimeoutRef.current = setTimeout(() => {
            setShowPreview(false);
            setImageLoaded(false);
            setStartedLoading(false);
          }, 100);
        }}
      >
        {children}
      </Link>

      {showPreview && (
        <div
          className={`fixed z-[60] border shadow-2xl transition-opacity pointer-events-none overflow-hidden rounded-lg ${imageLoaded ? 'opacity-100 duration-200' : 'opacity-0'} ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"}`}
          style={isMobile ? {
            width: 'min(90vw, 320px)',
            height: 'auto',
            aspectRatio: '16/9',
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
            top: 'auto',
          } : {
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
          {!isMobile && (
            <div className={`absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 -translate-y-1 rotate-45 border-r border-b ${isDarkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
              }`} />
          )}
        </div>
      )}
    </div>
  );
}

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>("")

  // Sync with localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
    } else if (savedTheme === 'light') {
      setIsDarkMode(false)
    } else {
      // Default to light mode if no preference exists
      setIsDarkMode(false)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

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
    <div className="relative min-h-screen overflow-hidden flex flex-col bg-white dark:bg-black transition-colors duration-300 font-serif text-[16px]">
      <div
        className={`w-full p-6 md:p-16 relative z-10 min-h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-white text-[#141414]"}`}
      >
        <div className="max-w-3xl mx-auto">
          {/* Unified Top Header Line */}
          <div className="flex flex-row justify-between items-center mb-6 text-[14px] min-[400px]:text-[16px] font-medium leading-none w-full relative">
            {/* Left: PST Time */}
            <div className="z-10 text-left">
              <div suppressHydrationWarning className={`${isDarkMode ? "text-white" : "text-black"} uppercase tracking-[0.1em] min-[400px]:tracking-widest whitespace-nowrap`}>PST {currentTime}</div>
            </div>

            {/* Center: Name */}
            <div className="absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
              <div className={`${isDarkMode ? "text-white" : "text-black"} uppercase tracking-[0.1em] min-[400px]:tracking-widest`}>Valmik Nahata</div>
            </div>

            {/* Right: Theme Toggle */}
            <div
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center justify-end gap-1 min-[400px]:gap-2 group cursor-pointer z-10"
            >
              <span className={`${isDarkMode ? "text-white" : "text-black"} uppercase tracking-[0.1em] min-[400px]:tracking-widest`}>{isDarkMode ? "Dark" : "Light"}</span>
              <button
                className="group-active:scale-95 transition-transform flex items-center justify-center -mt-[1px]"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Header Section Spacing */}
          <div className="mb-6"></div>

          {/* Globe Section */}
          <div className="mb-12 pointer-events-none sm:pointer-events-auto">
            <div className="flex flex-col items-center relative">
              <div className="w-full max-w-[456px] aspect-square flex items-center justify-center">
                <RotatingEarth width={456} height={456} className="opacity-80" isDarkMode={isDarkMode} />
              </div>
              <div className={`flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-md z-20 -mt-5 ${isDarkMode
                ? "bg-neutral-900 text-neutral-400 border border-neutral-800"
                : "bg-white text-neutral-600 border border-neutral-200 shadow-sm"
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDarkMode ? "bg-[hsl(320,100%,70%)]" : "bg-[hsl(348,90%,30%)]"}`} />
                Live Location
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-6 leading-7 opacity-85 sm:text-justify text-left">
            <div className="mt-[1.5cm]">
              I'm Valmik Nahata, an undergraduate at UC San Diego. Since last year, I've been working on building AI systems focused on scaling, robustness (adversarial training, safety checks, etc.), and ethical considerations (bias mitigation, transparency, etc.), with the goal of accelerating scientific discovery. Most of my research involves large language models, multimodal AI, and autonomous agents, with an interest in reasoning (chain-of-thought, tree search, etc.), alignment (RLHF, debate, etc.), and inference efficiency (quantization, etc.).
              <br /><br />
              I grew up in Jersey and now live in California, but I'll always be a New Yorker at heart. When I'm not working on AI, you'll find me speedsolving Rubik's cubes (everything from 2x2 through 7x7, plus pyraminx, megaminx, and mirror cubes). I also spent years playing violin, working through Paganini's Caprices and Bach's Partitas, though my favorite piece will always be Mendelssohn's Violin Concerto in E Minor. And for reasons unknown to me, I've developed a thing for collecting old coins, anything from the 1800s and prior.
              <br /><br />
              I'm also inspired by the work of Richard Feynman, Christopher Paolini, Dan Brown, and J.R.R. Tolkien. I've always related to Bilbo Baggins’ poem in <em>The Fellowship of the Ring</em>:
              <br /><br />
              <span className="italic block pl-6 border-l-2 border-zinc-500/20 leading-relaxed">
                "All that is gold does not glitter,<br />
                Not all those who wander are lost;<br />
                The old that is strong does not wither,<br />
                Deep roots are not reached by the frost."
              </span>
              <br />
              Research is much the same: progress stays hidden before it's valued, perhaps. Here's the more formal side:
            </div>
          </div>


          <div className="mb-6">
            <div className={`mb-3 uppercase tracking-[0.1em] min-[400px]:tracking-widest text-[14px] min-[400px]:text-[16px] font-medium ${isDarkMode ? "text-white" : "text-black"}`}>Education</div>
            <div className="space-y-0.5 opacity-80">
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Undergraduate Student | University of California, San Diego"
                  description={"Data Science at Halıcıoğlu Data Science Institute (Ranked #8 on U.S. News)\nVice President of Research at the AI Student Collective, ACM, IEEE, UBIC, SDxUCSD"}
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="opacity-50 tabular-nums text-[13px] sm:text-base text-right">2024—Present</span>
                </div>
              </div>
            </div>
          </div>

          {/* Occupations Section */}
          <div className="mb-6">
            <div className={`mb-3 uppercase tracking-[0.1em] min-[400px]:tracking-widest text-[14px] min-[400px]:text-[16px] font-medium ${isDarkMode ? "text-white" : "text-black"}`}>Occupations</div>
            <div className="space-y-0.5 opacity-80">
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Member | MIT AI Alignment"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="opacity-50 tabular-nums text-[13px] sm:text-base text-right">2026—Present</span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Undergraduate Researcher | Harvard Medical School & Massachusetts General Hospital"
                  description="Advised by Dr. ___ _________ on LLMs for Clinical Use"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="opacity-50 tabular-nums text-[13px] sm:text-base text-right">2025—Present</span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-baseline gap-4">
                <TooltipItem
                  name="Research Intern | Dartmouth Health & Dartmouth Cancer Center"
                  description="Advised by Dr. Joshua Levy on RAG for Pathology Reports"
                  isDarkMode={isDarkMode}
                  className="font-medium shrink"
                />
                <div className="flex gap-4 items-baseline shrink-0">
                  <span className="opacity-50 tabular-nums text-[13px] sm:text-base text-right">2024—2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accolades Section */}
          <div className="mb-6">
            <div className={`mb-3 uppercase tracking-[0.1em] min-[400px]:tracking-widest text-[14px] min-[400px]:text-[16px] font-medium ${isDarkMode ? "text-white" : "text-black"}`}>Accolades</div>
            <div className="space-y-0.5 opacity-80">
              {[
                { name: "1st Place | National Science Foundation HDR & UC San Diego SMASH's ML Hackathon", desc: "Coastal Flooding Prediction Models", href: "https://indico.cern.ch/event/1624615/", date: "2026" },
                { name: "1st Place | Apart Research & BlueDot Impact's Economics of Transformative AI Sprint", desc: "The Early Economic Impacts of Transformative AI: A Focus on Temporal Coherence", href: "https://apartresearch.com/sprints/economics-of-transformative-ai-research-sprint-2025-04-25-to-2025-04-27", descHref: "https://apartresearch.com/project/the-early-economic-impacts-of-transformative-ai-a-focus-on-temporal-coherence-ipql", date: "2025" },
                {
                  name: "3rd Place | Milwaukee Bucks & Modine Manufacturing's Hackathon",
                  desc: "Fan Engagement & Churn Propensity Models Presentation",
                  images: Array.from({ length: 18 }, (_, i) => `/bucks-slides/Slide${i + 1}.JPG`),
                  date: "2025"
                },
                { name: "Various | The College of New Jersey, Kean University, etc.", desc: "", date: "2023—2025" },
              ].map((accolade) => (
                <div key={accolade.name} className="flex flex-row justify-between items-baseline gap-4">
                  <TooltipItem
                    name={accolade.name}
                    description={accolade.desc}
                    href={accolade.href || undefined}
                    descriptionHref={(accolade as any).descHref}
                    images={(accolade as any).images}
                    isDarkMode={isDarkMode}
                    className="font-medium shrink"
                  />
                  <span className="opacity-50 tabular-nums shrink-0 text-right text-[13px] sm:text-base">{accolade.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Research Section */}
          <div className="mb-6">
            <div className={`mb-3 uppercase tracking-[0.1em] min-[400px]:tracking-widest text-[14px] min-[400px]:text-[16px] font-medium ${isDarkMode ? "text-white" : "text-black"}`}>Research (publications, manuscripts, & posters)</div>
            <div className="space-y-0.5 opacity-80">
              {[
                { name: "Upcoming | Chain-of-Thought Robustness in Large Language Models for Clinical Applications", desc: "", date: "2025—Present" },
                { name: "Publication | A Statistical Analysis of Crab Pulsar Giant Pulse Rates", desc: "Directed by Graham Doskoch at Department of Physics and Astronomy, West Virginia University", href: "https://iopscience.iop.org/article/10.3847/1538-4357/ad6304", date: "2024" },
                { name: "Publication | Cover Edge-Based Triangle Counting", desc: "Directed by Dr. David Bader at Department of Data Science, New Jersey Institute of Technology", href: "https://www.mdpi.com/1999-4893/18/11/685", date: "2024" },
                { name: "Manuscript & Poster | Retrieval Augmented Generation for Pathology Reports", desc: "Directed by Dr. Joshua Levy at Dartmouth Health & Dartmouth Cancer Center", images: ["/Poster Template.pptx.jpg"], date: "2024" },
              ].map((publication) => (
                <div key={publication.name} className="flex flex-row justify-between items-baseline gap-4">
                  <TooltipItem
                    name={publication.name}
                    description={publication.desc}
                    href={publication.href}
                    descriptionHref={(publication as any).descHref}
                    images={(publication as any).images}
                    isDarkMode={isDarkMode}
                    className="font-medium shrink"
                  />
                  <span className="opacity-50 tabular-nums shrink-0 text-right text-[13px] sm:text-base">{publication.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-6">
            <div className={`mb-3 uppercase tracking-[0.1em] min-[400px]:tracking-widest text-[14px] min-[400px]:text-[16px] font-medium ${isDarkMode ? "text-white" : "text-black"}`}>Projects (Independent & collaborative)</div>
            <div className="space-y-0.5 opacity-80">
              {[
                { name: "Democratizing Research | Labry", desc: "", href: "https://www.linkedin.com/company/109509095", date: "2025—Present" },
                {
                  name: "Autonomous Financial Compliance Engine | ALPINE",
                  desc: "LPL Financial's University Hackathon Presentation",
                  images: Array.from({ length: 22 }, (_, i) => i + 1)
                    .filter(n => n !== 13 && n !== 14)
                    .map(n => `/alpine-slides/Slide${n}.JPG`),
                  date: "2026"
                },
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
                    descriptionHref={(project as any).descHref}
                    images={(project as any).images}
                    isDarkMode={isDarkMode}
                    className="font-medium shrink"
                  />
                  <span className="opacity-50 tabular-nums shrink-0 text-right text-[13px] sm:text-base">{project.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <div className={`mb-3 uppercase tracking-[0.1em] min-[400px]:tracking-widest text-[14px] min-[400px]:text-[16px] font-medium ${isDarkMode ? "text-white" : "text-black"}`}>Contact</div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/valmiknahata" target="_blank" className={`transition-all hover:opacity-70 ${isDarkMode ? "text-[hsl(320,100%,75%)]" : "text-[hsl(348,90%,30%)]"}`}>LinkedIn</a>
              <a href="mailto:vnahata@ucsd.edu" className={`transition-all hover:opacity-70 ${isDarkMode ? "text-[hsl(320,100%,75%)]" : "text-[hsl(348,90%,30%)]"}`}>Email</a>
              <a href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" target="_blank" className={`transition-all hover:opacity-70 ${isDarkMode ? "text-[hsl(320,100%,75%)]" : "text-[hsl(348,90%,30%)]"}`}>Google Scholar</a>
            </div>
          </div>

          {/* Additional Section */}
          <div className="mb-8">
            <div className={`mb-3 uppercase tracking-[0.1em] min-[400px]:tracking-widest text-[14px] min-[400px]:text-[16px] font-medium ${isDarkMode ? "text-white" : "text-black"}`}>Additional</div>
            <div className="flex flex-col gap-2 italic">
              <LinkWithPreview href="/books" isDarkMode={isDarkMode}>
                Favorite Books List
              </LinkWithPreview>
              <LinkWithPreview href="/papers" isDarkMode={isDarkMode}>
                Read Research Papers List
              </LinkWithPreview>
            </div>
          </div>



          <div className="h-12"></div>
        </div>
      </div>
    </div>
  )
}
