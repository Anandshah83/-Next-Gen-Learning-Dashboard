import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-foreground flex flex-col md:flex-row relative">
      
      {/* Sidebar Skeleton (collapsed or expanded matches layouts) */}
      <aside className="hidden md:flex flex-col bg-zinc-950 border-r border-white/5 h-screen sticky top-0 w-20 lg:w-64 p-6 justify-between">
        <div className="space-y-8">
          {/* Logo brand skeleton */}
          <div className="h-6 bg-zinc-900 rounded-lg w-2/3 animate-pulse" />
          
          {/* Menu items skeleton */}
          <div className="space-y-4">
            <div className="h-10 bg-zinc-900 rounded-xl w-full animate-pulse" />
            <div className="h-10 bg-zinc-900 rounded-xl w-full animate-pulse" />
            <div className="h-10 bg-zinc-900 rounded-xl w-full animate-pulse animate-delay-100" />
            <div className="h-10 bg-zinc-900 rounded-xl w-full animate-pulse animate-delay-100" />
            <div className="h-10 bg-zinc-900 rounded-xl w-full animate-pulse animate-delay-200" />
          </div>
        </div>
        
        {/* Footer profile skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-zinc-900 animate-pulse" />
          <div className="flex-1 space-y-1.5 hidden lg:block">
            <div className="h-3.5 bg-zinc-900 rounded w-3/4 animate-pulse" />
            <div className="h-2.5 bg-zinc-900 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </aside>

      {/* Main Content Area Skeleton */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header Bar Skeleton */}
        <header className="sticky top-0 bg-zinc-950 border-b border-white/5 px-6 md:px-8 py-4 flex items-center justify-between z-20">
          <div className="h-6 bg-zinc-900 rounded-lg w-28 animate-pulse" />
          <div className="flex items-center gap-4 w-full md:w-auto max-w-xs">
            <div className="h-9 bg-zinc-900 rounded-xl w-full animate-pulse" />
            <div className="h-9 w-9 bg-zinc-900 rounded-xl animate-pulse" />
          </div>
        </header>

        {/* Bento Grid Skeleton */}
        <section className="flex-1 px-6 md:px-8 py-6 md:py-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Hero Welcome Card Skeleton */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 h-48 bg-zinc-900/40 border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center animate-pulse">
              <div className="space-y-3 w-full md:max-w-md">
                <div className="h-3.5 bg-zinc-900 rounded-full w-24" />
                <div className="h-7 bg-zinc-900 rounded-lg w-3/4" />
                <div className="h-3 bg-zinc-900 rounded-full w-full" />
              </div>
              <div className="h-16 bg-zinc-900 rounded-2xl w-40 mt-4 md:mt-0" />
            </div>

            {/* 2. Course Header Skeleton */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 h-8 bg-zinc-900/20 rounded-md w-36 animate-pulse" />

            {/* 3. Course Card Skeletons */}
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="h-48 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-between items-center">
                  <div className="h-10 w-10 bg-zinc-900 rounded-xl" />
                  <div className="h-5 w-5 bg-zinc-900 rounded-full" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-zinc-900 rounded w-5/6" />
                  <div className="h-3.5 bg-zinc-900 rounded w-1/2" />
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-2.5 bg-zinc-900 rounded w-full" />
                </div>
              </div>
            ))}

            {/* 4. Analytics Chart Skeleton */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[260px] bg-zinc-900/40 border border-white/5 rounded-3xl p-6 animate-pulse animate-delay-200">
              <div className="flex justify-between mb-6">
                <div className="h-5 bg-zinc-900 rounded w-28" />
                <div className="h-5 bg-zinc-900 rounded w-16" />
              </div>
              <div className="h-32 bg-zinc-900/40 rounded-xl w-full" />
            </div>

            {/* 5. Contributions Heatmap Skeleton */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 h-[260px] bg-zinc-900/40 border border-white/5 rounded-3xl p-6 animate-pulse animate-delay-300">
              <div className="flex justify-between mb-6">
                <div className="h-5 bg-zinc-900 rounded w-32" />
                <div className="h-5 bg-zinc-900 rounded w-20" />
              </div>
              <div className="h-28 bg-zinc-900/40 rounded-xl w-full" />
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
