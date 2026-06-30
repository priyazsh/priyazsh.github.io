"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`"
const FRAMES = [
  "  _  _    ___  _  _  \n | || |  / _ \\| || | \n | || |_| | | | || |_\n |__   _| | | |__   _|\n    | | | |_| |  | |  \n    |_|  \\___/   |_|  ",
  "  _  _    ___  _  _  \n | || |  / _ \\| || | \n | || |_| | | | || |_\n |__   _| | | |__   _|\n    | | | |_| |  | |  \n    |_|  \\___/   |_|  ",
]

export default function NotFound() {
  const [ascii, setAscii] = useState(FRAMES[0])
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      const base = FRAMES[0]
      let glitched = ""
      for (let i = 0; i < base.length; i++) {
        if (base[i] === "\n" || base[i] === " ") {
          glitched += base[i]
        } else if (Math.random() < 0.3) {
          glitched += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        } else {
          glitched += base[i]
        }
      }
      setAscii(glitched)

      setTimeout(() => {
        setAscii(FRAMES[0])
        setGlitching(false)
      }, 150)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <pre
        className="font-mono text-xs sm:text-sm leading-tight select-none transition-colors duration-100"
        style={{ color: glitching ? "var(--text-tertiary)" : "var(--text)" }}
      >
        {ascii}
      </pre>
      <p className="text-secondary text-base mt-2">This page drifted into the void</p>
      <Link href="/" className="btn-ghost">
        Take me home
      </Link>
    </div>
  )
}
