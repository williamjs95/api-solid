import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJTW } from '../../middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // authenticated routes
  app.get('/me', { onRequest: [verifyJTW] }, profile)
}
