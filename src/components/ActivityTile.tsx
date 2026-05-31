'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { CalendarRange, Flame } from 'lucide-react';

const activityData = [
  [0, 1, 2, 2, 3, 4, 2],
  [1, 1, 2, 3, 2, 3, 1],
  [1, 2, 3, 4, 3, 2, 2],
  [2, 3, 3, 3, 4, 4, 3],
  [1, 2, 3, 2, 2, 3, 1],
  [0, 1, 2, 2, 3, 3, 2],
];

const getCellColor = (level: number) => {
  switch (level) {
    case 1:
      return 'bg-purple-950/40 border-purple-900/10';
    case 2:
      return 'bg-purple-800/30 border-purple-700/20';
    case 3:
      return 'bg-purple-600/50 border-purple-500/30';
    case 4:
      return 'bg-purple-500 border-purple-400/40';
    default:
      return 'bg-zinc-950/80 border-transparent';
  }
};

const containerMotion: Variants = {
  hidden: { opacity: 0 }, 
  show: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const columnMotion: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
};

export default function ActivityTile() {
  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-3xl bg-zinc-900/60 border border-card-border p-6 flex flex-col justify-between bg-grain min-h-[300px]"
    >
      <div className="flex items-center justify-between border-b border-card-border/50 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <CalendarRange className="h-5 w-5 text-purple-accent" />
          <h3 className="font-bold text-base text-zinc-100">Learning Activity</h3>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500">
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-amber-500" />
            142 Total Hrs
          </span>
          <span>Last 24 Weeks</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-2">
        <motion.div variants={containerMotion} initial="hidden" animate="show" className="flex gap-[3.5px] min-w-[420px]">
          <div className="grid grid-rows-7 gap-[3.5px] pr-2 text-[9px] font-bold text-zinc-600 justify-items-end select-none h-28 pt-1">
            <span>Mon</span>
            <span className="opacity-0">Tue</span>
            <span>Wed</span>
            <span className="opacity-0">Thu</span>
            <span>Fri</span>
            <span className="opacity-0">Sat</span>
            <span>Sun</span>
          </div>

          {activityData.map((week, index) => (
            <motion.div key={index} variants={columnMotion} className="grid grid-rows-7 gap-[3.5px] h-28">
              {week.map((level, day) => (
                <div key={day} className={`w-3.5 h-3.5 rounded-[3px] border ${getCellColor(level)} transition-colors duration-200`} />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 mt-4 select-none">
        <span>Active consistency index</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-950 border border-card-border" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-purple-950/40 border border-purple-900/10" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-purple-800/30 border border-purple-700/20" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-purple-600/50 border border-purple-500/30" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-purple-500 border border-purple-400/40" />
          <span>More</span>
        </div>
      </div>
    </motion.article>
  );
}
