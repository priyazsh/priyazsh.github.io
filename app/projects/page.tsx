import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import projects from "@/DB/projects.json";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects built by Priyansh Prajapat",
  alternates: {
    canonical: "https://priyazsh.github.io/projects",
  },
  openGraph: {
    title: "Projects | Priyansh Prajapat",
    description: "Projects built by Priyansh Prajapat",
    url: "https://priyazsh.github.io/projects",
  },
  twitter: {
    title: "Projects | Priyansh Prajapat",
    description: "Projects built by Priyansh Prajapat",
  },
};

export default function ProjectsPage() {
  return (
    <section className="space-y-6 mt-2">
      <Link href="/" className="btn-ghost">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Link>

      <p className="section-header">Projects</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project: any) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <Footer />
    </section>
  );
}
