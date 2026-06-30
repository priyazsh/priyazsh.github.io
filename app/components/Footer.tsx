"use client"
import { useState, useEffect } from "react";
import quotes from "@/DB/quotes.json";

interface Quote {
  text: string
  author: string
}

export default function Footer() {
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <footer className="mt-10 sm:mt-16 md:mt-20">
      <div className="pt-6 sm:pt-8 pb-4 sm:pb-6 border-t text-center" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-lg mx-auto">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-2 sm:mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--text-secondary)", opacity: 0.35 }}>
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
          <p className="text-sm sm:text-base text-tertiary leading-relaxed italic">
            &ldquo;{quote?.text}&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-tertiary/60 mt-1.5 sm:mt-2 not-italic">&mdash; {quote?.author}</p>
        </div>
      </div>
    </footer>
  );
}
