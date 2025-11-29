import { RiNextjsLine, RiGithubLine, RiJavaLine } from "react-icons/ri";

interface Skill {
  name: string;
  icon: React.ComponentType<{ size: number }>;
  color: string;
}

export default function Skills() {
  const iconSize = 14; // Slightly smaller for better mobile fit

  const skills: Skill[] = [
    {
      name: "Next.js",
      icon: RiNextjsLine,
      color: "#E5E5E5",
    },
    {
      name: "Java",
      icon: RiJavaLine,
      color: "#f89820",
    },
    {
      name: "GitHub Actions",
      icon: RiGithubLine,
      color: "#2388ff",
    },
  ];

  return (
    <>
      {skills.map(({ name, icon: Icon, color }, index) => (
        <span key={name}>
          <span
            className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border text-xs sm:text-sm leading-none whitespace-nowrap"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderColor: color,
              color: "inherit",
            }}
          >
            <span style={{ color, display: "inline-flex", alignItems: "center" }}>
              <Icon size={iconSize} />
            </span>
            <span className="align-middle">{name}</span>
          </span>
          {index < skills.length - 1 && <span> </span>}
        </span>
      ))}
    </>
  );
}
