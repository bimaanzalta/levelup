<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="flex items-start justify-between mb-10">
      <div>
        <div class="section-tag mb-3">My Dashboard</div>
        <h1 class="text-3xl md:text-4xl font-black text-white">
          Welcome back, <span class="text-gradient">{{ user?.name || 'Player' }}</span> 👾
        </h1>
        <p class="text-white/40 mt-2">Continue your learning journey</p>
      </div>
      <NuxtLink to="/courses" class="btn-primary hidden md:flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Find Courses
      </NuxtLink>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div v-for="stat in stats" :key="stat.label" class="glass-card p-5">
        <div class="flex items-center gap-3 mb-3">
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', stat.iconBg]">
            <span class="text-xl">{{ stat.icon }}</span>
          </div>
        </div>
        <div class="text-2xl font-black text-white">{{ stat.value }}</div>
        <div class="text-white/40 text-sm mt-1">{{ stat.label }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Active Courses -->
      <div class="lg:col-span-2 space-y-6">
        <h2 class="text-white font-bold text-xl">Continue Learning</h2>

        <div v-if="activeCourses.length === 0" class="glass-card p-12 text-center">
          <div class="text-5xl mb-4">🎮</div>
          <h3 class="text-white font-bold text-lg mb-2">No courses yet</h3>
          <p class="text-white/40 mb-6 text-sm">Start your first course and level up your skills</p>
          <NuxtLink to="/courses" class="btn-primary">Browse Courses</NuxtLink>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="course in activeCourses"
            :key="course.slug"
            class="glass-card-hover p-5 flex flex-col md:flex-row gap-5"
          >
            <!-- Thumbnail -->
            <div class="w-full md:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 relative"
              :style="{ background: course.gradient }">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-4xl opacity-30">{{ course.icon }}</span>
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2 mb-1">
                <h3 class="text-white font-semibold text-sm line-clamp-2">{{ course.title }}</h3>
                <span class="badge-purple flex-shrink-0">{{ course.level }}</span>
              </div>
              <p class="text-white/40 text-xs mb-3">By {{ course.instructor }}</p>

              <!-- Progress -->
              <div class="space-y-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-white/40">Progress</span>
                  <span class="text-primary font-semibold">{{ course.progress }}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: `${course.progress}%` }"></div>
                </div>
                <p class="text-white/30 text-xs">{{ course.completedLessons }}/{{ course.totalLessons }} lessons</p>
              </div>

              <div class="mt-3 flex gap-2">
                <NuxtLink
                  :to="`/learn/${course.slug}/1`"
                  class="btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                  </svg>
                  Continue
                </NuxtLink>
                <NuxtLink :to="`/courses/${course.slug}`" class="btn-ghost text-xs py-1.5 px-3">
                  Details
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Achievements -->
        <div class="glass-card p-5">
          <h2 class="text-white font-bold mb-4 flex items-center gap-2">
            <span>🏆</span> Achievements
          </h2>
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="achievement in achievements"
              :key="achievement.name"
              :class="['text-center p-3 rounded-xl border transition-all duration-200', achievement.unlocked ? 'bg-primary/10 border-primary/30 hover:shadow-glow-sm' : 'bg-white/5 border-white/5 opacity-40']"
            >
              <div class="text-2xl mb-1">{{ achievement.icon }}</div>
              <div class="text-white/60 text-xs">{{ achievement.name }}</div>
            </div>
          </div>
        </div>

        <!-- Certificates -->
        <div class="glass-card p-5">
          <h2 class="text-white font-bold mb-4 flex items-center gap-2">
            <span>📜</span> Certificates
          </h2>
          <div v-if="certificates.length === 0" class="text-center py-6">
            <p class="text-white/30 text-sm">Complete a course to earn your first certificate</p>
          </div>
          <div v-else class="space-y-3">
            <NuxtLink
              v-for="cert in certificates"
              :key="cert.courseId"
              :to="`/certificate/${cert.courseId}`"
              class="flex items-center gap-3 p-3 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all group"
            >
              <div class="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-white text-sm font-medium truncate group-hover:text-accent transition-colors">{{ cert.courseName }}</p>
                <p class="text-white/40 text-xs">Issued {{ cert.issuedAt }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })
useHead({ title: 'Dashboard - LevelUp' })

const { user } = useAuth()

const stats = [
  { icon: '📚', iconBg: 'bg-primary/20', value: '3', label: 'Active Courses' },
  { icon: '✅', iconBg: 'bg-accent/20', value: '47', label: 'Lessons Done' },
  { icon: '🔥', iconBg: 'bg-orange-500/20', value: '12', label: 'Day Streak' },
  { icon: '📜', iconBg: 'bg-secondary/20', value: '1', label: 'Certificates' },
]

const activeCourses = [
  {
    slug: 'valorant-pro-mechanics',
    title: 'Valorant Pro Mechanics: Aim, Movement & Game Sense',
    instructor: 'Alex Chen',
    level: 'Intermediate',
    progress: 65,
    completedLessons: 27,
    totalLessons: 42,
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #1a0533, #3b0764)',
  },
  {
    slug: 'league-jungle-mastery',
    title: 'League of Legends: Jungle Mastery & Macro Play',
    instructor: 'Kim Park',
    level: 'Advanced',
    progress: 30,
    completedLessons: 17,
    totalLessons: 56,
    icon: '🗡️',
    gradient: 'linear-gradient(135deg, #0a1628, #1a3a5c)',
  },
]

const achievements = [
  { icon: '🚀', name: 'First Lesson', unlocked: true },
  { icon: '🔥', name: '7-Day Streak', unlocked: true },
  { icon: '⚡', name: 'Speed Learner', unlocked: false },
  { icon: '🎯', name: 'Sharpshooter', unlocked: false },
  { icon: '👑', name: 'Champion', unlocked: false },
  { icon: '🏆', name: 'Graduate', unlocked: false },
]

const certificates = [
  { courseId: 'esports-mental-game', courseName: 'Esports Psychology & Peak Performance', issuedAt: 'Feb 2026' },
]
</script>
