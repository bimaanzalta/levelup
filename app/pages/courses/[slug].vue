<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center py-32">
      <div class="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
    </div>

    <template v-else-if="course">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-white/40 mb-8">
        <NuxtLink to="/courses" class="hover:text-white transition-colors">Courses</NuxtLink>
        <span>/</span>
        <span class="text-white/60">{{ course.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: Course Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Hero -->
          <div class="rounded-2xl overflow-hidden h-64 relative" :style="{ background: course.gradient }">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-8xl opacity-20">{{ course.icon }}</span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80">
              <div class="flex flex-wrap gap-2 mb-3">
                <span class="badge-purple">{{ course.level }}</span>
                <span class="badge-cyan">{{ course.category }}</span>
              </div>
              <h1 class="text-2xl md:text-3xl font-black text-white">{{ course.title }}</h1>
            </div>
          </div>

          <!-- Description -->
          <div class="glass-card p-6">
            <h2 class="text-white font-bold text-lg mb-3">About This Course</h2>
            <p class="text-white/60 leading-relaxed">{{ course.desc }}</p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
              <div class="text-center">
                <div class="text-white font-bold text-xl">{{ course.lessons }}</div>
                <div class="text-white/40 text-xs mt-1">Lessons</div>
              </div>
              <div class="text-center">
                <div class="text-white font-bold text-xl">{{ course.duration }}</div>
                <div class="text-white/40 text-xs mt-1">Total Duration</div>
              </div>
              <div class="text-center">
                <div class="text-white font-bold text-xl">{{ course.students }}</div>
                <div class="text-white/40 text-xs mt-1">Students</div>
              </div>
              <div class="text-center">
                <div class="text-yellow-400 font-bold text-xl">{{ course.rating }}</div>
                <div class="text-white/40 text-xs mt-1">Rating</div>
              </div>
            </div>
          </div>

          <!-- What You'll Learn -->
          <div class="glass-card p-6">
            <h2 class="text-white font-bold text-lg mb-4">What You'll Learn</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div v-for="item in course.outcomes" :key="item" class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg class="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-white/70 text-sm">{{ item }}</span>
              </div>
            </div>
          </div>

          <!-- Curriculum -->
          <div class="glass-card p-6">
            <h2 class="text-white font-bold text-lg mb-4">Course Curriculum</h2>
            <div class="space-y-3">
              <div
                v-for="(module, idx) in course.modules"
                :key="module.title"
                class="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  @click="toggleModule(Number(idx))"
                  class="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                      {{ Number(idx) + 1 }}
                    </div>
                    <div class="text-left">
                      <div class="text-white font-medium">{{ module.title }}</div>
                      <div class="text-white/40 text-xs">{{ module.lessons.length }} lessons</div>
                    </div>
                  </div>
                  <svg :class="['w-5 h-5 text-white/40 transition-transform', openModules.includes(Number(idx)) ? 'rotate-180' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div v-if="openModules.includes(Number(idx))" class="border-t border-white/5">
                  <div v-for="lesson in module.lessons" :key="lesson.id" class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-all group">
                    <div class="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                      <svg class="w-3 h-3 text-white/40" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="flex-1 text-white/60 text-sm group-hover:text-white transition-colors">{{ lesson.title }}</span>
                    <div class="flex items-center gap-2">
                      <span v-if="lesson.isFree" class="badge-green text-xs">Free</span>
                      <span class="text-white/30 text-xs">{{ lesson.duration }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Enrollment Card -->
        <div class="lg:col-span-1">
          <div class="glass-card p-6 sticky top-20 shadow-neon-purple">
            <!-- Instructor -->
            <div class="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                {{ course.instructor[0] }}
              </div>
              <div>
                <p class="text-white font-semibold">{{ course.instructor }}</p>
                <p class="text-white/40 text-sm">Pro Instructor</p>
              </div>
            </div>

            <!-- Rating -->
            <div class="flex items-center gap-2 mb-4">
              <div class="flex">
                <svg v-for="i in 5" :key="i" class="w-5 h-5 fill-current text-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-white font-bold">{{ course.rating }}</span>
              <span class="text-white/40 text-sm">({{ course.reviews }} reviews)</span>
            </div>

            <!-- Price -->
            <div class="text-3xl font-black text-white mb-1">
              {{ course.price === 0 ? 'Free' : `$${course.price}` }}
            </div>
            <p class="text-white/40 text-sm mb-6">Full lifetime access</p>

            <!-- Enroll Button -->
            <button
              @click="enrollCourse"
              class="btn-primary w-full text-center py-4 text-base mb-3 shadow-neon-purple"
            >
              {{ isEnrolled ? 'Continue Learning' : 'Enroll Now' }}
            </button>
            <p class="text-white/30 text-xs text-center">30-day money-back guarantee</p>

            <!-- Includes -->
            <div class="mt-6 pt-6 border-t border-white/10 space-y-2">
              <p class="text-white/50 text-sm font-semibold mb-3">This course includes:</p>
              <div v-for="include in courseIncludes" :key="include" class="flex items-center gap-2 text-sm text-white/50">
                <svg class="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ include }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Not found -->
    <div v-else class="text-center py-32">
      <div class="text-6xl mb-4">404</div>
      <h2 class="text-white text-2xl font-bold mb-3">Course not found</h2>
      <NuxtLink to="/courses" class="btn-primary">Browse Courses</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = route.params.slug as string

const pending = ref(false)
const isEnrolled = ref(false)
const openModules = ref<number[]>([0])

const courseData: Record<string, any> = {
  'valorant-pro-mechanics': {
    title: 'Valorant Pro Mechanics: Aim, Movement & Game Sense',
    desc: 'Master the fundamentals that separate radiant players from the rest. This comprehensive course covers everything from basic aim training to advanced movement techniques and game reading skills that pros use every match.',
    instructor: 'Alex "SnipePro" Chen',
    level: 'Intermediate',
    category: 'FPS',
    rating: '4.9',
    reviews: 1247,
    lessons: 42,
    duration: '18h 30m',
    students: '8,421',
    price: 49,
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #1a0533, #3b0764)',
    outcomes: [
      'Master crosshair placement and flick shots',
      'Understand movement and counter-strafing',
      'Develop map awareness and game sense',
      'Learn pro-level utility usage',
      'Build mental resilience under pressure',
      'Understand team communication protocols',
    ],
    modules: [
      {
        title: 'Fundamentals of Aim',
        lessons: [
          { id: 1, title: 'Introduction & Course Overview', duration: '5:30', isFree: true },
          { id: 2, title: 'Crosshair Placement Theory', duration: '12:45', isFree: true },
          { id: 3, title: 'Mouse Sensitivity & DPI Setup', duration: '8:20', isFree: false },
          { id: 4, title: 'Aim Training Routines', duration: '18:00', isFree: false },
        ]
      },
      {
        title: 'Movement Mechanics',
        lessons: [
          { id: 5, title: 'Counter-Strafing Explained', duration: '10:15', isFree: false },
          { id: 6, title: 'Jiggle Peaking & Wide Peaking', duration: '14:30', isFree: false },
          { id: 7, title: 'Bunny Hopping & Slide Mechanics', duration: '9:45', isFree: false },
        ]
      },
      {
        title: 'Game Sense & Macro',
        lessons: [
          { id: 8, title: 'Map Control Fundamentals', duration: '16:00', isFree: false },
          { id: 9, title: 'Information Warfare', duration: '11:20', isFree: false },
          { id: 10, title: 'Economy Management', duration: '13:45', isFree: false },
        ]
      },
    ]
  }
}

const course = computed(() => courseData[slug] || null)

useHead({
  title: course.value ? `${course.value.title} - LevelUp` : 'Course Not Found - LevelUp'
})

const courseIncludes = [
  `${course.value?.lessons || 0} video lessons`,
  `${course.value?.duration || 0} of content`,
  'Downloadable resources',
  'Community access',
  'Certificate of completion',
  'Lifetime access',
]

const toggleModule = (idx: number) => {
  if (openModules.value.includes(idx)) {
    openModules.value = openModules.value.filter(i => i !== idx)
  } else {
    openModules.value.push(idx)
  }
}

const enrollCourse = async () => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated.value) {
    await navigateTo('/auth/login')
    return
  }
  if (isEnrolled.value) {
    await navigateTo(`/learn/${slug}/1`)
  } else {
    isEnrolled.value = true
  }
}
</script>
