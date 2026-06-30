import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
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
        <LuArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </Link>

      <p className="section-header">Projects</p>

      <div className="space-y-6">
        {projects.map((project: any) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <Footer />
    </section>
  );
}
