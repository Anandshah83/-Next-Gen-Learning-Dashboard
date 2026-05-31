'use client';

import React from 'react';
import { Home, BookOpen, BarChart3, User, Settings, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SidebarItem } from '@/types';

const navItems = [
  { id: 'home', label: 'Dashboard', icon: Home },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const;

type NavigationItem = (typeof navItems)[number];

interface SidebarProps {
  activeItem: SidebarItem;
  setActiveItem: (item: SidebarItem) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ activeItem, setActiveItem, isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <>
      <aside className={`hidden md:flex flex-col bg-zinc-950/80 border-r border-card-border h-screen sticky top-0 transition-all duration-300 ease-in-out z-30 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center justify-between p-6 border-b border-card-border">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-accent">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <span className="font-semibold text-lg bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                AetherLoom
              </span>
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-accent mx-auto">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-white/5 border border-transparent hover:border-card-border text-zinc-400 hover:text-white transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors duration-200 ${active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'} ${isCollapsed ? 'justify-center' : ''}`}
              >
                {active && (
                  <span className="absolute inset-0 bg-white/5 border-l-2 border-purple-accent rounded-xl" />
                )}

                <span className="relative z-10">
                  <Icon className="h-5 w-5" />
                </span>

                {!isCollapsed && <span className="relative z-10">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="p-6 border-t border-card-border flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1px]">
              <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center text-xs font-semibold text-white">
                JD
              </div>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-zinc-950" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate">John Doe</span>
              <span className="text-xs text-zinc-500 truncate">Beta Explorer</span>
            </div>
          </div>
        )}
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-xl border-t border-card-border py-2.5 px-6 flex justify-around items-center z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors duration-200 ${active ? 'text-purple-accent' : 'text-zinc-500'}`}
            >
              {active && (
                <span className="absolute inset-0 bg-purple-500/10 rounded-xl" />
              )}

              <Icon className="h-5 w-5 relative z-10" />
              <span className="text-[10px] font-semibold tracking-wider relative z-10">
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
