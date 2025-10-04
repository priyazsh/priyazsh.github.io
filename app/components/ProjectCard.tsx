"use client";

import Link from "next/link";
import { LuGithub, LuExternalLink } from "react-icons/lu";
import { motion } from "framer-motion";
import { cabin } from '../utils/fonts';
import { textStyles, containerStyles } from './ui';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: string;
  sourceUrl: string;
  liveUrl: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  technologies, 
  sourceUrl, 
  liveUrl
}: ProjectCardProps) {
  return (
    <motion.div 
      className={`mb-6 p-4 ${containerStyles.card}`}
      whileHover={{ 
        scale: 1.01,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-lg font-medium text-white ${cabin.className}`}>{title}</h3>
        
        <div className="flex space-x-3">
          {sourceUrl && sourceUrl !== "#" && (
            <motion.div 
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 0 12px rgba(147, 51, 234, 0.5)" 
              }} 
              whileTap={{ scale: 0.92 }}
              className="overflow-hidden rounded-md"
            >
              <Link href={sourceUrl} target="_blank" rel="noopener noreferrer" 
                    className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 transition-all duration-300 shadow-md">
                <LuGithub size={18} className="text-white drop-shadow-md" />
              </Link>
            </motion.div>
          )}
          <motion.div 
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 0 12px rgba(20, 184, 166, 0.5)" 
            }} 
            whileTap={{ scale: 0.92 }}
            className="overflow-hidden rounded-md"
          >
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-700 hover:from-teal-400 hover:to-teal-600 transition-all duration-300 shadow-md">
              <LuExternalLink size={18} className="text-white drop-shadow-md" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      <p className={`${textStyles.paragraph} mb-3 text-sm`}>{description}</p>
      
      {technologies && (
        <div className="flex flex-wrap gap-2 mt-3">
          {technologies.split(', ').map(tech => (
            <span key={tech} className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded-md">
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
