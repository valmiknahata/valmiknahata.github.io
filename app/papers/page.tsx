"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

const papers = [
    {
        title: "Attention Is All You Need",
        authors: "Vaswani et al.",
        venue: "NeurIPS 2017",
        analysis: "The death of RNNs and the birth of the parallelizable sequence model.",
        link: "https://arxiv.org/abs/1706.03762"
    },
    {
        title: "Language Models are Few-Shot Learners",
        authors: "Brown et al.",
        venue: "NeurIPS 2020",
        analysis: "GPT-3 and the realization that scale is a quality of its own.",
        link: "https://arxiv.org/abs/2005.14165"
    },
    {
        title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
        authors: "Wei et al.",
        venue: "NeurIPS 2022",
        analysis: "A simple prompting trick that unlocked emergent logical capabilities.",
        link: "https://arxiv.org/abs/2201.11903"
    },
    {
        title: "Training language models to follow instructions with human feedback",
        authors: "Ouyang et al.",
        venue: "NeurIPS 2022",
        analysis: "The core mechanics of RLHF; aligning predicted text with human intent.",
        link: "https://arxiv.org/abs/2203.02155"
    },
    {
        title: "Constitutional AI: Harmlessness from AI Feedback",
        authors: "Bai et al.",
        venue: "Anthropic",
        analysis: "Scalable oversight: using a model to supervise another model's safety.",
        link: "https://arxiv.org/abs/2212.08073"
    },
    {
        title: "Computing Machinery and Intelligence",
        authors: "Alan Turing",
        venue: "Mind (1950)",
        analysis: "The original question: 'Can machines think?' and the imitation game.",
        link: "https://academic.oup.com/mind/article/LIX/236/433/986230"
    },
    {
        title: "A Mathematical Theory of Communication",
        authors: "Claude Shannon",
        venue: "The Bell System Technical Journal (1948)",
        analysis: "Information entropy defined. The bedrock of every bit we transmit.",
        link: "https://ieeexplore.ieee.org/document/6773024"
    },
    {
        title: "Mastering the game of Go with deep neural networks and tree search",
        authors: "Silver et al.",
        venue: "Nature 2016",
        analysis: "AlphaGo and the triumph of MCTS pair with deep reinforcement learning.",
        link: "https://www.nature.com/articles/nature16961"
    },
    {
        title: "Scaling Laws for Neural Language Models",
        authors: "Kaplan et al.",
        venue: "OpenAI",
        analysis: "The empirical predictability of error as compute and data grow.",
        link: "https://arxiv.org/abs/2001.08361"
    },
    {
        title: "Direct Preference Optimization",
        authors: "Rafailov et al.",
        venue: "NeurIPS 2023",
        analysis: "Removing the complex reward model from RLHF for simpler alignment.",
        link: "https://arxiv.org/abs/2305.18290"
    },
    {
        title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        authors: "Devlin et al.",
        venue: "NAACL 2019",
        analysis: "The masked language modeling revolution for context-aware embeddings.",
        link: "https://arxiv.org/abs/1810.04805"
    },
    {
        title: "Deep Residual Learning for Image Recognition",
        authors: "He et al.",
        venue: "CVPR 2016",
        analysis: "ResNets and the identity mapping that enabled training 1000+ layers.",
        link: "https://arxiv.org/abs/1512.03385"
    },
    {
        title: "Generative Adversarial Nets",
        authors: "Goodfellow et al.",
        venue: "NeurIPS 2014",
        analysis: "The zero-sum game that redefined synthetic data generation.",
        link: "https://arxiv.org/abs/1406.2661"
    },
    {
        title: "LoRA: Low-Rank Adaptation of Large Language Models",
        authors: "Hu et al.",
        venue: "ICLR 2022",
        analysis: "Fine-tuning billions of parameters by updating only a tiny fraction.",
        link: "https://arxiv.org/abs/2106.09685"
    },
    {
        title: "Chinchilla: Training Compute-Optimal Large Language Models",
        authors: "Hoffmann et al.",
        venue: "DeepMind",
        analysis: "Challenging the assumption that bigger is always better; data matters.",
        link: "https://arxiv.org/abs/2203.15556"
    },
    {
        title: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models",
        authors: "Yao et al.",
        venue: "NeurIPS 2023",
        analysis: "Enabling models to branch, look ahead, and backtrack during reasoning.",
        link: "https://arxiv.org/abs/2305.10601"
    },
    {
        title: "Voyager: An Open-Ended Embodied Agent with Large Language Models",
        authors: "Wang et al.",
        venue: "ICLR 2024",
        analysis: "Agents that learn continuously in Minecraft through a code-based skill library.",
        link: "https://arxiv.org/abs/2305.16290"
    },
    {
        title: "Self-Instruct: Aligning Language Models with Self-Generated Instructions",
        authors: "Wang et al.",
        venue: "ACL 2023",
        analysis: "Bootstrapping an instruction-tuned model from a raw base model.",
        link: "https://arxiv.org/abs/2212.10560"
    },
    {
        title: "LLaMA: Open and Efficient Foundation Language Models",
        authors: "Touvron et al.",
        venue: "Meta AI",
        analysis: "Democratizing state-of-the-art performance for the open-source community.",
        link: "https://arxiv.org/abs/2302.13971"
    },
    {
        title: "DALL·E: Zero-Shot Text-to-Image Generation",
        authors: "Ramesh et al.",
        venue: "ICML 2021",
        analysis: "Bridging the gap between conceptual text and high-fidelity visuals.",
        link: "https://arxiv.org/abs/2102.12035"
    },
    {
        title: "Reinforcement Learning from Human Feedback",
        authors: "Christiano et al.",
        venue: "NeurIPS 2017",
        analysis: "Teaching a model to backflip using only human preferences.",
        link: "https://arxiv.org/abs/1706.03741"
    },
    {
        title: "Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm",
        authors: "Silver et al.",
        venue: "Science 2018",
        analysis: "AlphaZero and the endgame of superhuman generalized game intelligence.",
        link: "https://www.science.org/doi/10.1126/science.aar6404"
    },
    {
        title: "The Second Law of Thermodynamics",
        authors: "Clausius / Kelvin",
        venue: "Historical",
        analysis: "The inevitable heat death of every system. My favorite physics constraint.",
        link: "https://en.wikipedia.org/wiki/Second_law_of_thermodynamics"
    },
    {
        title: "Bitter Lesson",
        authors: "Rich Sutton",
        venue: "Essay (2019)",
        analysis: "The hard truth: compute-heavy methods eventually crush human-engineered cleverness.",
        link: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
    },
    {
        title: "ImageNet Classification with Deep Convolutional Neural Networks",
        authors: "Krizhevsky et al.",
        venue: "NeurIPS 2012",
        analysis: "AlexNet: The Big Bang of the modern deep learning era.",
        link: "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf"
    }
];

