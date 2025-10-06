import { 
  SiNextdotjs
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import { IconType } from "react-icons";
import React from "react";

interface TechSpanProps {
  children: React.ReactNode;
}

interface TechConfig {
  icon: IconType;
  color: string;
  customRender?: boolean;
}

const techConfig: Record<string, TechConfig> = {
  "Javascript": {
    icon: IoLogoJavascript,
    color: "text-[#F7DF1E]"
  },
  "NextJS": {
    icon: SiNextdotjs,
    color: "text-white",
    customRender: true
  },
  "Java": {
    icon: FaJava,
    color: "text-[#007396]"
  }

};

export default function TechSpan({ children }: TechSpanProps) {
  const techName = children?.toString() || "";
  const config = techConfig[techName] || { icon: null, color: "text-gray-200" };
  const Icon = config.icon;

  const baseStyles = "font-medium inline-flex items-center gap-1";
  
  if (Icon && config.customRender) {
    return (
      <span className={baseStyles}>
        <div className="bg-black rounded-full flex items-center justify-center" style={{ width: '16px', height: '16px' }}>
          <Icon size={10} className="text-white" />
        </div>
        <span className="text-gray-200">{children}</span>
      </span>
    );
  }
  
  return (
    <span className={baseStyles}>
      {Icon && <Icon size={16} className={config.color} />}
      <span className="text-gray-200">{children}</span>
    </span>
  );
}
