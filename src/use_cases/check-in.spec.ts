import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 10, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in diffent days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    vi.setSystemTime(new Date(2024, 0, 21, 10, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
