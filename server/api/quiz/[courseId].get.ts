
export default defineEventHandler(async (event) => {
  requireAuth(event)
  const courseId = Number(getRouterParam(event, 'courseId'))

  const quiz = await prisma.quiz.findFirst({
    where: { courseId },
    include: {
      questions: {
        orderBy: { order: 'asc' },
        include: {
          options: {
            select: { id: true, optionText: true }, // hide isCorrect from client
          },
        },
      },
    },
  })

  if (!quiz) {
    throw createError({ statusCode: 404, statusMessage: 'Quiz not found for this course' })
  }

  return { quiz }
})
