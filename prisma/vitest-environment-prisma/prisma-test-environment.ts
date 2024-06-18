import 'dotenv/config'
import { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

const prismaEnvironment: Environment = {
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const database_URL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = database_URL

    execSync(`npx prisma migrate deploy`)

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
      transformMode: {
        ssr: [/\.ts$/],
      },
    }
  },
  transformMode: 'web',
}

export default prismaEnvironment
