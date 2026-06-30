"use client";

import { useEffect, useState, useRef } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiCode() {
  const [triggered, setTriggered] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI.length) {
          indexRef.current = 0;
          setTriggered(true);
          setTimeout(() => setTriggered(false), 1500);
        }
      } else {
        indexRef.current = 0;
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!triggered) return null;

  return (
    <>
      <div className="konami-overlay" />
      <Particles />
    </>
  );
}

function Particles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#A78BFA", "#F97316", "#10B981"];
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[99998] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            animation: `konami-particle ${0.8 + Math.random() * 0.7}s ease-out forwards`,
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes konami-particle {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(${100 + Math.random() * 200}px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
