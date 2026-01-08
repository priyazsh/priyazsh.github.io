import projects from "@/DB/projects.json";
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
  status: boolean;
}

export default function Projects() {
  return (
    <section className="space-y-6 mt-8">
      <h2 className="text-xl font-display font-semibold tracking-tight border-b border-zinc-800 pb-3 mb-4">
        <span className="text-gray-500 font-mono">~/</span> Projects
      </h2>

      {projects.map((project: Project) => (
        <div
          key={project.title}
          className="relative block p-6 rounded-xl border border-zinc-800/50 hover:border-zinc-600 transition-colors bg-zinc-900/30"
        >
          {project.url.live && (
            <Link
              href={project.url.live}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10"
              aria-label={`${project.title} - View Live`}
            />
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-display font-semibold tracking-tight">
                {project.title}
              </h3>

              <span className={project.status 
                ? "px-2 py-0.5 text-xs rounded bg-green-600/20 text-green-400" 
                : "px-2 py-0.5 text-xs rounded bg-red-600/20 text-red-400"
              }>
                {project.status ? "Active" : "Building"}
              </span>
            </div>

            <div className="flex items-center gap-2 relative z-20">
              {project.url.git && (
                <Link
                  href={project.url.git}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub`}
                  className="p-2 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <LuGithub size={18} />
                </Link>
              )}

              {project.url.live && (
                <span className="p-2 rounded-lg hover:bg-zinc-700 transition-colors">
                  <LuExternalLink size={18} />
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{project.description}</p>
          <p className="text-xs text-zinc-500 mt-2">{project.tech}</p>
        </div>
      ))}
    </section>
  );
}
