import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.9363278),
      longitude: new Decimal(-47.087616),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 10, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -22.9363278,
      userLongitude: -47.087616,
    })

    console.log(checkIn.created_at)

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -22.9363278,
      userLongitude: -47.087616,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-id',
        userLatitude: -22.9363278,
        userLongitude: -47.087616,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in diffent days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 10, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: -22.9363278,
      userLongitude: -47.087616,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 10, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.9363278,
      userLongitude: -47.087616,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gymm', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.9540959),
      longitude: new Decimal(-47.0989329),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.9363278,
        userLongitude: -47.087616,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
