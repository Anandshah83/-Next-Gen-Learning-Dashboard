'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, TrendingUp, Clock, Zap } from 'lucide-react';

interface ChartNode {
  day: string;
  hours: number;
  efficiency: number;
}

const weeklyData: ChartNode[] = [
  { day: 'Mon', hours: 1.5, efficiency: 82 },
  { day: 'Tue', hours: 2.2, efficiency: 88 },
  { day: 'Wed', hours: 4.0, efficiency: 95 },
  { day: 'Thu', hours: 1.8, efficiency: 85 },
  { day: 'Fri', hours: 3.5, efficiency: 91 },
  { day: 'Sat', hours: 5.2, efficiency: 98 },
  { day: 'Sun', hours: 2.8, efficiency: 89 },
];

export default function AnalyticsTile() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // SVG Chart sizing
  const width = 500;
  const height = 140;
  const padding = 20;

  // Calculate SVG coordinates
  const points = weeklyData.map((d, index) => {
    const x = padding + (index * (width - padding * 2)) / (weeklyData.length - 1);
    const maxHours = 6; // Max hours scale
    const y = height - padding - (d.hours * (height - padding * 2)) / maxHours;
    return { x, y, ...d };
  });

  // Create SVG path string
  const linePath = points.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  // Create area closed path string
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <motion.article 
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-3xl bg-zinc-900/60 border border-card-border p-6 flex flex-col justify-between bg-mesh-card bg-grain hover-glow cursor-default transition-all duration-300 min-h-[300px] md:min-h-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-card-border/50 pb-4 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <AreaChart className="h-5 w-5 text-cyan-accent" />
          <h3 className="font-bold text-base text-zinc-100">Study Velocity</h3>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-accent text-xs font-semibold">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>+24% vs last week</span>
        </div>
      </div>

      {/* Analytics stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 relative z-10">
        <div className="space-y-1">
          <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Clock className="h-3 w-3 text-cyan-accent" /> Avg Hours
          </div>
          <div className="text-lg font-bold text-white">3.0 hrs/day</div>
        </div>
        <div className="space-y-1">
          <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Zap className="h-3 w-3 text-purple-accent" /> Efficiency
          </div>
          <div className="text-lg font-bold text-white">90.8%</div>
        </div>
        <div className="space-y-1">
          <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Highest Intensity</div>
          <div className="text-lg font-bold text-emerald-accent">5.2 hrs (Sat)</div>
        </div>
      </div>

      {/* SVG Line / Area Chart */}
      <div className="flex-1 relative z-10 w-full min-h-[140px] flex items-center justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            {/* Area gradient */}
            <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.00" />
            </linearGradient>
            {/* Line glow */}
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line 
            x1={padding} y1={height - padding} 
            x2={width - padding} y2={height - padding} 
            stroke="rgba(255,255,255,0.03)" strokeWidth="1" 
          />
          <line 
            x1={padding} y1={padding} 
            x2={width - padding} y2={padding} 
            stroke="rgba(255,255,255,0.03)" strokeWidth="1" 
            strokeDasharray="4 4"
          />

          {/* Area Path */}
          <motion.path
            d={areaPath}
            fill="url(#chartAreaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* Line Path */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            filter="url(#glowFilter)"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          {/* Interactive node circles */}
          {points.map((p, index) => (
            <g key={index} className="cursor-pointer">
              {/* Invisible large target for easier hovering */}
              <circle
                cx={p.x}
                cy={p.y}
                r="16"
                fill="transparent"
                onMouseEnter={() => setHoveredNode(index)}
                onMouseLeave={() => setHoveredNode(null)}
              />

              {/* Glowing inner node circle */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hoveredNode === index ? 6 : 4}
                fill={hoveredNode === index ? '#ffffff' : '#06b6d4'}
                stroke="#030303"
                strokeWidth={2}
                animate={{ scale: hoveredNode === index ? 1.2 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="transition-colors duration-200"
              />

              {/* Day Labels on bottom axis */}
              <text
                x={p.x}
                y={height - 2}
                fill="#4b5563"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
                className="select-none pointer-events-none"
              >
                {p.day}
              </text>
            </g>
          ))}
        </svg>

        {/* Dynamic HTML Tooltip overlay */}
        {hoveredNode !== null && (
          <div 
            className="absolute bg-zinc-950/95 border border-cyan-500/30 px-3 py-2 rounded-xl text-[10px] text-white shadow-2xl z-50 pointer-events-none"
            style={{
              left: `${(points[hoveredNode].x / width) * 100}%`,
              top: `${(points[hoveredNode].y / height) * 60}%`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div className="font-bold text-cyan-accent">{weeklyData[hoveredNode].day} Metrics</div>
            <div className="font-semibold mt-0.5">Study: {weeklyData[hoveredNode].hours} hrs</div>
            <div className="text-zinc-500 font-medium">Focus: {weeklyData[hoveredNode].efficiency}%</div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
