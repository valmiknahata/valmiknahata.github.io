"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const books = [
    { title: "Surely You're Joking, Mr. Feynman!", author: "Richard Feynman", analysis: "Safe-cracking and bongo-playing used as a rigorous method for existence." },
    { title: "The Character of Physical Law", author: "Richard Feynman", analysis: "Proof that if you can't explain it simply, you don't understand it." },
    { title: "Eragon", author: "Christopher Paolini", analysis: "A primer on why names carry weight and grammar defines reality." },
    { title: "Eldest", author: "Christopher Paolini", analysis: "Wisdom is expensive; Paolini makes the hero pay in blood and ink." },
    { title: "Brisingr", author: "Christopher Paolini", analysis: "The technicality of a rider's blade and the slow erosion of innocence." },
    { title: "Inheritance", author: "Christopher Paolini", analysis: "Political realism dressed in dragon scales." },
    { title: "The Da Vinci Code", author: "Dan Brown", analysis: "A high-speed chase through the history of a profitable lie." },
    { title: "Angels & Demons", author: "Dan Brown", analysis: "Antimatter at CERN meets the ancient smoke of the Vatican." },
    { title: "The Lost Symbol", author: "Dan Brown", analysis: "The latent power of thought hidden in DC's Masonic architecture." },
    { title: "Inferno", author: "Dan Brown", analysis: "A biologist's solution to a crowded world. He had a point." },
    { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", analysis: "A philologist's map of where fear hides in the deep woods." },
    { title: "The Two Towers", author: "J.R.R. Tolkien", analysis: "Resilience is found on the stairs of Cirith Ungol, not in the songs." },
    { title: "The Return of the King", author: "J.R.R. Tolkien", analysis: "Victory means leaving a piece of yourself at the Black Gate." },
    { title: "The Hobbit", author: "J.R.R. Tolkien", analysis: "The greed of dragons vs. the charm of a comfortable hole." },
    { title: "The Silmarillion", author: "J.R.R. Tolkien", analysis: "The Old Testament of Middle-earth. Feanor was right." },
    { title: "Stories of Your Life and Others", author: "Ted Chiang", analysis: "Grief modeled through Fermat's Principle of Least Time." },
    { title: "Exhalation", author: "Ted Chiang", analysis: "Philosophical thought experiments disguised as clockwork sci-fi." },
    { title: "Ficciones", author: "Jorge Luis Borges", analysis: "Infinite libraries and the architecture of the impossible." },
    { title: "The Aleph", author: "Jorge Luis Borges", analysis: "A point in space containing all other points. Latent space, 1945." },
    { title: "Labyrinths", author: "Jorge Luis Borges", analysis: "Information as a virus that eventually overwrites our reality." },
    { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", analysis: "A strange loop of logic, art, and music. The AI bible." },
    { title: "Superintelligence", author: "Nick Bostrom", analysis: "Objective functions don't care about your feelings." },
    { title: "The Alignment Problem", author: "Brian Christian", analysis: "Encoding human values into bits is our hardest engineering bug." },
    { title: "Life 3.0", author: "Max Tegmark", analysis: "The inevitable transition from carbon to silicon intelligence." },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", analysis: "Proof that our intuition is mostly a consistent hallucination." },
    { title: "Man's Search for Meaning", author: "Viktor Frankl", analysis: "Purpose is the only thing the world cannot strip away." },
    { title: "Dune", author: "Frank Herbert", analysis: "Religion and ecology weaponized into a single organism." },
    { title: "Foundation", author: "Isaac Asimov", analysis: "Data science for empires. Hari Seldon's dream." },
    { title: "The Three-Body Problem", author: "Cixin Liu", analysis: "Advanced physics paired with terrifying cosmic indifference." },
    { title: "The Dark Forest", author: "Cixin Liu", analysis: "The Fermi Paradox solved with a single gunshot." },
    { title: "Death's End", author: "Cixin Liu", analysis: "Scaling from a single life up to the heat death of reality." },
    { title: "The Martian", author: "Andy Weir", analysis: "The scientific method used as a survival strategy." },
    { title: "Project Hail Mary", author: "Andy Weir", analysis: "The pure joy of collaborative discovery across species." },
    { title: "Brave New World", author: "Aldous Huxley", analysis: "Soma is the ultimate leash for a comfortable society." },
    { title: "1984", author: "George Orwell", analysis: "If you control the words, you control the thoughts." },
    { title: "Meditations", author: "Marcus Aurelius", analysis: "A cosmic perspective for the modern researcher." },
    { title: "The Prince", author: "Niccolò Machiavelli", analysis: "A survival manual for those who want real-world leverage." },
    { title: "The Art of War", author: "Sun Tzu", analysis: "Winning without fighting; the highest form of logic." }
];

export default function BooksPage() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [currentTime, setCurrentTime] = useState<string>("")

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

    return (
        <div className="relative min-h-screen overflow-hidden flex flex-col bg-[#f7f5f3] dark:bg-black transition-colors duration-300 font-serif text-[18px]">
            <div
                className={`w-full p-6 md:p-16 relative z-10 min-h-screen overflow-y-auto hide-scrollbar ${isDarkMode ? "bg-black text-[#ededed]" : "bg-[#f7f5f3] text-[#141414]"}`}
            >
                <div className="max-w-3xl mx-auto">
                    {/* Unified Top Header Line */}
                    <div className="flex flex-row justify-between items-center mb-12 text-[13px] min-[400px]:text-[15px] font-medium leading-none w-full relative">
                        {/* Left: Back Arrow */}
                        <Link href="/" className={`${isDarkMode ? "text-white" : "text-black"} z-10 hover:opacity-70 transition-opacity flex items-center gap-2 uppercase tracking-[0.1em] min-[400px]:tracking-widest`}>
                            <ArrowLeft size={16} strokeWidth={2.5} />
                            <span>Home</span>
                        </Link>

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

                    <div className="mb-14">
                        <div className="opacity-40 mb-8 uppercase tracking-widest text-[15px] font-medium">Favorite Books</div>
                        <div className="space-y-8 opacity-85">
                            {books.map((book, idx) => (
                                <div key={idx} className="border-b border-zinc-500/10 pb-6 group">
                                    <div className="flex flex-col gap-1 mb-2">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="font-bold text-[20px] leading-tight group-hover:opacity-80 transition-opacity">
                                                {book.title}
                                            </div>
                                            <div className="opacity-30 text-[13px] uppercase tracking-tighter shrink-0 tabular-nums">#{idx + 1}</div>
                                        </div>
                                        <div className="text-[15px] opacity-60 italic">
                                            {book.author}
                                        </div>
                                    </div>
                                    <div className="text-[17px] leading-relaxed opacity-70">
                                        {book.analysis}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-12"></div>
                </div>
            </div>
        </div>
    )
}
