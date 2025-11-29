import { LuInstagram, LuLinkedin, LuTwitter, LuGithub } from "react-icons/lu";
import { FaFilePdf, FaAt } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Link from "next/link";

interface sLink {
  href: string;
  icon: IconType;
  label: string;
}

export default function Socials() {
  const iconSize = 18;

  const Links: sLink[] = [
    {
      href: "https://github.com/priyanzsh",
      icon: LuGithub,
      label: "GitHub"
    },
    {
      href: "https://x.com/priyanzsh_",
      icon: LuTwitter,
      label: "Twitter"
    },
    {
      href: "https://linkedin.com/in/priyanzsh",
      icon: LuLinkedin,
      label: "LinkedIn"
    },
    {
      href: "https://instagram.com/priyanzsh",
      icon: LuInstagram,
      label: "Instagram"
    },
    {
      href: "mailto:priyanzsh@hotmail.com",
      icon: FaAt,
      label: "Email"
    },
    {
      href: "/resume",
      icon: FaFilePdf,
      label: "Resume"
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 mb-3 sm:mb-4">
      {Links.map(({ href, icon: Icon, label }) => {
        const isExternal =
          href.startsWith("http") || href.startsWith("mailto")
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            title={label}
            {...(isExternal ? { target: "_blank" } : {})}
            className="inline-flex items-center justify-center rounded-md w-9 h-9 sm:w-10 sm:h-10 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
          >
            <Icon size={iconSize} />
          </Link>
        );
      })}
    </div>
  );
}
