export default defineNuxtRouteMiddleware(async () => {
  const { isAuthenticated, fetchUser } = useAuth()

  await fetchUser()

  if (isAuthenticated.value) {
    return navigateTo('/dashboard')
  }
})
