<template>
  <div class="min-h-screen bg-bg-dark dot-grid">
    <!-- Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-bg-dark/80">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon-purple">
              <span class="text-white font-bold text-sm">L</span>
            </div>
            <span class="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
              Level<span class="text-gradient">Up</span>
            </span>
          </NuxtLink>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-1">
            <NuxtLink to="/courses" class="nav-link">Explore</NuxtLink>
            <NuxtLink to="/dashboard" class="nav-link">Dashboard</NuxtLink>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">
            <template v-if="isAuthenticated">
              <div class="relative group">
                <button class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 transition-all">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                    {{ userInitials }}
                  </div>
                  <svg class="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <!-- Dropdown -->
                <div class="absolute right-0 top-full mt-2 w-48 glass-card py-1 hidden group-hover:block animate-slide-in">
                  <NuxtLink to="/dashboard" class="dropdown-item">My Learning</NuxtLink>
                  <NuxtLink v-if="isAdmin" to="/admin" class="dropdown-item">Admin Panel</NuxtLink>
                  <hr class="border-white/10 my-1" />
                  <button @click="logout" class="dropdown-item w-full text-left text-red-400 hover:text-red-300">
                    Logout
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" class="btn-ghost text-sm py-2 px-4">Login</NuxtLink>
              <NuxtLink to="/auth/register" class="btn-primary text-sm py-2 px-4">Get Started</NuxtLink>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 mt-20 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="col-span-1">
            <NuxtLink to="/" class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span class="text-white font-bold text-sm">L</span>
              </div>
              <span class="text-xl font-bold text-white">Level<span class="text-gradient">Up</span></span>
            </NuxtLink>
            <p class="text-white/40 text-sm leading-relaxed">
              The ultimate learning platform for gaming & esports professionals.
            </p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-3">Platform</h4>
            <ul class="space-y-2 text-sm text-white/40">
              <li><NuxtLink to="/courses" class="hover:text-white transition-colors">Explore Courses</NuxtLink></li>
              <li><NuxtLink to="/dashboard" class="hover:text-white transition-colors">My Learning</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-3">Company</h4>
            <ul class="space-y-2 text-sm text-white/40">
              <li><a href="#" class="hover:text-white transition-colors">About</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-3">Legal</h4>
            <ul class="space-y-2 text-sm text-white/40">
              <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-white/30 text-sm">&copy; {{ new Date().getFullYear() }} LevelUp. All rights reserved.</p>
          <div class="flex items-center gap-1">
            <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <span class="text-white/30 text-xs">System Online</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isAuthenticated, isAdmin, user, logout } = useAuth()

const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
})
</script>

<style scoped>
.nav-link {
  @apply px-4 py-2 rounded-lg text-white/60 font-medium text-sm transition-all duration-200
         hover:text-white hover:bg-white/10;
}

.nav-link.router-link-active {
  @apply text-white bg-primary/20;
}

.dropdown-item {
  @apply block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150;
}
</style>
