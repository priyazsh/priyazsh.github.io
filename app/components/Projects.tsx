import projects from "@/DB/projects.json";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className="mt-8 sm:mt-12 md:mt-16">
      <p className="section-header mb-4 sm:mb-7">Projects</p>

      <div className="space-y-4 sm:space-y-6">
        {projects.map((project: any) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
