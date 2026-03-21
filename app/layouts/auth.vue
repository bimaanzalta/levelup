<template>
  <div class="min-h-screen bg-bg-dark flex items-center justify-center relative overflow-hidden">
    <!-- Background effects -->
    <div class="absolute inset-0 dot-grid opacity-50"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-md px-4">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon-purple">
            <span class="text-white font-bold">L</span>
          </div>
          <span class="text-2xl font-bold text-white">Level<span class="text-gradient">Up</span></span>
        </NuxtLink>
        <p class="text-white/40 text-sm mt-2">Gaming & Esports Learning Platform</p>
      </div>

      <!-- Card -->
      <div class="glass-card p-8 shadow-neon-purple/20">
        <slot />
      </div>

      <!-- Footer -->
      <p class="text-center text-white/30 text-xs mt-6">
        &copy; {{ new Date().getFullYear() }} LevelUp. Level up your game.
      </p>
    </div>
  </div>
</template>
