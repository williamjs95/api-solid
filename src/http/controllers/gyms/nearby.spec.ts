import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'The best gym for JavaScript developers',
        phone: '123456789',
        latitude: -22.9363278,
        longitude: -47.087616,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        description: 'The best gym for JavaScript developers',
        phone: '123456789',
        latitude: -10.7778057,
        longitude: 75.5921968,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -22.9363278,
        longitude: -47.087616,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(201)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
