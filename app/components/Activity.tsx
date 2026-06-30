"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface DayData {
  date: string
  count: number
  level: number
}

interface WeekData {
  month: string
  days: (DayData | null)[]
}

const LEVEL_COLORS_LIGHT = ["#EAEAEA", "#C6C6C6", "#888888", "#4A4A4A", "#1A1A1A"]
const LEVEL_COLORS_DARK = ["#1F1F1F", "#333333", "#555555", "#888888", "#C8C8C8"]

function getLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 10) return 3
  return 4
}

function organizeIntoGrid(contributions: { date: string; contributionCount: number }[]): { weeks: WeekData[]; total: number } {
  if (contributions.length === 0) return { weeks: [], total: 0 }

  let total = 0
  const dateMap = new Map<string, number>()

  for (const c of contributions) {
    dateMap.set(c.date, c.contributionCount)
    total += c.contributionCount
  }

  const dates = Object.keys(Object.fromEntries(dateMap)).sort()
  const firstDate = new Date(dates[0])
  const lastDate = new Date(dates[dates.length - 1])

  const start = new Date(firstDate)
  start.setDate(start.getDate() - start.getDay())

  const weeks: WeekData[] = []
  const current = new Date(start)

  while (current <= lastDate) {
    const days: (DayData | null)[] = []

    for (let d = 0; d < 7; d++) {
      const date = new Date(current)
      date.setDate(date.getDate() + d)
      const dateStr = date.toISOString().split("T")[0]
      const count = dateMap.get(dateStr)

      if (count !== undefined) {
        days.push({ date: dateStr, count, level: getLevel(count) })
      } else {
        days.push(null)
      }
    }

    const firstDay = days.find((d) => d !== null)
    let month = ""
    if (firstDay) {
      month = new Date(firstDay.date + "T00:00:00").toLocaleString("default", { month: "short" })
    }

    weeks.push({ month, days })
    current.setDate(current.getDate() + 7)
  }

  return { weeks, total }
}

function Skeleton() {
  return (
    <div className="flex gap-1 min-w-fit">
      {Array.from({ length: 52 }, (_, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {Array.from({ length: 7 }, (_, di) => (
            <div
              key={`${wi}-${di}`}
              className="rounded-[3px] skeleton"
              style={{ width: 14, height: 14 }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Activity() {
  const [weeks, setWeeks] = useState<WeekData[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(
          "https://github-contributions-api.deno.dev/priyazsh.json?flat=true"
        )
        const j = await r.json()
        const { weeks } = organizeIntoGrid(j.contributions)
        setWeeks(weeks)
        setTotal(j.totalContributions)
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (scrollRef.current && !loading) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [weeks, loading])

  const isDark = useCallback(() => {
    if (typeof document === "undefined") return false
    return document.documentElement.classList.contains("dark")
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const date = target.getAttribute("data-date")
    const count = target.getAttribute("data-count")
    if (!date || count === null) {
      setTooltip(null)
      return
    }
    setTooltip({
      date,
      count: Number(count),
      x: e.clientX,
      y: e.clientY - 40,
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`mt-8 sm:mt-12 md:mt-16 stagger-item ${visible ? "visible" : ""}`}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-5">
        <p className="section-header">GitHub Activity</p>
        <p className="text-[10px] sm:text-xs text-tertiary font-mono">
          {total !== null ? total.toLocaleString() : "..."} contributions
        </p>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto pb-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
        style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
      >
        {loading ? (
          <Skeleton />
        ) : (
          <div className="flex gap-[3px] min-w-fit">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.days.map((day, di) => {
                  const level = day?.level ?? 0
                  const colors = isDark() ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT
                  const color = colors[level]

                  return (
                    <div
                      key={`${wi}-${di}`}
                      className="rounded-[3px]"
                      data-date={day?.date}
                      data-count={day?.count}
                      style={{
                        width: 13,
                        height: 13,
                        backgroundColor: color,
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 rounded-lg text-xs pointer-events-none whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""} on {tooltip.date}
        </div>
      )}
    </section>
  )
}
