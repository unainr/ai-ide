"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  site: {
    id: string;
    name: string;
    // Add other properties if available in the future, e.g. description, thumbnail
  };
  index: number;
}

export const ProjectCard = ({ site, index }: ProjectCardProps) => {
  return (
    <Link href={`/project/${site.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative h-full flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all duration-500"
      >
        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card Content Container */}
        <div className="relative flex flex-col h-full p-6 z-10">
          {/* Header / Icon */}
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Title & Info */}
          <div className="mt-auto space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 truncate">
              {site.name}
            </h3>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
               <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Active Project</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
      </motion.div>
    </Link>
  );
};
