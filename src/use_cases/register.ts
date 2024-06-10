import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface RegisterUseCaseParams {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name, 
  email, 
  password }: RegisterUseCaseParams) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('User with same email already exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}