
export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const courseId = Number(getRouterParam(event, 'courseId'))

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          lessons: { select: { id: true } },
        },
      },
    },
  })

  if (!course) {
    throw createError({ statusCode: 404, statusMessage: 'Course not found' })
  }

  const lessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id))

  const progress = await prisma.userProgress.findMany({
    where: {
      userId: user.userId,
      lessonId: { in: lessonIds },
      completed: true,
    },
  })

  const completedIds = progress.map(p => p.lessonId)
  const percentage = lessonIds.length > 0 ? Math.round((completedIds.length / lessonIds.length) * 100) : 0

  return {
    courseId,
    totalLessons: lessonIds.length,
    completedLessons: completedIds.length,
    completedLessonIds: completedIds,
    percentage,
  }
})
