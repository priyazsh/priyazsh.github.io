"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TEXT = "PRIYANSH PRAJAPAT";

export default function ScrambleHeading() {
  const [display, setDisplay] = useState(TEXT);
  const [done, setDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const len = TEXT.length;
    let frame = 0;
    const REVEAL_EVERY = 6;
    const EXTRA = 12;
    const totalFrames = len * REVEAL_EVERY + EXTRA;

    function tick() {
      frame++;
      let result = "";
      for (let i = 0; i < len; i++) {
        if (TEXT[i] === " ") {
          result += " ";
        } else if (frame > i * REVEAL_EVERY + EXTRA) {
          result += TEXT[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(result);

      if (frame < totalFrames) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => setCursorVisible(false), 1500);
      }
    }

    requestAnimationFrame(tick);
  }, []);

  return (
    <>
      {display}
      {cursorVisible && (
        <span className={`typewriter-cursor ${done ? "fade-out" : ""}`} />
      )}
    </>
  );
}
