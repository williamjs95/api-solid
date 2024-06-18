import { Environment } from 'vitest'

const prismaEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    console.log('Setup')

    return {
      async teardown() {
        console.log('Teardown')
      },
      transformMode: {
        ssr: [/\.ts$/],
      },
    }
  },
  transformMode: 'web',
}

export default prismaEnvironment
