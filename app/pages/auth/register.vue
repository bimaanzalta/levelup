<template>
  <div>
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-black text-white mb-1">Create Account</h1>
      <p class="text-white/40 text-sm">Join thousands of pro gamers</p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label class="text-white/60 text-sm mb-1.5 block">Full Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Your Gamer Name"
          class="input-field"
          :disabled="loading"
          required
        />
      </div>

      <div>
        <label class="text-white/60 text-sm mb-1.5 block">Email</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="player@levelup.gg"
          class="input-field"
          :disabled="loading"
          required
        />
      </div>

      <div>
        <label class="text-white/60 text-sm mb-1.5 block">Password</label>
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Min 8 characters"
            class="input-field pr-12"
            :disabled="loading"
            minlength="8"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
        <!-- Password strength indicator -->
        <div class="mt-2">
          <div class="flex gap-1">
            <div v-for="i in 4" :key="i" :class="['h-1 flex-1 rounded-full transition-all duration-300', passwordStrength >= i ? strengthColor : 'bg-white/10']"></div>
          </div>
          <p v-if="form.password" class="text-xs mt-1" :class="strengthTextColor">{{ strengthLabel }}</p>
        </div>
      </div>

      <div>
        <label class="text-white/60 text-sm mb-1.5 block">Confirm Password</label>
        <input
          v-model="form.confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Repeat your password"
          class="input-field"
          :disabled="loading"
          required
        />
        <p v-if="form.confirmPassword && form.password !== form.confirmPassword" class="text-red-400 text-xs mt-1">Passwords do not match</p>
      </div>

      <!-- Terms -->
      <div class="flex items-start gap-3">
        <input
          v-model="form.agreed"
          type="checkbox"
          id="terms"
          class="mt-1 accent-primary"
          required
        />
        <label for="terms" class="text-white/40 text-sm leading-relaxed">
          I agree to the
          <a href="#" class="text-primary hover:text-purple-300 transition-colors">Terms of Service</a>
          and
          <a href="#" class="text-primary hover:text-purple-300 transition-colors">Privacy Policy</a>
        </label>
      </div>

      <!-- Error -->
      <div v-if="error" class="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="loading || form.password !== form.confirmPassword"
        class="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2 shadow-neon-purple disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Creating account...' : 'Create Account' }}
      </button>
    </form>

    <div class="mt-6 pt-6 border-t border-white/10 text-center text-sm text-white/40">
      Already have an account?
      <NuxtLink to="/auth/login" class="text-primary hover:text-purple-300 font-medium transition-colors">
        Log in
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Register - LevelUp' })

const { register } = useAuth()

const form = reactive({ name: '', email: '', password: '', confirmPassword: '', agreed: false })
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const passwordStrength = computed(() => {
  const p = form.password
  if (!p) return 0
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
})

const strengthColor = computed(() => {
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-accent']
  return colors[passwordStrength.value - 1] || 'bg-red-500'
})

const strengthTextColor = computed(() => {
  const colors = ['text-red-400', 'text-orange-400', 'text-yellow-400', 'text-accent']
  return colors[passwordStrength.value - 1] || 'text-red-400'
})

const strengthLabel = computed(() => {
  const labels = ['Weak', 'Fair', 'Good', 'Strong']
  return labels[passwordStrength.value - 1] || 'Weak'
})

const handleRegister = async () => {
  error.value = ''
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  loading.value = true
  try {
    const result = await register(form.name, form.email, form.password)
    if (result.success) {
      await navigateTo('/dashboard')
    } else {
      error.value = result.message || 'Registration failed'
    }
  } catch (e: any) {
    error.value = e?.data?.message || 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
