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
  const loaded = useRef(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = matchMedia("(pointer: coarse)").matches;
  }, []);

  function loadAll() {
    if (loaded.current) return;
    loaded.current = true;
    Object.values(SOUNDS).forEach((src) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = 0.5;
      cache.current.set(src, audio);
    });
  }

  useEffect(() => {
    let last = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    function play(key: SoundKey) {
      loadAll();
      const src = SOUNDS[key];
      const original = cache.current.get(src);
      if (!original) return;
      const clone = original.cloneNode() as HTMLAudioElement;
      clone.volume = original.volume;
      clone.play().catch(() => {});
    }

    function getSound(target: HTMLElement): SoundKey | null {
      const dockBtn = target.closest(".dock-icon-btn");
      if (dockBtn && dockBtn.tagName === "BUTTON") return "switch";
      if (dockBtn && dockBtn.tagName === "A") return "dock";

      const socialIcon = target.closest(".social-icon");
      if (socialIcon) {
        const href = socialIcon.getAttribute("href") || "";
        if (href.includes("mailto:")) return "email";
        return "social";
      }

      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".btn-ghost");

      if (interactive) return "dock";

      return null;
    }

    function tryPlay(target: HTMLElement) {
      const now = Date.now();
      if (now - last < 60) return;

      const sound = getSound(target);
      if (sound) {
        last = now;
        play(sound);
      }
    }

    function handleMouseDown(e: MouseEvent) {
      if (isTouchDevice.current) return;
      tryPlay(e.target as HTMLElement);
    }

    function handleTouchStart(e: TouchEvent) {
      if (!isTouchDevice.current) return;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!isTouchDevice.current) return;

      const touch = e.changedTouches[0];
      const dx = Math.abs(touch.clientX - touchStartX);
      const dy = Math.abs(touch.clientY - touchStartY);
      if (dx > 10 || dy > 10) return;

      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target) tryPlay(target as HTMLElement);
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return null;
}
