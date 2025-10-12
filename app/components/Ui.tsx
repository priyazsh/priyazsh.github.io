"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';
import { cabin, epilogue } from '../utils/fonts';

export const buttonStyles = {
  gradientPurpleBlue: "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 hover:from-blue-500 hover:via-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25",
  gradientPurple: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-500 hover:from-orange-400 hover:via-red-400 hover:to-rose-400 transition-all duration-300 shadow-lg hover:shadow-red-500/25",
  gradientTeal: "bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500 hover:from-emerald-300 hover:via-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25",
};

export const textStyles = {
  description: `text-gray-200 text-xl leading-relaxed ${epilogue.className}`,
  heading: `text-3xl md:text-4xl font-bold md:mb-1 tracking-tight ${cabin.className}`,
  username: `text-gray-400 text-sm tracking-wider`,
  sectionHeading: `text-2xl font-bold mb-6 tracking-tight ${cabin.className}`,
  paragraph: `text-gray-300 leading-relaxed ${epilogue.className}`,
  subheading: `text-lg font-semibold text-gray-200 ${cabin.className}`,
};

// Common motion variants for consistent animations
export const motionVariants = {
  hover: {
    button: { scale: 1.05 },
    buttonSmall: { scale: 1.02 },
    card: { scale: 1.01 },
  },
  tap: {
    scale: 0.95
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }
};

export const containerStyles = {
  main: "bg-neutral-950 relative",
  content: "sm:w-[85%] md:w-[65%] lg:w-[45%] xl:w-[35%] 2xl:w-[30%] md:mx-auto mx-auto md:mt-10 text-white p-4 relative z-10",
  card: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg",
  wideContent: "w-full max-w-4xl",
};

interface GradientButtonProps {
  href: string;
  children: ReactNode;
  download?: boolean;
  className?: string;
}

export function GradientButton({ href, children, download, className = "" }: GradientButtonProps) {
  return (
    <motion.a
      href={href}
      download={download}
      className={`${buttonStyles.gradientPurpleBlue} px-4 py-2 rounded-md flex items-center gap-2 ${className}`}
      whileHover={motionVariants.hover.button}
      whileTap={motionVariants.tap}
    >
      {children}
    </motion.a>
  );
}

interface BackButtonProps {
  href: string;
  text: string;
}

export function BackButton({ href, text }: BackButtonProps) {
  return (
    <Link href={href}>
      <motion.div 
        className="flex items-center cursor-pointer" 
        whileHover={motionVariants.hover.button}
        whileTap={motionVariants.tap}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-2">
          <path d="m12 19-7-7 7-7"/>
          <path d="M19 12H5"/>
        </svg>
        <span className={`font-medium ${cabin.className}`}>{text}</span>
      </motion.div>
    </Link>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="py-4">
      <p className={`text-gray-400 text-sm ${epilogue.className} leading-relaxed`}>
        © {currentYear} Priyansh Prajapat. All rights reserved.
      </p>
    </div>
  );
}

interface IconProps {
  size?: number;
  className?: string;
}

function LucideIcon({ size = 16, className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {children}
    </svg>
  );
}

export function DownloadIcon({ size = 16, className = "" }: IconProps) {
  return (
    <LucideIcon size={size} className={`lucide lucide-download ${className}`}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </LucideIcon>
  );
}

export function FileTextIcon({ size = 16, className = "" }: IconProps) {
  return (
    <LucideIcon size={size} className={`lucide lucide-file-text ${className}`}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" x2="8" y1="13" y2="13"/>
      <line x1="16" x2="8" y1="17" y2="17"/>
      <line x1="10" x2="8" y1="9" y2="9"/>
    </LucideIcon>
  );
}

export function MailIcon({ size = 18, className = "" }: IconProps) {
  return (
    <LucideIcon size={size} className={`lucide lucide-mail ${className}`}>
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </LucideIcon>
  );
}

export function BlogIcon({ size = 16, className = "" }: IconProps) {
  return (
    <LucideIcon size={size} className={`lucide lucide-pen-tool ${className}`}>
      <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/>
      <path d="m5 21 3-3h-3v-3"/>
      <path d="m14 5 3 3"/>
      <path d="M9.5 12.5 11 11l5 5"/>
      <path d="m16 16 3-3"/>
    </LucideIcon>
  );
}