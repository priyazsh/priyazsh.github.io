"use client";

import Image from "next/image";
import Socials from "./components/Socials";
import ProjectCard from "./components/ProjectCard";
import TechSpan from "./components/TechSpan";
import { motion } from "framer-motion";
import { kodeMono, epilogue } from "./utils/fonts";
import {
  textStyles,
  containerStyles,
  GradientButton,
  MailIcon,
  FileTextIcon,
  BlogIcon,
  Footer,
} from "./components/Ui";
import { generatePersonJsonLd, generateWebsiteJsonLd } from "@/lib/structured-data";
import ParticleBackground from "./components/ParticleBackground";

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
      <ParticleBackground />
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
        <motion.div 
          className="flex items-start mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="rounded-full overflow-hidden w-15 h-15 md:w-20 md:h-20 ring-2 ring-white/10 hover:ring-cyan-400/50 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              alt="Priyansh Prajapat"
              src={"/oyepriyansh.webp"}
              width={128}
              height={128}
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div 
            className="ml-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className={textStyles.heading}>Priyansh Prajapat</h1>
            <p className={`${textStyles.username} ${kodeMono.className}`}>
              aka @oyepriyansh
            </p>
          </motion.div>
        </motion.div>

        <motion.p 
          className={`mb-4 ${textStyles.description}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          I&apos;m Priyansh, 21 year old self taught developer from India, I
          enjoy programming and exploring technology.
        </motion.p>

        <motion.div 
          className="mb-6 flex items-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <p className={`mr-2 text-gray-200 text-base ${epilogue.className}`}>
            building stuff with
          </p>
          {technologies.map((tech, index) => (
            <motion.div
              key={tech}
              className={`${containerStyles.card} px-2 py-0.5 flex items-center mr-1.5 mb-1.5 hover:bg-gray-800/30 transition-all shadow-sm cursor-default`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.8 + (index * 0.1), 
                ease: "backOut" 
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <TechSpan>{tech}</TechSpan>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
        >
          <Socials />
        </motion.div>

        <motion.div 
          className="projects mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
        >
          <h2 className={`${textStyles.sectionHeading} flex items-center`}>
            <span className="text-gray-400 mr-2 font-normal">~/</span>Projects
          </h2>

          <div className="grid gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.6 + (index * 0.1), 
                  ease: "easeOut" 
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

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

        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-6">
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
            
            <Footer />
          </div>
        </footer>
      </div>
    </div>
    </>
  );
}
