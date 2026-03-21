export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      instructor: true,
      category: true,
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            select: { id: true, title: true, duration: true, isFree: true, order: true },
          },
        },
      },
      quizzes: {
        select: { id: true, title: true, passMark: true },
      },
      _count: {
        select: { certificates: true },
      },
    },
  })

  if (!course) {
    throw createError({ statusCode: 404, statusMessage: 'Course not found' })
  }

  return { course }
})
