<template>
  <div class="max-w-3xl space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/courses" class="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-white">Create New Course</h1>
        <p class="text-white/40 text-sm">Fill in the details below</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Info -->
      <div class="glass-card p-6 space-y-4">
        <h2 class="text-white font-bold border-b border-white/10 pb-3 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">1</span>
          Basic Information
        </h2>

        <div>
          <label class="text-white/60 text-sm mb-1.5 block">Course Title <span class="text-red-400">*</span></label>
          <input v-model="form.title" type="text" placeholder="e.g. Valorant Pro Mechanics" class="input-field" required />
        </div>

        <div>
          <label class="text-white/60 text-sm mb-1.5 block">Slug</label>
          <input :value="generatedSlug" type="text" class="input-field bg-white/3 cursor-not-allowed text-white/40" readonly />
          <p class="text-white/30 text-xs mt-1">Auto-generated from title</p>
        </div>

        <div>
          <label class="text-white/60 text-sm mb-1.5 block">Description <span class="text-red-400">*</span></label>
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Describe what students will learn..."
            class="input-field resize-none"
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="text-white/60 text-sm mb-1.5 block">Level</label>
            <select v-model="form.level" class="input-field">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label class="text-white/60 text-sm mb-1.5 block">Category</label>
            <select v-model="form.category" class="input-field">
              <option value="">Select category</option>
              <option value="fps">FPS</option>
              <option value="moba">MOBA</option>
              <option value="br">Battle Royale</option>
              <option value="mindset">Mindset</option>
              <option value="streaming">Streaming</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Media -->
      <div class="glass-card p-6 space-y-4">
        <h2 class="text-white font-bold border-b border-white/10 pb-3 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">2</span>
          Media
        </h2>

        <div>
          <label class="text-white/60 text-sm mb-1.5 block">Thumbnail URL</label>
          <input v-model="form.thumbnail" type="url" placeholder="https://..." class="input-field" />
        </div>

        <div>
          <label class="text-white/60 text-sm mb-1.5 block">Instructor ID</label>
          <input v-model.number="form.instructorId" type="number" placeholder="1" class="input-field" min="1" required />
        </div>
      </div>

      <!-- Pricing -->
      <div class="glass-card p-6 space-y-4">
        <h2 class="text-white font-bold border-b border-white/10 pb-3 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">3</span>
          Pricing & Status
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="text-white/60 text-sm mb-1.5 block">Price (USD)</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">$</span>
              <input v-model.number="form.price" type="number" step="0.01" min="0" placeholder="0.00" class="input-field pl-8" />
            </div>
            <p class="text-white/30 text-xs mt-1">Leave 0 for free course</p>
          </div>
          <div>
            <label class="text-white/60 text-sm mb-1.5 block">Status</label>
            <select v-model="form.status" class="input-field">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 justify-end">
        <NuxtLink to="/admin/courses" class="btn-ghost">Cancel</NuxtLink>
        <button type="button" @click="saveAsDraft" class="btn-secondary">Save as Draft</button>
        <button type="submit" :disabled="loading" class="btn-primary flex items-center gap-2">
          <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Creating...' : 'Create Course' }}
        </button>
      </div>

      <!-- Success message -->
      <div v-if="successMsg" class="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30 text-accent">
        <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ successMsg }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Create Course - LevelUp Admin' })

const loading = ref(false)
const successMsg = ref('')

const form = reactive({
  title: '',
  description: '',
  level: 'beginner',
  category: '',
  thumbnail: '',
  instructorId: 1,
  price: 0,
  status: 'draft',
})

const generatedSlug = computed(() =>
  form.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
)

const handleSubmit = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/courses', {
      method: 'POST',
      body: { ...form, slug: generatedSlug.value },
    })
    successMsg.value = 'Course created successfully!'
    setTimeout(() => navigateTo('/admin/courses'), 1500)
  } catch (e: any) {
    alert(e?.data?.message || 'Failed to create course')
  } finally {
    loading.value = false
  }
}

const saveAsDraft = () => {
  form.status = 'draft'
  handleSubmit()
}
</script>
