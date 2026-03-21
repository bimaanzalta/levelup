export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { search, category, level, page = '1', limit = '12' } = query

  const where: any = { status: 'published' }

  if (search) {
    where.OR = [
      { title: { contains: String(search), mode: 'insensitive' } },
      { description: { contains: String(search), mode: 'insensitive' } },
    ]
  }

  if (category) {
    where.category = { slug: String(category) }
  }

  if (level) {
    where.level = String(level)
  }

  const skip = (Number(page) - 1) * Number(limit)

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      include: {
        instructor: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, slug: true } },
        _count: { select: { modules: true } },
      },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    }),
    prisma.course.count({ where }),
  ])

  return {
    courses,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  }
})
