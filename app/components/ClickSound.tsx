"use client";

import { useEffect, useRef } from "react";

const SOUNDS = {
  dock: "/sound/dock.wav",
  email: "/sound/email.wav",
  switch: "/sound/switch.wav",
  social: "/sound/social.wav",
} as const;

type SoundKey = keyof typeof SOUNDS;

export default function ClickSound() {
  const cache = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    Object.values(SOUNDS).forEach((src) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = 0.5;
      cache.current.set(src, audio);
    });
  }, []);

  useEffect(() => {
    let last = 0;

    function play(key: SoundKey) {
      const src = SOUNDS[key];
      const original = cache.current.get(src);
      if (!original) return;
      const clone = original.cloneNode() as HTMLAudioElement;
      clone.volume = original.volume;
      clone.play().catch(() => {});
    }

    function getSound(target: HTMLElement): SoundKey | null {
      // Theme toggle: button inside dock (not a link)
      const dockBtn = target.closest(".dock-icon-btn");
      if (dockBtn && dockBtn.tagName === "BUTTON") return "switch";

      // Dock nav links
      if (dockBtn && dockBtn.tagName === "A") return "dock";

      // Email social icon
      const socialIcon = target.closest(".social-icon");
      if (socialIcon) {
        const href = socialIcon.getAttribute("href") || "";
        if (href.includes("mailto:")) return "email";
        return "social";
      }

      // Other interactive elements
      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".card") ||
        target.closest(".card-3d") ||
        target.closest(".btn-ghost");

      if (interactive) return "dock";

      return null;
    }

    function handleClick(e: Event) {
      const now = Date.now();
      if (now - last < 60) return;

      const touch = e as TouchEvent;
      const mouse = e as MouseEvent;
      const target = (touch.touches?.[0]?.target || mouse.target) as HTMLElement;
      if (!target) return;

      const sound = getSound(target);
      if (sound) {
        last = now;
        play(sound);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return null;
}
