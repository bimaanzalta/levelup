import { H3Event } from 'h3'
import jwt from 'jsonwebtoken'

export interface JWTPayload {
  userId: number
  email: string
  role: string
  name: string
}

export const signToken = (payload: JWTPayload): string => {
  const config = useRuntimeConfig()
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const config = useRuntimeConfig()
    return jwt.verify(token, config.jwtSecret) as JWTPayload
  } catch {
    return null
  }
}

export const getUserFromEvent = (event: H3Event): JWTPayload | null => {
  const token = getCookie(event, 'auth_token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!token) return null
  return verifyToken(token)
}

export const requireAuth = (event: H3Event): JWTPayload => {
  const user = getUserFromEvent(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return user
}

export const requireAdmin = (event: H3Event): JWTPayload => {
  const user = requireAuth(event)
  if (user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' })
  }
  return user
}
