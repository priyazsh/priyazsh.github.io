"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LuShare2, LuCopy, LuCheck, LuTwitter, LuLinkedin } from 'react-icons/lu';

interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareLinks = [
    {
      name: 'Copy Link',
      icon: copied ? LuCheck : LuCopy,
      action: handleCopy,
      color: copied ? 'from-green-500 to-emerald-600' : 'from-gray-500 to-gray-600'
    },
    {
      name: 'X.com',
      icon: LuTwitter,
      action: () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank'),
      color: 'from-gray-800 to-black'
    },
    {
      name: 'LinkedIn',
      icon: LuLinkedin,
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank'),
      color: 'from-blue-600 to-blue-800'
    }
  ];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Share this post"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <LuShare2 size={20} />
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          scale: isOpen ? 1 : 0.8,
          y: isOpen ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
        className={`
          absolute top-full mt-2 right-0 flex flex-col gap-2 p-3 
          rounded-xl bg-white/10 backdrop-blur-md border border-white/20 
          shadow-lg ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        {shareLinks.map((link, index) => (
          <motion.button
            key={link.name}
            onClick={link.action}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg 
              bg-gradient-to-r ${link.color} text-white 
              hover:shadow-lg transition-shadow duration-300
              min-w-[140px]
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
            transition={{ delay: index * 0.1 }}
          >
            <link.icon size={16} />
            <span className="text-sm font-medium">{link.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}