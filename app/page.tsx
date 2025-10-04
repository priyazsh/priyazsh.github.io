"use client";

import Image from "next/image";
import Socials from "./components/socials";
import ProjectCard from "./components/ProjectCard";
import TechSpan from "./components/TechSpan";
import { motion } from "framer-motion";
import { kodeMono, cabin, epilogue } from "./utils/fonts";
import {
  textStyles,
  containerStyles,
  GradientButton,
  MailIcon,
  FileTextIcon,
  BlogIcon,
  Footer,
} from "./components/ui";
import { generatePersonJsonLd, generateWebsiteJsonLd } from "../lib/structured-data";

const projects = [
  {
    title: "is-a.software",
    description:
      "A subdomain service for developers to use in their projects, providing free and easy-to-configure subdomains for developer projects.",
    technologies: "JavaScript, GitHub Actions",
    sourceUrl: "https://github.com/is-a-software/is-a-software",
    liveUrl: "https://is-a.software",
  },
  {
    title: "DevProfiles",
    description:
      "A platform to list your developer profile and showcase your skills to the world. Connect with other developers and build your network.",
    technologies: "JavaScript",
    sourceUrl: "https://github.com/oyepriyansh/DevProfiles",
    liveUrl: "https://devprofiles.is-a.software",
  },
  {
    title: "Prasad Mundkar Portfolio",
    description: "Built a responsive minimalist portfolio for a client using NextJS and TailwindCSS with the best SEO practices.",
    technologies: "NextJS",
    sourceUrl: "#",
    liveUrl: "https://oyepriyansh.pages.dev/eg44322ae",
  },
];

const technologies = ["Javascript", "NextJS", "Java"];

export default function Home() {
  const personJsonLd = generatePersonJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div className={containerStyles.main}>
        <div className={containerStyles.content}>
        <div className="flex items-start mb-6">
          <div className="rounded-full overflow-hidden w-15 h-15 md:w-20 md:h-20">
            <Image
              alt="Priyansh Prajapat"
              src={"/oyepriyansh.webp"}
              width={128}
              height={128}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="ml-4">
            <h1 className={textStyles.heading}>Priyansh Prajapat</h1>
            <p className={`${textStyles.username} ${kodeMono.className}`}>
              aka @oyepriyansh
            </p>
          </div>
        </div>

        <p className={`mb-4 ${textStyles.description}`}>
          I&apos;m Priyansh, 21 year old self taught developer from India, I
          enjoy programming and exploring technology.
        </p>

        <div className="mb-6 flex items-center flex-wrap">
          <p className={`mr-2 text-gray-200 text-base ${epilogue.className}`}>
            building stuff with
          </p>
          {technologies.map((tech) => (
            <div
              key={tech}
              className={`${containerStyles.card} px-2 py-0.5 flex items-center mr-1.5 mb-1.5 hover:bg-gray-800/30 transition-all shadow-sm`}
            >
              <TechSpan>{tech}</TechSpan>
            </div>
          ))}
        </div>

        <Socials />

        <div className="projects mt-8">
          <h2 className={`${textStyles.sectionHeading} flex items-center`}>
            <span className="text-gray-400 mr-2 font-normal">~/</span>Projects
          </h2>

          <div className="grid gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>

        <div className="mt-12 mb-4">
          <h2 className={`${textStyles.sectionHeading} flex items-center`}>
            <span className="text-gray-400 mr-2 font-normal">~/</span>Let&apos;s
            Work Together
          </h2>

          <div className={`mt-4 p-4 ${containerStyles.card}`}>
            <p className={`${textStyles.paragraph} mb-3`}>
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>

            <div className="flex items-center mt-4">
              <GradientButton href="mailto:priyanshprajapat@duck.com">
                <MailIcon />
                priyanshprajapat@duck.com
              </GradientButton>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t border-white/10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Footer />

            <div className="flex items-center gap-4">
              <motion.a
                href="/blog"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BlogIcon />
                View Blog
              </motion.a>

              <motion.a
                href="/resume"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileTextIcon />
                View Resume
              </motion.a>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </>
  );
}