export default function ResearchPapersPage() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [currentTime, setCurrentTime] = useState<string>("")
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

    // Sync with localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') setIsDarkMode(true)
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

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

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => {
            const newSet = new Set(prev)
            newSet.add(index)
            return newSet
        })
    }

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col bg-[#f7f5f3] dark:bg-black transition-colors duration-300 font-serif text-[18px]">
            <div
                className={`w-full p-6 md:p-12 relative z-10 min-h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-[#f7f5f3] text-[#141414]"}`}
            >
                <div className="w-full max-w-[1600px] mx-auto">
                    {/* Unified Top Header Line */}
                    <div className="flex flex-row justify-between items-center mb-16 text-[13px] min-[400px]:text-[15px] font-medium leading-none w-full relative">
                        {/* Left: Home Arrow */}
                        <Link href="/" className={`${isDarkMode ? "text-white" : "text-black"} z-10 hover:opacity-70 transition-opacity flex items-center gap-2 uppercase tracking-[0.1em] min-[400px]:tracking-widest`}>
                            <ArrowLeft size={16} strokeWidth={2.5} />
                            <span>Home</span>
                        </Link>

                        {/* Center: PST Time */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">
                            <div suppressHydrationWarning className={`${isDarkMode ? "text-white" : "text-black"} uppercase tracking-[0.1em] min-[400px]:tracking-widest whitespace-nowrap`}>PST {currentTime}</div>
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

                    <div className="mb-8">
                        <div className="opacity-40 mb-12 uppercase tracking-widest text-[15px] font-medium">Favorite Papers</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {papers.map((paper, idx) => (
                                <a
                                    key={idx}
                                    href={paper.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col gap-4"
                                >
                                    {/* Preview Image Card */}
                                    <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-sm border ${isDarkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-100"} transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg`}>
                                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${loadedImages.has(idx) ? 'opacity-0' : 'opacity-100'}`}>
                                            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin opacity-20"></div>
                                        </div>
                                        <img
                                            src={`https://api.microlink.io/?url=${encodeURIComponent(paper.link)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720&waitFor=2000&waitUntil=networkidle2`}
                                            alt={paper.title}
                                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isDarkMode ? "opacity-80 group-hover:opacity-100" : "opacity-90 group-hover:opacity-100"} grayscale group-hover:grayscale-0 ${loadedImages.has(idx) ? 'opacity-100' : 'opacity-0'}`}
                                            onLoad={() => handleImageLoad(idx)}
                                            loading="lazy"
                                        />
                                        <div className={`absolute inset-0 ring-1 ring-inset ${isDarkMode ? "ring-white/5" : "ring-black/5"} pointer-events-none`}></div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-start gap-3">
                                            <div className="font-bold text-[18px] leading-snug group-hover:underline decoration-1 underline-offset-2 transition-all">
                                                {paper.title}
                                            </div>
                                            <div className="opacity-30 text-[12px] uppercase tracking-tighter shrink-0 tabular-nums mt-1">
                                                #{String(idx + 1).padStart(2, '0')}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="text-[14px] opacity-60 italic">
                                                {paper.authors}
                                            </div>
                                            <div className="text-[12px] opacity-40 uppercase tracking-wider">
                                                {paper.venue}
                                            </div>
                                        </div>

                                        {/* Optional: Analysis matches the "more thought out" requirement */}
                                        <div className="text-[14px] leading-relaxed opacity-60 mt-2 line-clamp-3 group-hover:opacity-90 transition-opacity">
                                            {paper.analysis}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="h-12"></div>
                </div>
            </div>
        </div>
    )
}
