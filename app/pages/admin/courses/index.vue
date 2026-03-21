<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-white mb-1">Courses</h1>
        <p class="text-white/40 text-sm">{{ courses.length }} courses total</p>
      </div>
      <NuxtLink to="/admin/courses/create" class="btn-primary flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Course
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="glass-card p-4 flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Search courses..." class="input-field pl-10 text-sm py-2.5" />
      </div>
      <select v-model="statusFilter" class="input-field py-2.5 text-sm w-full sm:w-40">
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="archived">Archived</option>
      </select>
    </div>

    <!-- Table -->
    <div class="glass-card overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-white/5">
            <th class="text-left py-3.5 px-5 text-white/40 text-xs uppercase tracking-wider font-semibold">Course</th>
            <th class="text-left py-3.5 px-4 text-white/40 text-xs uppercase tracking-wider font-semibold hidden md:table-cell">Status</th>
            <th class="text-left py-3.5 px-4 text-white/40 text-xs uppercase tracking-wider font-semibold hidden lg:table-cell">Students</th>
            <th class="text-left py-3.5 px-4 text-white/40 text-xs uppercase tracking-wider font-semibold hidden lg:table-cell">Level</th>
            <th class="text-right py-3.5 px-5 text-white/40 text-xs uppercase tracking-wider font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in filteredCourses" :key="course.id" class="border-b border-white/5 hover:bg-white/5 transition-all">
            <td class="py-4 px-5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 relative" :style="{ background: course.gradient }">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <span class="text-xl opacity-60">{{ course.icon }}</span>
                  </div>
                </div>
                <div class="min-w-0">
                  <p class="text-white font-medium text-sm truncate max-w-xs">{{ course.title }}</p>
                  <p class="text-white/40 text-xs truncate">{{ course.instructor }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-4 hidden md:table-cell">
              <span :class="statusClass(course.status)">{{ course.status }}</span>
            </td>
            <td class="py-4 px-4 text-white/60 text-sm hidden lg:table-cell">{{ course.students }}</td>
            <td class="py-4 px-4 hidden lg:table-cell">
              <span class="badge-purple capitalize">{{ course.level }}</span>
            </td>
            <td class="py-4 px-5">
              <div class="flex items-center justify-end gap-2">
                <button class="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Edit">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="toggleStatus(course)" class="p-1.5 text-white/40 hover:text-accent hover:bg-accent/10 rounded-lg transition-all" :title="course.status === 'published' ? 'Unpublish' : 'Publish'">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button class="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredCourses.length === 0" class="text-center py-16">
        <div class="text-4xl mb-3">📭</div>
        <p class="text-white/40">No courses match your filters</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Manage Courses - LevelUp Admin' })

const searchQuery = ref('')
const statusFilter = ref('all')

const courses = ref([
  { id: 1, title: 'Valorant Pro Mechanics: Aim, Movement & Game Sense', instructor: 'Alex Chen', level: 'intermediate', status: 'published', students: 8421, icon: '🎯', gradient: 'linear-gradient(135deg, #1a0533, #3b0764)' },
  { id: 2, title: 'League of Legends: Jungle Mastery & Macro Play', instructor: 'Kim Park', level: 'advanced', status: 'published', students: 6203, icon: '🗡️', gradient: 'linear-gradient(135deg, #0a1628, #1a3a5c)' },
  { id: 3, title: 'The Mental Game: Esports Psychology', instructor: 'Dr. Sarah Williams', level: 'beginner', status: 'published', students: 4891, icon: '🧠', gradient: 'linear-gradient(135deg, #0f172a, #1e1b4b)' },
  { id: 4, title: 'CS2: Advanced Tactics & Team Coordination', instructor: 'Marcus Rivera', level: 'advanced', status: 'draft', students: 0, icon: '💣', gradient: 'linear-gradient(135deg, #1a1a0a, #3d3d00)' },
  { id: 5, title: 'Game Streaming on Twitch & YouTube', instructor: 'Emma Davis', level: 'beginner', status: 'draft', students: 0, icon: '📡', gradient: 'linear-gradient(135deg, #0d001a, #2d0045)' },
])

const filteredCourses = computed(() => {
  let result = courses.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q))
  }
  if (statusFilter.value !== 'all') {
    result = result.filter(c => c.status === statusFilter.value)
  }
  return result
})

const statusClass = (status: string) => {
  const classes: Record<string, string> = {
    published: 'badge-green',
    draft: 'badge bg-white/10 text-white/50 border border-white/10',
    archived: 'badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  }
  return classes[status] || 'badge-purple'
}

const toggleStatus = (course: any) => {
  course.status = course.status === 'published' ? 'draft' : 'published'
}
</script>
