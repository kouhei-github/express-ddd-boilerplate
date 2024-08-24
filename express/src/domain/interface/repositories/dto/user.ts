import { z } from 'zod'

const userAuthSchema = z.object({
  id: z.number(),
  passwordHash: z.string(),
  passwordSalt: z.string(),
})

const showUserDaoSchema = z.object({
  id: z.number(),
  userAuthId: z.number(),
  name: z.string().nullable(),
  email: z.string().email(),
  loginType: z.string().nullable(),
  profilePicture: z.string().nullable(),
  language: z.string().nullable(),
  timezone: z.string().nullable(),
  status: z.string().nullable(),
  userAuth: userAuthSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

type ShowUserDao = z.infer<typeof showUserDaoSchema>

const meSchema = showUserDaoSchema.omit({ userAuth: true })

type MeDao = z.infer<typeof meSchema>

export { MeDao, meSchema, ShowUserDao, showUserDaoSchema }
