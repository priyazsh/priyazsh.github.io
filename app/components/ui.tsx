"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';
import { cabin, epilogue } from '../utils/fonts';

export const buttonStyles = {
  gradientPurpleBlue: "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 transition-all duration-300",
  gradientPurple: "bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all duration-300",
  gradientTeal: "bg-gradient-to-br from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 transition-all duration-300",
};

export const textStyles = {
  description: `text-gray-200 text-xl ${epilogue.className}`,
  heading: `text-2xl md:text-1xl font-bold md:mb-1 ${cabin.className}`,
  username: `text-gray-400`,
  sectionHeading: "text-xl font-semibold mb-4",
  paragraph: `text-gray-300 ${epilogue.className}`,
};

export const containerStyles = {
  main: "bg-neutral-950",
  content: "md:w-[510px] md:mx-auto mx-auto md:mt-10 text-white p-4",
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
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)" }}
      whileTap={{ scale: 0.95 }}
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
    <p className={`text-neutral-400 text-sm ${epilogue.className}`}>
      © {currentYear} Priyansh Prajapat. All rights reserved.
    </p>
  );
}

export function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  );
}

export function FileTextIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" x2="8" y1="13" y2="13"/>
      <line x1="16" x2="8" y1="17" y2="17"/>
      <line x1="10" x2="8" y1="9" y2="9"/>
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}