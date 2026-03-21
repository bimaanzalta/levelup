<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-10">
      <div class="section-tag mb-3">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        All Courses
      </div>
      <h1 class="text-4xl font-black text-white mb-3">Explore <span class="text-gradient">Courses</span></h1>
      <p class="text-white/40">Find the perfect course to elevate your gaming skills</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Filters -->
      <aside class="lg:w-64 flex-shrink-0">
        <div class="glass-card p-5 sticky top-20">
          <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
            <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </h3>

          <!-- Search -->
          <div class="mb-6">
            <label class="text-white/50 text-xs uppercase tracking-wider mb-2 block">Search</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search courses..."
                class="input-field pl-10 text-sm py-2"
              />
            </div>
          </div>

          <!-- Category -->
          <div class="mb-6">
            <label class="text-white/50 text-xs uppercase tracking-wider mb-2 block">Category</label>
            <div class="space-y-1">
              <button
                v-for="cat in categories"
                :key="cat.value"
                @click="selectedCategory = cat.value"
                :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150', selectedCategory === cat.value ? 'bg-primary/20 text-purple-300 border border-primary/30' : 'text-white/50 hover:text-white hover:bg-white/5']"
              >
                {{ cat.label }}
                <span class="float-right text-white/30 text-xs">{{ cat.count }}</span>
              </button>
            </div>
          </div>

          <!-- Level -->
          <div class="mb-6">
            <label class="text-white/50 text-xs uppercase tracking-wider mb-2 block">Level</label>
            <div class="space-y-1">
              <button
                v-for="level in levels"
                :key="level.value"
                @click="selectedLevel = level.value"
                :class="['w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150', selectedLevel === level.value ? 'bg-primary/20 text-purple-300 border border-primary/30' : 'text-white/50 hover:text-white hover:bg-white/5']"
              >
                {{ level.label }}
              </button>
            </div>
          </div>

          <!-- Clear filters -->
          <button
            v-if="hasFilters"
            @click="clearFilters"
            class="w-full py-2 text-sm text-white/40 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all"
          >
            Clear all filters
          </button>
        </div>
      </aside>

      <!-- Courses Grid -->
      <div class="flex-1">
        <!-- Sort bar -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-white/40 text-sm">
            <span class="text-white font-semibold">{{ filteredCourses.length }}</span> courses found
          </p>
          <select v-model="sortBy" class="input-field py-2 text-sm w-auto">
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCourses.length === 0" class="glass-card p-16 text-center">
          <div class="text-5xl mb-4">🔍</div>
          <h3 class="text-white font-bold text-xl mb-2">No courses found</h3>
          <p class="text-white/40 mb-6">Try adjusting your filters or search query</p>
          <button @click="clearFilters" class="btn-primary">Clear Filters</button>
        </div>

        <!-- Courses Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <NuxtLink
            v-for="course in filteredCourses"
            :key="course.slug"
            :to="`/courses/${course.slug}`"
            class="glass-card-hover overflow-hidden group block"
          >
            <!-- Thumbnail -->
            <div class="h-40 relative overflow-hidden" :style="{ background: course.gradient }">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-5xl opacity-30">{{ course.icon }}</span>
              </div>
              <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
                <span class="badge-purple">{{ course.level }}</span>
              </div>
              <div class="absolute top-3 right-3">
                <span class="badge-cyan text-xs">{{ course.category }}</span>
              </div>
            </div>

            <!-- Info -->
            <div class="p-4">
              <h3 class="text-white font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                {{ course.title }}
              </h3>
              <p class="text-white/40 text-xs mb-3 line-clamp-2">{{ course.desc }}</p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-white/40">{{ course.instructor }}</span>
                <div class="flex items-center gap-1 text-yellow-400">
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-white/50">{{ course.rating }}</span>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
                <span>{{ course.lessons }} lessons</span>
                <span>{{ course.duration }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
useHead({ title: 'Explore Courses - LevelUp' })

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedLevel = ref('all')
const sortBy = ref('popular')

const categories = [
  { label: 'All Categories', value: 'all', count: 24 },
  { label: 'FPS', value: 'fps', count: 8 },
  { label: 'MOBA', value: 'moba', count: 6 },
  { label: 'Battle Royale', value: 'br', count: 4 },
  { label: 'Mindset', value: 'mindset', count: 3 },
  { label: 'Streaming', value: 'streaming', count: 3 },
]

const levels = [
  { label: 'All Levels', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]

const allCourses = [
  { slug: 'valorant-pro-mechanics', title: 'Valorant Pro Mechanics: Aim, Movement & Game Sense', desc: 'Master the fundamentals that separate radiant players.', instructor: 'Alex Chen', level: 'Intermediate', levelVal: 'intermediate', category: 'FPS', categoryVal: 'fps', rating: '4.9', lessons: 42, duration: '18h 30m', icon: '🎯', gradient: 'linear-gradient(135deg, #1a0533, #3b0764)' },
  { slug: 'league-jungle-mastery', title: 'League of Legends: Jungle Mastery & Macro Play', desc: 'Climb from Silver to Diamond by mastering jungle pathing.', instructor: 'Kim Park', level: 'Advanced', levelVal: 'advanced', category: 'MOBA', categoryVal: 'moba', rating: '4.8', lessons: 56, duration: '24h', icon: '🗡️', gradient: 'linear-gradient(135deg, #0a1628, #1a3a5c)' },
  { slug: 'esports-mental-game', title: 'The Mental Game: Esports Psychology', desc: 'Learn how top esports athletes manage pressure and tilt.', instructor: 'Dr. Sarah Williams', level: 'Beginner', levelVal: 'beginner', category: 'Mindset', categoryVal: 'mindset', rating: '4.95', lessons: 28, duration: '10h', icon: '🧠', gradient: 'linear-gradient(135deg, #0f172a, #1e1b4b)' },
  { slug: 'cs2-advanced-tactics', title: 'CS2: Advanced Tactics & Team Coordination', desc: 'From semi-pro to pro level with advanced team strategies.', instructor: 'Marcus "Steel" Rivera', level: 'Advanced', levelVal: 'advanced', category: 'FPS', categoryVal: 'fps', rating: '4.7', lessons: 38, duration: '16h', icon: '💣', gradient: 'linear-gradient(135deg, #1a1a0a, #3d3d00)' },
  { slug: 'fortnite-building-mechanics', title: 'Fortnite: Pro Building & Edit Mechanics', desc: 'Master the building and editing techniques used by top players.', instructor: 'Tyler "Builder" Scott', level: 'Intermediate', levelVal: 'intermediate', category: 'Battle Royale', categoryVal: 'br', rating: '4.6', lessons: 33, duration: '14h', icon: '🏗️', gradient: 'linear-gradient(135deg, #1a0a00, #4a2500)' },
  { slug: 'twitch-streaming-pro', title: 'Professional Game Streaming on Twitch & YouTube', desc: 'Build your audience and monetize your gaming passion.', instructor: 'Emma "StreamQueen" Davis', level: 'Beginner', levelVal: 'beginner', category: 'Streaming', categoryVal: 'streaming', rating: '4.8', lessons: 45, duration: '20h', icon: '📡', gradient: 'linear-gradient(135deg, #0d001a, #2d0045)' },
]

const hasFilters = computed(() =>
  searchQuery.value !== '' || selectedCategory.value !== 'all' || selectedLevel.value !== 'all'
)

const filteredCourses = computed(() => {
  let courses = [...allCourses]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    courses = courses.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
  }
  if (selectedCategory.value !== 'all') {
    courses = courses.filter(c => c.categoryVal === selectedCategory.value)
  }
  if (selectedLevel.value !== 'all') {
    courses = courses.filter(c => c.levelVal === selectedLevel.value)
  }
  return courses
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  selectedLevel.value = 'all'
}
</script>
