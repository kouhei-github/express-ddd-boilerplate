import { PrismaClient } from '@prisma/client'

const setPrismaClient = (): PrismaClient => {
  return new PrismaClient()
}

export { setPrismaClient }
