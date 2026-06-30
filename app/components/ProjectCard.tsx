"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { LuGithub, LuExternalLink } from "react-icons/lu";

interface Project {
  title: string;
  description: string;
  tech: string;
  url: {
    git?: string;
    live: string;
  };
  image?: string;
  status: boolean;
}

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    setTilt({ x: rotateX, y: rotateY });

    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, color-mix(in srgb, var(--text) 6%, transparent), transparent 60%)`;
    }
  }, [isTouch]);

  const handleMouseEnter = useCallback(() => {
    if (isTouch) return;
    setIsHovered(true);
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return;
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, [isTouch]);

  const parallax = (factor: number) => {
    if (isTouch) return {};
    return {
      transform: isHovered
        ? `translate(${tilt.y * factor * -0.5}px, ${tilt.x * factor * 0.5}px)`
        : "translate(0, 0)",
      transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
    };
  };

  const cardStyle = isTouch
    ? {}
    : {
        perspective: "800px",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
      };

  return (
    <div
      ref={cardRef}
      className="card-3d"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
    >
      {!isTouch && (
        <div className="card-3d-border">
          <div className="card-3d-border-mask" />
        </div>
      )}

      <div
        className="card-3d-inner p-4 sm:p-6 md:p-8 border"
        style={{ borderColor: isHovered && !isTouch ? "transparent" : "var(--border)" }}
      >
        {!isTouch && <div ref={spotlightRef} className="card-spotlight" />}

        {project.url.live && (
          <Link
            href={project.url.live}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`${project.title} - View Live`}
          />
        )}

        <div className="relative z-[2]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap" style={parallax(1.5)}>
                <h3 className="text-base sm:text-lg md:text-2xl font-display font-semibold tracking-tight text-primary">
                  {project.title}
                </h3>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full border"
                  style={{
                    color: project.status ? "var(--text)" : "var(--text-tertiary)",
                    backgroundColor: project.status ? "var(--bg-hover)" : "transparent",
                    borderColor: "var(--border)",
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${project.status ? "status-live" : "status-building"}`}
                    style={{
                      backgroundColor: project.status ? "var(--green-muted)" : "var(--text-tertiary)",
                    }}
                  />
                  {project.status ? "Live" : "Building"}
                </span>
              </div>

              <p className="text-sm sm:text-base md:text-lg mt-2 sm:mt-3 leading-relaxed text-secondary" style={parallax(1)}>
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-0.5 relative z-20 shrink-0" style={parallax(2)}>
              {project.url.git && (
                <Link
                  href={project.url.git}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub`}
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-hover-theme"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <LuGithub size={16} />
                </Link>
              )}

              {project.url.live && (
                <span
                  className="p-2 rounded-lg"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <LuExternalLink size={16} />
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3" style={parallax(0.5)}>
            {project.tech.split(", ").map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 text-[11px] sm:text-xs font-medium rounded-md border"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {project.image && (
            <div className="project-preview">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-auto rounded-md sm:rounded-lg border"
                style={{ borderColor: "var(--border)" }}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
