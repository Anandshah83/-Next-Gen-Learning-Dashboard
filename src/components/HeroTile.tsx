'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar } from 'lucide-react';

export default function HeroTile() {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-zinc-900/60 border border-card-border p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-mesh-purple bg-grain hover-glow cursor-default transition-all duration-300">
      
      {/* Welcome content */}
      <div className="space-y-4 max-w-lg relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-accent text-xs font-semibold">
          <Trophy className="h-3.5 w-3.5" />
          <span>Top 3% this week</span>
        </div>
        
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back,{' '}
            <span className="bg-gradient-to-r from-purple-accent via-cyan-accent to-emerald-accent bg-clip-text text-transparent">
              Jane Doe
            </span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Your neural pathways are ready. Continue learning to maintain your high efficiency ranking.
          </p>
        </div>

        {/* Date tracker */}
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
          <Calendar className="h-4 w-4" />
          <span>Last active: Today at 8:15 AM</span>
        </div>
      </div>

      {/* Streak Dashboard stats */}
      <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
        {/* Streak card widget */}
        <div className="flex-1 md:flex-initial flex items-center gap-4 bg-zinc-950/50 border border-card-border p-4 rounded-2xl">
          <div className="relative">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
              className="p-3 bg-amber-500/15 text-amber-500 rounded-xl"
            >
              <Flame className="h-6 w-6 fill-amber-500/30" />
            </motion.div>
            
            {/* Sparkles particles */}
            <motion.span 
              animate={{ y: [-10, -25], opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="absolute top-0 left-2 w-1.5 h-1.5 bg-amber-400 rounded-full"
            />
            <motion.span 
              animate={{ y: [-12, -30], opacity: [0, 1, 0], scale: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 1.2 }}
              className="absolute top-1 right-2 w-1 h-1 bg-orange-400 rounded-full"
            />
          </div>
          <div>
            <div className="text-2xl font-bold text-white tracking-tight">7 Days</div>
            <div className="text-xs text-zinc-400 font-medium">Current Streak</div>
          </div>
        </div>

        {/* Circular radial goal percentage */}
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 flex items-center justify-center">
            {/* SVG circle container */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-zinc-800"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="26"
                stroke="url(#gradientHeroCircle)"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 26}
                initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - 0.80) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradientHeroCircle" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-xs font-bold text-white">80%</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Daily Target</div>
            <div className="text-xs text-zinc-500 font-medium">4/5 tasks finished</div>
          </div>
        </div>
      </div>
      
    </article>
  );
}
