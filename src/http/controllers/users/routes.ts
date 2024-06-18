import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJTW } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // authenticated routes
  app.get('/me', { onRequest: [verifyJTW] }, profile)
}
