
export default defineEventHandler(async (event) => {
  requireAdmin(event)

  const body = await readBody(event)
  const { title, slug, description, thumbnail, level, price, status, instructorId, categoryId } = body

  if (!title || !slug || !instructorId) {
    throw createError({ statusCode: 400, statusMessage: 'Title, slug, and instructorId are required' })
  }

  const course = await prisma.course.create({
    data: {
      title,
      slug,
      description,
      thumbnail,
      level: level || 'beginner',
      price: price ? Number(price) : null,
      status: status || 'draft',
      instructorId: Number(instructorId),
      categoryId: categoryId ? Number(categoryId) : null,
    },
    include: { instructor: true, category: true },
  })

  return { success: true, course }
})
