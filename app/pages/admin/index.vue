<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-black text-white mb-1">Admin Dashboard</h1>
      <p class="text-white/40 text-sm">Platform overview and statistics</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="glass-card p-5">
        <div class="flex items-center justify-between mb-4">
          <div :class="['w-11 h-11 rounded-xl flex items-center justify-center', stat.iconBg]">
            <span class="text-2xl">{{ stat.icon }}</span>
          </div>
          <span :class="['text-xs font-semibold px-2 py-1 rounded-full', stat.trend > 0 ? 'bg-accent/10 text-accent' : 'bg-red-500/10 text-red-400']">
            {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
          </span>
        </div>
        <div class="text-3xl font-black text-white mb-1">{{ stat.value }}</div>
        <div class="text-white/40 text-sm">{{ stat.label }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="glass-card p-6">
        <h2 class="text-white font-bold mb-5 flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          Recent Enrollments
        </h2>
        <div class="space-y-3">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all"
          >
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {{ activity.user[0] }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-white text-sm font-medium truncate">{{ activity.user }}</p>
              <p class="text-white/40 text-xs truncate">enrolled in <span class="text-secondary">{{ activity.course }}</span></p>
            </div>
            <span class="text-white/30 text-xs flex-shrink-0">{{ activity.time }}</span>
          </div>
        </div>
      </div>

      <!-- Top Courses -->
      <div class="glass-card p-6">
        <h2 class="text-white font-bold mb-5 flex items-center gap-2">
          <span>📊</span> Top Performing Courses
        </h2>
        <div class="space-y-4">
          <div v-for="(course, idx) in topCourses" :key="course.title">
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-white/30 text-xs font-bold w-5 flex-shrink-0">{{ idx + 1 }}</span>
                <span class="text-white/70 text-sm truncate">{{ course.title }}</span>
              </div>
              <span class="text-primary text-sm font-bold flex-shrink-0 ml-2">{{ course.students }}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${course.percentage}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="glass-card p-6">
      <h2 class="text-white font-bold mb-5">Quick Actions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <NuxtLink
          v-for="action in quickActions"
          :key="action.label"
          :to="action.to"
          class="glass-card-hover p-4 text-center group"
        >
          <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110', action.iconBg]">
            <span class="text-2xl">{{ action.icon }}</span>
          </div>
          <p class="text-white text-sm font-medium">{{ action.label }}</p>
          <p class="text-white/30 text-xs mt-1">{{ action.desc }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Admin Dashboard - LevelUp' })

const stats = [
  { icon: '👥', iconBg: 'bg-primary/20', value: '10,482', label: 'Total Students', trend: 12 },
  { icon: '📚', iconBg: 'bg-secondary/20', value: '24', label: 'Published Courses', trend: 8 },
  { icon: '💰', iconBg: 'bg-accent/20', value: '$48,230', label: 'Monthly Revenue', trend: 23 },
  { icon: '⭐', iconBg: 'bg-yellow-500/20', value: '4.87', label: 'Avg. Rating', trend: 2 },
]

const recentActivity = [
  { id: 1, user: 'Alex Thompson', course: 'Valorant Pro Mechanics', time: '2m ago' },
  { id: 2, user: 'Kim Ji-young', course: 'League Jungle Mastery', time: '15m ago' },
  { id: 3, user: 'Marcus Rivera', course: 'Esports Psychology', time: '1h ago' },
  { id: 4, user: 'Sarah Williams', course: 'CS2 Advanced Tactics', time: '2h ago' },
  { id: 5, user: 'Tyler Johnson', course: 'Fortnite Building', time: '3h ago' },
]

const topCourses = [
  { title: 'Valorant Pro Mechanics', students: '8,421', percentage: 85 },
  { title: 'League Jungle Mastery', students: '6,203', percentage: 63 },
  { title: 'Esports Psychology', students: '4,891', percentage: 50 },
  { title: 'CS2 Advanced Tactics', students: '3,102', percentage: 32 },
]

const quickActions = [
  { icon: '➕', iconBg: 'bg-primary/20', label: 'Create Course', desc: 'Add new course', to: '/admin/courses/create' },
  { icon: '📋', iconBg: 'bg-secondary/20', label: 'Manage Courses', desc: 'View all courses', to: '/admin/courses' },
  { icon: '👤', iconBg: 'bg-accent/20', label: 'View Students', desc: 'Manage users', to: '/admin' },
  { icon: '📊', iconBg: 'bg-yellow-500/20', label: 'Analytics', desc: 'View reports', to: '/admin' },
]
</script>
