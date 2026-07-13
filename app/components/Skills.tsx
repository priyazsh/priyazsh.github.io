import { RiNextjsLine, RiGithubLine, RiJavaLine } from "react-icons/ri";

interface Skill {
  name: string;
  icon: React.ComponentType<{ size: number }>;
}

export default function Skills() {
  const skills: Skill[] = [
    { name: "Next.js", icon: RiNextjsLine },
    { name: "Java", icon: RiJavaLine },
    { name: "GitHub Actions", icon: RiGithubLine },
  ];

  return (
    <>
      {skills.map(({ name, icon: Icon }, index) => (
        <span key={name}>
          <span
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm leading-none whitespace-nowrap border"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <span style={{ color: "var(--text-tertiary)", display: "inline-flex", alignItems: "center" }}>
              <Icon size={14} />
            </span>
            <span className="align-middle">{name}</span>
          </span>
          {index < skills.length - 1 && <span> </span>}
        </span>
      ))}
    </>
  );
}
