import projects from "@/DB/projects.json";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className="mt-8 sm:mt-12 md:mt-16">
      <p className="section-header mb-4 sm:mb-7">Projects</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project: any) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
