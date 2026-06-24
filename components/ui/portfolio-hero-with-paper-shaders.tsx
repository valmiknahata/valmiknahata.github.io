"use client"

import React from "react"

export default function ResumePage() {
  const links = [
    { label: "Email", href: "mailto:vnahata@ucsd.edu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/valmik-nahata" },
    { label: "GitHub", href: "https://github.com/valmiknahata" },
    { label: "Scholar", href: "https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" }
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#c8d9e6] via-[#eaf1f6] to-[#d8e6f0] py-16 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-24 flex flex-col justify-center items-center font-serif text-[#16130E] selection:bg-neutral-800/10">
      
      {/* Main Grid Split - Full bleeding size */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[440px_1fr] gap-12 lg:gap-20 xl:gap-28 w-full max-w-7xl xl:max-w-[1550px]">
        
        {/* LEFT COLUMN (RAIL) */}
        <div className="space-y-10 flex flex-col justify-start">
          
          {/* Headshot Image - Colored, scaled up */}
          <div className="w-full aspect-[150/188] max-w-[340px] lg:max-w-none rounded-[4px] overflow-hidden border border-neutral-300/40 shadow-[0_8px_30px_rgba(20,16,10,0.06)] bg-white/20">
            <img 
              src="/image.png" 
              alt="Valmik Nahata" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Short Bio Intro */}
          <p className="font-serif text-[22px] md:text-[24px] leading-[1.62] text-[#2C2720] font-light">
            I study how intelligence learns to rewrite itself, and how to keep it legible while it does.
          </p>

          {/* Divider */}
          <div className="h-[1px] bg-neutral-300/60 my-2"></div>

          {/* Affiliations List - Newsreader + Instrument Serif */}
          <div className="space-y-8">
            <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#897F70]">Affiliations</div>
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="font-instrument text-[28px] md:text-[32px] lg:text-[34px] font-normal leading-tight text-[#16130E]">
                  Harvard Medical School & MGH
                </h3>
                <p className="font-serif text-[18px] md:text-[20px] lg:text-[21px] leading-[1.55] text-[#3E3830] font-light">
                  Undergraduate Researcher. Designing adversarial probing protocols to stress-test clinical decision consistency and evaluate multi-step reasoning models under pressure.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-instrument text-[28px] md:text-[32px] lg:text-[34px] font-normal leading-tight text-[#16130E]">
                  MIT AI Alignment
                </h3>
                <p className="font-serif text-[18px] md:text-[20px] lg:text-[21px] leading-[1.55] text-[#3E3830] font-light">
                  AI Safety Fellow. Investigating mechanistic interpretability, constructing representation steering vectors, and studying sparse autoencoders for targeted capability unlearning.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-instrument text-[28px] md:text-[32px] lg:text-[34px] font-normal leading-tight text-[#16130E]">
                  UC San Diego
                </h3>
                <p className="font-serif text-[18px] md:text-[20px] lg:text-[21px] leading-[1.55] text-[#3E3830] font-light">
                  Undergraduate Researcher studying Data Science and Cognitive Science, focusing on steering high-dimensional latent space representations to ensure system alignment.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-neutral-300/60 my-2"></div>

          {/* Contact Section */}
          <div className="space-y-3">
            <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#897F70]">Contact</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[15px] md:text-[16px] tracking-[0.02em]">
              {links.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#5A5246] hover:text-[#ff6600] transition-colors underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (CONTENT) */}
        <div className="space-y-12 py-2 lg:py-0 lg:pl-6 xl:pl-10">
          
          {/* Headline - Curvy Instrument Serif, Super Big */}
          <h1 className="font-instrument text-[56px] md:text-[76px] lg:text-[96px] xl:text-[110px] font-normal leading-[1.02] tracking-[-0.02em] text-[#16130E] max-w-[1000px]">
            Recursive self-improvement is the precursor to superintelligence.
          </h1>

          {/* Narrative essays - Newsreader, Super Big */}
          <div className="font-serif text-[22px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-[1.72] text-[#2C2720] space-y-[36px] font-light max-w-[1000px]">
            <p>
              Every capability we call intelligence eventually turns inward. A model that can write code can write its own training code. A model that can do research can do research on itself. Once that loop closes, progress stops scaling with the compute we buy and starts scaling with the compute the system decides to spend. We name the result superintelligence, but the mechanism is humbler and more unsettling. It is recursive self-improvement: an optimizer pointed at the optimizer.
            </p>
            <p>
              Biology is the first domain that loop will touch at full strength. The same models that fold proteins and reason over pathology can propose novel pathogens and bench-test them in silico faster than any institution can answer. AI × bio is not a vertical on a slide. It is where a capability overhang meets the least forgiving consequences, and where a small alignment error is measured in lives.
            </p>
            <p>
              So the answer is not to slow the loop. The answer is to make it legible. Mechanistic interpretability is the closest thing we have to a microscope for cognition. Sparse autoencoders pull monosemantic features out of superposition. Linear probes catch a chain of thought lying before it finishes. Unlearning removes a capability instead of hiding it. If a mind is going to improve itself, I want to read what it values while that mind still fits in our hands.
            </p>
            <p>
              Can we understand a system faster than it can surprise us. Today the honest answer is not yet. I think it is the most important problem there is, and I think it is tractable.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

