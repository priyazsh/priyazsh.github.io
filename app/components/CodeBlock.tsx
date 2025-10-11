"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { LuCopy, LuCheck } from 'react-icons/lu';

interface CodeBlockProps {
  children: string;
  language: string;
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="relative group mb-6">
      {/* Copy button */}
      <motion.button
        onClick={handleCopy}
        className={`
          absolute top-3 right-3 z-10 p-2 rounded-lg
          transition-all duration-200 cursor-pointer
          ${copied 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? <LuCheck size={16} /> : <LuCopy size={16} />}
      </motion.button>

      {/* Code block */}
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        className="rounded-lg text-sm"
        customStyle={{
          margin: 0,
          background: '#1a1a1a',
          border: '1px solid #374151',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        {children.replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
}