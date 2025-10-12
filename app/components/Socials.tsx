"use client";

import Link from "next/link";
import { LuInstagram, LuLinkedin, LuTwitter, LuGithub } from "react-icons/lu";
import { motion } from "framer-motion";

interface SocialLink {
    href: string;
    icon: React.ComponentType<{ size: number }>;
    label: string;
}

export default function Socials() {
    const iconSize = 24;
    
    const socialLinks: SocialLink[] = [
        {
            href: "https://github.com/oyepriyansh",
            icon: LuGithub,
            label: "GitHub"
        },
        {
            href: "https://x.com/oyepriyansh",
            icon: LuTwitter,
            label: "Twitter"
        },
        {
            href: "https://linkedin.com/in/priyanshprajapat",
            icon: LuLinkedin,
            label: "LinkedIn"
        },
        {
            href: "https://instagram.com/oyepriyansh",
            icon: LuInstagram,
            label: "Instagram"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { 
            y: 50, 
            opacity: 0,
            scale: 0.5,
            rotate: -180
        },
        visible: { 
            y: 0, 
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <motion.div 
            className="flex space-x-4 mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {socialLinks.map(({ href, icon: Icon, label }) => (
                <motion.div
                    key={label}
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.2,
                        rotate: [0, -10, 10, -10, 10, -10, 0],
                        y: -10,
                        transition: { 
                            duration: 0.4,
                            rotate: {
                                duration: 0.4
                            }
                        }
                    }}
                    whileTap={{ 
                        scale: 0.9,
                        rotate: 360,
                        transition: { duration: 0.6 }
                    }}
                >
                    <Link href={href} target="_blank">
                        <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <Icon size={iconSize} />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
