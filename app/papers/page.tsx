"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

const papers = [
    {
        title: "Attention Is All You Need",
        authors: "Vaswani et al.",
        venue: "NeurIPS",
        analysis: "The death of RNNs and the birth of the parallelizable sequence model.",
        link: "https://arxiv.org/abs/1706.03762"
    },
    {
        title: "Language Models are Few-Shot Learners",
        authors: "Brown et al.",
        venue: "NeurIPS",
        analysis: "GPT-3 and the realization that scale is a quality of its own.",
        link: "https://arxiv.org/abs/2005.14165"
    },
    {
        title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
        authors: "Wei et al.",
        venue: "NeurIPS",
        analysis: "A simple prompting trick that unlocked emergent logical capabilities.",
        link: "https://arxiv.org/abs/2201.11903"
    },
    {
        title: "Training language models to follow instructions with human feedback",
        authors: "Ouyang et al.",
        venue: "NeurIPS",
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
        venue: "Mind",
        analysis: "The original question: 'Can machines think?' and the imitation game.",
        link: "https://academic.oup.com/mind/article/LIX/236/433/986230"
    },
    {
        title: "A Mathematical Theory of Communication",
        authors: "Claude Shannon",
        venue: "The Bell System Technical Journal",
        analysis: "Information entropy defined. The bedrock of every bit we transmit.",
        link: "https://ieeexplore.ieee.org/document/6773024"
    },
    {
        title: "Mastering the game of Go with deep neural networks and tree search",
        authors: "Silver et al.",
        venue: "Nature",
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
        venue: "NeurIPS",
        analysis: "Removing the complex reward model from RLHF for simpler alignment.",
        link: "https://arxiv.org/abs/2305.18290"
    },
    {
        title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        authors: "Devlin et al.",
        venue: "NAACL",
        analysis: "The masked language modeling revolution for context-aware embeddings.",
        link: "https://arxiv.org/abs/1810.04805"
    },
    {
        title: "Deep Residual Learning for Image Recognition",
        authors: "He et al.",
        venue: "CVPR",
        analysis: "ResNets and the identity mapping that enabled training 1000+ layers.",
        link: "https://arxiv.org/abs/1512.03385"
    },
    {
        title: "Generative Adversarial Nets",
        authors: "Goodfellow et al.",
        venue: "NeurIPS",
        analysis: "The zero-sum game that redefined synthetic data generation.",
        link: "https://arxiv.org/abs/1406.2661"
    },
    {
        title: "LoRA: Low-Rank Adaptation of Large Language Models",
        authors: "Hu et al.",
        venue: "ICLR",
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
        venue: "NeurIPS",
        analysis: "Enabling models to branch, look ahead, and backtrack during reasoning.",
        link: "https://arxiv.org/abs/2305.10601"
    },
    {
        title: "Voyager: An Open-Ended Embodied Agent with Large Language Models",
        authors: "Wang et al.",
        venue: "ICLR",
        analysis: "Agents that learn continuously in Minecraft through a code-based skill library.",
        link: "https://arxiv.org/abs/2305.16290"
    },
    {
        title: "Self-Instruct: Aligning Language Models with Self-Generated Instructions",
        authors: "Wang et al.",
        venue: "ACL",
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
        venue: "ICML",
        analysis: "Bridging the gap between conceptual text and high-fidelity visuals.",
        link: "https://arxiv.org/abs/2102.12035"
    },
    {
        title: "Reinforcement Learning from Human Feedback",
        authors: "Christiano et al.",
        venue: "NeurIPS",
        analysis: "Teaching a model to backflip using only human preferences.",
        link: "https://arxiv.org/abs/1706.03741"
    },
    {
        title: "Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm",
        authors: "Silver et al.",
        venue: "Science",
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
        venue: "Essay",
        analysis: "The hard truth: compute-heavy methods eventually crush human-engineered cleverness.",
        link: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
    },
    {
        title: "ImageNet Classification with Deep Convolutional Neural Networks",
        authors: "Krizhevsky et al.",
        venue: "NeurIPS",
        analysis: "AlexNet: The Big Bang of the modern deep learning era.",
        link: "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf"
    }
];

export default function ResearchPapersPage() {
    const isDarkMode = false;
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())


    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => {
            const newSet = new Set(prev)
            newSet.add(index)
            return newSet
        })
    }

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col bg-white dark:bg-black transition-colors duration-300 font-serif text-[16px]">
            <div
                className={`w-full p-6 md:p-12 relative z-10 min-h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-white text-[#141414]"}`}
            >
                <div className="w-full max-w-[1600px] mx-auto">
                    <div className="flex flex-row justify-between items-center mb-16 text-[16px] font-normal leading-snug w-full relative">
                        {/* Left: Home Arrow */}
                        <Link href="/" className="text-black z-10 hover:opacity-70 transition-opacity flex items-center gap-2">
                            <ArrowLeft size={16} strokeWidth={2.5} />
                            <span>Home</span>
                        </Link>
                    </div>

                    <div className="mb-8">
                        <div className="mb-12 text-[16px] font-normal">Favorite Papers</div>
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
                                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${loadedImages.has(idx) ? 'opacity-100' : 'opacity-0'}`}
                                            onLoad={() => handleImageLoad(idx)}
                                            loading="lazy"
                                        />
                                        <div className={`absolute inset-0 ring-1 ring-inset ${isDarkMode ? "ring-white/5" : "ring-black/5"} pointer-events-none`}></div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between items-start gap-3">
                                            <div className="text-[16px] leading-snug group-hover:underline decoration-1 underline-offset-2 transition-all">
                                                {paper.title}
                                            </div>
                                            <div className="text-[16px] shrink-0 tabular-nums mt-1">
                                                #{String(idx + 1).padStart(2, '0')}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="text-[16px]">
                                                {paper.authors}
                                            </div>
                                            <div className="text-[16px]">
                                                {paper.venue}
                                            </div>
                                        </div>

                                        <div className="text-[16px] leading-snug mt-2 line-clamp-3 transition-opacity">
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
