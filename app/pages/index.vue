<template>
  <div>

    <!-- ═══════════════════════════════════════════════
         HERO SECTION
    ═══════════════════════════════════════════════ -->
    <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Ambient blobs -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-1/4 left-1/4 w-[500px] h-[400px] bg-secondary/8 rounded-full blur-3xl"></div>
        <div class="absolute top-10 right-10 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl"></div>
        <div class="absolute inset-0 dot-grid opacity-20"></div>
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <!-- Live badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-purple-300 text-sm font-medium mb-8">
          <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          Platform Gaming & Esports #1 di Indonesia
        </div>

        <!-- Headline -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] tracking-tight">
          <span class="text-white">Master the</span><br />
          <span class="text-gradient-hero drop-shadow-[0_0_60px_rgba(124,58,237,0.5)]">Meta. Dominate</span><br />
          <span class="text-white">the Game.</span>
        </h1>

        <!-- Subheadline -->
        <p class="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Belajar dari pro player dan esports coach berpengalaman. Kuasai strategi, mekanik, dan mindset untuk mencapai puncak permainanmu.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <NuxtLink to="/courses" class="btn-primary text-base px-8 py-4 shadow-neon-purple group">
            Explore Courses
            <svg class="w-5 h-5 ml-2 inline transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          <NuxtLink to="/auth/register" class="btn-secondary text-base px-8 py-4">
            Mulai Gratis →
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div v-for="stat in stats" :key="stat.label" class="glass-card p-4 text-center group hover:border-primary/40 transition-all duration-300">
            <div class="text-2xl md:text-3xl font-black text-gradient mb-1">{{ stat.value }}</div>
            <div class="text-white/40 text-xs">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div class="w-1.5 h-3 rounded-full bg-primary/70"></div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         MARQUEE GAMES TICKER
    ═══════════════════════════════════════════════ -->
    <section class="py-8 border-y border-white/5 overflow-hidden relative">
      <div class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-dark to-transparent z-10"></div>
      <div class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-dark to-transparent z-10"></div>
      <div class="flex items-center gap-12 animate-marquee whitespace-nowrap">
        <span v-for="(game, idx) in [...games, ...games]" :key="idx" class="inline-flex items-center gap-3 text-white/30 text-sm font-medium shrink-0">
          <span class="text-2xl">{{ game.icon }}</span>
          {{ game.name }}
          <span class="text-white/10 ml-4">·</span>
        </span>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         HOW IT WORKS
    ═══════════════════════════════════════════════ -->
    <section id="how" class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="section-tag">Cara Kerja</div>
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
            3 Langkah Menuju <span class="text-gradient">Pro</span>
          </h2>
          <p class="text-white/40 max-w-xl mx-auto">Dari daftar hingga sertifikat — prosesnya simpel dan terstruktur.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 relative">
          <div class="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50"></div>

          <div v-for="(step, i) in steps" :key="i" class="relative text-center group">
            <div class="relative inline-flex items-center justify-center mb-6">
              <div :class="['w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-300 group-hover:scale-110', step.bg, step.border]">
                {{ step.icon }}
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-bg-dark border border-white/20 flex items-center justify-center text-xs font-bold text-white/50">
                {{ i + 1 }}
              </div>
            </div>
            <h3 class="text-white font-bold text-lg mb-2">{{ step.title }}</h3>
            <p class="text-white/40 text-sm leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FEATURES GRID
    ═══════════════════════════════════════════════ -->
    <section id="features" class="py-24 relative">
      <div class="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="section-tag">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Kenapa LevelUp?
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
            Dibangun untuk <span class="text-gradient">Champion</span>
          </h2>
          <p class="text-white/40 text-lg max-w-xl mx-auto">
            Semua yang kamu butuhkan untuk mempercepat karir gaming dan perjalanan esportsmu.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="feature in features" :key="feature.title" class="glass-card-hover p-6 group">
            <div :class="['w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110', feature.iconBg]">
              <span class="text-2xl">{{ feature.icon }}</span>
            </div>
            <h3 class="text-white font-bold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-white/40 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         CATEGORIES
    ═══════════════════════════════════════════════ -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="section-tag">Kategori</div>
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
            Pilih <span class="text-gradient">Genre-mu</span>
          </h2>
          <p class="text-white/40 max-w-xl mx-auto">Dari FPS hingga MOBA, manajemen esports hingga content creation — semua ada.</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/courses?category=${cat.slug}`"
            class="glass-card-hover p-6 text-center group"
          >
            <div :class="['w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-110', cat.bg]">
              {{ cat.icon }}
            </div>
            <div class="text-white font-semibold text-sm mb-1">{{ cat.name }}</div>
            <div class="text-white/30 text-xs">{{ cat.count }} courses</div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FEATURED COURSES
    ═══════════════════════════════════════════════ -->
    <section id="courses" class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between mb-12">
          <div>
            <div class="section-tag">Trending Now</div>
            <h2 class="text-4xl font-black text-white">
              Top <span class="text-gradient">Courses</span>
            </h2>
          </div>
          <NuxtLink to="/courses" class="btn-secondary text-sm py-2 px-5 hidden md:flex items-center gap-2 group">
            Lihat Semua
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="course in featuredCourses"
            :key="course.slug"
            class="glass-card-hover overflow-hidden group cursor-pointer"
            @click="navigateTo(`/courses/${course.slug}`)"
          >
            <div class="h-48 relative overflow-hidden" :style="{ background: course.gradient }">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-7xl opacity-20 transition-transform duration-500 group-hover:scale-110">{{ course.icon }}</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute top-3 left-3 flex gap-2">
                <span class="badge-purple">{{ course.level }}</span>
                <span class="badge-cyan">{{ course.category }}</span>
              </div>
              <div class="absolute bottom-3 right-3 flex items-center gap-1 text-yellow-400 text-xs font-semibold bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ course.rating }}
              </div>
            </div>

            <div class="p-5">
              <h3 class="text-white font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {{ course.title }}
              </h3>
              <p class="text-white/40 text-sm mb-4 line-clamp-2 leading-relaxed">{{ course.desc }}</p>

              <div class="flex items-center justify-between text-sm border-t border-white/5 pt-3">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs text-white font-bold">
                    {{ course.instructor[0] }}
                  </div>
                  <span class="text-white/40 text-xs">{{ course.instructor }}</span>
                </div>
                <span class="text-white/30 text-xs">{{ course.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         INSTRUCTORS
    ═══════════════════════════════════════════════ -->
    <section class="py-24 relative">
      <div class="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="section-tag">Instruktur</div>
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
            Belajar dari <span class="text-gradient">Profesional</span>
          </h2>
          <p class="text-white/40 max-w-xl mx-auto">
            Instruktur kami adalah mantan pro player, esports coach, dan industri expert berpengalaman.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="ins in instructors" :key="ins.name" class="glass-card-hover p-6 text-center group">
            <div class="relative mx-auto w-20 h-20 mb-4">
              <div :class="['w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto border-2 transition-all duration-300 group-hover:scale-105', ins.bg, ins.border]">
                {{ ins.avatar }}
              </div>
              <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-bg-dark"></div>
            </div>
            <h4 class="text-white font-bold text-sm mb-0.5">{{ ins.name }}</h4>
            <p class="text-white/40 text-xs mb-3">{{ ins.role }}</p>
            <div class="flex items-center justify-center gap-3 text-xs text-white/30">
              <span>{{ ins.courses }} courses</span>
              <span>·</span>
              <span>{{ ins.students }} students</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         TESTIMONIALS
    ═══════════════════════════════════════════════ -->
    <section class="py-24 relative overflow-hidden">
      <div class="absolute inset-0 dot-grid opacity-10 pointer-events-none"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="section-tag">Testimoni</div>
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
            Kata Mereka yang <span class="text-gradient">Sudah Level Up</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="t in testimonials" :key="t.name" class="glass-card p-6 flex flex-col gap-4">
            <div class="flex gap-1">
              <svg v-for="s in 5" :key="s" class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-white/60 text-sm leading-relaxed italic">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
              <div :class="['w-10 h-10 rounded-xl flex items-center justify-center text-xl', t.bg]">{{ t.avatar }}</div>
              <div>
                <div class="text-white font-semibold text-sm">{{ t.name }}</div>
                <div class="text-white/30 text-xs">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         PROGRESS PREVIEW
    ═══════════════════════════════════════════════ -->
    <section class="py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div class="section-tag">Learning Path</div>
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
              Track Progress <span class="text-gradient">Real-Time</span>
            </h2>
            <p class="text-white/40 text-lg leading-relaxed mb-8">
              Setiap lesson yang kamu selesaikan tercatat otomatis. Dashboard menampilkan progress, kuis, dan sertifikat secara real-time.
            </p>
            <ul class="space-y-4">
              <li v-for="item in progressFeatures" :key="item" class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-white/60 text-sm">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Mock Dashboard -->
          <div class="glass-card p-6">
            <div class="flex items-center justify-between mb-6">
              <span class="text-white font-semibold">My Learning</span>
              <span class="badge-purple">3 Active</span>
            </div>

            <div v-for="prog in mockProgress" :key="prog.title" class="mb-5 last:mb-0">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-lg">{{ prog.icon }}</span>
                  <span class="text-white text-sm font-medium">{{ prog.title }}</span>
                </div>
                <span :class="['text-xs font-bold', prog.color]">{{ prog.pct }}%</span>
              </div>
              <div class="w-full bg-white/5 rounded-full h-1.5">
                <div :class="['h-1.5 rounded-full', prog.bar]" :style="{ width: prog.pct + '%' }"></div>
              </div>
              <div class="flex justify-between mt-1">
                <span class="text-white/20 text-xs">{{ prog.done }}/{{ prog.total }} lessons</span>
                <span class="text-white/20 text-xs">{{ prog.time }}</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span class="text-white/40 text-xs">Overall Progress</span>
              <span class="text-gradient font-bold text-sm">67%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FAQ
    ═══════════════════════════════════════════════ -->
    <section class="py-24 relative">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="section-tag">FAQ</div>
          <h2 class="text-4xl font-black text-white mb-4">
            Pertanyaan <span class="text-gradient">Umum</span>
          </h2>
        </div>

        <div class="space-y-3">
          <div v-for="(faq, i) in faqs" :key="i" class="glass-card overflow-hidden">
            <button
              class="w-full flex items-center justify-between p-5 text-left"
              @click="activeFaq = activeFaq === i ? null : i"
            >
              <span class="text-white font-medium text-sm">{{ faq.q }}</span>
              <svg
                :class="['w-5 h-5 text-primary shrink-0 ml-4 transition-transform duration-300', activeFaq === i ? 'rotate-180' : '']"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="activeFaq === i" class="px-5 pb-5">
              <p class="text-white/50 text-sm leading-relaxed">{{ faq.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FINAL CTA
    ═══════════════════════════════════════════════ -->
    <section class="py-32 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-900/10 to-secondary/20 pointer-events-none"></div>
      <div class="absolute inset-0 dot-grid opacity-20 pointer-events-none"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-green-300 text-sm font-medium mb-8">
          <div class="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          Gratis untuk memulai
        </div>
        <h2 class="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
          Siap untuk <span class="text-gradient">Level Up?</span>
        </h2>
        <p class="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Bergabunglah dengan ribuan gamer yang sudah mentransformasi skill mereka. Karir pro-mu dimulai hari ini.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/auth/register" class="btn-primary text-lg px-10 py-4 inline-block shadow-neon-purple animate-glow-pulse">
            Daftar Gratis Sekarang
          </NuxtLink>
          <NuxtLink to="/courses" class="text-white/50 hover:text-white text-sm transition-colors">
            atau lihat semua course →
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useHead({
  title: 'LevelUp — Platform Belajar Gaming & Esports #1',
  meta: [
    { name: 'description', content: 'Kuasai gaming dan esports bersama pro player dan coach berpengalaman. Video course, quiz, progress tracking, dan sertifikat.' }
  ]
})

const activeFaq = ref<number | null>(null)

const stats = [
  { value: '10K+', label: 'Active Students' },
  { value: '200+', label: 'Expert Courses' },
  { value: '50+', label: 'Pro Instructors' },
  { value: '95%', label: 'Satisfaction Rate' },
]

const games = [
  { name: 'Valorant', icon: '🎯' },
  { name: 'League of Legends', icon: '⚔️' },
  { name: 'PUBG Mobile', icon: '🪖' },
  { name: 'Mobile Legends', icon: '🗡️' },
  { name: 'Dota 2', icon: '🔮' },
  { name: 'CS2', icon: '💣' },
  { name: 'Free Fire', icon: '🔥' },
  { name: 'Genshin Impact', icon: '⚡' },
  { name: 'Apex Legends', icon: '🦅' },
  { name: 'Overwatch 2', icon: '🤖' },
]

const steps = [
  {
    icon: '🔍',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    title: 'Pilih Course',
    desc: 'Browse ratusan course dari pro player dan coach. Filter berdasarkan game, level, dan kategori.',
  },
  {
    icon: '▶️',
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
    title: 'Mulai Belajar',
    desc: 'Tonton video lesson berkualitas tinggi, ikuti modul terstruktur, dan tandai lesson selesai.',
  },
  {
    icon: '🏆',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
    title: 'Raih Sertifikat',
    desc: 'Selesaikan semua lesson, lulus kuis, dan dapatkan sertifikat digital yang bisa kamu share.',
  },
]

const features = [
  {
    icon: '🎯',
    iconBg: 'bg-primary/20',
    title: 'Pro-Level Coaching',
    desc: 'Belajar langsung dari esports professional dan game coach dengan pengalaman kompetitif bertahun-tahun.',
  },
  {
    icon: '⚡',
    iconBg: 'bg-secondary/20',
    title: 'Structured Learning Path',
    desc: 'Ikuti learning path yang dirancang cermat dari mekanik dasar hingga strategi kompetitif tingkat lanjut.',
  },
  {
    icon: '🏆',
    iconBg: 'bg-accent/20',
    title: 'Earn Certificates',
    desc: 'Selesaikan course dan dapatkan sertifikat terverifikasi untuk menunjukkan keahlian gamingmu.',
  },
  {
    icon: '🎮',
    iconBg: 'bg-primary/20',
    title: 'Game-Specific Training',
    desc: 'Course khusus per game: FPS, MOBA, RTS, dan battle royale. Spesifik, relevan, dan actionable.',
  },
  {
    icon: '🧠',
    iconBg: 'bg-secondary/20',
    title: 'Mental Performance',
    desc: 'Kuasai aspek psikologis gaming kompetitif: fokus, tilt control, dan komunikasi tim yang efektif.',
  },
  {
    icon: '📊',
    iconBg: 'bg-accent/20',
    title: 'Progress Analytics',
    desc: 'Pantau perkembanganmu dengan dashboard yang menampilkan progress setiap course secara real-time.',
  },
]

const categories = [
  { name: 'FPS', slug: 'fps', icon: '🎯', count: 42, bg: 'bg-red-500/10' },
  { name: 'MOBA', slug: 'moba', icon: '⚔️', count: 38, bg: 'bg-blue-500/10' },
  { name: 'Battle Royale', slug: 'battle-royale', icon: '🪖', count: 27, bg: 'bg-orange-500/10' },
  { name: 'Esports Biz', slug: 'esports', icon: '🏢', count: 19, bg: 'bg-purple-500/10' },
  { name: 'Coaching', slug: 'coaching', icon: '📋', count: 23, bg: 'bg-green-500/10' },
  { name: 'Content Creation', slug: 'content', icon: '📹', count: 15, bg: 'bg-pink-500/10' },
  { name: 'Mindset', slug: 'mindset', icon: '🧠', count: 18, bg: 'bg-yellow-500/10' },
  { name: 'RPG / MMO', slug: 'rpg', icon: '🔮', count: 21, bg: 'bg-cyan-500/10' },
]

const featuredCourses = [
  {
    slug: 'valorant-pro-mechanics',
    title: 'Valorant Pro Mechanics: Aim, Movement & Game Sense',
    desc: 'Kuasai fundamental yang membedakan pemain radiant dari yang lain. Aim training, movement, dan game reading.',
    instructor: 'Alex "SnipePro" Chen',
    level: 'Intermediate',
    category: 'FPS',
    rating: '4.9',
    duration: '12h 30m',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #1a0533, #3b0764)',
  },
  {
    slug: 'league-jungle-mastery',
    title: 'LoL: Jungle Mastery & Macro Play dari Silver ke Diamond',
    desc: 'Naik rank dengan menguasai jungle pathing, kontrol objektif, dan pengambilan keputusan makro.',
    instructor: 'Kim "JungleKing" Park',
    level: 'Advanced',
    category: 'MOBA',
    rating: '4.8',
    duration: '18h 20m',
    icon: '🗡️',
    gradient: 'linear-gradient(135deg, #0a1628, #1a3a5c)',
  },
  {
    slug: 'esports-mental-game',
    title: 'The Mental Game: Esports Psychology & Peak Performance',
    desc: 'Pelajari cara atlet esports top mengelola tekanan, mencegah tilt, dan menjaga performa di kompetisi.',
    instructor: 'Dr. Sarah Williams',
    level: 'Beginner',
    category: 'Mindset',
    rating: '4.95',
    duration: '8h 45m',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
  },
]

const instructors = [
  {
    name: 'Alex "SnipePro" Chen',
    role: 'Ex-Pro Valorant Player',
    avatar: '🎯',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    courses: 8,
    students: '4.2K',
  },
  {
    name: 'Kim "JungleKing" Park',
    role: 'Diamond I LoL Coach',
    avatar: '⚔️',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    courses: 5,
    students: '3.8K',
  },
  {
    name: 'Dr. Sarah Williams',
    role: 'Esports Psychologist',
    avatar: '🧠',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    courses: 4,
    students: '6.1K',
  },
  {
    name: 'Reza "RZRgaming"',
    role: 'MPL Coach & Analyst',
    avatar: '🗡️',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    courses: 6,
    students: '2.9K',
  },
]

const testimonials = [
  {
    name: 'Danu Pratama',
    role: 'Valorant — Immortal',
    avatar: '🎮',
    bg: 'bg-red-500/10',
    quote: 'Dalam 3 bulan ikut course Valorant di LevelUp, rank gue naik dari Gold ke Immortal. Materi aim training-nya beneran ngebantu banget buat naikin konsistensi.',
  },
  {
    name: 'Siti Rahayu',
    role: 'Esports Manager, Team Nova',
    avatar: '🏢',
    bg: 'bg-purple-500/10',
    quote: 'Course Esports Business di LevelUp buka wawasan gue soal manajemen tim dan sponsorship. Sekarang gue udah handle tim dengan budget yang jauh lebih besar.',
  },
  {
    name: 'Kevin "KVN" Santoso',
    role: 'Mobile Legends Coach',
    avatar: '📋',
    bg: 'bg-blue-500/10',
    quote: 'Sebagai coach, gue butuh framework yang solid. LevelUp kasih gue metodologi coaching yang bisa langsung diaplikasikan ke player-player di tim gue.',
  },
]

const progressFeatures = [
  'Progress tersimpan otomatis per lesson',
  'Dashboard menampilkan semua course aktif',
  'Quiz di akhir setiap modul untuk validasi pemahaman',
  'Sertifikat langsung tersedia setelah lulus',
  'Akses seumur hidup ke semua materi',
]

const mockProgress = [
  { title: 'Valorant Pro Mechanics', icon: '🎯', pct: 78, done: 14, total: 18, time: '3h left', color: 'text-red-400', bar: 'bg-gradient-to-r from-red-500 to-primary' },
  { title: 'The Mental Game', icon: '🧠', pct: 45, done: 9, total: 20, time: '5h left', color: 'text-purple-400', bar: 'bg-gradient-to-r from-primary to-secondary' },
  { title: 'Jungle Mastery', icon: '⚔️', pct: 20, done: 4, total: 22, time: '14h left', color: 'text-cyan-400', bar: 'bg-gradient-to-r from-secondary to-accent' },
]

const faqs = [
  {
    q: 'Apakah LevelUp benar-benar gratis untuk memulai?',
    a: 'Ya! Kamu bisa mendaftar dan mengakses beberapa lesson preview secara gratis. Course lengkap akan tersedia setelah kami meluncurkan sistem pembayaran di fase berikutnya.',
  },
  {
    q: 'Apa yang membedakan LevelUp dari platform belajar lainnya?',
    a: 'LevelUp fokus 100% pada gaming dan esports. Instruktur kami adalah praktisi nyata — pro player, coach kompetitif, dan esports professional. Kontennya bukan teori, tapi actionable skills.',
  },
  {
    q: 'Apakah sertifikat dari LevelUp diakui?',
    a: 'Sertifikat LevelUp mencantumkan detail course, instruktur, dan skormu. Meskipun bukan sertifikasi formal, sertifikat ini berguna untuk menunjukkan komitmen dan kemampuanmu ke tim atau organisasi esports.',
  },
  {
    q: 'Berapa lama akses ke course setelah mendaftar?',
    a: 'Akses course bersifat lifetime. Sekali kamu mengakses course, kamu bisa menontonnya kapan saja, termasuk semua update materi di masa depan.',
  },
  {
    q: 'Apakah ada fitur community atau mentorship?',
    a: 'Saat ini kami fokus pada course dan pembelajaran mandiri. Fitur community, live class, dan mentorship personal sedang dalam roadmap dan akan hadir di fase berikutnya.',
  },
]
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scan {
  0% { opacity: 0; transform: translateY(-100%); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(100vh); }
}

.animate-marquee {
  animation: marquee 35s linear infinite;
}

.animate-scan {
  animation: scan 8s ease-in-out infinite;
}

.section-tag {
  @apply inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-4;
}

.badge-purple {
  @apply px-2 py-0.5 rounded-full bg-primary/30 text-purple-300 text-xs font-medium backdrop-blur-sm;
}

.badge-cyan {
  @apply px-2 py-0.5 rounded-full bg-secondary/30 text-cyan-300 text-xs font-medium backdrop-blur-sm;
}
</style>
