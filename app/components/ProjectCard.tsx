"use client";

import { useState, useRef, useEffect } from "react";
import { LuArrowUpRight, LuGithub, LuChevronDown } from "react-icons/lu";

interface Project {
  title: string;
  description: string;
  details?: string;
  tech: string[];
  url: {
    git?: string;
    live?: string;
  };
  image?: string;
  platform: string;
  date: string;
  status: boolean;
}

function renderBoldText(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-primary">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function PreviewPanel({
  project,
  isLink,
}: {
  project: Project;
  isLink: boolean;
}) {
  const inner = (
    <div className="relative h-[150px] rounded-t-xl overflow-hidden bg-[#14171A]">
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-white/40 text-sm font-medium">
            {project.title}
          </span>
        </div>
      )}

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

      {/* Platform badge — top right */}
      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[10px] font-medium rounded-full bg-black/60 text-white/90 backdrop-blur-sm">
        {project.platform}
      </span>

      {/* GitHub — bottom left */}
      {project.url.git && (
        <a
          href={project.url.git}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} GitHub`}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-2.5 left-2.5 z-10 p-2 rounded-lg bg-black/50 text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:text-white hover:scale-110 active:scale-95"
        >
          <LuGithub size={14} />
        </a>
      )}

      {/* Live arrow — bottom right */}
      {project.url.live && (
        <span className="absolute bottom-2.5 right-2.5 z-10 p-2 rounded-lg bg-black/50 text-white/80 backdrop-blur-sm transition-all duration-200 group-hover:bg-black/70 group-hover:text-white group-hover:scale-110">
          <LuArrowUpRight size={14} />
        </span>
      )}
    </div>
  );

  if (isLink && project.url.live) {
    return (
      <a
        href={project.url.live}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-t-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text)]"
        aria-label={`${project.title} - View Live`}
      >
        {inner}
      </a>
    );
  }

  return inner;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [detailsHeight, setDetailsHeight] = useState(0);

  useEffect(() => {
    if (detailsRef.current) {
      setDetailsHeight(detailsRef.current.scrollHeight);
    }
  }, [expanded]);

  return (
    <div
      className="project-card group relative rounded-xl border transition-all duration-300 ease-out"
      style={{ borderColor: "var(--border)" }}
    >
      <PreviewPanel project={project} isLink={true} />

      {/* Content block */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-[15px] font-medium text-primary truncate transition-colors duration-200 group-hover:text-[var(--text)]">
          {project.title}
        </h3>

        {/* Date / Status */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            {project.date}
          </span>
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            ·
          </span>
          <span
            className="text-xs"
            style={{
              color: project.status
                ? "var(--green-muted)"
                : "var(--text-tertiary)",
            }}
          >
            {project.status ? "Live" : "Building"}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mt-2.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {renderBoldText(project.description)}
        </p>

        {/* View more */}
        {project.details && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-medium mt-2 min-h-[44px] transition-all duration-200 hover:gap-1.5 active:scale-95"
            style={{ color: "var(--text-secondary)" }}
          >
            {expanded ? "Show less" : "View more"}
            <LuChevronDown
              size={12}
              className={`transition-transform duration-300 ease-out ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        )}

        {/* Expandable details */}
        <div
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: expanded ? detailsHeight : 0 }}
        >
          <div ref={detailsRef} className="pt-2.5">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {renderBoldText(project.details || "")}
            </p>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[11px] font-medium rounded-md transition-colors duration-200 hover:brightness-125"
              style={{
                backgroundColor: "var(--bg-elevated)",
                color: "var(--text-secondary)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
