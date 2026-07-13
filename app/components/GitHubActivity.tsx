"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const API_URL =
  "https://github-contributions-api.deno.dev/priyazsh.json?flat=true";

interface DayData {
  date: string;
  count: number;
}

interface ApiResponse {
  contributions: { date: string; contributionCount: number }[];
  totalContributions: number;
}

const TIER_COLORS = [
  "var(--heatmap-0)",
  "var(--heatmap-1)",
  "var(--heatmap-2)",
  "var(--heatmap-3)",
];

const MONTH_SHORT = [
  "jan","feb","mar","apr","may","jun",
  "jul","aug","sep","oct","nov","dec",
];

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${MONTH_SHORT[parseInt(m) - 1]} ${y.slice(2)}`;
}

function organizeIntoWeeks(
  contributions: { date: string; contributionCount: number }[]
): { weeks: DayData[][]; min: number; max: number } {
  if (contributions.length === 0) return { weeks: [], min: 0, max: 0 };

  const dateMap = new Map<string, number>();
  let min = Infinity;
  let max = -Infinity;

  for (const c of contributions) {
    dateMap.set(c.date, c.contributionCount);
    if (c.contributionCount > 0) {
      if (c.contributionCount < min) min = c.contributionCount;
      if (c.contributionCount > max) max = c.contributionCount;
    }
  }

  if (min === Infinity) min = 0;
  if (max === -Infinity) max = 0;

  const dates = Array.from(dateMap.keys()).sort();
  const firstDate = new Date(dates[0] + "T00:00:00");
  const lastDate = new Date(dates[dates.length - 1] + "T00:00:00");

  const start = new Date(firstDate);
  start.setDate(start.getDate() - start.getDay());

  const weeks: DayData[][] = [];
  const current = new Date(start);

  while (current <= lastDate) {
    const week: DayData[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(current);
      date.setDate(date.getDate() + d);
      const dateStr = date.toISOString().slice(0, 10);
      const count = dateMap.get(dateStr) ?? 0;
      week.push({ date: dateStr, count });
    }
    weeks.push(week);
    current.setDate(current.getDate() + 7);
  }

  return { weeks, min, max };
}

function tierColor(count: number, min: number, max: number): string {
  if (count === 0) return TIER_COLORS[0];
  if (max === min) return TIER_COLORS[1];
  const ratio = (count - min) / (max - min);
  if (ratio <= 0.33) return TIER_COLORS[1];
  if (ratio <= 0.66) return TIER_COLORS[2];
  return TIER_COLORS[3];
}

function getMonthPositions(
  weeks: DayData[][]
): { name: string; col: number }[] {
  const positions: { name: string; col: number }[] = [];
  let lastMonth = -1;
  for (let i = 0; i < weeks.length; i++) {
    const first = weeks[i][0];
    if (!first) continue;
    const month = new Date(first.date + "T00:00:00").getMonth();
    if (month !== lastMonth) {
      positions.push({
        name: new Date(first.date + "T00:00:00").toLocaleString("en", {
          month: "short",
        }),
        col: i,
      });
      lastMonth = month;
    }
  }
  return positions;
}

const EMPTY_WEEKS: DayData[][] = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, (_, d) => ({
    date: `2000-01-0${(d % 9) + 1}`,
    count: 0,
  }))
);

export default function GitHubActivity() {
  const [raw, setRaw] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCell, setActiveCell] = useState<{
    week: number;
    day: number;
    x: number;
    y: number;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((json: ApiResponse) => {
        setRaw(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const weeks = useMemo(
    () => (raw ? organizeIntoWeeks(raw.contributions).weeks : EMPTY_WEEKS),
    [raw]
  );

  const { min, max } = useMemo(
    () => (raw ? organizeIntoWeeks(raw.contributions) : { min: 0, max: 0 }),
    [raw]
  );

  const months = useMemo(() => getMonthPositions(weeks), [weeks]);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (scrollRef.current && !loading) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, weeks]);

  // Close tooltip on outside tap/click (mobile + desktop)
  useEffect(() => {
    if (!activeCell) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setActiveCell(null);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [activeCell]);

  const handleCellEnter = useCallback(
    (e: React.MouseEvent, wi: number, di: number) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setActiveCell({ week: wi, day: di, x: rect.left + rect.width / 2, y: rect.top });
    },
    []
  );

  const handleCellLeave = useCallback(() => {
    setActiveCell(null);
  }, []);

  const handleCellTap = useCallback(
    (e: React.TouchEvent, wi: number, di: number) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const pos = { week: wi, day: di, x: rect.left + rect.width / 2, y: rect.top };
      setActiveCell((prev) =>
        prev?.week === wi && prev?.day === di ? null : pos
      );
    },
    []
  );

  return (
    <section className="mt-8 sm:mt-12 md:mt-16" ref={sectionRef}>
      <div className="flex items-center justify-between mb-4 sm:mb-7">
        <p className="section-header">GitHub Activity</p>
      </div>

      <div
        className="rounded-xl border p-5"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-card)",
        }}
      >
        {/* Day labels — fixed left */}
        <div className="flex gap-0">
          <div className="shrink-0">
            {/* Spacer matching month label height */}
            <div className="h-4 mb-1.5" />
            <div className="flex flex-col gap-[3px] mr-1.5">
              {(["Mon", "", "Wed", "", "Fri", "", ""] as const).map(
              (label, i) => (
                <div
                  key={i}
                  className="w-[24px] h-[15px] text-[9px] leading-[15px] text-right"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {label}
                </div>
              )
            )}
          </div>
          </div>

          {/* Scrollable area — months + grid scroll together */}
          <div ref={scrollRef} className="overflow-x-auto heatmap-scrollbar flex-1 min-w-0">
            <div className="flex flex-col min-w-fit">
              {/* Month labels */}
              <div className="relative h-4 mb-1.5">
                {months.map((m, i) => (
                  <span
                    key={i}
                    className="absolute text-[10px] leading-none"
                    style={{
                      left: `${m.col * 18}px`,
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              {/* Grid cells */}
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) => {
                      const isActive =
                        activeCell?.week === wi && activeCell?.day === di;
                      return (
                        <div
                          key={di}
                          className="w-[15px] h-[15px] rounded-[2px] cursor-default"
                          style={{
                            backgroundColor:
                              day !== null
                                ? tierColor(day.count, min, max)
                                : TIER_COLORS[0],
                          }}
                          onMouseEnter={(e) => handleCellEnter(e, wi, di)}
                          onMouseLeave={handleCellLeave}
                          onTouchStart={(e) => handleCellTap(e, wi, di)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            {error
              ? "Unable to load activity data"
              : loading
                ? "Loading..."
                : `${raw!.totalContributions.toLocaleString()} activities in ${year}`}
          </span>

          <div className="flex items-center gap-1.5">
            <span
              className="text-[10px]"
              style={{ color: "var(--text-tertiary)" }}
            >
              Less
            </span>
            {TIER_COLORS.map((c, i) => (
              <div
                key={i}
                className="w-[15px] h-[15px] rounded-[2px]"
                style={{ backgroundColor: c }}
              />
            ))}
            <span
              className="text-[10px]"
              style={{ color: "var(--text-tertiary)" }}
            >
              More
            </span>
          </div>
        </div>
      </div>

      {activeCell && createPortal(
        (() => {
          const day = weeks[activeCell.week]?.[activeCell.day];
          if (!day) return null;
          return (
            <div
              className="fixed px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap z-[9999] pointer-events-none"
              style={{
                left: activeCell.x,
                top: activeCell.y - 8,
                transform: "translate(-50%, -100%)",
                backgroundColor: "var(--text)",
                color: "var(--bg)",
              }}
            >
              {day.count} contribution{day.count !== 1 ? "s" : ""} on {formatDate(day.date)}
            </div>
          );
        })(),
        document.body
      )}
    </section>
  );
}
