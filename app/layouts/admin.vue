<template>
  <div class="min-h-screen bg-bg-dark flex">
    <!-- Sidebar -->
    <aside class="w-64 min-h-screen border-r border-white/5 bg-bg-dark/90 backdrop-blur-sm fixed left-0 top-0 z-40 flex flex-col">
      <!-- Logo -->
      <div class="p-6 border-b border-white/5">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon-purple">
            <span class="text-white font-bold text-sm">L</span>
          </div>
          <div>
            <span class="text-lg font-bold text-white">Level<span class="text-gradient">Up</span></span>
            <p class="text-xs text-white/30">Admin Panel</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <p class="text-white/30 text-xs uppercase font-semibold tracking-wider px-4 py-2">Overview</p>
        <NuxtLink to="/admin" class="sidebar-item" exact-active-class="active">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </NuxtLink>

        <p class="text-white/30 text-xs uppercase font-semibold tracking-wider px-4 py-2 mt-4">Content</p>
        <NuxtLink to="/admin/courses" class="sidebar-item" active-class="active">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Courses
        </NuxtLink>

        <p class="text-white/30 text-xs uppercase font-semibold tracking-wider px-4 py-2 mt-4">System</p>
        <NuxtLink to="/" class="sidebar-item">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Site
        </NuxtLink>
      </nav>

      <!-- User Info -->
      <div class="p-4 border-t border-white/5">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white text-sm font-medium truncate">Admin User</p>
            <p class="text-white/40 text-xs truncate">admin@levelup.gg</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 ml-64 min-h-screen">
      <!-- Top Bar -->
      <header class="h-16 border-b border-white/5 bg-bg-dark/90 backdrop-blur-sm sticky top-0 z-30 flex items-center px-6 gap-4">
        <div class="flex-1">
          <h2 class="text-white/60 text-sm">Admin Panel</h2>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span class="text-white/40 text-xs">Live</span>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
