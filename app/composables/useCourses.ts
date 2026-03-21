export const useCourses = () => {
  const courses = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCourses = async (params?: {
    search?: string
    category?: string
    level?: string
    page?: number
    limit?: number
  }) => {
    loading.value = true
    error.value = null
    try {
      const query = new URLSearchParams()
      if (params?.search) query.set('search', params.search)
      if (params?.category) query.set('category', params.category)
      if (params?.level) query.set('level', params.level)
      if (params?.page) query.set('page', String(params.page))
      if (params?.limit) query.set('limit', String(params.limit))

      const data = await $fetch<{ courses: any[]; pagination: any }>(`/api/courses?${query}`)
      courses.value = data.courses
      return data
    } catch (e: any) {
      error.value = e?.data?.statusMessage || 'Failed to fetch courses'
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchCourse = async (slug: string) => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<{ course: any }>(`/api/courses/${slug}`)
      return data.course
    } catch (e: any) {
      error.value = e?.data?.statusMessage || 'Course not found'
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchProgress = async (courseId: number) => {
    try {
      return await $fetch<any>(`/api/progress/${courseId}`)
    } catch {
      return null
    }
  }

  const markLessonComplete = async (lessonId: number) => {
    try {
      return await $fetch(`/api/lessons/${lessonId}/complete`, { method: 'POST' })
    } catch {
      return null
    }
  }

  return {
    courses,
    loading,
    error,
    fetchCourses,
    fetchCourse,
    fetchProgress,
    markLessonComplete,
  }
}
