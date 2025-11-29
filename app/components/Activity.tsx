"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Activity() {
  const [total, setTotal] = useState<number | null>(null);
  
  useEffect(() => {
    async function load() {
      const r = await fetch(
        "https://github-contributions-api.deno.dev/priyanzsh.json?flat=true"
      );
      const j = await r.json();
      setTotal(j.totalContributions);
    }
    load();
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector('.activity-scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    }
  }, [total]); 

  return (
    <section className="space-y-4 sm:space-y-6 mt-8 sm:mt-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-display font-semibold tracking-tight border-b border-zinc-800 pb-2 flex-1">
          <span className="text-gray-500 font-mono">~/</span> GitHub Activity
        </h2>
        <p className="text-sm text-zinc-400 mb-2 sm:mb-4">
          {total !== null ? total : "…"} contributions
        </p>
      </div>
      <div className="overflow-x-auto activity-scroll-container">
        <Image
          src="https://github-contributions-api.deno.dev/priyanzsh.svg?bg=0d1117&font-color=c9d1d9&no-total=true&no-legend=true"
          alt="GitHub Contribution Graph"
          width={800}
          height={200}
          className="w-full min-w-[600px] sm:min-w-0 h-auto"
        />
      </div>
    </section>
  );
}
