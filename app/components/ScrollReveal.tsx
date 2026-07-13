"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch = matchMedia("(pointer: coarse)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      {
        threshold: isTouch ? 0.15 : 0.5,
        rootMargin: isTouch ? "-5% 0px -5% 0px" : "-10% 0px -10% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal-text ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </div>
  );
}
