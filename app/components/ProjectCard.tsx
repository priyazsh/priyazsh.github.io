"use client";

import Link from "next/link";
import { LuGithub, LuExternalLink } from "react-icons/lu";
import { motion } from "framer-motion";
import { cabin } from '../utils/fonts';
import { textStyles, containerStyles } from './Ui';

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
                boxShadow: "0 0 12px rgba(59, 130, 246, 0.5)" 
              }} 
              whileTap={{ scale: 0.92 }}
              className="overflow-hidden rounded-md"
            >
              <Link href={sourceUrl} target="_blank" rel="noopener noreferrer" 
                    className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-gray-700 via-gray-800 to-black hover:from-gray-600 hover:via-gray-700 hover:to-gray-900 transition-all duration-300 shadow-lg">
                <LuGithub size={18} className="text-white drop-shadow-md" />
              </Link>
            </motion.div>
          )}
          <motion.div 
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 0 12px rgba(239, 68, 68, 0.5)" 
            }} 
            whileTap={{ scale: 0.92 }}
            className="overflow-hidden rounded-md"
          >
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-400 hover:via-red-500 hover:to-red-600 transition-all duration-300 shadow-lg">
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
