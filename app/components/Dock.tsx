"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { Layers, NotebookText, MessageCircle } from "lucide-react"

function HomeIcon({ size }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function SunIcon({ size }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon({ size }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

const BASE = 38
const HOVER = 56
const MAGNETIC_RANGE = 120

const dockItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/blog", label: "Blog", icon: NotebookText },
  { href: "/projects", label: "Projects", icon: Layers },
  { href: "/contact", label: "Contact", icon: MessageCircle },
]

function DockItem({ item, mouseX }: { item: typeof dockItems[number]; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const pathname = usePathname()
  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return MAGNETIC_RANGE
    return val - rect.x - rect.width / 2
  })

  const sizeSpring = useSpring(
    useTransform(distance, [-MAGNETIC_RANGE, 0, MAGNETIC_RANGE], [BASE, HOVER, BASE]),
    { mass: 0.1, stiffness: 180, damping: 14 }
  )

  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      className="dock-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: sizeSpring, height: sizeSpring }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="dock-tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.12 }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      <Link
        href={item.href}
        className="dock-icon-btn"
        aria-label={item.label}
        style={{
          backgroundColor: isActive ? "var(--bg-hover)" : "transparent",
          color: isActive ? "var(--text)" : "var(--text-secondary)",
        }}
      >
        <Icon size={18} />
      </Link>

      {isActive && (
        <motion.span
          className="dock-indicator"
          layoutId="dock-indicator"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.div>
  )
}

function ThemeToggle({ mouseX }: { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return MAGNETIC_RANGE
    return val - rect.x - rect.width / 2
  })

  const sizeSpring = useSpring(
    useTransform(distance, [-MAGNETIC_RANGE, 0, MAGNETIC_RANGE], [BASE, HOVER, BASE]),
    { mass: 0.1, stiffness: 180, damping: 14 }
  )

  return (
    <motion.div
      ref={ref}
      className="dock-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: sizeSpring, height: sizeSpring }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="dock-tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.12 }}
          >
            {theme === "dark" ? "Light" : "Dark"} mode
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="dock-icon-btn"
        onClick={(e) => {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
          toggleTheme(rect.x + rect.width / 2, rect.y + rect.height / 2)
        }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        whileTap={{ scale: 0.85, rotate: 15 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        style={{ color: "var(--text-secondary)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <div className="dock-container">
      <motion.nav
        className="dock"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          mouseX.set(touch.pageX);
        }}
        onTouchEnd={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
      >
        {dockItems.map((item) => (
          <DockItem key={item.href} item={item} mouseX={mouseX} />
        ))}
        <div className="dock-divider" />
        <ThemeToggle mouseX={mouseX} />
      </motion.nav>
    </div>
  )
}
