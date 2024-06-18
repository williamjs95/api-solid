import { FastifyInstance } from 'fastify'
import { verifyJTW } from '../../middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJTW)
}
