
export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const lessonId = Number(getRouterParam(event, 'id'))

  if (!lessonId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid lesson ID' })
  }

  const progress = await prisma.userProgress.upsert({
    where: { userId_lessonId: { userId: user.userId, lessonId } },
    update: { completed: true, completedAt: new Date() },
    create: { userId: user.userId, lessonId, completed: true, completedAt: new Date() },
  })

  return { success: true, progress }
})
