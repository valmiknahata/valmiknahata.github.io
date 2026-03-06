"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Linkedin, Mail, Moon, Sun, GraduationCap } from "lucide-react"
import { KnotAnimation } from "./knot-animation"

const getPreviewUrl = (url: string) => {
  if (!url) return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720&waitFor=2000&waitUntil=networkidle2`;
}

const Card = ({ title, date, desc, img, href }: any) => (
  <a
    href={href || "#"}
    target={href ? "_blank" : "_self"}
    className="rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden border-border p-0 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col group"
  >
    <div className="w-full relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-border">
      <img
        src={img}
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
        }}
      />
    </div>
    <div className="p-4 lg:p-6 flex-1 flex flex-col bg-background">
      <h3 className="text-lg lg:text-xl leading-snug mb-2 font-medium">{title}</h3>
      <p className="text-xs lg:text-sm text-muted-foreground mb-2">{date}</p>
      <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </a>
);

const TimelineItem = ({ title, subtitle, date, duration, desc, isCurrent = false }: any) => (
  <div className="relative pl-10">
    <div className={`absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 ${isCurrent ? 'border-foreground bg-foreground' : 'border-border bg-background'}`}></div>
    <div>
      <h3 className="mb-1 text-base lg:text-lg font-medium">{title}</h3>
      <p className="mb-3 text-xs lg:text-sm text-muted-foreground">{subtitle} {date ? `• ${date}` : ''} {duration ? `• ${duration}` : ''}</p>
      <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{desc}</p>
    </div>
  </div>
);

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
    if (newMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  return (
    <div className={`flex min-h-screen bg-background overflow-x-hidden font-mono text-foreground ${isDarkMode ? 'dark' : ''}`}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:border-r lg:border-border lg:bg-background lg:p-8 lg:flex-col z-50">
        <div className="mb-12">
          <div className="w-24 h-24 relative overflow-hidden flex items-center justify-center rounded">
            <img
              src="/ascii-art.png"
              alt="Valmik Nahata"
              className={`w-full h-full object-cover ${isDarkMode ? 'invert' : ''}`}
            />
          </div>
        </div>
        <nav className="space-y-4">
          <a className="block text-foreground hover:text-muted-foreground transition-colors" href="#">Home</a>
          <a className="block text-muted-foreground hover:text-foreground transition-colors" href="#experience">Experience</a>
          <a className="block text-muted-foreground hover:text-foreground transition-colors" href="#projects">Projects</a>
          <a className="block text-muted-foreground hover:text-foreground transition-colors" href="#research">Research</a>
          <a className="block text-muted-foreground hover:text-foreground transition-colors" href="#accolades">Accolades</a>
          <a className="block text-muted-foreground hover:text-foreground transition-colors" href="#contact">Contact</a>
        </nav>
        <div className="flex py-6 items-center gap-6 mt-auto lg:mt-6">
          <a target="_blank" className="text-foreground hover:text-muted-foreground transition-colors" href="https://www.linkedin.com/in/valmiknahata">
            <Linkedin className="h-5 w-5" />
          </a>
          <a className="text-foreground hover:text-muted-foreground transition-colors" href="mailto:vnahata@ucsd.edu">
            <Mail className="h-5 w-5" />
          </a>
          <a target="_blank" className="text-foreground hover:text-muted-foreground transition-colors" href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en">
            <GraduationCap className="h-5 w-5" />
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 w-full min-w-0 bg-background">

        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-10 border-b border-border bg-background px-4 py-4 w-full">
          <div className="flex items-center justify-between w-full">
            <div className="w-20 h-20 relative overflow-hidden flex items-center justify-center shrink-0 rounded">
              <img
                src="/ascii-art.png"
                alt="Valmik Nahata"
                className={`w-full h-full object-cover ${isDarkMode ? 'invert' : ''}`}
              />
            </div>
            <div className="flex items-center gap-4">
              <a target="_blank" className="text-foreground hover:text-muted-foreground transition-colors" href="https://www.linkedin.com/in/valmiknahata">
                <Linkedin className="h-5 w-5" />
              </a>
              <a className="text-foreground hover:text-muted-foreground transition-colors" href="mailto:vnahata@ucsd.edu">
                <Mail className="h-5 w-5" />
              </a>
              <a target="_blank" className="text-foreground hover:text-muted-foreground transition-colors" href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en">
                <GraduationCap className="h-5 w-5" />
              </a>
            </div>
          </div>
          <nav className="mt-4 flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
            <a className="text-foreground hover:text-muted-foreground whitespace-nowrap py-2 transition-colors" href="#">Home</a>
            <a className="text-muted-foreground hover:text-foreground whitespace-nowrap py-2 transition-colors" href="#experience">Experience</a>
            <a className="text-muted-foreground hover:text-foreground whitespace-nowrap py-2 transition-colors" href="#projects">Projects</a>
            <a className="text-muted-foreground hover:text-foreground whitespace-nowrap py-2 transition-colors" href="#research">Research</a>
            <a className="text-muted-foreground hover:text-foreground whitespace-nowrap py-2 transition-colors" href="#accolades">Accolades</a>
            <a className="text-muted-foreground hover:text-foreground whitespace-nowrap py-2 transition-colors" href="#contact">Contact</a>
          </nav>
        </div >

        {/* Home Section */}
        <section className="px-4 py-8 sm:px-8 lg:px-12 lg:pt-12 lg:pb-4">
          <div className="mb-8 lg:mb-12 max-w-4xl">
            <h1 className="mb-8 lg:mb-10 font-mono text-4xl sm:text-5xl lg:text-6xl leading-none text-balance font-normal text-foreground">Valmik Nahata</h1>
            <p className="mb-6 lg:mb-8 text-base lg:text-lg text-muted-foreground leading-relaxed">
              Undergraduate Researcher at Harvard Medical School & MGH, member of student research group MIT AI Alignment, with previous experience at Dartmouth Health, and others.
            </p>
            <p className="mb-6 lg:mb-8 text-base lg:text-lg text-muted-foreground leading-relaxed">
              B.S. in Data Science from University of California, San Diego (2024-2028).
            </p>
            <p className="mb-6 lg:mb-8 text-base lg:text-lg text-muted-foreground leading-relaxed">
              My daily work involves solving problems in AI alignment and robustness, and creating resilient systems for <b>AI in Science</b>.
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-8 lg:mt-10 text-sm lg:text-base text-muted-foreground">
              <a className="hover:text-foreground transition-colors" href="#experience">See my experience ›</a>
              <a className="hover:text-foreground transition-colors" href="#projects">View my projects ›</a>
            </div>

            <div className={`mt-2 mb-12 overflow-hidden flex justify-start ${!isDarkMode ? 'invert' : ''}`}>
              <KnotAnimation color={true} speedA={0.08} speedB={0.04} />
            </div>
          </div>
        </section >

        {/* Experience Section */}
        < section id="experience" className="border-t border-border px-4 py-12 sm:px-8 lg:px-12 lg:py-24" >
          <h2 className="mb-8 lg:mb-16 font-mono text-2xl sm:text-3xl lg:text-4xl font-medium">Professional Experience</h2>

          <div className="relative max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

              {/* Industry */}
              <div className="relative">
                <h3 className="mb-6 lg:mb-8 text-lg lg:text-xl font-medium text-muted-foreground">Research Affiliations</h3>
                <div className="absolute left-[9px] top-16 lg:top-20 bottom-3 w-px bg-border"></div>
                <div className="space-y-8 lg:space-y-12">
                  <TimelineItem
                    title="MIT AI Alignment"
                    subtitle="Member"
                    date="2026 - Present"
                    desc=""
                    isCurrent={true}
                  />
                  <TimelineItem
                    title="Harvard Medical School & MGH"
                    subtitle="Undergraduate Researcher"
                    date="2025 - Present"
                    desc="Researching Large Language Models for Clinical Use and focusing on chain-of-thought robustness."
                    isCurrent={true}
                  />
                  <TimelineItem
                    title="Dartmouth Health & Dartmouth Cancer Center"
                    subtitle="Research Intern"
                    date="2024 - 2025"
                    duration="1 Year"
                    desc="Developed Retrieval-Augmented Generation for Pathology Reports."
                  />
                </div>
              </div>

              {/* Academic */}
              <div className="relative">
                <h3 className="mb-6 lg:mb-8 text-lg lg:text-xl font-medium text-muted-foreground">Academic</h3>
                <div className="absolute left-[9px] top-16 lg:top-20 bottom-3 w-px bg-border"></div>
                <div className="space-y-8 lg:space-y-12">
                  <TimelineItem
                    title="University of California, San Diego"
                    subtitle="Undergraduate Student"
                    date="2024 - Present"
                    desc={`Data Science at Halıcıoğlu Data Science Institute (Ranked #8 on U.S. News).\nVice President of Research at the AI Student Collective.\nMember of ACM, IEEE, UBIC, SDxUCSD.`}
                    isCurrent={true}
                  />
                </div>
              </div>

            </div>
          </div>
        </section >

        {/* Projects Section */}
        < section id="projects" className="border-t border-border px-4 py-12 sm:px-8 lg:px-12 lg:py-24" >
          <h2 className="mb-8 lg:mb-12 font-mono text-2xl sm:text-3xl lg:text-4xl font-medium">Projects</h2>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              title="Labry"
              date="2025 - Present"
              desc="Democratizing Research."
              img={getPreviewUrl("https://www.linkedin.com/company/109509095")}
              href="https://www.linkedin.com/company/109509095"
            />
            <Card
              title="GeoCheater"
              date="2026"
              desc="WorldGuessr Cheats."
              img={getPreviewUrl("https://worldguessr.com")}
            />
            <Card
              title="CarbonTime"
              date="2025"
              desc="3D Carbon Simulation."
              img={getPreviewUrl("https://google.com")}
            />
            <Card
              title="Signly"
              date="2025"
              desc="American Sign Language Conversationalist."
              img={getPreviewUrl("https://google.com")}
            />
            <Card
              title="DuckAI"
              date="2025"
              desc="Industry Language Model Benchmarking. Georgia Tech."
              img={getPreviewUrl("https://google.com")}
            />
            <Card
              title="Blume"
              date="2025"
              desc="Departed Relatives Conversationalist."
              img={getPreviewUrl("https://google.com")}
            />
            <Card
              title="Kaboo"
              date="2024"
              desc="Point of Sale QR Automation."
              img={getPreviewUrl("https://google.com")}
            />
          </div>
        </section >

        {/* Research Section */}
        < section id="research" className="border-t border-border px-4 py-12 sm:px-8 lg:px-12 lg:py-24" >
          <h2 className="mb-8 lg:mb-12 font-mono text-2xl sm:text-3xl lg:text-4xl font-medium">Research</h2>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              title="CoT Robustness in LLMs"
              date="Upcoming · 2025"
              desc="Chain-of-Thought Robustness in Large Language Models for Clinical Applications."
              img="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop"
            />
            <Card
              title="A Statistical Analysis of Crab Pulsar Giant Pulse Rates"
              date="2024"
              desc="Research conducted at Department of Physics and Astronomy, West Virginia University."
              img={getPreviewUrl("https://iopscience.iop.org/article/10.3847/1538-4357/ad6304")}
              href="https://iopscience.iop.org/article/10.3847/1538-4357/ad6304"
            />
            <Card
              title="Cover Edge-Based Triangle Counting"
              date="2024"
              desc="Research conducted at Department of Data Science, New Jersey Institute of Technology."
              img={getPreviewUrl("https://www.mdpi.com/1999-4893/18/11/685")}
              href="https://www.mdpi.com/1999-4893/18/11/685"
            />
            <Card
              title="RAG for Pathology Reports"
              date="2024"
              desc="Manuscript & Poster. Research conducted at Dartmouth Health & Dartmouth Cancer Center."
              img={"/Poster Template.pptx.jpg"}
            />
          </div>
        </section >

        {/* Accolades Section */}
        < section id="accolades" className="border-t border-border px-4 py-12 sm:px-8 lg:px-12 lg:py-24" >
          <h2 className="mb-8 lg:mb-12 font-mono text-2xl sm:text-3xl lg:text-4xl font-medium">Accolades</h2>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              title="1st Place | NSF HDR & UC San Diego SMASH Hackathon"
              date="2026"
              desc="Coastal Flooding Prediction Models."
              img={getPreviewUrl("https://indico.cern.ch/event/1624615/")}
              href="https://indico.cern.ch/event/1624615/"
            />
            <Card
              title="1st Place | Apart Research Sprint"
              date="2025"
              desc="The Early Economic Impacts of Transformative AI: A Focus on Temporal Coherence."
              img={getPreviewUrl("https://apartresearch.com/project/the-early-economic-impacts-of-transformative-ai-a-focus-on-temporal-coherence-ipql")}
              href="https://apartresearch.com/project/the-early-economic-impacts-of-transformative-ai-a-focus-on-temporal-coherence-ipql"
            />
            <Card
              title="3rd Place | Milwaukee Bucks & Modine Hackathon"
              date="2025"
              desc="Fan Engagement & Churn Propensity Models Presentation."
              img={"/bucks-slides/Slide1.JPG"}
            />
          </div>
        </section >

        {/* Contact Section */}
        < section id="contact" className="border-t border-border px-4 py-12 sm:px-8 lg:px-12 lg:py-24" >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-6 lg:mb-8 font-mono text-2xl sm:text-3xl lg:text-4xl font-medium">Contact</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <a className="flex items-center justify-center sm:justify-start gap-2 text-sm lg:text-base text-foreground hover:text-muted-foreground transition-colors" href="mailto:vnahata@ucsd.edu">
                <Mail className="h-5 w-5" />
                <span>vnahata@ucsd.edu</span>
              </a>
              <a target="_blank" className="flex items-center justify-center sm:justify-start gap-2 text-sm lg:text-base text-foreground hover:text-muted-foreground transition-colors" href="https://www.linkedin.com/in/valmiknahata">
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 size-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary z-50 text-foreground"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

    </div>
  )
}
