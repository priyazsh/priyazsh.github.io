"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: (x?: number, y?: number) => void
}

interface WipeState {
  x: number
  y: number
  fromBg: string
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
})

function getInitialTheme(): Theme {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved === "light" || saved === "dark") return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return "dark"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [wipe, setWipe] = useState<WipeState | null>(null)
  const lockRef = useRef(false)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = useCallback((x?: number, y?: number) => {
    if (lockRef.current) return
    const root = document.documentElement
    const computed = getComputedStyle(root)
    const oldBg = computed.getPropertyValue("--bg").trim()

    const isDark = root.classList.contains("dark")
    const newTheme: Theme = isDark ? "light" : "dark"

    root.classList.toggle("dark")
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (x !== undefined && y !== undefined) {
      lockRef.current = true
      setWipe({ x, y, fromBg: oldBg })
      setTimeout(() => {
        setWipe(null)
        lockRef.current = false
      }, 500)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {wipe && (
        <div
          className="theme-wipe-overlay"
          style={
            {
              "--wipe-x": `${wipe.x}px`,
              "--wipe-y": `${wipe.y}px`,
              backgroundColor: wipe.fromBg,
            } as React.CSSProperties
          }
        />
      )}
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
