
export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const quizId = Number(getRouterParam(event, 'quizId'))
  const body = await readBody(event)
  const { answers } = body // { [questionId]: optionId }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: { options: true },
      },
    },
  })

  if (!quiz) {
    throw createError({ statusCode: 404, statusMessage: 'Quiz not found' })
  }

  // Calculate score
  let correct = 0
  for (const question of quiz.questions) {
    const selectedOptionId = answers[question.id]
    if (!selectedOptionId) continue
    const selectedOption = question.options.find(o => o.id === Number(selectedOptionId))
    if (selectedOption?.isCorrect) correct++
  }

  const score = Math.round((correct / quiz.questions.length) * 100)
  const status = score >= quiz.passMark ? 'passed' : 'failed'

  const result = await prisma.quizResult.create({
    data: { userId: user.userId, quizId, score, status },
  })

  // Auto-issue certificate if passed
  if (status === 'passed') {
    const course = await prisma.course.findFirst({ where: { quizzes: { some: { id: quizId } } } })
    if (course) {
      await prisma.certificate.upsert({
        where: { userId_courseId: { userId: user.userId, courseId: course.id } },
        update: {},
        create: { userId: user.userId, courseId: course.id },
      })
    }
  }

  return { success: true, score, status, correct, total: quiz.questions.length, passMark: quiz.passMark }
})
