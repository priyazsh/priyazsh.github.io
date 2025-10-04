"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cabin, epilogue } from '../utils/fonts';
import { textStyles, containerStyles } from './ui';

interface BlogPostCardProps {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export default function BlogPostCard({ 
  title, 
  excerpt, 
  date, 
  readTime, 
  tags, 
  slug 
}: BlogPostCardProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.article 
      className={`p-6 ${containerStyles.card} hover:bg-white/8 transition-all duration-300`}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 0 25px rgba(124, 58, 237, 0.15)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${slug}`} className="block group">
        <div className="flex flex-col space-y-3">
          {/* Title */}
          <h2 className={`text-xl md:text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 ${cabin.className}`}>
            {title}
          </h2>
          
          {/* Excerpt */}
          <p className={`${textStyles.paragraph} text-gray-300 leading-relaxed`}>
            {excerpt}
          </p>
          
          {/* Meta information */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <div className={`flex items-center text-sm text-gray-400 ${epilogue.className}`}>
              <time dateTime={date} className="mr-3">
                {formatDate(date)}
              </time>
              <span className="mr-3">•</span>
              <span>{readTime}</span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-xs bg-purple-600/20 text-purple-300 rounded-md border border-purple-600/30 hover:bg-purple-600/30 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}