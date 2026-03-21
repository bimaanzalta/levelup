
export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const courseId = Number(getRouterParam(event, 'courseId'))

  const certificate = await prisma.certificate.findUnique({
    where: { userId_courseId: { userId: user.userId, courseId } },
    include: {
      course: { select: { id: true, title: true, slug: true } },
      user: { select: { id: true, name: true, email: true } },
    },
  })

  if (!certificate) {
    throw createError({ statusCode: 404, statusMessage: 'Certificate not found. Complete the course and pass the quiz first.' })
  }

  return { certificate }
})
