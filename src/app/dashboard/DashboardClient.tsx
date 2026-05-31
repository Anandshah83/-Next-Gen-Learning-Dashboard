'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Search, 
  Bell, 
  Sparkles,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Course, SidebarItem } from '@/types';
import Sidebar from '@/components/Sidebar';
import HeroTile from '@/components/HeroTile';
import CourseTile from '@/components/CourseTile';
import ActivityTile from '@/components/ActivityTile';
import AnalyticsTile from '@/components/AnalyticsTile';

interface DashboardClientProps {
  courses: Course[];
  isFallback: boolean;
}

export default function DashboardClient({ courses, isFallback }: DashboardClientProps) {
  const [activeItem, setActiveItem] = useState<SidebarItem>('home');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Bento container stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const tileVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 18
      }
    }
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative">
      
      {/* Collapsible/Responsive Navigation Menu */}
      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-24 md:pb-8">
        
        {/* Header Bar */}
        <header className="sticky top-0 bg-background/70 backdrop-blur-md border-b border-card-border/50 px-6 md:px-8 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight capitalize hidden md:block">
              {activeItem === 'home' ? 'Overview' : activeItem}
            </h2>
            
            {/* Supabase status indicator badge */}
            {isFallback ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold">
                <AlertTriangle className="h-3 w-3" />
                <span>Demo Sandbox</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-accent text-[10px] font-bold">
                <Database className="h-3 w-3" />
                <span>Connected to Supabase</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto max-w-xs">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-card-border rounded-xl pl-9 pr-4 py-2 text-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-purple-accent/50 focus:ring-1 focus:ring-purple-accent/20 transition-all"
              />
            </div>

            {/* Notification bell */}
            <button 
              className="relative p-2 rounded-xl border border-card-border bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-purple-accent" />
            </button>
          </div>
        </header>

        {/* Dashboard Pages viewport */}
        <section className="flex-1 px-6 md:px-8 py-6 md:py-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            
            {/* Page 1: Dashboard Home Overview */}
            {activeItem === 'home' && (
              <motion.div
                key="home-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -20, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* 1. Hero Welcome Card (Full desktop width) */}
                <motion.div variants={tileVariants} className="md:col-span-2 lg:col-span-3">
                  <HeroTile />
                </motion.div>

                {/* 2. Course Header (Full desktop width) */}
                <motion.div 
                  variants={tileVariants} 
                  className="md:col-span-2 lg:col-span-3 flex items-center justify-between mt-2"
                >
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                      Active Courses
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-semibold">
                        {filteredCourses.length}
                      </span>
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1">Fetched securely from database schema</p>
                  </div>
                </motion.div>

                {/* 3. Course Cards (Staggered load) */}
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <motion.div key={course.id} variants={tileVariants}>
                      <CourseTile course={course} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    variants={tileVariants}
                    className="col-span-1 md:col-span-2 lg:col-span-3 p-8 rounded-2xl bg-zinc-950 border border-dashed border-card-border text-center text-zinc-500 text-sm font-medium"
                  >
                    No courses match your search criteria.
                  </motion.div>
                )}

                {/* 4. Analytics Weekly Trend Chart */}
                <motion.div variants={tileVariants} className="md:col-span-2 lg:col-span-2">
                  <AnalyticsTile />
                </motion.div>

                {/* 5. Contributions Heatmap Calendar */}
                <motion.div variants={tileVariants} className="md:col-span-2 lg:col-span-1">
                  <ActivityTile />
                </motion.div>
              </motion.div>
            )}

            {/* Page 2: My Courses Detail List */}
            {activeItem === 'courses' && (
              <motion.div
                key="courses-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">My Academic Modules</h1>
                    <p className="text-sm text-zinc-500 mt-1">Manage, sort, and complete your active courses</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400 font-medium">Sort by:</span>
                    <select className="bg-zinc-950 border border-card-border rounded-lg text-xs font-semibold px-3 py-1.5 text-zinc-300 focus:outline-none focus:border-purple-accent cursor-pointer">
                      <option>Last Accessed</option>
                      <option>Progress (Ascending)</option>
                      <option>Progress (Descending)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseTile key={course.id} course={course} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Page 3: Analytics Expanded */}
            {activeItem === 'analytics' && (
              <motion.div
                key="analytics-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Learning Performance Metrics</h1>
                  <p className="text-sm text-zinc-500 mt-1">Deep analysis of focus hours, velocity milestones, and study time</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <AnalyticsTile />
                  </div>
                  
                  {/* Performance stats bento card */}
                  <div className="bg-zinc-900/60 border border-card-border rounded-3xl p-6 bg-grain space-y-6">
                    <h3 className="font-bold text-base text-zinc-100 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-accent" />
                      Weekly Milestones
                    </h3>
                    
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-white">Daily Streak Maintained</div>
                          <div className="text-xs text-zinc-500">Achieved 7 consecutive study days</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-white">Algorithm Marathon Finished</div>
                          <div className="text-xs text-zinc-500">Completed 4 module topics in DSA</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-zinc-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-zinc-400">WebGL Advanced Project</div>
                          <div className="text-xs text-zinc-500">Upload assignment before Wednesday</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Page 4: Profile View */}
            {activeItem === 'profile' && (
              <motion.div
                key="profile-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 max-w-4xl"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 bg-zinc-900/40 border border-card-border p-6 rounded-3xl bg-grain">
                  <div className="relative h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500 via-cyan-500 to-emerald-500 p-[1.5px]">
                    <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center text-2xl font-bold text-white">
                      JD
                    </div>
                  </div>
                  <div className="text-center sm:text-left space-y-1.5">
                    <h1 className="text-2xl font-extrabold text-white">Jane Doe</h1>
                    <p className="text-sm text-purple-accent font-semibold">Master Level 4 Student</p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1.5">
                      <span className="px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-lg text-xs font-semibold">Joined May 2026</span>
                      <span className="px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-lg text-xs font-semibold">React Cert Candidate</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Page 5: Settings Setup */}
            {activeItem === 'settings' && (
              <motion.div
                key="settings-page"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 max-w-2xl"
              >
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Preferences & Settings</h1>
                  <p className="text-sm text-zinc-500 mt-1">Configure app parameters, UI preferences, and API linkages</p>
                </div>

                <div className="bg-zinc-900/60 border border-card-border rounded-3xl p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white block">Supabase Connection State</label>
                    <div className="flex items-center gap-3 p-4 bg-zinc-950 rounded-xl border border-card-border">
                      {isFallback ? (
                        <>
                          <div className="h-3 w-3 rounded-full bg-amber-500 shrink-0" />
                          <div className="flex-1">
                            <span className="text-sm font-semibold text-white block">Mock Database Fallback Mode</span>
                            <span className="text-xs text-zinc-500">Provide environment variables in .env.local to link live database.</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="h-3 w-3 rounded-full bg-emerald-500 shrink-0" />
                          <div className="flex-1">
                            <span className="text-sm font-semibold text-white block">Supabase SQL Connected</span>
                            <span className="text-xs text-zinc-500">Successfully reading course configurations live from database table.</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white block">UI Animation Physics</label>
                    <select className="w-full bg-zinc-950 border border-card-border rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-purple-accent cursor-pointer">
                      <option>Spring Physics (Stiffness: 300, Damping: 20)</option>
                      <option>Linear Glide</option>
                      <option>Friction Snap</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </section>

      </main>
    </div>
  );
}
