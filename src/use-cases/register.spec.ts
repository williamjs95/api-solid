import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-alredy-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@sample.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should register a hash password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@sample.com',
      password: 'password123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password123',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be alble to register with the same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'password123',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
