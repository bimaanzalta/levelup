<template>
  <div class="h-screen bg-bg-dark flex flex-col overflow-hidden">
    <!-- Top Bar -->
    <header class="h-14 border-b border-white/5 bg-bg-dark/90 backdrop-blur-sm flex items-center px-4 gap-4 flex-shrink-0">
      <NuxtLink :to="`/courses/${courseSlug}`" class="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-sm hidden md:block">Back to Course</span>
      </NuxtLink>

      <div class="flex-1 text-center">
        <p class="text-white font-semibold text-sm truncate">{{ currentLesson?.title }}</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Progress -->
        <div class="hidden md:flex items-center gap-2">
          <div class="w-24 progress-bar">
            <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
          </div>
          <span class="text-white/40 text-xs">{{ progress }}%</span>
        </div>
        <NuxtLink to="/" class="flex items-center gap-1">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span class="text-white font-bold text-xs">L</span>
          </div>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Video/Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Video Player -->
        <div class="bg-black flex-shrink-0" style="aspect-ratio: 16/9; max-height: calc(100vh - 14rem);">
          <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-black to-bg-dark relative">
            <!-- Play button placeholder -->
            <div class="text-center">
              <button class="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center mx-auto mb-4 hover:bg-primary/40 hover:shadow-neon-purple transition-all duration-300 group">
                <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
              </button>
              <p class="text-white/40 text-sm">{{ currentLesson?.title }}</p>
            </div>
          </div>
        </div>

        <!-- Lesson Info & Controls -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6">
          <div class="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 class="text-white font-bold text-xl mb-1">{{ currentLesson?.title }}</h1>
              <p class="text-white/40 text-sm">Duration: {{ currentLesson?.duration }}</p>
            </div>
            <button
              @click="markComplete"
              :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-shrink-0', isCompleted ? 'bg-accent/20 text-accent border border-accent/30' : 'btn-primary py-2']"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isCompleted ? 'Completed' : 'Mark Complete' }}
            </button>
          </div>

          <!-- Navigation -->
          <div class="flex gap-3">
            <button
              :disabled="!prevLesson"
              @click="prevLesson && navigateLesson(prevLesson)"
              class="flex-1 flex items-center gap-2 p-3 glass-card-hover text-sm text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="truncate">{{ prevLesson?.title || 'Previous Lesson' }}</span>
            </button>
            <button
              :disabled="!nextLesson"
              @click="nextLesson && navigateLesson(nextLesson)"
              class="flex-1 flex items-center justify-end gap-2 p-3 glass-card-hover text-sm text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <span class="truncate">{{ nextLesson?.title || 'Next Lesson' }}</span>
              <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Curriculum Sidebar -->
      <aside class="w-80 border-l border-white/5 bg-bg-dark/60 flex-col hidden lg:flex overflow-hidden">
        <div class="p-4 border-b border-white/5">
          <h2 class="text-white font-semibold">Course Content</h2>
          <p class="text-white/40 text-xs mt-1">{{ completedCount }}/{{ totalLessons }} lessons completed</p>
        </div>
        <div class="flex-1 overflow-y-auto">
          <div v-for="(module, mIdx) in modules" :key="module.title">
            <div class="px-4 py-3 bg-white/5 border-b border-white/5">
              <p class="text-white/70 text-sm font-medium">{{ module.title }}</p>
            </div>
            <div v-for="lesson in module.lessons" :key="lesson.id">
              <button
                @click="navigateLesson(lesson)"
                :class="['w-full flex items-center gap-3 px-4 py-3 border-b border-white/5 transition-all hover:bg-white/5', lesson.id === currentLessonId ? 'bg-primary/10 border-l-2 border-l-primary' : '']"
              >
                <div :class="['w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center', lesson.completed ? 'bg-accent/20 border border-accent/30' : 'border border-white/20']">
                  <svg v-if="lesson.completed" class="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="w-3 h-3 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="flex-1 text-left">
                  <p :class="['text-xs', lesson.id === currentLessonId ? 'text-white' : 'text-white/50']">{{ lesson.title }}</p>
                  <p class="text-white/30 text-xs">{{ lesson.duration }}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const courseSlug = route.params.courseSlug as string
const lessonIdParam = Number(route.params.lessonId)

const currentLessonId = ref(lessonIdParam)
const isCompleted = ref(false)

const modules = ref([
  {
    title: 'Fundamentals of Aim',
    lessons: [
      { id: 1, title: 'Introduction & Course Overview', duration: '5:30', completed: true },
      { id: 2, title: 'Crosshair Placement Theory', duration: '12:45', completed: true },
      { id: 3, title: 'Mouse Sensitivity & DPI Setup', duration: '8:20', completed: false },
      { id: 4, title: 'Aim Training Routines', duration: '18:00', completed: false },
    ]
  },
  {
    title: 'Movement Mechanics',
    lessons: [
      { id: 5, title: 'Counter-Strafing Explained', duration: '10:15', completed: false },
      { id: 6, title: 'Jiggle Peaking & Wide Peaking', duration: '14:30', completed: false },
      { id: 7, title: 'Bunny Hopping & Slide Mechanics', duration: '9:45', completed: false },
    ]
  },
])

const allLessons = computed(() => modules.value.flatMap(m => m.lessons))
const totalLessons = computed(() => allLessons.value.length)
const completedCount = computed(() => allLessons.value.filter(l => l.completed).length)
const progress = computed(() => Math.round((completedCount.value / totalLessons.value) * 100))

const currentLessonIndex = computed(() => allLessons.value.findIndex(l => l.id === currentLessonId.value))
const currentLesson = computed(() => allLessons.value[currentLessonIndex.value])
const prevLesson = computed(() => currentLessonIndex.value > 0 ? allLessons.value[currentLessonIndex.value - 1] : null)
const nextLesson = computed(() => currentLessonIndex.value < allLessons.value.length - 1 ? allLessons.value[currentLessonIndex.value + 1] : null)

const navigateLesson = (lesson: any) => {
  currentLessonId.value = lesson.id
  isCompleted.value = lesson.completed
  navigateTo(`/learn/${courseSlug}/${lesson.id}`)
}

const markComplete = () => {
  const lesson = allLessons.value.find(l => l.id === currentLessonId.value)
  if (lesson) {
    lesson.completed = true
    isCompleted.value = true
  }
}

useHead({ title: `${currentLesson.value?.title || 'Lesson'} - LevelUp` })
</script>
