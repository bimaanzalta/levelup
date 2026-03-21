<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Back -->
    <NuxtLink to="/dashboard" class="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-sm">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to Dashboard
    </NuxtLink>

    <div class="text-center mb-8">
      <div class="section-tag mx-auto w-fit mb-3">Certificate of Completion</div>
      <h1 class="text-3xl font-black text-white">Your <span class="text-gradient">Achievement</span></h1>
    </div>

    <!-- Certificate Card -->
    <div id="certificate" class="relative rounded-3xl overflow-hidden border border-primary/30 shadow-neon-purple">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-bg-dark via-[#0d0f20] to-bg-dark"></div>
      <div class="absolute inset-0 dot-grid opacity-30"></div>
      <!-- Corner decorations -->
      <div class="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
      <div class="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-xl"></div>

      <!-- Border inner lines -->
      <div class="absolute inset-4 border border-white/5 rounded-2xl pointer-events-none"></div>
      <div class="absolute inset-6 border border-primary/10 rounded-xl pointer-events-none"></div>

      <div class="relative z-10 p-10 md:p-16 text-center">
        <!-- Logo -->
        <div class="flex items-center justify-center gap-2 mb-8">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon-purple">
            <span class="text-white font-bold">L</span>
          </div>
          <span class="text-2xl font-bold text-white">Level<span class="text-gradient">Up</span></span>
        </div>

        <p class="text-white/40 text-sm uppercase tracking-[0.3em] mb-3">Certificate of Completion</p>
        <p class="text-white/40 mb-2">This is to certify that</p>

        <h2 class="text-4xl md:text-5xl font-black mb-3">
          <span class="text-gradient-hero">{{ user?.name || 'Gamer' }}</span>
        </h2>

        <p class="text-white/40 mb-2">has successfully completed the course</p>

        <h3 class="text-xl md:text-2xl font-bold text-white mb-8 max-w-xl mx-auto leading-snug">
          "{{ courseName }}"
        </h3>

        <!-- Badge -->
        <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/10 border border-accent/30 mb-10">
          <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <span class="text-accent font-semibold">Verified & Certified</span>
        </div>

        <!-- Meta info -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div class="text-center">
            <p class="text-white/30 text-xs uppercase tracking-wider mb-1">Date Issued</p>
            <p class="text-white font-semibold">March 2026</p>
          </div>
          <div class="w-px h-10 bg-white/10 hidden md:block"></div>
          <div class="text-center">
            <p class="text-white/30 text-xs uppercase tracking-wider mb-1">Certificate ID</p>
            <p class="text-white font-mono text-sm">LVL-2026-{{ Math.random().toString(36).substr(2, 8).toUpperCase() }}</p>
          </div>
          <div class="w-px h-10 bg-white/10 hidden md:block"></div>
          <div class="text-center">
            <p class="text-white/30 text-xs uppercase tracking-wider mb-1">Issued By</p>
            <p class="text-white font-semibold">LevelUp Academy</p>
          </div>
        </div>

        <!-- Decorative stars -->
        <div class="flex items-center justify-center gap-2 text-primary/40">
          <div class="flex-1 max-w-24 h-px bg-gradient-to-r from-transparent to-primary/30"></div>
          <span class="text-xs tracking-widest">★ ★ ★</span>
          <div class="flex-1 max-w-24 h-px bg-gradient-to-l from-transparent to-primary/30"></div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
      <button @click="downloadCertificate" class="btn-primary flex items-center gap-2 justify-center">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Certificate
      </button>
      <button @click="shareCertificate" class="btn-secondary flex items-center gap-2 justify-center">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share Achievement
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', middleware: 'auth' })

const route = useRoute()
const { user } = useAuth()

const courseNames: Record<string, string> = {
  'esports-mental-game': 'The Mental Game: Esports Psychology & Peak Performance',
  'valorant-pro-mechanics': 'Valorant Pro Mechanics: Aim, Movement & Game Sense',
}

const courseName = computed(() => courseNames[route.params.courseId as string] || 'Gaming Course')

useHead({ title: `Certificate - ${courseName.value} - LevelUp` })

const downloadCertificate = () => {
  window.print()
}

const shareCertificate = async () => {
  if (navigator.share) {
    await navigator.share({
      title: 'I earned a certificate on LevelUp!',
      text: `I just completed "${courseName.value}" on LevelUp — the Gaming & Esports Learning Platform!`,
      url: window.location.href,
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }
}
</script>
