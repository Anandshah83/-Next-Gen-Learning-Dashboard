'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Binary, Cpu, ArrowUpRight } from 'lucide-react';
import { Course } from '@/types';

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Sparkles,
  Binary,
  Cpu,
};

interface CourseTileProps {
  course: Course;
}

function getTheme(progress: number) {
  if (progress >= 80) {
    return {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-accent',
      bar: 'bg-gradient-to-r from-emerald-400 to-teal-400',
      glow: 'shadow-emerald-500/10 border-emerald-500/20'
    };
  }

  if (progress >= 40) {
    return {
      bg: 'bg-purple-500/10',
      text: 'text-purple-accent',
      bar: 'bg-gradient-to-r from-purple-400 to-indigo-400',
      glow: 'shadow-purple-500/10 border-purple-500/20'
    };
  }

  return {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-accent',
    bar: 'bg-gradient-to-r from-cyan-400 to-blue-400',
    glow: 'shadow-cyan-500/10 border-cyan-500/20'
  };
}

export default function CourseTile({ course }: CourseTileProps) {
  const Icon = iconMap[course.icon_name] || BookOpen;
  const theme = getTheme(course.progress);

  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-2xl bg-zinc-900/60 border border-card-border p-6 flex flex-col justify-between h-48 bg-grain hover-glow cursor-pointer transition-shadow duration-300 shadow-md ${theme.glow}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div className={`p-3 rounded-xl ${theme.bg} ${theme.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="p-1 rounded-full bg-white/0 text-zinc-500 group-hover:bg-white/5 group-hover:text-white transition-all duration-300">
          <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      <div className="mt-4 flex-1 relative z-10">
        <h3 className="font-bold text-base text-zinc-100 group-hover:text-white transition-colors line-clamp-2">
          {course.title}
        </h3>
      </div>

      <div className="space-y-2 mt-4 relative z-10">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-zinc-500 group-hover:text-zinc-400 transition-colors">Progress</span>
          <span className="text-zinc-200">{course.progress}%</span>
        </div>
        <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`h-full rounded-full ${theme.bar}`}
          />
        </div>
      </div>
    </motion.article>
  );
}
