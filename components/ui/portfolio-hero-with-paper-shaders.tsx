"use client"

import React from "react"
import { Mail } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="w-full min-h-screen bg-white text-[#000000] py-16 md:py-20 px-6 md:px-12 lg:px-20 flex flex-col items-center font-serif selection:bg-neutral-800/10">
      <div className="w-full max-w-[800px] space-y-12">
        
        {/* TOP SECTION: Photo + About Me side by side */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Photo & Socials */}
          <div className="flex-shrink-0 w-[170px] mx-auto md:mx-0">
            <div className="w-[170px] h-[210px] rounded-[2px] overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)] border border-neutral-100">
              <img 
                src="/image.png" 
                alt="Valmik Nahata" 
                className="w-full h-full object-cover object-[center_top]"
              />
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-5 mt-5 items-center justify-center">
              <a 
                href="mailto:vnahata@ucsd.edu" 
                className="text-black hover:text-neutral-500 transition-colors" 
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/valmik-nahata" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black hover:text-neutral-500 transition-colors" 
                title="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://scholar.google.com/citations?user=nv1ym54AAAAJ&hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black hover:text-neutral-500 transition-colors" 
                title="Google Scholar"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.852 3.64c.264-.814.773-1.523 1.458-2.023L12 7.5l12 2L12 0z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/valmik_nahata" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-black hover:text-neutral-500 transition-colors" 
                title="X"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* About Me Text */}
          <div className="flex-1">
            <p className="font-serif text-[18px] md:text-[19px] leading-[1.85] text-[#222222] font-normal">
              I'm Valmik Nahata, an undergraduate at UC San Diego. For the past two years, I've been working on building AI systems that are both powerful and aligned. I'm a research assistant at MGH & Harvard Medical School working on clinical AI, a member of MIT AI Alignment, and a UCSD Poseidon Fellow. I was previously at Dartmouth Health working on NLP for pathology. My work has been supported by Apart Research, BlueDot Impact, UCSD, NSF, the Milwaukee Bucks, and others. My recent research interests include AI × bio and AI safety.
            </p>
          </div>
          
        </div>
        
        {/* Divider */}
        <div className="h-[1px] bg-neutral-200"></div>
        
        {/* ESSAY BODY */}
        <div className="font-serif text-[18px] md:text-[19px] leading-[1.9] text-[#1a1a1a] font-normal space-y-7">
          
          <p className="font-medium text-black">To those interested in my philosophy; my "why":</p>
          
          <p>
            Every capability we call intelligence eventually turns inward. A model that can write code can write its own training code. A model that can do research can do research on itself. Once that loop closes, progress stops scaling with the compute we buy and starts scaling with the compute the system decides to spend. We name the result superintelligence, but the mechanism is humbler and more unsettling. It is recursive self-improvement, an optimizer pointed at the optimizer.
          </p>
          
          {/* Blockquote 1 */}
          <div className="py-6 text-center font-garamond italic text-[26px] md:text-[28px] text-black leading-snug">
            "An optimizer pointed at the optimizer."
          </div>
          
          <p>
            Biology is the first domain that loop will touch at full strength. The same models that fold proteins and reason over pathology can propose novel pathogens and bench-test them in silico faster than any institution can answer. AI × bio is not a vertical on a slide. It is where a capability overhang meets the least forgiving consequences, and where a small alignment error is measured in lives.
          </p>
          
          <p>
            So the answer is not to slow the loop. The answer is to make it legible. Mechanistic interpretability is the closest thing we have to a microscope for cognition. Sparse autoencoders pull monosemantic features out of superposition. Linear probes catch a chain of thought lying before it finishes. Unlearning removes a capability instead of hiding it. If a mind is going to improve itself, I want to read what it values while that mind still fits in our hands.
          </p>
          
          {/* Blockquote 2 */}
          <div className="py-6 text-center font-garamond italic text-[26px] md:text-[28px] text-black leading-snug">
            "Read the mind before it learns to read itself."
          </div>
          
          <p>
            Can we understand a system faster than it can surprise us? Today the honest answer is not yet. I think it is the most important problem there is, and I think it is tractable.
          </p>
          
          {/* TL;DR Block */}
          <div className="mt-12 p-6 border-t border-b border-neutral-200 text-[18px] md:text-[19px] text-[#1a1a1a]">
            <strong>TL;DR:</strong> Recursive self-improvement is the precursor to artificial superintelligence. AI x bio & AI safety are problems that compound faster than we can ignore.
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

