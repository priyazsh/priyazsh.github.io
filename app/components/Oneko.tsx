"use client";

import { useEffect } from "react";
export default function Oneko() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/oneko.js";
    document.body.append(script);
    return () => {
      script.remove();
    };
  }, []);
  return null;
}
