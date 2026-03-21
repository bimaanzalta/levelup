interface User {
  id: number
  name: string
  email: string
  role: 'student' | 'instructor' | 'admin'
  avatar?: string | null
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuth = () => {
  const state = useState<AuthState>('auth', () => ({ user: null, token: null }))

  const user = computed(() => state.value.user)
  const isAuthenticated = computed(() => !!state.value.user)
  const isAdmin = computed(() => state.value.user?.role === 'admin')
  const isInstructor = computed(() => state.value.user?.role === 'instructor' || state.value.user?.role === 'admin')

  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch<{ success: boolean; user: User; token: string; message?: string }>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      state.value.user = data.user
      state.value.token = data.token
      return { success: true }
    } catch (e: any) {
      return { success: false, message: e?.data?.statusMessage || 'Login failed' }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const data = await $fetch<{ success: boolean; user: User; token: string; message?: string }>('/api/auth/register', {
        method: 'POST',
        body: { name, email, password },
      })
      state.value.user = data.user
      state.value.token = data.token
      return { success: true }
    } catch (e: any) {
      return { success: false, message: e?.data?.statusMessage || 'Registration failed' }
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    state.value.user = null
    state.value.token = null
    await navigateTo('/')
  }

  const fetchUser = async () => {
    if (state.value.user) return
    try {
      const data = await $fetch<{ user: User }>('/api/auth/me')
      state.value.user = data.user
    } catch {
      state.value.user = null
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isInstructor,
    login,
    register,
    logout,
    fetchUser,
  }
}
