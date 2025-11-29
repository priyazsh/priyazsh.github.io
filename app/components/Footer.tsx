"use client"
import { LuArrowUp } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Link from "next/link";

export default function Footer() {
  const iconSize = 18;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-8 sm:mt-12">
      <div className="pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-zinc-800/50">
          <p className="text-xs sm:text-xs text-zinc-500 text-center sm:text-left">
            © {currentYear} Priyansh Prajapat. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="cursor-pointer inline-flex items-center gap-2 text-xs sm:text-xs text-zinc-500 hover:text-zinc-400 transition-colors duration-300 group active:scale-95 px-3 py-2 sm:px-0 sm:py-0 rounded-lg sm:rounded-none hover:bg-zinc-800/50 sm:hover:bg-transparent"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <LuArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}