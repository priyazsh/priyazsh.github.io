"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { LuInstagram, LuLinkedin, LuGithub } from "react-icons/lu";
import { FaFilePdf, FaAt, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Link from "next/link";

interface sLink {
  href: string;
  icon: IconType;
  label: string;
  copyValue?: string;
}

export default function Socials() {
  const iconSize = 26;
  const [toast, setToast] = useState<string | null>(null);
  const [toastLeaving, setToastLeaving] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(matchMedia("(pointer: coarse)").matches);
  }, []);

  const Links: sLink[] = [
    { href: "https://github.com/priyazsh", icon: LuGithub, label: "GitHub" },
    { href: "https://x.com/priyazsh", icon: FaXTwitter, label: "X" },
    { href: "https://linkedin.com/in/priyazsh", icon: LuLinkedin, label: "LinkedIn" },
    { href: "https://instagram.com/priyazsh", icon: LuInstagram, label: "Instagram" },
    { href: "mailto:priyanshprajapat@proton.me", icon: FaAt, label: "Email", copyValue: "priyanshprajapat@proton.me" },
    { href: "/resume", icon: FaFilePdf, label: "Resume" },
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
