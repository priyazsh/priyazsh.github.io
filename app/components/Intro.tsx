"use client";

import Link from "next/link";
import Image from "next/image";
import Skills from "./Skills";
import Age from "./Age";
import ScrambleHeading from "./ScrambleHeading";
import FloatingAvatar from "./FloatingAvatar";
import ScrollReveal from "./ScrollReveal";

export default function Intro() {
  return (
    <section className="py-4 sm:py-8 md:py-12 relative overflow-hidden">
      <div className="ambient-glow" />

      {/* Mobile: small avatar + name row */}
      <div className="flex items-center gap-3.5 md:hidden">
        <div className="shrink-0 w-14 h-14 rounded-full overflow-hidden border relative" style={{ borderColor: "var(--border)" }}>
          <div className="avatar-glow" />
          <Image
            src="/profile-pic.png"
            alt="Priyansh Prajapat"
            width={128}
            height={128}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold tracking-tight text-primary">
            Priyansh Prajapat
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            @priyazsh
          </p>
          <p className="text-xs mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "var(--green-muted)" }} />
            <span style={{ color: "var(--green-muted)" }}>open for freelance work</span>
          </p>
        </div>
      </div>

      {/* Desktop: full layout with FloatingAvatar */}
      <div className="hidden md:flex max-w-5xl flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 text-left">
          <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-primary heading-shimmer">
            Hi, I&apos;m <ScrambleHeading />
          </h1>
          <p className="mt-4 max-w-xl text-xl leading-relaxed text-secondary">
            Full stack developer from India.
          </p>
          <p className="mt-4 text-base" style={{ color: "var(--text-tertiary)" }}>
            @priyazsh
            <span className="mx-2">·</span>
            <span style={{ color: "var(--green-muted)" }}>
              open for freelance work
            </span>
          </p>
        </div>

        <FloatingAvatar />
      </div>

      <div className="mt-8 md:mt-16 max-w-3xl space-y-4 md:space-y-5">
        <ScrollReveal>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            I&apos;m a <Age /> year old full stack developer from India. I enjoy
            programming, building products, and exploring technology.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            I build things with{" "}
            <span className="font-medium text-primary">
              <Skills />
            </span>{" "}
            and some other tooling. I also occasionally write{" "}
            <Link
              href="/blog"
              className="underline underline-offset-4 decoration-1 transition-colors"
              style={{
                color: "var(--text)",
                textDecorationColor: "var(--border)",
              }}
            >
              blogs
            </Link>
            .
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            I&apos;m currently working on full stack projects, exploring AI and
            developer tooling, and contributing to open source. I like building things
            that are fast, accessible, and well crafted.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
