"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const books = [
    { title: "Surely You're Joking, Mr. Feynman!", author: "Richard Feynman", analysis: "Safe-cracking and bongo-playing used as a rigorous method for existence.", link: "https://en.wikipedia.org/wiki/Surely_You%27re_Joking,_Mr._Feynman!" },
    { title: "The Character of Physical Law", author: "Richard Feynman", analysis: "Proof that if you can't explain it simply, you don't understand it.", link: "https://en.wikipedia.org/wiki/The_Character_of_Physical_Law" },
    { title: "Eragon", author: "Christopher Paolini", analysis: "A primer on why names carry weight and grammar defines reality.", link: "https://en.wikipedia.org/wiki/Eragon" },
    { title: "Eldest", author: "Christopher Paolini", analysis: "Wisdom is expensive; Paolini makes the hero pay in blood and ink.", link: "https://en.wikipedia.org/wiki/Eldest" },
    { title: "Brisingr", author: "Christopher Paolini", analysis: "The technicality of a rider's blade and the slow erosion of innocence.", link: "https://en.wikipedia.org/wiki/Brisingr" },
    { title: "Inheritance", author: "Christopher Paolini", analysis: "Political realism dressed in dragon scales.", link: "https://en.wikipedia.org/wiki/Inheritance_(Paolini_novel)" },
    { title: "The Da Vinci Code", author: "Dan Brown", analysis: "A high-speed chase through the history of a profitable lie.", link: "https://en.wikipedia.org/wiki/The_Da_Vinci_Code" },
    { title: "Angels & Demons", author: "Dan Brown", analysis: "Antimatter at CERN meets the ancient smoke of the Vatican.", link: "https://en.wikipedia.org/wiki/Angels_%26_Demons" },
    { title: "The Lost Symbol", author: "Dan Brown", analysis: "The latent power of thought hidden in DC's Masonic architecture.", link: "https://en.wikipedia.org/wiki/The_Lost_Symbol" },
    { title: "Inferno", author: "Dan Brown", analysis: "A biologist's solution to a crowded world. He had a point.", link: "https://en.wikipedia.org/wiki/Inferno_(Brown_novel)" },
    { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", analysis: "A philologist's map of where fear hides in the deep woods.", link: "https://en.wikipedia.org/wiki/The_Fellowship_of_the_Ring" },
    { title: "The Two Towers", author: "J.R.R. Tolkien", analysis: "Resilience is found on the stairs of Cirith Ungol, not in the songs.", link: "https://en.wikipedia.org/wiki/The_Two_Towers" },
    { title: "The Return of the King", author: "J.R.R. Tolkien", analysis: "Victory means leaving a piece of yourself at the Black Gate.", link: "https://en.wikipedia.org/wiki/The_Return_of_the_King" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", analysis: "The greed of dragons vs. the charm of a comfortable hole.", link: "https://en.wikipedia.org/wiki/The_Hobbit" },
    { title: "The Silmarillion", author: "J.R.R. Tolkien", analysis: "The Old Testament of Middle-earth. Feanor was right.", link: "https://en.wikipedia.org/wiki/The_Silmarillion" },
    { title: "Stories of Your Life and Others", author: "Ted Chiang", analysis: "Grief modeled through Fermat's Principle of Least Time.", link: "https://en.wikipedia.org/wiki/Stories_of_Your_Life_and_Others" },
    { title: "Exhalation", author: "Ted Chiang", analysis: "Philosophical thought experiments disguised as clockwork sci-fi.", link: "https://en.wikipedia.org/wiki/Exhalation:_Stories" },
    { title: "Ficciones", author: "Jorge Luis Borges", analysis: "Infinite libraries and the architecture of the impossible.", link: "https://en.wikipedia.org/wiki/Ficciones" },
    { title: "The Aleph", author: "Jorge Luis Borges", analysis: "A point in space containing all other points. Latent space, 1945.", link: "https://en.wikipedia.org/wiki/The_Aleph_(short_story_collection)" },
    { title: "Labyrinths", author: "Jorge Luis Borges", analysis: "Information as a virus that eventually overwrites our reality.", link: "https://en.wikipedia.org/wiki/Labyrinths_(short_story_collection)" },
    { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", analysis: "A strange loop of logic, art, and music. The AI bible.", link: "https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach" },
    { title: "Superintelligence", author: "Nick Bostrom", analysis: "Objective functions don't care about your feelings.", link: "https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies" },
    { title: "The Alignment Problem", author: "Brian Christian", analysis: "Encoding human values into bits is our hardest engineering bug.", link: "https://en.wikipedia.org/wiki/The_Alignment_Problem" },
    { title: "Life 3.0", author: "Max Tegmark", analysis: "The inevitable transition from carbon to silicon intelligence.", link: "https://en.wikipedia.org/wiki/Life_3.0" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", analysis: "Proof that our intuition is mostly a consistent hallucination.", link: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow" },
    { title: "Man's Search for Meaning", author: "Viktor Frankl", analysis: "Purpose is the only thing the world cannot strip away.", link: "https://en.wikipedia.org/wiki/Man%27s_Search_for_Meaning" },
    { title: "Dune", author: "Frank Herbert", analysis: "Religion and ecology weaponized into a single organism.", link: "https://en.wikipedia.org/wiki/Dune_(novel)" },
    { title: "Foundation", author: "Isaac Asimov", analysis: "Data science for empires. Hari Seldon's dream.", link: "https://en.wikipedia.org/wiki/Foundation_(Asimov_novel)" },
    { title: "The Three-Body Problem", author: "Cixin Liu", analysis: "Advanced physics paired with terrifying cosmic indifference.", link: "https://en.wikipedia.org/wiki/The_Three-Body_Problem_(novel)" },
    { title: "The Dark Forest", author: "Cixin Liu", analysis: "The Fermi Paradox solved with a single gunshot.", link: "https://en.wikipedia.org/wiki/The_Dark_Forest" },
    { title: "Death's End", author: "Cixin Liu", analysis: "Scaling from a single life up to the heat death of reality.", link: "https://en.wikipedia.org/wiki/Death%27s_End" },
    { title: "The Martian", author: "Andy Weir", analysis: "The scientific method used as a survival strategy.", link: "https://en.wikipedia.org/wiki/The_Martian_(Weir_novel)" },
    { title: "Project Hail Mary", author: "Andy Weir", analysis: "The pure joy of collaborative discovery across species.", link: "https://en.wikipedia.org/wiki/Project_Hail_Mary" },
    { title: "Brave New World", author: "Aldous Huxley", analysis: "Soma is the ultimate leash for a comfortable society.", link: "https://en.wikipedia.org/wiki/Brave_New_World" },
    { title: "1984", author: "George Orwell", analysis: "If you control the words, you control the thoughts.", link: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four" },
    { title: "Meditations", author: "Marcus Aurelius", analysis: "A cosmic perspective for the modern researcher.", link: "https://en.wikipedia.org/wiki/Meditations" },
    { title: "The Prince", author: "Niccolò Machiavelli", analysis: "A survival manual for those who want real-world leverage.", link: "https://en.wikipedia.org/wiki/The_Prince" },
    { title: "The Art of War", author: "Sun Tzu", analysis: "Winning without fighting; the highest form of logic.", link: "https://en.wikipedia.org/wiki/The_Art_of_War" }
];

export default function BooksPage() {
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
                        <div className="opacity-40 mb-12 uppercase tracking-widest text-[15px] font-medium">Favorite Books</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {books.map((book, idx) => (
                                <a
                                    key={idx}
                                    href={book.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col gap-4"
                                >
                                    {/* Preview Image Card - Book Aspect Ratio */}
                                    <div className={`relative w-full aspect-[2/3] overflow-hidden rounded-sm border ${isDarkMode ? "border-zinc-800 bg-zinc-900" : "border-zinc-200 bg-zinc-100"} transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg`}>
                                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${loadedImages.has(idx) ? 'opacity-0' : 'opacity-100'}`}>
                                            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin opacity-20"></div>
                                        </div>
                                        <img
                                            src={`https://api.microlink.io/?url=${encodeURIComponent(book.link)}&embed=image.url`}
                                            alt={book.title}
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
                                                {book.title}
                                            </div>
                                            <div className="opacity-30 text-[12px] uppercase tracking-tighter shrink-0 tabular-nums mt-1">
                                                #{String(idx + 1).padStart(2, '0')}
                                            </div>
                                        </div>

                                        <div className="text-[15px] opacity-60 italic">
                                            {book.author}
                                        </div>

                                        {/* Optional: Analysis matches the "more thought out" requirement */}
                                        <div className="text-[14px] leading-relaxed opacity-60 mt-2 line-clamp-3 group-hover:opacity-90 transition-opacity">
                                            {book.analysis}
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
