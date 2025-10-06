"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { LuLink } from 'react-icons/lu';

function generateAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-') 
    .replace(/^-|-$/g, ''); 
}

interface HeadingAnchorProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export default function HeadingAnchor({ level, children, className = '' }: HeadingAnchorProps) {
  const text = typeof children === 'string' ? children : '';
  const id = generateAnchorId(text);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === `#${id}`) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [id]);

  const headingProps = {
    id,
    className: `group relative ${className}`,
    style: { scrollMarginTop: '80px' } 
  };

  const linkElement = (
    <Link
      href={`#${id}`}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -left-6 top-0 flex items-center justify-center w-5 h-full text-gray-400 hover:text-cyan-400"
      aria-label={`Link to ${text}`}
      onClick={(e) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.pushState({}, '', url.toString());
        
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
    >
      <LuLink size={16} />
    </Link>
  );

  switch (level) {
    case 1:
      return <h1 {...headingProps}>{children}{linkElement}</h1>;
    case 2:
      return <h2 {...headingProps}>{children}{linkElement}</h2>;
    case 3:
      return <h3 {...headingProps}>{children}{linkElement}</h3>;
    case 4:
      return <h4 {...headingProps}>{children}{linkElement}</h4>;
    case 5:
      return <h5 {...headingProps}>{children}{linkElement}</h5>;
    case 6:
      return <h6 {...headingProps}>{children}{linkElement}</h6>;
    default:
      return <h2 {...headingProps}>{children}{linkElement}</h2>;
  }
}

export { generateAnchorId };