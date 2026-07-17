"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { AtSign, FileText } from "lucide-react";
import Link from "next/link";

function GitHubIcon({ size }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function XIcon({ size }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedInIcon({ size }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function InstagramIcon({ size }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

interface sLink {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  copyValue?: string;
}

export default function Socials() {
  const [toast, setToast] = useState<string | null>(null);
  const [toastLeaving, setToastLeaving] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(matchMedia("(pointer: coarse)").matches);
  }, []);

  const Links: sLink[] = [
    { href: "https://github.com/priyazsh", icon: GitHubIcon, label: "GitHub" },
    { href: "https://x.com/priyazsh", icon: XIcon, label: "X" },
    { href: "https://linkedin.com/in/priyazsh", icon: LinkedInIcon, label: "LinkedIn" },
    { href: "https://instagram.com/priyazsh", icon: InstagramIcon, label: "Instagram" },
    { href: "mailto:priyanshprajapat@proton.me", icon: AtSign, label: "Email", copyValue: "priyanshprajapat@proton.me" },
    { href: "/resume", icon: FileText, label: "Resume" },
  ];

  const showToast = useCallback((message: string) => {
    setToast(message);
    setToastLeaving(false);
    setTimeout(() => {
      setToastLeaving(true);
      setTimeout(() => setToast(null), 300);
    }, 2000);
  }, []);

  const handleEmailClick = useCallback((e: React.MouseEvent, copyValue: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(copyValue).then(() => {
      showToast("Email copied to clipboard");
    });
  }, [showToast]);

  return (
    <>
      <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-5 sm:mt-6 mb-5 sm:mb-6">
        {Links.map(({ href, icon: Icon, label, copyValue }) => {
          const isExternal = href.startsWith("http") || href.startsWith("mailto");
          const linkEl = (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              {...(isExternal && !copyValue ? { target: "_blank" } : {})}
              onClick={copyValue ? (e) => handleEmailClick(e, copyValue) : undefined}
              className="social-icon inline-flex items-center justify-center rounded-xl w-11 h-11 sm:w-12 sm:h-12 border transition-all duration-200 active:scale-95"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-card)",
                color: "var(--text-secondary)",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <Icon size={isTouch ? 20 : 22} />
            </Link>
          );

          if (isTouch) return <div key={href}>{linkEl}</div>;

          return (
            <MagneticButton key={href}>
              {linkEl}
            </MagneticButton>
          );
        })}
      </div>

      {toast && (
        <div className={`toast ${toastLeaving ? "leaving" : ""}`}>{toast}</div>
      )}
    </>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }, []);

  return (
    <div
      ref={ref}
      className="magnetic-btn"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
